---
layout: default
title: History Behind the Fundamental Equations
---

# History Behind the Fundamental Equations

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Maxwell%27s_equations.svg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Maxwell%27s_equations.svg?width=1200" alt="Maxwell's equations, the central synthesis from which much of classical electromagnetics developed." loading="lazy"></a>
  <figcaption>Maxwell's equations, the central synthesis from which much of classical electromagnetics developed. <a href="https://commons.wikimedia.org/wiki/File:Maxwell%27s_equations.svg">Image source</a>.</figcaption>
</figure>


The equations on the [Fundamental Equations & Relations](fundamental-equations.md) page are not isolated formulas. They record several centuries of experiments, engineering problems, and changes in how physicists understood electricity, magnetism, light, radio, and quantum systems. This companion page gives a concise historical context for each major equation group.

> **Reading principle:** use the equation sheet for calculation; use this page to remember **who developed the idea, what problem they were solving, and why the equation mattered**.

---

## 1. Fundamental constants: $c$, $h$, $e$, $k_B$, $\epsilon_0$, $\mu_0$

The constants appearing throughout electromagnetics emerged from very different branches of physics. Attempts to determine the speed of light extend from Galileo's unsuccessful lantern experiment to Ole Rømer's astronomical estimate and later terrestrial measurements. Maxwell's electromagnetic theory then connected the measured electromagnetic constants to a propagation speed numerically equal to the speed of light, providing the decisive clue that **light is an electromagnetic wave**. The quantum constant $h$ entered physics when Max Planck introduced energy quantization in 1900 through $E=h\nu$. Precision measurements of $h$, $e$, and related constants became central to twentieth-century metrology; today several SI constants, including $h$ and $e$, have exact defined values.

**Historical sources:** [NIST — Fundamental Physical Constants](https://physics.nist.gov/cuu/Constants/introduction.html); [NIST — historical measurements, 1900–1920](https://physics.nist.gov/cuu/Constants/historical1.html); [NIST — Planck constant and the kilogram](https://www.nist.gov/si-redefinition/kilogram/kilogram-mass-and-plancks-constant).

---

## 2. Maxwell's equations

$$\nabla\cdot\mathbf D=\rho_v,\qquad
\nabla\cdot\mathbf B=0$$

$$\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t},\qquad
\nabla\times\mathbf H=\mathbf J+\frac{\partial\mathbf D}{\partial t}$$

These four compact equations represent a synthesis rather than a single discovery. Gauss's law grew from electrostatics; Faraday experimentally discovered electromagnetic induction in 1831; Ampère established the relationship between electric currents and magnetism; and James Clerk Maxwell supplied the crucial **displacement-current term** $\partial\mathbf D/\partial t$. That addition made the theory internally consistent and allowed electromagnetic disturbances to propagate through empty space.

Maxwell presented his mature electromagnetic field theory in *A Dynamical Theory of the Electromagnetic Field* (1865) and later in his 1873 *Treatise on Electricity and Magnetism*. The elegant four-equation vector form used today was largely produced in the 1880s by Oliver Heaviside and other “Maxwellians,” who reformulated Maxwell's much larger component-based system using vector calculus.

**Historical sources:** [APS — The discovery of Maxwell's equations](https://meetings-archive.aps.org/mar/2012/b19/1/); [National Academies — Maxwell and Heaviside](https://www.nationalacademies.org/read/10736/chapter/8); [Physics Today — Oliver Heaviside](https://physicstoday.aip.org/features/oliver-heaviside-a-first-rate-oddity).

---

## 3. Electromagnetic wave equation

$$\nabla^2\mathbf E-\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2}=0$$

with

$$v_p=\frac{1}{\sqrt{\mu\epsilon}}.$$

