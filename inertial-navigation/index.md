---
layout: default
title: Modern Inertial Navigation Systems
description: Concise reference to modern inertial navigation, IMUs, accelerometers, MEMS/FOG/RLG gyros, strapdown mechanization, quaternions, drift, Schuler dynamics, Kalman filtering, GNSS integration, multisensor fusion, GNSS-denied navigation, and emerging quantum inertial sensors.
---

# Modern Inertial Navigation Systems

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:DARPA_TIMU_Michigan_Penny.jpg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/DARPA_TIMU_Michigan_Penny.jpg?width=1100" alt="Miniature timing and inertial measurement unit shown next to a coin." loading="lazy"></a>
  <figcaption>A miniature timing and inertial measurement unit illustrates how modern inertial sensing has moved from large mechanical platforms toward compact MEMS-scale systems. <a href="https://commons.wikimedia.org/wiki/File:DARPA_TIMU_Michigan_Penny.jpg">Image source: DARPA / University of Michigan via Wikimedia Commons</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>An inertial navigation system estimates a vehicle's <strong>attitude, velocity, and position</strong> from measured angular rate and specific force. Gyroscopes tell the system how the body rotates; accelerometers measure non-gravitational specific force. After rotating those measurements into a navigation frame and accounting for gravity and Earth rotation, the system integrates them forward in time. INS is self-contained and high-rate—but sensor bias is integrated, so position error grows with time.</div>

<div class="pathway"><span class="node">gyroscopes + accelerometers</span><span class="arrow">→</span><span class="node">attitude</span><span class="arrow">→</span><span class="node">specific force in navigation frame</span><span class="arrow">→</span><span class="node">velocity</span><span class="arrow">→</span><span class="node">position</span><span class="arrow">→</span><span class="node">sensor fusion / correction</span></div>

## 1. INS, IMU, AHRS, and PNT

These terms are related but not identical.

| Term | Main function |
|---|---|
| **IMU** | measures angular rate and specific force, usually on 3 axes each |
| **AHRS** | estimates attitude/heading, often using gyro + accelerometer + magnetometer |
| **INS** | estimates attitude, velocity, and position by inertial mechanization |
| **GNSS/INS** | combines satellite navigation with inertial estimation |
| **PNT** | broader positioning, navigation, and timing system |

An IMU is therefore a sensor package; an INS is an estimation system built around IMU data.

---

## 2. The six inertial measurements

A basic 6-DOF IMU contains

- three gyroscopes measuring body angular rate;
- three accelerometers measuring body specific force.

Write

$$
\boldsymbol\omega_b=
\begin{bmatrix}
\omega_x&\omega_y&\omega_z
\end{bmatrix}^T
$$

and

$$
\mathbf f_b=
\begin{bmatrix}
f_x&f_y&f_z
\end{bmatrix}^T.
$$

A 9-axis consumer IMU usually adds a 3-axis magnetometer, though the magnetometer is not an inertial sensor.

---

## 3. What an accelerometer actually measures

An accelerometer does **not** directly measure kinematic acceleration.

It measures **specific force**,

$$
\boxed{
\mathbf f=\mathbf a-\mathbf g
}
$$

under the common local-frame convention.

A stationary accelerometer on a table therefore reports approximately $1g$ upward along the support direction because the table prevents free fall.

This distinction is fundamental to inertial navigation.

---

## 4. Gyroscopes

Modern INS commonly uses several gyro technologies.

For the detailed operating physics—including MEMS Coriolis vibratory gyros, fiber-optic gyros, ring-laser gyros, hemispherical resonator gyros, noise/error mechanisms, and emerging atom-interferometric gyros—see [Modern Gyroscopes — How They Work](../modern-gyroscopes/).

Modern INS commonly uses several gyro technologies.

### MEMS gyro

MEMS gyros infer rotation through Coriolis coupling in a vibrating mechanical structure.

They are

- small;
- low power;
- inexpensive;
- widely used in phones, vehicles, drones, robotics, and many tactical systems.

