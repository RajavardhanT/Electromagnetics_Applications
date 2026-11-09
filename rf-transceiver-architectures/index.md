---
layout: default
title: RF Transceiver Architectures — Interview Ready
description: Interview-focused guide to RF transceiver architectures: superheterodyne, zero-IF, low-IF, image-reject, direct RF sampling, SDR, transmitter architectures, duplexing, mixers, synthesizers, I/Q impairments, noise, linearity, calibration, and architecture tradeoffs.
---

# RF Transceiver Architectures — Interview Ready

<div class="intuition"><span class="callout-title">30-second intuition</span>An RF transceiver converts information between <strong>baseband and radio frequency</strong>. The architecture determines where frequency translation occurs, where filtering occurs, what the ADC/DAC must do, and which impairments dominate. In interviews, the important skill is not memorizing block diagrams. It is being able to explain <strong>why an architecture was chosen and what problem appears because of that choice.</strong></div>

<div class="pathway"><span class="node">antenna / RF front end</span><span class="arrow">→</span><span class="node">frequency translation</span><span class="arrow">→</span><span class="node">filter / gain</span><span class="arrow">→</span><span class="node">ADC / DAC</span><span class="arrow">→</span><span class="node">digital baseband</span></div>

A good interview answer should always connect

$$
\boxed{
\text{architecture}
\rightarrow
\text{benefit}
\rightarrow
\text{new impairment}
\rightarrow
\text{mitigation}
}
$$

---

# Part I — The transceiver at system level

## 1. Generic transceiver

A complete radio can be separated into

$$
\boxed{
\text{antenna}
\leftrightarrow
\text{RF front end}
\leftrightarrow
\text{transceiver}
\leftrightarrow
\text{baseband / modem}.
}
$$

A practical RF transceiver includes some or all of

- LNA;
- PA;
- mixers;
- PLL/VCO synthesizers;
- quadrature generation;
- variable gain;
- filters;
- ADCs;
- DACs;
- digital up/down conversion;
- calibration;
- AGC;
- T/R switching.

---

## 2. Receiver chain

A simplified receiver is

$$
\boxed{
\text{antenna}
\rightarrow
\text{filter}
\rightarrow
\text{LNA}
\rightarrow
\text{mixer / ADC}
\rightarrow
\text{baseband}.
}
$$

The receiver must simultaneously provide

- low noise;
- high gain;
- high linearity;
- blocker tolerance;
- selectivity;
- image rejection;
- usable dynamic range.

Those requirements compete with each other.

---

## 3. Transmitter chain

A simplified transmitter is

$$
\boxed{
\text{digital baseband}
\rightarrow
\text{DAC / mixer}
\rightarrow
\text{RF gain}
\rightarrow
\text{PA}
\rightarrow
\text{filter}
\rightarrow
\text{antenna}.
}
$$

The transmitter must control

- EVM;
- ACPR/ACLR;
- LO leakage;
- image rejection;
- phase noise;
- output power;
- PA efficiency;
- spectral mask.

---

# Part II — Receiver architecture map

## 4. Architectures you should recognize

| Architecture | Frequency translation | Main advantage | Main problem |
|---|---|---|---|
| Superheterodyne | RF → IF → baseband | excellent selectivity/dynamic range | image + complexity |
| High-IF / IF sampling | RF → IF → ADC | strong analog filtering with simpler chain | fast ADC required |
| Zero-IF / direct conversion | RF → I/Q baseband | high integration, no image frequency | DC offset, I/Q mismatch, flicker noise |
| Low-IF | RF → small nonzero IF | avoids DC/flicker problem | image rejection required |
| Image-reject / Hartley / Weaver | quadrature paths cancel image | reduced RF image-filter burden | quadrature accuracy |
| Direct RF sampling | RF → ADC directly | very wideband, flexible SDR | ADC power, aliasing, clock jitter |
| Bandpass subsampling | RF in higher Nyquist zone → ADC | eliminates mixer in selected bands | alias planning/filtering |
| SDR / digital IF | analog front end + ADC/DSP | highly reconfigurable | converter + compute load |

---

# Part III — Superheterodyne receiver

## 5. Basic architecture

The classical superheterodyne receiver is

$$
\boxed{
RF
\rightarrow
LNA
\rightarrow
\text{RF filter}
\rightarrow
\text{mixer}
\rightarrow
IF
\rightarrow
\text{IF filter/gain}
\rightarrow
\text{demodulator / ADC}.
}
$$

