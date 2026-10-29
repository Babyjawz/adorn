(() => {
  const documentRoot = document.documentElement;
  const smaller = document.getElementById('text-smaller');
  const larger = document.getElementById('text-larger');
  const textSize = document.getElementById('text-size');
  let size = Math.round((Number(documentRoot.style.getPropertyValue('--text-scale')) || 1) * 100);
  // file:// storage can be isolated per file. Carry the choice through local
  // preview links as well, so every article keeps the selected text size.
  const previewLink = href => {
    if (location.protocol !== 'file:' || href.startsWith('#')) return href;
    const target = new URL(href, location.href);
    if (target.protocol !== 'file:' || !target.pathname.endsWith('.html')) return href;
    target.searchParams.set('textSize', String(size));
    return target.href;
  };
  const topbar = document.querySelector('.topbar');
  let refreshSections = () => {};
  const measureHeader = () => {
    const height = Math.ceil(topbar.getBoundingClientRect().height);
    if (height && documentRoot.style.getPropertyValue('--header-height') !== height + 'px') {
      documentRoot.style.setProperty('--header-height', height + 'px');
      refreshSections();
    }
  };
  const applySize = value => {
    size = Math.max(80, Math.min(200, value));
    documentRoot.style.setProperty('--text-scale', String(size / 100));
    textSize.textContent = size + '%';
    smaller.disabled = size === 80;
    larger.disabled = size === 200;
    try { localStorage.setItem('adorn-wiki-text-size', String(size)); } catch { /* Session choice still works. */ }
    if (location.protocol === 'file:') {
      for (const link of document.querySelectorAll('a[href]')) link.setAttribute('href', previewLink(link.getAttribute('href')));
      try {
        const current = new URL(location.href);
        current.searchParams.set('textSize', String(size));
        history.replaceState(null, '', current);
      } catch { /* Some local-file browsers restrict history changes. */ }
    }
    measureHeader();
  };
  smaller.addEventListener('click', () => applySize(size - 10));
  larger.addEventListener('click', () => applySize(size + 10));
  textSize.addEventListener('click', () => applySize(100));
  applySize(size);
  if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(topbar);
  window.addEventListener('resize', measureHeader);
  document.fonts?.ready.then(measureHeader);

  const theme = document.getElementById('theme');
  theme.value = document.documentElement.dataset.theme;
  theme.addEventListener('change', () => {
    document.documentElement.dataset.theme = theme.value;
    try { localStorage.setItem('adorn-wiki-theme', theme.value); } catch { /* Session choice still works. */ }
  });

  const menu = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('contents');
  const revealCurrentGuide = () => {
    const current = sidebar.querySelector('[aria-current="page"]');
    if (!current || !sidebar.clientHeight) return;
    const top = current.offsetTop, bottom = top + current.offsetHeight;
    if (top < sidebar.scrollTop || bottom > sidebar.scrollTop + sidebar.clientHeight) sidebar.scrollTop = Math.max(0, top - 80);
  };
  try { sidebar.scrollTop = Number(sessionStorage.getItem('adorn-wiki-contents-scroll')) || 0; } catch { /* Navigation works without storage. */ }
  revealCurrentGuide();
  sidebar.addEventListener('scroll', () => {
    try { sessionStorage.setItem('adorn-wiki-contents-scroll', String(sidebar.scrollTop)); } catch { /* Optional convenience. */ }
  });
  const setMenu = open => {
    document.body.classList.toggle('contents-open', open);
    menu.setAttribute('aria-expanded', String(open));
    if (open) revealCurrentGuide();
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
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
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
      link.href = previewLink(root + entry.path);
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
    let observer;
    refreshSections = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        for (const link of sectionLinks) {
          const current = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('section-current', current);
          if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        }
      }
      }, { rootMargin: `-${Math.ceil(topbar.getBoundingClientRect().height || 78)}px 0px -65% 0px` });
      document.querySelectorAll('article h2, article h3').forEach(heading => observer.observe(heading));
    };
    refreshSections();
  }
})();
