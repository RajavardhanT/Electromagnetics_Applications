(() => {
  const base = document.body.dataset.baseurl || '';
  const normalizePath = p => {
    if (!p) return '/';
    let out = p.replace(base || '', '') || '/';
    if (!out.startsWith('/')) out = '/' + out;
    if (out !== '/' && !out.includes('.') && !out.endsWith('/')) out += '/';
    return out;
  };

  /* Highlight the current location in the sidebar. */
  const currentPath = normalizePath(window.location.pathname);
  const sidebarLinks = [...document.querySelectorAll('.sidebar a[href]')].filter(a => {
    try { return new URL(a.href, window.location.href).origin === window.location.origin; } catch(e) { return false; }
  });
  let bestSidebarMatch = null;
  sidebarLinks.forEach(a => {
    const p = normalizePath(new URL(a.href, window.location.href).pathname);
    if (currentPath === p || (p !== '/' && currentPath.startsWith(p))) {
      if (!bestSidebarMatch || p.length > bestSidebarMatch.path.length) bestSidebarMatch = {a, path:p};
    }
  });
  if (bestSidebarMatch) {
    bestSidebarMatch.a.classList.add('active');
    bestSidebarMatch.a.setAttribute('aria-current','page');
  }

  // Full-text site search is maintained by assets/js/site-search.js.

  const toc = document.getElementById('page-toc-list');
  if (toc) {
    const hs = [...document.querySelectorAll('.content h2, .content h3')].filter(h => !h.closest('.page-toc'));
    const tocLinks = [];
    hs.forEach((h,i) => {
      if (!h.id) h.id = (h.textContent || `section-${i}`).toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      const a = document.createElement('a');
      a.href = '#'+h.id; a.textContent = h.textContent; a.className = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2'; toc.appendChild(a); tocLinks.push(a);
      const anchor = document.createElement('a'); anchor.className='heading-anchor'; anchor.href='#'+h.id; anchor.textContent='¶'; anchor.setAttribute('aria-label','Link to this section'); h.appendChild(anchor);
    });
    const details = toc.closest('details'); if (!hs.length && details) details.remove();

    if (hs.length && 'IntersectionObserver' in window) {
      let activeId = '';
      const activate = id => {
        if (!id || id === activeId) return;
        activeId = id;
        tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+id));
      };
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) activate(visible[0].target.id);
      }, {rootMargin:'-92px 0px -68% 0px', threshold:[0,1]});
      hs.forEach(h => observer.observe(h));
      if (hs[0]) activate(hs[0].id);
    }
  }

  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button'); button.className='copy-code'; button.type='button'; button.textContent='Copy';
    button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(pre.innerText.replace(/^Copy\n/,'')); button.textContent='Copied'; setTimeout(()=>button.textContent='Copy',1200); } catch(e){} });
    pre.appendChild(button);
  });

  const progress = document.getElementById('reading-progress');
  const topBtn = document.getElementById('back-to-top');
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? (scrollY/max)*100 : 0) + '%';
    if (topBtn) topBtn.classList.toggle('visible', scrollY > 700);
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  if (topBtn) topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();
