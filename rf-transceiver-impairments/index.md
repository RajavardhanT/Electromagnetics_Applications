---
layout: default
title: RF Transceiver Impairments — Physics, Measurements & Calibration
description: Engineering guide to 30 RF transceiver impairments: LO leakage, I/Q imbalance, phase noise, PLL spurs, IM2/IM3, PA memory, blocking, desensitization, ADC jitter, calibration, spectrum signatures, and practical RF validation.
permalink: /rf-transceiver-impairments/
---

# RF Transceiver Impairments — Physics, Measurements & Calibration

<div class="intuition"><span class="callout-title">Engineering perspective</span>A real RF transceiver is never a perfect frequency translator. <strong>Finite isolation, nonlinear transfer characteristics, noise, time-varying clocks, I/Q mismatch, and feedback dynamics</strong> introduce unwanted spectral components and waveform errors. The useful engineering chain is <strong>physical cause → mathematical model → observed signature → discriminating measurement → hardware or DSP correction</strong>.</div>

**Companion:** [RF Transceiver Architectures — Interview Ready](../rf-transceiver-architectures/) explains where these effects enter superheterodyne, zero-IF, low-IF, and direct-RF sampling systems. This page concentrates on **what fails, why, and how to measure or fix it**.

## 1. Where impairments enter a transceiver

<div class="pathway"><span class="node">reference / PLL / LO</span><span class="arrow">→</span><span class="node">mixer and quadrature generation</span><span class="arrow">→</span><span class="node">PA / LNA / filters</span><span class="arrow">→</span><span class="node">ADC / DAC and DSP</span></div>

| Location | Dominant mechanisms | Measured symptoms |
|---|---|---|
| LO and synthesizer | phase noise, reference spurs, frequency error, pulling | skirts, discrete spurs, EVM, reciprocal mixing |
| I/Q mixer and baseband | LO feedthrough, DC offset, quadrature error, image | carrier spur, mirror-frequency signal, DC pedestal |
| PA / LNA / switches | gain compression, IM2/IM3, AM–AM/AM–PM, memory | EVM, ACPR/ACLR, desensitization, harmonics |
| RF passives / antenna sharing | mismatch, leakage, PIM, finite duplexer isolation | reflected power, RX blocking, intermodulation |
| Converters and DSP | quantization, clipping, clock jitter, AGC errors, filter mismatch | noise floor, spurs, transient EVM, distortion |

**Important distinction:** an impairment can appear as a *discrete spur*, a *wideband noise contribution*, a *modulation-dependent distortion*, or a *time-domain transient*. The spectrum alone does not always identify the cause.

## 2. Mixer and frequency-conversion impairments (1–8)

| # | Impairment | Physical mechanism | Main signature | First-line mitigation |
|---|---|---|---|---|
| 1 | **TX LO leakage / carrier feedthrough** | LO-to-RF parasitics and I/Q DC offsets | unwanted carrier at $f_{\mathrm{LO}}$ | isolation, balanced layout, calibrated I/Q DC offsets |
| 2 | **I/Q gain imbalance** | unequal I and Q amplitudes | mirrored sideband/image; EVM | relative I/Q gain correction |
| 3 | **Quadrature phase error** | LO branches not exactly 90° apart | image leakage; EVM | phase-skew calibration |
| 4 | **Frequency-selective I/Q imbalance** | mismatch of baseband filter and converter responses | image rejection varies across occupied bandwidth | complex FIR or widely-linear calibration |
| 5 | **RX LO self-mixing / DC offset** | leaked LO returns to mixer and beats with LO | DC pedestal, baseband saturation | physical isolation and RX offset correction |
| 6 | **Even-order intermodulation (IM2)** | second-order nonlinearity/asymmetry | blocker difference frequency falls near DC | improve IIP2 and front-end filtering |
| 7 | **Mixer harmonic spurs** | conversion with LO harmonics and nonlinear RF terms | responses at combinations of LO/RF frequencies | spur planning, filtering, switching topology |
| 8 | **Image-frequency interference** | different RF frequencies map to same IF | in-band unwanted signal after conversion | RF image filter or image-reject architecture |

### 2.1 LO leakage: separate physical feedthrough from digitally cancellable carrier

An ideal quadrature transmitter generates

$$
s_{\mathrm{RF}}(t)=I(t)\cos(\omega_{\mathrm{LO}}t)-Q(t)\sin(\omega_{\mathrm{LO}}t).
$$

