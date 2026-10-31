---
layout: default
title: Spectrum Analyzer Signal Processing — Signal Hound BB60D Example
description: Technical guide to modern spectrum-analyzer signal processing using the Signal Hound BB60D as a concrete example: RF front end, superheterodyne conversion, ADC, FFT, RBW/VBW, windows, detectors, real-time processing, I/Q streaming, dynamic range, channel power, and measurement interpretation.
---

# Spectrum Analyzer Signal Processing — Signal Hound BB60D Example

<div class="intuition"><span class="callout-title">30-second intuition</span>A modern spectrum analyzer such as the <strong>Signal Hound BB60D</strong> is not simply an RF voltmeter sweeping a narrow analog filter. It is a <strong>hybrid RF + digital signal-processing instrument</strong>. The RF front end selects and frequency-translates a portion of spectrum; an ADC digitizes the IF; the data is streamed to a computer; FFTs, window functions, detectors, averaging and display processing turn those time-domain samples into the spectrum you see.</div>

<div class="pathway"><span class="node">RF input</span><span class="arrow">→</span><span class="node">attenuator / preselector / mixer</span><span class="arrow">→</span><span class="node">IF</span><span class="arrow">→</span><span class="node">14-bit ADC</span><span class="arrow">→</span><span class="node">FPGA + USB 3.0</span><span class="arrow">→</span><span class="node">FFT / DSP on PC</span><span class="arrow">→</span><span class="node">spectrum / waterfall / IQ</span></div>

The BB60D is particularly useful for learning this architecture because Signal Hound documents both the RF hardware and the software/API processing.

Official references:

