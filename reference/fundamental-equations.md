---
layout: default
title: Fundamental Equations & Relations
---

# Fundamental Equations & Relations

A compact daily-reference sheet connecting electromagnetic fields, waves, RF/microwave engineering, antennas, radar, wireless links, and atom–field interactions.

> **Convention:** Time-harmonic quantities use $e^{j\omega t}$ unless otherwise noted. Symbols can vary between disciplines, so check the assumptions accompanying each relation.

## 1. Essential constants

| Quantity | Symbol | Approximate value |
|---|---:|---:|
| Speed of light | $c$ | $2.99792458\times10^8\ \mathrm{m/s}$ |
| Vacuum permittivity | $\epsilon_0$ | $8.8541878\times10^{-12}\ \mathrm{F/m}$ |
| Vacuum permeability | $\mu_0$ | $1.2566371\times10^{-6}\ \mathrm{H/m}$ |
| Free-space impedance | $\eta_0$ | $\approx 376.73\ \Omega$ |
| Planck constant | $h$ | $6.62607015\times10^{-34}\ \mathrm{J\,s}$ |
| Reduced Planck constant | $\hbar$ | $h/(2\pi)$ |
| Elementary charge | $e$ | $1.602176634\times10^{-19}\ \mathrm{C}$ |
| Boltzmann constant | $k_B$ | $1.380649\times10^{-23}\ \mathrm{J/K}$ |

Useful identities:

$$c=\frac{1}{\sqrt{\mu_0\epsilon_0}},\qquad \eta_0=\sqrt{\frac{\mu_0}{\epsilon_0}}.$$

---

## 2. Maxwell's equations

### Differential form

$$\nabla\cdot\mathbf D=\rho_v$$

$$\nabla\cdot\mathbf B=0$$

$$\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t}$$

$$\nabla\times\mathbf H=\mathbf J+\frac{\partial\mathbf D}{\partial t}$$

### Constitutive relations

For a linear, isotropic medium,

$$\mathbf D=\epsilon\mathbf E,\qquad \mathbf B=\mu\mathbf H,\qquad \mathbf J=\sigma\mathbf E.$$

---

## 3. Electromagnetic waves

For a homogeneous source-free medium,

$$\nabla^2\mathbf E-\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2}=0$$

and similarly for $\mathbf H$.

### Frequency, wavelength, and propagation

$$f=\frac{\omega}{2\pi},\qquad \lambda=\frac{v_p}{f}$$

For a lossless medium,

$$v_p=\frac{1}{\sqrt{\mu\epsilon}}.$$

In free space,

$$\lambda_0=\frac{c}{f}.$$

### Propagation constant

$$\gamma=\alpha+j\beta$$

with field variation

$$E(z)=E_0e^{-\gamma z}=E_0e^{-\alpha z}e^{-j\beta z}.$$

For a lossless medium,

$$\beta=\omega\sqrt{\mu\epsilon}=\frac{2\pi}{\lambda}.$$

### Intrinsic impedance

General lossy medium:

$$\eta=\sqrt{\frac{j\omega\mu}{\sigma+j\omega\epsilon}}.$$

Lossless medium:

$$\eta=\sqrt{\frac{\mu}{\epsilon}}.$$

---

## 4. Electromagnetic power

### Instantaneous Poynting vector

$$\mathbf S=\mathbf E\times\mathbf H.$$

### Time-average Poynting vector

For phasor fields,

$$\langle\mathbf S\rangle=\frac{1}{2}\operatorname{Re}\left\{\mathbf E\times\mathbf H^*\right\}.$$

For a uniform lossless plane wave,

$$\langle S\rangle=\frac{|E|^2}{2\eta}=\frac{\eta|H|^2}{2}$$

when $E$ and $H$ are peak phasor amplitudes.

---

## 5. Reflection and standing waves

At normal incidence between media with intrinsic impedances $\eta_1$ and $\eta_2$,

$$\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1}.$$

For a transmission line,

$$\Gamma_L=\frac{Z_L-Z_0}{Z_L+Z_0}.$$

### VSWR

$$\mathrm{VSWR}=\frac{1+|\Gamma|}{1-|\Gamma|}.$$

### Return loss

$$RL=-20\log_{10}|\Gamma|\quad\mathrm{dB}.$$

### Mismatch loss

$$ML=-10\log_{10}(1-|\Gamma|^2)\quad\mathrm{dB}.$$

---

## 6. Transmission lines

### Characteristic impedance