Adding unintended DC offsets $I_0,Q_0$ creates a carrier-frequency term. Together with direct parasitic LO feedthrough, the complex carrier is

$$
L_{\mathrm{res}}=L_{\mathrm{parasitic}}+G(I_0+jQ_0).
$$

For fixed complex gain $G$, the mathematical null is $I_0+jQ_0=-L_{\mathrm{parasitic}}/G$. A **calibration sweep** estimates the practical null, including the actual modulator phase convention, gain, and offset quantization.

**TX bench procedure:** disable payload modulation without unintentionally disabling the mixer; observe the carrier at the RF port using suitable attenuation; sweep the **differential I offset** followed by the **differential Q offset**, and repeat to converge. Check temperature, frequency, TX gain, and PA operating point. Baseband common-mode bias adjustment is **not equivalent** to differential I/Q offset correction.

**RX distinction:** LO power leaking toward the input can self-mix:

$$
\cos^2(\omega_{\mathrm{LO}}t)=\tfrac12+\tfrac12\cos(2\omega_{\mathrm{LO}}t).
$$

An RX DC servo can remove the resulting baseband offset, but **does not eliminate radiated or conducted LO leakage**. In zero-IF transmitters a conventional RF bandpass filter generally cannot reject a spur exactly at the desired carrier.

### 2.2 I/Q imbalance: a useful complex-baseband model

For a narrowband mismatch, the impaired complex signal can be represented by

$$
y(t)=\alpha x(t)+\beta x^*(t)+c+n(t),
$$

where $\alpha$ is desired-path gain, $\beta$ represents the **conjugate image**, $c$ is a DC/carrier term, and $n$ represents noise. With the same signal normalization for desired and image components,

$$
\mathrm{IRR}=10\log_{10}\frac{|\alpha|^2}{|\beta|^2}\ \mathrm{dB}.
$$

For wideband mismatches, $\alpha$ and $\beta$ become frequency-dependent responses; correcting one tone may not correct an entire OFDM channel. Estimate a **frequency-selective widely-linear equalizer** when necessary.

**Diagnostic:** drive I/Q with a single complex tone at baseband $+\Delta f$. Inspect the wanted RF sideband at $f_{\mathrm{LO}}+\Delta f$, the image at $f_{\mathrm{LO}}-\Delta f$, and the carrier at $f_{\mathrm{LO}}$. The wanted-image difference measures sideband suppression. Be explicit whether suppression is expressed as a *positive image-rejection ratio* or a *negative relative image power in dBc*.

### 2.3 IM2 versus IM3

Model a weakly nonlinear stage as

$$
y(t)=a_1x(t)+a_2x^2(t)+a_3x^3(t)+\cdots.
$$

For two equal-frequency-offset tones $f_1,f_2$, $a_2x^2$ creates a component at $|f_1-f_2|$, a particular concern for **zero-IF receivers**. The cubic term creates products at $2f_1-f_2$ and $2f_2-f_1$, often close to wanted channels.

In the small-signal region, with equal input tones and power measured on a consistent dBm scale,

$$
\mathrm{OIP3}\approx P_{\mathrm{fund,out}}+
\frac{P_{\mathrm{fund,out}}-P_{\mathrm{IM3,out}}}{2}.
$$

The analogous input-referred expression uses measured input fundamental-tone power and input-referred IM3. These extrapolated intercepts are **not** saturation powers and cease to describe the amplifier accurately near compression.

## 3. Synthesizer, LO, and sampling-clock impairments (9–14)

| # | Impairment | Physical cause | Observable / risk | Mitigation |
|---|---|---|---|---|
| 9 | **LO phase noise** | random oscillator/PLL phase fluctuations | noise skirts, common phase error, EVM | lower-noise VCO/reference, PLL bandwidth design |
| 10 | **Reciprocal mixing** | blocker downconverts through LO phase-noise skirt | blocker-dependent in-band noise floor | low phase noise at relevant offset, preselection |
| 11 | **PLL reference or fractional spurs** | reference coupling, charge-pump ripple, quantization periodicity | discrete offsets about LO/carrier | loop-filter, reference, layout and fractional-N optimization |
| 12 | **Carrier-frequency offset / drift** | reference accuracy, temperature, Doppler | constellation rotation and synchronization error | accurate reference, frequency tracking |
| 13 | **VCO/LO pulling** | PA/load or coupled oscillator changes oscillator conditions | operating-point-dependent frequency/phase shifts | buffering, shielding, isolation and supply integrity |
| 14 | **Sample-clock jitter** | uncertainty in sampling instant | SNR/EVM loss, worse for high analog input frequency | low-jitter clock tree and converters |

