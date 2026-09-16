---
layout: default
title: Applications of Electromagnetics
---

# Applications of Electromagnetics

### A daily physics-to-engineering reference

A working reference for the electromagnetic ideas that connect **Maxwell's equations to RF, antennas, wireless systems, radar, photonics, precision measurement, particle physics, and quantum sensing**.

> **Reference philosophy:** start from the physical picture, write down the governing equations, then connect them to a device, measurement, or real engineering system.

## Quick Reference

### [Foundations](foundations/)
Maxwell's equations, electromagnetic waves, boundary conditions, polarization, and electromagnetic power flow.

### [RF & Microwave Engineering](rf-microwave/)
Transmission lines, impedance matching, Smith charts, S-parameters, waveguides, resonators, filters, and microwave circuits.

### [Antennas & Radiation](antennas/)
Dipoles, patches, horns, arrays, radiation patterns, gain, polarization, and beamforming.

### [Wireless Communications](wireless/)
Propagation, link budgets, cellular systems, Wi-Fi, MIMO, satellite links, millimeter-wave systems, and emerging wireless technologies.

### [Radar & Remote Sensing](radar/)
Radar equation, Doppler, FMCW, automotive radar, phased arrays, synthetic-aperture radar, and remote sensing.

### [Quantum Technologies](quantum/)
Atom-field interaction, Rabi frequency, AC Stark shifts, Autler-Townes splitting, Rydberg electrometry, atomic RF receivers, and quantum magnetometry.

### [Subatomic Particles](subatomic-particles/)
Electron, proton and neutron discovery; Lorentz-force particle analysis; Rutherford scattering; particle accelerators; RF cavities; magnetic spectrometers; Cherenkov radiation; and electromagnetic particle detectors. Includes a historical book note on Steven Weinberg's *The Discovery of Subatomic Particles*.

### [Optics & Photonics](optics-photonics/)
Reflection, refraction, interference, optical fibers, lasers, photonic crystals, integrated photonics, and nanophotonics.

### [EMI / EMC](emc/)
EMI, shielding, grounding, crosstalk, signal integrity, power integrity, RF compliance, and conformance testing.

### [Computational Electromagnetics](computational-em/)
FEM, FDTD, method of moments, eigenmode analysis, meshing, convergence, and numerical field simulation.

### [Power & Energy](power-energy/)
Faraday induction, transformers, motors, generators, magnetic materials, inductive charging, and wireless power transfer.

### [Medical Applications](medical/)
MRI, RF coils, microwave imaging, RF ablation, hyperthermia, bioelectromagnetics, and SAR.

### [Earth & Space Applications](earth-space/chandler-wobble-vlbi.md)
VLBI, geodetic radio interferometry, Earth orientation, and the electromagnetic measurement of the Chandler wobble.

## Core Equations

The entire reference ultimately grows from Maxwell's equations:

$$
\nabla \cdot \mathbf{D}=\rho, \qquad
\nabla \cdot \mathbf{B}=0
$$

$$
\nabla \times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t}, \qquad
\nabla \times \mathbf{H}=\mathbf{J}+\frac{\partial \mathbf{D}}{\partial t}.
$$

A useful mental map is

**Sources → fields → waves → boundaries/materials → guided or radiated propagation → devices → measurements → systems.**

## How to Use This Reference

Each developed topic will aim to contain the same layers: **overview → physical principle → governing equations → intuition → practical implementation → worked example → simulation/code → applications → limitations → references**.

This makes the site useful both for a quick daily lookup and for deeper review when moving between RF engineering, electromagnetics, optics, particle physics, and quantum sensing.

---

*Living technical reference — expanded progressively as new applications and useful connections are added.*
