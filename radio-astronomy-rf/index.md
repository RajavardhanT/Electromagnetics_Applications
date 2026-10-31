---
layout: default
title: Radio Astronomy — RF Circuits & Receiver Systems
description: Radio astronomy through the RF-circuit chain: antennas, feeds, cryogenic LNAs, SIS mixers, local oscillators, IF chains, ADCs, channelizers, correlators, calibration, noise temperature, RFI, interferometry, and telescope receiver examples.
---

# Radio Astronomy — RF Circuits & Receiver Systems

<div class="intuition"><span class="callout-title">30-second intuition</span>Radio astronomy is an extreme RF receiver problem. The desired signal is often <strong>far below the instantaneous receiver noise</strong>, so the goal is not simply to “see a carrier.” The receiver must preserve tiny statistical differences in noise power, phase and correlation. That drives nearly every circuit decision: <strong>cryogenic LNAs, ultra-low-loss feeds, superconducting mixers, phase-stable local oscillators, carefully filtered IF chains, high-dynamic-range ADCs, and long coherent integration.</strong></div>

<div class="pathway"><span class="node">sky brightness</span><span class="arrow">→</span><span class="node">dish / feed / OMT</span><span class="arrow">→</span><span class="node">cryogenic LNA or mixer</span><span class="arrow">→</span><span class="node">IF chain</span><span class="arrow">→</span><span class="node">ADC / FPGA</span><span class="arrow">→</span><span class="node">channelizer / correlator</span><span class="arrow">→</span><span class="node">image / spectrum</span></div>

Useful institutional references:

