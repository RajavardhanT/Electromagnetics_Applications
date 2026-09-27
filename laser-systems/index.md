---
layout: default
title: Laser Systems
description: Practical laser systems reference covering linewidth, frequency noise, optical cavities, Pound-Drever-Hall locking, second-harmonic generation, and linewidth transfer through SHG.
---

# Laser Systems

<div class="intuition"><span class="callout-title">30-second intuition</span>A useful laser system is more than a light source. It is an oscillator whose <strong>frequency, phase, intensity, polarization, spatial mode and pointing</strong> must all remain sufficiently controlled for the experiment. For precision spectroscopy and atomic sensing, laser linewidth and frequency noise are often as important as optical power.</div>

<div class="pathway"><span class="node">laser oscillator</span><span class="arrow">→</span><span class="node">amplifier</span><span class="arrow">→</span><span class="node">frequency stabilization</span><span class="arrow">→</span><span class="node">SHG / nonlinear conversion</span><span class="arrow">→</span><span class="node">AOM / EOM</span><span class="arrow">→</span><span class="node">experiment</span></div>

## 1. What defines a laser system?

For experimental work, the most useful specifications are usually:

| Quantity | Why it matters |
|---|---|
| Optical frequency $\nu$ / wavelength $\lambda$ | determines the addressed transition |
| Linewidth $\Delta\nu$ | determines spectral purity and coherence |
| Frequency noise $S_\nu(f)$ | shows *where* the linewidth/noise originates |
| Relative intensity noise (RIN) | produces amplitude noise and AC-Stark fluctuations |
| Output power | sets available Rabi frequency and nonlinear-conversion efficiency |
| Beam quality $M^2$ | determines focusing and mode matching |
| Polarization | determines optical selection rules and nonlinear-crystal efficiency |
| Pointing stability | affects coupling into cavities, fibers and atomic samples |

A narrow quoted linewidth does not guarantee good long-term frequency accuracy. A laser can have excellent short-term coherence while drifting by many MHz over minutes or hours.

---

## 2. What is laser linewidth?

An ideal monochromatic field would be

$$
E(t)=E_0 e^{i2\pi\nu_0 t}.
$$

A real laser has amplitude and phase fluctuations:

$$
E(t)=A(t)e^{i[2\pi\nu_0 t+\phi(t)]}.
$$

The instantaneous frequency is

$$
\nu(t)=\nu_0+\frac{1}{2\pi}\frac{d\phi}{dt}.
$$

The optical spectrum therefore has a finite width. The term **laser linewidth** normally refers to the full width at half maximum (FWHM) of a specified optical line shape, but the result depends on the noise process and the observation time.

<div class="misconception"><span class="callout-title">Important distinction</span>There is no single linewidth number that completely describes a real laser. Slow drift, $1/f$ frequency noise, acoustic peaks and white frequency noise contribute differently depending on the measurement time and the linewidth definition.</div>

### Lorentzian and Gaussian limits

White frequency noise produces a Lorentzian-like central line. Slow technical frequency fluctuations often produce Gaussian or non-Lorentzian broadening.

For a Lorentzian line with FWHM $\Delta\nu$, a useful coherence-time scale is

$$
\tau_c\approx\frac{1}{\pi\Delta\nu},
$$

and the corresponding vacuum coherence length is approximately

$$
L_c\approx c\tau_c.
$$

Thus a 1 MHz Lorentzian linewidth corresponds to a coherence time of roughly $0.32\ \mu\text{s}$, while a 1 kHz linewidth corresponds to roughly $0.32$ ms.

---

## 3. Fundamental and technical linewidth contributions

The ideal quantum-limited linewidth follows the Schawlow-Townes scaling. A representative form is

$$
\Delta\nu_{ST}\propto \frac{h\nu}{P_{out}}\,(\Delta\nu_{cav})^2,
$$

with additional factors determined by gain, spontaneous emission and laser architecture. Semiconductor lasers also contain amplitude-phase coupling through the Henry factor $\alpha_H$, which increases the linewidth roughly through a factor $1+\alpha_H^2$ in the simplest treatment.

In most laboratory systems, the measured linewidth is dominated by technical noise rather than the fundamental Schawlow-Townes limit. Important sources include:

- current-driver noise;
- cavity-length fluctuations inside the laser;
- temperature drift;
- acoustic and vibration noise;
- optical feedback;
- pump-power noise;
- air-path fluctuations;
- electronics noise in the servo system.

