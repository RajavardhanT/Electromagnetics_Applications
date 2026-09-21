---
layout: default
title: Applications of Electromagnetics
description: A connected, practical reference from Maxwell's equations to RF engineering, antennas, radar, EMC, photonics, power systems, space systems, atomic sensors, and quantum technologies.
---

<div class="hero">
<div class="hero-kicker">Fields → waves → matter → devices → systems → applications</div>
<h1>Applications of Electromagnetics</h1>
<p class="hero-subtitle">A connected engineering and physics reference built for <strong>understanding, calculation, measurement, simulation, and revision</strong> — from Maxwell's equations to antennas, spacecraft, MRI, accelerators, atomic sensors, and quantum technologies.</p>
<div class="hero-actions">
<a class="button primary" href="knowledge-map/">Explore the Knowledge Map</a>
<a class="button" href="reference/">Open Quick Reference</a>
<a class="button" href="calculators/">Use Calculators</a>
<a class="button" href="measurements/">Measurements & Instruments</a>
</div>

<div class="system-map" aria-label="Interactive electromagnetics system map">
  <div class="system-map-header">
    <div><strong>Interactive Electromagnetics Map</strong><span>Click any node to open that part of the reference.</span></div>
    <span>One field theory · multiple physical pathways</span>
  </div>
  <div class="system-map-hub">
    <a class="system-map-node hub" href="foundations/">∇ · Maxwell fields<small>sources · boundary conditions · energy flow</small></a>
  </div>
  <div class="system-map-branches">
    <div class="system-map-branch core">
      <a class="system-map-node" href="foundations/electromagnetic-waves.html">Waves<small>propagation · polarization</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="rf-microwave/">RF & Microwave<small>lines · S-parameters · waveguides</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="antennas/">Antennas & Arrays<small>radiation · aperture · beamforming</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="radar/">Wireless & Radar<small>links · MIMO · sensing</small></a>
    </div>
    <div class="system-map-branch particle">
      <a class="system-map-node" href="lorentz-force/">Lorentz Force<small>q(E + v × B)</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="subatomic-particles/">Particle Dynamics<small>acceleration · bending · focusing</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="shockley-ramo/">Shockley–Ramo<small>weighting field · induced current</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="measurements/">Detection & Readout<small>TIA · scope · spectrum</small></a>
    </div>
    <div class="system-map-branch quantum">
      <a class="system-map-node" href="quantum/">Atom–Field Interaction<small>−d·E · −μ·B · Ω</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="rydberg-semiclassical-effects/">Rydberg Sensing<small>EIT · AT · Floquet · nonlinearities</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="ground-state-magnetometry/">Atomic Magnetometry<small>Zeeman · Larmor · SERF</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="measurements/">Optical/RF Readout<small>photodetection · calibration</small></a>
    </div>
    <div class="system-map-branch tool">
      <a class="system-map-node" href="computational-methods/">Computational Methods<small>numerics · GPU · Julia</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="simulations/">Simulation Library<small>FEM · FDTD · MoM · Python</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="computational-em/">Spacecraft EM<small>installed antennas · coupling · EMC</small></a>
      <div class="system-map-connector">↓</div>
      <a class="system-map-node" href="theory-experiment/">Theory ↔ Experiment<small>observable · residual · validation</small></a>
    </div>
  </div>
  <div class="system-map-footer">The detailed <a href="knowledge-map/">Knowledge Map</a> expands these branches and their cross-connections.</div>
</div>
</div>

<div class="author-box">
<div class="author-monogram">RT</div>
<p><strong>Curated by Rajavardhan Talashila.</strong> This reference connects classical RF/microwave engineering, electromagnetics, measurement science, atomic physics, and Rydberg/quantum sensing. <a href="about/">Purpose, author context, and source policy →</a></p>
</div>

## Reference tools

