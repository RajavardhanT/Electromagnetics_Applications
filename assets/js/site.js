(() => {
  const base = document.body.dataset.baseurl || '';
  const pages = [
    ['Knowledge Map','/knowledge-map/','map pathways fields waves applications'],
    ['Quick Reference Hub','/reference/','equations scaling orders magnitude comparisons derivations'],
    ['Fundamental Equations','/reference/fundamental-equations.html','maxwell friis radar poynting rabi stark'],
    ['Orders of Magnitude','/reference/orders-of-magnitude.html','frequency wavelength field power noise scale'],
    ['Scaling Laws','/reference/scaling-laws.html','dimensionless ka skin depth far field polarizability'],
    ['Comparison Tables','/reference/comparison-tables.html','compare fem fdtd mom antennas sensors'],
    ['Common Misconceptions','/reference/common-misconceptions.html','mistakes intuition myth'],
    ['Derivations','/reference/derivations.html','derive wave poynting friis skin depth stark'],
    ['Worked Examples','/worked-examples/','numerical calculations examples'],
    ['Interactive Calculators','/calculators/','wavelength friis skin waveguide larmor rabi halbach noise'],
    ['Measurements & Instruments','/measurements/','vna spectrum analyzer vsa oscilloscope probes chamber calibration'],
    ['Simulation Library','/simulations/','python antenna array lorentz eit bloch halbach'],
    ['Literature Guide','/literature/','books reviews papers sources'],
    ['Presentations & Lectures','/presentations/','mit cern nasa lecture slides'],
    ['Foundations','/foundations/','maxwell waves boundary polarization poynting'],
    ['RF & Microwave','/rf-microwave/','transmission lines smith chart s parameters waveguide filter'],
    ['Antennas & Radiation','/antennas/','dipole patch horn gain aperture pattern polarization'],
    ['Wireless & MIMO','/wireless/','mimo channel rank ofdm evm precoding'],
    ['AESA & Phased Arrays','/aesa/','beam steering array factor grating lobes tr modules'],
    ['Radar & Remote Sensing','/radar/','radar equation fmcw doppler sar rcs'],
    ['EMI / EMC','/emc/','emissions immunity shielding grounding crosstalk compliance'],
    ['Optics & Photonics','/optics-photonics/','fresnel fiber laser diffraction photonics'],
    ['Power & Energy','/power-energy/','faraday transformer motor generator wireless power'],
    ['Medical Electromagnetics','/medical/','mri rf coil sar ablation hyperthermia'],
    ['Quantum Technologies','/quantum/','rabi stark atom field cavity quantum sensing'],
    ['Rydberg Semiclassical Optics','/rydberg-semiclassical-effects/','eit autler townes floquet rydberg rf'],
    ['Ground-State Magnetometry','/ground-state-magnetometry/','zeeman larmor serf halbach cpt'],
    ['Optically Pumped Magnetometer','/atomic-magnetometer/','opm serf bloch magnetic sensor'],
    ['Hydrogen Maser','/hydrogen-maser/','hyperfine frequency standard cavity maser'],
    ['Lorentz Force','/lorentz-force/','charged particle electric magnetic force'],
    ['Shockley–Ramo Current','/shockley-ramo/','weighting field induced current detector'],
    ['Subatomic Particles','/subatomic-particles/','accelerator detector charged particle'],
    ['Computational Methods','/computational-methods/','cuda gpu julia numerical'],
    ['Spacecraft EM','/computational-em/','satellite antenna emc installed pattern'],
    ['Gravity Probe B','/gravity-probe-b/','gyroscope squid london moment space'],
    ['VLBI & Chandler Wobble','/earth-space/chandler-wobble-vlbi.html','radio astronomy geodesy interferometry'],
    ['About','/about/','author scope source policy']
  ];

  const search = document.getElementById('site-search');
  const results = document.getElementById('search-results');
  function renderSearch(q) {
    if (!search || !results) return;
    q = q.trim().toLowerCase();
    if (!q) { results.hidden = true; results.innerHTML = ''; return; }
    const tokens = q.split(/\s+/);
    const found = pages.filter(p => tokens.every(t => (p[0]+' '+p[2]).toLowerCase().includes(t))).slice(0,9);
    results.innerHTML = found.length ? found.map(p => `<a href="${base}${p[1]}"><strong>${p[0]}</strong><small>${p[2]}</small></a>`).join('') : '<div class="sidebar-note">No matching indexed topic.</div>';
    results.hidden = false;
  }
  if (search) {
    search.addEventListener('input', e => renderSearch(e.target.value));
    search.addEventListener('keydown', e => {
      if (e.key === 'Escape') { search.value=''; renderSearch(''); search.blur(); }
      if (e.key === 'Enter') { const first = results && results.querySelector('a'); if(first) window.location.href=first.href; }
    });
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); search.focus(); }
    });
    document.addEventListener('click', e => { if (!e.target.closest('.site-search-wrap')) results.hidden = true; });
  }

  const toc = document.getElementById('page-toc-list');
  if (toc) {
    const hs = [...document.querySelectorAll('.content h2, .content h3')].filter(h => !h.closest('.page-toc'));
    hs.forEach((h,i) => {
      if (!h.id) h.id = (h.textContent || `section-${i}`).toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      const a = document.createElement('a');
      a.href = '#'+h.id; a.textContent = h.textContent; a.className = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2'; toc.appendChild(a);
      const anchor = document.createElement('a'); anchor.className='heading-anchor'; anchor.href='#'+h.id; anchor.textContent='¶'; anchor.setAttribute('aria-label','Link to this section'); h.appendChild(anchor);
    });
    const details = toc.closest('details'); if (!hs.length && details) details.remove();
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
