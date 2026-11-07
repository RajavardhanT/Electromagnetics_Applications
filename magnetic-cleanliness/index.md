---
layout: default
title: Spacecraft Magnetic Cleanliness & Field Calibration
description: Magnetic contamination, dipole modeling, fluxgate offsets, sensor booms, gradiometry and spacecraft magnetic verification.
---

# Spacecraft Magnetic Cleanliness & Field Calibration

<div class="intuition"><span class="callout-title">Why a boom is needed</span>A magnetometer detects the local field, including spacecraft-generated fields. Sensor sensitivity may be excellent while absolute scientific accuracy is poor unless the host spacecraft is magnetically characterized.</div>

## 1. Field composition

$$\mathbf B_\mathrm{measured}=\mathbf R\,\mathbf B_\mathrm{ambient}+\mathbf B_\mathrm{spacecraft}+\mathbf b_\mathrm{sensor}+\boldsymbol\epsilon.$$

Here $\mathbf R$ represents coordinate transformation, $\mathbf b$ sensor offsets, and $\boldsymbol\epsilon$ stochastic error. Real analyses also include scale factors, nonorthogonal sensing axes, temperature dependence and time-varying interference.

For a point magnetic dipole $\mathbf m$ observed at displacement $\mathbf r$ in free space,

$$\mathbf B(\mathbf r)=\frac{\mu_0}{4\pi r^3}[3(\mathbf m\cdot\hat{\mathbf r})\hat{\mathbf r}-\mathbf m].$$

The $r^{-3}$ law motivates boom placement, but a cable harness carrying current or distributed ferromagnetic structure cannot always be modeled as a single dipole.

## 2. Physical contamination pathways

- **Static:** permanent magnetic moments, residual magnetization, torquers, mechanical components.
- **Time varying:** switching power converters, heaters, reaction wheels, harness return loops, instrument scan motors.
- **Measurement itself:** fluxgate drive harmonics, sensor cross-axis calibration and temperature-dependent offsets.
- **Geometry:** spacecraft attitude changes the relation between fixed spacecraft fields and external field components.

Use an equipment magnetic-moment budget, interface requirements for current-loop areas, magnetic screening, controlled demagnetization and sensor placement studies.

## 3. Two-sensor boom analysis

Two calibrated magnetometers placed at different boom distances can help discriminate spatially varying spacecraft contamination from a slowly varying ambient field. However, subtraction is **not automatically** an unbiased ambient field estimator: gradients in the natural field, sensor offsets and mounting errors must be modeled.

**Numerical exercise:** use [magnetic_boom_model.py](../simulations/python/magnetic_boom_model.py) to plot a spacecraft dipole's interference magnitude along a boom; add a constant ambient vector and random noise, then study how uncertainty in dipole location limits subtraction.

## 4. Verification and references

Test at representative power modes, instrument duty cycles and wheel speeds. Measure calibrated sensor alignment, temperature dependence, remanent moments and spectral lines; record the field in the correct spacecraft coordinate frame.

- [NASA Cassini MAG engineering description](https://science.nasa.gov/mission/cassini/spacecraft/cassini-orbiter/magnetometer/mag-technical-write-up/).
- [ECSS-E-ST-20-07C Rev.2 — Electromagnetic Compatibility](https://ecss.nl/standard/ecss-e-st-20-07c-rev-2-electromagnetic-compatibility-3-january-2022/).
- [Atomic Magnetometry](../atomic-magnetometer/) · [Spacecraft Instruments](../spacecraft-scientific-instruments/) · [Spacecraft Qualification](../spacecraft-qualification/).
