---
layout: default
title: Measurements & Instruments
description: How electromagnetic quantities are actually measured: VNA, spectrum analyzer, VSA, oscilloscope, power meter, field probes, antenna ranges, EMC, optics, atomic sensors, calibration and uncertainty.
---

# Measurements & Instruments

<div class="intuition"><span class="callout-title">30-second intuition</span>A theoretical quantity becomes useful only when you know <strong>what instrument measures it, what calibration establishes its scale, what bandwidth is implied, and what uncertainty or systematic error can corrupt it</strong>.</div>

## Measurement map

| Quantity | Typical instrument / method | Main caveat |
|---|---|---|
| $S_{11},S_{21}$ | Vector network analyzer (VNA) | calibration plane, cables, fixtures |
| Spectrum / harmonics / spurs | Spectrum analyzer | RBW/VBW, detector, overload |
| EVM / constellation / demodulation | Vector signal analyzer (VSA) | reference model, equalization, phase noise |
| Time waveform / pulse | Oscilloscope | analog BW, sample rate, probe loading |
| RF power | Power meter / calibrated sensor | sensor range, mismatch, crest factor |
| Noise figure | Noise source + analyzer / Y-factor | ENR calibration, gain stability |
| Antenna gain/pattern | Anechoic range / near-field scanner | far-field criterion, chamber reflections |
| Electric field | calibrated isotropic probe / antenna / atomic sensor | perturbation, polarization, calibration |
| Magnetic field | Hall, fluxgate, search coil, OPM | bandwidth, offset, orientation |
| Optical transmission | photodiode + TIA | responsivity, linearity, bandwidth |
| Optical frequency | wavemeter / comb / reference spectroscopy | absolute calibration, drift |

## 1. Vector network analyzer

A VNA measures complex traveling-wave ratios. For a two-port device,

$$
\begin{bmatrix}b_1\\b_2\end{bmatrix}=
\begin{bmatrix}S_{11}&S_{12}\\S_{21}&S_{22}\end{bmatrix}
\begin{bmatrix}a_1\\a_2\end{bmatrix}.
$$

### Practical workflow

1. Choose frequency span, IF bandwidth, power, averaging and number of points.
2. Warm up cables and fixtures if precision matters.
3. Calibrate at the desired reference plane: SOLT, TRL, ECal or another suitable method.
4. Verify calibration with a known standard or thru.
5. Measure the DUT without changing cable geometry unnecessarily.
6. Save complex data, not just screenshots.

<div class="engineering"><span class="callout-title">Engineering reality</span>A beautiful $S_{11}$ trace can mostly describe your fixture if the calibration plane is wrong. At mmWave, connector repeatability, cable flexure and launch design can dominate.</div>

## 2. Spectrum analyzer

Use a spectrum analyzer for carrier power, harmonics, spurious emissions, occupied bandwidth, phase-noise-related skirts and interference searches.

Key settings:

- **RBW:** frequency selectivity and noise bandwidth;
- **VBW:** post-detection smoothing;
- **reference level / attenuation:** overload protection versus sensitivity;
- **detector:** peak, RMS, sample, quasi-peak depending on task;
- **sweep time:** tied to span and filters.

A narrower RBW reduces displayed noise power approximately with $10\log_{10}B$, but also slows measurement and may hide fast events.

## 3. Vector signal analysis and EVM

A VSA demodulates a known modulation format. Error vector magnitude is conceptually

$$
\mathrm{EVM}_{RMS}=
\sqrt{\frac{\sum_k|S_k-S_{k,ref}|^2}{\sum_k|S_{k,ref}|^2}}.
$$

EVM is a compact metric that can include amplifier nonlinearity, IQ imbalance, phase noise, frequency error, noise, compression and channel effects. Interpretation depends strongly on the equalization and reference definitions used.

## 4. Oscilloscope

An oscilloscope connects electromagnetic systems to time-domain behavior: pulses, envelopes, beat notes, transients, switching, detector signals and TIA outputs.

Useful rules:

- analog bandwidth should exceed the highest spectral content you want to preserve;
- sample rate should comfortably exceed Nyquist and support desired timing resolution;
- averaging improves uncorrelated noise but can erase nonstationary behavior;
- a 10× probe or active probe changes circuit loading differently than a 50 Ω input.

For a nominally Gaussian system, a rough rise-time relation is

$$t_r\approx\frac{0.35}{BW}.$$

## 5. RF power measurement

Power meters are often more accurate than spectrum analyzers for absolute average power. Directional couplers allow forward/reflected measurements in high-power paths.

Mismatch uncertainty matters because source and sensor reflection coefficients interact. For pulsed/high-PAPR signals, ensure the sensor supports the waveform's crest factor and bandwidth.

