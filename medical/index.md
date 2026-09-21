---
layout: default
title: Medical Applications of Electromagnetics
---

# Medical Applications of Electromagnetics

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Mri_scanner_schematic_labelled.svg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Mri_scanner_schematic_labelled.svg?width=1200" alt="MRI scanner cross-section showing the superconducting main magnet, gradient coils and RF transmit/receive structures." loading="lazy"></a>
  <figcaption>MRI scanner cross-section showing the superconducting main magnet, gradient coils and RF transmit/receive structures. <a href="https://commons.wikimedia.org/wiki/File:Mri_scanner_schematic_labelled.svg">Image source</a>.</figcaption>
</figure>


Electromagnetic fields interact with biological tissue through **magnetic moments, induced electric fields, dielectric polarization, conduction currents, and energy absorption**. These interactions make electromagnetics central to modern medical imaging, diagnosis, therapy, physiological sensing, implants, and safety engineering.

A useful organizing chain is

**electromagnetic field → interaction with tissue → measurable response or deposited energy → imaging / sensing / therapy**.

This page is a compact engineering reference. It describes the electromagnetic physics of medical technologies; it is not medical advice.

---

## 1. Electromagnetic properties of biological tissue

At RF and microwave frequencies, tissue is generally modeled as a **lossy dielectric**. Its response depends strongly on frequency and tissue composition, particularly water and ionic content.

The constitutive relations are

$$
\mathbf D=\epsilon\mathbf E,\qquad
\mathbf B=\mu\mathbf H,\qquad
\mathbf J=\sigma\mathbf E.
$$

A convenient complex permittivity is

$$
\epsilon_c=\epsilon'-j\epsilon''
$$

or, when conductive loss is written explicitly,

$$
\epsilon_{eff}=\epsilon-j\frac{\sigma}{\omega}.
$$

The propagation constant in a homogeneous lossy tissue is

$$
\gamma=\alpha+j\beta
=\sqrt{j\omega\mu(\sigma+j\omega\epsilon)}.
$$

Thus tissue type and frequency determine **attenuation, wavelength, penetration depth, reflection, phase delay, and absorbed power**. These dielectric contrasts are precisely what microwave sensing and imaging systems attempt to exploit.

---

## 2. Magnetic Resonance Imaging (MRI)

MRI is one of the clearest examples of electromagnetics spanning several frequency regimes in one instrument. It combines a strong static magnetic field, switched magnetic-field gradients, and RF excitation/reception. The FDA notes that MRI forms images using strong magnetic fields and radiofrequency energy, with much of the MR signal originating from protons in water and fat.

### Static magnetic field

A static field $B_0$ establishes a preferred direction for nuclear magnetic moments. For proton MRI, the Larmor angular frequency is

$$
\omega_0=\gamma_p B_0,
$$

or

$$
f_0=\frac{\gamma_p}{2\pi}B_0.
$$

For hydrogen,

$$
\frac{\gamma_p}{2\pi}\approx42.58\ \mathrm{MHz/T}.
$$

Therefore, approximately,

| $B_0$ | Proton Larmor frequency |
|---:|---:|
| 1.5 T | 63.9 MHz |
| 3 T | 127.7 MHz |
| 7 T | 298.0 MHz |

### RF excitation

An RF magnetic field $B_1$ transverse to $B_0$ drives nuclear-spin transitions near the Larmor frequency. The RF pulse controls the rotation of the net magnetization. In an idealized description, the flip angle is

$$
\theta=\gamma_p\int B_1(t)\,dt.
$$

### Gradient fields and spatial encoding

Magnetic-field gradients deliberately make the Larmor frequency position dependent. A simple one-dimensional representation is

$$
\omega(z)=\gamma_p(B_0+G_z z).
$$

This converts spatial position into frequency and phase information, allowing image reconstruction.

### RF receive process

Precessing transverse magnetization produces a changing magnetic flux through the receive coil and induces a voltage according to Faraday's law,

$$
V_{ind}=-\frac{d\Phi_B}{dt}.
$$

MRI is therefore an elegant chain:

**static magnetism → nuclear precession → RF excitation → gradient encoding → electromagnetic induction → image reconstruction**.

### MRI safety from an EM perspective

