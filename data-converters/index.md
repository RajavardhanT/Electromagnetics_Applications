---
layout: default
title: ADC & DAC — Data Converters
description: Practical reference for learning ADCs and DACs: architectures, sampling, quantization, static and dynamic specifications, ENOB, SNR, SINAD, SFDR, INL/DNL, jitter, settling, RF data converters, clocking, JESD204, measurement, selection, and recent reviews.
---

# ADC & DAC — Data Converters

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Digital_Analog_Converter.jpg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Digital_Analog_Converter.jpg?width=1100" alt="Digital-to-analog converter board illustrating the transition between digital logic and analog signals." loading="lazy"></a>
  <figcaption>Data converters sit at the boundary between analog physical signals and digital processing. <a href="https://commons.wikimedia.org/wiki/File:Digital_Analog_Converter.jpg">Image source: Wikimedia Commons</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>An <strong>ADC</strong> answers “what analog value was present when I sampled?” A <strong>DAC</strong> answers “what analog waveform should these digital codes create?” The real engineering problem is not just number of bits. It is the combined trade among <strong>bandwidth, sampling rate, noise, distortion, linearity, clock quality, latency, power, and architecture</strong>.</div>

<div class="pathway"><span class="node">analog input</span><span class="arrow">→</span><span class="node">sample / hold</span><span class="arrow">→</span><span class="node">ADC</span><span class="arrow">→</span><span class="node">DSP / FPGA</span><span class="arrow">→</span><span class="node">DAC</span><span class="arrow">→</span><span class="node">analog output</span></div>

# Part I — Core ideas

## 1. What an ADC does

An ideal ADC maps a continuous input voltage into one of

$$
2^N
$$

digital codes.

For an ideal unipolar converter with full-scale range $V_{FS}$,

$$
\boxed{
LSB
=
\frac{V_{FS}}{2^N}
}
$$

where $N$ is resolution in bits.

A 12-bit converter over 4.096 V has

$$
LSB=1\ \mathrm{mV}.
$$

The ADC performs two conceptually separate operations:

1. **sampling** in time;
2. **quantization** in amplitude.

---

## 2. What a DAC does

A DAC maps a digital code into an analog voltage or current.

For an ideal $N$-bit unipolar DAC,

$$
V_{out}
\approx
V_{FS}\frac{D}{2^N}
$$

where $D$ is the input code.

A practical DAC must additionally deal with

- element mismatch;
- switching timing;
- glitches;
- finite output impedance;
- settling;
- output filtering;
- clock jitter.

---

# Part II — Sampling and quantization

## 3. Nyquist sampling theorem

For a signal strictly bandlimited to $B$,

$$
\boxed{
f_s>2B
}
$$

is the minimum ideal sampling requirement.

The interval

$$
0<f<\frac{f_s}{2}
$$

is the first Nyquist zone.

Sampling below the required rate causes **aliasing**.

---

## 4. Aliasing

Sampling replicates the input spectrum around integer multiples of $f_s$.

A tone at $f_{in}$ can alias into baseband at frequencies of the form

$$
f_{alias}
=
|f_{in}-kf_s|.
$$

This is why ADC systems require an **anti-alias filter** before conversion.

RF ADCs can intentionally use higher Nyquist zones, but the alias mapping must be designed rather than accidental.

---

## 5. Quantization noise

For an ideal ADC with quantization step $\Delta$,

$$
\sigma_q^2
=
\frac{\Delta^2}{12}.
$$

For a full-scale sine wave, the famous ideal SNR relation is

$$
\boxed{
SNR_{ideal}
\approx
6.02N+1.76\ \mathrm{dB}.
}
$$

This does **not** mean every $N$-bit ADC achieves that SNR.

---

# Part III — ADC specifications you need to know

## 6. ADC parameter table