### 3.1 Reciprocal mixing and why close-in phase noise matters

A strong blocker at offset $\Delta f$ from a wanted signal is mixed against the **noise skirt** of the LO. For an approximate flat single-sideband phase-noise level $L(\Delta f)$, expressed in dBc/Hz over an effective noise bandwidth $B$,

$$
P_{\mathrm{reciprocal}}\approx P_{\mathrm{blocker}}+
L(\Delta f)+10\log_{10}(B/1\ \mathrm{Hz})\quad[\mathrm{dBm}].
$$

This is a **first-order estimate**: real measurements integrate the phase-noise profile against the channel/filter response, and LO architecture and conventions matter.

**Illustrative calculation:** a $-10$ dBm blocker, $-125$ dBc/Hz phase noise at the relevant offset, and a flat 1 MHz equivalent noise bandwidth give approximately $-75$ dBm of converted interference. This is *not* the receiver's intrinsic noise floor. The striking point is that **blocker power multiplies the practical importance of phase noise**.

### 3.2 Sampling jitter sets an ADC ceiling

For a full-scale sine wave and RMS random aperture jitter $\sigma_t$,

$$
\mathrm{SNR}_{\mathrm{jitter}}\approx
-20\log_{10}(2\pi f_{\mathrm{in}}\sigma_t)\ \mathrm{dB}.
$$

This is a jitter-only limit, not total ADC SNR. Use the **actual analog input frequency** at the converter, not merely the final DSP baseband frequency. Clock and ADC aperture-jitter contributions should be combined appropriately if uncorrelated.

### 3.3 Separate phase noise from discrete spurs

A wide skirt follows a continuous power spectral density (dBc/Hz); a PLL reference spur appears as a discrete component (often dBc). **RBW changes the apparent power in a noise trace but should not change the integrated power of a resolved CW spur** when the instrument is configured and corrected appropriately.

## 4. Amplifier and nonlinear impairments (15–22)

| # | Impairment | Mechanism | Symptom | Practical response |
|---|---|---|---|---|
| 15 | **Gain compression** | device approaches nonlinear large-signal operation | gain droop, worse EVM | backoff, more linear device, gain budgeting |
| 16 | **IM3 distortion** | cubic response under multi-tone/modulated drive | adjacent-channel products | improve linearity, backoff, DPD |
| 17 | **AM–AM distortion** | gain varies with instantaneous signal envelope | radial constellation errors | PA linearization/DPD |
| 18 | **AM–PM distortion** | phase delay varies with signal envelope | tangential constellation errors | phase-aware DPD, bias/device design |
| 19 | **Spectral regrowth** | nonlinear PA response spreads modulated spectrum | ACLR/ACPR increase | DPD, backoff, waveform management |
| 20 | **PA memory effects** | bias, thermal, trapping and frequency-dependent dynamics | residual dynamic distortion not fixed by static LUT | memory-polynomial / generalized-memory DPD |
| 21 | **Harmonic emissions** | nonlinear device response | $2f_c,3f_c,\ldots$ | harmonic filtering and PA matching |
| 22 | **Passive intermodulation (PIM)** | nonlinear contacts, ferromagnetic materials, corroded joints | mixing products in otherwise passive path | connection integrity, low-PIM components, test under power |

### 4.1 Compression, modulation quality, and spectral regrowth

**P1dB** is the input or output power at which the actual gain is 1 dB below the extrapolated small-signal gain. State which definition is used. A high-PAPR OFDM signal can enter compression on peaks even when its **average** power is below P1dB.

For a complex envelope $x[n]$, one generic PA model is

$$
y[n]=\sum_{p\in\{1,3,5,\ldots\}}\sum_{m=0}^{M}
a_{p,m}\,x[n-m]|x[n-m]|^{p-1}.
$$

The delayed terms are needed when static AM–AM/AM–PM curves cannot predict dynamic distortion. **DPD** approximately pre-inverts the PA response over the signal bandwidth and operating range. Its observation receiver must itself be sufficiently linear and calibrated.

### 4.2 ACPR/ACLR and EVM are different observables

- **EVM:** in-channel vector error after a specified reference-receiver/equalization procedure; RMS EVM is often normalized to reference constellation power.
- **ACPR/ACLR:** ratio of integrated adjacent-channel power to integrated carrier-channel power using the **specified integration bandwidths and filters**.
- **IM3/OIP3:** typically two-tone small-signal characterization and extrapolation.
- **P1dB:** large-signal gain compression.