---

## 4. Frequency-noise spectral density

A more complete description than a single linewidth is the frequency-noise power spectral density

$$
S_\nu(f)\quad [\text{Hz}^2/\text{Hz}].
$$

For white frequency noise with one-sided PSD level $S_\nu^0$, the Lorentzian linewidth is commonly written, under the corresponding PSD convention,

$$
\Delta\nu_L\approx \pi S_\nu^0.
$$

Real lasers rarely contain only white frequency noise. The relation between $S_\nu(f)$ and optical line shape is discussed quantitatively by Di Domenico, Schilt and Thomann in their frequency-noise/linewidth analysis.

<div class="literature"><span class="callout-title">Primary reference</span>G. Di Domenico, S. Schilt and P. Thomann, “Simple approach to the relation between laser frequency noise and laser line shape,” <em>Applied Optics</em> 49, 4801–4807 (2010). <a href="https://doi.org/10.1364/AO.49.004801">DOI</a>.</div>

---

## 5. Approximate linewidth scales

The following are **orders of magnitude, not specifications**. Actual values vary greatly with design and measurement bandwidth.

| Laser architecture | Representative free-running linewidth scale |
|---|---:|
| simple semiconductor diode / DFB | sub-MHz to many MHz |
| external-cavity diode laser (ECDL) | tens of kHz to MHz class |
| narrow-linewidth fiber / solid-state laser | Hz to tens-of-kHz class |
| cavity-stabilized research laser | Hz to sub-Hz class |

Modern cavity-stabilized systems can reach linewidths near or below 1 Hz. NIST reports compact ultrastable reference systems targeting approximately 1 Hz linewidth and has demonstrated cavity-stabilized lasers with linewidths well below 1 Hz in optimized systems.

<div class="literature"><span class="callout-title">Institutional reference</span><a href="https://www.nist.gov/programs-projects/compact-ultrastable-optical-references">NIST — Compact Ultrastable Optical References</a> and <a href="https://www.nist.gov/programs-projects/laser-stabilization-and-coherence-optical-resonators">NIST — Laser Stabilization and Coherence with Optical Resonators</a>.</div>

---

## 6. Measuring laser linewidth

### Heterodyne beat measurement

Two independent lasers at nearby optical frequencies are combined on a fast photodiode. The electrical beat frequency is

$$
\nu_b=|\nu_1-\nu_2|.
$$

For two independent Lorentzian lasers,

$$
\Delta\nu_b=\Delta\nu_1+\Delta\nu_2.
$$

If the two lasers have equal Lorentzian linewidth,

$$
\Delta\nu_{laser}\approx\frac{\Delta\nu_b}{2}.
$$

For equal Gaussian linewidths, variances add instead, giving

$$
\Delta\nu_{laser}\approx\frac{\Delta\nu_b}{\sqrt{2}}.
$$

This distinction is important when interpreting beat-note spectra.

### Delayed self-heterodyne

The laser is split into two paths. One path passes through a long fiber delay and often an AOM frequency shift before recombination. When the delay is much longer than the coherence time, the two arms become effectively decorrelated. For a Lorentzian source, the measured long-delay self-heterodyne FWHM is approximately twice the original laser linewidth.

### Frequency discriminator / cavity method

A steep cavity resonance converts frequency fluctuations into intensity fluctuations. After calibration of the cavity slope, a photodetector and spectrum analyzer can recover $S_\nu(f)$.

### Optical frequency comb

For ultranarrow lasers, beating against a comb referenced to a known ultrastable oscillator provides absolute and relative frequency-noise information over very large dynamic ranges.

---

# Cavity-stabilized lasers

## 7. Fabry-Perot reference cavity

For a two-mirror cavity of optical length $nL$, the free spectral range is

$$
\mathrm{FSR}=\frac{c}{2nL}.
$$

The cavity finesse is

$$
\mathcal F=\frac{\mathrm{FSR}}{\Delta\nu_{cav}},
$$

where $\Delta\nu_{cav}$ is the FWHM resonance width of the passive cavity. Thus

$$
\Delta\nu_{cav}=\frac{\mathrm{FSR}}{\mathcal F}.
$$

The resonance frequencies approximately obey

$$
\nu_m=\frac{mc}{2nL}.
$$

For small length fluctuations,

$$
\frac{\delta\nu}{\nu}\approx-\frac{\delta L}{L}
$$

