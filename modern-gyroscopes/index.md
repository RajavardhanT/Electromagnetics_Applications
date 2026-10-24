---
layout: default
title: Modern Gyroscopes — How They Work
description: Concise reference to the working principles of modern gyroscopes, including MEMS Coriolis vibratory gyros, fiber-optic gyros, ring-laser gyros, hemispherical resonator gyros, calibration, noise, and emerging atom-interferometric gyroscopes.
---

# Modern Gyroscopes — How They Work

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:SEM_images_of_a_fabricated_tuning_fork_gyroscope.png"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/SEM_images_of_a_fabricated_tuning_fork_gyroscope.png?width=1200" alt="Scanning electron microscope images of a fabricated MEMS tuning-fork gyroscope." loading="lazy"></a>
  <figcaption>Fabricated MEMS tuning-fork gyroscope structures. Modern MEMS gyros measure extremely small Coriolis-driven motion in micromachined resonators. <a href="https://commons.wikimedia.org/wiki/File:SEM_images_of_a_fabricated_tuning_fork_gyroscope.png">Image source: Wikimedia Commons, CC BY 4.0</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>A modern gyroscope usually does <strong>not</strong> rely on a visibly spinning wheel. MEMS gyros measure Coriolis motion of a vibrating microstructure; fiber-optic and ring-laser gyros measure the Sagnac effect of counter-propagating light; resonator gyros track the orientation of a standing mechanical vibration pattern; and emerging atom gyros measure rotation through matter-wave interferometry.</div>

<div class="pathway"><span class="node">rotation</span><span class="arrow">→</span><span class="node">Coriolis / Sagnac / resonator / matter-wave effect</span><span class="arrow">→</span><span class="node">small physical signal</span><span class="arrow">→</span><span class="node">readout + feedback</span><span class="arrow">→</span><span class="node">angular rate</span></div>

## 1. What a gyroscope measures

Most navigation gyroscopes are **rate gyroscopes**. Their primary output is angular velocity,

$$
\boldsymbol\omega=
\begin{bmatrix}
\omega_x&\omega_y&\omega_z
\end{bmatrix}^T.
$$

Angle is obtained by integration:

$$
\theta(t)=\theta(0)+\int_0^t\omega(\tau)d\tau.
$$

This is why even a small zero-rate bias produces an angle error that grows with time.

---

## 2. Classical spinning-mass gyroscope

A spinning rotor has angular momentum

$$
\mathbf L=\mathbf I\boldsymbol\omega.
$$

Applied torque changes angular momentum according to

$$
\boldsymbol\tau
=
\frac{d\mathbf L}{dt}.
$$

This creates gyroscopic precession and historically allowed a spinning rotor to provide an inertial direction reference.

<figure class="topic-figure topic-figure-small">
  <a href="https://commons.wikimedia.org/wiki/File:Gyroscope-9-3.svg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gyroscope-9-3.svg?width=900" alt="Classical spinning gyroscope showing torque and precession." loading="lazy"></a>
  <figcaption>Classical rotor gyroscope: torque changes the direction of angular momentum and produces precession. <a href="https://commons.wikimedia.org/wiki/File:Gyroscope-9-3.svg">Image source: Wikimedia Commons, CC BY-SA 3.0</a>.</figcaption>
</figure>

Modern systems largely replace macroscopic rotors with MEMS, optical, or resonant sensing because they are smaller, more robust, and easier to integrate.

---

# MEMS gyroscopes

## 3. Coriolis principle

A MEMS vibratory gyro contains a mass that is deliberately driven back and forth.

In a rotating frame, a moving mass experiences Coriolis acceleration

$$
\boxed{
\mathbf a_C
=
2\boldsymbol\Omega\times\mathbf v.
}
$$

The corresponding force is

$$
\mathbf F_C
=
2m\boldsymbol\Omega\times\mathbf v.
$$

If the proof mass vibrates along $x$ while the sensor rotates around $z$, the Coriolis force appears along $y$.