<div class="card-grid category-tools">
<a class="reference-card" data-symbol="MAP" href="knowledge-map/"><span class="badge">Map</span><strong>Knowledge Map</strong><span>Connections among fields, waves, forces, circuits, antennas, sensors and quantum interactions.</span></a>
<a class="reference-card" data-symbol="Σ" href="reference/"><span class="badge">Reference</span><strong>Quick Reference</strong><span>Equations, scales, comparisons, scaling laws, derivations, misconceptions and history.</span></a>
<a class="reference-card" data-symbol="123" href="worked-examples/"><span class="badge">Examples</span><strong>Worked Examples</strong><span>Numerical examples spanning RF, antennas, radar, optics, magnetometry and quantum sensing.</span></a>
<a class="reference-card" data-symbol="ƒx" href="calculators/"><span class="badge">Calculator</span><strong>Interactive Calculators</strong><span>Wavelength, link budget, noise, skin depth, cutoff, radar, Larmor, Rabi and Halbach calculations.</span></a>
<a class="reference-card" data-symbol="VNA" href="measurements/"><span class="badge">Measurement</span><strong>Measurements & Instruments</strong><span>VNA, spectrum analyzer, VSA, oscilloscope, field probes, chambers, optical detectors and calibration.</span></a>
<a class="reference-card" data-symbol="∂t" href="simulations/"><span class="badge">Simulation</span><strong>Simulation Library</strong><span>Python-ready models for arrays, waves, charged particles, resonances, Stark/Zeeman and atomic sensing.</span></a>
<a class="reference-card" data-symbol="Δ" href="theory-experiment/"><span class="badge">Validation</span><strong>Theory ↔ Experiment</strong><span>Observable-first modeling, residuals, independent calibration and model validation.</span></a>
<a class="reference-card" data-symbol="GPU" href="computational-methods/"><span class="badge">Computing</span><strong>Computational Methods</strong><span>Numerical workflows, CUDA/GPU computing, Julia and scientific-computing methods.</span></a>
<a class="reference-card" data-symbol="DOI" href="literature/"><span class="badge">Sources</span><strong>Literature Guide</strong><span>Foundational papers, modern reviews, representative experiments and institutional sources.</span></a>
<a class="reference-card" data-symbol="PDF" href="presentations/"><span class="badge">Lectures</span><strong>Presentations & Lectures</strong><span>Curated technical presentations from universities, NASA, CERN and research institutions.</span></a>
</div>

## Core electromagnetics

<div class="card-grid category-core">
<a class="reference-card" data-symbol="∇" href="foundations/"><strong>Foundations</strong><span>Maxwell equations, boundary conditions, waves, polarization, energy and Poynting flow.</span></a>
<a class="reference-card" data-symbol="Z₀" href="rf-microwave/"><strong>RF & Microwave</strong><span>Transmission lines, Smith chart, S-parameters, waveguides, resonators, filters and networks.</span></a>
<a class="reference-card" data-symbol="G" href="antennas/"><strong>Antennas & Radiation</strong><span>Dipoles, loops, patches, horns, aperture, gain, polarization, near/far field and measurement.</span></a>
<a class="reference-card" data-symbol="H" href="wireless/"><strong>Wireless & MIMO</strong><span>Propagation, link budgets, channel matrices, rank, multiplexing, beamforming and EVM.</span></a>
<a class="reference-card" data-symbol="AF" href="aesa/"><strong>AESA & Phased Arrays</strong><span>Array factor, steering, T/R modules, scan loss, grating lobes, calibration and thermal limits.</span></a>
<a class="reference-card" data-symbol="R⁴" href="radar/"><strong>Radar & Remote Sensing</strong><span>Radar equation, range/Doppler, FMCW, RCS, phased arrays, SAR and measurement limits.</span></a>
<a class="reference-card" data-symbol="EMC" href="emc/"><strong>EMI / EMC</strong><span>Emissions, immunity, coupling, shielding, grounding, crosstalk, compliance and troubleshooting.</span></a>
<a class="reference-card" data-symbol="λ" href="optics-photonics/"><strong>Optics & Photonics</strong><span>Fresnel physics, diffraction, fibers, lasers, guided optics and photonic systems.</span></a>
<a class="reference-card" data-symbol="ΦB" href="power-energy/"><strong>Power & Energy</strong><span>Induction, transformers, motors, generators, magnetic materials and wireless power.</span></a>
<a class="reference-card" data-symbol="B₀" href="medical/"><strong>Medical Electromagnetics</strong><span>MRI, RF coils, SAR, microwave imaging, ablation, hyperthermia and implants.</span></a>
</div>

## Fields, particles and induced signals

<div class="card-grid category-particles">
<a class="reference-card" data-symbol="qF" href="lorentz-force/"><strong>Lorentz Force</strong><span>Electric and magnetic forces on charges, charged-particle motion, crossed fields and relativistic form.</span></a>
<a class="reference-card" data-symbol="Ew" href="shockley-ramo/"><strong>Shockley–Ramo Theorem</strong><span>Weighting fields, induced current, detector signals, moving charges, TIA readout and magnetic-field effects.</span></a>
<a class="reference-card" data-symbol="q/m" href="subatomic-particles/"><strong>Subatomic Particles & Accelerators</strong><span>Particle discovery, electromagnetic acceleration, bending, focusing, detection and spectrometry.</span></a>
</div>

## Atomic, quantum, space and precision systems

