---
layout: default
title: Interactive Electromagnetics Calculators
description: Fast engineering calculators for wavelength, path loss, thermal noise, skin depth, waveguide cutoff, radar, atomic magnetometry, Rabi coupling, and Halbach fields.
---

# Interactive Electromagnetics Calculators

<div class="intuition"><span class="callout-title">Use calculators as a check, not a substitute for assumptions.</span>Every result below states the idealized relation being used. Real systems can differ because of loss, mismatch, finite geometry, calibration, dispersion, loading, temperature, and measurement uncertainty.</div>

<div class="calculator-grid">
<div class="calculator"><h2>Frequency ↔ wavelength</h2><p>$\lambda=c/f$ in free space.</p><label>Frequency <input id="wl-f" type="number" value="5.8" step="any"></label><select id="wl-unit"><option value="1e9">GHz</option><option value="1e6">MHz</option><option value="1e3">kHz</option><option value="1">Hz</option></select><button data-calc="wavelength">Calculate</button><output id="wl-out"></output></div>

<div class="calculator"><h2>Free-space path loss</h2><p>$FSPL=20\log_{10}(4\pi R/\lambda)$.</p><label>Frequency (GHz) <input id="fspl-f" type="number" value="5.8" step="any"></label><label>Distance (m) <input id="fspl-r" type="number" value="10" step="any"></label><button data-calc="fspl">Calculate</button><output id="fspl-out"></output></div>

<div class="calculator"><h2>Friis received power</h2><p>$P_r=P_tG_tG_r(\lambda/4\pi R)^2$.</p><label>$P_t$ (dBm) <input id="friis-pt" type="number" value="10" step="any"></label><label>$G_t$ (dBi) <input id="friis-gt" type="number" value="10" step="any"></label><label>$G_r$ (dBi) <input id="friis-gr" type="number" value="10" step="any"></label><label>Frequency (GHz) <input id="friis-f" type="number" value="5.8" step="any"></label><label>Distance (m) <input id="friis-r" type="number" value="10" step="any"></label><button data-calc="friis">Calculate</button><output id="friis-out"></output></div>

<div class="calculator"><h2>Thermal noise floor</h2><p>$P_n\approx-174+10\log_{10}B+NF$ dBm near 290 K.</p><label>Bandwidth (Hz) <input id="noise-b" type="number" value="1000000" step="any"></label><label>Noise figure (dB) <input id="noise-nf" type="number" value="5" step="any"></label><button data-calc="noise">Calculate</button><output id="noise-out"></output></div>

<div class="calculator"><h2>Skin depth</h2><p>$\delta=1/\sqrt{\pi f\mu\sigma}$.</p><label>Frequency (MHz) <input id="skin-f" type="number" value="100" step="any"></label><label>Conductivity (S/m) <input id="skin-s" type="number" value="5.8e7" step="any"></label><label>Relative permeability <input id="skin-mur" type="number" value="1" step="any"></label><button data-calc="skin">Calculate</button><output id="skin-out"></output></div>

<div class="calculator"><h2>Rectangular waveguide TE$_{10}$ cutoff</h2><p>$f_c=c/(2a\sqrt{\epsilon_r})$ for a nonmagnetic dielectric filling.</p><label>Broad-wall dimension $a$ (mm) <input id="wg-a" type="number" value="22.86" step="any"></label><label>$\epsilon_r$ <input id="wg-er" type="number" value="1" step="any"></label><button data-calc="waveguide">Calculate</button><output id="wg-out"></output></div>

<div class="calculator"><h2>Radar range resolution</h2><p>$\Delta R\approx c/(2B)$.</p><label>Signal bandwidth (MHz) <input id="rr-b" type="number" value="1000" step="any"></label><button data-calc="rangeResolution">Calculate</button><output id="rr-out"></output></div>

<div class="calculator"><h2>Monostatic Doppler shift</h2><p>$f_D=2v_r/\lambda$.</p><label>Frequency (GHz) <input id="dop-f" type="number" value="77" step="any"></label><label>Radial velocity (m/s) <input id="dop-v" type="number" value="30" step="any"></label><button data-calc="doppler">Calculate</button><output id="dop-out"></output></div>

<div class="calculator"><h2>Larmor frequency</h2><p>$f_L=(\gamma/2\pi)B$. Enter gyromagnetic ratio in Hz/T.</p><label>$\gamma/2\pi$ (Hz/T) <input id="lar-g" type="number" value="3.5e9" step="any"></label><label>Field (µT) <input id="lar-b" type="number" value="50" step="any"></label><button data-calc="larmor">Calculate</button><output id="lar-out"></output></div>

<div class="calculator"><h2>Electric-dipole Rabi frequency</h2><p>$\Omega=dE/\hbar$ for a fully projected dipole moment.</p><label>Dipole moment (ea$_0$) <input id="rabi-d" type="number" value="1000" step="any"></label><label>Electric field (V/m) <input id="rabi-e" type="number" value="0.1" step="any"></label><button data-calc="rabi">Calculate</button><output id="rabi-out"></output></div>

<div class="calculator"><h2>Ideal Halbach-cylinder bore field</h2><p>$B\approx B_r\ln(R_o/R_i)$ for an ideal infinitely long $p=1$ cylinder.</p><label>$B_r$ (T) <input id="halb-br" type="number" value="1.2" step="any"></label><label>$R_i$ (mm) <input id="halb-ri" type="number" value="20" step="any"></label><label>$R_o$ (mm) <input id="halb-ro" type="number" value="40" step="any"></label><button data-calc="halbach">Calculate</button><output id="halb-out"></output></div>
</div>

## Assumptions to remember

- Free-space link equations assume far-field propagation and do not include cable loss, polarization mismatch, multipath, atmospheric loss, or mismatch unless added separately.
- Skin depth assumes a good conductor and sinusoidal steady state.
- The waveguide expression is for the dominant TE$_{10}$ mode in an ideal rectangular guide.
- Radar resolution uses waveform bandwidth, not carrier frequency.
- Larmor and Rabi calculators require the correct state-dependent gyromagnetic ratio or projected transition matrix element.
- The Halbach expression is an ideal limit; segmentation, finite length, temperature, tolerances, and nearby magnetic material change the result.

See [Worked Examples](../worked-examples/), [Scaling Laws](../reference/scaling-laws.html), and [Measurements & Instruments](../measurements/) for context.

<script defer src="{{ '/assets/js/calculators.js' | relative_url }}"></script>
