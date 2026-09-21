---
layout: default
title: Maxwell's Equations
description: Physical meaning, differential and integral forms, displacement current, continuity, wave propagation, assumptions and engineering use of Maxwell's equations.
---

# Maxwell's Equations

<div class="intuition"><span class="callout-title">30-second intuition</span>Maxwell's equations tell electromagnetic fields how sources create divergence, how changing magnetic field curls electric field, how current and changing electric flux curl magnetic field, and why isolated magnetic charge has not been observed. Together they predict electromagnetic waves.</div>

## Differential form

$$\boxed{\nabla\cdot\mathbf D=\rho_v}$$

Electric charge is a source/sink of electric flux density.

$$\boxed{\nabla\cdot\mathbf B=0}$$

Magnetic flux lines do not begin or end on ordinary magnetic monopoles.

$$\boxed{\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t}}$$

A changing magnetic field creates a circulating electric field.

$$\boxed{\nabla\times\mathbf H=\mathbf J+\frac{\partial\mathbf D}{\partial t}}$$

Conduction current and changing electric flux create circulating magnetic field.

## Integral form

$$\oint_S\mathbf D\cdot d\mathbf A=Q_{enc}$$

$$\oint_S\mathbf B\cdot d\mathbf A=0$$

$$\oint_C\mathbf E\cdot d\mathbf l=-\frac{d}{dt}\int_S\mathbf B\cdot d\mathbf A$$

$$\oint_C\mathbf H\cdot d\mathbf l=I_{enc}+\frac{d}{dt}\int_S\mathbf D\cdot d\mathbf A.$$

Integral form is often best for symmetry; differential form is often best for local field analysis and numerical solvers.

## Constitutive relations

For a linear isotropic medium,

$$\mathbf D=\epsilon\mathbf E,\qquad \mathbf B=\mu\mathbf H,\qquad \mathbf J=\sigma\mathbf E.$$

These are material relations, not additional Maxwell equations. Real media can be anisotropic, dispersive, nonlinear, magnetic, conductive, or spatially nonlocal.

## Why displacement current matters

Maxwell added

$$\frac{\partial\mathbf D}{\partial t}
$$

to Ampère's law. This makes the equations consistent with charge conservation and permits magnetic field to exist around a capacitor gap even though no conduction current crosses the dielectric.

Taking divergence of Ampère–Maxwell and using Gauss's law gives the continuity equation

$$\boxed{\nabla\cdot\mathbf J+\frac{\partial\rho}{\partial t}=0.}$$

## Wave equation from Maxwell

In a homogeneous source-free lossless region,

$$\nabla\times\mathbf E=-\mu\frac{\partial\mathbf H}{\partial t},
$$

$$\nabla\times\mathbf H=\epsilon\frac{\partial\mathbf E}{\partial t}.
$$

Taking curl of the first and using $\nabla\cdot\mathbf E=0$ gives

$$\boxed{\nabla^2\mathbf E-\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2}=0.}$$

Thus

$$v=\frac{1}{\sqrt{\mu\epsilon}}.
$$

For vacuum, this becomes $c=1/\sqrt{\mu_0\epsilon_0}$.

## Worked example — displacement current in a capacitor

For a parallel-plate capacitor with capacitance $C$ driven by voltage $V(t)$,

$$I=C\frac{dV}{dt}.
$$

Between the plates, the same circuit current is represented electromagnetically by

$$I_D=\frac{d}{dt}\int_S\mathbf D\cdot d\mathbf A.
$$

This is why Ampère's law gives the same magnetic circulation whether the chosen surface cuts the wire or bulges through the capacitor gap.

## How Maxwell's equations are measured

The equations predict fields; instruments usually measure derived quantities:

- VNA → traveling-wave ratios;
- field probe → local $E$ or $H$;
- antenna range → radiation pattern/power;
- oscilloscope → voltage proportional to a field/current after a transfer function;
- optical/atomic sensor → field-dependent transition response.

## Engineering reality

<div class="engineering"><span class="callout-title">Where textbook Maxwell becomes engineering</span>Geometry, material dispersion, conductor loss, finite conductivity, ports, radiation boundaries, nonlinear media and numerical discretization determine how Maxwell's equations are solved in real devices.</div>

## Common misconception

<div class="misconception"><span class="callout-title">Fields are not optional bookkeeping</span>At electrically large scales, circuit voltages/currents are reduced descriptions of distributed electromagnetic fields. When dimensions become comparable with wavelength, the field description becomes unavoidable.</div>

## References

- J. D. Jackson, *Classical Electrodynamics*.
- D. J. Griffiths, *Introduction to Electrodynamics*.
- S. Ramo, J. R. Whinnery and T. Van Duzer, *Fields and Waves in Communication Electronics*.

Related: [Electromagnetic Waves](electromagnetic-waves.html) · [Boundary Conditions](boundary-conditions.html) · [Poynting Vector](power-and-poynting-vector.html) · [Essential Derivations](../reference/derivations.html)