| Parameter | Meaning | Why it matters |
|---|---|---|
| **Resolution, $N$** | number of output bits | number of available codes |
| **Sample rate, $f_s$** | conversions per second | maximum signal bandwidth / processing rate |
| **Analog input bandwidth** | front-end bandwidth | may exceed Nyquist frequency |
| **Input full scale** | maximum input range | sets sensitivity and overload margin |
| **SNR** | signal / integrated noise | noise-limited performance |
| **SINAD / SNDR** | signal / noise + distortion | combines noise and nonlinear distortion |
| **ENOB** | effective resolution from SINAD | realistic “useful bits” |
| **SFDR** | signal / largest spur | critical in RF and spectral measurement |
| **THD** | harmonic distortion | converter linearity |
| **INL** | deviation from ideal transfer line | absolute/static linearity |
| **DNL** | code-width error | monotonicity / missing-code behavior |
| **Offset error** | transfer-function shift | DC accuracy |
| **Gain error** | slope error | full-scale accuracy |
| **Aperture jitter** | sample-time uncertainty | limits high-frequency SNR |
| **Latency** | sample → output delay | feedback/control implications |
| **Power** | converter dissipation | thermal/system constraint |
| **Input impedance** | load seen by source | driver/filter design |
| **Common-mode range** | required input bias | ADC-driver compatibility |

---

## 7. SINAD / SNDR

SINAD is

$$
\boxed{
SINAD
=
10\log_{10}
\left(
\frac{P_{signal}}
{P_{noise}+P_{distortion}}
\right).
}
$$

Unlike SNR, it includes harmonic distortion.

For converter comparison, SINAD is often more useful than nominal bit count.

---

## 8. ENOB

Effective number of bits is commonly estimated from sine-wave SINAD:

$$
\boxed{
ENOB
=
\frac{SINAD-1.76}{6.02}.
}
$$

Example:

If

$$
SINAD=62\ \mathrm{dB},
$$

then

$$
ENOB\approx10.0\ \mathrm{bits}.
$$

A “14-bit ADC” may therefore provide only about 10–12 effective bits at high input frequency.

---

## 9. SFDR

Spurious-free dynamic range is the ratio of the desired tone to the largest undesired spectral component:

$$
\boxed{
SFDR
=
P_{signal}-P_{largest\ spur}.
}
$$

It is especially important for

- RF receivers;
- spectrum analysis;
- radar;
- communications;
- instrumentation.

A converter can have good SNR but poor SFDR.

---

## 10. THD

Total harmonic distortion combines harmonics:

$$
THD
=
10\log_{10}
\left(
\frac{P_2+P_3+\cdots}
{P_1}
\right).
$$

In high-speed converters, distortion often depends strongly on input frequency and amplitude.

---

## 11. DNL

Differential nonlinearity measures the width of each code step relative to 1 LSB:

$$
DNL_k
=
\frac{V_{k+1}-V_k}{LSB_{ideal}}-1.
$$

If

$$
DNL<-1\ \mathrm{LSB},
$$

a code can be missing.

---

## 12. INL

Integral nonlinearity is the deviation of the actual ADC transfer curve from the ideal reference line.

INL matters strongly for

- precision measurement;
- DC instrumentation;
- control systems.

It is less directly informative than SFDR for high-frequency RF applications.

---

## 13. Offset and gain error

Offset error shifts the transfer curve.

Gain error changes its slope.

These are often calibratable.

INL and DNL reflect deeper transfer-function imperfections that are not removed by simple two-point calibration.

---

# Part IV — Clock jitter

## 14. Aperture jitter

The sample does not occur at an infinitely precise instant.

For a sinusoidal input, clock-jitter-limited SNR is approximately

$$
\boxed{
SNR_{jitter}
=
-20\log_{10}
(2\pi f_{in}\sigma_t)
}
$$

where

- $f_{in}$ is input frequency;
- $\sigma_t$ is RMS sampling jitter.

---

## 15. Example: jitter requirement

Suppose

$$
f_{in}=1\ \mathrm{GHz}
$$

and

$$
\sigma_t=100\ \mathrm{fs}.
$$

Then

$$
SNR_{jitter}
\approx64\ \mathrm{dB}.
$$

At RF/microwave input frequencies, tens of femtoseconds can matter.

This is why converter performance is inseparable from **clock performance**.

---

# Part V — ADC architectures

## 16. Flash ADC

A flash ADC uses approximately

$$
2^N-1
$$

comparators.

