---
layout: default
title: Semiclassical Quantum Optics for Rydberg EIT
---

# Semiclassical Effects Relevant to Rydberg EIT

<figure class="topic-figure">
  <a href="https://www.nist.gov/image/rydberg-e-field-sensor-animation"><img src="https://www.nist.gov/sites/default/files/images/2026/01/15/quantum_sensors-e_field.gif" alt="Rydberg electric-field sensing: probe and coupling lasers interrogate atoms in a vapor cell while an applied RF field changes the optical response. Credit: S. Kelley/NIST." loading="lazy"></a>
  <figcaption>Rydberg electric-field sensing: probe and coupling lasers interrogate atoms in a vapor cell while an applied RF field changes the optical response. Credit: S. Kelley/NIST. <a href="https://www.nist.gov/image/rydberg-e-field-sensor-animation">Image source</a>.</figcaption>
</figure>


Rydberg electromagnetically induced transparency (EIT) is naturally described by a **semiclassical quantum-optics model**: the internal atomic states are quantum mechanical, while the probe, coupling, RF/microwave, and static electromagnetic fields are usually treated as prescribed classical fields.

A useful starting point is

$$
H=H_0-\mathbf d\cdot\mathbf E(t)-\boldsymbol\mu\cdot\mathbf B(t),
$$

together with the density-matrix equation

$$
\dot\rho=-\frac{i}{\hbar}[H,\rho]+\mathcal L(\rho).
$$

The measured probe response follows from the optical coherence, susceptibility, propagation, and detector response.

This page collects the major semiclassical effects that can matter in room-temperature Rydberg-EIT spectroscopy and RF sensing.

---

## 1. Rabi oscillations and coherent driving

A near-resonant classical field coherently couples two atomic states with Rabi frequency

$$
\Omega=\frac{\mathbf d_{eg}\cdot\mathbf E_0}{\hbar}.
$$

Population and coherence oscillate between the states. Rabi frequency is the basic scale governing optical coupling, microwave/RF coupling, Autler–Townes splitting, saturation, power broadening, and dressed-state formation.

---

## 2. Optical Bloch equations

The optical Bloch equations combine coherent Hamiltonian evolution with spontaneous decay and dephasing.

For Rydberg EIT they provide the standard route from atomic dynamics to the probe coherence $\rho_{ge}$ and susceptibility,

$$
\chi\propto\rho_{ge}/\Omega_p.
$$

Steady-state OBEs describe spectra; time-dependent OBEs describe modulation, switching, transient response, and bandwidth.

---

## 3. Electromagnetically induced transparency (EIT)

For the ladder

$$
|g\rangle\xrightarrow{\Omega_p}|e\rangle
\xrightarrow{\Omega_c}|r\rangle,
$$

two excitation pathways interfere coherently. Near two-photon resonance, absorption of the weak probe can be strongly suppressed.

A dark-state form is approximately

$$
|D\rangle\propto
\Omega_c|g\rangle-\Omega_p|r\rangle.
$$

EIT converts otherwise difficult-to-observe Rydberg-state dynamics into an optical transmission signal.

---

## 4. Dark states and coherent population trapping

The EIT dark state is a coherent superposition that ideally avoids population of the lossy intermediate state.

Loss of phase coherence destroys perfect darkness, making ground/Rydberg coherence time and laser phase noise important to linewidth and contrast.

---

## 5. Quantum interference

EIT is fundamentally an interference effect between probability amplitudes rather than a simple cancellation of classical optical intensities.

Related interference effects can produce enhanced absorption, asymmetric features, interference between multiple excitation pathways, and suppression or enhancement of nonlinear response.

---

## 6. Autler–Townes splitting

A sufficiently strong resonant coupling field dresses the participating states and produces separated spectral resonances.

For an isolated resonant two-level RF transition, the splitting is approximately

$$
\Delta f_{AT}\simeq\frac{\Omega_{RF}}{2\pi},
$$

with

$$
\Omega_{RF}=\frac{|\mathbf d\cdot\mathbf E_{RF}|}{\hbar}.
$$

This is the foundation of Rydberg-atom RF electric-field metrology.

EIT and AT splitting are related but conceptually distinct: EIT emphasizes destructive interference, whereas the AT picture emphasizes resolvable dressed-state eigenvalues.

---

## 7. Dressed states