The mixer translates

$$
f_{IF}=|f_{RF}-f_{LO}|.
$$

A fixed IF allows very selective filtering and predictable gain distribution.

---

## 6. Why superheterodyne became dominant

Advantages:

- high selectivity;
- excellent blocker rejection;
- narrow high-quality IF filters;
- high dynamic range;
- mature design methodology.

It remains attractive when performance matters more than integration.

---

## 7. Image frequency

The mixer responds to more than one RF frequency.

If

$$
f_{LO}=f_{RF}+f_{IF},
$$

then another input at

$$
f_{image}=f_{LO}+f_{IF}
$$

also produces the same IF magnitude.

Thus

$$
\boxed{
|f_{image}-f_{RF}|=2f_{IF}.
}
$$

An RF image-reject filter is required before the mixer.

---

## 8. Why choose a high first IF?

Higher IF pushes the image farther away:

$$
\Delta f_{image}=2f_{IF}.
$$

This makes RF image filtering easier.

But a high IF makes

- IF filtering harder;
- ADC requirements tougher;
- LO planning more complex.

This is why many radios historically used **dual conversion**.

---

## 9. Dual-conversion receiver

Conceptually:

$$
RF
\rightarrow
IF_1
\rightarrow
IF_2
\rightarrow
baseband.
$$

A high first IF improves image rejection.

A low second IF allows sharp channel filtering.

Interview phrase:

> High first IF helps the image problem; low second IF helps the selectivity problem.

---

# Part IV — Zero-IF / direct conversion

## 10. Basic architecture

A direct-conversion receiver translates RF directly to complex baseband:

$$
\boxed{
RF
\rightarrow
LNA
\rightarrow
I/Q\ mixer
\rightarrow
LPF
\rightarrow
ADC_I,ADC_Q.
}
$$

with

$$
f_{LO}=f_{RF}.
$$

The two branches produce

$$
I(t)
$$

and

$$
Q(t).
$$

---

## 11. Why zero-IF is attractive

Advantages:

- eliminates IF filters;
- no classical image frequency;
- analog filtering moves to baseband;
- highly integrable;
- lower component count;
- low power;
- excellent frequency agility.

This is why direct conversion is widely used in integrated cellular and SDR transceivers.

A classic reference is B. Razavi, **“Design Considerations for Direct-Conversion Receivers,” IEEE Transactions on Circuits and Systems II, 1997**, DOI 10.1109/82.592569.