- [NRAO VLA frequency bands and samplers](https://science.nrao.edu/facilities/vla/docs/manuals/propvla/frequency-bands-and-samplers)
- [NRAO calibration guide](https://science.nrao.edu/facilities/vla/docs/manuals/obsguide/calibration)
- [ALMA receiver technology](https://www.almaobservatory.org/en/about-alma/how-alma-works/technologies/receivers/)
- [ALMA local oscillator](https://www.almaobservatory.org/en/videos/the-alma-local-oscillator/)
- [SKA-Low signal chain](https://www.skao.int/en/explore/telescopes/ska-low)

---

# Part I — Why radio astronomy is an RF-circuit problem

## 1. The source is usually noise-like

Most astronomical radio emission is not a clean deterministic sinusoid.

It behaves more like a random broadband voltage process.

At the receiver,

$$
v(t)=v_{sky}(t)+v_{rx}(t)+v_{RFI}(t).
$$

Usually,

$$
|v_{sky}|^2
\ll
|v_{rx}|^2.
$$

The astronomical information is recovered statistically by

- averaging;
- spectral analysis;
- cross-correlation;
- polarization analysis;
- interferometry.

---

## 2. Thermal-noise viewpoint

A matched noise source with equivalent temperature $T$ delivers approximately

$$
\boxed{
P_n=kTB
}
$$

over bandwidth $B$.

This equation is fundamental in radio astronomy because weak received signals are often expressed as **equivalent noise temperatures**.

---

## 3. Antenna temperature

The sky contributes an equivalent antenna temperature

$$
T_A.
$$

A telescope receiving system responds to a total system temperature

$$
\boxed{
T_{sys}
=
T_{sky}
+
T_{atm}
+
T_{spill}
+
T_{loss}
+
T_{rx}
+cdots
}
$$

where

- $T_{sky}$ = sky/background contribution;
- $T_{atm}$ = atmospheric emission;
- $T_{spill}$ = ground/spillover pickup;
- $T_{loss}$ = passive loss contribution;
- $T_{rx}$ = receiver noise temperature.

This immediately shows why low-loss feeds and low-noise first stages matter.

---

# Part II — Radiometer equation

## 4. Sensitivity improves with bandwidth and time

For an ideal total-power radiometer,

$$
\boxed{
\sigma_T
\approx
\frac{T_{sys}}
{\sqrt{B\tau}}
}
$$

where

- $B$ = measurement bandwidth;
- $\tau$ = integration time.

Therefore weak signals can be detected by integrating for a long time.

---

## 5. Engineering interpretation

To improve sensitivity you can

- lower $T_{sys}$;
- increase bandwidth;
- increase integration time;
- increase effective collecting area;
- combine multiple antennas.

Circuit designers mainly attack

$$
\boxed{
T_{rx}
}
$$

and losses ahead of the first gain stage.

---

# Part III — Flux density and antenna effective area

## 6. Jansky

Radio-astronomy source strength is commonly expressed in janskys:

$$
1\ \mathrm{Jy}
=
10^{-26}\ \mathrm{W\,m^{-2}\,Hz^{-1}}.
$$

These are extremely small flux densities.

---

## 7. Effective aperture

An antenna with gain $G$ has effective area

$$
A_e
=
\frac{G\lambda^2}{4\pi}.
$$

For a dish,

$$
A_e
=
\eta_A
\frac{\pi D^2}{4}.
$$

Larger aperture improves received signal power.

---

## 8. SEFD

A useful radio-astronomy system metric is **system-equivalent flux density**:

$$
\boxed{
SEFD
=
\frac{2kT_{sys}}{A_e}.
}
$$

Lower SEFD means a more sensitive telescope.

This combines RF receiver quality and antenna effective area into one number.

---

# Part IV — Receiver chain

## 9. Generic radio-astronomy receiver

A practical chain is

$$
\boxed{
\begin{aligned}
\text{dish / array element}
&\rightarrow
\text{feed horn / antenna}\\
&\rightarrow
\text{polarizer / OMT}\\
&\rightarrow
\text{cryogenic LNA or mixer}\\
&\rightarrow
\text{filter / IF amplifier}\\
&\rightarrow
\text{ADC}\\
&\rightarrow
\text{digital channelizer}\\
&\rightarrow
\text{correlator / beamformer}.
\end{aligned}
}
$$

The detailed architecture changes enormously with frequency.

---

# Part V — Feed and polarization circuits

## 10. Feed horn

A reflector antenna does not directly connect to an LNA.

A feed illuminates the reflector.

Common structures include

- corrugated horns;
- smooth-wall horns;
- wideband feeds;
- dipole arrays;
- phased-array feeds.

Important quantities are

- return loss;
- beam pattern;
- spillover;
- polarization purity;
- bandwidth.

---

## 11. Orthomode transducer

An OMT separates orthogonal polarizations.

Conceptually:

$$
\text{incoming EM field}
\rightarrow
\begin{cases}
E_x\\
E_y
\end{cases}
$$

This permits simultaneous measurement of two polarization channels.

Important OMT metrics:

- insertion loss;
- isolation;
- return loss;
- cross-polarization;
- phase balance.

Loss before the LNA is especially damaging.

---

## 12. Why polarization matters

Radio astronomy often measures

- total intensity;
- linear polarization;
- circular polarization.

The Stokes parameters are

$$
I,Q,U,V.
$$

Instrumental gain and phase mismatch between polarization channels must therefore be calibrated.

---

# Part VI — First-stage noise

## 13. Friis noise equation

For cascaded stages,

$$
F_{tot}
=
F_1
+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+\cdots.
$$

This makes the first active stage overwhelmingly important.

Therefore radio telescopes put a very low-noise amplifier as close as physically possible to the feed.

---

## 14. Noise figure and noise temperature

Noise factor and equivalent noise temperature are related by

$$
\boxed{
T_e
=
T_0(F-1)
}
$$

with

$$
T_0\approx290\ \mathrm K.
$$

Radio astronomy usually prefers **noise temperature** because it directly enters $T_{sys}$.

---

# Part VII — Cryogenic LNAs

## 15. Why cool the LNA?

Cooling reduces thermal and device noise.

At microwave frequencies, radio-astronomy receivers commonly use cryogenic

- GaAs pHEMT;
- InP HEMT

LNAs.

Operating temperatures may be tens of kelvin or lower depending on architecture.

---

## 16. What matters in a cryogenic LNA?

| Parameter | Why it matters |
|---|---|
| Noise temperature | directly affects $T_{sys}$ |
| Gain | suppresses downstream noise contribution |
| Input match | feed/OMT interface and noise match |
| Stability | oscillation must be avoided over very wide conditions |
| Linearity / IP3 | strong RFI can create intermodulation |
| Power | cryostat heat load |
| Bias stability | calibration repeatability |
| Bandwidth | science bandwidth |

---

## 17. Noise match versus power match

The impedance that minimizes amplifier noise is not always the impedance that maximizes gain.

Noise parameters describe an optimum source reflection coefficient

$$
\Gamma_{opt}.
$$

Radio-astronomy LNA design may sacrifice some gain or return loss to achieve lower receiver noise temperature.

---

# Part VIII — Cryostat

## 18. Why the front end is physically cold

ALMA's receiver cryostat uses stages near approximately

- 110 K;
- 15 K;
- 4 K.

ALMA operates Bands 3–10 at temperatures down to about 4 K and Bands 1–2 around the higher cryogenic stage.

This reduces receiver noise and enables superconducting devices.

---

## 19. RF design inside a cryostat

Cryogenic RF design must consider

- coax/waveguide thermal conduction;
- superconducting transitions;
- connector contraction;
- material CTE mismatch;
- bias-line heat leakage;
- RF loss;
- heat sinking;
- microphonics.

The best room-temperature RF material is not automatically the best cryogenic mechanical solution.

---

# Part IX — HEMT receivers

## 20. HEMT architecture

At lower microwave and some millimeter bands, the receiver may use

$$
\text{feed}
\rightarrow
\text{cryogenic HEMT LNA}
\rightarrow
\text{mixer/downconverter}.
$$

The LNA provides enough gain that mixer/IF noise becomes less important.

---

## 21. InP HEMT

InP HEMT technology is important for ultra-low-noise microwave/mmWave LNAs because of

- high electron mobility;
- high $f_T$/$f_{max}$;
- excellent cryogenic noise behavior.

Current ALMA upgrade work explicitly includes wideband cryogenic InP HEMT LNAs among the critical receiver components.

---

# Part X — SIS mixers

## 22. Why mixers become central at submillimeter wavelengths

At very high frequencies, conventional transistor LNA performance becomes increasingly difficult.

ALMA uses superconducting receiver technology in many high-frequency bands.

A key device is the **superconductor-insulator-superconductor (SIS) mixer**.

---

## 23. SIS junction

An SIS structure is

$$
S-I-S.
$$

Quantum tunneling through the insulating barrier produces highly nonlinear I-V behavior.

When pumped by a strong LO, the junction acts as an extremely sensitive mixer.

---

## 24. Heterodyne conversion

For an astronomical RF component,

$$
f_{IF}
=
|f_{RF}-f_{LO}|.
$$

The astronomical spectrum is therefore translated from hundreds of GHz into a much lower IF that can be amplified and digitized.

---

## 25. Why heterodyne radio astronomy is powerful

Frequency conversion preserves

- spectral information;
- phase;
- polarization;
- narrow spectral lines.

This enables extremely high-resolution spectroscopy of molecular transitions.

---

# Part XI — Sidebands

## 26. Double-sideband mixer

A DSB receiver responds to both

$$
f_{LO}+f_{IF}
$$

and

$$
f_{LO}-f_{IF}.
$$

Signals in both RF sidebands map to the same IF.

This can cause ambiguity.

---

## 27. Sideband-separating receiver

A 2SB architecture uses mixers and hybrids to separate

- upper sideband;
- lower sideband.

It requires precise

- amplitude balance;
- phase balance;
- hybrid performance.

Image/sideband rejection becomes a major RF design metric.

---

# Part XII — Local oscillator

## 28. LO requirements

A radio-astronomy LO must provide

- low phase noise;
- accurate frequency;
- long-term stability;
- enough drive for mixers;
- phase coherence across antennas.

In an interferometer, LO phase errors become astronomical phase errors.

---

## 29. Multiplier chains

At submillimeter frequencies, the desired LO may be generated by

$$
\text{microwave synthesizer}
\rightarrow
\text{frequency multiplier}
\rightarrow
\text{waveguide chain}.
$$

For example, current ALMA Band-4+5 development considers LO-PLL signals followed by multiplier stages before driving SIS mixers.

---

## 30. Phase noise multiplication

Ideal frequency multiplication by $N$ raises phase noise approximately by

$$
20\log_{10}N.
$$

Thus a very clean low-frequency reference is essential when multiplying into mmWave/sub-mm frequencies.

---

# Part XIII — Distributed LO and timing

## 31. Interferometers need common timing

For antennas separated by kilometers, each receiver must preserve phase relative to a common time/frequency system.

Conceptually,

$$
\boxed{
\text{master reference}
\rightarrow
\text{fiber distribution}
\rightarrow
\text{antenna LO}
}
$$

ALMA distributes timing/LO information over stabilized optical fiber.

---

## 32. Fiber-length stability

Temperature changes alter fiber electrical length.

A phase change is

$$
\Delta\phi
=
2\pi f\Delta\tau.
$$

At high RF frequency, tiny timing changes create large phase errors.

Therefore optical-reference distribution requires active stabilization.

---

# Part XIV — IF chain

## 33. Why use an IF?

After RF mixing, the IF allows

- practical filtering;
- high-gain amplification;
- easier transport;
- lower-speed ADC requirements;
- flexible digital processing.

A typical chain is

$$
\text{mixer}
\rightarrow
\text{IF LNA}
\rightarrow
\text{band-pass filter}
\rightarrow
\text{variable gain}
\rightarrow
\text{ADC}.
$$

---

## 34. IF bandwidth

Wide IF bandwidth directly increases continuum sensitivity:

$$
\sigma_T
\propto
\frac{1}{\sqrt B}.
$$

Therefore modern telescope upgrades strongly push wider instantaneous IF bandwidth.

But wider bandwidth also increases

- ADC sample-rate requirement;
- DSP load;
- RFI exposure;
- gain-flatness requirements.

---

# Part XV — Gain distribution

## 35. Receiver gain budget

Gain must be high enough that ADC quantization noise and later electronics do not dominate.

But too much gain risks

- compression;
- intermodulation;
- ADC clipping

when strong RFI appears.

Thus radio astronomy requires unusually careful balance between **noise sensitivity and headroom**.

---

## 36. Variable gain / attenuators

Programmable gain and attenuation may be used to

- equalize channels;
- keep ADC levels optimal;
- compensate frequency response;
- adapt to RFI environment.

Calibration must track those settings.

---

# Part XVI — Filters

## 37. RF preselection

Filters before nonlinear stages reject strong out-of-band transmitters.

This is critical near

- cellular towers;
- satellites;
- radar;
- aviation;
- broadcast services.

Even if an interfering signal is outside the science band, it can generate in-band intermodulation.

---

## 38. IF filters

IF filters define usable passband and reject mixer products.

Important requirements:

- low insertion loss;
- flat amplitude;
- controlled group delay;
- high stopband rejection;
- stable temperature behavior.

---

# Part XVII — RFI

## 39. Radio-frequency interference

RFI may be many orders of magnitude stronger than an astronomical source.

Sources include

- cellular;
- Wi-Fi;
- satellites;
- aircraft;
- radar;
- electronics;
- switching power supplies.

A radio telescope therefore needs both **extreme sensitivity and high dynamic range**.

---

## 40. RFI can create nonlinear products

Strong interferers may drive

- LNA;
- mixer;
- IF amplifier;
- ADC

into nonlinearity.

Then the telescope itself creates false spectral features.

This is why IP2/IP3 and compression remain relevant even for an instrument designed to observe infinitesimal signals.

---

## 41. Current VLA example

The VLA continuously monitors RFI across its observing bands, from P-band through Q-band.

NRAO publishes current spectral sweeps as part of its observing documentation.

This makes RFI engineering an operational part of radio astronomy, not merely a lab concern.

---

# Part XVIII — ADC

## 42. Digitization

The analog IF is sampled:

$$
x[n]=x(nT_s).
$$

Important ADC properties include

- sample rate;
- analog bandwidth;
- ENOB;
- SFDR;
- aperture jitter;
- full-scale range.

See [ADC & DAC — Data Converters](../data-converters/).

---

## 43. VLA sampler example

The current VLA system uses both

- 8-bit samplers with about 1 GHz bandwidth per sampler;
- 3-bit samplers with about 2 GHz bandwidth per sampler.

This illustrates an important radio-astronomy trade:

$$
\boxed{
\text{more bandwidth}
\leftrightarrow
\text{fewer bits / dynamic-range constraints}.
}
$$

Very low bit depth can still work for correlation when the statistics and quantization corrections are carefully handled.

---

# Part XIX — Quantization in radio astronomy

## 44. Why few bits can be useful

Astronomical receiver output is approximately Gaussian noise.

For correlation systems, even low-bit quantization can preserve significant information if thresholds are correctly optimized.

Historically, radio interferometers often used very low-bit quantization to reduce data rate.

Modern systems use more bits when RFI dynamic range and flexibility justify it.

---

# Part XX — Digital downconversion

## 45. DDC

After digitization,

$$
x[n]
e^{-j2\pi f_0n/f_s}
\rightarrow
LPF
\rightarrow
\text{decimation}.
$$

This selects sub-bands digitally.

DDC permits many independent science channels without additional analog mixers.

---

# Part XXI — Channelization

## 46. FFT spectrometer

An FFT converts samples into spectral channels:

$$
X[k]
=
\sum_{n=0}^{N-1}
x[n]e^{-j2\pi kn/N}.
$$

Frequency resolution is roughly

$$
\Delta f
=
\frac{f_s}{N}
$$

before window/ENBW considerations.

---

## 47. Polyphase filter bank

Modern radio astronomy often uses a **polyphase filter bank (PFB)** rather than a bare FFT.

The PFB combines

- FIR filtering;
- decimation;
- FFT.

Advantages:

- better channel isolation;
- reduced spectral leakage;
- controlled passband shape.

---

# Part XXII — Correlator

## 48. Interferometry

For antennas $i$ and $j$, the correlator estimates

$$
\boxed{
R_{ij}
=
\langle
V_i(t)
V_j^*(t)
\rangle.
}
$$

This complex correlation is a **visibility**.

Its amplitude and phase contain spatial information about the sky.

---

## 49. Why correlation rejects receiver noise

Receiver noises at separate antennas are largely uncorrelated.

Astronomical wavefront components are correlated after geometric delay compensation.

Thus averaging cross-correlation suppresses independent receiver noise.

This is one of the central ideas of radio interferometry.

---

## 50. FX correlator

A common modern architecture is

$$
\boxed{
F
\rightarrow
X
}
$$

where

**F** = Fourier transform/channelization;

**X** = cross-multiply corresponding frequency channels between antennas.

For $N_a$ antennas, the number of baselines is

$$
N_b
=
\frac{N_a(N_a-1)}{2}.
$$

---

# Part XXIII — Beamforming

## 51. Phased-array beamforming

For an array,

$$
y(t)
=
\sum_m
w_mx_m(t).
$$

Digital beamforming can create multiple simultaneous sky beams.

SKA-Low is a strong example: signals from many antenna elements are amplified, digitized, transported over fiber, then combined digitally by beamformer/correlator systems.

---

## 52. Calibration of beam weights

Errors in

- gain;
- phase;
- cable delay;
- antenna position

distort the beam.

Calibration estimates complex corrections

$$
g_m
=
|g_m|e^{j\phi_m}.
$$

---

# Part XXIV — Calibration circuits

## 53. Noise diode

A calibrated noise source can be injected into the receiver chain.

Switching the source on/off provides a known change in noise temperature.

This allows measurement/tracking of

- gain;
- receiver stability;
- system temperature.

---

## 54. Y-factor

With hot and cold loads,

$$
Y
=
\frac{P_H}{P_C}.
$$

Receiver noise temperature can be estimated from

$$
\boxed{
T_e
=
\frac{T_H-YT_C}
{Y-1}.
}
$$

This is a fundamental RF receiver-noise measurement.

---

## 55. Hot/cold calibration

At mmWave frequencies, absorptive loads at known physical temperatures can serve as calibration standards.

The receiver sees

$$
P=kT_{load}B.
$$

This converts RF power measurement into an equivalent temperature calibration.

---

# Part XXV — Bandpass calibration

## 56. Complex frequency response

The RF/IF chain has a transfer function

$$
H(f)
=
|H(f)|e^{j\phi(f)}.
$$

Astronomical spectral-line measurements require this instrumental response to be removed.

A known astronomical calibrator or injected calibration signal can estimate $H(f)$.

---

# Part XXVI — Phase calibration

## 57. Interferometric phase

A phase error changes measured source position/structure.

Phase can drift because of

- LO electronics;
- cables/fiber;
- atmosphere;
- antenna mechanics.

Radio arrays therefore repeatedly observe calibration sources.

---

## 58. Atmospheric phase

At mm/sub-mm frequencies, water vapor changes propagation delay.

ALMA uses water-vapor radiometers to estimate and correct atmospheric phase fluctuations.

Thus the calibration system includes another specialized microwave receiver.

---

# Part XXVII — Stability

## 59. Gain stability

The radiometer equation assumes ideal averaging.

Real gain fluctuations add error.

If gain changes by

$$
\frac{\Delta G}{G},
$$

long integrations eventually become stability-limited instead of thermal-noise-limited.

---

## 60. Allan variance

Receiver and oscillator stability can be characterized with Allan deviation.

This connects directly to [Allan Deviation & Stability](../laser-systems/allan-deviation.html).

The optimum integration time may be limited by

- gain drift;
- LO drift;
- atmospheric fluctuations.

---

# Part XXVIII — Frequency bands

## 61. VLA receiver bands

The current VLA provides continuous cryogenic receiver coverage from roughly 1–50 GHz:

| Band | Frequency |
|---|---:|
| L | 1–2 GHz |
| S | 2–4 GHz |
| C | 4–8 GHz |
| X | 8–12 GHz |
| Ku | 12–18 GHz |
| K | 18–26.5 GHz |
| Ka | 26.5–40 GHz |
| Q | 40–50 GHz |

The VLA also supports lower P-band and 4-band receivers.

See [RF Bands — Compact Reference](../rf-bands/).

---

## 62. ALMA bands

ALMA extends far into millimeter/submillimeter wavelengths.

| ALMA band | Approx. frequency |
|---|---:|
| Band 1 | 35–50 GHz |
| Band 2 | 67–116 GHz |
| Band 3 | 84–116 GHz |
| Band 4 | 125–163 GHz |
| Band 5 | 163–211 GHz |
| Band 6 | 211–275 GHz |
| Band 7 | 275–373 GHz |
| Band 8 | 385–500 GHz |
| Band 9 | 602–720 GHz |
| Band 10 | 787–950 GHz |

At these frequencies the RF circuit becomes deeply intertwined with

- waveguide;
- superconducting devices;
- quasi-optics;
- cryogenics.

---

# Part XXIX — Hydrogen 21-cm line

## 63. The most famous radio line

Neutral hydrogen has a hyperfine transition near

$$
f\approx1420.4058\ \mathrm{MHz}.
$$

This lies in L-band.

The wavelength is approximately

$$
\lambda\approx21\ \mathrm{cm}.
$$

This line is one reason L-band radio astronomy is historically and scientifically important.

---

# Part XXX — Spectroscopy

## 64. Molecular lines

Molecules emit/absorb at precisely defined rotational transitions.

A heterodyne receiver translates these lines to IF without losing spectral structure.

A spectrometer then resolves

$$
\Delta f
$$

and converts frequency shift to radial velocity approximately through

$$
\frac{\Delta f}{f_0}
\approx
-\frac{v_r}{c}
$$

for nonrelativistic velocities.

---

# Part XXXI — Continuum versus spectral line

## 65. Continuum observation

Goal: measure broadband emission.

Circuit priority:

- wide bandwidth;
- low $T_{sys}$;
- stable gain;
- large collecting area.

---

## 66. Spectral-line observation

Goal: resolve narrow lines.

Circuit/DSP priority:

- frequency stability;
- fine channelization;
- flat bandpass;
- low spurs;
- accurate Doppler tracking.

---

# Part XXXII — Pulsar receiver path

## 67. Pulsars

Pulsars produce periodic broadband radio pulses.

The receiver must handle

- wide bandwidth;
- dispersion;
- precise time stamping;
- high time resolution.

Digital processing may perform coherent or incoherent dedispersion.

---

## 68. Dispersion

Interstellar plasma causes frequency-dependent delay approximately scaling as

$$
\tau
\propto
DM\,f^{-2}.
$$

Thus the RF chain must preserve phase/time information across the observation bandwidth.

---

# Part XXXIII — VLBI

## 69. Very Long Baseline Interferometry

VLBI correlates signals from antennas separated by thousands of kilometers.

Instead of a physical common cable, each site uses an extremely stable clock.

Hydrogen masers are widely used.

See [Hydrogen Maser](../hydrogen-maser/).

---

## 70. Timing requirement

A clock phase error appears directly as a visibility phase error.

The signal chain therefore includes

- stable frequency reference;
- precision time stamping;
- high-rate recording/network transport;
- later correlation.

---

# Part XXXIV — PCB and microwave circuit considerations

## 71. Cryogenic microwave PCB

Circuit design may involve

- low-loss laminates;
- alumina;
- thin-film circuits;
- wire bonds;
- waveguide-to-microstrip transitions;
- superconducting transmission lines.

At cryogenic temperatures, dielectric and conductor properties differ from room-temperature values.

---

## 72. Bias networks

LNA bias circuits must be

- low noise;
- thermally stable;
- RF isolated;
- low heat load.

Bias tees/chokes and feedthrough capacitors must not create resonances inside the receiver band.

---

## 73. Grounding and shielding

Radio astronomy receivers are extraordinarily sensitive to self-generated interference.

Potential internal interferers include

- digital clocks;
- DC/DC converters;
- FPGA harmonics;
- USB/Ethernet;
- switching cryocooler electronics.

Therefore analog, digital and power sections require careful shielding and current-return management.

---

# Part XXXV — Linearity versus sensitivity

## 74. The paradox

A radio telescope wants the lowest possible noise figure.

But the environment may contain enormous terrestrial signals.

Therefore a good receiver needs both

$$
\boxed{
\text{very low noise}
+
\text{large linear dynamic range}.
}
$$

Increasing LNA gain indefinitely is not the answer.

---

## 75. IP3

Third-order products occur at

$$
2f_1-f_2,
\qquad
2f_2-f_1.
$$

They are especially dangerous because they can fall inside the science band.

Thus cryogenic LNA linearity and preselection matter even when observing sub-microvolt-equivalent signals.

---

# Part XXXVI — ADC dynamic range and RFI

## 76. Clipping

If a strong interferer reaches ADC full scale,

$$
|x(t)|>x_{FS},
$$

information is lost and broadband distortion can be created.

AGC/attenuation is used cautiously because changing gain changes the calibration.

---

## 77. SFDR

Spurious-free dynamic range is important when a weak astronomical feature sits near strong RFI.

See [ADC & DAC](../data-converters/) and [Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/).

---

# Part XXXVII — Digital backend

## 78. FPGA

FPGAs perform

- channelization;
- delay compensation;
- digital mixing;
- beamforming;
- packetization;
- correlation front-end processing.

The architecture resembles a very large multi-channel real-time spectrum analyzer.

---

## 79. GPU / CPU backend

Modern systems increasingly use

- GPUs;
- CPU clusters;
- high-speed Ethernet/fiber;
- software-defined backends

after early-stage FPGA processing.

SKA and modern spectrometer developments illustrate this transition.

---

# Part XXXVIII — Radio telescope versus spectrum analyzer

## 80. Similarities

Both contain

$$
\boxed{
RF\ front\ end
\rightarrow
ADC
\rightarrow
FFT/DSP.
}
$$

Both care about

- noise floor;
- dynamic range;
- ADC SFDR;
- clocks;
- filters;
- calibration.

---

## 81. Major difference

A laboratory spectrum analyzer usually reports

$$
P(f)
$$

from one input.

A radio interferometer primarily measures cross-correlations

$$
V_i(f)V_j^*(f).
$$

Thus phase coherence between many receiver chains is essential.

---

# Part XXXIX — Radio telescope versus communications receiver

## 82. Communications receiver

Usually asks:

> What bits/symbols were transmitted?

It uses a known waveform structure.

---

## 83. Radio astronomy receiver

Usually asks:

> What statistical power, spectrum, polarization and spatial coherence came from the sky?

The signal may have no known symbol sequence at all.

That is why radiometry and correlation replace conventional demodulation.

---

# Part XL — Current telescope examples

## 84. VLA

Current VLA receiver characteristics include

- cryogenic coverage from 1–50 GHz across L through Q;
- lower-frequency P/4-band systems;
- multi-GHz digital sampling;
- a wideband correlator.

This is a useful example of a microwave receiver architecture scaled across 27 antennas.

---

## 85. ALMA

ALMA represents the mm/sub-mm extreme:

- cryogenic front end;
- receiver cartridges;
- HEMT/SIS technology depending on band;
- precision LO distribution;
- analog IF;
- digitization;
- optical-fiber transport;
- central correlator.

Its receiver coverage spans approximately 35–950 GHz across Bands 1–10.

---

## 86. SKA-Low

SKA-Low illustrates the low-frequency array extreme.

Each antenna element feeds low-noise amplification, signals are transported from stations, digitized/processed and then digitally beamformed/correlated.

SKAO describes extremely high aggregate optical data transport into central processing.

---

# Part XLI — Parameters an RF engineer should know

## 87. Radio-astronomy RF parameter table

| Parameter | Why it matters |
|---|---|
| $T_{sys}$ | overall sensitivity |
| Receiver noise temperature | first-stage receiver quality |
| NF | conventional RF expression of added noise |
| Gain | suppresses downstream noise |
| IP2/IP3 | RFI-induced distortion |
| $P_{1dB}$ | compression/headroom |
| Feed loss | directly increases noise |
| OMT isolation | polarization purity |
| Sideband rejection | spectral/image purity |
| LO phase noise | interferometric/spectral fidelity |
| LO frequency stability | Doppler/spectral accuracy |
| IF bandwidth | continuum sensitivity and science bandwidth |
| Gain flatness | bandpass calibration |
| Group delay | wideband phase fidelity |
| ADC ENOB/SFDR | quantization + RFI dynamic range |
| Sample clock jitter | high-frequency phase/noise performance |
| Correlator bit depth | sensitivity/data-rate trade |
| Allan stability | useful integration time |
| RFI rejection | prevents contamination/compression |

---

# Part XLII — RF-circuit checklist

## 88. When evaluating a radio-astronomy receiver

Ask:

1. What is the observing frequency?
2. Is the first stage an LNA or mixer?
3. What is the receiver noise temperature?
4. What passive loss exists before first gain?
5. Is the receiver cryogenic?
6. What are the expected RFI levels?
7. What is the front-end IP3/compression margin?
8. What sideband architecture is used?
9. What LO phase-noise/stability is required?
10. What is the IF bandwidth?
11. What gain reaches the ADC?
12. What ADC resolution/sample rate is used?
13. How is the signal channelized?
14. Is processing total-power, beamforming or correlation?
15. How are amplitude and phase calibrated?

---

# Part XLIII — Mental model

## 89. Complete RF-to-image chain

$$
\boxed{
\begin{aligned}
\text{astronomical EM field}
&\rightarrow
\text{antenna effective aperture}\\
&\rightarrow
\text{feed / OMT}\\
&\rightarrow
\text{cryogenic LNA / SIS mixer}\\
&\rightarrow
\text{LO + heterodyne conversion}\\
&\rightarrow
\text{IF amplification/filtering}\\
&\rightarrow
\text{ADC}\\
&\rightarrow
\text{PFB / FFT}\\
&\rightarrow
\text{delay correction}\\
&\rightarrow
\text{cross-correlation / beamforming}\\
&\rightarrow
\text{calibration}\\
&\rightarrow
\text{spectrum / image / polarization}.
\end{aligned}
}
$$

This is radio astronomy viewed as an RF/microwave system.

---

# References

## NRAO

- [VLA Frequency Bands and Samplers](https://science.nrao.edu/facilities/vla/docs/manuals/propvla/frequency-bands-and-samplers)
- [VLA Observational Status Summary](https://science.nrao.edu/facilities/vla/docs/manuals/oss2026a)
- [VLA Calibration](https://science.nrao.edu/facilities/vla/docs/manuals/obsguide/calibration)
- [VLA RFI Information](https://science.nrao.edu/facilities/vla/docs/manuals/obsguide/modes/rfi)
- [NRAO Essential Radio Astronomy lecture summaries](https://science.nrao.edu/opportunities/courses/era/lecture-summaries)

## ALMA

- [ALMA Receiver Technology](https://www.almaobservatory.org/en/about-alma/how-alma-works/technologies/receivers/)
- [ALMA Local Oscillator](https://www.almaobservatory.org/en/videos/the-alma-local-oscillator/)
- [Inside an ALMA Antenna](https://www.almaobservatory.org/en/videos/inside-an-alma-antenna/)
- [ALMA Band 2 Cold Cartridge](https://www.almaobservatory.org/en/cold-cartridge-assembly-of-an-alma-band-2-receiver/)

## SKAO

- [SKA-Low](https://www.skao.int/en/explore/telescopes/ska-low)

## Related pages

[RF & Microwave](../rf-microwave/) · [Microwave & Space Electronics Components](../microwave-space-components/) · [RF Bands](../rf-bands/) · [ADC & DAC](../data-converters/) · [Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/) · [Measurements & Instruments](../measurements/) · [Antennas & Radiation](../antennas/) · [AESA & Phased Arrays](../aesa/) · [Hydrogen Maser](../hydrogen-maser/)
