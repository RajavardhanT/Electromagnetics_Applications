---
layout: default
title: Orders of Magnitude in Electromagnetics
description: A practical scale reference for electromagnetic frequency, wavelength, time, fields, power, noise, skin depth, magnetic fields, and atomic sensing.
---

# Orders of Magnitude in Electromagnetics

<div class="intuition"><span class="callout-title">Why this page matters</span>Many mistakes are detectable before calculation. If you know roughly what a wavelength, noise floor, magnetic field, skin depth or RF period should be, a unit error becomes obvious immediately.</div>

## Frequency, period and wavelength

In free space,

$$
\lambda=\frac{c}{f},\qquad T=\frac1f.
$$

| Frequency | Period | Free-space wavelength | Mental picture |
|---:|---:|---:|---|
| 1 Hz | 1 s | $3\times10^8$ m | planetary scale |
| 1 kHz | 1 ms | 300 km | low-frequency fields |
| 1 MHz | 1 μs | 300 m | AM/HF/VHF transition scale |
| 10 MHz | 100 ns | 30 m | HF |
| 100 MHz | 10 ns | 3 m | VHF |
| 1 GHz | 1 ns | 30 cm | microwave / wireless |
| 10 GHz | 100 ps | 3 cm | radar / microwave |
| 100 GHz | 10 ps | 3 mm | mmWave |
| 1 THz | 1 ps | 300 μm | THz |
| 100 THz | 10 fs | 3 μm | infrared |
| 500 THz | 2 fs | 600 nm | visible-light scale |

A very useful RF rule is

$$
\boxed{\lambda(\mathrm{cm})\approx\frac{30}{f(\mathrm{GHz})}}.
$$

## Electrical size

Physical size by itself is not enough. What matters is

$$
\frac{L}{\lambda}\quad\text{or}\quad ka=\frac{2\pi a}{\lambda}.
$$

- $L\ll\lambda$: lumped/quasistatic intuition often works.
- $L\sim\lambda$: phase variation, standing waves and radiation matter.
- $L\gg\lambda$: the object is electrically large; asymptotic or large full-wave methods may be needed.

<div class="example-box"><span class="callout-title">Example</span>A 10-cm cable is electrically tiny at 1 MHz ($\lambda\approx300$ m), but one third of a wavelength at 1 GHz ($\lambda\approx30$ cm). The same physical wire changes from a lumped interconnect into a distributed electromagnetic structure.</div>

## RF power and dBm intuition

| Power | dBm |
|---:|---:|
| 1 W | +30 dBm |
| 100 mW | +20 dBm |
| 10 mW | +10 dBm |
| 1 mW | 0 dBm |
| 100 μW | −10 dBm |
| 1 μW | −30 dBm |
| 1 nW | −60 dBm |
| 1 pW | −90 dBm |
| 1 fW | −120 dBm |

Remember:

$$
+3\ \mathrm{dB}\approx2\times\text{ power},\qquad +10\ \mathrm{dB}=10\times\text{ power}.
$$

A negative dBm value means **less than 1 mW**, not negative physical power.

## Thermal-noise scale

Near room temperature,

$$
N_0\approx-174\ \mathrm{dBm/Hz}.
$$

Ignoring noise figure for the moment:

| Bandwidth | Thermal noise near 290 K |
|---:|---:|
| 1 Hz | −174 dBm |
| 1 kHz | −144 dBm |
| 100 kHz | −124 dBm |
| 1 MHz | −114 dBm |
| 10 MHz | −104 dBm |
| 100 MHz | −94 dBm |

Each factor of 10 in bandwidth raises integrated noise by 10 dB.

<div class="engineering"><span class="callout-title">Engineering reality</span>The actual receiver floor also includes noise figure, loss before the LNA, gain distribution, phase noise, spurs, ADC quantization and environmental interference.</div>

## Magnetic-field scales