When the atom-field coupling cannot be regarded merely as a weak perturbation, the useful eigenstates are combinations of bare atomic states.

For resonant coupling,

$$
|+\rangle\sim\frac{|a\rangle+|b\rangle}{\sqrt2},
\qquad
|-\rangle\sim\frac{|a\rangle-|b\rangle}{\sqrt2}.
$$

Dressed-state language is particularly useful for interpreting AT spectra and strong RF coupling.

---

## 8. AC Stark shift

An off-resonant oscillating field shifts atomic energy levels.

For a simple far-detuned two-level system,

$$
\delta\omega_{AC}\approx\frac{|\Omega|^2}{4\Delta}.
$$

For Rydberg states, many nearby levels can contribute, so dynamic polarizability or full multilevel/Floquet calculations are often needed.

This is central to off-resonant RF sensing and low-frequency/VHF/UHF Rydberg electrometry.

---

## 9. DC Stark effect and polarizability

A static electric field produces, in the perturbative regime,

$$
\Delta E\approx-\frac12\alpha E^2.
$$

Rydberg polarizabilities can be extremely large and grow rapidly with principal quantum number away from resonances.

At stronger fields, state mixing and avoided crossings require Stark-map diagonalization rather than a single scalar polarizability.

---

## 10. Zeeman effect

A magnetic field shifts magnetic sublevels approximately as

$$
\Delta E_Z=g_J\mu_Bm_JB
$$

in the appropriate weak-field regime.

Consequences include resolved $m_J/m_F$ structure, altered RF resonance conditions, polarization-dependent transition strengths, magnetic-field-dependent Floquet spectra, and possible vector sensing.

---

## 11. Selection rules and polarization

Electric-dipole coupling obeys angular-momentum selection rules. Relative to the quantization axis,

- $\pi$: $\Delta m=0$,
- $\sigma^+$: $\Delta m=+1$,
- $\sigma^-$: $\Delta m=-1$.

Therefore rotating optical or RF polarization changes the relative excitation of magnetic sublevels. Clebsch–Gordan coefficients and reduced dipole matrix elements determine the coupling strengths.

This is essential for angle-of-arrival and vector-field measurements.

---

## 12. Optical pumping

Repeated absorption and spontaneous emission redistribute population among ground-state hyperfine and Zeeman levels.

Consequently the initial population entering an EIT ladder need not be thermal or uniform. Probe polarization, intensity, magnetic field, transit time, and repumping can change the observed $m_F/m_J$ peak strengths.

---

## 13. Saturation

At sufficiently large field strength, atomic response ceases to scale linearly with optical or RF amplitude.

Saturation changes populations and coherences and can modify EIT contrast, linewidth, RF response, and nonlinear mixing.

---

## 14. Power broadening

Strong coherent driving broadens spectral transitions.

Schematically,

$$
\Gamma_{eff}\sim\sqrt{\Gamma^2+C\Omega^2},
$$

where the precise coefficient depends on the level system.

Increasing coupling power can improve EIT visibility while simultaneously broadening the resonance, producing an important sensitivity–bandwidth tradeoff.

---

## 15. Spontaneous emission

The intermediate optical state has a finite radiative lifetime, producing population decay and decoherence.

In a density-matrix model it enters through Lindblad terms. It is one of the fundamental processes that determines EIT linewidth and contrast.

---

## 16. Rydberg radiative decay and blackbody redistribution

Rydberg states decay radiatively and are also redistributed by ambient blackbody radiation.

At room temperature, blackbody-driven transitions among nearby Rydberg levels can contribute to population loss, decoherence, and ion production.

---

## 17. Dephasing

Not every coherence loss corresponds to population decay.

Pure dephasing may originate from laser phase noise, collisions, field fluctuations, spatial inhomogeneity, surface fields, technical noise, and unresolved substructure.

It is often represented phenomenologically by a coherence decay rate $\gamma_{ij}$.

---

## 18. Doppler broadening

For an atom moving with velocity $\mathbf v$,

$$
\Delta\omega_D=-\mathbf k\cdot\mathbf v.
$$

In a thermal vapor, the observed response must be averaged over the Maxwell–Boltzmann velocity distribution.

In a two-photon ladder the residual two-photon Doppler shift depends on the effective wavevector,

$$
\Delta_{2\gamma,D}\propto
(\mathbf k_p\pm\mathbf k_c)\cdot\mathbf v,
$$