The wave equation is one of the great consequences of Maxwell's synthesis. Combining the curl equations in a source-free medium produces a wave equation whose predicted speed is $1/\sqrt{\mu\epsilon}$. Maxwell recognized that the value obtained from electrical measurements was essentially the known speed of light. This led him to conclude that light itself was an electromagnetic disturbance.

Heinrich Hertz's experiments in the late 1880s subsequently generated and detected radio waves and demonstrated reflection, interference, and other optical-like behavior, providing experimental confirmation of Maxwell's prediction and opening the path toward radio technology.

**Historical sources:** [APS — Maxwell's electromagnetic theory of light](https://meetings-archive.aps.org/mar/2012/b19/1/); [NIST — historical measurements of the speed of light](https://physics.nist.gov/cuu/Constants/historical2.html).

---

## 4. Poynting vector and electromagnetic energy flow

$$\mathbf S=\mathbf E\times\mathbf H$$

The electromagnetic field was initially discussed largely in terms of forces and field strengths. John Henry Poynting showed in 1884 that Maxwell's theory also contained a local conservation law for **electromagnetic energy**. The vector now bearing his name gives the direction and density of electromagnetic energy flow.

Oliver Heaviside independently developed closely related ideas about electromagnetic energy flow at approximately the same time. The Poynting vector ultimately provided the conceptual bridge from abstract fields to practical quantities such as radiated power, antenna power density, waveguide power, and radiation pressure.

**Historical sources:** [Royal Society/PMC — Contributions of John Henry Poynting](https://pmc.ncbi.nlm.nih.gov/articles/PMC3390789/); [Physics Today — Heaviside and electromagnetic energy flow](https://physicstoday.aip.org/features/oliver-heaviside-a-first-rate-oddity).

---

## 5. Reflection coefficient, standing waves, VSWR, and return loss

$$\Gamma=\frac{Z_L-Z_0}{Z_L+Z_0}$$

$$\mathrm{VSWR}=\frac{1+|\Gamma|}{1-|\Gamma|}$$

These relations emerged naturally once electrical signals were understood as **waves traveling on distributed transmission structures**, rather than as instantaneous currents in ideal wires. Nineteenth-century telegraph engineers encountered reflections and waveform distortion on long cables before radio engineering existed as a discipline. Transmission-line theory made it possible to interpret mismatches as partial wave reflections.

In the microwave era, reflection coefficient and standing-wave ratio became convenient experimentally measurable descriptions because direct voltage and current measurements become difficult at high frequency. Return loss later expressed the same mismatch information logarithmically in decibels.

**Historical sources:** [Princeton — History of the Telegrapher's Equations](https://commons.princeton.edu/josephhenry/transmission-lines/); [Royal Society — Heaviside's contributions to transmission-line theory](https://pubmed.ncbi.nlm.nih.gov/30373946/).

---

## 6. Transmission-line equations and characteristic impedance

$$Z_0=\sqrt{\frac{R+j\omega L}{G+j\omega C}},\qquad
\gamma=\sqrt{(R+j\omega L)(G+j\omega C)}$$

The practical origin of transmission-line theory was the nineteenth-century telegraph. Long submarine cables distorted pulses so severely that ordinary lumped-circuit intuition failed. William Thomson (Lord Kelvin) developed early cable theory using resistance and capacitance. Oliver Heaviside then introduced inductance explicitly and developed the distributed $R$, $L$, $G$, $C$ description that became the **Telegrapher's equations**.

Heaviside's work showed that signals propagate as waves and led to the distortionless-line condition. The theory that began with Victorian telegraph cables is now the basis of coaxial cables, PCB traces, microwave networks, high-speed digital interconnects, and impedance matching.

**Historical sources:** [Royal Society — Heaviside and transmission-line theory](https://pubmed.ncbi.nlm.nih.gov/30373946/); [IET Archives — Oliver Heaviside](https://www.theiet.org/membership/library-and-archives/the-iet-archives/biographies/oliver-heaviside-1850-1925); [Princeton — History of the Telegrapher's Equations](https://commons.princeton.edu/josephhenry/transmission-lines/).

---

## 7. S-parameters

$$\mathbf b=\mathbf S\mathbf a$$

At low frequencies, circuits could be characterized conveniently using open-circuit impedances or short-circuit admittances. At microwave frequencies, creating ideal opens and shorts and directly measuring terminal voltages and currents becomes difficult. Engineers therefore shifted to **traveling-wave measurements**: how much incident power is reflected and how much emerges from other ports.

Scattering-matrix methods grew into the standard microwave-network language during the development of radar, waveguides, microwave components, and later vector network analyzers. Modern $S_{11}$, $S_{21}$, $S_{12}$, and $S_{22}$ measurements are therefore direct descendants of the wave-based view of microwave circuits.

**Historical sources:** [IEEE Technology Navigator — Scattering parameters](https://technav.ieee.org/topic/scattering-parameters/); [IEEE — Historical Perspectives on Microwave Field Theory](https://ieeexplore.ieee.org/document/1132815/).

---

## 8. Skin depth

$$\delta=\sqrt{\frac{2}{\omega\mu\sigma}}$$

Telegraph engineers noticed in the nineteenth century that alternating currents did not behave like DC currents in conductors. At sufficiently high frequency, current becomes concentrated near the conductor surface. Work by Hughes, Kelvin, Heaviside, Rayleigh, and others developed the experimental and mathematical understanding of this **skin effect**.

The phenomenon follows directly from Maxwell's equations in a conducting medium: electromagnetic fields penetrate only a finite distance before being strongly attenuated. Skin depth therefore connects fundamental field theory to RF conductor loss, waveguide loss, shielding, plating thickness, and high-frequency PCB design.

**Historical sources:** [Physics Today — Heaviside and the skin effect](https://physicstoday.aip.org/features/oliver-heaviside-a-first-rate-oddity); [Project Gutenberg — historical electrical-engineering account of skin effect](https://www.gutenberg.org/files/49675/49675-h/49675-h.htm).

---

## 9. Antenna radiation, directivity, gain, and effective aperture

$$D=\frac{4\pi U}{P_{rad}},\qquad G=\eta_{rad}D,\qquad A_e=\frac{G\lambda^2}{4\pi}$$

After Hertz demonstrated electromagnetic waves experimentally, radio pioneers including Marconi transformed radiation into a communications technology. Early antennas were largely wire structures; as radio frequencies increased, engineers developed increasingly directional arrays, reflectors, horns, and aperture antennas.

The concepts of radiation intensity, directivity, gain, and effective aperture were introduced to separate different physical questions: **Where does an antenna send energy? How efficiently does it radiate? How strongly can it receive a plane wave?** Reciprocity and aperture theory eventually connected transmitting gain to receiving area through $A_e=G\lambda^2/(4\pi)$.

**Historical sources:** [IEEE — Historical Perspectives on Microwave Field Theory](https://ieeexplore.ieee.org/document/1132815/); [IEEE AESS — Radar: A Case History of an Invention](https://ieee-aess.org/media/radar-case-history-invention).

---

## 10. Friis transmission equation

$$P_r=P_tG_tG_r\left(\frac{\lambda}{4\pi R}\right)^2$$

Harald T. Friis published *A Note on a Simple Transmission Formula* in 1946. His goal was to provide a compact relationship for a free-space radio link using the transmitting and receiving properties of antennas. The formula unified inverse-square spreading, wavelength, antenna aperture, and gain into the link equation now used throughout wireless engineering.

Its historical importance is that it turns Maxwellian wave propagation into a directly usable **engineering power budget**. Modern satellite, cellular, microwave, telemetry, and laboratory link calculations still begin from this relation before adding real-world losses and propagation effects.

**Primary reference:** H. T. Friis, “A Note on a Simple Transmission Formula,” *Proceedings of the IRE*, vol. 34, no. 5, pp. 254–256, 1946, DOI: [10.1109/JRPROC.1946.234568](https://doi.org/10.1109/JRPROC.1946.234568).

---

## 11. Radar equations, time-of-flight, and Doppler shift

$$R=\frac{c\Delta t}{2},\qquad
f_D=\frac{2v_r}{\lambda}$$

$$P_r=\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3R^4L}$$

Christian Doppler proposed in 1842 that observed wave frequency changes with relative source-observer motion. Long before radar, this provided a general connection between frequency and velocity. Radar developed much later from radio-wave experiments and was pursued intensively in several countries during the 1930s and World War II.

The radar range equation combines two inverse-square processes: spreading from transmitter to target and spreading of the scattered field back to the receiver. This produces the characteristic $R^{-4}$ dependence for monostatic radar. Pulse delay gives range, while Doppler shift provides radial velocity. FMCW radar later encoded range into beat frequency using a swept-frequency waveform.

**Historical sources:** [IEEE AESS — Radar: A Case History of an Invention](https://ieee-aess.org/media/radar-case-history-invention); [IEEE Technology Navigator — Radar](https://technav.ieee.org/area/radar/); [historical account of Doppler's 1842 principle](https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Astronomy).

---

## 12. Thermal noise and noise figure

$$P_n=k_BT B$$

The microscopic agitation of charge carriers became an engineering problem as electronic amplifiers and communication receivers improved. In 1928, John B. Johnson experimentally reported thermal electrical noise in conductors, while Harry Nyquist developed its theoretical explanation using thermodynamics and statistical mechanics. The phenomenon is therefore commonly called **Johnson–Nyquist noise**.

The compact $kTB$ relation established an unavoidable thermal noise floor for receivers. Noise figure and cascaded-noise formulas were subsequently developed as microwave and communication engineers needed to quantify how much additional noise practical amplifiers and receiver stages introduce.

**Historical sources:** J. B. Johnson, “Thermal Agitation of Electricity in Conductors,” *Physical Review* (1928); H. Nyquist, “Thermal Agitation of Electric Charge in Conductors,” *Physical Review* (1928); [historical summary of Johnson–Nyquist noise](https://en.wikipedia.org/wiki/Johnson%E2%80%93Nyquist_noise).

---

## 13. Resonance and quality factor

$$f_0=\frac{1}{2\pi\sqrt{LC}},\qquad
Q=2\pi\frac{\text{energy stored}}{\text{energy lost per cycle}}$$

Electrical resonance became increasingly important with tuned telegraphy, radio, filters, and oscillators. The symbol $Q$ emerged in early twentieth-century work on the sharpness and losses of resonant electrical circuits and coils. The energy-based interpretation generalized the idea beyond simple RLC circuits to cavities, antennas, mechanical resonators, and quantum systems.

The lasting usefulness of $Q$ comes from the fact that it relates **stored energy, dissipation, linewidth, and bandwidth**—quantities that appear across RF engineering, optics, atomic physics, and resonator sensing.

**Historical source:** [Fundamentals of Antenna Bandwidth and Quality Factor — historical discussion of the origin of $Q$](https://www.researchgate.net/publication/387767291_Fundamentals_of_Antenna_Bandwidth_and_Quality_Factor).

---

## 14. Snell's law, photon energy, and Gaussian optics

$$n_1\sin\theta_1=n_2\sin\theta_2$$

$$E=hf=\frac{hc}{\lambda}$$

The law of refraction has a long history. Early geometrical-optics work preceded the seventeenth century; Willebrord Snell obtained the sine-law form in 1621, and René Descartes later published the relation in a recognizable modern form. Wave optics eventually connected refraction to changes in phase velocity at a material boundary.

A second revolution occurred in 1900 when Planck introduced $E=h\nu$ in his theory of blackbody radiation. Einstein's 1905 light-quantum interpretation then pushed the idea toward the photon picture. Thus this section of the equation sheet deliberately places **classical wave optics and quantum optics next to one another**.

Gaussian-beam relations became especially important after the development of the laser in 1960, when highly coherent beams made paraxial beam propagation a central practical problem.

**Historical sources:** [Encyclopaedia Britannica archive — Snell's law and refraction](https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Light); [NIST — Planck's quantum relation](https://www.nist.gov/si-redefinition/kilogram/kilogram-mass-and-plancks-constant); [Lawrence Livermore National Laboratory — birth of the laser](https://www.llnl.gov/archives/1960s/lasers).

---

## 15. Rabi frequency, AC Stark shift, and Autler–Townes splitting

$$H_{int}=-\mathbf d\cdot\mathbf E$$

$$\Omega=\frac{\mathbf d_{eg}\cdot\mathbf E}{\hbar}$$

$$\Delta f_{AT}=\frac{\Omega}{2\pi}$$

The quantum description of driven atomic transitions developed with quantum mechanics and magnetic-resonance spectroscopy. Isidor I. Rabi's molecular-beam resonance method in the 1930s demonstrated controlled transitions driven by oscillating electromagnetic fields; he received the 1944 Nobel Prize in Physics for his resonance method.

Stanley Autler and Charles Townes then published their landmark 1955 paper *Stark Effect in Rapidly Varying Fields*. They showed theoretically and experimentally that a sufficiently strong oscillating field coupling two quantum states modifies the observed spectrum and can split a line into a doublet. The resulting Autler–Townes effect is now central to coherent spectroscopy, EIT, microwave sensing, and Rydberg electrometry.

The far-detuned limit of the same dressed-state interaction gives the familiar AC Stark shift,

$$\delta\omega_{AC}\approx\frac{|\Omega|^2}{4\Delta},$$

revealing that resonant splitting and off-resonant Stark shifting are two regimes of the same underlying atom–field coupling physics.

**Historical sources:** [Nobel Prize — Isidor I. Rabi](https://www.nobelprize.org/prizes/physics/1944/rabi/facts/); S. H. Autler and C. H. Townes, “Stark Effect in Rapidly Varying Fields,” *Physical Review* **100**, 703 (1955), [DOI: 10.1103/PhysRev.100.703](https://doi.org/10.1103/PhysRev.100.703).

---

## 16. VLBI geometric delay

$$\tau_g\approx\frac{\mathbf B\cdot\hat{\mathbf s}}{c}$$

Very Long Baseline Interferometry was developed in the 1960s to combine radio-telescope observations across extremely long baselines. The key measurable is the difference in arrival time of the same quasar wavefront at separated antennas. Because quasars act as extremely distant celestial reference points, the geometry can be inverted: rather than only imaging the sky, VLBI can determine the orientation and motion of the Earth itself.

NASA and MIT researchers recognized this geodetic potential in the 1960s. By the 1970s, VLBI had become a major space-geodesy technique. It now contributes to terrestrial and celestial reference frames and Earth Orientation Parameters, including polar motion and variations in Earth's rotation.

**Historical sources:** [NASA — Space Geodesy Project and VLBI history](https://www.nasa.gov/general/nasas-space-geodesy-project-mapping-out-a-bright-future/); [NASA Earthdata — VLBI and Earth Orientation Parameters](https://www.earthdata.nasa.gov/learn/sensing-our-planet/beacons-in-the-sky-help-monitor-earth-s-orientation-in-space); [NASA Goddard — VLBI](https://earth.gsfc.nasa.gov/geo/instruments/vlbi).

See also: [Chandler Wobble measured with VLBI](../earth-space/chandler-wobble-vlbi.md).

---

## 17. Decibels

$$L_{dB}=10\log_{10}\left(\frac{P_2}{P_1}\right)$$

The decibel arose from a very practical engineering problem: quantifying loss in long telephone circuits. Early telephone engineers used the “mile of standard cable” as a loss unit. Bell System engineers replaced it in the 1920s with a logarithmic **transmission unit**, which simplified cascaded gain and loss calculations. The unit was renamed the **decibel** in honor of Alexander Graham Bell; one decibel is one tenth of a bel.

The logarithmic representation proved ideal for RF engineering because multiplication of gains and losses becomes addition. That is why link budgets, antenna gains, noise figures, S-parameters, spectrum-analyzer readings, and power levels are so naturally expressed in dB.

**Historical source:** W. H. Martin, “Decibel—The Name for the Transmission Unit,” Bell System Technical Journal (1929), [Bell Labs archive](https://www.nokia.com/bell-labs/publications-and-media/publications/decibel-the-name-for-the-transmission-unit/).

---

## 18. Frequency–wavelength relation

$$\lambda=\frac{v}{f},\qquad \lambda_0=\frac{c}{f}$$

The relation itself is a general property of periodic waves, but in electromagnetics it acquired extraordinary significance after Maxwell identified light as an electromagnetic wave and Hertz experimentally demonstrated radio waves. Radio, microwave, millimeter-wave, infrared, visible, ultraviolet, X-ray, and gamma-ray phenomena could then be understood as different frequency regions of a single electromagnetic spectrum.

For engineering intuition, the relation explains why antennas, waveguides, resonators, scattering objects, and propagation mechanisms change scale with frequency. A 100-MHz system and a 100-GHz system obey the same Maxwell equations but operate at wavelengths differing by three orders of magnitude.

**Historical sources:** [APS — Maxwell and the electromagnetic theory of light](https://meetings-archive.aps.org/mar/2012/b19/1/); [NIST — history of speed-of-light measurements](https://physics.nist.gov/cuu/Constants/historical2.html).

---

# Historical timeline

| Approx. date | Development | Why it matters here |
|---:|---|---|
| 1621 | Snell's law of refraction | Quantitative geometrical optics |
| 1831 | Faraday's electromagnetic induction | Time-varying magnetic field creates electric field |
| 1842 | Doppler principle | Frequency becomes a measure of relative velocity |
| 1865 | Maxwell's electromagnetic field theory | Electricity, magnetism, and light unified |
| 1870s–1880s | Heaviside transmission-line theory | Distributed circuits and traveling electrical waves |
| 1884 | Poynting energy-flow theorem | Electromagnetic fields carry energy |
| late 1880s | Hertz demonstrates radio waves | Experimental confirmation of Maxwell |
| 1900 | Planck introduces $E=h\nu$ | Beginning of quantum theory |
| 1920s | $Q$, thermal-noise theory, decibel | Core RF measurement concepts emerge |
| 1930s–1940s | Radar and microwave engineering expand | Practical high-frequency electromagnetics matures |
| 1938 | Rabi molecular-beam resonance | Controlled RF transitions in quantum systems |
| 1946 | Friis transmission formula | Compact free-space RF link equation |
| 1955 | Autler–Townes effect | Strong-field dressed-state spectroscopy |
| 1960 | First working laser | Coherent optical electromagnetics becomes practical |
| 1960s | VLBI developed | Radio interferometry reaches continental baselines |
| 1970s onward | Geodetic VLBI | Earth orientation measured against quasars |

---

## The larger picture

The development can be remembered as a chain:

**Faraday's experiments → Maxwell's field theory → electromagnetic waves → Heaviside/Poynting engineering interpretation → radio and antennas → microwave/radar engineering → precision RF measurement → quantum atom–field control → modern electromagnetic sensing.**

The same electromagnetic theory that explains a telegraph cable, antenna, radar echo, laser beam, and microwave transmission line also provides the classical field that drives a Rydberg transition. That continuity is one of the central themes of this reference site.

[← Fundamental Equations](fundamental-equations.md) · [← Daily Reference Home](../)