### Advantages

- extremely fast;
- very low latency.

### Limitations

- large power;
- large area;
- comparator mismatch grows rapidly with resolution.

Typical use: very high speed, modest resolution.

---

## 17. SAR ADC

A successive-approximation-register ADC performs a binary search.

A common internal structure is

$$
\boxed{
\text{sample/hold}
+
\text{comparator}
+
\text{DAC}
+
\text{SAR logic}.
}
$$

Each comparison determines one bit.

### Advantages

- excellent energy efficiency;
- moderate/high resolution;
- simple scaling with CMOS.

### Limitations

- conversion requires several comparison steps;
- comparator/DAC settling constrains speed.

SAR is one of the most important modern ADC architectures.

---

## 18. Pipeline ADC

A pipeline ADC resolves a few bits per stage and passes a residue to the next stage.

Conceptually,

$$
\text{coarse decision}
\rightarrow
\text{DAC subtraction}
\rightarrow
\text{residue amplification}
\rightarrow
\text{next stage}.
$$

### Advantages

- high sample rate;
- medium/high resolution.

### Limitations

- latency;
- amplifier accuracy;
- calibration complexity.

Pipeline/SAR hybrids are now common.

---

## 19. Delta-sigma ADC

Delta-sigma conversion uses

- oversampling;
- feedback;
- quantization;
- noise shaping;
- digital filtering.

Quantization noise is shaped away from the signal band.

### Advantages

- very high resolution;
- excellent low-frequency precision.

### Limitations

- lower signal bandwidth;
- digital-filter latency.

Typical applications:

- audio;
- precision sensors;
- instrumentation.

---

## 20. Noise-shaping SAR

Noise-shaping SAR combines SAR conversion with loop/filter behavior that shapes quantization noise.

This architecture has become an important bridge between

- SAR energy efficiency;
- delta-sigma noise shaping.

It is a major topic in recent converter research.

---

## 21. Time-interleaved ADC

Several ADC cores operate in parallel:

$$
f_s
=
M f_{sub}.
$$

For $M$ channels, each converter samples every $M$th input sample.

This enables very high aggregate rates.

Main problems:

- offset mismatch;
- gain mismatch;
- timing skew;
- bandwidth mismatch.

These produce deterministic spurs and often require background calibration.

---

## 22. Time-domain ADC

Instead of representing the analog variable primarily as voltage/current, time-domain converters encode it in

- delay;
- pulse width;
- phase;
- oscillator frequency.

This is increasingly attractive in scaled CMOS because digital timing resolution improves as transistor speed increases.

Recent IEEE literature treats time-domain conversion as a major emerging complement to conventional voltage-domain ADCs.

---

# Part VI — ADC architecture comparison

## 23. ADC architecture table

| Architecture | Speed | Resolution | Power efficiency | Latency | Typical role |
|---|---|---|---|---|---|
| Flash | very high | low–medium | poor–moderate | extremely low | very-high-speed front ends |
| SAR | medium–high | medium–high | excellent | low | sensors, instrumentation, RF |
| Pipeline | high | medium–high | moderate | moderate/high | communications, IF/RF |
| ΔΣ | low–medium BW | very high | excellent in-band | high | audio, precision |
| Noise-shaping SAR | medium | high | very good | moderate | modern precision/wideband |
| Time-interleaved | extremely high | depends on sub-ADC | moderate | architecture-dependent | RF/direct sampling |
| Time-domain | emerging/high | architecture-dependent | promising in scaled CMOS | varies | advanced integrated converters |

---

# Part VII — DAC specifications

## 24. DAC parameter table

| Parameter | Meaning | Why it matters |
|---|---|---|
| **Resolution** | number of input bits | ideal amplitude granularity |
| **Update/sample rate** | digital codes processed per second | output bandwidth |
| **Full-scale output** | max voltage/current | driver/interface design |
| **INL** | static transfer linearity | waveform/DC accuracy |
| **DNL** | step-size error | monotonicity |
| **Monotonicity** | output never reverses for increasing code | control applications |
| **Settling time** | time to reach final value | waveform/control speed |
| **Glitch impulse** | transient during code change | spectral purity |
| **SFDR** | desired tone to largest spur | RF transmitter quality |
| **SNR / NSD** | converter noise | dynamic range |
| **Output compliance** | allowed output voltage range | current-steering DAC operation |
| **Output impedance** | source impedance | reconstruction/filter/driver design |
| **Latency** | digital input → analog output delay | synchronization |
| **Clock jitter** | output timing uncertainty | high-frequency spectral purity |
| **Power** | converter dissipation | thermal/system design |