when refractive-index fluctuations are neglected.

### Worked cavity example

For $L=10$ cm in vacuum,

$$
\mathrm{FSR}=\frac{c}{2L}\approx1.50\ \text{GHz}.
$$

For finesse $\mathcal F=3\times10^5$,

$$
\Delta\nu_{cav}\approx5\ \text{kHz}.
$$

This **does not mean the locked laser linewidth must be 5 kHz**.

---

## 8. Why a cavity can produce a laser linewidth far below the cavity linewidth

The cavity acts as a high-slope frequency discriminator. A feedback loop continuously keeps the laser near the *center* of the resonance. The achievable frequency error can therefore be a tiny fraction of the cavity resonance width.

A useful conceptual chain is

$$
\boxed{\text{stable cavity length}\rightarrow\text{stable resonance frequency}\rightarrow\text{error signal}\rightarrow\text{feedback}\rightarrow\text{narrow laser}.}
$$

The final locked-laser noise depends on

- cavity thermal/Brownian noise;
- cavity vibration sensitivity;
- cavity temperature drift;
- residual amplitude modulation;
- shot noise and detector noise;
- servo gain and servo bandwidth;
- actuator noise;
- free-running laser noise outside the loop bandwidth.

NIST reports compact Fabry-Perot reference cavities with cavity-stabilized laser linewidths well below 1 Hz, showing directly that the stabilized laser linewidth can be much narrower than the passive cavity resonance width.

<div class="literature"><span class="callout-title">Example</span>C. McLemore <em>et al.</em>, “Thermal Noise-Limited Laser Stabilization to an 8 mL Volume Fabry-Perot Reference Cavity with Microfabricated Mirrors,” <em>APL Photonics</em> (2022). <a href="https://www.nist.gov/publications/thermal-noise-limited-laser-stabilization-8-ml-volume-fabry-perot-reference-cavity">NIST publication page</a>.</div>

---

## 9. Pound-Drever-Hall (PDH) locking

PDH locking is one of the standard techniques for stabilizing a laser to a high-finesse cavity.

<div class="pathway"><span class="node">laser</span><span class="arrow">→</span><span class="node">EOM phase modulation</span><span class="arrow">→</span><span class="node">reference cavity</span><span class="arrow">→</span><span class="node">reflected photodiode</span><span class="arrow">→</span><span class="node">RF demodulation</span><span class="arrow">→</span><span class="node">servo</span></div>

The EOM creates optical sidebands at

$$
\nu_0\pm f_m.
$$

The reflected carrier and sidebands interfere at the photodetector. Demodulation at $f_m$ produces a bipolar error signal approximately linear near the cavity resonance.

The servo sends this error to one or more laser actuators:

- diode current — fast but limited range;
- intracavity or external EOM — very fast, small range;
- laser-cavity PZT — moderate bandwidth, larger range;
- temperature — very slow, large tuning range.

A practical high-performance loop often uses **fast + slow actuators simultaneously**.

<div class="literature"><span class="callout-title">Foundational references</span>R. W. P. Drever <em>et al.</em>, “Laser phase and frequency stabilization using an optical resonator,” <em>Applied Physics B</em> 31, 97–105 (1983), <a href="https://doi.org/10.1007/BF00702605">DOI</a>. E. D. Black, “An introduction to Pound-Drever-Hall laser frequency stabilization,” <em>American Journal of Physics</em> 69, 79–87 (2001), <a href="https://doi.org/10.1119/1.1286663">DOI</a>.</div>

---

## 10. What linewidth should be expected after cavity locking?

There is no universal number. The result depends on the cavity and servo.

A useful hierarchy is

| System | Typical limiting mechanism |
|---|---|
| ordinary free-running laser | laser cavity, current, temperature, acoustic noise |
| laser locked to moderate-finesse cavity | servo residual + cavity drift |
| laser locked to ultrastable cavity | cavity Brownian/thermal noise, vibration and residual servo noise |
| state-of-the-art ultrastable system | reference-cavity thermal noise and technical noise below that level |

NIST has demonstrated a chip-based laser with an integrated 1 s linewidth of about 1.1 Hz and frequency instability below $10^{-14}$ from 1 ms to 1 s using an ultrastable cavity reference.

