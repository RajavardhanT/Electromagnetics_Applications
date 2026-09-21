---
layout: default
title: RF & Microwave Engineering
description: Transmission lines, matching, S-parameters, waveguides, resonators, filters, microwave networks, measurements and engineering intuition.
---

# RF & Microwave Engineering

<div class="intuition"><span class="callout-title">30-second intuition</span>At RF and microwave frequencies, interconnects are no longer “just wires.” Their physical length becomes comparable with wavelength, so voltage and current propagate as waves, reflections matter, and geometry becomes part of the circuit.</div>

## 1. Transmission lines

A distributed line is described by per-unit-length $R,L,G,C$:

$$Z_0=\sqrt{\frac{R+j\omega L}{G+j\omega C}},\qquad
\gamma=\sqrt{(R+j\omega L)(G+j\omega C)}.
$$

For an ideal lossless line,

$$Z_0=\sqrt{L/C},\qquad \gamma=j\beta.
$$

## 2. Reflection and mismatch

At a load $Z_L$,

$$\Gamma_L=\frac{Z_L-Z_0}{Z_L+Z_0}.
$$

Return loss and VSWR are

$$RL=-20\log_{10}|\Gamma|,
$$

$$VSWR=\frac{1+|\Gamma|}{1-|\Gamma|}.
$$

Mismatch loss is

$$ML=-10\log_{10}(1-|\Gamma|^2).
$$

<div class="misconception"><span class="callout-title">Common misconception</span>A low $S_{11}$ is not automatically a “good antenna/device.” It only says little power is reflected at that reference plane; power may still be dissipated rather than usefully radiated/transmitted.</div>

## 3. Input impedance of a line

For a lossless line of length $l$,

$$Z_{in}=Z_0\frac{Z_L+jZ_0\tan\beta l}{Z_0+jZ_L\tan\beta l}.
$$

At $l=\lambda/4$, a quarter-wave transformer can match two real impedances using

$$Z_t=\sqrt{Z_0Z_L}.
$$

## 4. Smith chart

The Smith chart maps normalized impedance/admittance to complex reflection coefficient. It is especially useful for:

- moving along a transmission line;
- adding series/shunt reactance;
- visualizing matching trajectories;
- reading VSWR and return loss;
- understanding narrowband matching sensitivity.

## 5. S-parameters

For a two-port network,

$$\mathbf b=\mathbf S\mathbf a.
$$

- $S_{11}$: input reflection;
- $S_{21}$: forward transmission;
- $S_{12}$: reverse transmission/isolation;
- $S_{22}$: output reflection.

At high frequency, S-parameters are practical because incident/reflected traveling waves are easier to measure than terminal open/short currents and voltages.

## 6. Rectangular waveguide

For a rectangular guide with broad dimension $a$ and height $b$, cutoff is

$$f_{c,mn}=\frac{c}{2\sqrt{\epsilon_r}}\sqrt{\left(\frac{m}{a}\right)^2+\left(\frac{n}{b}\right)^2}.
$$

The dominant mode is usually TE$_{10}$:

$$f_{c,10}=\frac{c}{2a\sqrt{\epsilon_r}}.
$$

Waveguides carry modes, not simple TEM waves.

## 7. Resonators and quality factor

A resonator stores electric and magnetic energy. A useful relation is

$$Q=2\pi\frac{\text{energy stored}}{\text{energy lost per cycle}}
\approx\frac{f_0}{\Delta f_{3\text{dB}}}.
$$

Loaded $Q$ includes internal loss and external coupling.

## 8. Filters and coupled resonators

Microwave filters are implemented with transmission-line sections, cavities, microstrip resonators, dielectric resonators, waveguide irises and lumped/distributed hybrids. Key specifications include insertion loss, return loss, fractional bandwidth, group delay, rejection, power handling and temperature stability.

## 9. Couplers, dividers and hybrids

Directional couplers sample forward/reverse waves. Wilkinson dividers provide matched splitting and isolation. 90°/180° hybrids enable balanced amplifiers, mixers, beamforming and measurement networks.

## Worked example — 50 Ω to 100 Ω quarter-wave match

$$Z_t=\sqrt{50\times100}=70.7\ \Omega.$$

At 2 GHz in a medium with effective dielectric constant $\epsilon_{eff}=2.25$,

$$\lambda_g\approx\frac{c}{f\sqrt{\epsilon_{eff}}}\approx0.10\ \text{m},
$$

so a quarter-wave section is roughly 25 mm before discontinuity/end-effect corrections.

## 10. Measurement workflow

A VNA is the central RF network instrument. Good practice:

1. calibrate at the actual reference plane;
2. choose source power that does not compress the DUT;
3. use appropriate IF bandwidth/averaging;
4. control cable movement;
5. de-embed fixtures only with a defensible model;
6. inspect phase/group delay, not only magnitude.

See [Measurements & Instruments](../measurements/).

## 11. Engineering reality

<div class="engineering"><span class="callout-title">What changes real hardware</span>Conductor/dielectric loss, connector launches, dispersion, radiation, surface roughness, via inductance, package modes, parasitics, thermal drift, nonlinear devices and calibration error all become increasingly important with frequency.</div>

## References

- D. M. Pozar, *Microwave Engineering*.
- R. E. Collin, *Foundations for Microwave Engineering*.
- S. Ramo, J. R. Whinnery and T. Van Duzer, *Fields and Waves in Communication Electronics*.
- MIT OpenCourseWare, [Electromagnetics and Applications](https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/).

Related: [Antennas](../antennas/) · [EMC](../emc/) · [Calculators](../calculators/) · [Worked Examples](../worked-examples/)