---

# Part VIII — DAC architectures

## 25. Resistor-string DAC

A resistor string creates multiple reference voltages and selects one.

### Advantages

- monotonic;
- simple.

### Limitations

- requires many resistors/switches at high resolution;
- limited speed.

---

## 26. R–2R ladder DAC

An R–2R network uses only two resistor values.

### Advantages

- compact conceptual architecture;
- easy binary scaling.

### Limitations

- matching and switching parasitics limit high-resolution/high-speed behavior.

---

## 27. Capacitive DAC

A binary-weighted capacitor array can implement charge redistribution.

This architecture is central inside SAR ADCs and also useful as a standalone DAC.

Matching and parasitic capacitance determine precision.

---

## 28. Current-steering DAC

High-speed DACs commonly use matched current cells switched to the output.

The output current is

$$
I_{out}
=
\sum_k b_k I_k.
$$

### Advantages

- very high speed;
- natural differential output;
- excellent for RF/direct synthesis.

### Limitations

- current-source mismatch;
- finite output resistance;
- switching timing;
- glitches;
- code-dependent distortion.

Current-steering is the dominant architecture in recent high-speed DAC review literature.

---

## 29. Segmentation

A DAC can mix

- binary-weighted elements;
- thermometer/unary elements.

The MSBs are often thermometer coded to reduce major-carry glitches.

The LSBs may remain binary weighted to save area.

This is called **segmentation**.

---

## 30. Dynamic element matching

Dynamic element matching (DEM) rotates or scrambles physical DAC elements so mismatch becomes noise-like rather than deterministic distortion.

This is common in high-precision and noise-shaped DACs.

---

## 31. Digital predistortion

Modern high-speed DACs increasingly use digital correction for

- amplitude mismatch;
- timing skew;
- output-impedance distortion;
- frequency response.

This is part of the broader trend toward **digitally assisted analog**.

---

# Part IX — DAC settling and glitch

## 32. Settling time

After a code transition, the output does not immediately reach its final value.

Settling includes

- slew;
- ringing;
- RC time constants;
- amplifier settling.

A common specification is time to settle within

$$
\pm0.5\ \mathrm{LSB}.
$$

---

## 33. Glitch impulse

During a multi-bit transition, switches do not change simultaneously.

Example:

$$
0111\rightarrow1000.
$$

Many bits switch at once.

Temporary incorrect current/voltage creates a **glitch**.

This is important for

- precision control;
- arbitrary waveform generation;
- RF spectral purity.

---

# Part X — Reconstruction

## 34. DAC output spectrum

A sampled DAC output contains spectral images at

$$
kf_s\pm f_{signal}.
$$

Therefore the output generally requires a **reconstruction filter**.

A zero-order-hold DAC also produces the familiar envelope

$$
H(f)
=
\frac{\sin(\pi f/f_s)}
{\pi f/f_s}
e^{-j\pi f/f_s}.
$$

This creates sinc roll-off at higher frequencies.

---

## 35. Nyquist zones and RF DACs

High-speed DACs can intentionally synthesize signals in higher Nyquist zones.

Modern RF DAC systems may use

- digital upconversion;
- interpolation;
- NCOs;
- mixers inside the converter;
- direct-RF output.

This can remove analog IF stages from the transmitter.

---

# Part XI — RF data converters

## 36. Traditional versus direct-RF receiver

Traditional architecture:

$$
\text{RF}
\rightarrow
\text{mixer}
\rightarrow
\text{IF}
\rightarrow
\text{ADC}.
$$

Direct-RF architecture:

$$
\boxed{
\text{RF}
\rightarrow
\text{ADC}
\rightarrow
\text{digital downconversion}.
}
$$