<div class="literature"><span class="callout-title">Measured example</span>J. Guo <em>et al.</em>, “Chip-based laser with 1-hertz integrated linewidth,” <em>Science Advances</em> (2022). <a href="https://www.nist.gov/publications/chip-based-laser-1-hertz-integrated-linewidth">NIST publication page</a>.</div>

### Length stability required for a 1 Hz optical reference

At $\lambda=852$ nm,

$$
\nu\approx\frac{c}{\lambda}\approx3.52\times10^{14}\ \text{Hz}.
$$

A 1 Hz frequency fluctuation corresponds to a fractional instability

$$
\frac{\delta\nu}{\nu}\approx2.8\times10^{-15}.
$$

For a 10 cm cavity this corresponds to an effective length fluctuation of order

$$
|\delta L|\sim L\frac{|\delta\nu|}{\nu}\approx2.8\times10^{-16}\ \text{m}.
$$

This illustrates why ultrastable cavities require careful vibration isolation, thermal engineering and low-noise mirror coatings.

---

# Second-harmonic-generation (SHG) laser systems

## 11. What is SHG?

Second-harmonic generation converts photons at angular frequency $\omega$ into coherent radiation at $2\omega$ through the second-order nonlinear susceptibility $\chi^{(2)}$:

$$
P_i^{(2)}=\epsilon_0\sum_{jk}\chi^{(2)}_{ijk}E_jE_k.
$$

For a monochromatic pump

$$
E_\omega(t)\propto\cos(\omega t),
$$

the quadratic polarization contains a term oscillating at $2\omega$.

The output wavelength is

$$
\lambda_{2\omega}=\frac{\lambda_\omega}{2}.
$$

Examples:

- 1064 nm $\rightarrow$ 532 nm;
- 1156 nm $\rightarrow$ 578 nm;
- 1020 nm $\rightarrow$ 510 nm;
- 1018 nm $\rightarrow$ 509 nm.

The last two ranges are particularly relevant to cesium Rydberg excitation.

---

## 12. SHG conversion efficiency

In the undepleted-pump limit, the generated second-harmonic power scales approximately as

$$
P_{2\omega}\propto d_{eff}^2 L^2 P_\omega^2\,\mathrm{sinc}^2\left(\frac{\Delta kL}{2}\right),
$$

where

$$
\Delta k=k_{2\omega}-2k_\omega
$$

for birefringent phase matching. For quasi-phase matching,

$$
\Delta k=k_{2\omega}-2k_\omega-\frac{2\pi}{\Lambda},
$$

where $\Lambda$ is the poling period.

Common nonlinear media include

- PPLN / MgO:PPLN;
- PPKTP;
- LBO;
- BBO;
- KTP.

### Single-pass SHG

Simple, robust and broad in servo behavior, but conversion efficiency may be limited by available peak intensity and interaction length.

### Cavity-enhanced SHG

The fundamental field is resonantly enhanced in an external cavity containing the nonlinear crystal. This can dramatically increase conversion efficiency, but introduces another cavity-locking problem.

<div class="misconception"><span class="callout-title">Important distinction</span>An SHG enhancement cavity and an ultrastable frequency-reference cavity serve different purposes. Locking the SHG cavity keeps the nonlinear converter resonant with the laser. Locking the laser to an ultrastable reference cavity stabilizes the laser frequency. A system may contain both.</div>

---

## 13. What happens to linewidth and frequency noise after SHG?

This is subtle and is often oversimplified.

Write the fundamental field as

$$
E_\omega(t)=A e^{i[\omega t+\phi(t)]}.
$$

In ideal SHG,

$$
E_{2\omega}(t)\propto E_\omega^2(t)
\propto A^2e^{i[2\omega t+2\phi(t)]}.
$$

Therefore

$$
\boxed{\phi_{2\omega}(t)=2\phi_\omega(t).}
$$

The instantaneous absolute frequency fluctuation becomes

$$
\boxed{\delta\nu_{2\omega}=2\delta\nu_\omega.}
$$

The frequency-noise PSD therefore becomes

$$
\boxed{S_{\nu,2\omega}(f)=4S_{\nu,\omega}(f),}
$$

which is a **6 dB increase in absolute frequency-noise PSD**.

However, the fractional frequency noise remains unchanged:

$$
\boxed{\frac{\delta\nu_{2\omega}}{\nu_{2\omega}}=
\frac{\delta\nu_\omega}{\nu_\omega}.}
$$

### Does SHG double the linewidth or quadruple it?

There is **no universal answer without specifying the linewidth definition and noise statistics**.