with the sign determined by propagation geometry.

Counter-propagating beams strongly modify, but generally do not eliminate, the residual Doppler effect because probe and coupling wavelengths differ.

---

## 19. Velocity-selective excitation

Different velocity classes satisfy different one- and two-photon resonance conditions.

Thermal Rydberg-EIT spectra are therefore not simply the stationary-atom spectrum convolved with one linewidth. Optical pumping and intermediate-state resonance can preferentially select particular velocity groups.

---

## 20. Transit-time broadening

Atoms spend only a finite time inside the laser beams.

For characteristic transverse speed $v$ and beam radius $w$,

$$
\tau_{tr}\sim\frac{w}{v},
\qquad
\Gamma_{tr}\sim\frac{1}{\tau_{tr}}.
$$

Transit time also determines whether steady state is actually reached.

---

## 21. Collisional broadening and shifts

Atom-atom, atom-buffer-gas, Rydberg-ground-state, and Rydberg-Rydberg collisions can produce broadening, frequency shifts, decoherence, state-changing collisions, and ionization.

These processes become increasingly important with density and Rydberg population.

---

## 22. Inhomogeneous broadening

Spatial variations in laser intensity, RF amplitude, DC electric field, magnetic field, and cell geometry cause different atoms to experience different Hamiltonians.

The measured spectrum is therefore a spatial average,

$$
S(\Delta)=\int S[\Delta;\mathbf r]W(\mathbf r)d^3r.
$$

This is particularly important for Gaussian laser beams and standing-wave or near-field RF distributions.

---

## 23. Gaussian-beam averaging

For a Gaussian optical beam,

$$
I(r)=I_0e^{-2r^2/w^2},
$$

so

$$
\Omega(r)\propto e^{-r^2/w^2}.
$$

The experiment therefore samples a distribution of Rabi frequencies rather than a single value. This can alter EIT linewidths and AT line shapes.

---

## 24. Beer–Lambert propagation and susceptibility

The local atomic coherence determines susceptibility,

$$
P=\epsilon_0\chi E,
$$

and the probe transmission depends on the imaginary part of susceptibility.

For a simple propagation model,

$$
I(L)=I(0)e^{-\alpha L}.
$$

Thus a density-matrix calculation must be connected to optical propagation before direct comparison with measured photodetector transmission.

---

## 25. Dispersion and slow light

EIT creates steep normal dispersion near transparency.

The group velocity is related to

$$
v_g=
\frac{c}
{n+\omega\,dn/d\omega}.
$$

Although RF sensing usually focuses on transmission amplitude, the associated phase and dispersion can provide additional sensing channels.

---

## 26. Floquet physics

A periodically driven atom has a Hamiltonian

$$
H(t+T)=H(t).
$$

Floquet theory replaces this time-periodic problem with quasienergy states carrying photon/Floquet index $q$.

It naturally describes strong periodic RF fields, multiphoton processes, AC Stark shifts beyond perturbation theory, state mixing, sidebands, and avoided crossings.

---

## 27. Multiphoton transitions

A transition can occur through absorption or emission of multiple RF photons when

$$
E_f-E_i\approx n\hbar\omega.
$$

These processes become important in strongly driven Rydberg systems because of large dipole moments and dense energy-level structure.

Their strength depends on intermediate detunings, matrix elements, field amplitude, polarization, and interference between pathways.

---

## 28. Floquet sidebands

Periodic driving produces spectral replicas separated by

$$
\hbar\omega_{RF}.
$$

The sideband amplitudes encode field strength and coupling structure. At strong drive they can generate complex spectra that cannot be described by a simple quadratic Stark shift.

---

## 29. Avoided crossings

When coupled dressed or Floquet states approach degeneracy, coupling prevents an exact crossing.

For a two-state model,

$$
H=
\begin{pmatrix}
E_1 & V\\
V^* & E_2
\end{pmatrix},
$$

the minimum gap is approximately

$$
\Delta_{gap}=2|V|.
$$

Avoided crossings reveal coherent hybridization and can involve direct or multiphoton coupling pathways.

---

## 30. Landau–Zener physics

If a parameter is swept through an avoided crossing, the system can make diabatic or adiabatic transitions.

The Landau–Zener framework becomes relevant when RF amplitude, frequency, DC field, or another parameter varies sufficiently rapidly in time.

