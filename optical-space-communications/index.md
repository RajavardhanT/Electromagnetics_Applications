---
layout: default
title: Optical Space Communications — Physics and Receivers
description: Free-space optical link budgets, diffraction, photon counting, acquisition/tracking, detectors, coherent communications and turbulence.
---

# Optical Space Communications — Physics and Receivers

<div class="intuition"><span class="callout-title">RF-to-optical shift</span>At shorter wavelength, a given aperture produces a narrower beam and potentially higher directivity. This improves link concentration while tightening pointing, wavefront, receiver-field-of-view and background-light requirements.</div>

## 1. Propagation and aperture coupling

For a circular, uniformly illuminated diffraction-limited aperture of diameter $D$, first-null angular radius is approximately

$$\theta_{\mathrm{null}}\approx1.22\lambda/D.$$

In an ideal Fraunhofer setting, geometrical spreading, transmit/receive apertures and tracking determine received power. Atmospheric turbulence, clouds and aerosols dominate ground-to-space availability for optical links, so a vacuum-only link budget is insufficient.

**Photon count:** at received optical power $P_r$ and wavelength $\lambda$, incident photon rate is

$$\dot N=\frac{P_r\lambda}{hc}.$$

At 1550 nm and $P_r=1$ pW, the rate is about $7.8\times10^6$ photons/s before efficiency and background losses.

## 2. Receiver architecture

**Direct detection:** telescope → optical bandpass filter → PIN/APD/SPAD or other detector → low-noise front end → clock recovery → decoding.

**Coherent detection:** telescope → optical local oscillator and hybrid → balanced photoreceivers → ADC/DSP → carrier/phase recovery → demodulation.

Coherent systems can measure field quadratures but require tight laser-frequency/phase control. Photon-counting systems may offer good low-flux performance yet suffer dark counts, afterpulsing and dead time.

## 3. Pointing, acquisition and tracking (PAT)

An optical beam may be microradian-scale. Design acquisition search, attitude knowledge, fine-steering mirrors, vibration suppression, point-ahead angle and tracking jitter together. Pointing errors reduce the overlap of the transmitted beam with the receiver aperture.

## 4. What to verify

Link availability; mean and fading optical power; detector NEP/dark counts; timing jitter; false acquisition; pointing-control bandwidth; BER or photon efficiency; background radiance; safety and atmospheric link effects. Optical link margin cannot be inferred from diffraction gain alone.

**Advanced exercise:** compare required transmitter diameter and rms pointing error for a laser link at two wavelengths and identical range, holding detector sensitivity and atmosphere assumptions explicit.

## 5. References

- [NASA 2026 — Small Spacecraft Communications](https://www.nasa.gov/smallsat-institute/sst-soa/soa-communications/).
- [JPL DESCANSO book series](https://descanso.jpl.nasa.gov/monograph/mono.html).
- [Optics & Photonics](../optics-photonics/) · [Radiometry](../radiometry-calibration/) · [Artemis Communications](../artemis-communications/).