- [Signal Hound BB60D product page](https://signalhound.com/products/bb60d-6-ghz-real-time-spectrum-analyzer/)
- [BB60D User Manual](https://signalhound.com/sigdownloads/BB60C/BB60D-User-Manual.pdf)
- [BB60 API documentation](https://signalhound.com/sigdownloads/SDK/online_docs/bb_api/index.html)
- [Spike software documentation](https://signalhound.com/sigdownloads/Spike/docs/html/index.html)

---

# Part I — What is inside a modern spectrum analyzer?

## 1. Conventional swept analyzer

A classic superheterodyne spectrum analyzer can be thought of as

$$
\boxed{
\text{RF input}
\rightarrow
\text{tunable LO + mixer}
\rightarrow
\text{fixed IF}
\rightarrow
\text{analog RBW filter}
\rightarrow
\text{detector}
\rightarrow
\text{display}.
}
$$

The LO sweeps across frequency.

At each LO frequency, a narrow portion of the RF spectrum passes through the IF resolution-bandwidth filter.

This architecture is conceptually similar to a radio receiver whose tuning frequency is continuously swept.

---

## 2. FFT-based analyzer

A digital analyzer instead digitizes a finite instantaneous bandwidth and computes

$$
X[k]
=
\sum_{n=0}^{N-1}
x[n]w[n]e^{-j2\pi kn/N}.
$$

Here

- $x[n]$ = sampled time waveform;
- $w[n]$ = window function;
- $N$ = FFT size;
- $X[k]$ = complex spectral bins.

One FFT therefore measures **many frequencies simultaneously**.

---

## 3. Hybrid architecture

Modern analyzers often combine both concepts.

The RF front end tunes a finite block of spectrum into the ADC bandwidth, then FFT processing analyzes that block digitally.

To cover a wider span:

$$
\boxed{
\text{tune RF block}
\rightarrow
\text{FFT}
\rightarrow
\text{retune}
\rightarrow
\text{FFT}
\rightarrow
\cdots
}
$$

The resulting blocks are stitched into one displayed sweep.

The BB60D is explicitly described by Signal Hound as a **hybrid superheterodyne-FFT spectrum analyzer**.

---

# Part II — BB60D signal path

## 4. Main BB60D specifications relevant to DSP

| Parameter | BB60D |
|---|---:|
| RF frequency range | 9 kHz–6 GHz |
| Real-time / usable instantaneous bandwidth | 27 MHz |
| ADC rate | 80 MS/s |
| ADC resolution | 14 bit |
| Raw data transport | USB 3.0 |
| Data stream | ~140 MB/s |
| I/Q output rate at decimation 1 | 40 million I/Q pairs/s |
| Maximum sweep speed | 24 GHz/s |
| Real-time FFT processing capability | up to ~1.2 million FFT spectra/s through the API |

Signal Hound states that the BB60D continuously streams digitized RF/IF data to the host PC rather than performing all spectral processing inside the instrument.

---

## 5. Front-end gain and attenuation

Before digitization, the analyzer must choose an RF gain state.

Conceptually,

$$
\text{RF}
\rightarrow
\text{attenuator}
\rightarrow
\text{gain stages}
\rightarrow
\text{mixer}.
$$

The BB60D API exposes several gain and attenuation states.

The **reference level** is important because automatic gain/attenuation selection uses it to place the signal appropriately within the analyzer's dynamic range.

### Tradeoff

Too much gain:

- ADC/front-end compression;
- intermodulation;
- false spurs.

Too little gain:

- receiver noise dominates;
- DANL worsens.

Thus

$$
\boxed{
\text{reference level}
\rightarrow
\text{front-end gain state}
\rightarrow
\text{noise floor + linearity}.
}
$$

---

## 6. Preselection

Strong out-of-band signals can enter the mixer and create

- intermodulation;
- images;
- second-order products.

The BB60D uses different front-end strategies with frequency.

Signal Hound documents:

- below 30 MHz — a high-linearity low-noise low-frequency path;
- 30–130 MHz — push-pull amplification for improved second-order performance;
- above 130 MHz — **sub-octave hardware preselection**.

The preselector is therefore physically ahead of the later conversion chain.

Its job is approximately

$$
\boxed{
\text{reject unwanted RF before nonlinear stages}.
}
$$

This is one major reason preselection improves usable dynamic range in dense RF environments.

---

## 7. Superheterodyne conversion

The BB60D is a two-stage superheterodyne receiver.

Signal Hound documents two main intermediate frequencies:

$$
f_{IF}=2380\ \mathrm{MHz}
$$

and

$$
f_{IF}=1220\ \mathrm{MHz},
$$

selected according to RF input range.

The mixer relationship is

$$
f_{IF}=|f_{RF}-f_{LO}|.
$$

The LO therefore tunes so that the desired RF block lands at the appropriate IF.

---

## 8. BB60D IF mapping

The 2025 BB60D manual gives the following conversion regions:

| RF input | IF |
|---|---:|
| 30–1810 MHz | 2380 MHz |
| 1810–4210 MHz | 1220 MHz |
| 4210–5590 MHz | 2380 MHz |
| 5590–6000 MHz | 1220 MHz |

This type of frequency planning is used to manage

- image locations;
- mixer products;
- LO range;
- filtering;
- front-end linearity.

---

# Part III — ADC and digital transport

## 9. ADC

After analog frequency conversion/filtering, the IF reaches a **14-bit ADC operating at 80 MS/s**.

Signal Hound notes that the ADC uses built-in dithering to improve linearity and reduce coherent ADC spurs.

The fundamental ADC operation is

$$
x[n]=x(nT_s),
\qquad
T_s=\frac{1}{f_s}.
$$

At

$$
f_s=80\ \mathrm{MS/s},
$$

the raw sample interval is

$$
T_s=12.5\ \mathrm{ns}.
$$

---

## 10. Why a 14-bit ADC does not mean 14-bit spectral accuracy

ADC resolution is only one contributor.

Actual analyzer dynamic range also depends on

- RF gain;
- mixer IP3/IP2;
- phase noise;
- ADC noise;
- ADC spurs;
- clock jitter;
- preselector rejection;
- calibration;
- FFT processing.

A strong signal can create internally generated spectral products even though the ADC has many nominal bits.

See [ADC & DAC — Data Converters](../data-converters/) for ENOB, SFDR, quantization and jitter.

---

## 11. FPGA packetization

Signal Hound documents that the digitized IF samples are passed to an FPGA.

The FPGA primarily performs high-rate data handling/packetization before sending the samples through the Cypress FX3 USB interface.

Conceptually:

$$
\boxed{
ADC
\rightarrow
FPGA
\rightarrow
USB\ 3.0
\rightarrow
PC\ memory.
}
$$

This architecture moves much of the computational burden from dedicated analyzer hardware into software running on the host.

---

## 12. Why USB throughput matters

At 80 million samples/s with high sample resolution, the data rate is substantial.

Signal Hound quotes approximately

$$
140\ \mathrm{MB/s}
$$

over USB 3.0.

If the host cannot process or transport data continuously, the analyzer cannot maintain its intended real-time behavior.

Thus a PC-based real-time spectrum analyzer is a **hardware + USB + memory + CPU/GPU system**.

---

# Part IV — From samples to spectrum

## 13. Time-domain block

Suppose the analyzer collects

$$
N
$$

samples.

The observation time is

$$
T_{obs}=\frac{N}{f_s}.
$$

The raw FFT bin spacing is

$$
\boxed{
\Delta f=\frac{f_s}{N}.
}
$$

Increasing $N$ gives finer frequency spacing but increases observation time and computational work.

---

## 14. Windowing

A finite-length sample record is equivalent to multiplying an infinite signal by a window.

A rectangular truncation produces spectral leakage.

Therefore the analyzer uses a window:

$$
x_w[n]=x[n]w[n].
$$

The FFT then becomes

$$
X[k]=FFT\{x[n]w[n]\}.
$$

The choice of window changes

- main-lobe width;
- equivalent noise bandwidth;
- sidelobe level;
- amplitude accuracy;
- scalloping loss.

---

## 15. Flat-top window

The BB60 swept mode commonly uses a **flat-top window**.

Advantages:

- excellent amplitude accuracy;
- very low scalloping loss.

Disadvantages:

- wider equivalent noise bandwidth;
- lower frequency resolution for a given FFT length;
- more processing for a requested narrow RBW.

Signal Hound recommends the flat-top RBW shape when accurate CW marker amplitude is important.

---

## 16. Nuttall window

BB60 real-time mode uses a **Nuttall window**.

Compared with flat-top:

- narrower effective bandwidth;
- faster processing;
- favorable sidelobe behavior;
- larger scalloping error.

Signal Hound states that a tone halfway between FFT bins may read up to roughly **0.8 dB low** in real-time Nuttall processing.

For accurate integrated channel power this is much less problematic because energy across neighboring bins is summed.

---

# Part V — Resolution bandwidth

## 17. What RBW means in an FFT analyzer

In an old analog analyzer, RBW is approximately the bandwidth of an IF filter.

In an FFT analyzer, RBW is produced digitally through

$$
\boxed{
\text{sample rate}
+
\text{FFT length}
+
\text{window ENBW}.
}
$$

Thus RBW is **not simply FFT-bin spacing**.

---

## 18. BB60 FFT-size relationship

Signal Hound's API documentation gives an internal FFT-size estimate of the form

$$
N_{best}
=
\frac{80\times10^6\,B_w}{RBW},
$$

where $B_w$ depends on the selected window.

Documented factors include approximately

| Window | Window bandwidth factor |
|---|---:|
| Nuttall | 2.02 |
| Flat-top | 3.7702 |
| CISPR | 2.65 |

The requested FFT is then adjusted to a suitable power-of-two length and may be zero-padded.

---

## 19. Smaller RBW

A narrower RBW:

- separates closely spaced signals;
- lowers integrated noise in each resolution filter;
- improves apparent DANL.

But it also requires

- longer time records;
- larger FFTs;
- longer sweep time.

For thermal-like noise,

$$
P_n=kTB.
$$

Reducing RBW by a factor of 10 ideally lowers integrated noise by approximately

$$
10\ \mathrm{dB}.
$$

---

# Part VI — FFT bins and scalloping loss

## 20. FFT bins

The FFT evaluates the spectrum at discrete frequencies

$$
f_k=k\frac{f_s}{N}.
$$

If a CW signal lands exactly on a bin, its amplitude can be represented cleanly.

If it lies between bins, its energy distributes into multiple bins.

---

## 21. Scalloping loss

Scalloping loss is the variation in measured peak amplitude as a tone moves between FFT-bin centers.

The amount depends strongly on the window.

Therefore

> “marker peak amplitude” is partly a DSP/windowing problem.

For precision amplitude measurement on BB60D, use an appropriate flat-top window or integrated channel-power measurement.

---

# Part VII — Video bandwidth

## 22. RBW versus VBW

A useful distinction is

$$
\boxed{
RBW
\rightarrow
\text{frequency-domain resolution}
}
$$

while

$$
\boxed{
VBW
\rightarrow
\text{smoothing of detected amplitude}.
}
$$

Spike documentation states that after RBW processing, the signal is converted to amplitude and filtered by the VBW filter.

When

$$
VBW=RBW,
$$

no additional VBW filtering is performed in that processing path.

VBW must be less than or equal to RBW.

---

## 23. Why lower VBW makes noise look smoother

Noise changes rapidly from acquisition to acquisition.

A lower VBW suppresses fast amplitude fluctuations.

It does **not** provide the same effect as narrowing RBW.

A smooth trace can still represent the same underlying integrated noise power.

---

# Part VIII — Detectors

## 24. Why a detector is needed

Many FFTs may contribute to one displayed sweep bin.

The analyzer must decide how to combine them.

Signal Hound's BB API fundamentally provides

- average detector;
- min/max detector.

---

## 25. Peak / min-max behavior

With min/max detection, the analyzer maintains the minimum and maximum spectral values observed for each output bin.

The maximum trace approximates traditional positive-peak detection.

This is useful for

- intermittent signals;
- pulsed RF;
- frequency hopping;
- EMC precompliance;
- finding rare peaks.

---

## 26. Average detector

Average processing combines repeated spectral measurements.

For RMS/channel-power work, average detection should be performed in **linear power** rather than simply averaging dB values.

If powers are $P_i$,

$$
P_{avg}
=
\frac{1}{M}\sum_iP_i,
$$

then convert to dB:

$$
P_{avg,dBm}
=
10\log_{10}
\left(
\frac{P_{avg}}{1\ \mathrm{mW}}
\right).
$$

Spike explicitly recommends linear-power video units with average detection for RMS power measurements.

---

# Part IX — Trace processing

## 27. Normal trace

Every new sweep replaces the previous one.

Useful for stable CW or continuously changing signals.

---

## 28. Max hold

For each frequency bin,

$$
X_{max}[k]
=
\max
\left(
X_1[k],X_2[k],\ldots
\right).
$$

Max hold is powerful for

- hopping transmitters;
- intermittent interference;
- transient emissions.

But it is **not an instantaneous spectrum**.

It is the historical maximum at each frequency.

---

## 29. Averaging

Repeated spectra can be averaged to reduce variance.

This is useful for

- noise-like signals;
- stable carriers;
- amplitude measurement.

But averaging can hide transient events.

---

# Part X — Real-time spectrum analysis

## 30. Swept mode versus real-time mode

### Swept

The analyzer tunes through a span.

A transient at a frequency not currently being observed can be missed.

### Real time

The analyzer continuously digitizes the full instantaneous bandwidth.

Within the BB60D's 27 MHz real-time bandwidth, there are no acquisition gaps under supported real-time conditions.

---

## 31. Overlapping FFTs

The BB60 real-time implementation uses **50% overlapping FFTs**.

If an FFT record contains $N$ samples, the next FFT begins roughly halfway through the previous record.

Conceptually:

$$
\begin{array}{cccccccc}
|&FFT_1&&|\\
&&|&FFT_2&&|\\
&&&&|&FFT_3&&|
\end{array}
$$

Overlap prevents events occurring near one FFT boundary from being missed or heavily attenuated by the window.

---

## 32. Probability of intercept

Signal Hound specifies 100% probability of intercept for a full-amplitude event as short as approximately

$$
4.8\ \mu s
$$

at an RBW of approximately

$$
631\ \mathrm{kHz}.
$$

This number is configuration-specific.

POI is not simply “how fast the screen refreshes.”

It is determined by the continuous acquisition and FFT/window processing.

---

## 33. Why screen refresh rate is not FFT rate

The analyzer may process enormous numbers of FFTs internally but only update the display tens of times per second.

Therefore

$$
\boxed{
\text{FFT processing rate}
\neq
\text{display frame rate}.
}
$$

Many FFT results are compressed into

- a spectrum trace;
- persistence/density information;
- a waterfall frame.

---

# Part XI — Persistence and waterfall displays

## 34. Persistence display

A real-time persistence display records how often signal energy appears at a frequency and amplitude.

Conceptually define a 2-D histogram

$$
H(f,P).
$$

Every FFT contributes samples into this histogram.

Color then represents

- occurrence count;
- probability/density;
- recency depending on display implementation.

This makes intermittent signals visible even when a normal trace would miss their temporal behavior.

---

## 35. Waterfall

A waterfall adds time as another dimension:

$$
\boxed{
x=f,
\qquad
y=t,
\qquad
color=P.
}
$$

It is particularly useful for

- frequency hopping;
- drifting oscillators;
- pulsed interference;
- burst communications;
- intermittent spurs.

---

# Part XII — I/Q streaming

## 36. Why stream I/Q?

A spectrum is only one representation of the digitized signal.

Streaming complex I/Q preserves

- amplitude;
- phase;
- modulation;
- timing.

This allows external processing such as

- demodulation;
- vector signal analysis;
- custom FFTs;
- matched filtering;
- direction finding;
- pulse analysis;
- coherent measurements.

---

## 37. Complex I/Q representation

A complex sample is

$$
z[n]=I[n]+jQ[n].
$$

Instantaneous power is proportional to

$$
|z[n]|^2
=
I^2[n]+Q^2[n].
$$

Signal Hound's API documents calibrated I/Q power calculation in this form.

---

## 38. BB60D I/Q sample-rate table

Signal Hound documents the following approximate I/Q configurations:

| Decimation | I/Q sample rate | Maximum software-filter bandwidth |
|---:|---:|---:|
| 1 | 40 MS/s | 27 MHz |
| 2 | 20 MS/s | 17.8 MHz |
| 4 | 10 MS/s | 8 MHz |
| 8 | 5 MS/s | 3.75 MHz |
| 16 | 2.5 MS/s | 2 MHz |
| 32 | 1.25 MS/s | 1 MHz |
| 64 | 625 kS/s | 500 kHz |
| 128 | 312.5 kS/s | 250 kHz |
| 256 | 156.25 kS/s | 140 kHz |
| 512 | 78.125 kS/s | 65 kHz |
| 1024 | 39.0625 kS/s | 30 kHz |
| 2048 | 19.53125 kS/s | 15 kHz |
| 4096 | 9.765625 kS/s | 8 kHz |
| 8192 | 4.8828125 kS/s | 4 kHz |

This is a concrete example of **digital downsampling + filtering**.

---

# Part XIII — Digital downconversion and decimation

## 39. Conceptual DDC

A digital downconverter can be represented as

$$
x[n]
\times
e^{-j2\pi f_0n/f_s}
\rightarrow
\text{low-pass filter}
\rightarrow
\text{decimate}.
$$

The result is lower-rate complex baseband I/Q.

This reduces data rate when only a narrow portion of the 27 MHz instantaneous bandwidth is needed.

---

## 40. Decimation

If the original sample rate is $f_s$ and the decimation factor is $M$,

$$
f_s'
=
\frac{f_s}{M}.
$$

Before throwing away samples, a low-pass/anti-alias filter must restrict bandwidth.

Thus

$$
\boxed{
\text{filter first}
\rightarrow
\text{decimate second}.
}
$$

---

# Part XIV — Wide swept spectrum

## 41. How a 6 GHz sweep is built from a 27 MHz receiver

The ADC cannot see 6 GHz simultaneously.

The analyzer instead performs many local measurements.

Conceptually:

$$
\begin{aligned}
&f_{LO,1}\rightarrow FFT_1\\
&f_{LO,2}\rightarrow FFT_2\\
&f_{LO,3}\rightarrow FFT_3\\
&\cdots
\end{aligned}
$$

The useful portions are combined to make a wide spectrum.

This explains why

- instantaneous bandwidth;
- span;
- sweep speed

are three different specifications.

---

## 42. Instantaneous bandwidth

For the BB60D,

$$
B_{inst}\approx27\ \mathrm{MHz}.
$$

Within that window, all frequencies can be observed concurrently.

Outside it, the LO must retune.

---

# Part XV — Channel power and occupied bandwidth

## 43. Channel power

A digital analyzer calculates channel power by integrating spectral power across the defined channel.

If each FFT bin represents linear power $P_k$,

$$
\boxed{
P_{channel}
\approx
\sum_{k\in channel}
P_k
}
$$

with corrections for the window/RBW representation.

Signal Hound explicitly recommends average/RMS-style detection in linear power for this calculation.

---

## 44. Why you should not sum dBm directly

dBm is logarithmic.

This is wrong:

$$
-50\ \mathrm{dBm}
+
-50\ \mathrm{dBm}
\neq
-100\ \mathrm{dBm}.
$$

Instead:

1. convert each bin to watts/mW;
2. add powers;
3. convert back to dBm.

Two equal $-50$ dBm signals sum to approximately

$$
-47\ \mathrm{dBm}.
$$

---

## 45. Occupied bandwidth

Occupied bandwidth finds the frequency interval containing a selected percentage of the integrated signal power.

It is therefore based on **integrated spectrum**, not simply the visible -3 dB bandwidth.

---

## 46. ACP / ACPR

Adjacent-channel power is calculated by integrating power in specified neighboring channels.

A common ratio is

$$
ACPR
=
10\log_{10}
\left(
\frac{P_{adjacent}}{P_{main}}
\right).
$$

This measurement reveals effects from

- PA nonlinearity;
- phase noise;
- modulation;
- analyzer dynamic range.

---

# Part XVI — Dynamic range

## 47. DANL

Displayed average noise level is the analyzer's displayed noise floor under specified conditions.

Thermal-noise-like contributions scale with RBW:

$$
P_n\propto B.
$$

Therefore DANL must always be interpreted together with RBW and front-end settings.

---

## 48. Third-order intermodulation

With two strong tones,

$$
f_{IM3,1}=2f_1-f_2
$$

and

$$
f_{IM3,2}=2f_2-f_1.
$$

These spurs may be produced by

- the DUT;
- the analyzer itself.

The analyzer must have enough internal linearity that its distortion is below the DUT's distortion.

---

## 49. Intermodulation-free dynamic range

Signal Hound gives the common approximation

$$
\boxed{
IMFDR
=
\frac{2}{3}(TOI-DANL)
}
$$

when normalized consistently.

The BB60D manual gives an illustrative typical value around

$$
104\ \mathrm{dB}
$$

at 1 GHz, -10 dBm reference level, normalized to 1 Hz RBW.

This is not the same as display range.

---

# Part XVII — Images, spurs and spur rejection

## 50. Mixer images

A superheterodyne receiver can respond to frequencies other than the desired RF because multiple RF/LO combinations can produce the same IF.

This is why preselection and image rejection are essential.

---

## 51. Residual spurs

An analyzer can generate internal spurs through

- mixer products;
- ADC nonlinearity;
- LO leakage;
- clock coupling;
- digital clocks;
- internal harmonics.

A displayed line is not automatically an external RF signal.

A useful test is to change

- center/span;
- reference level;
- attenuation;
- preselector configuration;
- input termination.

A true external signal and an internally generated spur often behave differently.

---

## 52. Spur rejection processing

The BB API offers a spur-reject option in standard swept analysis.

Signal Hound recommends it for steady CW/slowly varying measurements where minimizing image/spurious responses is more important than capturing extremely short transients.

This illustrates a broader principle:

> Some analyzer “clean-up” functions trade temporal fidelity for improved spectral certainty.

---

# Part XVIII — Phase noise and clocking

## 53. Analyzer LO phase noise

A perfectly pure CW signal should appear as a delta function.

Real oscillators have phase fluctuations.

The analyzer LO itself therefore broadens or masks nearby weak signals.

Measured phase noise contains contributions from both

- DUT oscillator;
- analyzer local oscillator.

Near a strong carrier, analyzer phase noise can dominate the apparent noise skirt.

---

## 54. External 10 MHz reference

The BB60D provides a dedicated external 10 MHz reference input.

This allows synchronization to

- GPS-disciplined oscillator;
- rubidium standard;
- laboratory reference;
- common multi-instrument reference.

A common reference is useful for

- repeatable frequency accuracy;
- synchronized RF experiments;
- multi-instrument measurements.

---

# Part XIX — Calibration and amplitude correction

## 55. Why calibration is required

The measured FFT amplitude is affected by frequency-dependent

- gain;
- attenuator loss;
- mixer conversion loss;
- filter response;
- ADC scale;
- temperature.

Calibration coefficients compensate these effects.

Thus the displayed spectrum is not simply

$$
20\log_{10}|FFT|.
$$

It is closer to

$$
\boxed{
\text{raw spectrum}
+
\text{window correction}
+
\text{gain/attenuation correction}
+
\text{frequency-response calibration}.
}
$$

---

## 56. Temperature

Signal Hound notes that analyzer calibration depends on operating temperature.

For the BB60C/D API architecture, reinitiating the device after significant temperature change allows recalibration at the new operating temperature.

This is a reminder that digital processing does not eliminate analog drift.

---

# Part XX — What the display trace actually means

## 57. A single displayed point may contain much processing

One pixel/bin on the screen may represent

$$
\boxed{
\text{many ADC samples}
\rightarrow
\text{window}
\rightarrow
\text{FFT}
\rightarrow
\text{calibration}
\rightarrow
\text{multiple overlapping FFTs}
\rightarrow
\text{detector}
\rightarrow
\text{VBW / averaging}
\rightarrow
\text{trace processing}.
}
$$

Therefore never interpret the plotted line without knowing analyzer settings.

---

## 58. Settings table

| Setting | What it changes physically / numerically |
|---|---|
| Center frequency | RF/LO tuning |
| Span | number/range of tuned FFT blocks |
| Reference level | RF gain/attenuation state |
| RBW | FFT length/window equivalent noise bandwidth |
| VBW | post-detection smoothing |
| Detector | how repeated FFT results are combined |
| Sweep time | acquisition/dwell opportunity |
| Window | leakage, scalloping, ENBW |
| Trace mode | normal/max-hold/average history |
| Real-time mode | continuous FFT acquisition within instantaneous BW |
| IQ bandwidth | DDC/filter/decimation configuration |

---

# Part XXI — Measurement examples

## 59. Measuring a CW tone accurately

Use

- reference level just above the signal;
- flat-top window;
- suitable narrow RBW;
- VBW = RBW initially;
- marker peak.

Why flat-top?

Because its low scalloping loss provides better amplitude accuracy for a tone not exactly centered on an FFT bin.

---

## 60. Measuring weak tone beside strong tone

Important settings:

- lower reference level if possible without compression;
- use preselection;
- narrow RBW;
- evaluate analyzer phase noise;
- verify the weak line is not an internal spur.

The limiting mechanism may be analyzer phase noise rather than thermal noise.

---

## 61. Capturing a short burst

Use

- real-time mode;
- suitable RBW;
- persistence/waterfall;
- max detector.

Do **not** assume a very narrow RBW is always beneficial: a narrower filter has a longer time response and may reduce visibility of very short events.

---

## 62. Measuring broadband noise

Use

- average detector;
- linear-power units;
- controlled RBW;
- channel-power integration.

Avoid peak detector if the desired quantity is RMS/average noise power.

---

## 63. Measuring a modulated communication channel

Use

- appropriate span;
- average/power detector;
- channel-power integration;
- occupied bandwidth;
- ACP/ACPR;
- I/Q streaming or vector-signal analysis if modulation quality is required.

Spectrum amplitude alone cannot provide EVM because EVM requires complex amplitude/phase information.

---

# Part XXII — Spectrum analyzer versus VSA

## 64. Spectrum analyzer

Primarily answers:

> How much energy exists versus frequency?

Output:

$$
P(f).
$$

---

## 65. Vector signal analyzer

Uses complex I/Q:

$$
z(t)=I(t)+jQ(t)
$$

to recover

- constellation;
- EVM;
- phase;
- frequency error;
- modulation symbols.

A modern streaming analyzer such as the BB60D can provide both spectrum and raw/calibrated I/Q for software-based analysis.

---

# Part XXIII — What you should know

## 66. Ten important concepts

If you work with a modern spectrum analyzer, understand:

1. superheterodyne frequency conversion;
2. instantaneous bandwidth versus total tuning range;
3. ADC sampling and dynamic range;
4. FFT-bin spacing versus true RBW;
5. window functions and scalloping loss;
6. RBW versus VBW;
7. peak versus average/RMS detection;
8. swept versus real-time acquisition;
9. I/Q streaming and decimation;
10. analyzer-generated noise, phase noise and spurs.

---

## 67. BB60D mental model

The entire instrument can be summarized as

$$
\boxed{
\begin{aligned}
RF
&\rightarrow
\text{attenuator / preselector}\\
&\rightarrow
\text{superheterodyne conversion}\\
&\rightarrow
27\ \mathrm{MHz\ IF}\\
&\rightarrow
80\ \mathrm{MS/s},\ 14\text{-bit ADC}\\
&\rightarrow
FPGA\\
&\rightarrow
USB\ 3.0\\
&\rightarrow
\text{PC DSP}\\
&\rightarrow
\text{FFT / detector / VBW / trace / persistence}.
\end{aligned}
}
$$

That mental model transfers directly to many modern USB-, PCIe-, and Ethernet-connected real-time spectrum analyzers.

---

# Part XXIV — References

## Signal Hound

- [BB60D 6 GHz Real-Time Spectrum Analyzer](https://signalhound.com/products/bb60d-6-ghz-real-time-spectrum-analyzer/)
- [BB60D User Manual](https://signalhound.com/sigdownloads/BB60C/BB60D-User-Manual.pdf)
- [BB60 API Reference](https://signalhound.com/sigdownloads/SDK/online_docs/bb_api/index.html)
- [BB60 API — Measurement Types](https://signalhound.com/sigdownloads/SDK/online_docs/bb_api/measurement_types.html)
- [Spike Software Manual](https://signalhound.com/sigdownloads/Spike/docs/html/index.html)
- [Channel Power and Occupied Bandwidth](https://signalhound.com/news/what-is-channel-power-and-occupied-bandwidth/)

## Related pages

[Measurements & Instruments](../measurements/) · [ADC & DAC](../data-converters/) · [RF & Microwave](../rf-microwave/) · [Signal Integrity & Power Integrity](../signal-power-integrity/) · [3GPP Standards](../3gpp-standards/) · [RF Bands](../rf-bands/)
