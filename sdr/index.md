---
layout: default
title: Software-Defined Radio (SDR) — Physics, Architecture and Measurements
description: Practical software-defined radio reference covering RF front ends, complex I/Q sampling, digital downconversion, SDR receiver and transmitter chains, synchronization, RF impairments, spectral analysis, and Python experiments.
---

# Software-Defined Radio (SDR)

<div class="intuition"><span class="callout-title">Physical intuition</span>A software-defined radio moves frequency translation, filtering, modulation, demodulation, and detection from fixed analog circuits into <strong>programmable digital signal processing</strong>. It does not eliminate RF hardware. Antenna coupling, preselection, amplifier noise, nonlinearities, ADC dynamic range, clock quality, and transmitter filtering still determine the achievable performance.</div>

<div class="pathway"><span class="node">antenna</span><span class="arrow">→</span><span class="node">filter + LNA</span><span class="arrow">→</span><span class="node">mixer / ADC</span><span class="arrow">→</span><span class="node">complex I/Q</span><span class="arrow">→</span><span class="node">DSP + demodulation</span></div>

## 1. What makes a radio software defined?

In a conventional receiver, analog components carry out much of the frequency conversion, channel filtering, and demodulation. In an SDR, the analog front end conditions the signal, while digital processing implements the configurable parts of the radio.

Typical SDR applications include spectrum monitoring, AM/FM reception, digital communications, channel sounding, radar, direction finding, GNSS experiments, and RF testing. An SDR may use a **zero-IF**, **low-IF**, **IF-sampling**, or **direct-RF-sampling** architecture; SDR describes programmability, not one particular mixer arrangement.

## 2. Receiver and transmitter architecture

**Receiver**

$$
\boxed{\text{antenna}\to\text{RF filter/LNA}\to\text{tuner or ADC}\to\text{I/Q samples}\to\text{DDC + filtering}\to\text{demodulator}}
$$

**Transmitter**

$$
\boxed{\text{data}\to\text{modulation}\to\text{pulse shaping/DUC}\to\text{DAC + RF upconversion}\to\text{PA/filter}\to\text{antenna}}
$$

The receiver chain must manage sensitivity, blocking, spurious responses, and aliasing. The transmitter must manage spectral emissions, image/LO leakage, output power, EVM, and PA linearity.

## 3. Complex I/Q sampling

A real passband signal can be written as

$$
v_{RF}(t)=\Re\{z(t)e^{j2\pi f_c t}\},
\qquad z(t)=I(t)+jQ(t).
$$

For a tone offset by $\Delta f$ from the tuned carrier,

$$
z(t)=Ae^{j(2\pi\Delta f t+\phi)}.
$$

The sign of $\Delta f$ is preserved in complex samples: positive and negative frequencies are distinguishable. For an ideal complex baseband signal with occupied spectrum from $-B/2$ to $B/2$, a complex sampling rate $f_s\ge B$ is the theoretical Nyquist limit; practical designs require transition bands and margin for filtering. This should **not** be confused with the $f_s\ge2f_{max}$ criterion for sampling a real low-pass signal.

**Digital downconversion (DDC)** multiplies samples by a numerically controlled oscillator and then low-pass filters and decimates:

$$
y[n]=\operatorname{LPF}\{x[n]e^{-j2\pi f_0 n/f_s}\}.
$$

Decimation by $M$ reduces the sampling rate to $f_s/M$ **only after** suitable anti-alias filtering.

## 4. RF hardware still sets the limits

| Hardware / effect | Observable consequence | What to measure |
|---|---|---|
| Antenna and preselector | Desired-signal coupling, blockers and aliases | Return loss, filtering, antenna response |
| LNA noise figure | Receiver noise floor and sensitivity | Noise figure, minimum detectable signal |
| Gain distribution | Saturation versus quantization noise | Gain sweep, compression, clipping |
| Mixer / quadrature imbalance | Mirror-frequency images | Image-rejection ratio |
| LO leakage and DC offset | Carrier-centered spur / missing baseband detail | DC bin, carrier leakage |
| ADC resolution and ENOB | Quantization and converter noise/distortion | SINAD/SNDR, SFDR, effective bits |
| Clock jitter and phase noise | Degradation at high input frequency, reciprocal mixing | Phase-noise spectrum, EVM |
| PA nonlinearity | Spectral regrowth, ACPR/ACLR, EVM | Two-tone IMD, power sweep, EVM |