- If linewidth is dominated by slowly varying Gaussian frequency jitter, doubling the absolute frequency excursions tends to double the Gaussian spectral width.
- If the spectrum is Lorentzian and dominated by white frequency noise, $S_\nu$ increases by 4, and the Lorentzian linewidth associated with that white-noise floor can increase by approximately 4.
- Real lasers contain mixed noise, so the safest procedure is to propagate or measure the full frequency-noise spectrum rather than apply a single rule.

A 2023 frequency-conversion experiment directly observed that SHG doubles the temporal phase fluctuation and produces a fourfold frequency-noise PSD increase. In another experiment developed specifically for cesium Rydberg excitation, a 1018 nm source measured at about 20 kHz linewidth produced a 509 nm SHG source estimated at about 40 kHz, illustrating a different linewidth convention/noise regime.

<div class="literature"><span class="callout-title">SHG linewidth references</span>C. Ling <em>et al.</em>, “Self-Injection Locked Frequency Conversion Laser,” <em>Laser & Photonics Reviews</em> (2023), <a href="https://doi.org/10.1002/lpor.202200663">DOI</a>. J. Qian <em>et al.</em>, “2 W single-frequency, low-noise 509 nm laser via single-pass frequency doubling of an ECDL-seeded Yb fiber amplifier,” <em>Applied Optics</em> 57, 8733–8737 (2018), <a href="https://doi.org/10.1364/AO.57.008733">DOI</a>.</div>

---

## 14. Cavity locking combined with SHG

Three architectures are common.

### A. Lock the fundamental laser first, then frequency-double

<div class="pathway"><span class="node">fundamental laser</span><span class="arrow">→</span><span class="node">ultrastable cavity lock</span><span class="arrow">→</span><span class="node">amplifier</span><span class="arrow">→</span><span class="node">SHG</span><span class="arrow">→</span><span class="node">experiment</span></div>

This is conceptually clean. The SHG output inherits the stabilized phase, with the SHG phase/frequency-noise scaling described above.

### B. Generate SHG and use the harmonic as the frequency reference

<div class="pathway"><span class="node">fundamental</span><span class="arrow">→</span><span class="node">SHG</span><span class="arrow">→</span><span class="node">harmonic cavity / atom</span><span class="arrow">→</span><span class="node">error signal</span><span class="arrow">→</span><span class="node">feedback to fundamental</span></div>

This is useful when the best reference exists at the final wavelength. A frequency correction $\delta\nu$ at the harmonic corresponds to approximately $\delta\nu/2$ at the fundamental.

### C. Lock the SHG enhancement cavity to the laser

This maximizes nonlinear-conversion efficiency but does not, by itself, make the laser an ultrastable frequency reference. The enhancement cavity follows the laser unless a separate absolute-frequency stabilization loop is present.

---

## 15. Practical SHG linewidth example for cesium Rydberg systems

A useful architecture for green/blue Rydberg coupling lasers is

$$
\boxed{
\text{ECDL seed}
\rightarrow
\text{fiber amplifier}
\rightarrow
\text{SHG crystal}
\rightarrow
\text{visible coupling laser}
}
$$

Qian <em>et al.</em> demonstrated 1018 nm $\rightarrow$ 509 nm single-pass SHG using an ECDL-seeded Yb fiber amplifier and MgO:PPLN, obtaining about 2 W at 509 nm. The 1018 nm linewidth was measured near 20 kHz and the 509 nm linewidth was estimated near 40 kHz. The system was developed for cesium Rydberg-atom experiments.

For narrow Rydberg EIT, the visible coupling-laser linewidth contributes directly to the optical coherence budget. A useful experimental model is

$$
\gamma_{gr}^{eff}\approx\gamma_{gr}^{intrinsic}+\gamma_{probe}+\gamma_{coupling}+\gamma_{technical},
$$

where the exact combination depends on the noise statistics and density-matrix convention.

<div class="engineering"><span class="callout-title">Engineering reality</span>In an SHG Rydberg laser, the final visible linewidth can be limited by the seed laser, amplifier-added phase noise, SHG frequency-noise scaling, cavity-lock residuals, acoustic path noise and servo bumps. Measuring only the seed linewidth is therefore not always sufficient.</div>

---

## 16. Laser linewidth versus atomic linewidth

For resonant spectroscopy, compare the laser linewidth to the relevant atomic coherence width.

If

