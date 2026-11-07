---
layout: default
title: Spacecraft Attitude Determination & Precision Pointing
description: Star trackers, sun sensors, inertial units, quaternions, reaction wheels, magnetic torquers and pointing calibration.
---

# Spacecraft Attitude Determination & Precision Pointing

<div class="intuition"><span class="callout-title">Instrument pointing is an EM measurement problem</span>Optical and RF boresight orientation determines which field/radiance direction is sampled. Pointing error, attitude jitter and misalignment can dominate scientific uncertainty even with perfect detectors.</div>

## 1. Attitude dynamics and measurements

For body angular rate $\boldsymbol\omega$ and scalar-first unit quaternion $q=(q_0,\mathbf q)$, one consistent convention is

$$\dot q=\frac12\,q\otimes(0,\boldsymbol\omega),$$

provided $q$ maps body to inertial coordinates with the associated multiplication convention. Quaternion handedness and transformation conventions vary across software: document them.

Euler rigid-body dynamics are

$$\mathbf J\dot{\boldsymbol\omega}+\boldsymbol\omega\times(\mathbf J\boldsymbol\omega)=\boldsymbol\tau_\mathrm{ext}+\boldsymbol\tau_\mathrm{ctrl}.$$

Disturbance torques include gravity gradient, solar pressure, atmospheric drag, residual magnetization and mechanism motion.

## 2. Sensors and actuators

| Component | Output or function | Calibration concern |
|---|---|---|
| Star tracker | Absolute inertial attitude from star patterns | Lost-in-space acquisition, boresight misalignment |
| Sun sensor | Sun direction | Field of view, albedo, calibration |
| IMU/gyro | Angular-rate estimate | Bias, scale, random walk |
| Magnetometer | Local magnetic-field vector | Spacecraft magnetic contamination |
| Reaction wheel | Smooth torque via momentum exchange | Jitter, momentum saturation |
| Magnetic torquer | Dipole interacting with Earth's magnetic field | No torque parallel to local magnetic field |
| Thruster | Torque or momentum dumping | Impulse variability and disturbance |

## 3. Kalman filtering and pointing budget

An error-state EKF combines star-tracker attitude updates with gyro propagation; bias estimates and measurement covariance matter. Report *knowledge* (estimated attitude error) separately from *control* (actual jitter). Optical point-spread smearing depends on angular jitter relative to pixel angular scale and exposure time.

**Worked check:** for focal length 1 m and 10 µm pixel pitch, geometric pixel angular scale is $\approx10$ µrad ≈2.06 arcsec/pixel under small-angle approximation. A 1 arcsec line-of-sight drift is ~0.485 pixel.

**Exercise:** integrate quaternion attitude from a biased gyro, periodically correct with noisy star-tracker observations, and compare error with/without bias estimation.

## 4. References

- [NASA 2026 — Guidance, Navigation & Control](https://www.nasa.gov/smallsat-institute/sst-soa/guidance-navigation-and-control/).
- [NASA SmallSat Attitude Determination & Control](https://s3vi.ndc.nasa.gov/ssri-kb/topics/28/).
- J. R. Wertz, *Spacecraft Attitude Determination and Control*.
- [Modern Gyroscopes](../modern-gyroscopes/) · [Inertial Navigation](../inertial-navigation/) · [Magnetic Cleanliness](../magnetic-cleanliness/).
