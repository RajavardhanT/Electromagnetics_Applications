---
layout: default
title: Advanced Antenna Measurements & Near-to-Far Field Transformation
description: Planar/spherical/cylindrical near-field scanning, probe correction, phase center, gain uncertainty and OTA test.
---

# Advanced Antenna Measurements & Near-to-Far Field Transformation

<div class="intuition"><span class="callout-title">The measured pattern is a reconstructed observable</span>A network analyzer or probe directly sees a voltage/field coupling in a finite measurement environment. Antenna gain and far-field radiation patterns are recovered only after calibration, propagation transforms and error corrections.</div>

## 1. From near field to far field

Tangential fields over a planar scan may be represented by spatial Fourier components. In a uniform half-space,

$$\tilde{\mathbf E}(k_x,k_y)=\iint \mathbf E_t(x,y,0)e^{-j(k_xx+k_yy)}\,dx\,dy,$$

with $k_z=\sqrt{k^2-k_x^2-k_y^2}$. Propagating components lie within $k_x^2+k_y^2\le k^2$. Converting measured field to a far-zone pattern requires field components and the correct vector/polarization relations, not simply a scalar FFT of a single uncorrected voltage trace.

**Finite scan truncation** convolves the ideal spectrum with a window response. Probe patterns, misalignment, multiple reflections and positioning errors create additional bias.

## 2. Measurement geometries

| Geometry | Advantages | Constraints |
|---|---|---|
| Far-field range | Direct angle-domain pattern | Large distance for large apertures |
| Compact antenna test range (CATR) | Plane-wave-like quiet zone at shorter range | Reflector edge diffraction and quiet-zone mapping |
| Planar near-field | Efficient for directive antennas | Angular validity and scan truncation |
| Cylindrical near-field | Convenient around sector antennas | Mode conversion and calibration |
| Spherical near-field | Broad angular coverage | Spherical mode truncation, position/probe correction |

Fraunhofer distance $R\gtrsim 2D^2/\lambda$ is a useful large-aperture rule of thumb, not an exact universal far-field boundary.

## 3. Absolute gain and uncertainty

Antenna gain depends on directivity and efficiency. Realized gain also incorporates mismatch loss. For a calibrated gain transfer, include source power, cable loss, distance, polarization alignment, chamber reflectivity, drift, instrument linearity and reference antenna uncertainty.

**Advanced exercise:** reconstruct a synthetic planar aperture pattern from near-field samples, then vary scan size and position jitter to estimate 3 dB beamwidth and sidelobe errors.

## 4. Related advanced topics

Embedded element patterns, mutual coupling, active match and scan blindness are described in [Antennas](../antennas/) and [AESA](../aesa/). For chamber validation and emissions see [EMC](../emc/). For uncertainty see [Measurements](../measurements/).

## 5. References

- A. D. Yaghjian, near-field antenna measurements and transformations; J. E. Hansen, *Spherical Near-Field Antenna Measurements*.
- [NIST — RF/Microwave Measurement Research](https://www.nist.gov/programs-projects/electromagnetic-waveform-metrology).
