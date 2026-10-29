import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { pages } from '../site.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
let linkCount = 0;
const documents = new Map(pages.map(page => [page.path, fs.readFileSync(path.join(dist, page.path), 'utf8')]));
for (const [file, html] of documents) {
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
console.log(`${pages.length} pages, ${search.length} searchable sections and ${linkCount} local links/assets passed.`);
