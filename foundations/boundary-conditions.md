---
layout: default
title: Electromagnetic Boundary Conditions
description: Tangential and normal field boundary conditions, surface charge/current, conductor limits, reflection, refraction and practical interface physics.
---

# Electromagnetic Boundary Conditions

<div class="intuition"><span class="callout-title">30-second intuition</span>Maxwell's equations must remain true across an interface. Applying them to an infinitesimal loop or pillbox tells us exactly which field components remain continuous and which can jump because of surface charge or surface current.</div>

Consider an interface with unit normal $\hat n$ from medium 1 to medium 2.

## Tangential electric field

$$\boxed{\hat n\times(\mathbf E_2-\mathbf E_1)=0}$$

for ordinary interfaces without an imposed singular magnetic surface current.

## Tangential magnetic field

$$\boxed{\hat n\times(\mathbf H_2-\mathbf H_1)=\mathbf J_s}$$

where $\mathbf J_s$ is surface current density.

## Normal electric flux density

$$\boxed{\hat n\cdot(\mathbf D_2-\mathbf D_1)=\rho_s}$$

where $\rho_s$ is free surface charge density.

## Normal magnetic flux density

$$\boxed{\hat n\cdot(\mathbf B_2-\mathbf B_1)=0.}$$

## Perfect electric conductor

Inside an ideal PEC in steady sinusoidal electromagnetics,

$$\mathbf E=0.
$$

At its surface,

$$\mathbf E_t=0,
$$

and surface current supplies the discontinuity in tangential $\mathbf H$.

These conditions explain waveguide walls, cavity modes, shielding currents and image theory.

## Reflection and refraction

Boundary conditions applied to incident, reflected and transmitted plane waves yield Fresnel coefficients and Snell's law. At normal incidence between lossless media,

$$\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1}.
$$

Thus impedance mismatch is fundamentally an interface/boundary-condition problem.

## Worked example — air to dielectric

Suppose a nonmagnetic dielectric has $\epsilon_r=4$. Then

$$\eta_2\approx\frac{377}{\sqrt{4}}\approx188.5\ \Omega.
$$

From air,

$$\Gamma\approx\frac{188.5-377}{188.5+377}=-\frac13.
$$

The reflected electric-field amplitude is about one-third of the incident field with a phase reversal; reflected power is $|\Gamma|^2\approx11.1\%$.

## Engineering reality

<div class="engineering"><span class="callout-title">Interfaces are rarely ideal</span>Finite conductivity, surface roughness, coatings, anisotropy, metasurfaces, thin films and microscopic transition layers can require generalized sheet impedances or full material models rather than simple two-medium formulas.</div>

## Measurement

Interface behavior is commonly characterized using VNA reflection/transmission, free-space material measurements, resonant cavities, ellipsometry and optical reflectometry.

## References

- J. D. Jackson, *Classical Electrodynamics*.
- D. M. Pozar, *Microwave Engineering*.
- C. A. Balanis, *Advanced Engineering Electromagnetics*.

Related: [Electromagnetic Waves](electromagnetic-waves.html) · [RF & Microwave](../rf-microwave/) · [Optics](../optics-photonics/)