For an ideal full-scale sinusoid at an ideal $N$-bit ADC, the quantization-limited signal-to-noise ratio is approximately

$$
\mathrm{SNR}_{q}\approx 6.02N+1.76\ \mathrm{dB}.
$$

Real performance depends on **ENOB**, analog input circuitry, sampling-clock jitter, and operating conditions. With rms aperture jitter $\sigma_t$, a useful single-tone approximation is

$$
\mathrm{SNR}_{jitter}\approx-20\log_{10}(2\pi f_{in}\sigma_t).
$$

This explains why high-frequency direct sampling places severe requirements on clock quality.

## 5. Spectral analysis and measurement

An FFT turns a finite time record into an estimate of the sampled spectrum. For $N$ samples at rate $f_s$, the nominal frequency-bin spacing is

$$
\Delta f=\frac{f_s}{N}.
$$

Bin spacing is not the same as the effective resolution bandwidth of a windowed spectrum estimate. Apply an appropriate window, calibrate the FFT amplitude or PSD normalization, and account for the window's equivalent noise bandwidth when reporting noise levels.

A receiver noise floor is not determined by FFT bin spacing alone. With noise figure $NF$ and effective noise bandwidth $B_n$,

$$
P_n\;[\mathrm{dBm}]\approx-174+10\log_{10}(B_n/\mathrm{Hz})+NF
$$

at approximately 290 K, referred to the receiver input. Processing gain from narrowing bandwidth can make a displayed noise floor lower without improving the RF front end's intrinsic noise figure.

**Measurement checklist:** center frequency, sample rate, RF gain, analog bandwidth, LO accuracy, clock reference, I/Q gain/phase calibration, DC suppression, window, FFT/averaging parameters, amplitude units, and known-input calibration.

## 6. A reproducible Python experiment: complex tones and DDC

This example is entirely simulated and requires only NumPy and Matplotlib. It creates two baseband tones, digitally shifts one to DC, and compares the spectra.

```python
import numpy as np
import matplotlib.pyplot as plt

fs = 1_000_000       # complex samples per second
N = 65536
t = np.arange(N) / fs

# Ideal sampled complex-baseband signal
x = (np.exp(1j * 2*np.pi * 100_000*t)
     + 0.35*np.exp(1j * 2*np.pi * (-180_000)*t))

# DDC: shift +100 kHz tone to DC
y = x * np.exp(-1j * 2*np.pi * 100_000*t)

def spectrum_db(z):
    window = np.hanning(len(z))
    X = np.fft.fftshift(np.fft.fft(z * window))
    f = np.fft.fftshift(np.fft.fftfreq(len(z), d=1/fs))
    mag = np.abs(X) / np.sum(window)
    return f/1e3, 20*np.log10(np.maximum(mag, 1e-12))

f, before = spectrum_db(x)
_, after = spectrum_db(y)
plt.plot(f, before, label="Before DDC")
plt.plot(f, after, label="After DDC")
plt.xlabel("Frequency (kHz)")
plt.ylabel("Magnitude (dB, relative)")
plt.xlim(-400, 400)
plt.ylim(-100, 10)
plt.grid(True)
plt.legend()
plt.show()
```

**Expected result:** the +100 kHz tone appears at 0 Hz after mixing, while the −180 kHz tone moves to −280 kHz. This example demonstrates digital frequency translation but does not yet apply a channel-select filter or decimation.

## 7. Suggested hands-on SDR exercises

1. **FM or AM receiver:** acquire I/Q samples; plot spectrum and waterfall; implement filtering and demodulation. Check sample-rate and frequency-offset effects.
2. **Receiver characterization:** inject a calibrated CW tone using a signal generator and step input power. Measure gain, sensitivity proxy, clipping level, and spurs. Avoid interpreting an uncalibrated FFT magnitude as dBm.
3. **Two-tone linearity:** generate two closely spaced tones at controlled levels; identify third-order intermodulation at $2f_1-f_2$ and $2f_2-f_1$. Keep source-generated IMD below the device's response.
4. **QPSK/OFDM chain:** construct symbols, pulse shape, add timing/frequency offsets, and implement carrier recovery and equalization. Plot constellation and EVM versus SNR.
5. **Coherent multi-channel phase:** share frequency/time references across receivers and measure relative phase and delay. Evaluate stability before attempting beamforming or direction finding.