### Fiber-optic gyro (FOG)

A FOG uses the Sagnac phase shift between counterpropagating optical waves in a fiber coil.

### Ring-laser gyro (RLG)

An RLG uses counterpropagating laser modes in a closed optical cavity. Rotation produces a Sagnac frequency difference.

NASA reports RLG, FOG, and MEMS technologies across modern civil inertial systems.

---

## 5. Strapdown versus stabilized-platform INS

Older systems often used a mechanically stabilized platform to keep inertial sensors aligned with a navigation frame.

Modern systems are predominantly **strapdown**:

- sensors are rigidly attached to the vehicle;
- attitude is computed numerically;
- measured vectors are transformed in software.

The advantages are lower mechanical complexity, smaller size, and easier integration.

The cost is much higher computational demand and sensitivity to sensor calibration.

---

## 6. Coordinate frames

Common frames include

- **body frame** $b$ — fixed to the vehicle;
- **navigation frame** $n$ — often NED or ENU;
- **ECEF** — Earth-centered, Earth-fixed;
- **ECI** — Earth-centered inertial.

A correct INS must keep track of frame transformations and Earth rotation.

This is why attitude mathematics is central to navigation.

---

## 7. Direction-cosine matrices

A vector measured in the body frame can be transformed to the navigation frame using

$$
\mathbf v_n
=
\mathbf C_b^n\mathbf v_b.
$$

The direction-cosine matrix contains the current attitude.

Repeated matrix updates are straightforward conceptually but can accumulate numerical errors unless orthogonality is maintained.

---

## 8. Euler angles

Attitude is often described as

- roll $\phi$;
- pitch $\theta$;
- yaw/heading $\psi$.

Euler angles are intuitive but can suffer singularities such as **gimbal lock**.

They are therefore often used for display while internal mechanization uses quaternions or rotation matrices.

---

## 9. Quaternions

A unit quaternion can represent orientation as

$$
\mathbf q=
\begin{bmatrix}
q_0&q_1&q_2&q_3
\end{bmatrix}^T.
$$

Its update follows the measured angular rate.

Quaternions are widely used because they

- avoid Euler-angle singularities;
- are compact;
- support efficient composition;
- are numerically convenient for high-rate attitude propagation.

The quaternion should remain normalized:

$$
\|\mathbf q\|=1.
$$

---

## 10. Strapdown mechanization

A simplified navigation cycle is

1. integrate gyro rates to update attitude;
2. rotate measured specific force from body to navigation frame;
3. add gravity and Earth-rotation/navigation-frame corrections;
4. integrate acceleration to velocity;
5. integrate velocity to position.

Conceptually,

$$
\boldsymbol\omega
\rightarrow
\mathbf C_b^n
\rightarrow
\mathbf f_n
\rightarrow
\mathbf v
\rightarrow
\mathbf r.
$$

---

## 11. Why inertial error grows

Suppose an accelerometer has a constant bias $b_a$.

Then velocity error grows approximately as

$$
\delta v\approx b_a t
$$

and position error approximately as

$$
\boxed{
\delta r\approx\frac12 b_a t^2.
}
$$

Gyro bias is often even more damaging because attitude error rotates gravity into the wrong horizontal direction, creating a false acceleration.

This is the central limitation of stand-alone inertial navigation.

---

## 12. Important IMU error terms

A practical sensor model can be written

$$
\mathbf y
=
(\mathbf I+\mathbf S+\mathbf M)\mathbf x
+
\mathbf b
+
\mathbf n,
$$

where

- $\mathbf b$ = bias;
- $\mathbf S$ = scale-factor error;
- $\mathbf M$ = axis misalignment/cross-axis sensitivity;
- $\mathbf n$ = noise.

Also important are

- bias instability;
- angle random walk;
- velocity random walk;
- temperature coefficients;
- vibration sensitivity;
- turn-on repeatability.

---

## 13. Allan deviation for inertial sensors

Allan deviation is widely used to separate stochastic IMU noise processes.

