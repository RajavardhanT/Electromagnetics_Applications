---
layout: default
title: Electromagnetic Waves
description: Wave equation, propagation constant, intrinsic impedance, phase, attenuation, wavelength, plane-wave fields, energy flow and engineering intuition.
---

# Electromagnetic Waves

<div class="intuition"><span class="callout-title">30-second intuition</span>A time-varying electric field and magnetic field can sustain each other and propagate energy through space. In a uniform far-field plane wave, $\mathbf E$, $\mathbf H$, and the propagation direction are mutually perpendicular.</div>

## Wave equation

For a homogeneous source-free medium,

$$\nabla^2\mathbf E-\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2}=0,
$$

with an analogous equation for $\mathbf H$.

The phase velocity in a lossless medium is

$$v_p=\frac{1}{\sqrt{\mu\epsilon}}.
$$

## Frequency and wavelength

$$f=\frac{\omega}{2\pi},\qquad \lambda=\frac{v_p}{f}.
$$

In free space,

$$\lambda_0=\frac{c}{f}.
$$

A useful mental rule is

$$\boxed{\lambda_0(\text{cm})\approx\frac{30}{f(\text{GHz})}.}$$

## Propagation constant

$$\gamma=\alpha+j\beta.
$$

A wave varying along $z$ can be written

$$E(z)=E_0e^{-\alpha z}e^{-j\beta z}.
$$

Here $\alpha$ is attenuation constant and $\beta$ is phase constant. In a lossless medium,

$$\beta=\frac{2\pi}{\lambda}.
$$

## Intrinsic impedance

In a general conducting medium,

$$\eta=\sqrt{\frac{j\omega\mu}{\sigma+j\omega\epsilon}}.
$$

For a lossless dielectric,

$$\eta=\sqrt{\frac{\mu}{\epsilon}}.
$$

In free space, $\eta_0\approx376.73\ \Omega$.

## Plane-wave field relation

For propagation along $+z$ with $\mathbf E$ along $x$,

$$\mathbf H=\frac{1}{\eta}\hat{\mathbf z}\times\mathbf E.
$$

The time-average power density is

$$\langle\mathbf S\rangle=\frac12\operatorname{Re}\{\mathbf E\times\mathbf H^*\}.
$$

## Lossy media

When $\sigma\neq0$, propagation attenuates. In a good conductor, fields penetrate only a skin depth

$$\delta\approx\sqrt{\frac{2}{\omega\mu\sigma}}.
$$

Thus the same wave equations connect free-space radiation to conductor shielding and skin effect.

## Worked example — 100 MHz versus 10 GHz

At 100 MHz,

$$\lambda\approx3\ \text{m}.
$$

At 10 GHz,

$$\lambda\approx3\ \text{cm}.
$$

A 10-cm object is electrically tiny at 100 MHz but several wavelengths across at 10 GHz. The same physical object can therefore move from lumped-circuit behavior to strong scattering/resonance simply by changing frequency.

## Measurement

Wave quantities are inferred from:

- phase/amplitude with VNA measurements;
- field probes;
- antenna measurements;
- time-domain reflectometry;
- material-property extraction from transmission/reflection;
- optical interferometry at much higher frequencies.

## Engineering reality

<div class="engineering"><span class="callout-title">Real propagation</span>Multipath, dispersion, anisotropy, absorption, roughness, diffraction, finite apertures and near-field structure can invalidate the simple uniform plane-wave picture.</div>

## References

- R. E. Collin, *Foundations for Microwave Engineering*.
- D. M. Pozar, *Microwave Engineering*.
- D. J. Griffiths, *Introduction to Electrodynamics*.

Related: [Maxwell's Equations](maxwells-equations.html) · [Polarization](polarization.html) · [Antennas](../antennas/) · [Orders of Magnitude](../reference/orders-of-magnitude.html)
