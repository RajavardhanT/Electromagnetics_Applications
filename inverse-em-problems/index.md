---
layout: default
title: Inverse Electromagnetic Problems & Field Reconstruction
description: Electromagnetic inverse scattering, linearization, regularization, identifiability, tomography and uncertainty.
---

# Inverse Electromagnetic Problems & Field Reconstruction

<div class="intuition"><span class="callout-title">Forward versus inverse</span>Forward electromagnetics predicts fields from materials and sources. An inverse problem attempts to recover material parameters, geometry or a source distribution from measured fields. Because distinct configurations can produce nearly identical measurements, inverse problems are often ill posed.</div>

## 1. General problem and discretization

A forward model is $\mathbf y=\mathcal F(\mathbf m)+\boldsymbol\epsilon$ where $\mathbf m$ is the sought material/source parameter and $\mathbf y$ is a set of complex-valued measured observables. A common regularized estimate is

$$\hat{\mathbf m}=\arg\min_{\mathbf m}\left[\|\mathbf W(\mathcal F(\mathbf m)-\mathbf y)\|_2^2+\lambda\|\mathbf L(\mathbf m-\mathbf m_0)\|_2^2\right].$$

$\mathbf W$ weights residuals by measured uncertainty; $\mathbf L$ penalizes implausible parameter variation; $\lambda$ balances fit and regularity. Use a covariance-aware likelihood when measurement errors are correlated. Very small residuals are not proof of physical correctness.

## 2. Scattering physics

For a contrast function $\chi(\mathbf r)$, a Lippmann–Schwinger-type electric-field model takes the conceptual form

$$\mathbf E(\mathbf r)=\mathbf E_\mathrm{inc}(\mathbf r)+k_0^2\int_V\overline{\overline{\mathbf G}}(\mathbf r,\mathbf r')\chi(\mathbf r')\mathbf E(\mathbf r')\,dV',$$

with suitable dyadic Green tensor and constitutive assumptions. The Born approximation replaces the *unknown internal total field* with the incident field; it fails for sufficiently strong scatterers or multiple scattering.

**Examples:** microwave breast imaging, ground-penetrating radar, antenna diagnostics, remote-sensing material retrieval, plasma density estimation and Rydberg RF field reconstruction.

## 3. Resolution and identifiability

The Jacobian $\mathbf J=\partial\mathcal F/\partial\mathbf m$ describes sensitivity of observables to perturbations. Its singular values identify poorly sensed parameter combinations. Resolution depends on measurement aperture, bandwidth, frequency diversity, polarization and noise—not merely pixel count in the reconstructed map.

For linearized $\mathbf y\approx\mathbf A\mathbf m+\epsilon$, compare ordinary least squares, Tikhonov, sparsity penalties and Bayesian priors. Document what the prior contributes: a smooth-looking inversion can contain features inferred from regularization rather than data.

## 4. Verification

1. Generate synthetic data with **different forward-model discretization** than the inverse solver to avoid an inverse crime.
2. Add realistic complex noise and correlated calibration errors.
3. Hold out frequencies, receiver positions or illumination angles.
4. Report resolution/sensitivity and uncertainty alongside the reconstructed image.
5. Validate against phantoms or known scattering targets before interpreting unknown samples.

**Exercise:** reconstruct a 1-D dielectric contrast with a noisy linear kernel, then sweep $\lambda$ and plot reconstruction error versus residual norm. Compare fit quality to reconstruction accuracy.

## 5. References

- W. C. Chew, *Waves and Fields in Inhomogeneous Media*; A. Tarantola, *Inverse Problem Theory*.
- [MIT — Advanced Electromagnetism](https://ocw.mit.edu/courses/6-635-advanced-electromagnetism-spring-2003/).
- [Computational EM](../computational-em/) · [Simulations](../simulations/) · [Theory ↔ Experiment](../theory-experiment/).