For gyroscopes it can help identify

- angle random walk;
- bias instability;
- rate random walk.

For accelerometers it can reveal analogous velocity/acceleration noise processes.

See [Allan Deviation & Frequency Stability](../laser-systems/allan-deviation.html) for the general statistical concept.

---

## 14. Alignment

Before navigation begins, the INS must estimate initial attitude.

### Coarse leveling

Gravity provides roll and pitch.

### Heading

Heading can come from

- Earth-rate gyrocompassing;
- magnetometer;
- GNSS heading;
- dual-antenna GNSS;
- external optical/vehicle heading.

High-grade gyros can sense Earth rotation for gyrocompassing; low-cost MEMS typically requires external heading assistance.

---

## 15. Earth rotation

Earth's rotation rate is approximately

$$
\Omega_E
\approx
7.292115\times10^{-5}\ \mathrm{rad/s}.
$$

High-performance INS must account for Earth rotation and transport rate.

The effect is negligible for some short-duration consumer applications but essential for navigation-grade systems.

---

## 16. Coriolis terms

In a rotating navigation frame, velocity propagation includes terms analogous to

$$
-2\boldsymbol\Omega\times\mathbf v.
$$

These apparent-force terms arise because the navigation frame rotates relative to inertial space.

Ignoring them produces significant long-duration navigation error.

---

## 17. Schuler oscillation

A locally level inertial system coupled to Earth's curvature exhibits a natural error oscillation with period approximately

$$
T_S
=
2\pi\sqrt{\frac{R_E}{g}}
\approx84.4\ \mathrm{min}.
$$

This **Schuler tuning** is a classic feature of terrestrial inertial navigation.

It prevents small tilt errors from producing indefinitely growing horizontal position errors in the idealized local-level loop; instead they participate in a long-period oscillatory error mode.

---

## 18. Coning and sculling

Real vehicles rotate and accelerate between discrete IMU samples.

### Coning correction

Accounts for noncommuting small rotations.

### Sculling correction

Accounts for coupling between rotation and incremental velocity.

At high dynamics, naive sample-by-sample integration can produce significant errors even with excellent sensors.

---

## 19. GNSS-aided INS

INS and GNSS are complementary.

**INS**

- very high update rate;
- smooth;
- self-contained;
- drifts with time.

**GNSS**

- globally referenced;
- bounded long-term position error;
- lower update rate;
- vulnerable to blockage, multipath, jamming, or spoofing.

Together,

$$
\boxed{
\text{INS short-term continuity}
+
\text{GNSS long-term reference}
}
$$

produces a much stronger navigation solution.

---

## 20. Loosely, tightly, and deeply coupled integration

### Loosely coupled

The filter combines complete GNSS position/velocity solutions with INS.

### Tightly coupled

Raw or partially processed GNSS measurements such as pseudorange and Doppler are fused directly with inertial states.

This can retain useful navigation information when fewer satellites are available.

### Deeply coupled

The inertial solution assists GNSS tracking loops more directly.

Greater integration can improve robustness but increases architecture and verification complexity.

---

## 21. Kalman filtering

A Kalman filter is the classic framework for aided INS.

The state may include

$$
\mathbf x=
[
\delta\mathbf r,
\delta\mathbf v,
\delta\boldsymbol\theta,
\mathbf b_g,
\mathbf b_a,
\ldots]^T.
$$

Prediction uses the inertial model:

$$
\mathbf x_{k|k-1}
=
\mathbf F\mathbf x_{k-1|k-1}.
$$

External measurements then correct the estimate.

Most practical systems use an **error-state EKF**, because the inertial mechanization propagates the main nonlinear state while the filter estimates small errors.

---

## 22. Sensor fusion beyond GNSS

Modern navigation systems can fuse INS with

- camera / visual odometry;
- LiDAR;
- radar;
- wheel odometry;
- barometer;
- magnetometer;
- terrain maps;
- celestial observations;
- radio signals of opportunity.

This broader architecture is often described as **multisensor PNT**.