For ordinary slow steady-state spectroscopy it may not dominate, but it becomes important in pulsed and swept-field experiments.

---

## 31. Bloch–Siegert shift

The rotating-wave approximation neglects the counter-rotating component of an oscillating field.

At strong drive or relatively low transition frequency this approximation can fail, producing the **Bloch–Siegert shift** and other corrections.

This can matter for strong-field Rydberg RF spectroscopy and Floquet calculations.

---

## 32. Rotating-wave approximation and its breakdown

Under weak near-resonant coupling,

$$
H_{int}\propto
\Omega e^{-i\omega t}
$$

is simplified by retaining the resonant rotating component.

Strong fields, low frequencies, multiphoton coupling, and large detuning can require the full time-dependent Hamiltonian. Floquet methods are then especially useful.

---

## 33. Adiabatic elimination

If an intermediate state evolves much faster than the states of interest and remains weakly populated, it can sometimes be eliminated to obtain an effective two-level or reduced model.

This gives effective Rabi frequencies and AC Stark shifts and is useful for understanding multiphoton transitions.

It should not be used when the eliminated state becomes resonant or appreciably populated.

---

## 34. Effective Hamiltonians and Schrieffer–Wolff transformations

Off-resonant states can be incorporated perturbatively into an effective Hamiltonian.

These methods clarify induced level shifts, effective multiphoton couplings, and higher-order interactions without retaining every state explicitly.

They are complementary to full Floquet diagonalization.

---

## 35. Rydberg–Rydberg interactions

Two Rydberg atoms can interact strongly through dipole-dipole or van der Waals interactions.

Typical long-range forms are

$$
V_{dd}\sim\frac{C_3}{R^3},
\qquad
V_{vdW}\sim\frac{C_6}{R^6}.
$$

These interactions shift the Rydberg resonance and produce nonlinear optical behavior.

---

## 36. Rydberg blockade

If the interaction shift between two nearby Rydberg atoms exceeds the excitation linewidth, excitation of one atom suppresses excitation of another within a blockade radius.

This produces strong optical nonlinearities and collective effects. In dilute room-temperature electrometry it may be negligible, but at higher Rydberg density it becomes important.

---

## 37. Förster resonances

Pairs of Rydberg states can become nearly degenerate with another pair-state channel, strongly enhancing resonant dipole-dipole interactions.

These resonances can change interaction strengths, broaden spectra, produce state mixing, and modify nonlinear response.

---

## 38. Mean-field interaction shifts

In sufficiently dense ensembles, interactions can sometimes be represented approximately by a density-dependent effective shift or dephasing.

This is a semiclassical reduction of a genuinely many-body quantum problem and should be used only where correlations are not essential.

---

## 39. Optical nonlinearity and susceptibility expansion

The optical polarization can be expanded as

$$
P=
\epsilon_0[
\chi^{(1)}E+
\chi^{(2)}E^2+
\chi^{(3)}E^3+\cdots
].
$$

Rydberg interactions and multilevel coherence can generate very large nonlinear susceptibilities.

For centrosymmetric effective media, odd-order terms are often especially important.

---

## 40. Cross-Kerr and Kerr-like effects

An intensity-dependent refractive index can be written

$$
n=n_0+n_2I.
$$

In Rydberg media, strong interactions can greatly enhance effective optical nonlinearities, producing phase shifts, nonlinear transmission, bistability, and photon-photon interactions in suitable regimes.

---

## 41. Wave mixing and intermodulation

When several coherent fields drive a nonlinear atomic system, new frequency components can appear.

For RF tones $f_1$ and $f_2$, third-order products include

$$
2f_1-f_2,
\qquad
2f_2-f_1.
$$

In Rydberg receivers this connects nonlinear atomic response directly to communication metrics such as harmonic distortion, IMD, compression, and EVM.

---

## 42. Heterodyne / superheterodyne atomic detection

With an RF local oscillator and weak signal,

$$
E(t)=E_{LO}\cos\omega_{LO}t+
E_s\cos\omega_st,
$$

the atomic response can contain a beat component at

$$
\omega_{IF}=|\omega_s-\omega_{LO}|.
$$

The atoms act as an RF mixer and optical transducer. The conversion mechanism depends on the nonlinear dependence of the optical observable on RF amplitude and phase.

---

## 43. Homodyne response

When the reference and signal occupy the same or nearly the same RF frequency, their relative phase changes the total field amplitude.

