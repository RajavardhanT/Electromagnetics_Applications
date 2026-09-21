---
layout: default
title: Interactive Electromagnetics Calculators
description: Fast engineering calculators for wavelength, path loss, thermal noise, skin depth, waveguide cutoff, radar, atomic magnetometry, Rabi coupling, and Halbach fields.
---

# Interactive Electromagnetics Calculators

<div class="intuition"><span class="callout-title">Use calculators as a check, not a substitute for assumptions.</span>Every result below states the idealized relation being used. Real systems can differ because of loss, mismatch, finite geometry, calibration, dispersion, loading, temperature, and measurement uncertainty.</div>

<div class="calc-grid">

<div class="calculator"><h3>Frequency ↔ wavelength</h3><p>$\lambda=c/f$ in free space.</p><div class="calc-row"><input id="wl-f" aria-label="Frequency" type="number" value="5.8" step="any"><select id="wl-unit" aria-label="Frequency unit"><option value="1e9">GHz</option><option value="1e6">MHz</option><option value="1e3">kHz</option><option value="1">Hz</option></select></div><button class="button" data-calc="wavelength">Calculate</button><div class="calc-result" id="wl-out"></div></div>

<div class="calculator"><h3>Free-space path loss</h3><p>$FSPL=20\log_{10}(4\pi R/\lambda)$.</p><div class="calc-row"><label for="fspl-f">Frequency (GHz)</label><input id="fspl-f" type="number" value="5.8" step="any"></div><div class="calc-row"><label for="fspl-r">Distance (m)</label><input id="fspl-r" type="number" value="10" step="any"></div><button class="button" data-calc="fspl">Calculate</button><div class="calc-result" id="fspl-out"></div></div>

<div class="calculator"><h3>Friis received power</h3><p>$P_r=P_tG_tG_r(\lambda/4\pi R)^2$.</p><div class="calc-row"><label for="friis-pt">$P_t$ (dBm)</label><input id="friis-pt" type="number" value="10" step="any"></div><div class="calc-row"><label for="friis-gt">$G_t$ (dBi)</label><input id="friis-gt" type="number" value="10" step="any"></div><div class="calc-row"><label for="friis-gr">$G_r$ (dBi)</label><input id="friis-gr" type="number" value="10" step="any"></div><div class="calc-row"><label for="friis-f">Frequency (GHz)</label><input id="friis-f" type="number" value="5.8" step="any"></div><div class="calc-row"><label for="friis-r">Distance (m)</label><input id="friis-r" type="number" value="10" step="any"></div><button class="button" data-calc="friis">Calculate</button><div class="calc-result" id="friis-out"></div></div>

<div class="calculator"><h3>Thermal noise floor</h3><p>$P_n\approx-174+10\log_{10}B+NF$ dBm near 290 K.</p><div class="calc-row"><label for="noise-b">Bandwidth (Hz)</label><input id="noise-b" type="number" value="1000000" step="any"></div><div class="calc-row"><label for="noise-nf">Noise figure (dB)</label><input id="noise-nf" type="number" value="5" step="any"></div><button class="button" data-calc="noise">Calculate</button><div class="calc-result" id="noise-out"></div></div>

<div class="calculator"><h3>Skin depth</h3><p>$\delta=1/\sqrt{\pi f\mu\sigma}$.</p><div class="calc-row"><label for="skin-f">Frequency (MHz)</label><input id="skin-f" type="number" value="100" step="any"></div><div class="calc-row"><label for="skin-s">Conductivity (S/m)</label><input id="skin-s" type="number" value="5.8e7" step="any"></div><div class="calc-row"><label for="skin-mur">Relative permeability</label><input id="skin-mur" type="number" value="1" step="any"></div><button class="button" data-calc="skin">Calculate</button><div class="calc-result" id="skin-out"></div></div>

<div class="calculator"><h3>Rectangular waveguide TE$_{10}$ cutoff</h3><p>$f_c=c/(2a\sqrt{\epsilon_r})$.</p><div class="calc-row"><label for="wg-a">Broad wall $a$ (mm)</label><input id="wg-a" type="number" value="22.86" step="any"></div><div class="calc-row"><label for="wg-er">$\epsilon_r$</label><input id="wg-er" type="number" value="1" step="any"></div><button class="button" data-calc="waveguide">Calculate</button><div class="calc-result" id="wg-out"></div></div>

<div class="calculator"><h3>Radar range resolution</h3><p>$\Delta R\approx c/(2B)$.</p><div class="calc-row"><label for="rr-b">Bandwidth (MHz)</label><input id="rr-b" type="number" value="1000" step="any"></div><button class="button" data-calc="rangeResolution">Calculate</button><div class="calc-result" id="rr-out"></div></div>

<div class="calculator"><h3>Monostatic Doppler shift</h3><p>$f_D=2v_r/\lambda$.</p><div class="calc-row"><label for="dop-f">Frequency (GHz)</label><input id="dop-f" type="number" value="77" step="any"></div><div class="calc-row"><label for="dop-v">Radial velocity (m/s)</label><input id="dop-v" type="number" value="30" step="any"></div><button class="button" data-calc="doppler">Calculate</button><div class="calc-result" id="dop-out"></div></div>

<div class="calculator"><h3>Larmor frequency</h3><p>$f_L=(\gamma/2\pi)B$. Enter $\gamma/2\pi$ in Hz/T.</p><div class="calc-row"><label for="lar-g">$\gamma/2\pi$ (Hz/T)</label><input id="lar-g" type="number" value="3.5e9" step="any"></div><div class="calc-row"><label for="lar-b">Field (µT)</label><input id="lar-b" type="number" value="50" step="any"></div><button class="button" data-calc="larmor">Calculate</button><div class="calc-result" id="lar-out"></div></div>

<div class="calculator"><h3>Electric-dipole Rabi frequency</h3><p>$\Omega=dE/\hbar$ for a fully projected dipole moment.</p><div class="calc-row"><label for="rabi-d">Dipole (ea$_0$)</label><input id="rabi-d" type="number" value="1000" step="any"></div><div class="calc-row"><label for="rabi-e">Electric field (V/m)</label><input id="rabi-e" type="number" value="0.1" step="any"></div><button class="button" data-calc="rabi">Calculate</button><div class="calc-result" id="rabi-out"></div></div>

<div class="calculator"><h3>Ideal Halbach-cylinder bore field</h3><p>$B\approx B_r\ln(R_o/R_i)$ for an ideal infinitely long $p=1$ cylinder.</p><div class="calc-row"><label for="halb-br">$B_r$ (T)</label><input id="halb-br" type="number" value="1.2" step="any"></div><div class="calc-row"><label for="halb-ri">$R_i$ (mm)</label><input id="halb-ri" type="number" value="20" step="any"></div><div class="calc-row"><label for="halb-ro">$R_o$ (mm)</label><input id="halb-ro" type="number" value="40" step="any"></div><button class="button" data-calc="halbach">Calculate</button><div class="calc-result" id="halb-out"></div></div>

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
