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

function load(page = 'index.html', theme = null, storageDisabled = false, savedSize = null, filePreview = false) {
  const url = filePreview ? 'file:///N:/Adorn/wiki/dist/' + page + '?textSize=' + savedSize : 'https://example.github.io/adorn/' + page;
  const dom = new JSDOM(read(page), { url, runScripts: 'outside-only' });
  const { window } = dom;
  if (theme) window.localStorage.setItem('adorn-wiki-theme', theme);
  if (savedSize !== null && !filePreview) window.localStorage.setItem('adorn-wiki-text-size', String(savedSize));
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
const smaller = d.getElementById('text-smaller'), larger = d.getElementById('text-larger'), textSize = d.getElementById('text-size');
expect(textSize.textContent === '100%', 'Text starts at 100 percent');
larger.click();
expect(d.documentElement.style.getPropertyValue('--text-scale') === '1.1', 'One root scale changes all text');
expect(w.localStorage.getItem('adorn-wiki-text-size') === '110' && textSize.textContent === '110%', 'Text scale is displayed and saved');
for (let i = 0; i < 15; i++) larger.click();
expect(textSize.textContent === '200%' && larger.disabled, 'Text scale stops at 200 percent');
for (let i = 0; i < 20; i++) smaller.click();
expect(textSize.textContent === '80%' && smaller.disabled, 'Text scale stops at 80 percent');
textSize.click();
expect(textSize.textContent === '100%' && !smaller.disabled && !larger.disabled, 'Percentage control resets the scale');
const header = d.querySelector('.topbar');
header.getBoundingClientRect = () => ({ height: 136 });
w.dispatchEvent(new w.Event('resize'));
expect(d.documentElement.style.getPropertyValue('--header-height') === '136px', 'Sidebar and anchor offsets follow the actual header height');
const css = read('assets/wiki.css');
expect(!/\bfont(?:-size)?\s*:\s*\d+(?:\.\d+)?px/.test(css), 'No fixed pixel font sizes bypass the shared scale');
expect(!/article\s*\{\s*font-size:/.test(css), 'Mobile articles inherit the same text size');
for (const page of ['index.html', 'adorn/getting-started.html', 'asf/dialogue.html', 'author/riddles.html', 'start/requirements.html']) {
  const restored = load(page, null, false, 150);
  expect(restored.window.document.getElementById('text-size').textContent === '150%' && restored.window.document.documentElement.style.getPropertyValue('--text-scale') === '1.5', 'Saved text size is unified on ' + page);
  restored.window.close();
}
for (const invalidSize of [0, 50, 250, 125, 'invalid']) {
  const invalidScale = load('index.html', null, false, invalidSize);
  expect(invalidScale.window.document.getElementById('text-size').textContent === '100%', 'Invalid text size falls back: ' + invalidSize);
  invalidScale.window.close();
}
const file = load('asf/dialogue.html', null, true, 160, true), fd = file.window.document;
expect(fd.getElementById('text-size').textContent === '160%', 'File preview restores size without shared storage');
expect(new URL(fd.querySelector('.sidebar a').href).searchParams.get('textSize') === '160', 'Local navigation carries text size between files');
fd.getElementById('text-larger').click();
expect(new URL(fd.querySelector('.brand').href).searchParams.get('textSize') === '170', 'Changing size updates local links');
const fileInput = fd.getElementById('search-input'); fileInput.value = 'wardrobe'; fileInput.dispatchEvent(new file.window.Event('input'));
expect(new URL(fd.querySelector('#search-results a').href).searchParams.get('textSize') === '170', 'Local search results preserve text size');
file.window.close();
expect(d.documentElement.dataset.theme === 'grey', 'Grey is the default theme');
expect(d.querySelectorAll('.nav-group').length === 5, 'Five left navigation groups');
expect(d.querySelectorAll('.sidebar a[aria-current="page"]').length === 1, 'One active page');
expect(d.querySelector('.brand img').getAttribute('src').includes('adorn-wordmark-v4.png'), 'V4 logo');
expect(d.querySelector('.page-contents'), 'Welcome page shows the right-hand article contents');
expect(d.querySelectorAll('.page-contents [data-section-link]').length === 5, 'Welcome contents links to its five sections');
expect(d.querySelector('.layout').classList.contains('has-page-contents'), 'Welcome page uses the three-column layout');
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
blocked.window.document.getElementById('text-larger').click();
expect(blocked.window.document.getElementById('text-size').textContent === '110%', 'Text scaling works with blocked storage');
blocked.window.close();

const dialog = d.getElementById('search-dialog'), input = d.getElementById('search-input');
d.getElementById('search-open').click();
expect(dialog.open && d.activeElement === input, 'Search opens and focuses the input');
dialog.getBoundingClientRect = () => ({ left: 100, right: 700, top: 100, bottom: 600 });
dialog.dispatchEvent(new w.MouseEvent('click', { bubbles: true, clientX: 120, clientY: 120 }));
expect(dialog.open, 'Clicking dialog padding keeps search open');
dialog.dispatchEvent(new w.MouseEvent('click', { bubbles: true, clientX: 20, clientY: 20 }));
expect(!dialog.open, 'Clicking the backdrop closes search');
d.getElementById('search-open').click();
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
const sidebar = d.getElementById('contents');
sidebar.scrollTop = 225; sidebar.dispatchEvent(new w.Event('scroll'));
expect(w.sessionStorage.getItem('adorn-wiki-contents-scroll') === '225', 'Contents scroll position is retained');
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
