---
layout: default
title: EMI / EMC
description: Practical electromagnetic compatibility reference covering source-path-victim thinking, emissions, immunity, shielding, grounding, crosstalk, SI/PI, pre-compliance and debugging.
---

# Electromagnetic Compatibility (EMC)

<div class="intuition"><span class="callout-title">30-second intuition</span>Every EMC problem can be organized as <strong>source → coupling path → victim</strong>. Reduce the source, interrupt the path, harden the victim—or combine all three.</div>

## 1. EMI versus EMC

**Electromagnetic interference (EMI)** is unwanted electromagnetic disturbance. **Electromagnetic compatibility (EMC)** is the ability of equipment to operate acceptably in its environment without creating unacceptable disturbance for other equipment.

## 2. Coupling paths

Common paths include:

- conductive coupling through power/signal wiring;
- capacitive electric-field coupling;
- inductive magnetic-field coupling;
- radiated far-field coupling;
- common-impedance coupling through shared return paths.

At low frequency, circuits/loops often provide the most intuitive model. At higher frequency, distributed fields, apertures, cables and resonances dominate.

## 3. Common mode versus differential mode

Differential current flows out on one conductor and returns on its intended partner. Common-mode current flows in the same direction on multiple conductors and returns through parasitic paths/chassis/environment.

Common-mode currents are often surprisingly efficient radiators because the return path can be physically large.

## 4. Shielding

A simple shielding-effectiveness definition is

$$SE=20\log_{10}\left|\frac{E_{without}}{E_{with}}\right|.
$$

Real enclosure shielding is commonly limited by seams, apertures, cable penetrations and bonding—not bulk material attenuation.

<div class="misconception"><span class="callout-title">Common misconception</span>“Put it in a metal box” does not guarantee good shielding. A cable or slot can become the dominant antenna of the entire enclosure.</div>

## 5. Grounding and bonding

At RF, “ground” is not an equipotential abstraction. Connection inductance matters:

$$Z_L=j\omega L.
$$

A bond that is excellent at DC can be poor at hundreds of MHz because a few centimetres of conductor add significant inductive reactance.

## 6. Crosstalk

Adjacent traces/cables couple through mutual capacitance and inductance. Near-end and far-end crosstalk depend on geometry, propagation velocity and termination. Reduce crosstalk by controlling spacing, return paths, layer stackup, edge rate and termination.

## 7. Signal integrity and power integrity

Fast digital systems are electromagnetic systems. Important effects include:

- impedance discontinuity/reflection;
- simultaneous switching noise;
- return-path discontinuity;
- resonant power/ground planes;
- package/via inductance;
- jitter and eye closure.

A useful design rule is to think in **edge rate** rather than clock frequency alone.

## 8. Conducted and radiated emissions

### Conducted
Often measured with a LISN or appropriate coupling network to present a defined impedance and extract noise on power leads.

### Radiated
Measured with calibrated antennas/receivers in specified geometry, chamber/site and detector bandwidth.

The reported value can include antenna factor, cable loss and preamplifier gain corrections.

## 9. Immunity/susceptibility

Typical stress methods include radiated RF fields, bulk-current injection, conducted RF injection, ESD, EFT/burst and surge. The pass/fail criterion is functional performance, not simply field level.

## 10. Pre-compliance debugging

A high-value lab workflow is:

1. reproduce the emission/immunity symptom;
2. localize frequency and operating mode;
3. use near-field E/H probes to locate hot structures;
4. clamp current probe around cables to identify common-mode paths;
5. change one coupling path at a time;
6. verify with a repeatable setup;
7. only then optimize the permanent fix.

## 11. Shielding/absorber intuition

Absorbers dissipate field energy; conductive shields reflect and redistribute currents; ferrites add frequency-dependent impedance/loss to suppress cable/common-mode currents. They solve different problems.

## 12. RF compliance and wireless coexistence

Wireless products can pass regulatory emissions and still suffer self-desense or coexistence problems. Antenna isolation, harmonics, intermodulation, clock noise, DC/DC converters and digital buses can raise receiver noise floor.

## 13. How EMC is measured

Common equipment:

- EMI receiver / spectrum analyzer;
- LISN;
- current clamp;
- near-field E/H probes;
- biconical/log-periodic/horn antennas;
- RF amplifier and field probe for immunity;
- ESD gun;
- chamber/reverberation setup.

See [Measurements & Instruments](../measurements/).

## Engineering reality

<div class="engineering"><span class="callout-title">Debug the path, not the symptom</span>Adding random ferrites, copper tape or capacitors can move a problem rather than solve it. Identify the source current, the coupling structure and the victim susceptibility before selecting the fix.</div>

## References

- H. W. Ott, *Electromagnetic Compatibility Engineering*.
- C. R. Paul, *Introduction to Electromagnetic Compatibility*.
- Clayton Paul, *Analysis of Multiconductor Transmission Lines*.

Related: [RF & Microwave](../rf-microwave/) · [Antennas](../antennas/) · [Spacecraft EM](../computational-em/) · [Measurements](../measurements/)
