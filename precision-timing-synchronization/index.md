---
layout: default
title: Precision Timing, Frequency References & Coherent Synchronization
description: Oscillator noise, Allan deviation, time transfer, reference distribution, phase noise, jitter and coherent multichannel RF systems.
---

# Precision Timing, Frequency References & Coherent Synchronization

<div class="intuition"><span class="callout-title">Three different requirements</span>**Frequency coherence** means clocks run at consistent rates. **Time alignment** means sample epochs are known. **Phase coherence** means phase relationships are sufficiently controlled or calibrated. A common 10 MHz cable alone does not guarantee all three.</div>

## 1. Clock error model

Write an oscillator as $v(t)=A\cos[2\pi f_0 t+\phi(t)]$. Instantaneous fractional frequency error is

$$y(t)=\frac{1}{2\pi f_0}\frac{d\phi(t)}{dt}.$$

Two oscillators with relative frequency offset $\Delta f$ accumulate phase difference $\Delta\phi(t)=2\pi\Delta f t$ in the ideal constant-offset approximation. Time deviation and phase deviation must be distinguished when reporting synchronization.

For an ADC sampling a sine wave at input frequency $f_\mathrm{in}$ with uncorrelated rms aperture jitter $\sigma_t$, the jitter-limited SNR approximation is

$$\mathrm{SNR}_\mathrm{jitter}\approx-20\log_{10}(2\pi f_\mathrm{in}\sigma_t).$$

## 2. Allan deviation and phase-noise spectra

Allan deviation characterizes fractional-frequency stability versus averaging time $\tau$. It does not by itself quantify absolute timing offset or guarantee low phase noise at every Fourier offset. For RF measurements, state the oscillator reference, offset-frequency phase-noise spectrum, measurement bandwidth and integration limits.

## 3. Instrument synchronization architecture

| Layer | Purpose | Possible implementation |
|---|---|---|
| Frequency reference | Common long-term rate | 10 MHz or other distributed frequency standard |
| Epoch reference | Common time origin | PPS, trigger, hardware timestamp |
| Sampling clock | ADC/DAC timing | Shared or deterministically aligned clock |
| RF LO phase | Relative RF carrier phase | Shared LO, deterministic synchronization, calibration |
| Delay calibration | Remove channel skew | Known tone/chirp and phase-versus-frequency fit |

For an array receiving $x_k(t)=a_ke^{j(\omega t+\phi_k)}$, unknown interchannel $\phi_k$ biases the beam steering or direction-of-arrival result. Relative phase calibration must be checked after reconnects and clock resynchronization.

**Worked check:** a 1 ppb relative offset at 1 GHz corresponds to 1 Hz frequency error, accumulating $2\pi$ rad phase in 1 s if uncompensated.

**Hands-on exercise:** use [coherent_timing_demo.py](../simulations/python/coherent_timing_demo.py) to compare frequency drift, static phase offset and fixed sample delay.

## 4. References

- [JPL DESCANSO — Deep Space Communications and Navigation](https://descanso.jpl.nasa.gov/monograph/mono.html).
- [NASA Deep Space Network](https://science.nasa.gov/learn/basics-of-space-flight/chapter18-1/).
- [Laser Systems & Allan Deviation](../laser-systems/allan-deviation.html) · [SDR](../sdr/) · [AESA](../aesa/).
