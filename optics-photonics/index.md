---
layout: default
title: Optics & Photonics
description: Electromagnetic foundations of reflection, refraction, interference, diffraction, Gaussian beams, fibers, lasers and photonic systems.
---

# Optics & Photonics

<div class="intuition"><span class="callout-title">30-second intuition</span>Optics is electromagnetics at very high frequency. The same Maxwell equations still govern propagation, reflection, polarization and guided modes; quantum mechanics becomes essential when the discreteness of photons and atomic transitions matters.</div>

## 1. Refractive index

$$n=\frac{c}{v_p}.$$

For a nonmagnetic low-loss dielectric, approximately $n\approx\sqrt{\epsilon_r}$, though real materials are dispersive and absorptive.

## 2. Snell's law

Tangential phase continuity at an interface gives

$$n_1\sin\theta_1=n_2\sin\theta_2.
$$

Total internal reflection occurs for propagation from higher to lower refractive index above the critical angle.

## 3. Fresnel reflection

At normal incidence,

$$r=\frac{n_1-n_2}{n_1+n_2},\qquad R=|r|^2
$$

for nonmagnetic lossless media. At oblique incidence, TE and TM polarizations behave differently; TM reflection vanishes at the Brewster angle for ideal dielectrics.

## 4. Interference

For coherent fields,

$$I\propto|E_1+E_2|^2.
$$

The cross term is the origin of fringes, interferometers, standing waves and coherent detection.

## 5. Diffraction and aperture

Finite apertures spread angular spectrum. A larger aperture produces a narrower diffraction-limited beam. This is the optical version of antenna aperture/directivity.

A recurring bridge is

$$\boxed{\text{antenna far field}\leftrightarrow\text{Fourier optics}.}
$$

## 6. Gaussian beams

For waist $w_0$,

$$z_R=\frac{\pi w_0^2}{\lambda},
$$

$$w(z)=w_0\sqrt{1+(z/z_R)^2}.
$$

The beam waist, Rayleigh range and wavefront curvature determine focusing and atom-light interaction volume.

## 7. Optical fibers

Total internal reflection provides a first picture, while waveguide modes provide the rigorous description. The normalized frequency of a step-index fiber is

$$V=\frac{2\pi a}{\lambda}\sqrt{n_1^2-n_2^2}.
$$

Single-mode operation requires the appropriate $V$ range (approximately $V<2.405$ for the standard step-index case).

## 8. Lasers

A laser combines:

**gain medium + population inversion/pump + optical resonator + feedback/selective loss.**

Key practical quantities are linewidth, output power, frequency noise, relative intensity noise, mode structure, polarization and beam quality.

## 9. Integrated photonics

Waveguides, ring resonators, Mach–Zehnder interferometers, modulators and photodetectors move optical functions onto chips. The same concepts of impedance/mode matching, scattering matrices, resonances and coupling reappear in optical form.

## 10. Atom–light interface

Photon energy is

$$E=hf=\frac{hc}{\lambda}.
$$

The electric-dipole interaction is

$$H_{int}=-\mathbf d\cdot\mathbf E.
$$

This connects classical optical fields to Rabi frequency, EIT, AC Stark shifts and quantum sensing. See [Quantum Technologies](../quantum/) and [Rydberg Semiclassical Optics](../rydberg-semiclassical-effects/).

## Worked example — Rayleigh range

For $w_0=100\ \mu$m and $\lambda=852$ nm,

$$z_R=\frac{\pi(100\times10^{-6})^2}{852\times10^{-9}}\approx3.69\ \text{cm}.$$

This sets the length scale over which the beam radius remains near its waist.

## 11. How optics is measured

- optical power meter / calibrated photodiode;
- optical spectrum analyzer;
- wavemeter / frequency comb;
- beam profiler / knife-edge scan;
- polarimeter;
- interferometer;
- fast photodetector + RF analyzer for beat notes/noise.

## Engineering reality

<div class="engineering"><span class="callout-title">Real optical systems</span>Alignment, etalon fringes, polarization drift, beam ellipticity, coating dispersion, speckle, laser frequency noise, detector saturation and thermal lensing often matter as much as the ideal propagation equation.</div>

## References

- E. Hecht, *Optics*.
- B. E. A. Saleh and M. C. Teich, *Fundamentals of Photonics*.
- A. E. Siegman, *Lasers*.
- R. W. Boyd, *Nonlinear Optics*.

Related: [Foundations](../foundations/) · [Quantum Technologies](../quantum/) · [Measurements](../measurements/)