$$
\Delta\nu_{laser}\ll\Gamma_{atom},
$$

the laser usually contributes little additional broadening.

If

$$
\Delta\nu_{laser}\sim\Gamma_{atom},
$$

laser frequency noise can noticeably broaden and distort the spectrum.

If

$$
\Delta\nu_{laser}\gg\Gamma_{atom},
$$

spectroscopic resolution is fundamentally limited by the laser unless a narrow coherent component remains within the atomic response bandwidth.

For EIT and Raman-type coherences, the relevant quantity is often the **relative two-photon phase/frequency noise** of the two lasers rather than each laser linewidth independently.

---

## 17. A practical laser-stabilization hierarchy

<div class="pathway"><span class="node">temperature control</span><span class="arrow">→</span><span class="node">low-noise current driver</span><span class="arrow">→</span><span class="node">mechanical isolation</span><span class="arrow">→</span><span class="node">reference cavity / atomic lock</span><span class="arrow">→</span><span class="node">fast servo</span><span class="arrow">→</span><span class="node">SHG / delivery stabilization</span></div>

The sequence is not a learning prescription; it represents the layers of physical noise control present in many real laser systems.

---

## 18. What should be recorded when characterizing a laser?

For reproducible experimental reporting, record at least:

- center wavelength/frequency;
- free-running linewidth and measurement method;
- locked linewidth and integration/observation time;
- frequency-noise PSD if available;
- reference-cavity FSR, finesse and cavity linewidth;
- lock method and servo bandwidth;
- optical power before and after SHG;
- nonlinear crystal and phase-matching method;
- SHG conversion efficiency;
- RIN;
- beam waist and $M^2$;
- polarization;
- long-term drift or Allan deviation.

<div class="measurement"><span class="callout-title">Measurement principle</span>For an ultranarrow laser, a spectrum-analyzer beat-note width alone is often insufficient. Combine beat spectra with frequency-noise PSD, servo error spectra and a stability metric such as Allan deviation.</div>

---

## 19. Selected references

- R. W. P. Drever <em>et al.</em>, “Laser phase and frequency stabilization using an optical resonator,” <em>Applied Physics B</em> 31, 97–105 (1983). [DOI](https://doi.org/10.1007/BF00702605)
- E. D. Black, “An introduction to Pound-Drever-Hall laser frequency stabilization,” <em>American Journal of Physics</em> 69, 79–87 (2001). [DOI](https://doi.org/10.1119/1.1286663)
- G. Di Domenico, S. Schilt and P. Thomann, “Simple approach to the relation between laser frequency noise and laser line shape,” <em>Applied Optics</em> 49, 4801–4807 (2010). [DOI](https://doi.org/10.1364/AO.49.004801)
- J. Guo <em>et al.</em>, “Chip-based laser with 1-hertz integrated linewidth,” <em>Science Advances</em> (2022). [NIST](https://www.nist.gov/publications/chip-based-laser-1-hertz-integrated-linewidth)
- C. McLemore <em>et al.</em>, “Thermal Noise-Limited Laser Stabilization to an 8 mL Volume Fabry-Perot Reference Cavity with Microfabricated Mirrors,” <em>APL Photonics</em> (2022). [NIST](https://www.nist.gov/publications/thermal-noise-limited-laser-stabilization-8-ml-volume-fabry-perot-reference-cavity)
- C. Ling <em>et al.</em>, “Self-Injection Locked Frequency Conversion Laser,” <em>Laser & Photonics Reviews</em> (2023). [DOI](https://doi.org/10.1002/lpor.202200663)
- J. Qian <em>et al.</em>, “2 W single-frequency, low-noise 509 nm laser via single-pass frequency doubling of an ECDL-seeded Yb fiber amplifier,” <em>Applied Optics</em> 57, 8733–8737 (2018). [DOI](https://doi.org/10.1364/AO.57.008733)
- J. Feng <em>et al.</em>, “Noise suppression, linewidth narrowing of a master oscillator power amplifier at 1.56 μm and the second harmonic generation output at 780 nm,” <em>Optics Express</em> 16, 11871–11877 (2008). [DOI](https://doi.org/10.1364/OE.16.011871)

Related: [Optics & Photonics](../optics-photonics/) · [Quantum Technologies](../quantum/) · [Rydberg Semiclassical Optics](../rydberg-semiclassical-effects/) · [Measurements & Instruments](../measurements/)
