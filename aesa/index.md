---
layout: default
title: Active Electronically Scanned Arrays (AESA)
---

# Active Electronically Scanned Arrays (AESA)

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Phased_array_antenna_system.svg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Phased_array_antenna_system.svg?width=1200" alt="Phased-array architecture showing individually phase-controlled antenna elements and electronic beam steering." loading="lazy"></a>
  <figcaption>Phased-array architecture showing individually phase-controlled antenna elements and electronic beam steering. <a href="https://commons.wikimedia.org/wiki/File:Phased_array_antenna_system.svg">Image source</a>.</figcaption>
</figure>


An **active electronically scanned array (AESA)** is a phased-array antenna in which many radiating elements or small subarrays have their own active transmit/receive electronics. By electronically controlling the relative phase and amplitude across the aperture, the array can steer, shape, and adapt its beam without mechanically rotating the antenna.

AESA technology connects **electromagnetics, antennas, microwave/RF integrated circuits, semiconductor power devices, digital signal processing, radar, communications, thermal engineering, calibration, and computational electromagnetics**.

The central idea is

**many coherent radiators + controlled phase/amplitude → programmable electromagnetic aperture**.

---

## 1. From a single antenna to an array

For an array of $N$ elements, the far field can be viewed approximately as

$$
E(\theta,\phi)
=
E_{\rm element}(\theta,\phi)
\,AF(\theta,\phi),
$$

where $E_{\rm element}$ is the individual element pattern and $AF$ is the **array factor**.

For a uniform linear array,

$$
AF(\theta)
=
\sum_{n=0}^{N-1}
a_n e^{jn(kd\sin\theta+\beta)},
$$

where

- $a_n$ is the complex excitation amplitude,
- $d$ is element spacing,
- $k=2\pi/\lambda$,
- $\beta$ is the progressive phase shift.

The main beam occurs approximately where

$$
kd\sin\theta_0+\beta=0,
$$

giving

$$
\boxed{\beta=-kd\sin\theta_0}.
$$

Changing $\beta$ therefore changes the beam direction electronically.

---

## 2. Electronic beam steering

For adjacent elements separated by $d$, the time delay needed to steer toward angle $\theta_0$ is

$$
\tau=\frac{d\sin\theta_0}{c}.
$$

At a single frequency $f$ this corresponds to phase shift

$$
\Delta\phi=-2\pi f\tau.
$$

This distinction becomes important for broadband arrays.

**Phase shifter:** applies an approximately fixed phase shift.

**True-time-delay (TTD):** applies an actual delay $\tau$.

Since phase is frequency dependent,

$$
\phi(f)=-2\pi f\tau,
$$

a phase-shifter array optimized at $f_0$ can point in a different direction at another frequency. This is **beam squint**. TTD architectures reduce this effect in wideband systems.

---

## 3. PESA versus AESA

A **passive electronically scanned array (PESA)** typically uses a centralized high-power transmitter and distributes RF power through a feed network and phase shifters.

An **AESA** distributes active RF electronics throughout the aperture.

| PESA | AESA |
|---|---|
| Central RF source | Distributed active RF channels |
| Phase control in feed network | Phase/amplitude control near elements/subarrays |
| Central failure can be important | Graceful degradation is possible |
| Feed loss can be substantial | Power amplification can occur near radiators |
| Less distributed electronics | Many active modules |

AESA is therefore not merely a phased array with electronic steering. The word **active** refers to active transmit/receive electronics distributed across the aperture.

---

## 4. Transmit/Receive modules

A central building block is the **T/R module**.

A module may contain:

**transmit path:** waveform/input → phase/amplitude control → power amplifier → antenna element

**receive path:** antenna element → limiter/switch → low-noise amplifier → phase/amplitude control → receiver

Practical modules can include:

- power amplifier (PA);
- low-noise amplifier (LNA);
- phase shifter;
- attenuator or variable-gain stage;
- T/R switch or circulator;
- filters;
- bias/control electronics;
- temperature sensing;
- calibration paths.

Modern arrays increasingly integrate these functions into RFIC/MMIC and antenna-in-package architectures.

---

## 5. Semiconductor technology: GaAs and GaN

Historically, **gallium arsenide (GaAs)** has been widely used for microwave T/R modules.