The direct-RF approach simplifies the analog chain but demands an ADC with high

- sample rate;
- analog bandwidth;
- SFDR;
- clock quality.

---

## 37. Direct-RF transmitter

Traditional:

$$
\text{DAC}
\rightarrow
\text{IF mixer}
\rightarrow
\text{RF}.
$$

Direct-RF:

$$
\boxed{
\text{digital waveform}
\rightarrow
\text{RF DAC}
\rightarrow
\text{filter / PA}.
}
$$

The DAC now becomes part of the RF signal-generation chain.

---

# Part XII — Converter interfaces

## 38. Parallel CMOS and LVDS

Lower-speed converters can use parallel CMOS.

Faster converters often use LVDS because it reduces

- simultaneous switching;
- pin swing;
- EMI.

However, very high-speed multi-channel converters create too many parallel data lanes.

---

## 39. JESD204

High-speed RF converters commonly use **JESD204** serial links.

The conceptual chain is

$$
\text{ADC/DAC}
\leftrightarrow
\text{JESD204 SerDes}
\leftrightarrow
\text{FPGA / SoC}.
$$

Important concepts include

- lane rate;
- number of lanes;
- framing;
- deterministic latency;
- device clock;
- SYSREF;
- synchronization.

This connects directly to [High-Speed SerDes & IO](../high-speed-serdes/).

---

# Part XIII — Clock and power architecture

## 40. Clock tree

A converter system may contain

$$
\text{reference oscillator}
\rightarrow
\text{jitter cleaner / PLL}
\rightarrow
\text{ADC / DAC clock}
\rightarrow
\text{FPGA clock}.
$$

At RF, clock quality can be as important as converter nominal resolution.

---

## 41. Power supplies

Converters often require separate rails for

- analog;
- digital;
- clock;
- serializer;
- I/O.

Power-supply noise can modulate the converter output.

Good designs require

- low-noise regulation;
- local decoupling;
- careful return paths;
- controlled layout.

See [Signal Integrity & Power Integrity](../signal-power-integrity/).

---

# Part XIV — Figures of merit

## 42. Walden FoM

A common ADC energy-efficiency metric is

$$
\boxed{
FoM_W
=
\frac{P}
{2^{ENOB}f_s}.
}
$$

Units are approximately joules/conversion-step.

Lower is better.

---

## 43. Schreier FoM

A dynamic-range-oriented figure of merit is

$$
\boxed{
FoM_S
=
SNDR
+
10\log_{10}
\left(
\frac{BW}{P}
\right).
}
$$

Higher is better.

FoMs are useful for research comparison, but they should not replace application-specific requirements.

---

# Part XV — Measuring an ADC

## 44. DC / histogram tests

Useful static tests include

- code-density histogram;
- slow ramp;
- sine histogram.

These can estimate

- DNL;
- INL;
- missing codes;
- offset;
- gain error.

---

## 45. Sine-wave FFT test

A spectrally pure sine wave is applied.

FFT analysis gives

- SNR;
- SINAD;
- SFDR;
- THD;
- ENOB.

Requirements:

- cleaner source than DUT;
- low-jitter clock;
- appropriate anti-alias filtering;
- coherent or windowed FFT.

The measurement setup can easily limit the apparent ADC performance.

---

## 46. Two-tone testing

Two RF tones test intermodulation.

Products occur near

$$
2f_1-f_2
$$

and

$$
2f_2-f_1.
$$

This is useful when evaluating converter behavior for communications and wideband RF receivers.

---

# Part XVI — Measuring a DAC

## 47. Static DAC test

Sweep the input code and measure output.

Extract

- offset;
- gain;
- DNL;
- INL;
- monotonicity.

A precision DMM is often more useful than an oscilloscope for low-speed static testing.

---

## 48. Dynamic DAC test

Generate a sine wave and use a spectrum analyzer or high-performance digitizer.

Measure

- SFDR;
- harmonics;
- noise;
- images;
- interpolation artifacts.

For RF DACs, the analyzer and clock source must have better performance than the converter under test.

---

## 49. Settling measurement