$$Z_0=\sqrt{\frac{R+j\omega L}{G+j\omega C}}.$$

For a lossless line,

$$Z_0=\sqrt{\frac{L}{C}}.$$

### Propagation constant

$$\gamma=\sqrt{(R+j\omega L)(G+j\omega C)}.$$

### Input impedance of a lossless line

$$Z_{in}=Z_0\frac{Z_L+jZ_0\tan(\beta l)}{Z_0+jZ_L\tan(\beta l)}.$$

### Quarter-wave transformer

For a matching section of length $\lambda/4$,

$$Z_t=\sqrt{Z_0Z_L}.$$

---

## 7. S-parameters

For a two-port network,

$$\begin{bmatrix}b_1\\b_2\end{bmatrix}=
\begin{bmatrix}S_{11}&S_{12}\\S_{21}&S_{22}\end{bmatrix}
\begin{bmatrix}a_1\\a_2\end{bmatrix}.$$

Common interpretations:

$$S_{11}:\ \text{input reflection},\qquad S_{21}:\ \text{forward transmission}.$$

Insertion loss for a passive device is commonly expressed as

$$IL=-20\log_{10}|S_{21}|\quad\mathrm{dB}.$$

---

## 8. Conductors and skin depth

For a good conductor,

$$\delta=\sqrt{\frac{2}{\omega\mu\sigma}}=\frac{1}{\sqrt{\pi f\mu\sigma}}.$$

The surface resistance is approximately

$$R_s=\sqrt{\frac{\pi f\mu}{\sigma}}.$$

Increasing frequency therefore confines current progressively closer to the conductor surface.

---

## 9. Antennas

### Radiation intensity

$$U(\theta,\phi)=r^2S_r.$$

### Directivity

$$D(\theta,\phi)=\frac{4\pi U(\theta,\phi)}{P_{rad}}.$$

Maximum directivity:

$$D_0=\frac{4\pi U_{max}}{P_{rad}}.$$

### Gain

$$G=\eta_{rad}D$$

where $\eta_{rad}$ is radiation efficiency.

### Effective aperture

$$A_e=\frac{G\lambda^2}{4\pi}.$$

### Far-field distance

A commonly used criterion for an antenna with maximum dimension $D$ is

$$R_{FF}\gtrsim\frac{2D^2}{\lambda}.$$

---

## 10. Free-space wireless link

### Friis transmission equation

$$P_r=P_tG_tG_r\left(\frac{\lambda}{4\pi R}\right)^2.$$

In logarithmic form,

$$P_r(\mathrm{dBm})=P_t(\mathrm{dBm})+G_t(\mathrm{dBi})+G_r(\mathrm{dBi})-FSPL(\mathrm{dB}).$$

### Free-space path loss

$$FSPL=20\log_{10}\left(\frac{4\pi R}{\lambda}\right).$$

A convenient form is

$$FSPL(\mathrm{dB})\approx32.44+20\log_{10}f_{\mathrm{MHz}}+20\log_{10}R_{\mathrm{km}}.$$

---

## 11. Radar

### Monostatic radar equation

$$P_r=\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3R^4L}$$

where $\sigma$ is radar cross section and $L$ represents system losses.

### Range from time delay

$$R=\frac{c\Delta t}{2}.$$

### Doppler shift

For a monostatic radar with radial target velocity $v_r$,

$$f_D=\frac{2v_r}{\lambda}.$$

### FMCW range

For an ideal linear chirp with slope $S=df/dt$,

$$R=\frac{cf_b}{2S}$$

for a stationary target when range and Doppler contributions are appropriately separated.

### Range resolution

$$\Delta R\approx\frac{c}{2B}.$$

---

## 12. Noise and RF receivers

### Thermal noise power

$$P_n=k_BT B.$$

At approximately $290\ \mathrm K$,

$$N_0\approx-174\ \mathrm{dBm/Hz}.$$

### Receiver noise floor

$$P_n(\mathrm{dBm})\approx-174+10\log_{10}(B_{\mathrm{Hz}})+NF.$$

### Noise figure

$$F=\frac{SNR_{in}}{SNR_{out}},\qquad NF=10\log_{10}F.$$

### Friis noise-factor equation

$$F_{total}=F_1+\frac{F_2-1}{G_1}+\frac{F_3-1}{G_1G_2}+\cdots$$

where gains are linear power gains.

---

## 13. Resonance and quality factor

### Resonant frequency of an ideal LC resonator

$$f_0=\frac{1}{2\pi\sqrt{LC}}.$$

