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
    ['Spectrum Analyzer Signal Processing','/spectrum-analyzer-signal-processing/','spectrum analyzer signal hound bb60d superheterodyne fft rbw vbw window nuttall flattop detector real time persistence waterfall iq streaming adc usb dsp danl sfdr phase noise'],
    ['Simulation Library','/simulations/','python antenna array lorentz eit bloch halbach'],
    ['Theory ↔ Experiment','/theory-experiment/','model observable residual validation calibration theory experiment'],
    ['Literature Guide','/literature/','reviews papers primary literature institutional sources'],
    ['Presentations & Lectures','/presentations/','mit cern nasa lecture slides'],
    ['Foundations','/foundations/','maxwell waves boundary polarization poynting'],
    ['RF & Microwave','/rf-microwave/','transmission lines smith chart s parameters waveguide filter'],
    ['Microwave & Space Electronics Components','/microwave-space-components/','microwave rf components space satcom lna pa sspa twta mixer filter diplexer duplexer imux omux switch circulator isolator limiter attenuator dsa phase shifter beamformer coupler hybrid pll vco synthesizer oscillator adc dac mmic gan gaas sige soi transponder waveguide rad hard radiation'],
    ['Antennas & Radiation','/antennas/','dipole patch horn gain aperture pattern polarization'],
    ['Wireless & MIMO','/wireless/','mimo channel rank ofdm evm precoding'],
    ['3GPP Standards','/3gpp-standards/','3gpp nr lte 5g advanced 38.101 38.521 38.508 38.133 38.533 38.331 38.306 38.211 38.212 38.213 38.214 38.104 38.141 37.340 endc nsa sa redcap ntn conformance rrm'],
    ['RF Bands — Compact Reference','/rf-bands/','rf bands gsm lte nr 5g n77 n78 n41 n260 n261 l band s band c band x band ku k ka v w wifi ism gnss spectrum frequency'],
    ['AESA & Phased Arrays','/aesa/','beam steering array factor grating lobes tr modules'],
    ['Radar & Remote Sensing','/radar/','radar equation fmcw doppler sar rcs'],
    ['EMI / EMC','/emc/','emissions immunity shielding grounding crosstalk compliance'],
    ['Signal Integrity & Power Integrity','/signal-power-integrity/','signal integrity power integrity si pi pcie pci express usb usb4 usb c pdn decoupling eye jitter ber tdr s parameters nvidia gpu h100 nvlink ddr ethernet hdmi displayport'],
    ['Hardware Interfaces & PCB/Flex Design','/hardware-interfaces-pcb-flex/','pcie usb thunderbolt i2c spi uart hdmi pcb flex rigid flex layout altium allegro cadence xpedition kicad signal integrity power integrity differential pair impedance via backdrill stackup'],
    ['Analog Mixed-Signal IC Design','/analog-mixed-signal/','analog mixed signal ams bandgap bias ldo amplifier comparator switched capacitor adc dac oscillator pll filter mismatch noise linearity stability calibration lms finfet layout characterization verilog ams systemverilog matlab python'],
    ['ADC & DAC — Data Converters','/data-converters/','adc dac data converter analog digital sampling quantization nyquist aliasing enob sndr sinad sfdr inl dnl aperture jitter sar flash pipeline delta sigma noise shaping current steering jesd204 rf converter settling glitch'],
    ['High-Speed SerDes & IO','/high-speed-serdes/','serdes high speed io tx rx pll cdr ctle dfe ffe equalization adaptation nrz pam4 serializer deserializer 100g 112g pcie usb displayport mphy primetime nanotime timing closure ip delivery lab debug'],
    ['Silicon Interfaces & SoC Implementation','/silicon-soc/','silicon soc pcie ucie ddr ethernet risc-v riscv arm cpu noc gds gdsii oasis tapeout rtl synthesis sta floorplan place route pnr dft mbist lbist jtag cdc rdc upf ir drop electromigration phy controller mac pcs pma'],
    ['Optics & Photonics','/optics-photonics/','fresnel fiber laser diffraction photonics'],
    ['Laser Systems','/laser-systems/','laser linewidth frequency noise cavity locking pdh pound drever hall shg second harmonic generation coherence beat note self heterodyne allan deviation stability'],
    ['Allan Deviation & Laser Stability','/laser-systems/allan-deviation.html','allan deviation adev modified allan mdev overlapping allan frequency stability oscillator stability cavity laser beat note shg drift random walk flicker white noise'],
    ['Power & Energy','/power-energy/','faraday transformer motor generator wireless power'],
    ['Medical Electromagnetics','/medical/','mri rf coil sar ablation hyperthermia'],
    ['CT CAT Scan Physics','/medical/ct-scan-physics.html','ct cat computed tomography x ray attenuation hounsfield filtered backprojection reconstruction dose detector photon counting spectral ct'],
    ['Quantum Technologies','/quantum/','rabi stark atom field cavity quantum sensing'],
    ['EM Simulation of Quantum Computing','/quantum/em-simulation-quantum-computing.html','electromagnetic simulation quantum computing superconducting qubit transmon hfss cst comsol resonator coupling package modes purcell participation black box quantization'],
    ['Rydberg Semiclassical Optics','/rydberg-semiclassical-effects/','eit autler townes floquet rydberg rf'],
    ['Ground-State Magnetometry','/ground-state-magnetometry/','zeeman larmor serf halbach cpt'],
    ['Optically Pumped Magnetometer','/atomic-magnetometer/','opm serf bloch magnetic sensor'],
    ['Hydrogen Maser','/hydrogen-maser/','hyperfine frequency standard cavity maser'],
    ['Lorentz Force','/lorentz-force/','charged particle electric magnetic force'],
    ['Shockley–Ramo Current','/shockley-ramo/','weighting field induced current detector'],
    ['Subatomic Particles','/subatomic-particles/','accelerator detector charged particle'],
    ['Paul Traps','/paul-traps/','paul trap rf ion trap quadrupole mathieu stability pseudopotential secular motion micromotion ion crystal mass filter'],
    ['Computational Methods','/computational-methods/','cuda gpu julia numerical'],
    ['Arduino Boards','/arduino/','arduino uno r3 r4 nano esp32 mkr giga portenta microcontroller mcu gpio adc dac pwm timer interrupt uart i2c spi can usb sensor motor mosfet debugging embedded'],
    ['Spacecraft EM','/computational-em/','satellite antenna emc installed pattern'],
    ['Artemis Lunar Communications','/artemis-communications/','artemis moon lunar orion communications deep space network dsn near space network nsn s band ka band optical laser o2o lunanet gateway relay pnt tracking doppler ranging phased array'],
    ['Modern Inertial Navigation','/inertial-navigation/','inertial navigation ins imu mems fog rlg gyro accelerometer strapdown quaternion kalman gnss pnt sensor fusion visual lidar radar schuler coning sculling allan deviation quantum atom interferometer'],
    ['Modern Gyroscopes','/modern-gyroscopes/','gyroscope gyro mems coriolis tuning fork fog fiber optic ring laser rlg sagnac hrg hemispherical resonator bias instability angle random walk allan deviation scale factor atom interferometer'],
    ['Gravity Probe B','/gravity-probe-b/','gyroscope squid london moment space'],
    ['VLBI & Chandler Wobble','/earth-space/chandler-wobble-vlbi.html','radio astronomy geodesy interferometry'],
    ['Great Scientists','/reference/great-scientists.html','euclid archimedes hipparchus ptolemy arab scientists leonardo copernicus vesalius galileo huygens leeuwenhoek hooke newton linnaeus hutton lavoisier dalton faraday babbage darwin pasteur mendel mendeleyev maxwell planck curie rutherford einstein wegener bohr hubble heisenberg pauling dna crick watson franklin hawking history'],
    ['About','/about/','author scope source policy']
  ];

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
