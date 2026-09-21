---
layout: default
title: Foundations of Electromagnetics
description: Maxwell equations, waves, boundary conditions, polarization, energy flow, material response and the conceptual map that supports the rest of the site.
---

# Foundations of Electromagnetics

<div class="intuition"><span class="callout-title">30-second intuition</span>Electromagnetics is a theory of fields, sources, propagation and energy transfer. Maxwell's equations tell fields how to diverge and curl; material relations tell the fields how matter responds; boundary conditions connect regions; the Lorentz force tells charged matter how fields push it.</div>

## The four Maxwell equations

$$\nabla\cdot\mathbf D=\rho_v$$

$$\nabla\cdot\mathbf B=0$$

$$\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t}$$

$$\nabla\times\mathbf H=\mathbf J+\frac{\partial\mathbf D}{\partial t}.$$

Together with

$$\mathbf D=\epsilon\mathbf E,\qquad \mathbf B=\mu\mathbf H,\qquad \mathbf J=\sigma\mathbf E,
$$

these generate much of classical EM engineering.

## How to navigate the foundations

<div class="card-grid">
<a class="reference-card" href="maxwells-equations.html"><strong>Maxwell's Equations</strong><span>Meaning of divergence/curl, displacement current and the unification of electricity, magnetism and light.</span></a>
<a class="reference-card" href="electromagnetic-waves.html"><strong>Electromagnetic Waves</strong><span>Wave equation, wavelength, impedance, phase and propagation.</span></a>
<a class="reference-card" href="boundary-conditions.html"><strong>Boundary Conditions</strong><span>How tangential and normal field components change across interfaces.</span></a>
<a class="reference-card" href="polarization.html"><strong>Polarization</strong><span>Linear, circular and elliptical field evolution and why it matters for antennas and atoms.</span></a>
<a class="reference-card" href="power-and-poynting-vector.html"><strong>Power & Poynting Vector</strong><span>Energy flow, power density and conservation.</span></a>
</div>

## From Maxwell to applications

$$
\boxed{
\text{Maxwell}
\rightarrow
\text{wave equation}
\rightarrow
\text{propagation / boundaries}
\rightarrow
\text{guided waves / radiation}
\rightarrow
\text{devices and systems}
}
$$

and for matter interaction,

$$
\boxed{
\mathbf E,\mathbf B
\rightarrow
\text{Lorentz force / polarization / magnetization}
\rightarrow
\text{motion, energy shift or induced current}
}
$$

## Essential scales

Before solving a problem, compare geometry and timescales with:

- $L/\lambda$: is the structure electrically small or distributed?
- $R/R_{FF}$: near field or far field?
- $\delta/t$: does skin effect dominate conductor thickness?
- $\omega\epsilon/\sigma$: displacement current or conduction current?
- material dispersion/loss across the bandwidth of interest.

See [Scaling Laws](../reference/scaling-laws.html) and [Orders of Magnitude](../reference/orders-of-magnitude.html).

## Measurement bridge

Maxwell's equations predict fields, but experiments often measure voltages, currents, wave ratios, optical power or detector outputs. The [Measurements & Instruments](../measurements/) page shows how those observables are connected back to field quantities.

## Recommended sequence

**Maxwell → waves → boundaries → Poynting → transmission lines → antennas → RF systems → interaction with matter → quantum/atomic sensing.**

For compact formulas use [Fundamental Equations](../reference/fundamental-equations.html); for history see [History Timeline](../reference/history-timeline.html).