**Gallium nitride (GaN)** has become important for high-power AESA because its wide-bandgap material properties permit high electric fields, power density, and high-temperature operation.

For radar, higher available RF power can increase transmitted EIRP, but practical performance depends on efficiency, thermal management, linearity, reliability, duty cycle, waveform, and aperture design—not simply transistor peak power.

---

## 6. Array gain and aperture

For coherent identical elements, the field amplitudes add in the desired direction. Idealized array directivity increases with the number of elements.

For a physical aperture of area $A$,

$$
G\approx\eta_a\frac{4\pi A}{\lambda^2},
$$

where $\eta_a$ is aperture efficiency.

This equation is fundamental: **at a fixed physical aperture, increasing frequency increases the potential directivity**.

The approximate beamwidth of an aperture dimension $D$ scales as

$$
\theta_{BW}\sim\frac{\lambda}{D}.
$$

Large electrical apertures therefore produce narrow beams.

---

## 7. Element spacing and grating lobes

A commonly used design rule is

$$
d\lesssim\frac{\lambda}{2},
$$

particularly when wide-angle scanning is required.

If the spacing becomes too large, additional directions can satisfy the phase condition and produce **grating lobes**.

The exact allowable spacing depends on scan range, array geometry, wavelength, and element pattern.

This is one reason high-frequency arrays can become physically dense: wavelength decreases while the array still needs RF electronics, routing, thermal paths, and mechanical support behind each element.

---

## 8. Scan loss

Electronic steering does not preserve identical gain at all angles.

For a planar aperture, projected area decreases approximately with scan angle, giving a basic geometric dependence resembling

$$
A_{\rm projected}=A\cos\theta.
$$

Real arrays also experience:

- element-pattern roll-off;
- impedance variation with scan;
- mutual coupling;
- polarization changes;
- phase/amplitude errors;
- radome effects;
- feed and module losses.

These effects collectively contribute to **scan loss**.

---

## 9. Sidelobes and amplitude tapering

Uniform excitation provides high aperture utilization but produces finite sidelobes.

Amplitude tapering—Taylor, Chebyshev or other distributions—can suppress sidelobes by reducing excitation near the aperture edges.

The tradeoff is typically

$$
\boxed{\text{lower sidelobes} \leftrightarrow \text{broader main beam / reduced peak gain}}.
$$

AESA control allows amplitude and phase distributions to be changed dynamically.

---

## 10. Analog, digital and hybrid beamforming

### Analog beamforming

RF or IF phase/amplitude control combines many elements into one or a small number of RF chains.

Advantages include reduced converter count and lower digital-processing load.

### Digital beamforming

Signals from multiple elements or subarrays are digitized separately and beamforming is performed numerically:

$$
y=\mathbf w^H\mathbf x,
$$

where $\mathbf x$ contains channel signals and $\mathbf w$ contains complex beamforming weights.

This allows several simultaneous receive beams, adaptive nulling, calibration, space-time processing, and flexible array operation.

### Hybrid beamforming

Hybrid systems combine analog/RF beamforming with a smaller number of digital channels.

This is particularly important at mmWave frequencies where a full high-speed ADC/DAC chain for every element may be expensive in power, area, and data bandwidth.

---

## 11. AESA radar equation connection

A monostatic radar link is often summarized by

$$
P_r=
\frac{P_tG_tG_r\lambda^2\sigma}
{(4\pi)^3R^4L},
$$

where

- $P_t$ is transmitted power,
- $G_t,G_r$ are antenna gains,
- $\sigma$ is radar cross section,
- $R$ is range,
- $L$ represents losses.

The $R^{-4}$ dependence illustrates why **transmit power, aperture gain, low receiver noise, coherent processing, waveform design, and integration time** are so important.

AESA architecture provides control over many of these system variables while also enabling agile beam steering.

---

## 12. Multifunction operation

One of the most important AESA advantages is that beam direction and waveform can change rapidly.

A multifunction array may interleave:

- target search;
- target tracking;
- communications;
- mapping/imaging;
- weather observation;
- calibration;
- interference suppression.

With appropriate architecture, multiple beams can also be formed simultaneously, especially on receive.

This transforms the antenna from a mechanically pointed component into a **software-controlled electromagnetic aperture**.

---

