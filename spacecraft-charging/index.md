---
layout: default
title: Spacecraft Charging & Plasma Interactions
description: Surface charging, internal dielectric charging, photoemission, Debye screening, plasma sheaths, ESD and probe perturbations.
---

# Spacecraft Charging & Plasma Interactions

<div class="intuition"><span class="callout-title">The spacecraft is part of the plasma experiment</span>Conducting and dielectric surfaces collect particles and emit photoelectrons. The resulting potential changes the plasma around the spacecraft and can alter electric-field probes or cause electrostatic discharge.</div>

## 1. Poisson equation and screening

$$\nabla^2\phi=-\rho/\epsilon_0,\qquad \lambda_D=\sqrt{\frac{\epsilon_0 k_BT_e}{n_e e^2}}$$

for a simple single-species-electron Debye-length model with electron temperature in kelvin. Screening is important when spacecraft dimensions, probe size and separation are compared with $\lambda_D$.

A simplified floating-potential balance is

$$I_e(V)+I_i(V)+I_\mathrm{photo}(V)+I_\mathrm{secondary}(V)=0.$$

Every current term depends on plasma distribution, surface properties and convention. Real geometries need kinetic and sheath modeling; no universal spacecraft-floating-potential formula exists.

## 2. External and internal charging

- **Surface charging:** incident plasma particles, sunlight, photoemission and differential illumination create potential differences.
- **Internal charging:** energetic particles penetrate shielding and deposit charge in dielectric materials.
- **Discharge:** electric stress can trigger sudden current pulses, EMI, upsets or material damage.
- **Probe contamination:** probe sheath, wake, boom geometry and spacecraft potential alter measured field or particle distributions.

## 3. Design and measurement

Bond exposed conductors as appropriate, choose surface material properties and grounding strategy deliberately, manage dielectric paths and analyze worst-case plasma conditions. For electric-field probes, calibrate sheath response and the spacecraft's perturbation of the ambient field.

**Advanced exercise:** solve a one-dimensional Debye–Hückel linearized potential model and compare $\lambda_D$ with a candidate probe length. Then explain why this model fails for large potentials and non-Maxwellian plasmas.

## 4. Official reference

- [NASA-HDBK-4002B — Mitigating In-Space Charging Effects](https://standards.nasa.gov/standard/NASA/NASA-HDBK-4002).
- [NASA-HDBK-4006 — Low Earth Orbit Spacecraft Charging](https://standards.nasa.gov/node/186).
- [Lorentz Force](../lorentz-force/) · [Shockley–Ramo](../shockley-ramo/) · [Spacecraft Scientific Instruments](../spacecraft-scientific-instruments/).
