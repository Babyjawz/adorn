(() => {
  try {
    const theme = localStorage.getItem('adorn-wiki-theme');
    if (['grey', 'sky', 'pine', 'pink'].includes(theme)) document.documentElement.dataset.theme = theme;
  } catch { /* Reading remains available when browser storage is disabled. */ }
})();
