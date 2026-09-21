---
layout: default
title: Electromagnetic Polarization
description: Linear, circular and elliptical polarization, Jones-vector intuition, axial ratio, antenna mismatch and atomic selection-rule connections.
---

# Polarization

<div class="intuition"><span class="callout-title">30-second intuition</span>Polarization describes how the electric-field vector moves at a fixed point in space. If its tip traces a line, the wave is linearly polarized; a circle gives circular polarization; the general case is an ellipse.</div>

## Two orthogonal field components

For propagation along $z$,

$$\mathbf E(z,t)=\hat x E_x\cos(\omega t-kz)+\hat y E_y\cos(\omega t-kz+\delta).
$$

The amplitude ratio $E_y/E_x$ and phase difference $\delta$ determine polarization.

## Linear polarization

If $\delta=0$ or $\pi$, the vector oscillates along a fixed line.

## Circular polarization

If

$$E_x=E_y
$$

and

$$\delta=\pm\frac{\pi}{2},
$$

the tip traces a circle. The sign convention for right/left handedness depends on viewing convention, so state it explicitly.

## Elliptical polarization

Any other nondegenerate combination produces an ellipse. Circular and linear polarization are special cases of elliptical polarization.

## Axial ratio

Axial ratio compares major and minor axes:

$$AR=\frac{E_{major}}{E_{minor}}.
$$

Circular polarization has ideal $AR=1$ (0 dB); linear polarization corresponds to infinite axial ratio.

## Polarization mismatch

For linearly polarized transmit/receive antennas separated by angle $\psi$,

$$\eta_p=\cos^2\psi.
$$

At $90^\circ$, an ideal polarization-orthogonal receiver receives zero power; real antennas have finite cross-polarization and scattering often mixes polarization.

## Jones-vector representation

A coherent fully polarized field can be represented by

$$\mathbf J=
\begin{bmatrix}
E_x\\
E_y e^{j\delta}
\end{bmatrix}.
$$

Jones calculus is convenient for deterministic optical/RF polarization elements. Stokes parameters are better when degree of polarization matters.

## Connection to atoms

Relative to a quantization axis, optical/RF polarization decomposes into spherical components:

- $\pi$: $\Delta m=0$;
- $\sigma^+$: $\Delta m=+1$;
- $\sigma^-$: $\Delta m=-1$.

Thus rotating field polarization or quantization axis directly changes atomic transition strengths.

## Worked example — 45° mismatch

$$\eta_p=\cos^2 45^\circ=0.5.
$$

That is a 3.01 dB polarization mismatch loss.

## Measurement

Polarization can be measured by rotating a linearly polarized receive antenna, using orthogonal probes, measuring amplitude/phase of two components, or using polarimetry/Stokes analysis.

## Engineering reality

<div class="engineering"><span class="callout-title">Polarization is a system property</span>Radomes, multipath, cables, misalignment, finite cross-polarization, birefringent optics and nearby structures can rotate or mix polarization after it leaves the source.</div>

## References

- C. A. Balanis, *Antenna Theory*.
- B. E. A. Saleh and M. C. Teich, *Fundamentals of Photonics*.

Related: [Antennas](../antennas/) · [Optics](../optics-photonics/) · [Rydberg Semiclassical Optics](../rydberg-semiclassical-effects/)