## 13. Calibration

An ideal beamformer assumes the commanded complex weight

$$
w_n=a_ne^{j\phi_n}
$$

is exactly realized at every channel.

Real modules have gain and phase errors:

$$
w_n^{\rm actual}
=
(a_n+\Delta a_n)e^{j(\phi_n+\Delta\phi_n)}.
$$

Errors arise from:

- manufacturing tolerances;
- temperature;
- aging;
- frequency dependence;
- mutual coupling;
- cable/interconnect differences;
- RFIC variation;
- radome effects.

Calibration measures these errors and adjusts commanded weights.

Methods include near-field measurement, far-field measurement, built-in calibration networks, mutual-coupling techniques, probe antennas, and over-the-air calibration.

---

## 14. Mutual coupling and active impedance

Array elements do not operate independently.

Current on one element produces fields at neighboring elements, changing their terminal voltages and currents. Consequently, the impedance seen by an element depends on the excitations of other elements.

This leads to the concept of **active impedance** or **active reflection coefficient**.

For an $N$-port array with incident waves $a_n$,

$$
b_m=\sum_{n=1}^{N}S_{mn}a_n.
$$

The active reflection coefficient at port $m$ can be written

$$
\Gamma_m^{\rm active}
=
\frac{b_m}{a_m}
=
\sum_{n=1}^{N}
S_{mn}\frac{a_n}{a_m}.
$$

Therefore impedance matching can change as the beam scans because the relative element phases change.

This is one of the key links between **S-parameters and full-array radiation performance**.

---

## 15. Thermal engineering

A large AESA may contain hundreds or thousands of active RF channels.

If each channel dissipates electrical power $P_d$, the total heat can become substantial:

$$
P_{thermal}\approx\sum_n P_{d,n}.
$$

Thermal gradients change semiconductor gain and phase and can therefore become electromagnetic errors.

AESA design is consequently a coupled problem:

$$
\boxed{\text{RF} + \text{EM} + \text{thermal} + \text{mechanical} + \text{control}}
$$

Cold plates, liquid cooling, heat spreaders, conduction paths, and temperature-aware calibration may all be part of the antenna system.

---

## 16. Noise figure and distributed receivers

Because the LNA can be located close to the antenna element, receive loss before the first gain stage can be minimized.

Friis' cascade relation is

$$
F_{total}
=
F_1+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+\cdots.
$$

This shows why loss before the LNA is particularly harmful: it directly degrades system noise performance.

Distributed receive amplification is therefore an important AESA advantage.

---

## 17. EIRP and G/T

Two useful system metrics are:

### Effective isotropic radiated power

$$
EIRP=P_tG_t.
$$

### Receive figure of merit

$$
\frac{G}{T},
$$

where $G$ is receive gain and $T$ is system noise temperature.

AESA design often seeks high EIRP on transmit and high $G/T$ on receive while satisfying scan, bandwidth, thermal, linearity, reliability, size, mass, and cost constraints.

---

## 18. Radar, communications and space applications

AESA technology appears in:

### Radar
- airborne surveillance and fire-control radar;
- ground-based air surveillance;
- naval multifunction radar;
- synthetic-aperture radar;
- weather radar;
- automotive radar.

### Communications
- satellite user terminals;
- electronically steered ground terminals;
- 5G/mmWave systems;
- high-capacity point-to-point links;
- airborne and maritime communications.

### Space systems
- satellite phased-array payloads;
- synthetic-aperture radar satellites;
- electronically steered communications antennas;
- deep-space and Earth-observation concepts.

This connects directly to the [spacecraft electromagnetic simulation](../computational-em/) section.

---

## 19. Computational electromagnetics for AESA

AESA analysis is computationally demanding because the designer may need to model:

- thousands of radiating elements;
- mutual coupling;
- finite array edges;
- radomes;
- structural scattering;
- feed networks;
- scan-angle dependence;
- polarization;
- thermal deformation;
- platform installation effects.

Common methods include:

- Method of Moments (MoM);
- finite-element method (FEM);
- finite-difference time-domain (FDTD);
- physical optics (PO);
- domain decomposition;
- characteristic basis functions;
- periodic/unit-cell methods for large arrays.

Large parameter sweeps are also natural candidates for the [CUDA/GPU computational methods](../computational-methods/) discussed elsewhere in this reference.

