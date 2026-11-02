---
layout: default
title: Modern Signal Generator — RF & Vector Signal Generation
description: Technical guide to modern RF/vector signal generators: reference clocks, synthesizers, DDS/NCO, baseband I/Q, interpolation, DACs, I/Q modulation, direct-RF synthesis, ALC, phase noise, EVM, ACPR, arbitrary waveforms, MIMO synchronization, and receiver testing.
---

# Modern Signal Generator — RF & Vector Signal Generation

<div class="intuition"><span class="callout-title">30-second intuition</span>A modern RF/vector signal generator is a <strong>precision transmitter built as test equipment</strong>. It starts with a very clean frequency/time reference, digitally constructs a waveform, converts that waveform with high-speed DACs, translates or directly synthesizes it at RF, precisely controls its amplitude, and continuously calibrates errors so that the generated signal is cleaner and more accurate than the device being tested.</div>

<div class="pathway"><span class="node">reference clock</span><span class="arrow">→</span><span class="node">waveform / DSP</span><span class="arrow">→</span><span class="node">interpolation + NCO/DDS</span><span class="arrow">→</span><span class="node">DAC</span><span class="arrow">→</span><span class="node">I/Q upconversion or direct RF</span><span class="arrow">→</span><span class="node">ALC + attenuator</span><span class="arrow">→</span><span class="node">RF output</span></div>

Three useful modern examples are:

- [Signal Hound VSG60A Vector Signal Generator](https://signalhound.com/products/vsg60a-6-ghz-vector-signal-generator/)
- [Keysight M9484C VXG Vector Signal Generator](https://www.keysight.com/us/en/products/signal-generators-signal-sources/vector-signal-generators/m9484c-vxg-vector-signal-generator.html)
- [Rohde & Schwarz SMW200A Vector Signal Generator](https://www.rohde-schwarz.com/products/test-and-measurement/vector-signal-generators/rs-smw200a-vector-signal-generator_63493-38656.html)

The **VSG60A** is a useful example of a compact USB-streaming vector generator in which the PC supplies I/Q data continuously while the instrument performs FPGA interpolation, DAC conversion, quadrature modulation and RF filtering. The **SMW200A** illustrates a highly integrated high-end digital-baseband + vector-modulator architecture. The **M9484C** illustrates the newer trend toward direct digital synthesis and direct-DAC RF generation.

---

For the corresponding architectures inside practical wireless transmitters and receivers, see [RF Transceiver Architectures — Interview Ready](../rf-transceiver-architectures/).

# Part I — What type of signal generator?

## 1. CW RF signal generator

A basic RF generator produces a continuous sinusoid

$$
v(t)=A\cos(2\pi f_ct+\phi).
$$

Its important jobs are

- accurate carrier frequency;
- accurate output level;
- low phase noise;
- low harmonics/spurs.

Used for

- receiver sensitivity;
- gain/compression tests;
- mixer characterization;
- antenna/RF-path checks.

---

## 2. Analog-modulated signal generator

Adds classical modulation:

- AM;
- FM;
- PM;
- pulse modulation.

Useful for legacy radios, radar, component tests, and basic receiver characterization.

---

## 3. Vector signal generator (VSG)

A VSG creates complex modulation using

$$
z(t)=I(t)+jQ(t).
$$

The RF waveform is

$$
s(t)
=
I(t)\cos(2\pi f_ct)
-
Q(t)\sin(2\pi f_ct).
$$

This allows generation of

- QPSK;
- QAM;
- OFDM;
- 5G NR;
- LTE;
- Wi-Fi;
- satellite waveforms;
- radar signals;
- arbitrary digitally modulated signals.

---

## 4. Arbitrary waveform generator versus VSG

An **AWG** directly generates arbitrary time-domain electrical waveforms from DACs.

A **VSG** is optimized for RF carrier generation and vector modulation.

Conceptually:

$$
\text{AWG}
=
\text{waveform memory}
\rightarrow
DAC
\rightarrow
\text{analog output}
$$

while

$$
\text{VSG}
=
\text{baseband / RF DSP}
\rightarrow
DAC
\rightarrow
\text{RF synthesis}
\rightarrow
\text{calibrated RF output}.
$$

Modern high-end instruments blur this distinction.

---

# Part II — Traditional modern VSG architecture

## 5. Signal path

A common vector-generator architecture is

$$
\boxed{
\begin{aligned}
\text{waveform data}
&\rightarrow
I/Q\ \text{DSP}\\
&\rightarrow
DAC_I,DAC_Q\\
&\rightarrow
\text{reconstruction filters}\\
&\rightarrow
\text{I/Q modulator}\\
&\leftarrow
\text{RF LO}\\
&\rightarrow
\text{RF gain/filter chain}\\
&\rightarrow
\text{ALC / attenuator}\\
&\rightarrow
RF\ output.
\end{aligned}
}
$$

The R&S SMW200A is a useful high-performance example of this general architecture, with internal digital baseband generation and up to multi-GHz-class I/Q modulation bandwidth depending on configuration.

---

# Part III — Frequency reference and synthesizer

## 6. Master reference

Everything depends on a stable frequency reference.

A signal generator may contain

- TCXO;
- OCXO;
- ultra-low-noise reference oscillator.

It commonly accepts an external reference such as

$$
10\ \mathrm{MHz}.
$$

The same reference can be distributed to

- signal generator;
- spectrum analyzer;
- oscilloscope;
- VNA;
- DUT clock system.

This makes coherent measurements possible.

---

## 7. PLL frequency synthesizer

A conventional RF carrier synthesizer contains

$$
\boxed{
\text{reference}
\rightarrow
\text{PFD}
\rightarrow
\text{loop filter}
\rightarrow
\text{VCO}
\rightarrow
\text{divider}.
}
$$

The PLL determines

- carrier frequency;
- tuning step;
- frequency switching time;
- close-in phase noise;
- reference-related spurs.

---

## 8. Phase noise

An ideal oscillator would have all power at $f_c$.

A real oscillator has phase fluctuations:

$$
v(t)
=
A\cos
\left(
2\pi f_ct+\phi_n(t)
\right).
$$

Phase noise is usually specified in

$$
\mathrm{dBc/Hz}
$$

at an offset from the carrier.

For example,

$$
L(10\ \mathrm{kHz})
=
-130\ \mathrm{dBc/Hz}.
$$

Low phase noise is essential for

- receiver blocking tests;
- adjacent-channel measurements;
- high-order QAM;
- radar Doppler;
- narrowband measurements.

---

## 9. Why source phase noise limits receiver tests

Suppose you generate a large blocker near a weak wanted signal.

The blocker's source phase-noise skirt can fall into the wanted channel.

Then the receiver appears worse even if the DUT itself is excellent.

Thus

$$
\boxed{
\text{generator phase noise}
<
\text{receiver test requirement}
}
$$

must be verified.

---

# Part IV — Digital waveform generation

## 10. Symbol generation

For a digitally modulated signal, the instrument may begin with information bits:

$$
b[n].
$$

These pass through

- channel coding;
- scrambling;
- symbol mapping;
- resource mapping;
- OFDM processing;
- pulse shaping.

For QAM,

$$
b[n]
\rightarrow
a_k=I_k+jQ_k.
$$

---

## 11. Pulse shaping

Single-carrier systems commonly use filters such as root-raised cosine.

The digital waveform is

$$
x(t)
=
\sum_k a_k p(t-kT).
$$

The roll-off factor controls occupied bandwidth and time-domain pulse shape.

---

## 12. OFDM generation

For OFDM-based standards such as LTE, NR and Wi-Fi,

$$
x[n]
=
\frac{1}{N}
\sum_{k=0}^{N-1}
X[k]
e^{j2\pi kn/N}.
$$

The generator creates

- subcarrier allocation;
- pilots/reference signals;
- control/data channels;
- IFFT;
- cyclic prefix;
- filtering/windowing.

A VSG therefore contains substantial standard-specific digital signal processing before any RF is generated.

---

# Part V — Arbitrary waveform memory

## 13. ARB playback

An arbitrary waveform can be stored as I/Q samples:

$$
I[n],Q[n].
$$

The generator repeatedly reads these from waveform memory.

Advantages:

- exact repeatability;
- custom signals;
- captured waveform replay;
- offline MATLAB/Python waveform generation.

Limitations:

- finite waveform memory;
- fixed playback sample rate;
- repeating sequence unless sequencing is used.

---

## 14. Real-time generation versus ARB

### ARB mode

Waveform is calculated first and replayed.

### Real-time mode

Waveform is generated continuously from an algorithm/state machine.

Real-time generation is useful for

- long pseudo-random sequences;
- live protocol behavior;
- continuously changing interferers;
- multi-signal scenarios.

Modern instruments can combine both.

---

# Part VI — Interpolation

## 15. Why interpolation is used

The waveform may initially exist at a relatively modest sample rate.

Before the DAC, digital interpolation increases sample rate:

$$
f_s'
=
L f_s.
$$

The DSP performs

$$
\boxed{
\text{upsample}
\rightarrow
\text{digital interpolation filter}.
}
$$

This moves DAC images farther away and makes analog reconstruction easier.

---

## 16. Digital interpolation filter

Conceptually,

$$
x[n]
\rightarrow
\uparrow L
\rightarrow
h[n]
\rightarrow
x_L[n].
$$

The zeros inserted during upsampling are filled through digital filtering.

Interpolation also allows flexible mapping between waveform sample rate and physical DAC sample clock.

---

# Part VII — NCO and digital upconversion

## 17. Numerically controlled oscillator

An NCO digitally generates a sinusoidal phase sequence:

$$
\phi[n+1]
=
\phi[n]
+
\Delta\phi.
$$

The frequency is

$$
f_{NCO}
=
\frac{\Delta\phi}{2\pi}f_s.
$$

An NCO can frequency-shift complex baseband without using an analog mixer.

---

## 18. Digital upconversion

Complex multiplication performs digital frequency translation:

$$
z'[n]
=
z[n]
e^{j2\pi f_0n/f_s}.
$$

This is the digital equivalent of mixing.

Modern generators use DUC to

- place carriers inside DAC bandwidth;
- create multicarrier signals;
- tune virtual signals independently;
- combine interferers digitally.

---

# Part VIII — Multiple digital carriers

## 19. Carrier summation

Several signals can be generated independently:

$$
x[n]
=
\sum_{m=1}^{M}
A_m
s_m[n]
e^{j(2\pi f_mn/f_s+\phi_m)}.
$$

This allows one generator to emulate

- wanted signal;
- adjacent interferer;
- CW blocker;
- multiple component carriers;
- multitone stimulus.

---

## 20. Keysight M9484C virtual generators

Keysight's current M9484C VXG can create up to **eight virtual signal generators per RF output** using DDS-based processing.

Each virtual signal can have independent

- frequency;
- power;
- phase;
- timing;
- modulation;
- attenuation/mute.

Keysight documents a shared digital sample rate of about

$$
3\ \mathrm{GSa/s}
$$

for this multi-signal architecture and up to 2.5 GHz modulation bandwidth per RF channel in supported configurations.

This is a useful example of how RF signal generation is becoming increasingly software-defined.

---

# Part IX — DAC

## 21. Digital-to-analog conversion

The DAC converts digital samples into voltage/current.

For an ideal DAC,

$$
V_{out}[n]
\propto
D[n].
$$

Practical limitations include

- quantization noise;
- INL/DNL;
- clock jitter;
- mismatch;
- settling;
- glitches;
- DAC images;
- finite SFDR.

See [ADC & DAC — Data Converters](../data-converters/).

---

## 22. DAC sample rate

Higher DAC sample rate allows

- wider modulation bandwidth;
- higher-frequency digital synthesis;
- greater separation of spectral images;
- simpler reconstruction filtering.

But it also increases

- digital processing throughput;
- converter power;
- clock-jitter sensitivity.

---

# Part X — Reconstruction filtering

## 23. Why filtering is required

DAC output contains spectral images near

$$
kf_s\pm f_{signal}.
$$

A reconstruction filter suppresses

- sample images;
- DAC clock feedthrough;
- unwanted Nyquist-zone content.

The filter must preserve

- amplitude flatness;
- group delay;
- modulation bandwidth.

---

# Part XI — Traditional I/Q modulator

## 24. Analog vector modulation

The classic vector modulator implements

$$
\boxed{
s(t)
=
I(t)\cos\omega_{LO}t
-
Q(t)\sin\omega_{LO}t.
}
$$

Two mixers operate in quadrature.

The outputs are summed to create an arbitrary RF phase/amplitude trajectory.

---

## 25. I/Q imbalance

If I and Q paths have different gain,

$$
G_I\neq G_Q,
$$

or phase is not exactly 90°,

$$
\phi_Q-\phi_I\neq90^\circ,
$$

the generated constellation is distorted.

Consequences:

- degraded EVM;
- image generation;
- asymmetric spectrum.

Modern generators digitally pre-correct these errors.

---

## 26. LO leakage

DC offsets in I/Q paths cause carrier leakage at the LO frequency.

Ideally, for a suppressed-carrier vector signal,

$$
I_{DC}=Q_{DC}=0.
$$

Calibration adjusts digital offsets to suppress residual LO feedthrough.

---

## 27. Image rejection

I/Q mismatch creates an unwanted mirror sideband.

Image rejection depends on

- amplitude balance;
- quadrature accuracy;
- analog path matching;
- digital correction.

This is one reason direct-DAC/DDS architectures are attractive.

---

# Part XII — Direct-DAC / DDS RF generation

## 28. Modern direct digital architecture

A newer generator can synthesize RF or high-IF waveforms largely in the digital/DAC domain.

Conceptually:

$$
\boxed{
\text{digital carriers}
\rightarrow
\text{DDS / DUC}
\rightarrow
\text{high-speed DAC}
\rightarrow
\text{RF filtering/gain}
}
$$

rather than

$$
\text{baseband DAC}
\rightarrow
\text{analog I/Q mixer}.
$$

---

## 29. Why direct DDS/DAC is attractive

Removing or reducing reliance on an analog I/Q modulator can improve

- LO feedthrough;
- image rejection;
- amplitude/phase repeatability;
- multi-signal flexibility;
- calibration stability.

Keysight explicitly describes the M9484C's DDS-based architecture as avoiding traditional I/Q-modulator distortion mechanisms for its virtual-signal-generation mode.

---

# Part XIII — RF translation and multiplier chains

## 30. Why direct DAC does not remove all RF hardware

At tens of GHz, the final output often still requires

- frequency translation;
- multiplier chains;
- filters;
- gain stages;
- mmWave modules;
- external frequency extenders.

Thus high-frequency instruments remain mixed digital/analog/microwave systems.

Keysight's M9484C covers 9 kHz to 54 GHz internally and can extend to 110 GHz using its V3080A frequency extender.

---

# Part XIV — Output level control

## 31. RF amplifier chain

After synthesis, the signal passes through

- variable gain;
- fixed gain stages;
- filters;
- switched attenuator;
- couplers/detectors.

The objective is accurate output power over a very wide range.

---

## 32. Automatic level control

An ALC loop measures a sample of output power and adjusts gain.

Conceptually:

$$
P_{set}
-
P_{meas}
\rightarrow
\text{controller}
\rightarrow
\text{gain element}.
$$

ALC improves level accuracy versus

- frequency;
- temperature;
- amplifier drift.

---

## 33. When ALC can be problematic

For very fast pulses or unusual modulation envelopes, a slow ALC loop may react incorrectly.

High-performance generators therefore provide

- ALC modes;
- hold/freeze behavior;
- pulse-specific leveling;
- calibration tables.

---

# Part XV — Step attenuator

## 34. Why the generator uses mechanical/electronic attenuation

A high-quality source must generate levels from high output power down to extremely small receiver-test signals.

The dynamic range is divided between

- digital scaling;
- analog gain;
- switched RF attenuation.

If all attenuation were done digitally, DAC noise would remain high relative to a tiny signal.

Analog output attenuation lowers signal and source noise together.

---

# Part XVI — Output power and compression

## 35. Maximum output power

Modern microwave VSGs can deliver output levels in the tens of dBm depending on frequency/options.

But maximum rated power is not always the cleanest operating point.

Near compression:

- harmonics rise;
- ACPR worsens;
- EVM degrades.

For precision modulation work, leave appropriate headroom.

---

# Part XVII — Crest factor and PAPR

## 36. OFDM peaks

OFDM has high peak-to-average power ratio:

$$
PAPR
=
10\log_{10}
\frac{P_{peak}}{P_{avg}}.
$$

A waveform with

$$
PAPR=10\ \mathrm{dB}
$$

needs 10 dB of peak headroom relative to average power to avoid clipping.

---

## 37. Digital clipping

If waveform samples exceed DAC/full-scale limits,

$$
|x[n]|>x_{FS},
$$

they clip.

Clipping produces

- EVM degradation;
- spectral regrowth;
- ACPR degradation.

The generator must scale the waveform or apply controlled crest-factor reduction.

---

## 38. Crest-factor reduction

CFR intentionally modifies peaks while trying to minimize

- EVM increase;
- spectral regrowth.

It is used in

- cellular waveform generation;
- PA testing;
- multicarrier signals.

The instrument must clearly distinguish a pristine reference waveform from one intentionally processed by CFR.

---

# Part XVIII — EVM

## 39. Source EVM

A vector generator has its own modulation error.

For reference symbols $S_k$ and generated/measured symbols $\hat S_k$,

$$
EVM_{RMS}
=
\sqrt{
\frac{\sum_k|\hat S_k-S_k|^2}
{\sum_k|S_k|^2}
}.
$$

The generator's EVM must be significantly better than the DUT requirement.

---

## 40. EVM contributors inside the generator

- DAC noise/nonlinearity;
- clock jitter;
- I/Q imbalance;
- LO leakage;
- phase noise;
- amplifier compression;
- frequency-response ripple;
- group-delay distortion.

Calibration can correct deterministic errors but cannot fully remove random noise.

---

# Part XIX — ACPR / spectral regrowth

## 41. Adjacent-channel leakage

For a communication source,

$$
ACPR
=
10\log_{10}
\frac{P_{adjacent}}
{P_{main}}.
$$

A clean generator needs low adjacent-channel energy so it does not mask distortion produced by the DUT.

This is especially important for PA characterization.

---

# Part XX — Harmonics and nonharmonic spurs

## 42. Harmonics

A nonlinear output stage creates

$$
2f_c,3f_c,4f_c,\ldots
$$

Low harmonic level is important for

- receiver testing;
- mixer tests;
- EMC;
- radar.

---

## 43. Nonharmonic spurs

Sources include

- PLL reference spurs;
- DDS truncation;
- DAC images;
- mixer products;
- digital-clock coupling;
- switching supplies.

A signal generator is never an infinitely pure mathematical source.

---

# Part XXI — Frequency switching

## 44. Tuning speed

Some applications need extremely fast switching between frequencies.

The delay can include

- PLL settling;
- filter switching;
- attenuator switching;
- gain recalibration;
- waveform switching.

Fast-hopping/EW generators may use architectures optimized to avoid slow conventional PLL retuning.

---

# Part XXII — Pulse generation

## 45. RF pulses

A pulsed RF signal is

$$
s(t)=p(t)A\cos(2\pi f_ct+\phi).
$$

Important generator specifications include

- minimum pulse width;
- rise/fall time;
- on/off ratio;
- pulse timing accuracy;
- repetition interval;
- phase coherence pulse-to-pulse.

---

## 46. Pulse shaping

A perfect rectangular pulse has very wide spectral content.

Real systems may use shaped edges to control occupied bandwidth.

Radar waveform generators may synthesize

- chirps;
- phase-coded pulses;
- pulse trains;
- staggered PRI;
- arbitrary intra-pulse modulation.

---

# Part XXIII — Chirp generation

## 47. Linear FM

A linear chirp is

$$
f(t)=f_0+kt.
$$

The phase is

$$
\phi(t)
=
2\pi
\left(
f_0t+\frac{1}{2}kt^2
\right).
$$

Modern VSGs create this digitally, allowing highly repeatable radar stimulus.

---

# Part XXIV — Noise and interferers

## 48. AWGN

A generator can digitally add noise:

$$
x[n]
=
s[n]+n[n].
$$

This allows controlled

- SNR;
- $E_b/N_0$;
- C/N.

Useful for receiver sensitivity and demodulation-performance tests.

---

## 49. Blocker generation

A receiver test may require

$$
\boxed{
\text{wanted signal}
+
\text{strong blocker}
+
\text{noise}.
}
$$

Modern multi-source/virtual-source architectures can create these in one instrument when dynamic range is sufficient.

Otherwise separate generators are combined externally.

---

# Part XXV — Fading

## 50. Channel simulation

High-end vector generators may apply digital fading:

$$
y(t)
=
\sum_{m}
h_m(t)x(t-\tau_m).
$$

This models

- multipath;
- Doppler;
- Rayleigh/Rician fading;
- MIMO channels.

The R&S SMW200A supports integrated fading configurations for communication-system testing.

---

# Part XXVI — 5G NR generation

## 51. Standards waveform generation

For NR, the VSG constructs signals consistent with 3GPP PHY definitions such as

- subcarrier spacing;
- resource blocks;
- PDSCH/PUSCH;
- PDCCH/PUCCH;
- DM-RS;
- CSI-RS;
- modulation/coding;
- TDD slot structure.

See [3GPP Standards](../3gpp-standards/) and [RF Bands](../rf-bands/).

---

## 52. Receiver sensitivity test

A simplified receiver test is

$$
\text{VSG}
\rightarrow
\text{attenuation/path}
\rightarrow
\text{DUT receiver}.
$$

The source must provide

- correct waveform;
- known power at DUT reference plane;
- low EVM;
- low phase noise;
- correct fading/noise/interferer conditions.

Cable/fixture loss must be calibrated.

---

# Part XXVII — Multi-channel and MIMO generation

## 53. Phase-coherent channels

For MIMO/beamforming, multiple outputs must maintain known relative

- phase;
- time;
- frequency.

A common reference alone may not guarantee deterministic absolute phase after arbitrary retuning.

Instruments therefore support explicit channel synchronization/alignment.

---

## 54. Beamforming test

For array element $m$,

$$
x_m(t)
=
A_mx(t)e^{j\phi_m}.
$$

A multi-channel generator can emulate

- phase progression;
- amplitude taper;
- channel impairments;
- propagation delay.

This is useful for

- phased arrays;
- AoA systems;
- MIMO receivers.

---

# Part XXVIII — Triggers and markers

## 55. Triggering

A waveform can begin in response to

- external trigger;
- internal timer;
- software command;
- another instrument.

Trigger uncertainty directly affects synchronized experiments.

---

## 56. Markers

ARB waveform memory may contain marker bits.

Markers can generate hardware timing signals associated with

- frame boundary;
- slot boundary;
- pulse;
- waveform event.

This lets oscilloscopes/analyzers/DUTs synchronize to known waveform structure.

---

# Part XXIX — Coherent test systems

## 57. Common clock

A coherent test setup may distribute

$$
10\ \mathrm{MHz}
$$

and a common trigger to several instruments.

For very precise alignment, systems may also require

- shared LO;
- phase calibration;
- deterministic triggering;
- cable-delay compensation.

---

# Part XXX — Calibration

## 58. Internal correction

A precision VSG corrects frequency-dependent errors such as

- DAC response;
- I/Q imbalance;
- LO leakage;
- gain flatness;
- filter response;
- attenuator loss;
- phase response.

The desired waveform $x$ may be digitally predistorted:

$$
x_{corr}
=
H^{-1}x
$$

over the calibrated bandwidth.

---

## 59. User-plane de-embedding

The generator's front-panel calibration plane is not necessarily the DUT input.

If the cable/fixture transfer function is

$$
H_{path}(f),
$$

the source can sometimes apply inverse correction:

$$
X_{gen}(f)
=
\frac{X_{target}(f)}{H_{path}(f)}.
$$

This flattens amplitude/phase at the DUT reference plane within practical limits.

---

# Part XXXI — Signal-generator specifications

## 60. Parameters you should know

| Parameter | Meaning | Why it matters |
|---|---|---|
| Frequency range | available carrier range | DUT bands |
| Frequency accuracy | carrier accuracy | narrowband/radar tests |
| Phase noise | noise around carrier | blocking, EVM, radar |
| Residual FM/PM | random modulation | narrowband quality |
| Max output power | highest available level | compression/drive |
| Level range | usable output dynamic range | sensitivity/blocking |
| Level accuracy | actual versus set power | calibrated receiver tests |
| Harmonics | integer-multiple spurs | spectral purity |
| Nonharmonic spurs | unrelated unwanted tones | receiver tests |
| Modulation bandwidth | maximum I/Q/RF waveform BW | NR/Wi-Fi/radar |
| EVM | modulation fidelity | high-order QAM |
| ACPR/ACLR | adjacent spectral purity | PA/receiver tests |
| DAC/sample rate | digital generation capability | bandwidth/Nyquist |
| Waveform memory | ARB duration | long/custom signals |
| Switching speed | retune speed | hopping/EW |
| Pulse rise/fall | pulse fidelity | radar |
| Channel coherence | relative phase/time between outputs | MIMO/beamforming |

---

# Part XXXII — Current instrument examples

## 61. Keysight M9484C VXG

Keysight's current VXG family illustrates a highly digital architecture.

Representative published capabilities include

- 9 kHz to 54 GHz internally;
- extension to 110 GHz with V3080A;
- up to 2.5 GHz modulation bandwidth per channel, with wider bonded configurations;
- multi-channel coherent operation;
- DDS-based multi-signal generation;
- up to eight virtual signals per RF output.

Keysight's current technical overview lists approximately -132 dBc/Hz phase noise at 10 GHz carrier / 10 kHz offset for a representative M9484C configuration and measured 5G EVM as low as about 0.35% under the stated 100 MHz / 28 GHz condition.

Official references:

- [VXG Series Technical Overview](https://www.keysight.com/us/en/assets/3122-1440/technical-overviews/VXG-Series-Microwave-Signal-Generators.pdf)
- [M9484C VXG Data Sheet](https://www.keysight.com/us/en/assets/3122-1445/data-sheets/M9484C-VXG-and-V3080A.pdf)
- [8 Virtual Signal Generators on the M9484C](https://www.keysight.com/zz/en/assets/3126-1334/application-notes/8-Virtual-Signal-Generators-on-the-M9484C.pdf)

---

## 62. Rohde & Schwarz SMW200A

The SMW200A illustrates the highly integrated vector-baseband approach.

R&S documents

- frequency coverage up to 67 GHz depending on configuration;
- optional second RF path;
- up to 2 GHz internal I/Q modulation bandwidth in supported configurations;
- multiple digital/baseband signal sources;
- MIMO/fading capabilities;
- standard-specific generation for NR/LTE/WLAN/GNSS and other systems.

Official references:

- [SMW200A User Manual](https://www.rohde-schwarz.com/us/manual/rs-smw200a-user-manual_78701-61762.html)
- [SMW200A Specifications](https://www.rohde-schwarz.com/us/products/test-and-measurement/vector-signal-generators/rs-smw200a-vector-signal-generator_63493-38656.html)

---

## 63. Signal Hound VSG60A

The **Signal Hound VSG60A** is a compact, USB-powered vector signal generator covering a specified RF range of

$
50\ \mathrm{MHz}\le f_{RF}\le6\ \mathrm{GHz},
$

with operation usable down to approximately 30 MHz at reduced specification margin.

Its design is especially useful for understanding a modern **PC-streaming VSG architecture** because Signal Hound documents the internal signal path in unusual detail.

### VSG60A functional chain

$
\boxed{
\begin{aligned}
\text{PC waveform / I/Q}
&\rightarrow
\text{USB 3.0}\\
&\rightarrow
\text{FPGA}\\
&\rightarrow
\text{digital upsampling}\\
&\rightarrow
\text{dual-channel I/Q DAC}\\
&\rightarrow
\text{reconstruction filter}\\
&\rightarrow
\text{quadrature modulator}\\
&\rightarrow
\text{RF gain / attenuation}\\
&\rightarrow
\text{harmonic filter}\\
&\rightarrow
\text{RF output}.
\end{aligned}
}
$

This architecture is different from a large bench VSG that stores and synthesizes everything internally. The VSG60A can continuously stream custom waveform samples from the host computer, so waveform length is not strongly limited by an internal ARB-memory depth.

### Main specifications

| Parameter | VSG60A |
|---|---:|
| Specified RF range | 50 MHz–6 GHz |
| Usable low-frequency range | down to ~30 MHz |
| Streaming modulation bandwidth | **40 MHz** |
| User I/Q sample rate | **12.5 kS/s–51.2 MS/s** |
| Nominal calibrated amplitude range | **−55 to +7 dBm** |
| Extended digital/reduced-performance range | roughly −85 to +10 dBm |
| Queued frequency-hop settling | **200 µs** |
| External reference | **10 MHz input** |
| Trigger | synchronized 3.3 V trigger output |
| Interface | USB 3.0 |
| Typical power consumption | ~6 W |
| Typical EVM example | **0.3%** at 1 GHz, 1 MS/s 16-QAM |
| Typical phase noise @ 1 GHz, 10 kHz offset | about **−125 dBc/Hz** |
| Typical non-harmonic spurs | ~−50 dBc for many conditions |
| Typical harmonics | ~−35 dBc |

### FPGA interpolation

Signal Hound documents PC-to-FPGA I/Q rates of roughly

$
22\text{–}51.2\ \mathrm{MS/s},
$

depending on configuration.

Inside the FPGA the stream is digitally upsampled by a factor of approximately

$
L=2\ \text{or}\ 3.
$

The dual-channel DAC then operates over roughly

$
66\text{–}102.4\ \mathrm{MS/s}.
$

This lets the instrument use one optimized reconstruction-filter architecture while still supporting many user-selected baseband sample rates.

Conceptually,

$
I[n],Q[n]
\rightarrow
\uparrow L
\rightarrow
\text{interpolation filter}
\rightarrow
DAC_I,DAC_Q.
$

Signal Hound specifies better than roughly 60 dB typical rejection of aliased baseband products from this reconstruction approach.

### Two quadrature-modulator paths

At the heart of the RF conversion are **two quadrature modulators**.

One is used primarily below about 2 GHz, while another handles the higher-frequency range, with a small architecture-dependent overlap region.

This gives the VSG60A a conventional vector-modulator structure:

$
s(t)
=
I(t)\cos\omega_{LO}t
-
Q(t)\sin\omega_{LO}t.
$

The important point is that the instrument does **not** directly synthesize the full 6 GHz carrier with the DAC. The DAC produces calibrated I/Q baseband, and analog quadrature modulation moves that waveform to RF.

### LO architecture

The local oscillator uses a low-phase-noise synthesizer.

Signal Hound documents approximately

$
L(10\ \mathrm{kHz})
\approx
-125\ \mathrm{dBc/Hz}
$

typical at a 1 GHz carrier.

Below about 2 GHz, the LO can operate at twice the RF frequency and then be digitally divided to create quadrature.

At higher frequencies, a polyphase network generates the quadrature LO signals used by the mixers.

The LO can switch frequency and settle in approximately

$
200\ \mu\mathrm{s},
$

which makes the VSG60A useful for frequency-hopping and stepped-frequency signals.

### Digital tuning / low-spur mode

The VSG60A uses a fractional-N PLL.

Fractional-N synthesis can create

- fractional spurs;
- integer-boundary spurs;
- close-in discrete products.

Signal Hound's low-spur mode deliberately places the analog LO on a nearby coarse frequency and performs the final fine-frequency correction digitally.

Conceptually,

$
f_{RF}
=
f_{LO,coarse}
+
f_{digital}.
$

This provides extremely fine tuning resolution while moving predictable PLL spurs away from the desired carrier.

With digital tuning disabled, the LO itself provides approximately 1/6-Hz frequency resolution.

### Frequency and amplitude commands in the I/Q stream

One particularly useful implementation detail is that frequency and amplitude commands can be embedded in the same streamed command/data sequence as the I/Q waveform.

This allows deterministic transitions between

- waveform blocks;
- RF frequency;
- output amplitude.

The FPGA can coordinate streamed I/Q with fast LO and attenuator changes, which is useful for

- frequency hopping;
- stepped sweeps;
- burst testing;
- automated receiver tests.

### RF level control

After the I/Q modulators, the VSG60A provides a combination of RF gain and attenuation.

Signal Hound documents approximately

- up to 20 dB gain;
- up to 50 dB attenuation;
- 2 dB hardware steps.

Fine level control is then applied digitally with approximately

$
0.01\ \mathrm{dB}
$

resolution.

The software normally selects the hardware gain/attenuation state automatically.

This illustrates an important VSG principle:

$
\boxed{
\text{coarse analog gain/attenuation}
+
\text{fine digital scaling}
}
$

provides a much larger usable output range than digital scaling alone.

### Harmonic filtering

A bank of RF harmonic filters follows the modulator/amplifier chain.

The purpose is to suppress

$
2f_c,\ 3f_c,\ldots
$

and other out-of-band conversion products before the RF output connector.

This is the signal-generator equivalent of preselection/filtering in a spectrum analyzer.

### Internal and external reference

The internal frequency system ultimately derives from a 10 MHz VCTCXO-based reference.

The VSG60A also accepts an external

$
10\ \mathrm{MHz}
$

reference.

A common lab configuration is therefore

$
\boxed{
10\ \mathrm{MHz\ reference}
\rightarrow
\begin{cases}
\text{VSG60A}\\
\text{BB60D / SP145}\\
\text{oscilloscope / other RF instruments}
\end{cases}
}
$

so the stimulus and measurement instruments share a common frequency basis.

### Trigger output

The VSG60A provides a synchronized 3.3 V trigger output.

The trigger can mark events such as

- waveform start;
- pulse/burst timing;
- hopping events;
- synchronized analyzer acquisition.

This is useful when coordinating the VSG60A with a spectrum analyzer, oscilloscope, digitizer or DUT.

### Continuous I/Q streaming

One of the VSG60A's biggest practical strengths is the ability to stream custom I/Q continuously from a PC at arbitrary sample rates up to approximately

$
51.2\ \mathrm{MS/s}.
$

This supports custom generation workflows from

- C/C++;
- MATLAB;
- Python through an appropriate wrapper/application layer;
- binary I/Q files;
- CSV I/Q files.

Signal Hound supplies an SDK as well as C++ and MATLAB examples.

### Supported waveform types

The supplied software supports a broad range of waveform types, including

- CW;
- AM/FM;
- pulse;
- multitone;
- sweep/chirp;
- AWGN;
- FSK/GFSK;
- ASK/OOK;
- MSK/GMSK;
- PSK;
- QPSK;
- 16/64/256/1024-QAM;
- custom OFDM;
- LTE;
- 802.11a/n/ac/ax;
- Bluetooth LE;
- arbitrary/custom I/Q.

Digital impairments can also be deliberately introduced, including

- AWGN;
- I/Q offset/imbalance;
- frequency offset;
- level offset;
- sample-rate error;
- custom channel response;
- spectrum inversion.

This makes the VSG60A useful not only as a clean source but also as a **controlled impairment generator**.

### Modulation quality

A representative Signal Hound specification is approximately

$
EVM_{RMS}\approx0.3\%
$

typical for a 1 GHz carrier with 1 MS/s 16-QAM under the stated raised-cosine test condition.

For a QPSK 4 MS/s / 5 MHz-channel test, published ACPR is approximately

$
<-50\ \mathrm{dBc}
$

below 3 GHz, with typical performance around −55 dBc, and approximately

$
<-40\ \mathrm{dBc}
$

from 3–6 GHz, with typical performance around −45 dBc.

These numbers are important because source modulation quality must be comfortably better than the DUT requirement when the VSG60A is used for receiver or PA characterization.

### Output linearity

The VSG60A is USB powered, so there is a deliberate trade between

- output power;
- power consumption;
- linearity.

Signal Hound notes that the best modulation linearity is generally obtained around

$
P_{out}\lesssim -10\ \mathrm{dBm}.
$

At high output levels—especially above about 3 GHz—compression and intermodulation become more important.

For a test needing both high output power and excellent EVM/ACPR, a clean external amplifier may therefore be preferable to running the VSG60A close to its maximum output.

### VSG60A + Signal Hound analyzer

A particularly natural low-cost test system is

$
\boxed{
\text{VSG60A}
\rightarrow
\text{DUT}
\rightarrow
\text{BB60D / SP145}.
}
$

With a shared 10 MHz reference, this arrangement can support

- gain/compression tests;
- receiver sensitivity;
- blocking;
- frequency-response sweeps;
- custom I/Q stimulus;
- ACPR;
- modulation experiments;
- frequency hopping;
- automated RF characterization.

The VSG60A should therefore be thought of as a **compact streaming vector source**, while the BB60D/SP145 acts as the corresponding digitizing spectrum/vector receiver.

### Where the VSG60A fits

| Instrument | Best mental model |
|---|---|
| **VSG60A** | compact USB VSG, 6 GHz, 40 MHz modulation, custom streamed I/Q |
| **R&S SMW200A** | high-end integrated VSG with very wide modulation/fading/MIMO capabilities |
| **Keysight M9484C VXG** | high-end microwave VSG with DDS/direct-DAC and multi-virtual-source architecture |

The VSG60A is especially attractive when the requirement is **custom sub-6-GHz waveform generation, automation, long streamed I/Q sequences, hopping, and moderate-cost RF experimentation**, rather than multi-GHz instantaneous modulation bandwidth or mmWave output.

Official references:

- [Signal Hound VSG60A product page](https://signalhound.com/products/vsg60a-6-ghz-vector-signal-generator/)
- [VSG60A Product Manual](https://signalhound.com/sigdownloads/VSG60/VSG60A-Product-Manual.pdf)
- [VSG60A Data Sheet](https://signalhound.com/sigdownloads/datasheets/VSG60A-data-sheet.pdf)
- [VSG60 / VSG200 Downloads and SDK](https://signalhound.com/support/product-downloads/vsg60a-downloads/)

---

# Part XXXIII — Signal generator and spectrum analyzer together

## 64. Complementary instruments

A useful mental pair is

$$
\boxed{
\text{Signal generator}
=
\text{known stimulus}
}
$$

and

$$
\boxed{
\text{Spectrum/vector analyzer}
=
\text{measured response}.
}
$$

A common test is

$$
\text{VSG}
\rightarrow
\text{DUT}
\rightarrow
\text{VSA}.
$$

This allows measurement of

- gain;
- compression;
- EVM;
- ACPR;
- harmonics;
- receiver sensitivity;
- blocking;
- intermodulation.

See [Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/).

---

# Part XXXIV — What the set frequency/power really means

## 65. A setpoint is the end of a long processing chain

When you request:

> 3.5 GHz, -50 dBm, 100 MHz NR waveform

the instrument may perform

$$
\boxed{
\begin{aligned}
&\text{NR frame construction}\
&\rightarrow
\text{OFDM / IFFT}\
&\rightarrow
\text{CFR / impairments}\
&\rightarrow
\text{interpolation}\
&\rightarrow
\text{NCO / DUC}\
&\rightarrow
\text{DAC}\
&\rightarrow
\text{RF synthesis}\
&\rightarrow
\text{filtering}\
&\rightarrow
\text{gain / attenuation}\
&\rightarrow
\text{ALC / calibration}.
\end{aligned}
}
$$

The displayed number is therefore the calibrated result of digital, analog and RF processing.

---

# Part XXXV — Practical measurement guidance

## 66. Generating a clean CW tone

Use

- CW mode;
- appropriate reference level/output level;
- low-phase-noise mode if available;
- external reference if frequency coherence matters;
- enough warm-up/calibration.

Verify with a spectrum analyzer whose phase noise and spur performance are better than the measurement target.

---

## 67. Receiver sensitivity test

Use

- calibrated output power;
- path-loss correction;
- low source EVM;
- correct waveform configuration;
- appropriate fading/noise if specified.

If DUT sensitivity is near -100 dBm, generator residual noise/spurs and external leakage become important.

---

## 68. Blocking test

The blocker can be tens of dB stronger than the desired signal.

Source requirements become severe:

- excellent phase noise;
- low harmonics;
- low broadband noise;
- good isolation between generators.

Otherwise the **test source**, not the DUT, determines the result.

---

## 69. PA test

For PA characterization, the generator must be cleaner than the PA.

Measure source EVM/ACPR directly before connecting the DUT.

A common chain is

$$
\text{VSG}
\rightarrow
\text{PA}
\rightarrow
\text{attenuator}
\rightarrow
\text{VSA}.
$$

---

# Part XXXVI — Ten concepts to remember

## 70. Core ideas

1. carrier generation starts from a precision frequency reference;
2. vector modulation is complex I/Q;
3. interpolation increases digital sample rate before the DAC;
4. an NCO/DDS performs digital frequency translation;
5. the DAC defines much of bandwidth and dynamic performance;
6. traditional VSGs use analog I/Q upconversion;
7. newer architectures increasingly use direct DDS/direct-DAC synthesis;
8. ALC and step attenuation set accurate output level;
9. source EVM, ACPR, phase noise and spurs must be better than the DUT;
10. coherent multi-channel generation requires clock, trigger and phase alignment.

---

## 71. Modern signal-generator mental model

$$
\boxed{
\begin{aligned}
\text{reference}
&\rightarrow
\text{PLL / clock tree}\\
\text{bits / waveform}
&\rightarrow
\text{DSP / ARB}\\
&\rightarrow
\text{interpolation / NCO / DDS}\\
&\rightarrow
\text{high-speed DAC}\\
&\rightarrow
\text{I/Q modulator or direct RF synthesis}\\
&\rightarrow
\text{filters / gain}\\
&\rightarrow
\text{ALC / attenuator}\\
&\rightarrow
\text{calibrated RF output}.
\end{aligned}
}
$$

That is the signal-generation counterpart to the modern real-time spectrum analyzer.

---

# References

## Signal Hound

- [VSG60A Product Page](https://signalhound.com/products/vsg60a-6-ghz-vector-signal-generator/)
- [VSG60A Product Manual](https://signalhound.com/sigdownloads/VSG60/VSG60A-Product-Manual.pdf)
- [VSG60A Data Sheet](https://signalhound.com/sigdownloads/datasheets/VSG60A-data-sheet.pdf)
- [VSG60/VSG200 Software and SDK Downloads](https://signalhound.com/support/product-downloads/vsg60a-downloads/)

## Keysight

- [VXG Series Microwave Signal Generators](https://www.keysight.com/us/en/assets/3122-1440/technical-overviews/VXG-Series-Microwave-Signal-Generators.pdf)
- [M9484C VXG and V3080A Data Sheet](https://www.keysight.com/us/en/assets/3122-1445/data-sheets/M9484C-VXG-and-V3080A.pdf)
- [8 Virtual Signal Generators on the M9484C](https://www.keysight.com/zz/en/assets/3126-1334/application-notes/8-Virtual-Signal-Generators-on-the-M9484C.pdf)

## Rohde & Schwarz

- [R&S SMW200A User Manual](https://www.rohde-schwarz.com/us/manual/rs-smw200a-user-manual_78701-61762.html)
- [R&S SMW200A Specifications](https://www.rohde-schwarz.com/us/products/test-and-measurement/vector-signal-generators/rs-smw200a-vector-signal-generator_63493-38656.html)

## Related pages

[Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/) · [Measurements & Instruments](../measurements/) · [ADC & DAC](../data-converters/) · [RF & Microwave](../rf-microwave/) · [3GPP Standards](../3gpp-standards/) · [RF Bands](../rf-bands/) · [AESA & Phased Arrays](../aesa/)