The key idea is observability: each external sensor constrains particular inertial error states.

---

## 23. Visual-inertial navigation

A camera provides relative motion information from image features while the IMU supplies high-rate motion and attitude dynamics.

Visual-inertial odometry is widely used in

- drones;
- robots;
- AR/VR;
- autonomous systems.

The IMU bridges rapid motion and visual gaps; vision bounds long-term drift.

---

## 24. LiDAR-inertial and radar-inertial navigation

LiDAR and radar provide geometric constraints from the environment.

### LiDAR-inertial

Strong in structured 3-D environments but can be affected by weather, dust, and scene degeneracy.

### Radar-inertial

Can operate in darkness and many adverse-weather conditions and provides direct Doppler information in some architectures.

These approaches are increasingly important for GNSS-challenged autonomous systems.

---

## 25. Zero-velocity updates

For pedestrian or wheeled navigation, known stationary intervals provide powerful constraints.

If a foot-mounted IMU is stationary during stance,

$$
\mathbf v\approx0.
$$

A **ZUPT** allows the filter to correct velocity error and indirectly estimate biases.

Simple physical constraints can therefore dramatically reduce inertial drift.

---

## 26. Magnetometer aiding

A magnetometer can provide heading information from Earth's field.

However, it is vulnerable to

- hard-iron offsets;
- soft-iron distortion;
- nearby current;
- ferromagnetic structures.

In vehicles and laboratories, magnetic heading must therefore be treated cautiously.

---

## 27. Barometric aiding

Pressure provides a useful relative-altitude cue.

It can stabilize the vertical channel, but atmospheric pressure varies with

- weather;
- temperature;
- airflow;
- vehicle motion.

It is therefore normally fused rather than treated as an absolute height reference.

---

## 28. INS performance classes

Informal classes include

- consumer;
- industrial;
- tactical;
- navigation grade;
- strategic grade.

The boundaries are not universal.

The important specifications are the actual sensor error terms—especially gyro bias stability, accelerometer bias, random walk, scale factor, and environmental sensitivity—rather than the marketing label.

---

## 29. MEMS versus FOG versus RLG

| Technology | Strengths | Limitations |
|---|---|---|
| MEMS | small, cheap, low power | greater drift and environmental sensitivity |
| FOG | excellent stability, no moving mechanical rotor | larger, more expensive than MEMS |
| RLG | high accuracy and mature navigation performance | size, cost, optical complexity |
| atom interferometer | potentially exceptional long-term inertial stability | emerging; challenging size, vibration robustness, bandwidth and integration |

---

## 30. GNSS-denied navigation

INS is especially valuable when GNSS is unavailable in

- tunnels;
- buildings;
- urban canyons;
- underwater vehicles;
- contested RF environments;
- planetary exploration.

But **INS alone does not eliminate drift**.

Modern GNSS-denied navigation therefore focuses on

$$
\boxed{
\text{better inertial sensors}
+
\text{alternate aiding sources}
+
\text{better fusion algorithms}.
}
$$

DARPA's navigation programs explicitly frame the problem in these terms.

---

## 31. Integrity and fault detection

A modern navigation system must know not only its estimate but also whether that estimate is trustworthy.

Useful mechanisms include

- innovation monitoring;
- residual tests;
- sensor voting;
- covariance consistency;
- GNSS spoof/jam detection;
- redundant IMUs;
- fault isolation.

Navigation integrity is particularly important for autonomous vehicles and aviation.

---

## 32. Redundant IMUs

Multiple IMUs can provide

- fault tolerance;
- averaging of independent noise;
- cross-checking;
- graceful degradation.

Redundancy does not automatically remove correlated bias or common environmental errors, so system architecture and calibration still matter.

---

## 33. Machine learning in navigation

Machine-learning methods are being explored for

- sensor-error modeling;
- learned odometry;
- visual feature extraction;
- map matching;
- fault detection.

However, physical inertial mechanization remains valuable because it enforces geometry and dynamics explicitly.

