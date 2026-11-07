---
layout: default
title: Radiometry, Photometry & Optical Calibration
description: Spectral radiance, Planck radiation, optical étendue, photon budgets, NEP, detector responsivity and NIST-traceable space-instrument calibration.
---

# Radiometry, Photometry & Optical Calibration

<div class="intuition"><span class="callout-title">Core distinction</span>Radiance characterizes a source and viewing direction; irradiance is incident power per area; detector counts are the end of an instrument-dependent chain. These quantities are not interchangeable.</div>

## 1. Definitions and governing physics

Spectral radiance $L_\lambda$ has units W m⁻² sr⁻¹ m⁻¹, and spectral irradiance $E_\lambda$ is W m⁻² m⁻¹. For an ideal Lambertian scene under appropriate geometry, $E_\lambda=\int_\Omega L_\lambda\cos\theta\,d\Omega$.

Planck's blackbody spectral radiance is

$$B_\lambda(T)=\frac{2hc^2}{\lambda^5}\left[\exp\left(\frac{hc}{\lambda k_BT}\right)-1\right]^{-1}.$$

Brightness temperature is the temperature of an ideal blackbody producing the measured spectral radiance at a stated wavelength; it need not equal physical temperature for a non-black surface.

**Optical étendue** is $G=\int n^2\cos\theta\,dA\,d\Omega$. It limits how much radiance a passive optical system can couple and is central to imaging-system throughput.

## 2. Detector response and uncertainty

For incident spectral power $P_\lambda$ and total throughput $T(\lambda)$, photon count expectation in integration time $t$ is

$$N_e=t\int\frac{P_\lambda T(\lambda)\lambda}{hc}\eta(\lambda)\,d\lambda,$$

where $\eta$ is detector quantum efficiency. With shot noise, dark signal $N_d$ and read noise $\sigma_r$ in electrons rms, a simplified SNR is

$$\mathrm{SNR}=\frac{N_e}{\sqrt{N_e+N_d+\sigma_r^2}},$$

assuming independent Poisson photoelectron/dark counts and Gaussian read noise. Add background, spatial nonuniformity and correlated noise for a real camera.

NEP in W/√Hz is the input optical power amplitude spectral density corresponding to unit output SNR per √Hz under a specified convention. Specific detectivity $D^*$ must state detector area and bandwidth conventions; it is not a stand-alone detector ranking across unlike measurement conditions.

## 3. Calibration plan for a flight camera

| Calibration | Question answered |
|---|---|
| Dark and bias frames | How much signal exists without illumination? |
| Flat field | How does pixel response vary spatially? |
| Wavelength/wavenumber calibration | Where is each spectral channel centered? |
| Linearity and saturation | How faithfully do counts track incident flux? |
| Absolute radiometry | How do digital numbers convert to physical radiance? |
| Stray-light/PSF/MTF | How does out-of-field or off-axis illumination contaminate the observation? |
| Thermal/radiation repeat | Does performance drift under mission conditions? |

**Worked estimate:** a 1 pW monochromatic signal at 1 µm corresponds to approximately $5.03\times10^6$ incident photons/s. At 60% quantum efficiency and perfect other throughput, the expected photoelectron rate is $3.02\times10^6$ electrons/s.

**Modeling exercise:** compute blackbody spectral radiance for 250–350 K and integrate through a realistic detector filter curve. Propagate uncertainty in filter transmission and detector responsivity separately.

## 4. Primary references

- [NIST HB 157 — Radiometric Calibration of Electro-Optical Instruments](https://www.nist.gov/publications/guidelines-radiometric-calibration-electro-optical-instruments-remote-sensing).
- [NIST — Pre-launch Characterization Best Practices](https://www.nist.gov/publications/best-practice-guidelines-pre-launch-characterization-and-calibration-instruments).
- [NASA Webb Infrared Detectors](https://science.nasa.gov/mission/webb/infrared-detectors/).
- [Optics & Photonics](../optics-photonics/) · [Spacecraft Scientific Instruments](../spacecraft-scientific-instruments/) · [Inside a Scientific Instrument](../inside-scientific-instruments/).
