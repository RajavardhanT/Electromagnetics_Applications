---
layout: default
title: Electromagnetic Power & Poynting Vector
description: Poynting vector, electromagnetic energy density, power flow, complex power, Poynting theorem and engineering interpretation.
---

# Electromagnetic Power & Poynting Vector

<div class="intuition"><span class="callout-title">30-second intuition</span>The Poynting vector tells you where electromagnetic energy is flowing. In a transmission line, waveguide, antenna beam or optical system, useful power is transported by fields through space—not by an abstract voltage alone.</div>

## Instantaneous power flow

$$\boxed{\mathbf S=\mathbf E\times\mathbf H}$$

with units W/m$^2$.

The direction of $\mathbf S$ gives local electromagnetic energy-flow direction.

## Time-average sinusoidal power

For peak-value phasors,

$$\boxed{\langle\mathbf S\rangle=\frac12\operatorname{Re}\{\mathbf E\times\mathbf H^*\}.}$$

For a uniform lossless plane wave,

$$\langle S\rangle=\frac{|E|^2}{2\eta}=\frac{\eta|H|^2}{2}.
$$

## Energy density

For a linear nondispersive medium,

$$u_E=\frac12\mathbf E\cdot\mathbf D,
$$

$$u_H=\frac12\mathbf B\cdot\mathbf H.
$$

## Poynting theorem

A differential energy-conservation form is

$$\boxed{\nabla\cdot\mathbf S+\frac{\partial u}{\partial t}+\mathbf J\cdot\mathbf E=0.}$$

Interpretation:

- $\nabla\cdot\mathbf S$: net field-energy flow out;
- $\partial u/\partial t$: change in stored field energy;
- $\mathbf J\cdot\mathbf E$: power transferred from field to matter/charges.

This is the electromagnetic analog of an energy bookkeeping equation.

## Complex Poynting vector

In sinusoidal steady state,

$$\mathbf S_c=\frac12\mathbf E\times\mathbf H^*.
$$

Its real part represents average power flow; the imaginary part is associated with reactive/stored energy exchange under common conventions.

## Worked example — field strength from power density

For a free-space plane wave carrying $1$ W/m$^2$ average power,

$$|E|=\sqrt{2\eta_0\langle S\rangle}
\approx\sqrt{2\times376.73}\approx27.4\ \text{V/m}
$$

for peak field amplitude.

If using RMS electric field instead,

$$E_{rms}=\sqrt{\eta_0\langle S\rangle}\approx19.4\ \text{V/m}.
$$

Always state whether field amplitudes are peak or RMS.

## Antennas and links

In the far field, integrating radial Poynting flux over a sphere gives radiated power:

$$P_{rad}=\int\!\!\int \langle S_r\rangle r^2d\Omega.
$$

This leads naturally to radiation intensity, directivity and gain.

## Measurement

Power flow is inferred using power meters, calibrated antennas/probes, directional couplers, field sensors and calorimetric methods. A local E-field measurement only converts to plane-wave power density when the plane-wave impedance relation is justified.

## Common misconception

<div class="misconception"><span class="callout-title">Near-field warning</span>In a reactive near field, $E/H$ need not equal $377\ \Omega$, and $E^2/377$ is not automatically the correct local power density.</div>

## Engineering reality

<div class="engineering"><span class="callout-title">Where the energy goes</span>Loss appears through $\mathbf J\cdot\mathbf E$ in conductors/materials, radiation carries energy away, and resonators repeatedly exchange electric and magnetic stored energy before dissipation or extraction.</div>

## References

- J. D. Jackson, *Classical Electrodynamics*.
- R. F. Harrington, *Time-Harmonic Electromagnetic Fields*.
- S. Ramo, J. R. Whinnery and T. Van Duzer, *Fields and Waves in Communication Electronics*.

Related: [Electromagnetic Waves](electromagnetic-waves.html) · [Antennas](../antennas/) · [Fundamental Equations](../reference/fundamental-equations.html)
