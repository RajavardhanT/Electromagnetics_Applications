---
layout: default
title: Electromagnetics Comparison Tables
description: Fast comparison tables for modes, field regions, antennas, numerical methods, instruments, radar types, beamforming, magnetometry, and RF/quantum measurement architectures.
---

# Electromagnetics Comparison Tables

Use these tables when the question is not “what is the equation?” but **“which model, instrument, architecture, or technology fits this problem?”**

## TEM vs TE vs TM

| Mode | Longitudinal $E_z$ | Longitudinal $H_z$ | Typical structure | Key point |
|---|---:|---:|---|---|
| TEM | 0 | 0 | coax, two-wire, ideal parallel plate | no cutoff in ideal homogeneous two-conductor line |
| TE | 0 | nonzero | metallic waveguide | cutoff exists |
| TM | nonzero | 0 | metallic/dielectric guides | cutoff exists |

## Reactive near field vs radiating near field vs far field

| Region | Dominant idea | $E/H$ relation | Use when |
|---|---|---|---|
| Reactive near field | stored electric/magnetic energy | not generally $\eta_0$ | close to small antennas, inductive/capacitive coupling |
| Radiating near field (Fresnel) | radiation present but angular pattern distance-dependent | locally complex | large apertures, finite range |
| Far field (Fraunhofer) | locally plane-wave-like | $E/H\approx\eta$ in simple media | antenna gain/pattern/link calculations |

## Common antenna families

| Antenna | Strength | Limitation | Use when |
|---|---|---|---|
| Dipole | simple, fundamental, predictable | moderate gain | reference antenna, basic RF links |
| Monopole | compact over ground plane | depends strongly on ground | mobile/vehicle/platform mounting |
| Loop | magnetic-field coupling, compact variants | efficiency can be low when electrically small | near-field magnetic sensing / compact receive |
| Patch | planar, PCB-compatible | bandwidth and efficiency can be limited | wireless devices, arrays |
| Horn | broadband, well-behaved aperture | physically large at low frequency | microwave measurement, feeds, calibration |
| Reflector | very high gain | pointing/mechanical size | satellite, radio astronomy, radar |
| Phased array | electronic steering, multifunction | cost, calibration, thermal/coupling complexity | AESA, satcom, mmWave |

## FEM vs FDTD vs MoM

| Method | Natural domain | Excellent for | Main cost/limitation | Use when |
|---|---|---|---|---|
| FEM | frequency or time, volume mesh | complex materials/geometry, waveguides, cavities | meshes entire volume | finite complex domains, resonators, components |
| FDTD | time domain, volume grid | broadband transients, pulse response | small cells/time steps; staircasing unless advanced mesh | broadband field evolution |
| MoM | usually frequency domain, surfaces/wires | conducting antennas/scattering | dense matrices for classical formulations | open-region conductors, wire/surface antennas |
| Asymptotic PO/GO/SBR | high frequency | electrically huge structures | less accurate near resonances/edges unless corrected | large reflectors, spacecraft, vehicles |

## VNA vs spectrum analyzer vs VSA vs oscilloscope

| Instrument | Measures directly | Best for | Does not replace |
|---|---|---|---|
| VNA | complex S-parameters | impedance, return loss, insertion loss, group delay | spectrum analyzer for unknown emissions |
| Spectrum analyzer | power vs frequency | spurs, harmonics, noise, emissions | VNA phase-coherent network characterization |
| VSA | complex modulated waveform/IQ | EVM, constellation, demodulation, modulation quality | broadband time-domain scope for arbitrary transients |
| Oscilloscope | voltage vs time | transients, timing, pulse shape, baseband/IF | calibrated RF network measurement |

## Homodyne vs heterodyne

| Architecture | LO relation | Advantage | Challenge | Use when |
|---|---|---|---|---|
| Homodyne / zero-IF | LO at carrier | simple direct baseband, low IF bandwidth | DC offsets, $1/f$ noise, IQ imbalance | compact coherent receivers |
| Heterodyne | nonzero IF | moves signal away from DC, filtering/selectivity | image/spur/mixer planning | robust RF receivers and precision beat detection |

