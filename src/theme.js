(() => {
  try {
    const theme = localStorage.getItem('adorn-wiki-theme');
    if (['grey', 'sky', 'pine', 'pink'].includes(theme)) document.documentElement.dataset.theme = theme;
  } catch { /* Reading remains available when browser storage is disabled. */ }
  try {
    const previewSize = location.protocol === 'file:' ? new URLSearchParams(location.search).get('textSize') : null;
    let storedSize;
    try { storedSize = localStorage.getItem('adorn-wiki-text-size'); } catch { /* File previews may block storage. */ }
    const size = Number(previewSize ?? storedSize);
    if (Number.isInteger(size) && size >= 80 && size <= 200 && size % 10 === 0) {
      document.documentElement.style.setProperty('--text-scale', String(size / 100));
    }
  } catch { /* Default text size remains available without storage. */ }
})();