The FDA identifies distinct concerns associated with the static magnetic field, time-varying gradient fields, and RF energy. RF fields can cause tissue heating, while changing gradient fields can produce peripheral nerve stimulation; conductive implants and cables can also alter local fields and heating.

**References:** [FDA — MRI overview](https://www.fda.gov/radiation-emitting-products/medical-imaging/mri-magnetic-resonance-imaging) · [FDA — MRI benefits and risks](https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/benefits-and-risks)

---

## 3. MRI RF coils

RF coils are antennas operating in the strongly coupled electromagnetic environment of the human body. Depending on their function, they transmit $B_1$, receive the weak MR signal, or perform both functions.

Common structures include

- surface loops,
- birdcage coils,
- phased receive arrays,
- transmit arrays,
- loop and dipole elements used especially at high and ultra-high field.

Important RF-engineering quantities include

$$Q,\quad S_{11},\quad S_{21},\quad B_1^+,\quad B_1^-,\quad \text{coil coupling},\quad \text{noise correlation},\quad \text{SAR}.$$

Loading the coil with the body changes its resonance, impedance, quality factor, field distribution, and losses. At higher MRI frequencies, the wavelength in tissue becomes comparable to body dimensions, making wave behavior, interference, and $B_1$ nonuniformity increasingly important.

---

## 4. Specific Absorption Rate (SAR)

SAR measures the rate at which electromagnetic energy is absorbed per unit tissue mass:

$$
\boxed{SAR=\frac{\sigma|E|^2}{\rho}}
$$

when $E$ is an RMS electric-field magnitude. Here

- $\sigma$ is tissue conductivity in S/m,
- $E$ is electric field in V/m,
- $\rho$ is tissue mass density in kg/m$^3$.

The unit is

$$
\mathrm{W/kg}.
$$

SAR is central to MRI RF safety and also to exposure assessment for wireless and RF devices near the body. Local SAR can be substantially different from whole-body average SAR because antennas, tissue interfaces, implants, and geometry create nonuniform electric fields.

The electromagnetic design objective is often therefore not simply to maximize field amplitude, but to optimize a ratio such as

$$
\frac{B_1}{\sqrt{SAR}}
$$

or an equivalent transmit-efficiency metric.

---

## 5. Microwave sensing and imaging

Microwave medical sensing exploits differences in the **complex permittivity and conductivity** of biological tissues. An antenna or array illuminates the body and measures scattered electromagnetic fields.

A simplified measurement concept is

$$
\text{transmitted wave}
\rightarrow
\text{tissue-dependent scattering}
\rightarrow
S_{ij}(f)
\rightarrow
\text{inverse problem / radar processing}
\rightarrow
\text{image or classification}.
$$

Two broad approaches are common:

### Radar-based imaging

Time-of-flight or frequency-domain scattering information is focused spatially. Conceptually, this resembles radar but in a highly heterogeneous, lossy near-field environment.

### Microwave tomography

An inverse electromagnetic problem estimates the spatial distribution of dielectric properties:

$$
\{S_{ij}\}\rightarrow\epsilon(\mathbf r),\sigma(\mathbf r).
$$

This is computationally demanding because the forward problem itself requires Maxwell-equation solutions and the inverse problem is nonlinear and often ill-conditioned.

Research applications include **breast imaging, brain/stroke assessment, glucose-related sensing, knee and musculoskeletal imaging, torso monitoring, and monitoring of thermal therapies**. A 2024 review describes medical near-field microwave systems primarily in roughly the 1–15 GHz region and reviews clinical-development efforts for several of these applications.

**References:** [Vipiana et al., 2024 — review of microwave near-field medical sensing and imaging](https://doi.org/10.3390/s24144515) · [Chandra et al., IEEE TBME 2015 — opportunities and challenges in microwave medical sensing and imaging](https://doi.org/10.1109/TBME.2015.2432137)

---

## 6. RF and microwave ablation

Electromagnetic energy can be deliberately converted into heat to destroy or modify tissue.

### RF ablation

RF ablation commonly uses electrodes to drive alternating current through tissue. Joule heating is related locally to

$$
p_v=\mathbf J\cdot\mathbf E
$$

and, for a conductive medium,

$$
p_v=\sigma|E|^2
$$

for RMS fields.

The tissue temperature is governed not only by deposited electromagnetic power but also by thermal conduction, blood perfusion, and tissue properties.

### Microwave ablation

Microwave ablation uses an applicator/antenna to establish microwave fields in tissue. Energy deposition arises from dielectric and conductive losses. Compared with a simple lumped-current picture, microwave treatment requires attention to antenna radiation in lossy media, near-field distributions, impedance matching, wavelength in tissue, and dielectric-property changes with temperature.

The engineering chain is

**RF/microwave source → matching/feed network → electrode or antenna → tissue EM field → power deposition → heat transfer → thermal lesion**.

---

## 7. Hyperthermia

Hyperthermia intentionally raises tissue temperature using externally or internally delivered energy. RF and microwave systems can use phased antennas or applicators to concentrate electromagnetic energy in a target region.

For an array, the local field can be represented schematically as

$$
\mathbf E(\mathbf r)=\sum_{n=1}^{N}a_n\mathbf E_n(\mathbf r)e^{j\phi_n}.
$$

Changing amplitudes $a_n$ and phases $\phi_n$ changes constructive and destructive interference inside the body. Hyperthermia therefore connects directly to concepts familiar from phased arrays and beamforming—but in an inhomogeneous, dispersive, lossy medium rather than free space.

Major engineering challenges include target focusing, patient-specific dielectric properties, hot spots, motion, temperature monitoring, and coupling between array elements.

---

## 8. Shortwave and microwave diathermy

Diathermy uses high-frequency electromagnetic energy to produce therapeutic heating. The FDA describes RF/high-frequency and microwave forms of medical diathermy; shortwave diathermy has historically used the ISM frequency 27.12 MHz.

From an EM perspective, the applicator can couple energy capacitively, inductively, or radiatively depending on system architecture and frequency. The resulting electric and magnetic fields drive conduction and dielectric losses in tissue.

This is a useful example of a general principle:

$$
\text{field distribution} + \text{tissue properties}
\rightarrow
\text{absorbed power distribution}
\rightarrow
\text{temperature distribution}.
$$

**Reference:** [FDA — Diathermy](https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-guides/diathermy)

---

## 9. Microwave radiometry

Every object at finite temperature emits electromagnetic thermal noise. Microwave radiometry attempts to infer internal or near-surface temperature information from naturally emitted microwave radiation rather than actively transmitting a field.

The underlying connection to receiver engineering is thermal noise:

$$
P_n=k_BT B.
$$

A medical radiometer therefore requires sensitive antennas, low-noise receivers, calibration, knowledge of tissue emissivity, and careful treatment of environmental interference.

This application links **thermodynamics → electromagnetic emission → antenna coupling → low-noise RF receiver → biomedical temperature sensing**.

**Reference:** [Foster & Cheever — Microwave radiometry in biomedicine](https://doi.org/10.1002/bem.2250130611)

---

## 10. Implantable and wearable RF systems

Electromagnetics also enables communication and power transfer to medical devices such as implanted sensors, stimulators, telemetry systems, and wearable physiological monitors.

Key problems include

- antennas operating next to or inside high-permittivity lossy tissue,
- severe propagation loss,
- miniaturization,
- impedance detuning by the body,
- biocompatible packaging,
- SAR and local heating,
- reliability of the wireless link,
- inductive or resonant wireless power transfer.

For inductive links, mutual coupling can be represented using mutual inductance $M$:

$$
V_2=j\omega M I_1.
$$

For radiative links, the simple free-space Friis equation is generally insufficient because the body creates a near-field, heterogeneous propagation environment.

---

## 11. Electromagnetic biosensing

Biological changes can alter electrical or dielectric properties. RF resonators, transmission lines, antennas, and microwave sensors can detect such changes through shifts in resonance, phase, attenuation, or scattering parameters.

For a resonant sensor, one often measures

$$
\Delta f_r,\qquad \Delta Q,\qquad \Delta S_{11},\qquad \Delta S_{21}.
$$

The sensing mechanism may originate from a perturbation in permittivity, conductivity, geometry, or material loading. This connects biomedical sensing directly to cavity perturbation, resonator theory, dielectric spectroscopy, and vector-network-analyzer measurements.

---

## 12. Bioelectromagnetics

**Bioelectromagnetics** studies how electromagnetic fields interact with biological systems across a very broad frequency range.

Different regimes emphasize different physics:

| Regime | Dominant EM considerations | Example medical relevance |
|---|---|---|
| Static magnetic fields | magnetostatics, magnetic moments | MRI $B_0$ |
| Low frequency | induction, stimulation | gradient fields, neural stimulation |
| RF | conduction + dielectric loss | MRI RF, diathermy, implants |
| Microwave | dielectric scattering + absorption | imaging, sensing, ablation, hyperthermia |
| Infrared/optical | molecular/electronic interactions, scattering | optical imaging, spectroscopy, lasers |

The transition between these regimes is continuous; the appropriate model depends on frequency, geometry, material dispersion, and the biological effect being studied.

---

## 13. Computational electromagnetics in medicine

Many medical EM systems cannot be designed accurately with homogeneous analytical models. Real anatomy contains curved interfaces and tissues with strongly varying dielectric properties.

Common numerical methods include

- finite-element method (FEM),
- finite-difference time-domain (FDTD),
- integral-equation methods,
- finite integration techniques,
- coupled electromagnetic–thermal simulation.

Typical simulation outputs include

$$|E|,\quad |H|,\quad B_1^+,\quad SAR,\quad S_{ij},\quad P_{loss},\quad T(\mathbf r,t).$$

For therapy, an electromagnetic solver can be coupled to a bioheat model. A widely used form is the Pennes bioheat equation,

$$
\rho c_p\frac{\partial T}{\partial t}
=\nabla\cdot(k\nabla T)+Q_{EM}+Q_{met}-Q_{perf},
$$

where $Q_{EM}$ represents electromagnetic power deposition.

---

## 14. Medical electromagnetics as an engineering map

| Application | Main EM principle | Typical engineering quantities |
|---|---|---|
| MRI | nuclear magnetic resonance + induction | $B_0$, $B_1$, gradients, $Q$, SAR |
| RF coils | resonant antennas / arrays | $S_{11}$, $S_{21}$, $B_1^+$, coupling |
| Microwave imaging | dielectric scattering | $\epsilon$, $\sigma$, $S_{ij}$, inverse imaging |
| RF ablation | conduction loss | $E$, $J$, deposited power, temperature |
| Microwave ablation | dielectric absorption | field pattern, matching, SAR/power density |
| Hyperthermia | phased EM energy deposition | amplitude, phase, SAR, temperature |
| Diathermy | RF/microwave heating | frequency, field strength, absorbed power |
| Microwave radiometry | thermal EM emission | noise temperature, bandwidth, sensitivity |
| Implants | near-field coupling / propagation | link loss, detuning, SAR, efficiency |
| Biosensors | EM perturbation | $\Delta f$, $Q$, $S_{11}$, $S_{21}$ |

The unifying idea is that **the same Maxwell equations used for antennas, microwave circuits, radar, and wireless systems also govern how fields propagate through, sense, and deposit energy in the human body**.

---

## References and further reading

1. [FDA — Magnetic Resonance Imaging (MRI)](https://www.fda.gov/radiation-emitting-products/medical-imaging/mri-magnetic-resonance-imaging)
2. [FDA — MRI Benefits and Risks](https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/benefits-and-risks)
3. [FDA — Diathermy](https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/inspection-guides/diathermy)
4. [F. Vipiana et al., Review of Microwave Near-Field Sensing and Imaging Devices in Medical Applications, *Sensors* 24, 4515 (2024)](https://doi.org/10.3390/s24144515)
5. [R. Chandra et al., On the Opportunities and Challenges in Microwave Medical Sensing and Imaging, *IEEE Transactions on Biomedical Engineering* 62, 1667–1682 (2015)](https://doi.org/10.1109/TBME.2015.2432137)
6. [K. R. Foster and E. A. Cheever, Microwave Radiometry in Biomedicine: A Reappraisal, *Bioelectromagnetics* 13, 567–579 (1992)](https://doi.org/10.1002/bem.2250130611)

[← Daily Reference Home](../)