Phase-sensitive atomic detection can therefore recover field quadratures and improve weak-field measurements.

---

## 44. Coherent population dynamics and transient response

If modulation frequencies become comparable to optical pumping, coherence decay, or Rabi rates, the atom cannot follow the instantaneous steady state.

One must solve

$$
\dot\rho(t)
$$

rather than repeatedly evaluating steady state.

This determines receiver bandwidth, transient overshoot, ringing, and modulation transfer.

---

## 45. EIT bandwidth

The effective sensor bandwidth is not simply the photodetector bandwidth.

It can depend on optical Rabi frequencies, coherence lifetimes, transit time, decoherence, RF dressing, and the measurement protocol.

The atomic transfer function and electronic transfer function should therefore be treated separately.

---

## 46. Laser linewidth and phase noise

Probe and coupling laser phase fluctuations appear as optical-coherence dephasing and detuning noise.

Because EIT depends on two-photon coherence, relative laser phase noise can directly broaden or distort the transparency resonance.

---

## 47. RF phase noise and amplitude noise

RF-source noise changes the instantaneous Rabi frequency and detuning.

Broadband RF noise can simultaneously cause resonant transitions and AC Stark shifts and can distort EIT/AT spectra, as demonstrated experimentally in Rydberg electrometry.

---

## 48. Shot noise and technical noise

Measured sensitivity may be limited by photon shot noise, detector noise, laser relative-intensity noise, frequency noise, RF source noise, digitizer noise, and environmental electric/magnetic fluctuations.

The fundamental atomic response and the practical sensor noise floor are therefore different quantities.

---

## 49. Blackbody-induced transitions and ionization

Thermal radiation can transfer population between neighboring Rydberg states and contribute to ionization.

This connects Rydberg spectroscopy to charged-particle transport and, when electrodes are present, to the [Shockley–Ramo](../shockley-ramo/) signal mechanism.

---

## 50. Field ionization and RF-assisted ionization

Strong electric fields can mix Rydberg manifolds and eventually ionize Rydberg atoms.

Time-dependent RF fields can also promote population toward ionizing states through multiphoton processes.

Ionization introduces a new signal channel beyond optical EIT: free electrons and ions.

---

## 51. Surface and stray electric fields

Charges on vapor-cell walls, adsorbates, photoelectric charging, nearby electrodes, and patch potentials can generate DC or slowly varying electric fields.

Because Rydberg polarizability is large, relatively weak stray fields can shift or broaden spectra.

---

## 52. Standing waves and RF-field inhomogeneity

A dielectric vapor cell perturbs the applied RF field and can create reflections and standing waves.

Therefore the atomic spectrum may represent a spatial average over

$$
E_{RF}(\mathbf r),
$$

rather than the nominal free-space field.

This is an important connection between Rydberg spectroscopy and classical electromagnetics.

---

## 53. Cooperative and collective optical effects

At sufficiently large optical depth, atomic polarization can affect propagation through the ensemble. Collective radiative effects, radiation trapping, and propagation-induced nonlinearities may become relevant.

These effects go beyond an independent-atom steady-state model.

---

## 54. Semiclassical Maxwell–Bloch equations

When optical propagation and atomic dynamics must be solved self-consistently, combine Maxwell's equations with the Bloch equations:

$$
\left(
\frac{\partial}{\partial z}
+
\frac{1}{c}\frac{\partial}{\partial t}
\right)\Omega_p
\propto
i\rho_{ge}.
$$

The Maxwell–Bloch framework describes pulse propagation, slow light, nonlinear propagation, and spatial evolution of EIT.

---

# Which effects matter most in room-temperature Rydberg RF sensing?

A useful hierarchy is:

**Core:** EIT, dark-state coherence, OBEs, Rabi coupling, Doppler averaging, spontaneous decay, dephasing, transit time, optical pumping, selection rules, Gaussian-beam averaging.

**RF sensing:** AT splitting, AC/DC Stark shifts, RF detuning, polarization, Zeeman shifts, RF inhomogeneity, heterodyne mixing, sensor bandwidth.

**Strong-field regime:** dressed states, Floquet states, multiphoton transitions, sidebands, avoided crossings, Bloch–Siegert/RWA breakdown.

**Nonlinear regime:** saturation, higher-order susceptibility, wave mixing, intermodulation, Rydberg interactions, blockade and Förster resonances.

