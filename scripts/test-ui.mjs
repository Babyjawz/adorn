import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const read = file => fs.readFileSync(path.join(dist, file), 'utf8');
let checks = 0;
function expect(value, message) { assert.ok(value, message); checks++; }

function load(page = 'index.html', theme = null, storageDisabled = false) {
  const dom = new JSDOM(read(page), { url: 'https://example.github.io/adorn/' + page, runScripts: 'outside-only' });
  const { window } = dom;
  if (theme) window.localStorage.setItem('adorn-wiki-theme', theme);
  if (storageDisabled) Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable'); } });
  // JSDOM has no dialog rendering. These shims allow the handlers to be exercised;
  // native focus trapping, layout and visual appearance still need browser review.
  const dialog = window.document.getElementById('search-dialog');
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  for (const file of ['assets/theme.js', 'assets/search-data.js', 'assets/wiki.js']) window.eval(read(file));
  return dom;
}

const dom = load(), w = dom.window, d = w.document;
expect(d.documentElement.dataset.theme === 'grey', 'Grey is the default theme');
expect(d.querySelectorAll('.nav-group').length === 5, 'Five left navigation groups');
expect(d.querySelectorAll('.sidebar a[aria-current="page"]').length === 1, 'One active page');
expect(d.querySelector('.brand img').getAttribute('src').includes('adorn-wordmark-v4.png'), 'V4 logo');
expect(!d.querySelector('.page-contents'), 'Short welcome page has no right-hand contents');
expect(!d.querySelector('.sidebar [data-section-link]'), 'Left sidebar is guide navigation');
const theme = d.getElementById('theme');
for (const value of ['sky', 'grey', 'pine', 'pink']) {
  theme.value = value; theme.dispatchEvent(new w.Event('change'));
  expect(d.documentElement.dataset.theme === value, value + ' applied');
  expect(w.localStorage.getItem('adorn-wiki-theme') === value, value + ' persisted');
}
for (const value of ['sky', 'grey', 'pine', 'pink']) {
  const restored = load('index.html', value);
  expect(restored.window.document.documentElement.dataset.theme === value, value + ' restored');
  expect(restored.window.document.getElementById('theme').value === value, value + ' selector restored');
  restored.window.close();
}
const invalid = load('index.html', 'invalid-theme');
expect(invalid.window.document.documentElement.dataset.theme === 'grey', 'Invalid saved theme falls back');
invalid.window.close();
const blocked = load('index.html', null, true);
expect(blocked.window.document.getElementById('theme').value === 'grey', 'Blocked storage preserves initialisation');
const blockedTheme = blocked.window.document.getElementById('theme');
blockedTheme.value = 'sky'; blockedTheme.dispatchEvent(new blocked.window.Event('change'));
expect(blocked.window.document.documentElement.dataset.theme === 'sky', 'Theme works with blocked storage');
blocked.window.close();

const dialog = d.getElementById('search-dialog'), input = d.getElementById('search-input');
d.getElementById('search-open').click();
expect(dialog.open && d.activeElement === input, 'Search opens and focuses the input');
function search(query) { input.value = query; input.dispatchEvent(new w.Event('input')); return [...d.querySelectorAll('#search-results a')]; }
for (const query of ['crafting', 'recording', 'wardrobe', 'assignment', 'clue']) {
  expect(search(query).length > 0, 'Search finds ' + query);
  expect(d.querySelector('#search-results a').getAttribute('href').includes('.html'), 'Search returns real article links');
}
search('xqznoresult987'); expect(d.getElementById('search-summary').textContent.startsWith('No matching'), 'Useful empty-search feedback');
search('<img src=x onerror=alert(1)>'); expect(!d.querySelector('#search-results img'), 'Search text cannot inject HTML');
search(''); expect(d.getElementById('search-results').children.length === 0, 'Clearing search clears results');
dialog.close();
d.body.dispatchEvent(new w.KeyboardEvent('keydown', { key: '/', bubbles: true }));
expect(dialog.open, 'Slash opens search');
search('voice'); input.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
expect(d.activeElement.closest('#search-results'), 'Arrow down reaches results');
const menu = d.getElementById('menu-toggle');
menu.click(); expect(d.body.classList.contains('contents-open') && menu.getAttribute('aria-expanded') === 'true', 'Contents opens');
d.querySelector('.sidebar a').click(); expect(!d.body.classList.contains('contents-open'), 'Article selection closes mobile contents');
menu.click(); d.body.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
expect(menu.getAttribute('aria-expanded') === 'false', 'Escape closes mobile contents');
w.close();

const nested = load('asf/dialogue.html'), nd = nested.window.document;
const ni = nd.getElementById('search-input'); ni.value = 'wardrobe'; ni.dispatchEvent(new nested.window.Event('input'));
const link = nd.querySelector('#search-results a');
expect(link && link.href.startsWith('https://example.github.io/adorn/'), 'Search works under a GitHub project path');
expect(link.getAttribute('href').startsWith('../'), 'Nested articles resolve search from the site root');
nested.window.close();
const longArticle = load('author/riddles.html'), ld = longArticle.window.document;
expect(ld.querySelectorAll('.page-contents [data-section-link]').length > 3, 'Long article has a right-hand section list');
expect(ld.querySelectorAll('.mobile-page-contents [data-section-link]').length === ld.querySelectorAll('.page-contents [data-section-link]').length, 'Compact contents has the same section links');
expect(ld.querySelector('.layout').classList.contains('has-page-contents'), 'Long article uses the three-column layout');
expect(ld.querySelector('.mobile-page-contents').tagName === 'DETAILS', 'Compact contents can expand without JavaScript');
longArticle.window.close();
console.log(`${checks} DOM interaction checks passed. Browser rendering and native dialog behaviour were not tested.`);