Use a fast oscilloscope to observe a large code transition.

Important details:

- scope bandwidth;
- probe loading;
- trigger timing;
- output loading.

Measure the time until the output remains within the required error band.

---

# Part XVII — How to choose an ADC

## 50. ADC selection checklist

| Question | Why it matters |
|---|---|
| What is the highest signal frequency? | analog input bandwidth |
| What signal bandwidth is needed? | required $f_s$ / oversampling |
| What dynamic range is needed? | ENOB/SNR |
| Are weak signals beside strong tones? | SFDR |
| Is DC precision important? | INL, offset, drift |
| What is source impedance? | input driver/settling |
| What is the input range/common mode? | interface compatibility |
| What clock jitter is achievable? | RF SNR limit |
| What latency is acceptable? | control/system timing |
| How much power can be dissipated? | thermal architecture |
| How does data leave the ADC? | CMOS/LVDS/JESD204 |
| How many channels must align? | synchronization |

---

# Part XVIII — How to choose a DAC

## 51. DAC selection checklist

| Question | Why it matters |
|---|---|
| Required output bandwidth? | update rate / architecture |
| Required RF output frequency? | Nyquist zone / RF DAC |
| Required SFDR? | spectral purity |
| DC accuracy or RF purity? | INL/DNL vs dynamic specs |
| Required output voltage/current? | output-stage compatibility |
| Load impedance? | matching / transformer / amplifier |
| Settling requirement? | control/waveform speed |
| Clock quality? | RF phase noise/SFDR |
| Need interpolation/NCO? | digital-upconversion architecture |
| Interface? | parallel/LVDS/JESD204 |
| Multi-channel phase alignment? | clock/SYSREF synchronization |
| Thermal budget? | converter + FPGA system power |

---

# Part XIX — Parameters by application

## 52. Application-oriented table

| Application | ADC/DAC parameters that dominate |
|---|---|
| Precision DC measurement | INL, offset, drift, noise |
| Audio | SNR, THD+N, dynamic range |
| Oscilloscope | bandwidth, sample rate, ENOB |
| Spectrum analyzer | SFDR, noise floor, clock jitter |
| Radar | bandwidth, SFDR, phase coherence, latency |
| Wireless receiver | SNR, SFDR, input BW, JESD204 |
| RF transmitter | DAC SFDR, NSD, interpolation, output BW |
| SerDes | sample rate, ENOB, power, latency |
| Control loop | latency, settling, monotonicity |
| Quantum-control AWG | DAC sample rate, SFDR, jitter, channel synchronization |

---

# Part XX — Recent reviews and surveys

## 53. Recent ADC reviews

### 2026 — Time-interleaved noise-shaping ADCs

**“An Overview of Time-Interleaved Noise-Shaping ADCs: Fundamentals, Challenges, and Prospects,” IEEE Open Journal of the Solid-State Circuits Society, 2026.**

This review covers

- TI noise-shaping ADC fundamentals;
- TI NS-SAR;
- time-interleaved delta-sigma structures;
- timing/feedback challenges;
- recent state-of-the-art implementations.