For over-the-air experiments, comply with local spectrum rules. Begin with receive-only experiments or conducted, properly attenuated and shielded tests.

## 8. Platform and software choices

| Tool or platform | Main use | Engineering caveat |
|---|---|---|
| RTL-SDR | Economical receive-only spectrum monitoring | Limited instantaneous dynamic range; hardware capability depends on version |
| ADALM-Pluto | Compact transmit/receive SDR experiments | Frequency coverage and bandwidth are hardware/firmware dependent |
| USRP family | Flexible SDR research, multichannel systems | Synchronization and RF front-end options depend on model |
| GNU Radio | Streaming DSP flowgraphs and receiver/transmitter prototypes | Buffering, throughput and host timing matter |
| Python + NumPy/SciPy | Offline I/Q analysis, waveform and impairment simulations | Ordinary Python timing is not deterministic real-time RF control |
| SoapySDR / UHD | Hardware-facing streaming and device configuration | Driver and device support must be checked |

Choose hardware based on **frequency range, usable instantaneous bandwidth, full-duplex needs, receive noise figure, ADC/DAC performance, synchronization, and calibrated RF measurements**, rather than on advertised tuning range alone.

## 9. Connections to other pages

- [RF Transceiver Architectures](../rf-transceiver-architectures/) — superhet, zero-IF, low-IF, direct RF sampling, and receiver tradeoffs.
- [ADC & DAC](../data-converters/) — sampling, ENOB, jitter, and converters.
- [Modern Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/) — FFT, RBW/VBW, phase noise, and VSA.
- [Modern Signal Generator](../modern-signal-generator/) — DDS, I/Q generation, interpolation, and EVM.
- [Wireless & MIMO](../wireless/) — OFDM, spatial channels, and coherent measurements.
- [Measurements & Instruments](../measurements/) — calibration and verification.

## 10. References and further reading

- J. Mitola, *Software Radios: Survey, Critical Evaluation and Future Directions*, IEEE Aerospace and Electronic Systems Magazine **8**(4), 25–36 (1993). [DOI: 10.1109/62.210638](https://doi.org/10.1109/62.210638).
- T. J. Rouphael, *RF and Digital Signal Processing for Software-Defined Radio*, Newnes (2009).
- [GNU Radio documentation](https://wiki.gnuradio.org/index.php/Main_Page).
- [Ettus Research UHD manual](https://files.ettus.com/manual/).
- [Analog Devices — Software-Defined Radio](https://www.analog.com/en/solutions/software-defined-radio.html).


---

## 11. Advanced SDR — estimation and synchronization limits

An SDR receiver must estimate and correct carrier-frequency offset, sampling-clock offset, carrier phase and symbol timing. A digital local oscillator corrects a frequency offset, but does not automatically correct sampling-rate mismatch or phase noise.

For an \(M\)-sample observation of a complex tone with AWGN, frequency-estimation accuracy depends on coherent observation duration, sampling rate, tone amplitude and noise variance. A longer coherent record improves frequency resolution only while the oscillator phase remains stable enough for the assumed model. Frequency uncertainty should be distinguished from FFT-bin spacing \(f_s/N\).

In coherent multichannel SDR, synchronize the sample clocks, trigger/sample epochs and LO phases. A distributed 10 MHz reference alone does not establish deterministic relative phase across independent receivers. Calibrate electrical cable delays and antenna-channel phase offsets before estimating angle of arrival or forming beams.

**Advanced experiment:** inject one common coherent tone into two receiver channels, measure relative phase versus frequency and elapsed time, and separate fixed delay from time-varying drift. Repeat after independent device reconfiguration and power cycling.

**Further reading:** F. M. Gardner, *Phaselock Techniques*; [GNU Radio documentation](https://wiki.gnuradio.org/index.php/Main_Page).
