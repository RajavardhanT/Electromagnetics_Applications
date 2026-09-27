---
layout: default
title: Allan Deviation & Laser Frequency Stability
description: Practical reference for Allan deviation, overlapping and modified Allan deviation, oscillator noise identification, cavity-locked laser stability, beat-note analysis, and SHG stability transfer.
---

# Allan Deviation & Laser Frequency Stability

<div class="intuition"><span class="callout-title">30-second intuition</span><strong>Laser linewidth</strong> asks how spectrally narrow and phase-coherent the laser is over a specified observation interval. <strong>Allan deviation</strong> asks how stable the average frequency remains as the averaging time $\tau$ changes. A laser can have a very narrow instantaneous linewidth and still drift over seconds or hours, so precision laser systems are best characterized with both spectral/noise metrics and time-domain stability metrics.</div>

<div class="pathway"><span class="node">frequency record $\nu(t)$</span><span class="arrow">→</span><span class="node">fractional frequency $y(t)$</span><span class="arrow">→</span><span class="node">average over $\tau$</span><span class="arrow">→</span><span class="node">successive differences</span><span class="arrow">→</span><span class="node">$\sigma_y(\tau)$</span></div>

## 1. Fractional frequency

For a nominal optical frequency $\nu_0$, define the fractional frequency fluctuation

$$
y(t)=\frac{\nu(t)-\nu_0}{\nu_0}.
$$

Allan deviation is usually reported as the dimensionless fractional instability $\sigma_y(\tau)$.

The corresponding absolute frequency instability is

$$
\boxed{\sigma_\nu(\tau)=\nu_0\,\sigma_y(\tau).}
$$

This conversion is important for optical systems because the carrier frequency is hundreds of terahertz. A fractional instability that looks extremely small can still correspond to measurable hertz-level frequency motion.

---

## 2. Allan variance and Allan deviation

Divide a frequency record into adjacent intervals of duration $\tau$. Let $\bar y_i(\tau)$ be the average fractional frequency in the $i$th interval. The two-sample Allan variance is

$$
\boxed{
\sigma_y^2(\tau)=\frac{1}{2(M-1)}\sum_{i=1}^{M-1}
\left[\bar y_{i+1}(\tau)-\bar y_i(\tau)\right]^2
}
$$

and the Allan deviation is

$$
\boxed{\sigma_y(\tau)=\sqrt{\sigma_y^2(\tau)}.}
$$

Unlike ordinary variance, Allan variance remains useful for several oscillator-noise processes for which conventional variance does not converge conveniently.

<div class="measurement"><span class="callout-title">Interpretation</span>A point at $\tau=1$ s answers: “How different are consecutive 1-second averages of the oscillator frequency?” A point at $\tau=100$ s asks the same question for consecutive 100-second averages.</div>

---

## 3. Allan deviation from phase or time-error data

If the measured quantity is phase expressed as time error $x_i$ at equally spaced times separated by $\tau$, then

$$
\boxed{
\sigma_y(\tau)=
\sqrt{\frac{1}{2(N-2)\tau^2}
\sum_{i=1}^{N-2}
\left(x_{i+2}-2x_{i+1}+x_i\right)^2}
}.
$$

The second difference suppresses a constant phase offset and converts the phase/time record into a frequency-stability statistic.

---

## 4. Why use Allan deviation instead of ordinary standard deviation?

Oscillators often contain power-law noise such as flicker frequency noise and random-walk frequency noise. For these processes, simply calculating the standard deviation of a long frequency record can give a result that depends strongly on record length and drift.

Allan deviation was developed specifically for oscillator and frequency-standard characterization. It simultaneously provides

- a stability number;
- an averaging-time dependence;
- clues about the dominant noise process;
- a natural way to compare oscillators, lasers, cavities, clocks and frequency combs.

---

## 5. Reading an Allan-deviation plot

Allan deviation is normally plotted on logarithmic axes:

$$
\log \sigma_y(\tau)\quad\text{versus}\quad\log \tau.
$$

A common laser-stability curve falls with $\tau$ at short averaging times, reaches a minimum, then rises at long $\tau$ as drift or random-walk processes dominate.

<div class="pathway"><span class="node">short $\tau$</span><span class="arrow">→</span><span class="node">servo / detector / fast frequency noise</span><span class="arrow">→</span><span class="node">minimum stability floor</span><span class="arrow">→</span><span class="node">thermal drift / aging / environment</span><span class="arrow">→</span><span class="node">long $\tau$</span></div>

The averaging time at the minimum is often experimentally important: averaging beyond that point may no longer improve the frequency estimate.

---

## 6. Noise type from Allan-deviation slope

For common power-law oscillator noise processes, the approximate slope of $\sigma_y(\tau)$ on a log-log plot is informative.

| Dominant process | Approximate Allan-deviation scaling | Log-log slope |
|---|---:|---:|
| white phase modulation (PM) | $\sigma_y\propto\tau^{-1}$* | $-1$* |
| flicker phase modulation | approximately $\tau^{-1}$* | approximately $-1$* |
| white frequency modulation (FM) | $\sigma_y\propto\tau^{-1/2}$ | $-1/2$ |
| flicker FM | $\sigma_y\approx\text{constant}$ | $0$ |
| random-walk FM | $\sigma_y\propto\tau^{+1/2}$ | $+1/2$ |
| deterministic linear frequency drift | $\sigma_y\propto\tau$ | $+1$ |

\*The exact PM behavior depends on measurement bandwidth, and ordinary Allan deviation does not cleanly distinguish white PM from flicker PM. Modified Allan deviation is useful for that purpose.

<div class="misconception"><span class="callout-title">Do not overinterpret a single slope</span>Real laser systems often contain multiple noise processes, servo bumps, periodic disturbances and drift simultaneously. Identify noise from the Allan plot together with the frequency-noise PSD, phase-noise spectrum and knowledge of the measurement chain.</div>

---

## 7. Overlapping Allan deviation

The basic non-overlapping estimator discards many possible samples. The **overlapping Allan deviation** reuses all valid overlapping windows and therefore improves statistical confidence without changing the underlying Allan-variance definition.

For time-error data $x_i$ sampled at interval $\tau_0$, with $\tau=m\tau_0$,

$$
\sigma_y^2(\tau)=
\frac{1}{2m^2\tau_0^2(N-2m)}
\sum_{i=1}^{N-2m}
\left(x_{i+2m}-2x_{i+m}+x_i\right)^2.
$$

For experimental laser data, **overlapping ADEV is generally the more useful default** because long averaging times otherwise contain very few independent points.

---

## 8. Modified Allan deviation (MDEV)

Modified Allan deviation adds an additional averaging operation before forming the Allan statistic. It is especially useful for separating white and flicker phase-modulation noise and for characterizing systems dominated by high-frequency phase noise.

MDEV is commonly written

$$
\mathrm{MDEV}(\tau)=\mathrm{mod}\,\sigma_y(\tau).
$$

It should not be mixed numerically with ordinary ADEV: the two statistics have different transfer functions and can report different values from the same data.

For precision laser and comb work, it is good practice to state explicitly whether a plot shows

- ADEV;
- overlapping ADEV;
- MDEV;
- overlapping MDEV.

---

## 9. Hadamard deviation and deterministic drift

Long-term laser records often contain linear frequency drift from reference-cavity aging or temperature drift. Ordinary Allan deviation responds strongly to deterministic linear drift.

The **Hadamard deviation** uses a higher-order difference and is insensitive to linear frequency drift, making it useful when the scientific question concerns stochastic stability in the presence of deterministic drift.

Another common approach is to fit and remove a known linear drift before calculating ADEV. If this is done, report both

- the fitted drift rate, for example Hz/s;
- whether the Allan-deviation data are raw or detrended.

