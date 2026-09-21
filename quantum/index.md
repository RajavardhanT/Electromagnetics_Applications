---
layout: default
title: Quantum Technologies through Electromagnetics
description: A bridge from classical electromagnetic fields to atom-field Hamiltonians, Rabi coupling, Stark and Zeeman effects, EIT, Rydberg sensing, magnetometry and cavity systems.
---

# Quantum Technologies through Electromagnetics

<div class="intuition"><span class="callout-title">30-second intuition</span>Classical electromagnetics tells us the field $\mathbf E(\mathbf r,t),\mathbf B(\mathbf r,t)$. Quantum mechanics tells us how discrete states respond to those fields. The bridge is the interaction Hamiltonian.</div>

## 1. Electric and magnetic interactions

Electric dipole:

$$H_E=-\mathbf d\cdot\mathbf E.$$

Magnetic dipole:

$$H_B=-\boldsymbol\mu\cdot\mathbf B.$$

These two relations connect RF, microwave and optical fields to atomic transitions and sensing.

## 2. Rabi frequency

For a resonant electric-dipole transition,

$$\Omega=\frac{\mathbf d_{eg}\cdot\mathbf E}{\hbar}.
$$

The dot product carries polarization/selection-rule information. A large radial dipole matrix element does not guarantee large coupling if angular projection is weak or forbidden.

## 3. Detuning and rotating-frame picture

If a drive has angular frequency $\omega$ and transition frequency $\omega_0$,

$$\Delta=\omega-\omega_0.
$$

Near resonance, the rotating-wave approximation often simplifies the Hamiltonian by discarding rapidly oscillating counter-rotating terms. At strong drive or low carrier frequency, Bloch–Siegert/counter-rotating effects can become relevant.

## 4. AC Stark shift

For a far-detuned ideal two-level system,

$$\delta\omega_{AC}\approx\frac{|\Omega|^2}{4\Delta}.
$$

For multilevel atoms, sum over allowed couplings and use the appropriate scalar/vector/tensor structure rather than blindly applying a two-level formula.

## 5. Zeeman shift

In a weak magnetic field,

$$\Delta E=g_F\mu_Bm_FB
$$

for hyperfine levels, with analogous $g_Jm_J$ expressions when fine-structure basis is appropriate. At larger fields, use Breit–Rabi or full Hamiltonian diagonalization.

## 6. Autler–Townes splitting

A sufficiently strong resonant coupling dresses two states and creates a splitting approximately

$$\Delta f_{AT}=\frac{\Omega}{2\pi}
$$

in the ideal limit. Finite linewidth and weak-drive regimes complicate the distinction between true resolvable AT splitting and interference-modified line shapes.

## 7. Electromagnetically induced transparency

A coherent three-level system can support a dark state that suppresses absorption. In Rydberg EIT, optical coherence provides access to highly polarizable Rydberg levels and enables RF electric-field sensing.

## 8. Dressed and Floquet states

A periodic drive creates a quasienergy problem. Floquet/Shirley methods enlarge the basis with photon-index replicas. Near degeneracy, coupling produces avoided crossings and hybridization.

This is particularly useful when simple perturbative Stark maps fail.

## 9. Rydberg atoms

Rydberg states provide:

- large electric-dipole matrix elements;
- large polarizability;
- long-range interactions;
- microwave/RF transitions;
- access to AT, Stark, Floquet and nonlinear sensing regimes.

See [Semiclassical Quantum Optics for Rydberg EIT](../rydberg-semiclassical-effects/).

## 10. Ground-state atomic magnetometry

Long-lived ground-state spin coherence converts magnetic field into Larmor precession, Zeeman shifts and optical rotation. See [Ground-State Magnetometry](../ground-state-magnetometry/).

## 11. Cavity QED and resonators

A resonator modifies the electromagnetic density of states and enhances atom-field coupling. The comparison among coupling $g$, cavity decay $\kappa$ and atomic decay $\gamma$ determines weak/strong-coupling regimes.

## 12. Quantum sensing architecture

A useful general chain is

$$
\boxed{
\text{field}
\rightarrow
\text{Hamiltonian parameter}
\rightarrow
\text{state evolution}
\rightarrow
\text{optical/microwave observable}
\rightarrow
\text{detector}
}.
$$

The sensor is only as good as the complete transduction chain, not the atomic Hamiltonian alone.

## Worked example — field from AT splitting

For a known projected dipole $d$, an ideal resonant AT splitting $\Delta f$ gives

$$E=\frac{2\pi\hbar\Delta f}{d}.
$$

If the dipole is uncertain by 2%, the inferred electric field inherits at least that scale of calibration uncertainty before adding frequency-fit and systematics.

## 13. Semiclassical versus fully quantum field treatment

Many atomic-sensing experiments can treat the applied laser/RF fields classically while quantizing the atom. A fully quantized field becomes important for photon statistics, vacuum fluctuations, cavity-QED state engineering and nonclassical-light questions.

## 14. Measurement and engineering reality

<div class="measurement"><span class="callout-title">What is measured?</span>Usually not “the quantum state” directly. Experiments measure photodiode voltage, optical phase/polarization, microwave transmission, fluorescence, ion current or another classical observable linked to the density matrix.</div>

<div class="engineering"><span class="callout-title">What broadens the ideal picture?</span>Doppler averaging, transit time, laser linewidth, RF inhomogeneity, stray fields, collisions, blackbody transitions, spatial beam profiles, detector bandwidth and calibration uncertainty.</div>

## References

- C. Cohen-Tannoudji, J. Dupont-Roc and G. Grynberg, *Atom–Photon Interactions*.
- M. O. Scully and M. S. Zubairy, *Quantum Optics*.
- T. F. Gallagher, *Rydberg Atoms*.
- C. L. Degen, F. Reinhard and P. Cappellaro, “Quantum sensing,” *Rev. Mod. Phys.* 89, 035002 (2017).

Related: [Rydberg EIT](../rydberg-semiclassical-effects/) · [Ground-State Magnetometry](../ground-state-magnetometry/) · [Hydrogen Maser](../hydrogen-maser/) · [Theory ↔ Experiment](../theory-experiment/)
