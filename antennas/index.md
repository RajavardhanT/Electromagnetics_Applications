---
layout: default
title: Antennas & Radiation
description: Practical antenna reference covering radiation, gain, aperture, polarization, near/far field, common antenna types, arrays, measurements and engineering limitations.
---

# Antennas & Radiation

<div class="intuition"><span class="callout-title">30-second intuition</span>An antenna is the transition between a guided electromagnetic mode and a radiated free-space mode. Its geometry controls the current distribution; the current distribution controls the radiated field; the field pattern determines where power goes and how efficiently another antenna can receive it.</div>

## 1. Radiation from time-varying current

Radiation ultimately comes from accelerating charge and time-varying current. In the far field, electric and magnetic fields become approximately transverse and locally related by the free-space impedance,

$$\frac{|E|}{|H|}\approx\eta_0\approx377\ \Omega.$$

The radiated power density is described by the time-average Poynting vector,

$$\langle\mathbf S\rangle=\frac12\operatorname{Re}\{\mathbf E\times\mathbf H^*\}.$$

## 2. Near field, Fresnel region and far field

For an antenna with largest dimension $D$, a commonly used far-field criterion is

$$R_{FF}\gtrsim\frac{2D^2}{\lambda}.$$

The exact boundary is application dependent. In the reactive near field, stored electric/magnetic energy dominates; in the radiating near field (Fresnel region), the angular field distribution still changes with distance; in the far field, angular dependence is effectively independent of range and fields scale approximately as $1/R$.

<div class="misconception"><span class="callout-title">Common misconception</span>“A few wavelengths away” is not a universal far-field rule. Electrically large apertures can require many wavelengths of separation.</div>

## 3. Radiation pattern, directivity and gain

Radiation intensity is

$$U(\theta,\phi)=r^2S_r.$$

Directivity is

$$D(\theta,\phi)=\frac{4\pi U(\theta,\phi)}{P_{rad}},
$$

and gain includes radiation efficiency,

$$G=\eta_{rad}D.$$

Important pattern quantities include main-beam direction, half-power beamwidth, sidelobe level, front-to-back ratio and cross-polarization.

## 4. Effective aperture

A receiving antenna converts incident power density into available power through its effective aperture,

$$A_e=\frac{G\lambda^2}{4\pi}.$$

This relation is one of the cleanest bridges between transmit and receive antenna concepts.

## 5. Polarization

Polarization describes the trajectory of the electric-field vector: linear, circular or elliptical. For two linearly polarized antennas with relative angle $\psi$, ideal polarization mismatch contributes

$$\eta_p=|\hat e_t\cdot\hat e_r|^2=\cos^2\psi.
$$

Circular polarization adds handedness; axial ratio is a common quality metric.

## 6. Common antenna families

| Antenna | Strength | Typical use |
|---|---|---|
| Dipole | simple reference radiator | communications, calibration |
| Monopole | compact over ground plane | mobile/vehicle systems |
| Loop | magnetic-field coupling | LF/HF, RFID, sensing |
| Patch | low profile, PCB integration | phones, GNSS, arrays |
| Horn | broadband, predictable pattern | microwave links, ranges, feeds |
| Reflector | very high gain | satellite, radio astronomy, radar |
| Helix | circular polarization | satellite/space links |
| Phased array | electronic steering | radar, 5G/6G, satellite terminals |

## 7. Arrays and beamforming

For a linear array,

$$AF(\theta)=\sum_{n=0}^{N-1}w_ne^{jn(kd\sin\theta+\beta_s)}.
$$

Changing progressive phase $\beta_s$ steers the beam. Element spacing, element pattern, mutual coupling and scan angle determine grating lobes and scan loss. See [AESA & Phased Arrays](../aesa/).

## 8. Link equation

For two matched, polarization-aligned antennas in free space,

$$P_r=P_tG_tG_r\left(\frac{\lambda}{4\pi R}\right)^2.
$$

This is a far-field power-transfer equation, not a complete channel model.

## Worked example — aperture of a 20 dBi antenna at 10 GHz

At 10 GHz, $\lambda\approx0.03$ m. A 20 dBi gain corresponds to $G=100$:

$$A_e=\frac{100(0.03)^2}{4\pi}\approx7.2\times10^{-3}\ \text{m}^2.
$$

That is about $72\ \text{cm}^2$ of effective receiving area.

## 9. How antennas are measured

- VNA: impedance, return loss and mutual coupling.
- Anechoic range: gain, pattern, polarization and sidelobes.
- Near-field scanner: measure near field and transform to far field.
- Reverberation chamber: efficiency/diversity/statistical OTA quantities.
- OTA chamber: complete device performance including enclosure and beamforming.

Antenna measurement is strongly affected by reference antenna calibration, chamber reflections, cable movement, positioner accuracy and polarization alignment.

## 10. Engineering reality

<div class="engineering"><span class="callout-title">What ideal equations miss</span>Connector launches, finite ground planes, radomes, housings, hands/heads, battery placement, cable currents, mutual coupling, manufacturing tolerance, substrate loss and nearby metal can shift resonance and reshape the pattern.</div>

## 11. Design questions worth asking

- What bandwidth and matching criterion are actually required?
- Is realized gain more important than raw directivity?
- What is the polarization environment?
- Does the platform alter the installed pattern?
- Is the antenna operating in someone's near field?
- How sensitive is performance to manufacturing tolerance?
- What quantity will be measured to validate the design?

## References

- C. A. Balanis, *Antenna Theory: Analysis and Design*.
- W. L. Stutzman and G. A. Thiele, *Antenna Theory and Design*.
- R. F. Harrington, *Time-Harmonic Electromagnetic Fields*.
- MIT OpenCourseWare, [Electromagnetics and Applications](https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-spring-2009/).

Related: [RF & Microwave](../rf-microwave/) · [Wireless & MIMO](../wireless/) · [AESA](../aesa/) · [Measurements](../measurements/)