That tiny orthogonal motion is the gyro signal.

Analog Devices describes this same operating principle in its iMEMS angular-rate gyroscopes: a resonating silicon mass develops a Coriolis displacement perpendicular to its driven motion, which is then sensed capacitively. [Analog Devices reference](https://www.analog.com/en/resources/analog-dialogue/articles/imems-angular-rate-sensing-gyroscope.html).

---

## 4. Drive mode and sense mode

A MEMS gyro usually has two mechanical modes.

### Drive mode

The structure is maintained in resonant vibration,

$$
x(t)=X_d\cos\omega_dt.
$$

### Sense mode

Rotation produces an orthogonal force,

$$
F_C(t)
\propto
2m\Omega\omega_dX_d.
$$

The sense-mode displacement is therefore proportional to angular rate for small rotations.

The gyro electronics must keep the drive amplitude stable because gyro scale factor depends on that motion.

---

## 5. Capacitive readout

Interdigitated fingers form differential capacitors.

When Coriolis force moves the structure,

$$
C_1=C_0+\Delta C,
\qquad
C_2=C_0-\Delta C.
$$

The differential signal

$$
\Delta C=C_1-C_2
$$

is converted to voltage and demodulated synchronously with the drive oscillation.

The physical displacement can be extremely small, so low-noise electronics and rejection of acceleration feedthrough are crucial.

Analog Devices notes that precision MEMS gyros may detect extremely small differential capacitance changes and therefore benefit strongly from differential sensing and integrated signal conditioning. [Analog Devices reference](https://www.analog.com/en/resources/technical-articles/mems-gyroscope-provides-precision-inertial-sensing.html).

---

## 6. Tuning-fork gyroscopes

A common MEMS structure uses two masses driven in opposite directions.

External linear acceleration tends to affect both similarly, while Coriolis motion has an antisymmetric signature.

This differential architecture improves rejection of

- linear acceleration;
- vibration;
- package motion;
- common-mode disturbances.

---

## 7. Mode matching

Sensitivity increases when drive and sense resonances are close:

$$
\omega_d\approx\omega_s.
$$

This is called **mode matching**.

Benefits include greater mechanical gain, but the device becomes more sensitive to

- temperature drift;
- fabrication tolerance;
- damping;
- quadrature error.

High-performance gyros may use electrostatic tuning and closed-loop control to maintain the desired modal relationship.

---

## 8. Quadrature error

Fabrication imperfections can couple drive motion directly into the sense axis even without rotation.

This produces a **quadrature signal**, often much larger than the true Coriolis response.

Mitigation includes

- symmetric mechanical layout;
- electrostatic trimming;
- synchronous demodulation;
- digital calibration.

Quadrature suppression is one of the key practical problems in MEMS gyro design.

---

## 9. Open-loop versus force-rebalance MEMS

### Open-loop

Measure sense displacement directly.

### Closed-loop / force-rebalance

Apply an electrostatic feedback force to cancel the Coriolis displacement.

The feedback command then represents angular rate.

Closed-loop operation can improve

- linearity;
- bandwidth;
- dynamic range;
- scale-factor stability.

---

## 10. Three-axis MEMS gyroscopes

Modern IMUs integrate multiple sensing axes on one or more MEMS dies.

A consumer or industrial IMU commonly includes

- 3-axis gyro;
- 3-axis accelerometer;
- ADCs;
- temperature sensing;
- digital filters;
- calibration memory;
- SPI/I²C interface.

Factory calibration may compensate sensitivity, bias, alignment, temperature response, and acceleration sensitivity. Analog Devices describes such calibration in precision MEMS IMUs such as the ADIS16465. [ADI example](https://www.analog.com/en/products/adis16465.html).

---

# Optical gyroscopes

## 11. Sagnac effect

Fiber-optic gyros and ring-laser gyros both use the **Sagnac effect**.

Two waves propagate around the same closed loop in opposite directions.

If the loop rotates, the counter-propagating waves accumulate different propagation times.

For an enclosed area vector $\mathbf A$,

$$
\boxed{
\Delta t
=
\frac{4\mathbf A\cdot\boldsymbol\Omega}{c^2}
}
$$

for the ideal vacuum geometric form.

The corresponding optical phase shift is proportional to

$$
\Delta\phi
\propto
\frac{A\Omega}{\lambda c}.
$$

NASA describes the Sagnac effect as the basis of both ring-laser and fiber-optic gyroscopes. [NASA reference](https://ntrs.nasa.gov/api/citations/19930009044/downloads/19930009044.pdf).

---

## 12. Fiber-optic gyroscope (FOG)

A FOG uses a long coil of optical fiber.

Light from the same source is split into clockwise and counterclockwise beams.

After propagation through the coil, they recombine.

Rotation produces a phase difference,

$$
\boxed{
\Delta\phi_{S}
=
\frac{8\pi NA\Omega}{\lambda c}
}
$$

for a simple $N$-turn coil with enclosed area $A$ per turn, under the standard idealized convention.

The interferometer converts this phase difference into an electrical signal.

Because many turns of fiber multiply the effective enclosed area, a compact coil can have high rotation sensitivity.

---

## 13. Closed-loop FOG

High-performance FOGs commonly use phase modulation and feedback.

Rather than allowing a large interference-phase shift, the electronics apply a compensating optical phase.

The required feedback is proportional to angular rate.

This improves

- linearity;
- dynamic range;
- scale factor;
- digital readout.

A FOG has no rotating mechanical rotor and no laser cavity lock-in in the RLG sense.

---

## 14. Ring-laser gyroscope (RLG)

An RLG forms a closed laser cavity, often triangular or square.

Two laser modes circulate simultaneously in opposite directions.

Rotation changes their resonance frequencies.

The gyro measures the beat frequency

$$
\boxed{
\Delta f
=
\frac{4A}{\lambda P}
\Omega
}
$$

for an ideal ring of area $A$, perimeter $P$, wavelength $\lambda$, and rotation normal to the loop.

NASA describes RLG operation as measuring the rotation-dependent frequency difference of the counter-propagating cavity modes. [NASA reference](https://ntrs.nasa.gov/api/citations/19750071434/downloads/19750071434.pdf).

<figure class="topic-figure topic-figure-small">
  <a href="https://commons.wikimedia.org/wiki/File:RLG_Block_Schematic_Wikipedia1.jpg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/RLG_Block_Schematic_Wikipedia1.jpg?width=1000" alt="Block schematic of a triangular ring-laser gyroscope." loading="lazy"></a>
  <figcaption>Ring-laser gyro: clockwise and counterclockwise laser modes circulate around a closed optical cavity and acquire a rotation-dependent frequency difference. <a href="https://commons.wikimedia.org/wiki/File:RLG_Block_Schematic_Wikipedia1.jpg">Image source: Wikimedia Commons, CC BY-SA 4.0</a>.</figcaption>
</figure>

---

## 15. RLG lock-in

At very low rotation rates, backscattering between the two counter-propagating laser modes can couple them together.

Their frequencies can “lock,” creating a dead zone around zero rotation.

A classic mitigation is **mechanical dither**, in which the entire gyro is oscillated slightly so it does not remain in the lock-in region.

Modern designs also use improved mirrors and signal processing.

---

## 16. FOG versus RLG

| Property | FOG | RLG |
|---|---|---|
| Optical medium | long fiber coil | laser cavity |
| Measured quantity | Sagnac phase | Sagnac frequency difference |
| Gain medium | external source | inside ring cavity |
| Moving rotor | none | none |
| Low-rate lock-in | not RLG-style lock-in | important design issue |
| Typical use | industrial through navigation-grade | navigation/high-grade inertial systems |

Both are optical rate gyroscopes based on the same underlying Sagnac geometry.

---

# Resonator gyroscopes

## 17. Hemispherical resonator gyro (HRG)

An HRG uses a thin hemispherical or wineglass-shaped resonator.

The shell supports standing-wave vibration patterns.

When the device rotates, the orientation of the vibration pattern changes relative to the shell because of inertial dynamics.

Electrodes surrounding the resonator

- drive the vibration;
- sense its orientation;
- rebalance the mode.

The result is a highly stable solid-state gyro with no spinning rotor and no optical fiber coil.

---

## 18. Wineglass modes

The resonator often operates in a mode with several alternating antinodes around the rim.

A useful conceptual picture is

$$
\text{standing vibration pattern}
+
\text{rotation}
\rightarrow
\text{pattern precession}.
$$

This is related to the **Bryan effect**: the vibration pattern does not follow the resonator body exactly during rotation.

The measured relative angle provides the inertial rotation information.

---

## 19. Whole-angle versus rate mode

A resonator gyro can operate conceptually in two ways.

### Rate mode

Feedback holds the vibration pattern fixed relative to the resonator, and feedback force measures angular rate.

### Whole-angle mode

The vibration pattern is allowed to precess, and the pattern angle itself tracks integrated rotation.

Whole-angle operation can provide excellent scale-factor stability but requires very low resonator asymmetry and loss.

---

# Error and performance concepts

## 20. Bias

Gyro output can be modeled as

$$
\omega_m
=
(1+s)\omega
+
b
+
n.
$$

Here

- $s$ = scale-factor error;
- $b$ = bias;
- $n$ = noise.

A constant bias $b$ produces angle error

$$
\delta\theta=bt.
$$

---

## 21. Bias instability

Bias is not perfectly constant.

Slow stochastic changes create **bias instability**.

It is one of the most important specifications for navigation gyros because it determines how rapidly attitude error grows during unaided operation.

---

## 22. Angle random walk

White rate noise integrates into angle uncertainty.

A common specification is **angle random walk (ARW)**, often expressed in

$$
^\circ/\sqrt{\mathrm h}.
$$

If ARW is $N$, angle uncertainty roughly grows as

$$
\sigma_\theta\propto N\sqrt t.
$$

---

## 23. Allan deviation

Allan-deviation analysis is widely used to separate

- angle random walk;
- bias instability;
- rate random walk;
- quantization-like behavior.

See [Allan Deviation & Frequency Stability](../laser-systems/allan-deviation.html).

---

## 24. Scale-factor error

Ideally,

$$
V_{out}=K\Omega.
$$

The coefficient $K$ is the scale factor.

Real scale factor changes with

- temperature;
- supply;
- aging;
- mechanical stress;
- optical path properties;
- resonator frequency.

Calibration over temperature and rate is therefore essential.

---

## 25. Cross-axis sensitivity

A nominal $z$-axis gyro may respond slightly to rotation about $x$ or $y$.

For three axes,

$$
\boldsymbol\omega_m
=
\mathbf M\boldsymbol\omega
+
\mathbf b.
$$

The matrix $\mathbf M$ contains scale and misalignment terms.

System calibration estimates and removes these coupling errors.

---

## 26. Acceleration sensitivity

Gyros can also respond to linear acceleration.

MEMS devices are especially sensitive to

- package stress;
- vibration;
- imperfect mechanical symmetry.

This is why vibration rejection is an important gyro specification.

---

## 27. Temperature compensation

Temperature changes

- MEMS resonant frequency;
- damping;
- electronics offset;
- optical path length;
- laser frequency;
- resonator dimensions.

High-performance gyros therefore contain temperature sensing and compensation tables or models.

---

## 28. Bandwidth versus noise

A wide-bandwidth gyro tracks rapid motion but admits more noise.

A narrow-bandwidth gyro provides cleaner output but more delay.

The system designer therefore chooses bandwidth based on vehicle dynamics and estimator requirements.

---

# Emerging atomic gyroscopes

## 29. Atom-interferometric gyroscope

Atoms can behave as matter waves.

Laser pulses split and recombine atomic wave packets.

Rotation introduces a Sagnac-like matter-wave phase shift.

NIST point-source atom interferometry uses laser-cooled atoms and spatial interference fringes to extract rotation; the same instrument can simultaneously measure acceleration along another axis. citeturn330346search0turn330346search6

---

## 30. Why atom gyros are attractive

Potential advantages include

- excellent long-term bias stability;
- accurately defined scale factors;
- multi-axis sensing;
- absolute inertial references.

NIST is actively developing compact cold-atom interferometers for future inertial sensing. citeturn330346search5

Current challenges include

- optical complexity;
- vacuum hardware;
- vibration sensitivity;
- dead time;
- bandwidth;
- size/weight/power.

They are therefore an emerging technology rather than a universal replacement for MEMS, FOG, RLG, or resonator gyros.

---

## 31. Choosing a gyro technology

| Gyro type | Typical strength |
|---|---|
| MEMS Coriolis | tiny size, low power, low cost |
| precision MEMS | improved bias/noise with compact form factor |
| FOG | excellent stability without moving rotor |
| RLG | mature navigation-grade optical performance |
| HRG / resonator | very low drift with compact solid-state resonator |
| atom interferometer | emerging long-term stability and absolute scale-factor potential |

There is no single “best gyro.” The correct choice depends on

$$
\text{bias}
+
\text{noise}
+
\text{dynamic range}
+
\text{bandwidth}
+
\text{SWaP}
+
\text{cost}.
$$

---

## 32. Connection to inertial navigation

A three-axis gyro provides the angular-rate measurements required to propagate attitude.

The INS then uses attitude to rotate accelerometer specific force into the navigation frame.

Thus

$$
\boxed{
\text{gyro quality}
\rightarrow
\text{attitude quality}
\rightarrow
\text{gravity projection accuracy}
\rightarrow
\text{velocity / position accuracy}.
}
$$

A small gyro error can therefore become a much larger navigation error.

See [Modern Inertial Navigation Systems](../inertial-navigation/).

---

## 33. Laboratory characterization

Useful gyro tests include

- zero-rate bias;
- bias versus temperature;
- rate-table scale factor;
- nonlinearity;
- cross-axis sensitivity;
- vibration sensitivity;
- bandwidth;
- Allan deviation;
- turn-on repeatability;
- long-duration drift.

A rate table provides a known angular input,

$$
\Omega_{ref},
$$

allowing calibration of

$$
K
=
\frac{V_{out}-V_0}{\Omega_{ref}}.
$$

---

## 34. Selected references

- Analog Devices, [New iMEMS Angular-Rate-Sensing Gyroscope](https://www.analog.com/en/resources/analog-dialogue/articles/imems-angular-rate-sensing-gyroscope.html) — intuitive MEMS Coriolis gyro operation.
- Analog Devices, [MEMS Gyroscope Provides Precision Inertial Sensing](https://www.analog.com/en/resources/technical-articles/mems-gyroscope-provides-precision-inertial-sensing.html) — capacitive sensing, vibration rejection, and practical implementation.
- NASA, [Theory of Laser Gyroscopes](https://ntrs.nasa.gov/api/citations/19930009044/downloads/19930009044.pdf) — Sagnac principle for optical gyroscopes.
- NASA, [Ring Laser Sensors](https://ntrs.nasa.gov/api/citations/19750071434/downloads/19750071434.pdf) — ring-laser operating principle and cavity physics.
- NIST, [Point-source atom interferometer gyroscope](https://www.nist.gov/publications/point-source-atom-interferometer-gyroscope) — cold-atom gyroscope principles.
- NIST, [Compact Cold Atom Instruments](https://www.nist.gov/programs-projects/compact-cold-atom-instruments) — ongoing compact atom-interferometer development.

Related: [Modern Inertial Navigation](../inertial-navigation/) · [Allan Deviation](../laser-systems/allan-deviation.html) · [Laser Systems](../laser-systems/) · [Measurements & Instruments](../measurements/) · [Quantum Technologies](../quantum/)
