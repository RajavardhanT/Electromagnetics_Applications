/* Site-wide full-text search. Builds from Jekyll /search-index.json; no services.
 * Both the sidebar suggestions and the full /search/ page share this index.
 */
(() => {
  'use strict';

  const base = (document.body.dataset.baseurl || '').replace(/\/$/, '');
  const searchUrl = base + '/search/';
  const indexUrl = base + '/search-index.json';
  const sidebarInput = document.getElementById('site-search');
  const suggestions = document.getElementById('search-results');
  const pageInput = document.getElementById('search-page-input');
  const pageForm = document.getElementById('search-page-form');
  const pageResults = document.getElementById('search-page-results');
  const pageStatus = document.getElementById('search-page-status');

  let indexPromise = null;
  let sidebarSequence = 0;
  let pageSequence = 0;
  let sidebarDelay = null;
  let pageDelay = null;

  const simplify = value => String(value || '').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  const tokensFor = query => [...new Set(simplify(query).split(/\s+/).filter(Boolean))].slice(0, 10);

  async function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl, { credentials: 'same-origin' })
        .then(response => {
          if (!response.ok) throw new Error('Search index unavailable (' + response.status + ')');
          return response.json();
        })
        .then(rows => {
          if (!Array.isArray(rows)) throw new Error('Search index format is invalid');
          return rows.filter(row => row && row.title && row.url).map(row => ({
            title: String(row.title),
            url: String(row.url),
            description: String(row.description || ''),
            content: String(row.content || ''),
            titleKey: simplify(row.title),
            descKey: simplify(row.description),
            contentKey: simplify(row.content)
          }));
        })
        .catch(error => { indexPromise = null; throw error; });
    }
    return indexPromise;
  }

  function findMatches(rows, query) {
    const terms = tokensFor(query);
    if (!terms.length) return [];
    const phrase = simplify(query);
    const ranked = [];
    for (const row of rows) {
      // All terms must occur somewhere on the page (not necessarily in one field).
      if (!terms.every(term =>
        row.titleKey.includes(term) || row.descKey.includes(term) || row.contentKey.includes(term))) continue;
      let score = 0;
      if (row.titleKey.includes(phrase)) score += 80;
      if (row.descKey.includes(phrase)) score += 28;
      if (row.contentKey.includes(phrase)) score += 8;
      for (const term of terms) {
        if (row.titleKey.includes(term)) score += 30;
        if (row.descKey.includes(term)) score += 11;
        if (row.contentKey.includes(term)) score += 2;
        if (row.titleKey === term) score += 20;
      }
      ranked.push({ row, score });
    }
    ranked.sort((a, b) => b.score - a.score || a.row.title.localeCompare(b.row.title));
    return ranked.map(item => item.row);
  }

  function contextSnippet(row, query, limit = 190) {
    const terms = tokensFor(query);
    // Prefer a meaningful match in body text; otherwise show the description.
    let source = row.content || row.description || '';
    const lower = row.contentKey;
    let at = lower.indexOf(simplify(query));
    if (at < 0) at = terms.map(term => lower.indexOf(term))
      .filter(i => i >= 0).sort((a, b) => a - b)[0] ?? -1;
    if (at < 0) { source = row.description || row.content || ''; at = 0; }
    const from = Math.max(0, at - 60);
    const excerpt = source.slice(from, from + limit).trim();
    return (from ? '…' : '') + excerpt + (from + limit < source.length ? '…' : '');
  }

  // All indexing output is plain text: no raw page content is inserted as HTML.
  function addHighlightedText(parent, content, query) {
    const terms = tokensFor(query).sort((a, b) => b.length - a.length);
    const lower = simplify(content);
    if (!terms.length) { parent.textContent = content; return; }
    let start = 0;
    while (start < content.length) {
      let next = content.length, selected = '';
      for (const term of terms) {
        const i = lower.indexOf(term, start);
        if (i >= 0 && (i < next || (i === next && term.length > selected.length))) {
          next = i;
          selected = term;
        }
      }
      if (!selected) { parent.appendChild(document.createTextNode(content.slice(start))); break; }
      if (next > start) parent.appendChild(document.createTextNode(content.slice(start, next)));
      const mark = document.createElement('mark');
      mark.textContent = content.slice(next, next + selected.length);
      parent.appendChild(mark);
      start = next + selected.length;
    }
  }

  function resultLink(row, query, full) {
    const anchor = document.createElement('a');
    anchor.href = row.url;
    anchor.className = full ? 'search-result-card' : 'search-result-suggestion';

    const title = document.createElement('strong');
    addHighlightedText(title, row.title, query);
    anchor.appendChild(title);

    const desc = full ? document.createElement('p') : document.createElement('small');
    desc.textContent = contextSnippet(row, query, full ? 260 : 100);
    anchor.appendChild(desc);

    if (full) {
      const location = document.createElement('span');
      location.className = 'search-result-path';
      location.textContent = row.url;
      anchor.appendChild(location);
    }
    return anchor;
  }

  function setMessage(container, message, className = '') {
    container.replaceChildren();
    const text = document.createElement('div');
    text.className = className || 'search-help';
    text.textContent = message;
    container.appendChild(text);
  }

  function allResultsLink(query) {
    const link = document.createElement('a');
    link.href = searchUrl + '?q=' + encodeURIComponent(query);
    link.className = 'search-view-all';
    link.textContent = 'View all matching chapters →';
    return link;
  }

  async function showSidebar(query) {
    if (!sidebarInput || !suggestions) return;
    const sequence = ++sidebarSequence;
    const q = query.trim();
    if (q.length < 2) { suggestions.hidden = true; suggestions.replaceChildren(); return; }
    suggestions.hidden = false;
    setMessage(suggestions, 'Searching all chapters…');
    try {
      const matches = findMatches(await loadIndex(), q);
      if (sequence !== sidebarSequence || sidebarInput.value.trim() !== q) return;
      suggestions.replaceChildren();
      if (!matches.length) {
        setMessage(suggestions, 'No matching pages found.');
      } else {
        matches.slice(0, 6).forEach(row => suggestions.appendChild(resultLink(row, q, false)));
      }
      suggestions.appendChild(allResultsLink(q));
    } catch (error) {
      if (sequence !== sidebarSequence) return;
      setMessage(suggestions, 'Search is temporarily unavailable. Try again after the page finishes loading.', 'search-error');
      suggestions.appendChild(allResultsLink(q));
    }
  }

  async function showPage(query) {
    if (!pageInput || !pageResults || !pageStatus) return;
    const sequence = ++pageSequence;
    const q = query.trim();
    if (q.length < 2) {
      pageResults.replaceChildren();
      pageStatus.textContent = 'Enter at least two characters to search the reference.';
      return;
    }
    pageStatus.textContent = 'Searching all chapters…';
    try {
      const matches = findMatches(await loadIndex(), q);
      if (sequence !== pageSequence || pageInput.value.trim() !== q) return;
      pageResults.replaceChildren();
      pageStatus.textContent = matches.length
        ? matches.length + ' matching ' + (matches.length === 1 ? 'chapter' : 'chapters') + '.'
        : 'No matching chapters. Try another technical term.';
      matches.forEach(row => pageResults.appendChild(resultLink(row, q, true)));
    } catch (error) {
      if (sequence !== pageSequence) return;
      pageResults.replaceChildren();
      pageStatus.textContent = 'Unable to load the search index. Refresh the page or browse the Knowledge Map.';
    }
  }

  function updateSearchLocation(query) {
    if (!pageInput) return;
    const url = new URL(window.location.href);
    const value = query.trim();
    if (value) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  if (sidebarInput && suggestions) {
    sidebarInput.addEventListener('input', () => {
      clearTimeout(sidebarDelay);
      sidebarDelay = setTimeout(() => showSidebar(sidebarInput.value), 120);
    });
    sidebarInput.addEventListener('focus', () => {
      if (sidebarInput.value.trim().length >= 2) showSidebar(sidebarInput.value);
    });
    sidebarInput.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        ++sidebarSequence;
        sidebarInput.value = '';
        suggestions.hidden = true;
        suggestions.replaceChildren();
        sidebarInput.blur();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const first = suggestions.querySelector('.search-result-suggestion');
        window.location.assign(first ? first.href
          : searchUrl + '?q=' + encodeURIComponent(sidebarInput.value.trim()));
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-search-wrap')) suggestions.hidden = true;
    });
  }

  if (pageInput && pageForm) {
    const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
    pageInput.value = initialQuery;
    showPage(initialQuery);

    pageForm.addEventListener('submit', event => {
      event.preventDefault();
      updateSearchLocation(pageInput.value);
      showPage(pageInput.value);
    });
    pageInput.addEventListener('input', () => {
      clearTimeout(pageDelay);
      pageDelay = setTimeout(() => {
        updateSearchLocation(pageInput.value);
        showPage(pageInput.value);
      }, 160);
    });
    window.addEventListener('popstate', () => {
      pageInput.value = new URLSearchParams(window.location.search).get('q') || '';
      showPage(pageInput.value);
    });
  }

  document.addEventListener('keydown', event => {
    const editing = event.target && (event.target.isContentEditable ||
      /^(input|textarea|select)$/i.test(event.target.tagName));
    if (event.key === 'Escape' && document.activeElement === pageInput) {
      pageInput.value = '';
      updateSearchLocation('');
      showPage('');
      return;
    }
    const shortcut = (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey)
      || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k');
    if (!shortcut || editing) return;
    event.preventDefault();
    if (pageInput) {
      pageInput.focus();
    } else if (sidebarInput && sidebarInput.getClientRects().length) {
      sidebarInput.focus();
    } else {
      window.location.assign(searchUrl);
    }
  });
})();