<div class="card-grid category-quantum">
<a class="reference-card" data-symbol="ℏ" href="quantum/"><strong>Quantum Technologies</strong><span>Atom–field interaction, Rabi coupling, Stark/Zeeman physics, cavities, sensing and conversion.</span></a>
<a class="reference-card" data-symbol="EIT" href="rydberg-semiclassical-effects/"><strong>Rydberg Semiclassical Optics</strong><span>EIT, AT splitting, dressed/Floquet states, multiphoton physics, nonlinearities and RF sensing.</span></a>
<a class="reference-card" data-symbol="ωL" href="ground-state-magnetometry/"><strong>Ground-State Magnetometry</strong><span>Larmor precession, optical pumping, SERF, CPT/EIT, RF magnetometry and Halbach arrays.</span></a>
<a class="reference-card" data-symbol="OPM" href="atomic-magnetometer/"><strong>Optically Pumped Atomic Magnetometers</strong><span>Zeeman interaction, spin polarization, Bloch dynamics, optical readout and scalar/vector magnetometry.</span></a>
<a class="reference-card" data-symbol="νH" href="hydrogen-maser/"><strong>Hydrogen Maser</strong><span>Hyperfine physics, stimulated microwave emission, cavities, stability and VLBI timing.</span></a>
<a class="reference-card" data-symbol="S/C" href="computational-em/"><strong>Spacecraft Electromagnetics</strong><span>Installed antenna patterns, coupling, EMC, satellite links, payloads and launch environments.</span></a>
<a class="reference-card" data-symbol="SQUID" href="gravity-probe-b/"><strong>Gravity Probe B</strong><span>Superconducting gyroscopes, London moment, SQUID readout and end-to-end precision engineering.</span></a>
<a class="reference-card" data-symbol="VLBI" href="earth-space/chandler-wobble-vlbi.html"><strong>VLBI, Chandler Wobble & Earth Rotation</strong><span>Interferometric radio astronomy, precision timing, baseline geometry and Earth-orientation measurement.</span></a>
</div>

## Bookmarkable references

<div class="card-grid category-reference">
<a class="reference-card" data-symbol="Eq" href="reference/fundamental-equations.html"><strong>Equation Sheet</strong><span>The relations most often reused across EM, RF, optics and atomic sensing.</span></a>
<a class="reference-card" data-symbol="10ⁿ" href="reference/orders-of-magnitude.html"><strong>Orders of Magnitude</strong><span>Wavelengths, powers, fields, timescales and noise levels.</span></a>
<a class="reference-card" data-symbol="∝" href="reference/scaling-laws.html"><strong>Scaling Laws</strong><span>Dependence on frequency, distance, size, $n$, bandwidth and field.</span></a>
<a class="reference-card" data-symbol="vs" href="reference/comparison-tables.html"><strong>Comparison Tables</strong><span>FEM/FDTD/MoM, antennas, radar types, magnetometers, homodyne/heterodyne and more.</span></a>
<a class="reference-card" data-symbol="≠" href="reference/common-misconceptions.html"><strong>Common Misconceptions</strong><span>Short corrections for ideas that routinely cause errors in EM and quantum sensing.</span></a>
<a class="reference-card" data-symbol="⇒" href="reference/derivations.html"><strong>Essential Derivations</strong><span>Selected derivations where the mathematics reveals useful physical structure.</span></a>
<a class="reference-card" data-symbol="t" href="reference/history-timeline.html"><strong>History Timeline</strong><span>Major developments from Coulomb, Faraday and Maxwell to RF engineering and modern field metrology.</span></a>
<a class="reference-card" data-symbol="∫dt" href="reference/equation-history.html"><strong>History Behind the Equations</strong><span>Historical context for the equations that shaped electromagnetics.</span></a>
</div>

## Technical page structure

Mature topic pages use a consistent reference format: **physical intuition, governing equations and assumptions, worked examples, visualizations or simulations, measurement methods, engineering limitations, literature, and related topics.**

<div class="engineering"><span class="callout-title">Engineering reality</span>Finite geometry, loss, parasitics, bandwidth, calibration, temperature, uncertainty, tolerances, nonlinearity and noise determine how closely real systems follow ideal equations.</div>

<div class="measurement"><span class="callout-title">Measurement</span>The <a href="measurements/">Measurements & Instruments</a> section connects field theory to VNA/VSA/spectrum-analyzer/oscilloscope methods, field probes, antenna ranges, photodetection, calibration and uncertainty.</div>

## External resources

The [Presentations & Lectures](presentations/) library contains curated institutional material from MIT, CERN, NASA and universities. The [Literature Guide](literature/) collects foundational papers, modern reviews, representative experiments and institutional resources.
