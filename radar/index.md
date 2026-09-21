---
layout: default
title: Radar & Remote Sensing
description: Radar equation, range, Doppler, FMCW, pulsed radar, RCS, phased arrays, SAR, measurements and practical limitations.
---

# Radar & Remote Sensing

<div class="intuition"><span class="callout-title">30-second intuition</span>Radar converts electromagnetic propagation delay, Doppler shift, angle-dependent antenna response and target scattering into estimates of range, velocity, direction and target properties.</div>

## 1. Range from time delay

For a round trip,

$$R=\frac{c\Delta t}{2}.
$$

The factor of two is fundamental: the wave travels to the target and back.

## 2. Monostatic radar equation

A common ideal form is

$$P_r=\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3R^4L},
$$

where $\sigma$ is radar cross section and $L$ collects system losses.

The $R^{-4}$ dependence comes from spherical spreading on both outbound and return paths.

## 3. Radar cross section

RCS is an electromagnetic scattering property rather than a simple physical area:

$$\sigma=\lim_{r\to\infty}4\pi r^2\frac{|E_s|^2}{|E_i|^2}.
$$

It depends on frequency, angle, polarization, geometry and material.

## 4. Range resolution

For bandwidth $B$,

$$\Delta R\approx\frac{c}{2B}.
$$

<div class="misconception"><span class="callout-title">Common misconception</span>Higher carrier frequency does not by itself give finer range resolution. Waveform bandwidth sets the ideal range resolution.</div>

## 5. Doppler velocity

For a monostatic radar,

$$f_D=\frac{2v_r}{\lambda}.
$$

Higher carrier frequency gives larger Doppler shift for the same velocity.

## 6. Pulsed radar

Transmit a pulse, receive after a delay, and map time to range. Pulse width, pulse compression, PRF and coherent processing determine range resolution, unambiguous range, velocity ambiguity and SNR.

## 7. FMCW radar

For a linear chirp with slope $S=df/dt$, a stationary target produces approximately

$$f_b\approx\frac{2SR}{c},
$$

so

$$R\approx\frac{cf_b}{2S}.
$$

Moving targets add Doppler, which is separated using multiple chirps and 2-D range-Doppler processing.

## 8. Angle estimation and arrays

A phased array extracts angle from relative phase/amplitude across elements. Digital beamforming and MIMO radar can create virtual apertures. Array calibration is critical because phase/gain errors look like angle errors or sidelobes.

See [AESA](../aesa/).

## 9. Synthetic aperture radar

SAR synthesizes a large aperture from platform motion. Coherent processing combines observations from multiple positions to achieve cross-range resolution much finer than the instantaneous physical antenna beam alone would suggest.

## 10. Radar families

| Type | Strength | Typical application |
|---|---|---|
| Pulsed | long range, flexible waveform | surveillance, weather |
| FMCW | compact, excellent short-range resolution | automotive, industrial |
| CW Doppler | velocity sensing | motion sensors, speed measurement |
| Phased-array | agile beam steering | defense, weather, multifunction |
| SAR | high-resolution imaging | Earth observation, mapping |
| Passive radar | no dedicated transmitter | sensing using illuminators of opportunity |

## Worked example — 77 GHz velocity and 1 GHz range bandwidth

At 77 GHz, $\lambda\approx3.89$ mm. A target at 30 m/s gives

$$f_D\approx15.4\ \text{kHz}.
$$

A 1 GHz chirp bandwidth gives

$$\Delta R\approx0.15\ \text{m}.
$$

The two numbers come from different physical observables: Doppler phase evolution and waveform delay resolution.

## 11. Noise and detection

Receiver noise floor scales with $kTB$. Detection performance depends on integration/coherent processing, false-alarm requirement, clutter statistics, target fluctuation model and implementation loss—not only raw received power.

## 12. How radar is measured

- VNA/full-wave methods for antenna and RCS characterization;
- channel/target simulators for controlled range-Doppler targets;
- spectrum/VSA for chirp linearity and modulation quality;
- oscilloscope for pulse timing and transient behavior;
- chamber/OTA tests for array patterns and angle accuracy.

## 13. Engineering reality

<div class="engineering"><span class="callout-title">Real radar</span>Phase noise, chirp nonlinearity, leakage, TX-RX coupling, ADC dynamic range, multipath, clutter, calibration drift, antenna radome effects and mutual interference can dominate over the ideal equations.</div>

## References

- M. I. Skolnik, *Introduction to Radar Systems*.
- M. A. Richards, *Fundamentals of Radar Signal Processing*.
- MIT Lincoln Laboratory, [Introduction to Radar Systems](https://ocw.mit.edu/courses/res-ll-001-introduction-to-radar-systems-spring-2007/).

Related: [AESA](../aesa/) · [Antennas](../antennas/) · [Wireless](../wireless/) · [Measurements](../measurements/)
