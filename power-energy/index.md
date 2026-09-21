---
layout: default
title: Power & Energy Electromagnetics
description: Electromagnetic induction, transformers, motors, generators, magnetic materials, losses, wireless power and measurement.
---

# Power & Energy Electromagnetics

<div class="intuition"><span class="callout-title">30-second intuition</span>Power conversion is controlled electromagnetism: electric current creates magnetic field, changing magnetic flux creates voltage, and magnetic fields exchange force/torque with current-carrying conductors and magnetized matter.</div>

## 1. Faraday induction

$$\mathcal E=-\frac{d\Phi_B}{dt}.
$$

The minus sign encodes Lenz's law: induced current opposes the change in flux that produced it.

## 2. Transformers

For an ideal transformer,

$$\frac{V_2}{V_1}=\frac{N_2}{N_1},\qquad
\frac{I_2}{I_1}=\frac{N_1}{N_2}.
$$

A real transformer additionally has winding resistance, leakage inductance, finite magnetizing inductance, core loss, interwinding capacitance and insulation constraints.

## 3. Magnetic energy

For a linear inductor,

$$W_m=\frac12LI^2.
$$

In field form, magnetic energy density for a linear medium is

$$u_m=\frac12\mathbf B\cdot\mathbf H.
$$

## 4. Motors

Force on current density is described by

$$\mathbf f=\mathbf J\times\mathbf B.
$$

At system level, motors engineer the spatial and temporal relation between stator and rotor fields to create torque.

## 5. Generators

Mechanical motion changes magnetic flux linkage and induces voltage. Motors and generators are therefore reciprocal viewpoints of electromagnetic energy conversion.

## 6. Magnetic materials

Important properties include permeability, saturation, coercivity, hysteresis, remanence and frequency-dependent loss. Soft magnetic materials favor low coercivity for transformers/inductors; hard magnetic materials retain magnetization for permanent magnets.

## 7. Core loss

Core loss typically combines hysteresis, eddy-current and additional dynamic loss terms. Lamination/ferrites reduce eddy currents by increasing electrical resistance or interrupting current loops.

## 8. Conductor loss

At high frequency, skin and proximity effects crowd current and increase AC resistance. The skin depth is

$$\delta=\frac{1}{\sqrt{\pi f\mu\sigma}}.
$$

Litz wire can reduce AC resistance in suitable frequency/geometry ranges.

## 9. Wireless power transfer

Inductive/resonant systems use magnetic coupling between coils. A simplified coupling coefficient is

$$k=\frac{M}{\sqrt{L_1L_2}},
$$

where $M$ is mutual inductance. Efficiency depends on coupling, Q, matching, alignment, load and parasitic loss.

## 10. Permanent magnets and Halbach structures

Permanent-magnet machines and compact field sources use remanent magnetization. Halbach arrays deliberately rotate magnetization direction to enhance field on one side or inside a bore while reducing external flux. See [Ground-State Magnetometry — Halbach arrays](../ground-state-magnetometry/#37-halbach-permanent-magnet-arrays).

## Worked example — transformer turns ratio

A 120 V primary with $N_1=600$ turns and $N_2=60$ turns gives an ideal secondary voltage

$$V_2=120\times\frac{60}{600}=12\ \text{V}.$$

A real design must then account for regulation, copper loss, core flux density and thermal rise.

## 11. Measurement

- oscilloscope + differential voltage probe;
- current probe / shunt;
- power analyzer for real/reactive/apparent power and harmonics;
- LCR/impedance analyzer;
- B-H loop tracer;
- Hall/fluxgate/search-coil magnetic probes;
- thermal imaging/thermocouples for loss validation.

## 12. Engineering reality

<div class="engineering"><span class="callout-title">What limits power magnetics</span>Saturation, temperature rise, insulation, copper loss, core loss, leakage, parasitic capacitance, acoustic noise, EMI and manufacturing tolerance define real performance.</div>

## References

- S. J. Chapman, *Electric Machinery Fundamentals*.
- A. E. Fitzgerald, C. Kingsley and S. Umans, *Electric Machinery*.
- R. W. Erickson and D. Maksimović, *Fundamentals of Power Electronics*.

Related: [Lorentz Force](../lorentz-force/) · [EMC](../emc/) · [Measurements](../measurements/)