## 6. Noise figure

For the Y-factor method,

$$Y=\frac{P_{hot}}{P_{cold}},
$$

combined with the calibrated excess-noise ratio of the source. Noise-figure work is sensitive to source ENR calibration, connector loss, gain variation, image responses and analyzer noise floor.

## 7. Antenna patterns, gain and efficiency

### Far-field range

A common criterion is

$$R_{FF}\gtrsim\frac{2D^2}{\lambda}.
$$

Measure amplitude and phase versus angle with a calibrated source/receive geometry.

### Near-field scanning

Planar, cylindrical or spherical near-field measurements can be transformed computationally to the far field. This is invaluable when the required far-field distance is impractically large.

### OTA systems

Modern wireless devices are often evaluated over the air because the antenna, enclosure, transceiver and beamforming algorithms behave as one coupled system.

## 8. EMC and compliance measurement

EMC measurements usually separate into:

- conducted emissions;
- radiated emissions;
- conducted immunity;
- radiated immunity;
- ESD / EFT / surge depending on product class;
- coexistence / desense / self-interference investigations.

Instrumentation can include LISNs, current probes, CDN/BCI fixtures, antennas, preamplifiers, spectrum/EMI receivers, RF power amplifiers, field probes and chambers.

A compliance result is not just a spectrum: detector type, bandwidth, distance, antenna factor, cable loss, preamplifier gain and chamber/site validation all matter.

## 9. Electric-field measurement

Possible methods include:

- calibrated dipole/monopole probes;
- isotropic E-field probes;
- electro-optic sensors;
- antenna-factor conversion;
- Rydberg-atom electrometry.

For an antenna-factor method,

$$E=AF\,V
$$

under the calibration convention used. Probe perturbation, polarization, near-field structure and spatial averaging can dominate uncertainty.

## 10. Magnetic-field measurement

- **Hall sensor:** DC to moderate-frequency local field, compact but offset/temperature sensitive.
- **Fluxgate:** precise low-frequency vector field.
- **Search coil:** AC magnetic field; induced voltage scales with $d\Phi/dt$.
- **Optically pumped magnetometer:** atomic Larmor/Zeeman response, potentially extremely sensitive.
- **NMR probe:** accurate field magnitude in suitable ranges/materials.

## 11. Optical readout for atomic systems

A common chain is

$$
\text{atom-field interaction}\rightarrow
\text{optical susceptibility}\rightarrow
\text{transmission / phase / polarization}\rightarrow
\text{photodetector}\rightarrow
\text{TIA}\rightarrow
\text{digitizer}.
$$

Measure and record:

- detector responsivity and transimpedance gain;
- 3-dB bandwidth;
- optical power and saturation margin;
- laser linewidth and frequency reference;
- beam waist and overlap;
- scan linearity;
- RF source calibration and cable loss;
- lock-in/reference phase if demodulating.

## 12. Calibration hierarchy

A strong experiment separates **instrument calibration** from **physical-model calibration**.

Examples:

- VNA calibration moves the electrical reference plane.
- Power-sensor calibration establishes absolute RF power.
- Antenna calibration establishes gain/antenna factor.
- Atomic AT splitting can provide field calibration through a known transition dipole.
- A photodetector transfer function converts current to measured voltage.

## 13. Measurement uncertainty

For independent input quantities $x_i$, first-order uncertainty propagation is

$$
u_y^2\approx\sum_i\left(\frac{\partial y}{\partial x_i}\right)^2u_{x_i}^2.
$$

In practice, distinguish:

- random repeatability;
- calibration uncertainty;
- systematic bias;
- drift;
- model uncertainty;
- spatial variation;
- bandwidth / filtering uncertainty.

## 14. A reusable measurement checklist

<div class="checklist">
<label><input type="checkbox"> What physical quantity is being inferred?</label>
<label><input type="checkbox"> What is the instrument's actual observable?</label>
<label><input type="checkbox"> Where is the calibration/reference plane?</label>
<label><input type="checkbox"> What bandwidth and detector are implied?</label>
<label><input type="checkbox"> Is the instrument linear in this range?</label>
<label><input type="checkbox"> What loading/perturbation does the probe create?</label>
<label><input type="checkbox"> What systematic effects can mimic the signal?</label>
<label><input type="checkbox"> Can the result be cross-checked by a second method?</label>
</div>

## Related pages

[EMI/EMC](../emc/) · [RF & Microwave](../rf-microwave/) · [Antennas](../antennas/) · [Ground-State Magnetometry](../ground-state-magnetometry/) · [Rydberg Semiclassical Optics](../rydberg-semiclassical-effects/) · [Theory ↔ Experiment](../theory-experiment/)
