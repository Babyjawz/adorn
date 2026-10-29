import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { pages, groups, aliases } from '../site.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plain = value => value.replace(/<[^>]+>/g, '').replace(/[*`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const slug = value => plain(value).toLowerCase().replace(/&amp;/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s+/g, '-');
const documents = new Map();
for (const page of pages) {
  if (!documents.has(page.source)) documents.set(page.source, fs.readFileSync(path.join(root, 'content', page.source), 'utf8').replace(/\r\n/g, '\n'));
}

function selectContent(page) {
  const source = documents.get(page.source);
  if (!page.sections) return source.replace(/^# .+\n/, '').replace(/^## Contents\n[\s\S]*?(?=^## |$(?![\s\S]))/m, '').trim();
  const sections = new Map();
  for (const part of source.split(/(?=^## )/m)) {
    const title = /^## (.+)/.exec(part)?.[1];
    if (title) sections.set(title, part.trim());
  }
  return page.sections.map(title => {
    if (!sections.has(title)) throw new Error(`${page.source}: missing section ${title}`);
    return sections.get(title);
  }).join('\n\n');
}
for (const page of pages) {
  page.markdown = selectContent(page);
  page.headings = [];
  const used = new Map();
  const lexer = new Marked();
  for (const token of lexer.lexer(page.markdown)) {
    if (token.type !== 'heading') continue;
    const base = slug(token.text), number = used.get(base) || 0;
    used.set(base, number + 1);
    page.headings.push({ id: base + (number ? `-${number}` : ''), text: plain(token.text), depth: token.depth });
  }
}
const firstPage = new Map();
const anchors = new Map();
for (const page of pages) {
  if (!firstPage.has(page.source)) firstPage.set(page.source, page);
  for (const heading of page.headings) {
    const key = `${page.source}#${heading.id}`;
    if (!anchors.has(key)) anchors.set(key, page);
    if (page.id === 'asf-orders' && ['recipes-and-finished-outfits', 'earning-and-wearing-pieces', 'pending-orders-and-fixed-offers'].includes(heading.id)) anchors.set(key, page);
  }
}
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);
const sourceOnly = new Set();

function resolveLink(page, href) {
  if (/^(https?:|mailto:)/i.test(href)) return href;
  if (/^[a-z][\w+.-]*:/i.test(href)) return null;
  const [rawFile, rawHash = ''] = href.split('#');
  const hash = decodeURIComponent(rawHash);
  if (!rawFile && page.headings.some(h => h.id === hash)) return `#${hash}`;
  if (rawFile.includes('assets/')) return relative(page.path, 'assets/' + rawFile.split('assets/').slice(1).join('assets/')) + (hash ? `#${hash}` : '');
  const normal = path.posix.normalize(path.posix.join(path.posix.dirname(page.source), rawFile || page.source));
  const cleaned = normal.replace(/^(\.\.\/)+/, '');
  const file = aliases[cleaned] || cleaned;
  const target = hash ? anchors.get(`${file}#${hash}`) : firstPage.get(file);
  if (target) return relative(page.path, target.path) + (hash ? `#${hash}` : '');
  sourceOnly.add(file + (hash ? `#${hash}` : ''));
  return null;
}

function render(page) {
  let headingIndex = 0;
  const parser = new Marked({ gfm: true, breaks: false });
  parser.use({ renderer: {
    heading({ tokens, depth }) {
      const heading = page.headings[headingIndex++];
      return `<h${depth} id="${escape(heading.id)}">${this.parser.parseInline(tokens)}<a class="heading-anchor" href="#${escape(heading.id)}" aria-label="Link to ${escape(heading.text)}">#</a></h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens), target = resolveLink(page, href);
      if (!target) return `<span class="source-reference" title="Additional notes in the maintained project documentation">${text}</span>`;
      return `<a href="${escape(target)}"${title ? ` title="${escape(title)}"` : ''}>${text}</a>`;
    },
    image({ href, text, title }) {
      const target = resolveLink(page, href);
      if (!target) return '';
      return `<figure><img src="${escape(target)}" alt="${escape(text)}" loading="lazy">${title ? `<figcaption>${escape(title)}</figcaption>` : ''}</figure>`;
    },
    html({ text }) { return escape(text); }
  }});
  return parser.parse(page.markdown).replace(/<table>/g, '<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable reference table"><table>').replace(/<\/table>/g, '</table></div>');
}

function sidebar(page) {
  return groups.map(group => `<section class="nav-group"><h2>${escape(group.name)}</h2><ul>${group.pages.map(id => {
    const entry = pages.find(p => p.id === id), active = entry.id === page.id;
    return `<li><a href="${relative(page.path, entry.path)}"${active ? ' class="current" aria-current="page"' : ''}>${escape(entry.title)}</a></li>`;
  }).join('')}</ul></section>`).join('');
}

function template(page, body) {
  const asset = name => relative(page.path, `assets/${name}`);
  const index = pages.indexOf(page), previous = pages[index - 1], next = pages[index + 1];
  const hasContents = plain(page.markdown).split(/\s+/).length >= 450 && page.headings.filter(h => h.depth === 2).length >= 3;
  const sections = page.headings.filter(h => h.depth <= 3).map(h => `<li${h.depth === 3 ? ' class="subsection"' : ''}><a data-section-link href="#${escape(h.id)}">${escape(h.text)}</a></li>`).join('');
  return `<!doctype html>
<html lang="en" data-theme="grey">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${escape(page.description)}">
<meta name="color-scheme" content="dark">
<title>${escape(page.title)} · Adorn Wiki</title>
<link rel="icon" href="${asset('adorn-wordmark-v4.png')}">
<link rel="stylesheet" href="${asset('wiki.css')}">
<script src="${asset('theme.js')}"></script>
<script src="${asset('search-data.js')}" defer></script>
<script src="${asset('wiki.js')}" defer></script>
</head>
<body data-page="${escape(page.id)}" data-root="${relative(page.path, 'index.html').replace(/index\.html$/, '') || './'}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="topbar">
  <a class="brand" href="${relative(page.path, 'index.html')}" aria-label="Adorn Wiki home"><img src="${asset('adorn-wordmark-v4.png')}" width="180" height="60" alt="Adorn"><span>Wiki</span></a>
  <div class="topbar-tools">
    <button class="search-open" id="search-open" aria-haspopup="dialog"><span>Search the wiki</span><kbd>/</kbd></button>
    <label class="theme-control"><span>Theme</span><select id="theme" aria-label="Colour theme"><option value="grey">Grey</option><option value="sky">Sky</option><option value="pine">Pine</option><option value="pink">Pink</option></select></label>
    <button class="menu-toggle" id="menu-toggle" aria-controls="contents" aria-expanded="false">Contents</button>
  </div>
</header>
<div class="layout${hasContents ? ' has-page-contents' : ''}">
  <aside class="sidebar" id="contents"><nav aria-label="Wiki contents">${sidebar(page)}</nav></aside>
  <main id="main" tabindex="-1">
    <div class="article-label">${escape(page.group)}</div>
    <h1>${escape(page.title)}</h1>
    <p class="description">${escape(page.description)}</p>
    ${hasContents ? `<details class="mobile-page-contents"><summary>On this page</summary><nav aria-label="Sections in this article"><ul>${sections}</ul></nav></details>` : ''}
    <article>${body}</article>
    <nav class="page-turn" aria-label="Previous and next articles">${previous ? `<a href="${relative(page.path, previous.path)}"><span>Previous</span>${escape(previous.title)}</a>` : '<span></span>'}${next ? `<a href="${relative(page.path, next.path)}"><span>Next</span>${escape(next.title)}</a>` : ''}</nav>
    <footer>Adorn &amp; Adorn Seller Framework · Documentation · 29 October 2026</footer>
  </main>
  ${hasContents ? `<aside class="page-contents"><nav aria-label="On this page"><h2>On this page</h2><ul>${sections}</ul></nav></aside>` : ''}
</div>
<dialog id="search-dialog" aria-labelledby="search-title">
  <form method="dialog" class="search-header"><h2 id="search-title">Search the wiki</h2><button aria-label="Close search">Close</button></form>
  <label class="search-field"><span class="sr-only">Search terms</span><input id="search-input" type="search" placeholder="Outfits, recipes, recording…" autocomplete="off"></label>
  <p class="search-summary" id="search-summary" aria-live="polite">Search all guides and reference pages.</p>
  <ul id="search-results"></ul>
</dialog>
</body></html>\n`;
}

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
for (const name of ['wiki.css', 'wiki.js', 'theme.js']) fs.copyFileSync(path.join(root, 'src', name), path.join(output, 'assets', name));
const search = [];
for (const page of pages) {
  const body = render(page);
  fs.mkdirSync(path.dirname(path.join(output, page.path)), { recursive: true });
  fs.writeFileSync(path.join(output, page.path), template(page, body).replace(/^[ \t]+$/gm, ''));
  const chunks = page.markdown.split(/(?=^## )/m);
  for (const chunk of chunks) {
    const heading = /^## (.+)/.exec(chunk)?.[1];
    const text = plain(chunk).replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    search.push({ title: page.title, group: page.group, section: heading ? plain(heading) : '', path: page.path + (heading ? '#' + slug(heading) : ''), text });
  }
}
fs.writeFileSync(path.join(output, 'assets/search-data.js'), `window.ADORN_SEARCH=${JSON.stringify(search).replace(/</g, '\\u003c')};\n`);
fs.writeFileSync(path.join(output, '.nojekyll'), '');
fs.writeFileSync(path.join(output, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><title>Page not found · Adorn Wiki</title><body style="background:#202226;color:#eee;font:18px/1.6 system-ui;max-width:640px;margin:10vh auto;padding:24px"><h1>Page not found</h1><p>Use your browser’s Back button to return to the wiki.</p></body></html>');
console.log(`Built ${pages.length} articles and ${search.length} searchable sections into dist/.`);
console.log(`${sourceOnly.size} references to internal source-only documents remain plain text.`);