| Field | Approximate scale | Context |
|---|---:|---|
| femtotesla | $10^{-15}$ T | ultimate atomic/biomagnetic sensing scales |
| picotesla | $10^{-12}$ T | biomagnetism and precision laboratory signals |
| nanotesla | $10^{-9}$ T | small anomalies / precision field changes |
| microtesla | $10^{-6}$ T | geomagnetic-scale quantities |
| Earth's field | roughly $25$–$65\,\mu$T | location dependent |
| millitesla | $10^{-3}$ T | laboratory bias magnets, permanent magnets at distance |
| tesla | 1 T | strong laboratory magnets |
| clinical MRI | commonly 1.5–3 T | main $B_0$ field |
| high-field MRI/research | 7 T and above | specialized systems |

For ground-state atomic magnetometry the meaningful scale is often not only $B$, but $\gamma B$ relative to linewidth and relaxation rates.

## Electric-field scales

Electric field spans an enormous range. A useful relation for an ideal free-space plane wave is

$$
\langle S\rangle=\frac{E_{\rm rms}^2}{\eta_0}.
$$

Therefore

$$
E_{\rm rms}=\sqrt{\eta_0\langle S\rangle}.
$$

For example, a plane-wave power density of $1\ \mathrm{W/m^2}$ corresponds to approximately $19.4\ \mathrm{V/m}$ rms.

<div class="assumption-box"><span class="callout-title">Assumption</span>This relation is a far-field plane-wave relation. It must not be applied blindly in reactive near fields, waveguides, resonators or strongly inhomogeneous structures.</div>

## Copper skin depth

For a good conductor,

$$
\delta=\sqrt{\frac{1}{\pi f\mu\sigma}}.
$$

For copper with $\sigma\approx5.8\times10^7\ \mathrm{S/m}$ and $\mu_r\approx1$:

| Frequency | Skin depth |
|---:|---:|
| 60 Hz | ≈ 8.5 mm |
| 1 MHz | ≈ 66 μm |
| 1 GHz | ≈ 2.1 μm |
| 10 GHz | ≈ 0.66 μm |

The $1/\sqrt f$ dependence is more important than memorizing any one value.

## Time scales in RF and atomic experiments

| Time | Corresponding inverse frequency | Typical interpretation |
|---:|---:|---|
| 1 s | 1 Hz | slow drift / field changes |
| 1 ms | 1 kHz | modulation / slow control |
| 1 μs | 1 MHz | atomic/RF transients |
| 1 ns | 1 GHz | microwave cycle |
| 1 ps | 1 THz | ultrafast / THz cycle |
| 1 fs | 1 PHz | optical-cycle scale |

A system cannot follow modulation much faster than the inverse of its relevant response time or bandwidth.

## Antenna size and far field

For maximum antenna dimension $D$,

$$
R_{FF}\gtrsim\frac{2D^2}{\lambda}
$$

is a common far-field criterion.

This can be surprisingly large for electrically large apertures. A large phased array can require a far-field range much longer than “a few wavelengths.”

## Atomic and Rydberg scales

Useful mental hierarchy:

- ground-state atomic dimensions: ångström scale;
- highly excited Rydberg electronic radius: grows approximately as $n^2$;
- optical transition frequencies: hundreds of THz;
- microwave Rydberg transitions: often MHz–100s of GHz depending on states;
- EIT/atomic-resonance linewidths: experiment dependent, often kHz–MHz scales;
- detector/readout bandwidth can be far smaller than optical frequency because only the envelope or beat signal is measured.

<div class="misconception"><span class="callout-title">Common misconception</span>A 500-THz optical carrier does not require a 500-THz photodetector to measure slowly varying optical transmission. The detector follows the intensity envelope or heterodyne beat within its electrical bandwidth.</div>

## Build your own scale estimate

Before a detailed calculation, write three lines:

1. **Characteristic length** $L$ and wavelength $\lambda$.
2. **Characteristic time** $\tau$ and inverse frequency $1/\tau$.
3. **Characteristic field/power** and the expected detector/noise scale.

Then ask whether your exact answer is consistent with all three.

See also: [Scaling Laws](scaling-laws.html) · [Interactive Calculators](../calculators/) · [Worked Examples](../worked-examples/)
