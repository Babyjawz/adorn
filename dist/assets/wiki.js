(() => {
  const theme = document.getElementById('theme');
  theme.value = document.documentElement.dataset.theme;
  theme.addEventListener('change', () => {
    document.documentElement.dataset.theme = theme.value;
    try { localStorage.setItem('adorn-wiki-theme', theme.value); } catch { /* Session choice still works. */ }
  });

  const menu = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('contents');
  const setMenu = open => {
    document.body.classList.toggle('contents-open', open);
    menu.setAttribute('aria-expanded', String(open));
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  sidebar.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });

  const dialog = document.getElementById('search-dialog');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const summary = document.getElementById('search-summary');
  const searchOpen = document.getElementById('search-open');
  const root = document.body.dataset.root;
  const openSearch = () => { dialog.showModal(); input.focus(); };
  searchOpen.addEventListener('click', openSearch);
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', event => {
    const editing = event.target.matches('input,textarea,select,[contenteditable="true"]');
    if ((event.key === '/' && !editing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault(); if (!dialog.open) openSearch();
    }
    if (event.key === 'Escape') setMenu(false);
  });
  const normalize = text => text.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  input.addEventListener('input', () => {
    results.replaceChildren();
    const query = input.value.trim();
    if (!query) { summary.textContent = 'Search all guides and reference pages.'; return; }
    const words = normalize(query).split(/\s+/).slice(0, 12);
    const matches = (window.ADORN_SEARCH || []).map(entry => {
      const title = normalize(entry.title + ' ' + entry.section), text = normalize(entry.text);
      if (!words.every(word => title.includes(word) || text.includes(word))) return null;
      return { entry, score: words.reduce((score, word) => score + (title.includes(word) ? 10 : 1), 0) };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 25);
    summary.textContent = matches.length ? `${matches.length} matching section${matches.length === 1 ? '' : 's'}${matches.length === 25 ? ' (showing the first 25)' : ''}.` : 'No matching sections. Try a shorter or different term.';
    for (const { entry } of matches) {
      const item = document.createElement('li'), link = document.createElement('a');
      link.href = root + entry.path;
      const group = document.createElement('span'), title = document.createElement('strong'), snippet = document.createElement('span');
      group.className = 'search-group'; group.textContent = entry.group;
      title.textContent = entry.title + (entry.section ? ' — ' + entry.section : '');
      const location = Math.max(0, normalize(entry.text).indexOf(words[0]) - 65);
      snippet.className = 'search-snippet'; snippet.textContent = (location ? '…' : '') + entry.text.slice(location, location + 185) + (entry.text.length > location + 185 ? '…' : '');
      link.append(group, title, snippet); item.append(link); results.append(item);
    }
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); results.querySelector('a')?.focus(); }
    if (event.key === 'Enter' && results.querySelector('a')) { event.preventDefault(); results.querySelector('a').click(); }
  });

  const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
  if ('IntersectionObserver' in window && sectionLinks.length) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        for (const link of sectionLinks) {
          const current = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('section-current', current);
          if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-80px 0px -65% 0px' });
    document.querySelectorAll('article h2, article h3').forEach(heading => observer.observe(heading));
  }
})();
