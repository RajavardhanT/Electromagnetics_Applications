---
layout: default
title: Scientific Payload Electronics & Detector Readout
description: Analog front ends, charge-sensitive amplifiers, TIAs, detector noise, ADCs, lock-in readout, cryogenic amplifiers and sensor characterization.
---

# Scientific Payload Electronics & Detector Readout

<div class="intuition"><span class="callout-title">Physics first</span>The physical sensor converts radiation, charge, flux or particle motion to an electrical quantity. The readout determines how faithfully that quantity can be preserved above noise, quantization, drift and interference.</div>

## 1. From sensor to calibrated measurement

**Typical chain:** field/photon/particle → transducer → bias/excitation → low-noise analog front end → antialias filter → ADC → FPGA/processor → calibration → time-tagged science data.

| Source | First readout stage | Main limitation |
|---|---|---|
| Photodiode | TIA | Dark-current and shot noise; amplifier current/voltage noise |
| Semiconductor photon array | Source follower or charge-sensitive node; correlated readout | Reset noise, dark current, read noise and radiation |
| Ionizing particle detector | Charge-sensitive amplifier + pulse shaper | Leakage, detector capacitance, pileup, ballistic deficit |
| Fluxgate sensor | Drive electronics + synchronous demodulator | Offset, magnetic contamination, harmonic artifacts |
| Search coil | Low-noise voltage preamplifier | Low-frequency sensitivity, vibration, winding noise |
| TES/MKID | SQUID or microwave resonator readout | Cryogenic, multiplexing and readout back-action |

## 2. Input-referred noise and bandwidth

For an ideal photodiode with average current $I$, one-sided shot-noise density is

$$i_\mathrm{shot}=\sqrt{2qI}\quad \mathrm{A}/\sqrt{\mathrm{Hz}}.$$

With effective noise bandwidth $B_n$, rms shot noise is $i_\mathrm{shot}\sqrt{B_n}$. An ideal resistive TIA converts signal current into output voltage $v_o\approx-i_sR_f$. In a real TIA, op-amp voltage noise becomes *input-referred current noise through the source and feedback impedances*; feedback resistance contributes thermal noise and total input capacitance affects stability.

For current-mode pulse sensors, a charge-sensitive amplifier with feedback capacitance $C_f$ has approximately

$$\Delta V_o=-\frac{Q}{C_f},$$

provided the charge-collection interval is short relative to the feedback-discharge time and the loop bandwidth is sufficient. Shaping time trades series noise, parallel noise and pulse pileup.

**Keep these distinct:** power spectral density (A²/Hz), amplitude spectral density (A/√Hz), integrated rms noise, equivalent noise charge (ENC), and noise-equivalent power (NEP).

## 3. Digitization and synchronous detection

Choose ADC rate for *occupied analog bandwidth after antialias filtering*, not solely the center frequency. The ideal sinusoidal quantization SNR $6.02N+1.76$ dB assumes a full-scale, ideal $N$-bit converter; ENOB and jitter control the actual result.

A lock-in amplifier multiplies the detected signal by a phase-coherent reference and low-pass filters it. If $v_s=A\cos(\omega t+\phi)$ and $v_r=\cos\omega t$, the low-frequency output approaches $(A/2)\cos\phi$. Two quadrature references recover both field quadratures; reference jitter and drift remain.

## 4. Design and validation workflow

1. Define sensor conversion gain, maximum expected signal, overload transient and permitted error.
2. Build a **noise budget referred to the detector input**: sensor + bias + amplifier + resistor + ADC + interference.
3. Set analog gain and full-scale input so expected peaks do not clip; check common-mode and recovery time.
4. Inject a calibrated electrical or optical stimulus; fit the full transfer function including phase.
5. Record gain, offsets, drift versus temperature, cross-channel isolation and uncertainty.
6. Repeat after radiation/thermal conditions where applicable; validate time tags against the reference clock.

**Worked check:** $I=1\ \mu$A gives $i_\mathrm{shot}\approx0.566$ pA/√Hz. In 10 kHz equivalent noise bandwidth, rms shot noise is approximately 56.6 pA, before any electronics contribution.

## 5. Further reading and connections

- [NASA 2026 — Small Spacecraft Avionics](https://www.nasa.gov/smallsat-institute/sst-soa/small-spacecraft-avionics/).
- H. Spieler, *Semiconductor Detector Systems*; P. Horowitz and W. Hill, *The Art of Electronics*.
- [Data Converters](../data-converters/) · [Measurements & Instruments](../measurements/) · [Cryogenic Detectors](../cryogenic-detectors/) · [Spacecraft Data Systems](../spacecraft-data-systems/).
