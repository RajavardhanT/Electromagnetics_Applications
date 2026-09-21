---
layout: default
title: Worked Electromagnetics Examples
description: Short numerical examples that turn common electromagnetic equations into engineering intuition.
---

# Worked Examples

These examples are intentionally compact. Each one shows the **equation → substitution → number → interpretation** pattern.

## 1. Wavelength at 5.8 GHz

$$\lambda=\frac{c}{f}=\frac{2.998\times10^8}{5.8\times10^9}\approx5.17\ \text{cm}.$$

A quarter-wave is about $1.29$ cm. This immediately sets the physical scale of antennas, PCB features and chamber objects that are electrically significant.

## 2. Free-space path loss at 5.8 GHz over 10 m

$$FSPL=20\log_{10}\left(\frac{4\pi R}{\lambda}\right).$$

With $R=10$ m and $\lambda=0.0517$ m,

$$FSPL\approx67.7\ \text{dB}.$$

If $P_t=10$ dBm and both antennas have $10$ dBi gain, ideal Friis gives about

$$P_r\approx10+10+10-67.7=-37.7\ \text{dBm}.$$

## 3. Thermal noise in 1 MHz bandwidth

At room temperature,

$$P_n\approx-174+10\log_{10}(10^6)=-114\ \text{dBm}.$$

With a 5 dB receiver noise figure,

$$P_{n,receiver}\approx-109\ \text{dBm}.$$

This is why bandwidth is a first-class sensitivity parameter.

## 4. Copper skin depth at 100 MHz

Using $\sigma\approx5.8\times10^7$ S/m and $\mu_r\approx1$,

$$\delta=\frac{1}{\sqrt{\pi f\mu_0\sigma}}\approx6.6\ \mu\text{m}.$$

At 100 MHz, most current resides within only a few tens of micrometres of a copper surface.

## 5. WR-90 dominant-mode cutoff

For $a=22.86$ mm,

$$f_{c,10}=\frac{c}{2a}\approx6.56\ \text{GHz}.$$

This helps explain why WR-90 is used in X-band rather than far below 6.5 GHz.

## 6. Radar range resolution from 1 GHz bandwidth

$$\Delta R\approx\frac{c}{2B}
=\frac{2.998\times10^8}{2\times10^9}\approx0.15\ \text{m}.$$

Carrier frequency affects antenna size and Doppler scale; waveform bandwidth sets this ideal range resolution.

## 7. 77 GHz automotive-radar Doppler shift at 30 m/s

At 77 GHz,

$$\lambda\approx3.89\ \text{mm}.$$

For a monostatic radar,

$$f_D=\frac{2v}{\lambda}\approx\frac{60}{3.89\times10^{-3}}\approx15.4\ \text{kHz}.$$

## 8. Far-field distance of a 30 cm aperture at 10 GHz

At 10 GHz, $\lambda\approx3$ cm. With $D=0.30$ m,

$$R_{FF}\gtrsim\frac{2D^2}{\lambda}
\approx\frac{2(0.3)^2}{0.03}\approx6\ \text{m}.$$

The correct far-field distance depends on electrical aperture size, not just “a few wavelengths.”

## 9. Ideal Halbach-cylinder field

Suppose $B_r=1.2$ T, $R_i=20$ mm and $R_o=40$ mm. Then

$$B\approx B_r\ln(R_o/R_i)=1.2\ln2\approx0.83\ \text{T}.$$

A practical segmented, finite-length assembly will differ and must be simulated/measured for homogeneity.

## 10. Ground-state atomic Larmor frequency

For an effective gyromagnetic ratio of $3.5$ GHz/T and a $50\ \mu$T field,

$$f_L=(3.5\times10^9)(50\times10^{-6})\approx175\ \text{kHz}.$$

Frequency measurement becomes a magnetic-field measurement once the relevant atomic $\gamma$ is known.

## 11. Electric-dipole Rabi frequency

Take a projected transition dipole $d=1000\,ea_0$ and $E=0.1$ V/m.

$$\Omega=\frac{dE}{\hbar}.$$

Since $ea_0\approx8.48\times10^{-30}$ C·m,

$$\Omega/2\pi\approx1.28\ \text{MHz}.$$

The actual Rabi rate depends on the full angular matrix element and polarization projection.

## 12. Shockley–Ramo current between parallel plates

For plate spacing $d=6$ mm, a single electron moving at $v_x=10^5$ m/s gives the ideal magnitude

$$|i|=\frac{ev_x}{d}
\approx\frac{1.602\times10^{-19}\times10^5}{6\times10^{-3}}
\approx2.7\ \text{pA}.$$

A measured signal from many charges is the sum of their instantaneous $q\mathbf v\cdot\mathbf E_w$ contributions, filtered by the readout electronics.

## 13. MRI proton Larmor frequency at 3 T

For protons, $\gamma/2\pi\approx42.58$ MHz/T, so

$$f_L\approx42.58\times3\approx127.7\ \text{MHz}.$$

This is why a 3-T MRI scanner requires RF hardware in the VHF range.

## 14. Link budget with mismatch and cable loss

Suppose the ideal Friis result is $-37.7$ dBm, but transmitter and receiver cable losses are 1.5 dB each and polarization mismatch contributes 3 dB:

$$P_r\approx-37.7-1.5-1.5-3=-43.7\ \text{dBm}.$$

The “engineering reality” corrections can be comparable to, or larger than, the effect you are trying to measure.

---

Use the [Interactive Calculators](../calculators/) to vary the numbers and the [Measurements](../measurements/) page to see how each quantity is obtained experimentally.