One metric does not replace the others. DPD can improve ACLR and EVM, yet transmitter harmonics and wide-offset discrete spurs may still require separate testing.

## 5. Receiver, duplexing, and data-converter impairments (23–30)

| # | Impairment | Cause | Signature | Mitigation |
|---|---|---|---|---|
| 23 | **Receiver desensitization** | added interference/noise or gain compression | worsened sensitivity in presence of TX/blocker | isolation, preselection, better linearity |
| 24 | **Blocking / overload** | strong unwanted signal stresses front-end dynamic range | desired-channel BER/EVM or gain degrades | filtering, front-end gain plan, LNA/mixer linearity |
| 25 | **Cross-modulation** | nonlinear stage transfers interferer envelope onto wanted signal | desired signal acquires blocker modulation | input filtering, linearity, blocker management |
| 26 | **Flicker (1/f) noise** | device low-frequency excess noise | rising baseband noise near DC in zero-IF | device/bias design, chopper/offset architecture where appropriate |
| 27 | **TX-to-RX leakage / self-interference** | finite duplexer, switch, PCB, antenna and package isolation | receiver saturation, noise or in-band residual | isolation, cancellation, duplexing and antenna design |
| 28 | **ADC/DAC quantization and clipping** | finite word length, full scale, overload | quantization noise, harmonics, spurs | ENOB/SFDR planning, gain control, digital scaling |
| 29 | **AGC settling or gain-step transients** | finite loop response and gain-switching artifacts | clipped bursts, transient EVM, symbol loss | robust loop timing and gain-state calibration |
| 30 | **Group-delay / magnitude-response distortion** | RF/analog filter and channel nonflatness | ISI, EVM degradation across band | calibrated equalization and suitable filters |

### 5.1 Sensitivity and blocker tradeoffs

At 290 K, the approximate receiver sensitivity relationship is

$$
P_{\mathrm{sens}}\approx -174\ \mathrm{dBm/Hz}
+10\log_{10}(B/1\ \mathrm{Hz})
+\mathrm{NF}+\mathrm{SNR}_{\mathrm{required}},
$$

before any additional implementation loss. Actual receiver requirements also depend on modulation, coding, demodulation, interference, and definitions of sensitivity.

Early RF gain helps suppress the noise contributions of later stages (Friis), but excessive gain makes **LNA/mixer compression, IM2/IM3 and ADC clipping** more likely under blockers. Gain planning must satisfy both **noise figure** and **linearity**.

### 5.2 TX-to-RX leakage is not the same as TX LO leakage

A duplexer with finite isolation leaks a **portion of the entire transmitted waveform** into the receiver. This is different from the transmitter's **carrier-only LO feedthrough**, although both may occur simultaneously. TX leakage can drive RX compression and reciprocal mixing even if its frequency is outside the RX channel.

Passive intermodulation becomes a serious problem when high-power TX tones produce nonlinear products **within the RX passband**. Low-PIM coaxial cables, connectors, antennas and mechanically sound joints are RF performance components—not merely installation details.

### 5.3 Converter artifacts

Quantization noise and clipping are distinct. An unclipped ideal quantizer has quantization noise related to its resolution (with familiar ideal full-scale-sine SQNR $6.02N+1.76$ dB under standard assumptions). **Clipping** is a strong nonlinear effect that can create harmonics and broadband regrowth. In practice, use measured **ENOB, SINAD, SFDR** and the converter data sheet at the relevant input frequency and sample rate.

## 6. Spectrum/VSA symptom → likely cause → discriminating test