Removing drift without reporting it can make the long-term stability appear artificially better.

---

## 10. Linewidth versus Allan deviation

These quantities answer different questions.

| Metric | Main question | Typical domain |
|---|---|---|
| optical linewidth $\Delta\nu$ | how broad is the optical spectrum? | frequency domain |
| frequency-noise PSD $S_\nu(f)$ | at what Fourier frequencies does frequency noise occur? | frequency-noise spectrum |
| phase-noise PSD $S_\phi(f)$ | how does oscillator phase fluctuate versus Fourier frequency? | frequency domain |
| Allan deviation $\sigma_y(\tau)$ | how stable is average frequency versus averaging time? | time domain |

A cavity-locked laser can therefore have a sub-hertz central linewidth yet show a rising Allan deviation at long $\tau$ because the cavity resonance drifts thermally.

<div class="intuition"><span class="callout-title">Useful mental model</span><strong>Linewidth describes coherence.</strong> <strong>Allan deviation describes stability versus averaging time.</strong> A full precision-laser characterization often needs both.</div>

---

## 11. Worked optical-frequency example

For a 509 nm coupling laser,

$$
\nu_0=\frac{c}{\lambda}\approx5.89\times10^{14}\ \text{Hz}.
$$

If

$$
\sigma_y(1\ \text{s})=10^{-12},
$$

then the corresponding absolute 1-second instability is

$$
\sigma_\nu(1\ \text{s})
=\nu_0\sigma_y
\approx589\ \text{Hz}.
$$

If cavity locking improves the fractional instability to

$$
\sigma_y(1\ \text{s})=10^{-14},
$$

the corresponding absolute instability is only

$$
\sigma_\nu(1\ \text{s})\approx5.9\ \text{Hz}.
$$

This is why fractional units are convenient for comparing optical oscillators at different wavelengths.

---

## 12. Allan deviation of a cavity-locked laser

A typical cavity-stabilized-laser measurement is

<div class="pathway"><span class="node">laser under test</span><span class="arrow">→</span><span class="node">beat with independent reference</span><span class="arrow">→</span><span class="node">frequency counter / phase recorder</span><span class="arrow">→</span><span class="node">$\nu_b(t)$</span><span class="arrow">→</span><span class="node">ADEV / MDEV</span></div>

The resulting curve can reveal several regions:

- short $\tau$: residual fast laser noise, counter noise or servo limitations;
- intermediate $\tau$: cavity thermal-noise or technical stability floor;
- long $\tau$: temperature drift, cavity aging, vibration environment or reference drift.

A low linewidth does not guarantee a low long-term ADEV, and a good long-term ADEV does not by itself prove a narrow instantaneous linewidth.

---

## 13. Two-laser beat measurements

If two independent lasers of similar stability are compared, their frequency fluctuations add in variance. With both fractional instabilities referred to approximately the same optical carrier frequency,

$$
\sigma_{y,\mathrm{beat}}^2\approx
\sigma_{y,1}^2+\sigma_{y,2}^2.
$$

For two statistically independent lasers with equal stability,

$$
\boxed{\sigma_{y,\mathrm{single}}\approx
\frac{\sigma_{y,\mathrm{beat}}}{\sqrt{2}}.}
$$

<div class="misconception"><span class="callout-title">Normalization matters</span>Do not normalize the beat fluctuations only by the small RF beat frequency if the goal is optical fractional stability. The fractional instability should normally be referred to the optical carrier frequency being compared.</div>

For three independent references, a three-cornered-hat analysis can estimate the individual oscillator instabilities without assuming two equal sources, provided correlations are treated carefully.

---

## 14. Allan deviation through second-harmonic generation

For ideal SHG,

$$
\nu_{2\omega}=2\nu_\omega,
\qquad
\delta\nu_{2\omega}=2\delta\nu_\omega.
$$

Therefore the **fractional** frequency fluctuation is unchanged:

$$
\frac{\delta\nu_{2\omega}}{\nu_{2\omega}}
=
\frac{\delta\nu_\omega}{\nu_\omega}.
$$

Hence, in the absence of additional noise from the amplifier, nonlinear crystal, enhancement cavity or delivery optics,

$$
\boxed{\sigma_{y,2\omega}(\tau)=\sigma_{y,\omega}(\tau).}
$$

The absolute Allan deviation in hertz doubles:

$$
\boxed{\sigma_{\nu,2\omega}(\tau)=2\sigma_{\nu,\omega}(\tau).}
$$

This is the time-domain counterpart of the SHG frequency-noise relation $S_{\nu,2\omega}=4S_{\nu,\omega}$.

---

## 15. What an Allan-deviation measurement can diagnose in the lab

ADEV is particularly useful for identifying the timescale on which a stabilization system stops improving. Examples include

- insufficient slow integrator gain in the laser lock;
- cavity temperature excursions;
- HVAC or acoustic cycles;
- vibration sensitivity;
- wavemeter drift;
- atomic-reference drift;
- optical-fiber path-length changes;
- SHG oven-temperature fluctuations;
- frequency-counter reference instability.

Periodic disturbances often appear more clearly in the raw frequency record or PSD than in ADEV, so inspect all three when troubleshooting.

---

## 16. Measurement practice

For a defensible Allan-deviation result, report

- nominal optical frequency or wavelength;
- measured quantity: absolute frequency, beat frequency, phase or time error;
- counter/phase-recorder model and measurement mode;
- sample interval and gate time;
- total record duration;
- presence of dead time;
- ADEV estimator used: non-overlapping, overlapping or modified;
- whether linear drift was removed;
- reference-oscillator contribution;
- confidence intervals or equivalent degrees of freedom when relevant.

<div class="engineering"><span class="callout-title">Counter weighting matters</span>Modern frequency counters can use rectangular, triangular or other internal weighting. The statistical interpretation of the output can therefore differ from an ideal sequence of uniformly averaged frequency samples. For precision work, know the counter's estimator before calculating ADEV or MDEV.</div>

---

## 17. Connection to Rydberg EIT and spectroscopy

In an atomic experiment, Allan deviation can quantify how the laser detuning changes on timescales much longer than the instantaneous optical coherence time.

For a coupling laser with detuning $\Delta_c(t)$, slow frequency instability can produce

- motion of the EIT resonance center;
- apparent broadening after repeated scans;
- reduced averaging benefit;
- drift in extracted Autler-Townes splittings or Stark shifts;
- systematic variation in fitted line centers.

This makes ADEV useful alongside linewidth and $S_\nu(f)$ when deciding whether a measured EIT linewidth is limited by atomic physics or by the laser system.

A useful characterization set is

$$
\boxed{
\Delta\nu_{laser}
+S_\nu(f)
+\sigma_y(\tau)
+\text{servo error spectrum}
}
$$

rather than a single quoted linewidth.

---

## 18. References

- W. J. Riley and D. A. Howe, *Handbook of Frequency Stability Analysis*, NIST Special Publication 1065. [NIST publication page](https://www.nist.gov/publications/handbook-frequency-stability-analysis)
- D. W. Allan, “The measurement of frequency and frequency stability of precision oscillators,” NBS Technical Note 669 (1975). [DOI](https://doi.org/10.6028/NBS.TN.669)
- D. W. Allan, “Statistics of atomic frequency standards,” *Proceedings of the IEEE* **54**, 221–230 (1966). [DOI](https://doi.org/10.1109/PROC.1966.4634)
- NIST, “Time and Frequency from A to Z — Allan Deviation.” [NIST reference](https://www.nist.gov/pml/time-and-frequency-division/popular-links/time-frequency-z)

Related: [Laser Systems](./) · [Optics & Photonics](../optics-photonics/) · [Measurements & Instruments](../measurements/) · [Theory ↔ Experiment](../theory-experiment/) · [Hydrogen Maser](../hydrogen-maser/)