### Quality factor

$$Q=2\pi\frac{\text{energy stored}}{\text{energy lost per cycle}}.$$

For a simple resonance,

$$Q\approx\frac{f_0}{\Delta f_{3\mathrm{dB}}}.$$

---

## 14. Optics and photonics

### Refractive index

$$n=\frac{c}{v_p}.$$

### Snell's law

$$n_1\sin\theta_1=n_2\sin\theta_2.$$

### Photon energy

$$E=h f=\frac{hc}{\lambda}.$$

### Gaussian-beam Rayleigh range

$$z_R=\frac{\pi w_0^2}{\lambda}.$$

### Gaussian-beam radius

$$w(z)=w_0\sqrt{1+\left(\frac{z}{z_R}\right)^2}.$$

---

## 15. Atom–field interaction and quantum sensing

### Electric-dipole interaction Hamiltonian

$$H_{int}=-\mathbf d\cdot\mathbf E.$$

### Rabi frequency

$$\Omega=\frac{\mathbf d_{eg}\cdot\mathbf E}{\hbar}.$$

The angular dependence enters through the vector dipole matrix element and field polarization.

### Resonant Autler–Townes splitting

For an ideal resonantly driven two-level coupling,

$$\Delta f_{AT}=\frac{\Omega}{2\pi}.$$

Thus, when the relevant dipole matrix element is known,

$$E=\frac{2\pi\hbar\Delta f_{AT}}{|d_{eg}|}$$

for the appropriately projected transition dipole.

### AC Stark shift: far-detuned two-level approximation

For detuning $\Delta$ expressed as angular frequency and $|\Delta|\gg|\Omega|$,

$$\delta\omega_{AC}\approx\frac{|\Omega|^2}{4\Delta}.$$

### Static quadratic Stark shift

$$\Delta E=-\frac{1}{2}\alpha E^2$$

with polarizability $\alpha$ under the chosen convention.

### Transition frequency

$$\omega_{eg}=\frac{E_e-E_g}{\hbar},\qquad f_{eg}=\frac{E_e-E_g}{h}.$$

### Beat frequency / heterodyne difference frequency

$$f_{IF}=|f_{LO}-f_{S}|.$$

---

## 16. VLBI and geodetic electromagnetics

For a baseline vector $\mathbf B$ observing a distant radio source in direction $\hat{\mathbf s}$, the leading geometric delay is

$$\tau_g\approx\frac{\mathbf B\cdot\hat{\mathbf s}}{c},$$

up to the sign convention used for the baseline/source vectors.

Precise measurements of these delays across global radio-telescope networks support geodesy and determination of Earth-orientation parameters, including polar motion.

See: [Chandler Wobble measured with VLBI](../earth-space/chandler-wobble-vlbi.md).

---

## 17. Decibels: everyday conversions

### Power ratio

$$L_{dB}=10\log_{10}\left(\frac{P_2}{P_1}\right).$$

### Voltage or field ratio at equal impedance

$$L_{dB}=20\log_{10}\left|\frac{V_2}{V_1}\right|.$$

### dBm

$$P(\mathrm{dBm})=10\log_{10}\left(\frac{P}{1\ \mathrm{mW}}\right).$$

Useful values:

| Ratio | Power change |
|---:|---:|
| $2\times$ power | $+3.01$ dB |
| $10\times$ power | $+10$ dB |
| $1/2$ power | $-3.01$ dB |
| $1/10$ power | $-10$ dB |

---

## 18. Quick frequency–wavelength intuition

Using $\lambda_0=c/f$:

| Frequency | Free-space wavelength |
|---:|---:|
| 1 MHz | $\approx300$ m |
| 10 MHz | $\approx30$ m |
| 100 MHz | $\approx3$ m |
| 1 GHz | $\approx30$ cm |
| 10 GHz | $\approx3$ cm |
| 100 GHz | $\approx3$ mm |
| 1 THz | $\approx300\ \mu$m |

A particularly useful mental rule is

$$\boxed{\lambda_0(\mathrm{cm})\approx\frac{30}{f(\mathrm{GHz})}}.$$

---

## 19. Equation map

**Maxwell → wave equation → propagation constant / impedance → reflection & transmission → guided waves → antennas → wireless/radar → interaction with matter → optical & quantum sensing**

This page is intended to evolve as the main equation sheet for the entire collection. More specialized equations should live on their application pages, with the most frequently reused relations promoted here.

[← Daily Reference Home](../)