| Observation | First hypotheses | Test that distinguishes them |
|---|---|---|
| Spur exactly at LO/carrier with I/Q payload disabled | LO feedthrough, I/Q DC offsets | sweep I/Q differential offsets; switch LO on/off; change LO frequency |
| Mirror tone symmetric about LO | I/Q amplitude or phase mismatch | single-complex-tone test; inspect suppression versus offset |
| Carrier-region DC pedestal only in RX baseband | self-mixing, analog offset, 1/f noise | terminate RF port, vary RX gain/LO drive, inspect near-DC PSD |
| Two-tone products at $2f_1-f_2$, $2f_2-f_1$ | third-order nonlinearity | sweep input power; IM3 grows approximately 3 dB per 1 dB before compression |
| Product at $|f_1-f_2|$ in zero-IF RX | IM2 | two-tone sweep, blocker filtering, measure IIP2 |
| Smooth noise shoulders near carrier | phase noise | phase-noise measurement; compare integrated noise at fixed offsets |
| Equally spaced discrete offsets near carrier | reference/clock or modulation spur | vary reference/PLL configuration; inspect spur-offset dependence |
| Adjacent-channel shoulder increases with TX level | PA nonlinear regrowth | sweep TX power and DPD on/off; measure ACLR and EVM |
| RX noise floor rises with a strong offset blocker | reciprocal mixing or overload | sweep blocker offset and level; compare NF/phase-noise/linearity |
| EVM changes after a gain step or burst start | AGC or calibration settling | time-gated EVM, gain-state logs, burst timing |
| Distortion changes with connector torque or TX power | passive intermodulation | controlled PIM testing and joint substitution |
| SNR degrades strongly with ADC analog input frequency | sampling jitter, input-network limitations | controlled input-frequency sweep and clock substitution |

**Do not equate one spectrum feature with one fault.** For example, a carrier-frequency spur can come from multiple coupling paths. Change one independent parameter at a time.

## 7. Practical lab characterization workflow

### 7.1 Establish a known baseline

1. Confirm shared **10 MHz reference** where the setup requires coherent frequency alignment. Verify reference locking instead of assuming it.
2. Document RF channel, gain states, sample rate, analog filter bandwidth, PA bias, temperature and power.
3. Calibrate losses to the **actual device reference plane**: cable, attenuator, coupler, switch matrix and fixture.
4. Avoid analyzer overload and determine whether a low-level spur is from the DUT or the measurement system.
5. Capture baseline RF power, carrier leakage, image suppression, noise floor, EVM and channel power.

### 7.2 Separate mixer, LO, and PA contributions

1. **TX LO test:** disable modulation but preserve the mixer operating point. Record carrier leakage; optimize I/Q offset null.
2. **Image test:** apply a known complex sinusoid at $\Delta f$. Measure desired and mirrored tones; calibrate I/Q gain/phase and repeat over several $\Delta f$ values.
3. **Synthesizer test:** record phase noise at defined offset frequencies and discrete spurs. Verify how the spectrum changes with PLL settings and channel frequency.
4. **Linearity test:** use calibrated two-tone powers and frequency spacing; determine IM2/IM3 power slopes, input/output intercepts, and compression.
5. **Modulated test:** measure EVM, ACLR/ACPR, occupied bandwidth and harmonics at relevant average output powers with DPD on/off.
6. **RX blocker test:** measure desired-channel sensitivity/EVM versus blocker power and offset; correlate with gain state, phase noise and compression.
7. **Repeatability:** rerun across temperature, power, frequency, gain states and time, distinguishing factory LUT calibration from continuous tracking.

### 7.3 Measurement traps

- **dBm is absolute power; dBc is relative power; dBc/Hz is a spectral-density ratio.** They are not interchangeable.
- A resolved spur's power, a per-RBW noise trace, and an integrated noise measurement require different treatments.
- Output **port isolation** must be measured at the correct reference plane. RX DC correction cannot establish antenna-port LO leakage.
- A signal generator's own phase noise or intermodulation may limit DUT characterization; verify with a cleaner source or change source levels.
- A poorly aligned observation receiver can falsely attribute its own I/Q image and distortion to the DUT.
- For FDD and TDD, specify whether the receiver is active during transmission and which isolation/cancellation paths apply.

## 8. Calibration strategy: what corrects what?

| Calibration or design intervention | Corrects well | Does **not** directly correct |
|---|---|---|
| TX differential I/Q DC offsets | composite carrier leakage at TX output | RX antenna-port LO radiation, I/Q image, wideband PA distortion |
| I/Q gain and quadrature phase correction | frequency-flat TX/RX image | frequency-dependent image over broad bandwidth unless extended |
| Frequency-selective complex / widely-linear equalizer | wideband image and response asymmetry | physical PA compression |
| RX DC cancellation / high-pass strategy | baseband DC offset | actual LO-to-antenna leakage and all near-DC wanted information |
| PLL/reference/clock redesign | phase noise, clock spurs, sampling uncertainty | PA nonlinearity |
| PA DPD with observation receiver | AM–AM/AM–PM and relevant memory effects | physical out-of-band leakage, all harmonic emissions, all spurs |
| RF filtering, shielding, matching and isolation | leakage, blockers, out-of-band products | unwanted on-carrier TX LO spur in a zero-IF carrier band |
| RX AGC and gain planning | overload risk versus NF tradeoff | inherent device nonlinearity and LO phase noise |

