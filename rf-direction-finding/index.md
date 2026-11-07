---
layout: default
title: RF Direction Finding, Geolocation & Coherent Arrays
description: AoA, phase interferometry, MUSIC/ESPRIT, TDOA/FDOA, bearing ambiguity, calibration and multipath.
---

# RF Direction Finding, Geolocation & Coherent Arrays

<div class="intuition"><span class="callout-title">An angle is an inferred parameter</span>A sensor never reports direction directly. It measures phase, arrival time, amplitude, polarization or spectral structure; a calibrated physical model converts that observable into a bearing. Model errors can dominate thermal-noise limits.</div>

## 1. Array phase and geometry

For a plane wave with propagation unit vector $\hat{\mathbf u}$ and element locations $\mathbf r_n$, the relative complex response may be modeled as $a_n=\exp(-jk\hat{\mathbf u}\cdot\mathbf r_n)$ with a stated received-field sign convention. On a uniform linear array with spacing $d$, adjacent-element phase difference is

$$\Delta\phi=-kd\sin\theta\quad (\mathrm{mod}\ 2\pi).$$

Multiple angles can map to the same wrapped phase when element spacing or observation geometry is ambiguous. Finite array dimensions, polarization, embedded-element patterns and coupling must be included in rigorous calibration.

## 2. Methods and observables

| Method | Primary observable | Principal limitation |
|---|---|---|
| Amplitude comparison | Pattern-weighted received power | Requires known angular pattern; multipath sensitivity |
| Interferometric AoA | Interelement phase | Phase wrapping and RF-chain offsets |
| MUSIC / ESPRIT | Covariance/eigenspace structure | Snapshot count, coherence, array model errors |
| TDOA | Differential propagation delay | Bandwidth and absolute timestamp uncertainty |
| FDOA | Differential Doppler | Relative velocity model and clock stability |
| Polarization/spectral sensing | Anisotropic amplitude or spectral response | Orientation and calibration dependence |

For a multichannel signal covariance $\mathbf R=\mathbf A\mathbf R_s\mathbf A^H+\sigma_n^2\mathbf I$, idealized MUSIC searches directions whose steering vectors are orthogonal to the estimated noise subspace. Coherent multipath and correlated source signals can violate assumptions; spatial smoothing or additional model structure may be required.

## 3. Geolocation

AoA bearings intersect in geometry; TDOA yields difference-of-range surfaces; FDOA adds velocity-sensitive surfaces. A bearing intersection with a small crossing angle is poorly conditioned even if each individual bearing has low variance. Solve for position using uncertainty-weighted nonlinear least squares and visualize position-error ellipses.

**Advanced exercise:** [doa_array_demo.py](../simulations/python/doa_array_demo.py) compares a two-sensor phase-difference model with Bartlett beamforming for an ideal ULA. Add calibrated interchannel phase errors and correlated multipath to evaluate bias.

## 4. Laboratory requirements

Use coherent RF receivers, calibrated delay/phase at the antenna reference planes, anechoic or characterized propagation, frequency sweeps, full azimuth sweeps and stated angle convention. Compare measured phase-only and amplitude-only AoA error; test off-plane arrivals and polarization changes.

## 5. Readings

- H. L. Van Trees, *Optimum Array Processing*; P. Stoica and R. Moses, *Spectral Analysis of Signals*.
- [AESA](../aesa/) · [SDR](../sdr/) · [Rydberg Sensing](../rydberg-semiclassical-effects/) · [Precision Timing](../precision-timing-synchronization/).