## Pulsed vs FMCW vs CW Doppler radar

| Radar | Measures naturally | Strength | Limitation |
|---|---|---|---|
| Pulsed | range + Doppler with waveform processing | high peak power, long range | timing, pulse compression, blind ranges depending design |
| FMCW | range from beat frequency; velocity with chirp processing | compact, continuous low peak power | chirp linearity, leakage, range-Doppler coupling |
| CW Doppler | velocity | simple and sensitive | no direct absolute range without modulation |

## Analog vs digital vs hybrid beamforming

| Beamforming | RF chains | Strength | Limitation |
|---|---:|---|---|
| Analog | few | low power/cost | limited simultaneous beams / flexibility |
| Digital | one per element/channel | maximum flexibility, MIMO, multiple beams | converters/data/power/thermal load |
| Hybrid | intermediate | compromise | architecture/algorithm complexity |

## Helmholtz coils vs Halbach arrays

| Source | Tunability | Power | Field reversal | Homogeneity | Use when |
|---|---|---:|---|---|---|
| Helmholtz coils | excellent | continuous electrical power | easy | excellent near center when designed well | calibration, sweeps, precision control |
| Halbach permanent array | limited | essentially zero steady-state coil power | mechanical/reconfiguration needed | geometry dependent; can be excellent | compact strong permanent bias field |
| Halbach + trim coils | fine electronic trim | low | trim only unless designed otherwise | can be optimized | compact atomic/portable systems |

## Atomic magnetometry approaches

| Approach | Core observable | Typical regime | Strength | Limitation |
|---|---|---|---|---|
| Mx/Mz OPM | driven Larmor resonance | finite bias field | direct frequency-field relation | RF drive/systematic shifts |
| Bell–Bloom | optically driven spin precession | broad range | no separate RF drive required | modulation/light-shift control |
| SERF | near-zero-field spin polarization | near zero field, high density | extraordinary sensitivity | shielding, heating, limited large-field operation |
| CPT/EIT | ground-state coherence | optical two-photon resonance | narrow optical feature | laser coherence/systematics |
| Rydberg EIT | excited-state electric-dipole response | RF electric fields | SI-linked RF field sensing, broadband tunability | optical complexity, state/environment sensitivity |

## Ground-state vs Rydberg sensing

| Feature | Ground-state atom | Rydberg atom |
|---|---|---|
| Dominant sensing interaction | magnetic dipole / hyperfine/Zeeman | very large electric dipole; also Zeeman |
| Coherence | potentially very long | shorter, environment-sensitive |
| Common field | DC/AC magnetic | RF electric |
| Typical readout | optical rotation/absorption | EIT/AT/optical transmission |
| Main advantage | magnetic sensitivity | strong RF electric response and tunability |

## S-parameter vs field measurement

| Question | Better starting measurement |
|---|---|
| Is this filter matched? | VNA $S_{11}$ |
| What is insertion loss? | VNA $S_{21}$ |
| What spurious emissions exist? | spectrum analyzer |
| What is the radiated field at a point? | calibrated field probe/antenna |
| What is antenna gain/pattern? | antenna range / chamber |
| What is modulation quality? | VSA |
| What is transient voltage/current? | oscilloscope + suitable probe |

## Ideal model vs engineering model

| Layer | Includes | Use |
|---|---|---|
| Ideal analytic | dominant physics, symmetry, lossless approximations | intuition and first estimate |
| Corrected analytic/circuit | losses, parasitics, finite $Q$, mismatch | design-space exploration |
| Numerical full-wave | real geometry/materials | fields, coupling, resonance, radiation |
| Experimental calibration | fixtures, cables, probes, drift, uncertainty | defensible measurement |

<div class="intuition"><span class="callout-title">Decision rule</span>Choose the simplest model that retains the mechanism you are trying to predict. Add complexity only when the omitted effect is comparable to the quantity of interest.</div>
