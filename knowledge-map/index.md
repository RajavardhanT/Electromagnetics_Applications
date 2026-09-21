---
layout: default
title: Electromagnetics Knowledge Map
description: A clickable map connecting electromagnetic fundamentals to RF, antennas, wireless, radar, power, photonics, biomedical systems, space systems, and quantum sensing.
---

# Electromagnetics Knowledge Map

<div class="intuition"><span class="callout-title">Physical intuition in 30 seconds</span>Most electromagnetic technologies can be understood by repeatedly asking five questions: <strong>What fields exist? How do they propagate? How do they interact with matter? What device converts that interaction into a useful signal or force? How does the complete system use it?</strong></div>

The organizing chain for this site is

$$
\boxed{\text{fields}\rightarrow\text{waves}\rightarrow\text{interaction with matter}\rightarrow\text{devices}\rightarrow\text{systems}\rightarrow\text{applications}.}
$$

## 1. Foundations: the field description

<div class="knowledge-map">
<div class="map-column"><h3>Sources & fields</h3><a href="../foundations/maxwells-equations.html">Maxwell equations</a><a href="../lorentz-force/">Lorentz force</a><a href="../reference/fundamental-equations.html">Constitutive relations</a><a href="../foundations/boundary-conditions.html">Boundary conditions</a></div>
<div class="map-column"><h3>Energy & momentum</h3><a href="../foundations/power-and-poynting-vector.html">Poynting vector</a><a href="../power-energy/">Stored magnetic/electric energy</a><a href="../lorentz-force/">Force and torque</a></div>
<div class="map-column"><h3>Waves</h3><a href="../foundations/electromagnetic-waves.html">Wave equation</a><a href="../foundations/polarization.html">Polarization</a><a href="../optics-photonics/">Reflection/refraction</a><a href="../rf-microwave/">Guided waves</a></div>
</div>

## 2. Classical engineering branches

<div class="knowledge-map">
<div class="map-column"><h3>Guided energy</h3><a href="../rf-microwave/">Transmission lines</a><a href="../rf-microwave/">Waveguides</a><a href="../rf-microwave/">Resonators & filters</a><a href="../emc/">Interconnects & EMC</a></div>
<div class="map-column"><h3>Radiated energy</h3><a href="../antennas/">Antennas</a><a href="../aesa/">Phased arrays</a><a href="../wireless/">Wireless links & MIMO</a><a href="../radar/">Radar</a></div>
<div class="map-column"><h3>Forces & induction</h3><a href="../power-energy/">Transformers</a><a href="../power-energy/">Motors & generators</a><a href="../subatomic-particles/">Accelerators</a><a href="../shockley-ramo/">Detector signals</a></div>
<div class="map-column"><h3>High-frequency EM</h3><a href="../optics-photonics/">Optics & photonics</a><a href="../medical/">MRI & biomedical EM</a><a href="../computational-em/">Spacecraft systems</a></div>
</div>

## 3. Classical-to-quantum bridge

Start with the classical field and quantize the material response rather than the field itself:

$$
\mathbf E(t)\rightarrow H_E=-\mathbf d\cdot\mathbf E(t),\qquad
\mathbf B(t)\rightarrow H_B=-\boldsymbol\mu\cdot\mathbf B(t).
$$

<div class="pathway"><a href="../quantum/">Atom–field Hamiltonian</a><span class="arrow">→</span><a href="../rydberg-semiclassical-effects/">Rabi / EIT / AT</a><span class="arrow">→</span><a href="../rydberg-semiclassical-effects/#26-floquet-physics">Floquet dressing</a><span class="arrow">→</span><a href="../measurements/">Optical/RF readout</a></div>

<div class="pathway"><a href="../ground-state-magnetometry/">Zeeman interaction</a><span class="arrow">→</span><a href="../ground-state-magnetometry/#3-larmor-precession">Larmor precession</a><span class="arrow">→</span><a href="../ground-state-magnetometry/#5-optical-pumping">Optical pumping</a><span class="arrow">→</span><a href="../ground-state-magnetometry/#14-serf-magnetometer">SERF / OPM</a></div>

## 4. From Maxwell to complete systems

### Maxwell → wireless link
<div class="pathway"><span class="node">Maxwell</span><span class="arrow">→</span><span class="node">wave equation</span><span class="arrow">→</span><span class="node">current distribution</span><span class="arrow">→</span><a href="../antennas/">antenna</a><span class="arrow">→</span><span class="node">propagation</span><span class="arrow">→</span><a href="../wireless/">receiver</a></div>

### Maxwell → AESA radar
<div class="pathway"><span class="node">Maxwell</span><span class="arrow">→</span><a href="../antennas/">element pattern</a><span class="arrow">→</span><a href="../aesa/">array factor</a><span class="arrow">→</span><span class="node">beam steering</span><span class="arrow">→</span><a href="../radar/">radar equation</a><span class="arrow">→</span><span class="node">detection</span></div>

### Maxwell → MRI
<div class="pathway"><span class="node">static $B_0$</span><span class="arrow">→</span><span class="node">spin precession</span><span class="arrow">→</span><span class="node">RF $B_1$</span><span class="arrow">→</span><a href="../medical/">RF coil</a><span class="arrow">→</span><span class="node">gradient encoding</span><span class="arrow">→</span><span class="node">image</span></div>

### Maxwell → Rydberg RF sensor
<div class="pathway"><span class="node">RF $\mathbf E$</span><span class="arrow">→</span><span class="node">$-\mathbf d\cdot\mathbf E$</span><span class="arrow">→</span><span class="node">Rabi coupling</span><span class="arrow">→</span><a href="../rydberg-semiclassical-effects/">EIT / AT / Floquet</a><span class="arrow">→</span><span class="node">photodetector</span><span class="arrow">→</span><span class="node">field estimate</span></div>

### Charged particle → measured current
<div class="pathway"><a href="../lorentz-force/">$q(\mathbf E+\mathbf v\times\mathbf B)$</a><span class="arrow">→</span><span class="node">trajectory</span><span class="arrow">→</span><a href="../shockley-ramo/">$q\mathbf v\cdot\mathbf E_w$</a><span class="arrow">→</span><span class="node">TIA</span><span class="arrow">→</span><a href="../measurements/">oscilloscope / spectrum</a></div>

## 5. Choose a model by electrical size

A powerful first question is whether the structure is electrically small:

$$
ka=\frac{2\pi a}{\lambda}.
$$

| Regime | First model to consider | Typical applications |
|---|---|---|
| $ka\ll1$ | electro/magneto-quasistatics | capacitors, inductors, small sensors |
| $ka\sim1$ | full-wave Maxwell solution | antennas, resonators, scattering |
| $ka\gg1$ | full-wave or high-frequency asymptotics | electrically large spacecraft, reflectors, radar scenes |

See [Scaling Laws & Dimensionless Numbers](../reference/scaling-laws.html) for a much larger regime map.

## 6. Three ways to navigate this site

<div class="card-grid">
<a class="reference-card" href="../reference/"><strong>By physics</strong><span>Equations → scales → derivations → comparisons → misconceptions.</span></a>
<a class="reference-card" href="../measurements/"><strong>By laboratory task</strong><span>What quantity do I need, what instrument measures it, and what dominates uncertainty?</span></a>
<a class="reference-card" href="../simulations/"><strong>By model</strong><span>Analytic → circuit → FEM/FDTD/MoM → Monte Carlo → density matrix/Floquet.</span></a>
</div>

---

The map is intentionally recursive: a sophisticated system usually contains several simpler electromagnetic problems nested inside one another.