[IEEE Xplore — Razavi direct-conversion receiver paper](https://ieeexplore.ieee.org/document/592569/)

---

## 12. Zero-IF problem: DC offset

Because

$$
f_{LO}=f_{RF},
$$

LO leakage can couple back into the RF input and self-mix.

The result appears at

$$
f=0.
$$

Other DC sources include

- mixer offsets;
- LO leakage;
- second-order distortion;
- changing reflections.

DC is particularly troublesome because the desired channel itself occupies frequencies close to zero.

---

## 13. LO self-mixing

A leakage component proportional to

$$
A_{LO}\cos\omega_{LO}t
$$

mixing with itself generates

$$
\cos^2\omega t
=
\frac12
+
\frac12\cos2\omega t.
$$

The first term is DC.

Thus LO leakage can directly corrupt the center of the received channel.

---

## 14. Flicker noise

Baseband CMOS devices exhibit

$$
1/f
$$

noise.

In a zero-IF receiver, useful signal energy extends close to DC, exactly where flicker noise is strongest.

This is one reason narrowband direct-conversion receivers are challenging.

---

## 15. Even-order distortion and IP2

In heterodyne systems, second-order products often fall away from the desired IF.

In zero-IF,

$$
f_1-f_2
$$

from two blockers can fall directly into baseband.

Therefore **IIP2** becomes unusually important.

This is a classic direct-conversion interview point.

Analog Devices provides a practical discussion here:

[Understanding IP2 and IP3 Issues in Direct Conversion Receivers](https://www.analog.com/en/resources/technical-articles/understanding-ip2-and-ip3-issues-in-direct-conversion-receivers.html)

---

## 16. I/Q imbalance

An ideal quadrature receiver has

$$
G_I=G_Q
$$

and

$$
\phi_Q-\phi_I=90^\circ.
$$

Gain error or phase error causes imperfect separation of positive and negative frequencies.

Consequences include

- image leakage;
- constellation distortion;
- EVM degradation.

---

## 17. Image-rejection ratio

For small gain/phase mismatch, image rejection degrades rapidly.

The key interview concept is:

> Zero-IF eliminates the classical analog image-frequency problem, but finite I/Q accuracy creates a **complex-baseband image**.

Modern transceivers compensate this digitally.

---

# Part V — Low-IF receiver

## 18. Architecture

Instead of translating to DC,

$$
f_{IF}\neq0
$$

but remains small.

For example:

$$
f_{IF}=1\ \mathrm{MHz}
$$

for a channel whose bandwidth is much smaller than that.

---

## 19. Why use low IF?

It avoids the most severe zero-frequency problems:

- DC offset;
- flicker noise;
- LO self-mixing exactly at the desired center.

But a new problem appears:

$$
\boxed{
\text{image frequency now falls close to the wanted channel}.
}
$$

Therefore strong image rejection is required.

---

## 20. Zero-IF versus low-IF

| | Zero-IF | Low-IF |
|---|---|---|
| IF | 0 | small nonzero |
| DC offset | significant concern | much reduced |
| Flicker noise | important | less severe |
| Image | complex I/Q image | explicit nearby image |
| Filtering | baseband LPF | low-frequency BPF/complex filter |
| Integration | excellent | excellent |
| DSP compensation | DC + I/Q | image + I/Q |

---

# Part VI — Image-reject receivers

## 21. Hartley architecture

The Hartley concept uses quadrature mixing and 90° phase shifting so the desired sideband adds while the image cancels.

Conceptually:

$$
\text{RF}
\rightarrow
\begin{cases}
\cos LO\\
\sin LO
\end{cases}
\rightarrow
\text{phase shift}
\rightarrow
\text{sum/subtract}.
$$

Perfect cancellation requires accurate amplitude and phase matching.

The historical origin is R. V. L. Hartley's 1928 modulation-system work.

---

## 22. Weaver architecture

The Weaver architecture performs quadrature conversion in multiple stages and avoids a broadband analog 90° phase-shift network in the signal path.

It is useful conceptually because it shows how image rejection can be moved from RF filtering into **quadrature signal processing**.

In modern ICs, digital calibration makes these concepts much more practical.

---

# Part VII — High-IF / IF-sampling receiver

## 23. Architecture

A common modern compromise is

$$
\boxed{
RF
\rightarrow
LNA
\rightarrow
mixer
\rightarrow
IF\ filter
\rightarrow
ADC
\rightarrow
DDC.
}
$$

The ADC directly samples the IF.

Digital processing performs

- mixing;
- filtering;
- decimation;
- channel selection.

---

## 24. Advantages

- retains strong analog RF/IF selectivity;
- moves many functions into DSP;
- avoids zero-IF DC/flicker issues;
- simplifies later frequency conversion stages.

This architecture became increasingly practical as high-speed ADCs improved.

---

# Part VIII — Direct RF sampling

## 25. Architecture

Direct RF sampling removes the analog mixer:

$$
\boxed{
antenna
\rightarrow
filter/LNA
\rightarrow
RF\ ADC
\rightarrow
DDC / DSP.
}
$$

The ADC performs the transition from RF to digital.

Frequency translation then occurs numerically.

---

## 26. Why direct RF sampling is attractive

Advantages:

- no analog mixer;
- no analog LO leakage/image issue;
- very wide instantaneous bandwidth;
- software-defined channelization;
- multiband operation;
- fewer analog frequency-conversion stages.

Analog Devices provides a useful architecture comparison:

[A Review of Wideband RF Receiver Architecture Options](https://www.analog.com/en/resources/technical-articles/a-review-of-wideband-rf-receiver-architecture-options.html)

and

[Radio Architecture Matters — RF Sampling vs Zero-IF](https://www.analog.com/en/resources/technical-articles/radio-architecture-matters.html)

---

## 27. Direct-sampling problems

The RF ADC must provide simultaneously

- high sample rate;
- low noise;
- large SFDR;
- strong blocker tolerance;
- low clock jitter.

Power consumption can become substantial.

The analog RF filter also becomes critical because unwanted frequencies can alias into the digital band.

---

## 28. Clock jitter

For a sinusoidal input,

$$
SNR_{jitter}
=
-20\log_{10}
\left(
2\pi f_{in}\sigma_t
\right).
$$

As

$$
f_{in}
$$

increases, clock-jitter requirements become extremely strict.

Thus direct RF sampling trades mixer/LO problems for **ADC/clock problems**.

---

# Part IX — Bandpass undersampling

## 29. Sampling higher Nyquist zones

A band-limited RF/IF signal can sometimes be sampled above

$$
f_s/2
$$

and intentionally aliased into a lower Nyquist zone.

This is called bandpass sampling or undersampling.

The analog filter must ensure unwanted bands do not overlap after aliasing.

---

## 30. Interview warning

Nyquist does **not** mean every signal frequency must satisfy

$$
f_{RF}<f_s/2.
$$

For bandpass sampling, the relevant condition is whether the occupied bandwidth can be uniquely mapped without spectral overlap.

---

# Part X — Software-defined radio

## 31. What SDR really means

An SDR moves radio functions from fixed analog hardware into programmable digital processing.

Typical functions moved into DSP include

- channel selection;
- modulation/demodulation;
- filtering;
- AGC;
- DDC/DUC;
- calibration;
- synchronization.

---

## 32. SDR does not eliminate RF hardware

You still need

- antenna;
- preselection;
- LNA;
- PA;
- T/R switch/duplexer;
- data converters;
- clocks.

The architecture question becomes:

> How close to the antenna can I move the ADC/DAC without unacceptable power, dynamic-range or filtering penalties?

---

# Part XI — Modern integrated zero-IF transceiver example

## 33. AD9361

The AD9361 is a useful integrated-transceiver example.

It integrates

- two transmitters;
- two receivers;
- ADCs/DACs;
- fractional-N synthesizers;
- TDD/FDD support;
- tunable analog/digital filtering.

Current ADI documentation specifies roughly

- RX: 70 MHz–6 GHz;
- TX: 47 MHz–6 GHz;
- tunable channel bandwidth below 200 kHz to 56 MHz.

[Analog Devices AD9361](https://www.analog.com/en/products/ad9361.html)

It is a good example of the transition from a board full of mixers/filters/PLLs to a single RF transceiver IC.

---

## 34. ADRV9002

The ADRV9002 is a more recent integrated transceiver with two RX and two TX paths.

Its receiver contains

- programmable RF attenuation;
- matched I/Q mixers;
- analog low-pass filtering;
- ADCs;
- digital decimation;
- DDC;
- programmable FIR filters;
- calibration/correction.

It supports direct-conversion and IF-style operation.

[Analog Devices ADRV9002](https://www.analog.com/en/products/ADRV9002.html)

---

## 35. Modern massive-MIMO transceiver

The ADRV9040 is a useful base-station example.

It integrates

- 8 TX;
- 8 RX;
- 2 observation RX;
- fractional-N synthesizers;
- digital up/down conversion;
- crest-factor reduction;
- digital predistortion;
- gain control;
- JESD204 interfaces.

ADI describes both RX and TX paths as **zero-IF**.

[Analog Devices ADRV9040](https://www.analog.com/en/products/ADRV9040.html)

This shows how a modern “transceiver” is becoming an RF + mixed-signal + DSP SoC.

---

# Part XII — Transmitter architectures

## 36. Heterodyne transmitter

A traditional TX may use

$$
\text{DAC/baseband}
\rightarrow
IF
\rightarrow
RF
\rightarrow
PA.
$$

Advantages:

- good image filtering;
- predictable RF performance;
- isolation between baseband and RF.

Disadvantages:

- more mixers;
- more filters;
- more LOs;
- greater size/power.

---

## 37. Direct-conversion transmitter

A zero-IF transmitter uses

$$
\boxed{
I,Q\ DACs
\rightarrow
\text{LPF}
\rightarrow
I/Q\ modulator
\rightarrow
RF.
}
$$

This is widely used because it is compact and highly integrated.

---

## 38. TX LO leakage

DC offsets in the I and Q paths produce residual carrier energy.

Thus

$$
I_{DC},Q_{DC}\neq0
$$

creates a tone at

$$
f_{LO}.
$$

Digital calibration injects opposite offsets to cancel this leakage.

---

## 39. TX image

Gain/phase mismatch between I and Q creates a mirror-frequency image.

Digital **quadrature error correction** can pre-distort the samples to compensate analog imbalance.

---

# Part XIII — Direct RF transmitter

## 40. Direct RF DAC

With sufficiently fast DACs,

$$
\boxed{
digital\ waveform
\rightarrow
RF\ DAC
\rightarrow
filter
\rightarrow
PA.
}
$$

No analog I/Q modulator is required.

Advantages:

- reduced analog conversion stages;
- digital frequency agility;
- easier multicarrier generation.

Tradeoffs:

- DAC sample rate;
- DAC SFDR;
- clock jitter;
- output filtering;
- power.

Reference:

[Analog Devices — Implementing a Direct RF Transmitter](https://www.analog.com/en/resources/technical-articles/implementing-a-direct-rf-transmitter-for-wireless-communications.html)

---

# Part XIV — Polar and outphasing concepts

## 41. Cartesian transmitter

The conventional I/Q transmitter represents

$$
s(t)=I(t)+jQ(t).
$$

Amplitude and phase vary simultaneously.

This is natural for linear modulation but requires a sufficiently linear PA.

---

## 42. Polar representation

The same waveform can be written

$$
s(t)=A(t)e^{j\phi(t)}.
$$

A polar transmitter separates

- envelope $A(t)$;
- phase $\phi(t)$.

This can enable more efficient nonlinear RF amplification, but amplitude/phase path alignment becomes difficult.

---

## 43. Outphasing

A variable-envelope waveform can be represented as the sum of two constant-envelope signals:

$$
s(t)=s_1(t)+s_2(t).
$$

Each branch can use an efficient nonlinear PA.

The output amplitude is controlled through relative phase.

The challenge is efficient power combining and wideband phase accuracy.

---

# Part XV — Power amplifier integration

## 44. Why PA architecture affects the whole transceiver

The PA dominates transmitter power consumption.

For high-PAPR OFDM,

$$
PAPR
=
10\log_{10}
\frac{P_{peak}}{P_{avg}}.
$$

Operating with enough backoff for linearity reduces efficiency.

Thus modern transceivers use techniques such as

- DPD;
- CFR;
- envelope tracking;
- Doherty PA;
- observation receivers.

---

## 45. Digital predistortion

If the PA implements nonlinear transfer function

$$
y=f(x),
$$

DPD applies an approximate inverse:

$$
x_{DPD}=f^{-1}(x_{desired}).
$$

Then ideally

$$
f(x_{DPD})\approx x_{desired}.
$$

An observation receiver measures the PA output so the DPD coefficients can adapt.

This is why modern base-station transceivers often include dedicated ORx paths.

---

# Part XVI — TDD versus FDD front ends

## 46. TDD

Transmit and receive use the same frequency at different times.

A typical front end is

$$
\boxed{
antenna
\leftrightarrow
T/R\ switch
\leftrightarrow
RX/TX.
}
$$

Advantages:

- one frequency allocation;
- channel reciprocity for beamforming;
- simpler filtering than FDD.

Challenges:

- switch isolation;
- PA-to-LNA leakage;
- fast switching;
- transient settling.

---

## 47. FDD

Transmit and receive occur simultaneously at different frequencies.

A duplexer separates

$$
f_{TX}
$$

and

$$
f_{RX}.
$$

The receiver must survive a very large nearby transmit signal.

This creates stringent requirements for

- duplexer isolation;
- LNA linearity;
- mixer linearity;
- phase noise;
- self-interference.

---

## 48. Duplexer versus diplexer

A **duplexer** enables simultaneous TX/RX separation, usually within a defined radio band plan.

A **diplexer** generally combines/separates two frequency regions.

The physical networks may look similar, but the system role differs.

---

# Part XVII — Circulator-based front ends

## 49. Circulator

A three-port circulator ideally routes

$$
1\rightarrow2,
\quad
2\rightarrow3,
\quad
3\rightarrow1.
$$

It can connect

- PA;
- antenna;
- receiver

while providing directional isolation.

Common in radar/microwave systems, but ferrite circulators are generally less attractive for highly integrated handset radios.

---

# Part XVIII — Frequency synthesizer architecture

## 50. Fractional-N PLL

Modern agile radios commonly use

$$
\text{reference}
\rightarrow
PFD/CP
\rightarrow
loop\ filter
\rightarrow
VCO
\rightarrow
fractional\ divider.
$$

Advantages:

- fine frequency resolution;
- rapid tuning;
- integrated implementation.

Important impairments:

- reference spurs;
- fractional spurs;
- VCO phase noise;
- settling time.

---

## 51. LO pulling and leakage

PA output or strong RF signals can couple into the VCO.

If the oscillator frequency is disturbed, the effect is called **pulling**.

Direct-conversion architectures deserve special care because

$$
f_{LO}\approx f_{RF}.
$$

Isolation, differential design, shielding and synthesizer planning matter.

---

# Part XIX — Gain control

## 52. Receiver AGC

The receiver must map a very large RF input range into the ADC's finite range.

Typical chain:

$$
LNA
\rightarrow
VGA/attenuator
\rightarrow
ADC.
$$

AGC balances

- sensitivity;
- linearity;
- ADC headroom;
- gain-switching artifacts.

---

## 53. Why maximum gain is not always best

Maximum gain reduces downstream noise contribution.

But it can cause

- blocker compression;
- IM3;
- ADC clipping.

Thus practical radios use **gain tables** rather than a single gain state.

---

# Part XX — Cascade analysis

## 54. Cascaded noise figure

Use Friis:

$$
F_{total}
=
F_1
+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+\cdots.
$$

Interview conclusion:

> The first LNA's noise figure and gain dominate receiver sensitivity.

---

## 55. Cascaded IP3

For power gains in linear units, an approximate cascade relation is

$$
\frac{1}{IIP3_{tot}}
\approx
\frac{1}{IIP3_1}
+
\frac{G_1}{IIP3_2}
+
\frac{G_1G_2}{IIP3_3}
+\cdots.
$$

Early gain improves NF but worsens the impact of downstream linearity.

This is a fundamental RF architecture tradeoff.

---

# Part XXI — Blockers and dynamic range

## 56. Desired signal versus blocker

A receiver may need to detect

$$
P_{wanted}=-100\ \mathrm{dBm}
$$

while a nearby blocker is

$$
P_{blocker}=-20\ \mathrm{dBm}.
$$

That is

$$
80\ \mathrm{dB}
$$

of instantaneous power difference.

This drives

- filtering;
- linearity;
- gain distribution;
- ADC dynamic range.

---

## 57. Architecture selection is often a blocker problem

A radio that looks excellent for NF in isolation may fail in the real RF environment.

Architecture must consider

- out-of-band blockers;
- adjacent-channel blockers;
- TX leakage;
- jammer environment;
- coexistence.

This is why front-end filtering does not disappear even in SDR/direct-sampling radios.

---

# Part XXII — Calibration

## 58. Modern transceivers depend on calibration

Highly integrated radios deliberately accept analog imperfections and correct them digitally.

Common calibrations include

- RX DC offset;
- TX LO leakage;
- RX I/Q imbalance;
- TX I/Q imbalance;
- quadrature error correction;
- gain/phase channel matching;
- filter tuning;
- synthesizer calibration.

---

## 59. Why this is a modern architecture shift

Older radios often achieved accuracy through expensive analog components.

Modern radios increasingly use

$$
\boxed{
\text{moderate analog accuracy}
+
\text{digital calibration}
}
$$

to achieve lower cost, lower power and much greater reconfigurability.

---

# Part XXIII — Receiver architecture comparison

## 60. Compact comparison

| Feature | Superhet | Zero-IF | Low-IF | Direct RF sampling |
|---|---:|---:|---:|---:|
| Analog complexity | high | low | medium | low-medium |
| Integration | medium | **excellent** | excellent | medium |
| Image problem | **yes** | no classical image | **yes** | alias/filter problem |
| DC offset | low concern | **major concern** | low concern | digital/DC dependent |
| Flicker noise | minor | **important** | reduced | ADC dependent |
| I/Q mismatch | architecture dependent | **important** | important | digital correction |
| RF filtering | strong | moderate | moderate | **critical anti-alias** |
| ADC rate | moderate | modest | modest | **highest** |
| ADC dynamic range | moderate | moderate | moderate | **highest requirement** |
| Frequency agility | medium | **high** | high | **very high** |
| Power | medium-high | **low** | low-medium | high |
| Best fit | high dynamic range/selectivity | integrated mobile/SDR | narrowband integrated radio | wideband SDR/radar/base station |

---

# Part XXIV — Transmitter architecture comparison

## 61. Compact comparison

| Architecture | Advantage | Main concern |
|---|---|---|
| Heterodyne TX | filtering/isolation | complexity |
| Direct I/Q TX | integration, agility | LO leakage + image |
| Direct RF DAC | flexibility + bandwidth | DAC/clock/filtering |
| Polar | PA efficiency potential | envelope/phase alignment |
| Outphasing | efficient constant-envelope PAs | combiner + phase accuracy |

---

# Part XXV — Architecture decision framework

## 62. Ask these questions

When selecting an RF architecture:

1. What RF frequency range?
2. What instantaneous bandwidth?
3. How strong are blockers?
4. What receiver NF is required?
5. What linearity/IIP3/IIP2 is required?
6. What ADC/DAC technology is available?
7. What power budget?
8. What size/cost constraints?
9. TDD or FDD?
10. How much digital calibration is acceptable?
11. Is multiband operation required?
12. Is phase coherence/MIMO required?

---

# Part XXVI — Interview questions

## 63. Why is zero-IF popular?

Because it eliminates IF filters and the classical image problem, enables baseband filtering, reduces component count and integrates extremely well.

But immediately mention:

- DC offset;
- $1/f$ noise;
- I/Q mismatch;
- LO leakage;
- IP2.

That second sentence turns a basic answer into an interview-quality answer.

---

## 64. Why is IIP2 especially important in direct conversion?

Second-order mixing between blockers can create difference-frequency products near DC.

Since the desired zero-IF signal also lies near DC, those products directly corrupt the channel.

---

## 65. Why does a superhet need an image filter?

Because two RF frequencies can mix with the same LO and produce the same absolute IF.

The image is separated from the wanted RF by

$$
2f_{IF}.
$$

---

## 66. Why not always use direct RF sampling?

Because the ADC must simultaneously provide

- very high sample rate;
- high ENOB/SFDR;
- blocker tolerance;
- low aperture jitter.

It also shifts more selectivity burden onto RF filtering and DSP.

---

## 67. Why not always use zero-IF?

Zero-IF simplifies hardware but creates severe near-DC impairments and requires excellent quadrature calibration and even-order linearity.

For some blocker-rich or very narrowband systems, another architecture can be easier to make robust.

---

## 68. Low-IF versus zero-IF?

Low-IF moves the wanted signal away from DC and reduces flicker/DC-offset problems.

The price is a nearby image that must be rejected with complex filtering or I/Q processing.

---

## 69. What causes TX LO leakage?

DC offsets in the I/Q baseband/modulator paths.

A nonzero baseband DC term multiplied by the LO appears as residual carrier power at $f_{LO}$.

---

## 70. What causes TX image?

I/Q amplitude or quadrature-phase mismatch.

Digital pre-correction is commonly used to suppress it.

---

## 71. What determines receiver sensitivity?

At first order:

$$
P_{min}
=
-174
+
10\log_{10}B
+
NF
+
SNR_{req}
$$

in dBm at room temperature.

Then account for implementation margin and waveform-specific detection requirements.

---

## 72. Why does early RF gain help NF but hurt linearity?

High LNA gain suppresses the noise contribution of downstream stages through Friis.

But it also magnifies blockers before later nonlinear stages and reduces headroom.

---

## 73. TDD versus FDD?

TDD uses time separation and usually a T/R switch.

FDD transmits and receives simultaneously at separate frequencies and therefore needs strong duplexer isolation and much greater RX tolerance of TX leakage.

---

## 74. What is the most modern architecture trend?

There are two simultaneous trends:

$$
\boxed{
\text{highly integrated zero-IF transceivers}
}
$$

for low-power, agile radios,

and

$$
\boxed{
\text{direct RF sampling / direct RF DAC}
}
$$

for very-wideband, high-performance radios where converter power and filtering are acceptable.

---

# Part XXVII — Practical interview block diagrams

## 75. Smartphone-style integrated radio

$$
\boxed{
\begin{aligned}
antenna
&\rightarrow
duplexer/filter
\rightarrow
LNA
\rightarrow
zero\text{-}IF\ RX
\rightarrow
ADC
\rightarrow
modem,\\
modem
&\rightarrow
DAC
\rightarrow
I/Q\ TX
\rightarrow
PA
\rightarrow
duplexer/filter
\rightarrow
antenna.
\end{aligned}
}
$$

---

## 76. Base-station radio

$$
\boxed{
\text{antenna array}
\leftrightarrow
\text{T/R front end}
\leftrightarrow
\text{multi-channel transceiver}
\leftrightarrow
JESD204
\leftrightarrow
FPGA/SoC.
}
$$

Modern examples add

- DPD;
- CFR;
- ORx;
- multichip synchronization;
- beamforming.

---

## 77. Wideband SDR/radar receiver

$$
\boxed{
antenna
\rightarrow
preselector
\rightarrow
LNA
\rightarrow
RF\ ADC
\rightarrow
FPGA
\rightarrow
DDC/PFB/FFT.
}
$$

This minimizes analog frequency conversion but puts heavy demands on converter and clock performance.

---

# Part XXVIII — Key equations to remember

## 78. Mixer

$$
f_{out}=|mf_{RF}\pm nf_{LO}|.
$$

The desired first-order term is normally

$$
|f_{RF}-f_{LO}|.
$$

---

## 79. Thermal noise

$$
N=-174+10\log_{10}B+NF
$$

in dBm at approximately room temperature.

---

## 80. Sensitivity

$$
P_{sens}
\approx
-174
+
10\log_{10}B
+
NF
+
SNR_{req}.
$$

---

## 81. Friis

$$
F_{total}
=
F_1+
\frac{F_2-1}{G_1}
+
\cdots.
$$

---

## 82. Jitter-limited ADC SNR

$$
SNR_j
=
-20\log_{10}(2\pi f_{in}\sigma_t).
$$

---

## 83. Image spacing in superhet

$$
\Delta f_{image}=2f_{IF}.
$$

These six equations cover a surprising fraction of architecture interviews.

---

# Part XXIX — References

## Classic / foundational

- B. Razavi, [“Design Considerations for Direct-Conversion Receivers,” IEEE Transactions on Circuits and Systems II, 1997](https://ieeexplore.ieee.org/document/592569/), DOI 10.1109/82.592569.
- R. V. L. Hartley, **Modulation System**, U.S. Patent 1,666,206, 1928 — historical basis of the phasing/image-reject concept.
- D. K. Weaver, classic quadrature/phasing single-sideband architecture — historical basis of the Weaver image-reject approach.

## Architecture reviews

- Analog Devices, [A Review of Wideband RF Receiver Architecture Options](https://www.analog.com/en/resources/technical-articles/a-review-of-wideband-rf-receiver-architecture-options.html)
- Analog Devices, [Radio Architecture Matters: RF Sampling vs Zero-IF](https://www.analog.com/en/resources/technical-articles/radio-architecture-matters.html)
- Analog Devices, [Understanding IP2 and IP3 Issues in Direct Conversion Receivers](https://www.analog.com/en/resources/technical-articles/understanding-ip2-and-ip3-issues-in-direct-conversion-receivers.html)
- Analog Devices, [Optimizing Very Wideband Direct Conversion Receivers](https://www.analog.com/en/resources/design-notes/2023/11/21/07/11/optimizing-performance-wideband-direct-conversion-receivers.html)
- Texas Instruments, [How to Complete Your RF Sampling Solution](https://www.ti.com/lit/ta/ssztba7/ssztba7.pdf)

## Transmitter architectures

- Analog Devices, [Implementing a Direct RF Transmitter for Wireless Communications](https://www.analog.com/en/resources/technical-articles/implementing-a-direct-rf-transmitter-for-wireless-communications.html)
- Analog Devices, [Quadrature Digital Upconverter in Microwave Transmit Systems](https://www.analog.com/en/resources/app-notes/an-0996.html)

## Integrated transceiver examples

- Analog Devices, [AD9361 RF Agile Transceiver](https://www.analog.com/en/products/ad9361.html)
- Analog Devices, [ADRV9002 RF Transceiver](https://www.analog.com/en/products/ADRV9002.html)
- Analog Devices, [ADRV9040 8T8R RF Transceiver SoC](https://www.analog.com/en/products/ADRV9040.html)
- Analog Devices, [Software-Defined Radio for Engineers](https://www.analog.com/media/en/training-seminars/design-handbooks/Software-Defined-Radio-for-Engineers-2018/SDR4Engineers.pdf)

## Books worth knowing

- Behzad Razavi, **RF Microelectronics** — transceiver architectures, mixers, LNAs, oscillators and direct conversion.
- Thomas H. Lee, **The Design of CMOS Radio-Frequency Integrated Circuits** — RFIC architecture and circuit design.
- Stephen A. Maas, **Microwave Mixers** — detailed mixer physics and mixer-system behavior.

---

# Related pages

[RF & Microwave](../rf-microwave/) · [Wireless & MIMO](../wireless/) · [3GPP Standards](../3gpp-standards/) · [RF Bands](../rf-bands/) · [Modern Signal Generator](../modern-signal-generator/) · [Modern Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/) · [ADC & DAC](../data-converters/) · [Analog Mixed-Signal IC Design](../analog-mixed-signal/) · [Signal Integrity & Power Integrity](../signal-power-integrity/) · [AESA & Phased Arrays](../aesa/)


## Multi-element transceiver hardware

For per-element RF chains, front-end modules, beamformer ICs, LO distribution, digital/hybrid beamforming, and OTA calibration, see [Phased-Array Hardware Implementation](../phased-array-hardware/).
