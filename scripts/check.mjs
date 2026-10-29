import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { pages, groups } from '../site.config.mjs';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
let linkCount = 0;
const documents = new Map(pages.map(page => [page.path, fs.readFileSync(path.join(dist, page.path), 'utf8')]));
assert.deepEqual(groups.flatMap(group => group.pages), pages.map(page => page.id), 'Navigation order matches Previous/Next order');
assert.equal(new Set(pages.map(page => page.id)).size, pages.length, 'Every page appears once');
const duplicateBlocks = new Map();
for (const [file, html] of documents) {
  const doc = new JSDOM(html).window.document;
  const article = doc.querySelector('article');
  assert.ok(!/offline checks?|prototype testing|acceptance (?:work|walkthrough|testing|check)|synthetic free checks|development (?:profile|setup|checks)|browser (?:probes|checks)|user confirmed|test provenance|regressions? (?:cover|retain|are)/i.test(article.textContent), `${file}: no internal development journal`);
  assert.equal(article.firstElementChild?.tagName, 'P', `${file}: contextual introduction before instructions`);
  assert.ok(article.firstElementChild.textContent.trim().length > 60, `${file}: meaningful introduction`);
  assert.equal(doc.querySelectorAll('.source-reference').length, 0, `${file}: no unresolved source-only references`);
  assert.equal(doc.querySelectorAll('main > .description').length, 0, `${file}: no duplicated summary above the introduction`);
  assert.ok(![...doc.querySelectorAll('.nav-group h2')].some(h => h.textContent === 'Seller Framework'), `${file}: full ASF section name`);
  for (const block of article.querySelectorAll('p,table,ol')) {
    const text = block.textContent.replace(/\s+/g, ' ').trim();
    if (text.length < 140) continue;
    const key = block.tagName + ':' + text;
    const existing = duplicateBlocks.get(key);
    assert.ok(!existing || existing === file, `Repeated chapter content in ${existing} and ${file}: ${text.slice(0,80)}`);
    duplicateBlocks.set(key, file);
  }
  if (file === 'index.html' || file.endsWith('/introduction.html')) {
    const menus = [...article.querySelectorAll('ul,ol')].filter(list => list.children.length > 1 && [...list.children].every(item => item.children.length === 1 && item.firstElementChild.tagName === 'A'));
    assert.equal(menus.length, 0, `${file}: article does not repeat the navigation as a link menu`);
  }
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: one article title`);
  assert.ok(html.includes('aria-label="Wiki contents"'), `${file}: left contents navigation`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: unique IDs`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [target, hash] = href.split('#');
    const resolved = target ? path.posix.normalize(path.posix.join(path.posix.dirname(file), target)) : file;
    assert.ok(!resolved.startsWith('../'), `${file}: link stays in site ${href}`);
    assert.ok(fs.existsSync(path.join(dist, resolved)), `${file}: file exists ${href}`);
    if (hash && resolved.endsWith('.html')) {
      const destination = documents.get(resolved) || fs.readFileSync(path.join(dist, resolved), 'utf8');
      assert.ok(destination.includes(`id="${decodeURIComponent(hash)}"`), `${file}: anchor exists ${href}`);
    }
    linkCount++;
  }
}
const script = fs.readFileSync(path.join(dist, 'assets/search-data.js'), 'utf8');
const search = JSON.parse(script.slice('window.ADORN_SEARCH='.length).trim().replace(/;$/, ''));
for (const entry of search) {
  const [file, hash] = entry.path.split('#');
  assert.ok(documents.has(file));
  if (hash) assert.ok(documents.get(file).includes(`id="${hash}"`), `Search target ${entry.path}`);
}
for (const query of ['crafting', 'record', 'riddle', 'wardrobe', 'assignment', 'voice']) assert.ok(search.some(entry => entry.text.toLowerCase().includes(query)), `Search includes ${query}`);
assert.equal(fs.readFileSync(path.join(root, 'assets/adorn-wordmark-v4.png')).equals(fs.readFileSync(path.join(dist, 'assets/adorn-wordmark-v4.png'))), true);
assert.ok(fs.existsSync(path.join(dist, '.nojekyll')));
const publishedHtml = fs.readdirSync(dist, { recursive: true }).filter(file => file.endsWith('.html')).map(file => file.replace(/\\/g, '/')).sort();
assert.deepEqual(publishedHtml, [...pages.map(page => page.path), '404.html'].sort(), 'No retired or internal HTML remains in the published site');
for (const group of groups) assert.ok(group.pages[0] === 'home' || group.pages[0].endsWith('-intro'), `${group.name}: introduction first`);
console.log(`${pages.length} pages, ${search.length} searchable sections and ${linkCount} local links/assets passed.`);