DOI: [10.1109/OJSSCS.2026.3665854](https://doi.org/10.1109/OJSSCS.2026.3665854)

---

### 2025 — Time-domain versus voltage-domain ADCs

**“Time-Domain Versus Voltage-Domain Data Conversion: Principles, Opportunities, and Challenges,” IEEE Solid-State Circuits Magazine, 2025.**

Useful for understanding why advanced CMOS increasingly favors

- phase;
- delay;
- oscillator/time-domain encoding

alongside traditional voltage-domain conversion.

DOI: [10.1109/MSSC.2025.3596052](https://doi.org/10.1109/MSSC.2025.3596052)

---

### 2024 — Oversampling ADC review

A. Verreault, P.-V. Cicek, A. Robichaud,

**“Oversampling ADC: A Review of Recent Design Trends,” IEEE Access, 2024.**

Covers recent

- continuous-time ΔΣ;
- discrete-time ΔΣ;
- noise-shaping SAR;
- zoom ADC;
- incremental ADC;
- time-domain oversampling architectures.

DOI: [10.1109/ACCESS.2024.3452589](https://doi.org/10.1109/ACCESS.2024.3452589)

---

### Continuously updated — Murmann ADC Survey

Boris Murmann's

**ADC Performance Survey 1997–2026**

collects ISSCC and VLSI Symposium converter results and is one of the most useful resources for understanding the real ADC trade space.

[ADC Performance Survey 1997–2026](https://github.com/bmurmann/ADC-survey)

The survey lets you compare

- Nyquist vs oversampling;
- sample rate;
- SNDR;
- power;
- Walden FoM;
- Schreier FoM.

---

## 54. Recent DAC reviews

### 2026 — High-speed DAC tutorial

**“Principles and Practices of High-Speed DAC Design: From Conversion Fundamentals to Layout-Aware Implementation,” IEEE Solid-State Circuits Magazine, 2026.**

This is an unusually useful modern tutorial because it connects

- architecture;
- coding;
- current/voltage output;
- Nyquist/oversampling;
- time interleaving;
- current-steering distortion;
- timing skew;
- finite output impedance;
- digital predistortion;
- DEM;
- physical layout.

DOI: [10.1109/MSSC.2026.3704105](https://doi.org/10.1109/MSSC.2026.3704105)

---

### 2026 — Digital-assisted high-speed DAC review

**“From Analog to Digital-Assisted Techniques: Modern Digital-to-Analog Converter Design for High Speed and Dynamic Range,” 2026.**

This review focuses on modern high-speed/current-steering DAC limitations and digital correction, including

- amplitude mismatch;
- timing skew;
- finite output impedance;
- ISI;
- calibration;
- digital predistortion;
- DEM;
- return-to-zero techniques.

DOI: [10.23919/emsci.2025.0061](https://doi.org/10.23919/emsci.2025.0061)

---

## 55. Related high-speed converter review

For SerDes and >100-Gb/s wireline links:

**“Recent Advances in Ultrahigh-Speed Wireline Receivers With ADC-DSP-Based Equalizers,” IEEE Open Journal of the Solid-State Circuits Society, 2024.**

It reviews ADC/DSP-based receivers and DAC-based transmitters for very-high-speed wireline links.

DOI: [10.1109/OJSSCS.2024.3506692](https://doi.org/10.1109/OJSSCS.2024.3506692)

---

# Part XXI — What you should remember

## 56. ADC essentials

If you remember only ten ADC ideas:

1. sampling and quantization are different;
2. Nyquist sets aliasing constraints;
3. resolution is not ENOB;
4. SINAD combines noise and distortion;
5. SFDR matters for RF;
6. INL/DNL matter for static linearity;
7. aperture jitter limits RF performance;
8. the first driver/filter stage matters;
9. clock quality is part of the ADC;
10. architecture determines the speed-resolution-power trade.

---

## 57. DAC essentials

If you remember only ten DAC ideas:

1. resolution is not dynamic performance;
2. settling matters for time-domain accuracy;
3. glitch energy matters during code transitions;
4. current steering dominates very-high-speed DACs;
5. segmentation reduces switching/glitch problems;
6. SFDR matters for RF synthesis;
7. clock jitter affects high-frequency output quality;
8. output impedance/compliance matter;
9. reconstruction filtering is part of the DAC system;
10. digital calibration is increasingly part of analog performance.

---

## 58. The bigger picture

Modern data converters sit at the center of

$$
\boxed{
\text{sensor / RF}
\leftrightarrow
\text{ADC}
\leftrightarrow
\text{DSP / FPGA}
\leftrightarrow
\text{DAC}
\leftrightarrow
\text{actuator / RF}.
}
$$

Understanding ADCs and DACs therefore connects analog design, RF, digital signal processing, SerDes, test equipment, and embedded systems.

Related: [Analog Mixed-Signal IC Design](../analog-mixed-signal/) · [High-Speed SerDes & IO](../high-speed-serdes/) · [Signal Integrity & Power Integrity](../signal-power-integrity/) · [Measurements & Instruments](../measurements/) · [Arduino Boards](../arduino/) · [Microwave & Space Electronics Components](../microwave-space-components/)