A promising architecture is therefore often

$$
\boxed{
\text{physics-based INS}
+
\text{learned aiding / error model}
}
$$

rather than replacing the mechanization entirely.

---

## 34. Emerging quantum inertial sensors

Atom interferometers use matter-wave phase to measure acceleration and rotation.

NIST notes that atom interferometers can function as quantum accelerometers and gyroscopes and could contribute to precision navigation without GPS. DARPA has also pursued cold-atom inertial sensing for long-duration GPS-denied PNT.

The long-term attraction is improved

- bias stability;
- scale-factor stability;
- absolute inertial accuracy.

The major practical challenges remain

- size/weight/power;
- optical complexity;
- vibration sensitivity;
- dead time and bandwidth;
- field robustness.

These systems are therefore best viewed as an **emerging complement to classical INS**, not yet a universal replacement for MEMS, FOG, or RLG systems.

---

## 35. Modern navigation-system architecture

A representative modern stack is

$$
\boxed{
\text{IMU}
+
\text{GNSS}
+
\text{vision/LiDAR/radar}
+
\text{baro/magnetometer}
\rightarrow
\text{state estimator}
\rightarrow
\text{position + velocity + attitude + integrity}.
}
$$

At high rate, inertial mechanization propagates the state.

At lower rate, external measurements estimate and remove drift.

---

## 36. What to measure in an INS laboratory

Important measurements include

- gyro bias versus temperature;
- accelerometer bias;
- scale factor;
- axis misalignment;
- Allan deviation;
- vibration sensitivity;
- turn-on repeatability;
- static heading drift;
- rate-table response;
- GNSS outage error growth;
- filter convergence;
- latency and time synchronization.

For integrated navigation, **timestamp accuracy is part of sensor accuracy**.

---

## 37. Time synchronization

If two sensors are misaligned in time by $\Delta t$, vehicle dynamics turn that timing error into an apparent spatial or angular error.

At velocity $v$,

$$
\Delta x\sim v\Delta t.
$$

At angular rate $\omega$,

$$
\Delta\theta\sim\omega\Delta t.
$$

Modern multisensor systems therefore require disciplined clocks, timestamping, latency calibration, and often hardware synchronization.

---

## 38. Applications

Modern INS appears in

- aircraft;
- spacecraft;
- missiles;
- ships and submarines;
- autonomous vehicles;
- drones;
- robots;
- smartphones;
- surveying;
- mapping;
- AR/VR;
- pedestrian navigation.

The sensor grade and aiding architecture vary enormously, but the underlying mechanization is the same.

---

## 39. Selected references

- NASA, [Guidance, Navigation, and Control — State of the Art](https://www.nasa.gov/wp-content/uploads/2021/10/5.soa_gnc_2021.pdf) — spacecraft GNC and inertial-sensor technology overview.
- NASA/NTRS, [UAM Communication, Navigation and Surveillance report](https://ntrs.nasa.gov/citations/20205006661) — discussion of RLG, FOG, MEMS and modern navigation systems.
- GPS.gov, [GPS overview](https://www.gps.gov/gps) — satellite PNT context.
- NIST, [Turning Atoms Into Waves to Measure Gravity and Acceleration](https://www.nist.gov/quantum-information-science/quantum-sensing-explained/turning-atoms-waves-measure-gravity-and) — atom-interferometric acceleration, rotation and future GPS-independent navigation.
- NIST, [Point-source atom interferometer gyroscope](https://www.nist.gov/publications/point-source-atom-interferometer-gyroscope) — cold-atom inertial sensing.
- DARPA, [Adaptable Navigation Systems](https://www.darpa.mil/research/programs/adaptable-navigation-systems) — alternate PNT, multisensor fusion and cold-atom inertial navigation.

Related: [Spacecraft Electromagnetics](../computational-em/) · [Measurements & Instruments](../measurements/) · [Computational Methods](../computational-methods/) · [Allan Deviation](../laser-systems/allan-deviation.html) · [Quantum Technologies](../quantum/)