### Calibration dependencies and operational details

- Recalibrate or validate across **carrier frequency, channel bandwidth, temperature, gain state, PA bias and supply conditions**. The necessary dimensions depend on device architecture.
- Run corrections in an order that avoids interactions: stabilize references and gain, correct LO/carrier offsets, tune I/Q image, then characterize nonlinear PA/DPD behavior. **Device-specific calibration order takes precedence.**
- Set thresholds for calibration success and recheck after hardware state transitions.
- Distinguish **factory**, **startup**, **background**, and **closed-loop online** calibration. Online corrections require observability and may be constrained by active traffic.
- Avoid overfitting to a single tone: verify the final **modulated channel**, including band-edge performance.

## 9. Compact numerical examples

**LO null improvement:** if carrier power falls from $-42$ dBm to $-67$ dBm at the *same calibrated RF reference plane*, LO spur reduction is **25 dB**. Whether either value satisfies a requirement depends on TX channel power, emission mask and test method.

**Sideband suppression:** a wanted sideband at $-10$ dBm and unwanted image at $-46$ dBm give an **image-rejection ratio of 36 dB** (unwanted image at $-36$ dBc relative to the wanted tone). After correcting I/Q gain/phase, if the image is $-70$ dBm, IRR becomes 60 dB.

**Two-tone OIP3:** if each fundamental appears at $0$ dBm output and an IM3 product appears at $-50$ dBm output, the small-signal estimate is $\mathrm{OIP3}\approx0+(50/2)=25$ dBm. Verify the **3:1 power slope** before interpreting an extrapolated intercept.

## 10. What to prioritize in RF hardware design and validation

1. **TX LO leakage and I/Q image calibration:** highest value for zero-IF TX validation.
2. **Phase noise, reciprocal mixing, and fractional-N spurs:** key for dense adjacent-channel/blocker conditions.
3. **IIP2/IIP3, compression and gain planning:** essential for RX dynamic range.
4. **AM–AM/AM–PM, PA memory and DPD:** central to OFDM transmitters and high-order QAM.
5. **TX-to-RX isolation, duplexers and PIM:** important for multi-radio coexistence and FDD systems.
6. **Sampling jitter, converter SFDR and time-dependent AGC:** important for broadband SDR/direct-RF conversion.

## 11. References and further study

- Analog Devices, [AN-1039: Correcting Imperfections in IQ Modulators to Improve RF Signal Fidelity](https://www.analog.com/en/resources/app-notes/an-1039.html). Includes LO/carrier leakage and I/Q calibration methods and their temperature/frequency behavior.
- Analog Devices, [Understanding IP2 and IP3 Issues in Direct Conversion Receivers](https://www.analog.com/en/resources/technical-articles/understanding-ip2-and-ip3-issues-in-direct-conversion-receivers.html).
- Analog Devices, [Optimizing Very Wideband Direct Conversion Receivers](https://www.analog.com/en/resources/design-notes/2023/11/21/07/11/optimizing-performance-wideband-direct-conversion-receivers.html).
- Analog Devices, [Radio Architecture Matters: RF Sampling vs Zero-IF](https://www.analog.com/en/resources/technical-articles/radio-architecture-matters.html).
- B. Razavi, *RF Microelectronics*, 2nd ed. — mixer, oscillator and direct-conversion fundamentals.
- T. H. Lee, *The Design of CMOS Radio-Frequency Integrated Circuits*, 2nd ed. — phase noise, nonlinearities and RFIC implementation.
- S. A. Maas, *Microwave Mixers*, 2nd ed. — practical mixing and spurious-response physics.

## Related pages

[RF Transceiver Architectures](../rf-transceiver-architectures/) · [RF & Microwave](../rf-microwave/) · [Modern Signal Generator](../modern-signal-generator/) · [Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/) · [Data Converters](../data-converters/) · [Software-Defined Radio](../sdr/) · [3GPP Standards](../3gpp-standards/) · [Phased-Array Hardware](../phased-array-hardware/) · [Measurements & Instruments](../measurements/)


**Mobile handset context:** [Mobile Phone RF-to-Digital Architecture](../mobile-phone-architecture/) places LO leakage, I/Q imbalance, PA memory, blocker desense, noise figure and ADC jitter into the complete 5G NR modem and Snapdragon computing path.