---

## 20. AESA and MIMO are related but not identical

A phased array primarily uses coherent weights to control spatial radiation or reception.

MIMO exploits multiple spatial channels and channel diversity/rank.

They can overlap:

$$
\boxed{\text{AESA / phased array} \rightarrow \text{beam control}}
$$

$$
\boxed{\text{MIMO} \rightarrow \text{spatial-channel processing}}
$$

Modern communication and radar systems can combine both concepts.

See the [Wireless Communications & MIMO](../wireless/) section for the channel-matrix viewpoint.

---

## 21. Reliability and graceful degradation

Because RF generation/amplification is distributed, failure of one module generally does not imply failure of the entire array.

Instead, the pattern and available power degrade according to the number and locations of failed elements.

This **graceful degradation** is a major architectural advantage, although failed-element patterns can raise sidelobes and require recalibration or adaptive weighting.

---

## 22. Practical AESA design tradeoffs

| Requirement | Typical consequence |
|---|---|
| Wider scan | tighter spacing, broader element pattern |
| Lower sidelobes | amplitude taper, reduced peak gain |
| More bandwidth | broadband elements / TTD / wideband RF electronics |
| More EIRP | more PA power, thermal burden |
| Better sensitivity | low-loss receive path, low-noise LNA |
| More simultaneous beams | more digital channels and processing |
| Smaller spacing | harder packaging and thermal design |
| Higher frequency | smaller elements but tighter manufacturing tolerance |
| Better calibration | additional sensors, couplers and algorithms |
| Lower cost/power | reduced RF-chain or digital complexity |

AESA engineering is therefore a system-level optimization rather than simply an antenna-array calculation.

---

## 23. Quick interview reference

**Why approximately $\lambda/2$ spacing?**  
To permit useful scan range while reducing the risk of grating lobes.

**Phase steering versus true-time delay?**  
Phase steering approximates a delay at one frequency and can produce beam squint over bandwidth; TTD preserves the time delay.

**Why AESA instead of PESA?**  
Distributed transmit/receive electronics provide flexible beam control, reduced centralized failure dependence, low-loss receive amplification, and graceful degradation.

**What limits scan angle?**  
Element pattern, grating lobes, mutual coupling, active impedance, polarization, radome/platform effects and scan loss.

**Why calibrate an AESA?**  
Channel gain/phase errors directly distort beam direction, gain, sidelobes and nulls.

**What is digital beamforming?**  
Applying complex spatial weights numerically to separately digitized channels.

**Why is thermal design an RF problem?**  
Temperature changes PA/LNA behavior and channel phase/amplitude, which changes the array pattern.

---

# References and further reading

1. R. J. Mailloux, *Phased Array Antenna Handbook*, Artech House — comprehensive phased-array theory and engineering.
2. R. C. Hansen, *Phased Array Antennas*, Wiley — array theory, scanning, element patterns, impedance and practical limitations.
3. C. A. Balanis, *Antenna Theory: Analysis and Design*, Wiley — antenna arrays, array factors, directivity and aperture concepts.
4. R. S. Elliott, *Antenna Theory and Design*, Wiley — rigorous array and antenna foundations.
5. D. M. Pozar, “The Active Element Pattern,” *IEEE Transactions on Antennas and Propagation*, 1994 — active element patterns and mutual-coupling effects in arrays.
6. H. L. Van Trees, *Optimum Array Processing*, Wiley — beamforming, estimation and array signal processing.
7. M. I. Skolnik, *Radar Handbook*, McGraw-Hill — radar systems, phased arrays and radar engineering.
8. M. A. Richards, *Fundamentals of Radar Signal Processing*, McGraw-Hill — radar signal-processing foundations.
9. R. J. Mailloux, “Phased Array Architecture,” in phased-array literature — practical array architectures and design considerations.
10. IEEE *Transactions on Antennas and Propagation* — primary literature for phased arrays, mutual coupling, beamforming and array antennas.
11. IEEE *Transactions on Microwave Theory and Techniques* — RF front ends, T/R modules, MMICs and phased-array electronics.
12. IEEE *Transactions on Aerospace and Electronic Systems* — radar and aerospace phased-array systems.

---

[← Home](../)