**Ionization/current regime:** blackbody and collisional ionization, field/RF-assisted ionization, charged-particle transport, space charge, and Shockley–Ramo induction.

The overall modeling hierarchy is therefore

$$
\boxed{
\begin{array}{c}
\text{atomic structure}\
\downarrow\\
\text{semiclassical atom-field Hamiltonian}\
\downarrow\\
\text{density matrix / Floquet dynamics}\
\downarrow\\
\text{Doppler + spatial averaging}\
\downarrow\\
\text{optical propagation}\
\downarrow\\
\text{photodetection}
\end{array}
}
$$

with an additional branch

$$
\boxed{
\text{Rydberg ionization}
\rightarrow
\text{electron/ion transport}
\rightarrow
\text{Shockley–Ramo current}
}
$$

when charged-particle signals are measured.

---

# References and further reading

1. M. Fleischhauer, A. Imamoglu, and J. P. Marangos, “Electromagnetically induced transparency,” *Rev. Mod. Phys.* **77**, 633 (2005). https://doi.org/10.1103/RevModPhys.77.633
2. C. L. Holloway et al., “Broadband Rydberg atom-based electric-field probe for SI-traceable, self-calibrated measurements,” *IEEE Trans. Antennas Propag.* **62**, 6169 (2014). https://doi.org/10.1109/TAP.2014.2360208
3. J. A. Sedlacek et al., “Microwave electrometry with Rydberg atoms in a vapour cell using bright atomic resonances,” *Nature Physics* **8**, 819 (2012). https://doi.org/10.1038/nphys2423
4. C. L. Holloway et al., “Atom-Based RF Electric Field Metrology: From Self-Calibrated Measurements to Subwavelength and Near-Field Imaging,” *IEEE Trans. EMC* (2017). https://www.nist.gov/publications/atom-based-rf-electric-field-metrology-self-calibrated-measurements-subwavelength-and
5. N. Schlossberger et al., “Rydberg states of alkali atoms in atomic vapor as SI-traceable field probes and communications receivers,” *Nature Reviews Physics* (2024). https://www.nist.gov/publications/rydberg-states-alkali-atoms-atomic-vapor-si-traceable-field-probes-and-communications-0
6. C. L. Holloway et al., “Atomic Spectra in a Six-Level Scheme for Electromagnetically Induced Transparency and Autler-Townes Splitting in Rydberg Atoms,” *Phys. Rev. A* **103**, 023704 (2021). https://doi.org/10.1103/PhysRevA.103.023704
7. C. L. Holloway and J. A. Gordon, “Two-photon microwave transitions and strong-field effects in a room-temperature Rydberg-atom gas,” *Phys. Rev. A* **90**, 043419 (2014). https://doi.org/10.1103/PhysRevA.90.043419
8. C. L. Holloway et al., “Electromagnetically Induced Transparency and Autler-Townes splitting in the presence of band-limited white Gaussian noise,” *J. Appl. Phys.* (2018). https://www.nist.gov/publications/electromagnetically-induced-transparency-eit-and-autler-townes-splitting-presence-band
9. T. F. Gallagher, *Rydberg Atoms*, Cambridge University Press (1994) — Rydberg structure, Stark/Zeeman physics, interactions and field ionization.
10. R. W. Boyd, *Nonlinear Optics*, Academic Press — susceptibilities, Kerr effects, wave mixing and nonlinear propagation.
11. M. O. Scully and M. S. Zubairy, *Quantum Optics*, Cambridge University Press — semiclassical atom-field interactions, density matrices, coherence and EIT.
12. C. Cohen-Tannoudji, J. Dupont-Roc and G. Grynberg, *Atom–Photon Interactions*, Wiley — dressed states, Rabi physics, light shifts and semiclassical atom-field theory.
13. J. Lowinski et al., “Strongly Nonlinear Interaction between Nonclassical Light and a Blockaded Rydberg Atomic Ensemble,” *Phys. Rev. Lett.* **132**, 053001 (2024). https://doi.org/10.1103/PhysRevLett.132.053001
14. Y. Bai and G. Huang, “Transient optical response of cold Rydberg atoms with electromagnetically induced transparency,” *Phys. Rev. A* **101**, 023806 (2020). https://doi.org/10.1103/PhysRevA.101.023806

---

[← Home](../)
