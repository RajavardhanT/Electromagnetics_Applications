---
layout: default
title: Simulation Library
description: Numerical models for electromagnetics, RF systems, charged particles, and atomic/quantum sensing.
---

# Simulation Library

<div class="intuition"><span class="callout-title">Simulation principle</span>Use the simplest model that preserves the physics needed for the question. A model is useful when its assumptions are explicit, its limiting cases are checked, and at least one observable can be compared with experiment.</div>

## Downloadable Python starting points

The repository includes small, readable scripts that produce numerical output and plots:

- [Array factor and beam steering](python/array_factor.py)
- [Free-space link budget](python/link_budget.py)
- [Lorentz-force particle tracking with a Boris pusher](python/lorentz_boris.py)
- [Driven dissipative two-level optical Bloch equations](python/optical_bloch_two_level.py)
- [Ideal Halbach-cylinder field scaling](python/halbach_ideal.py)
- [Python examples README](python/README.md)

<div class="engineering"><span class="callout-title">Model hierarchy</span>These scripts are intentionally compact first models. Geometry, loss, collisions, multilevel structure, uncertainty and measured instrument transfer functions can be added when required by the physical problem.</div>

## Model-selection map

| Problem | First model | When a more complete model is needed |
|---|---|---|
| Plane-wave propagation | analytic phasor | layered/inhomogeneous medium |
| Transmission line | telegrapher equations | full-wave launch/discontinuity |
| Antenna array | array factor | mutual coupling / installed platform |
| Waveguide | modal solution | bends, irises, dielectric loading |
| Complex 3-D RF structure | FEM / FDTD / MoM | hybrid/asymptotic for huge electrical size |
| Charged particles | Lorentz ODE | collisions / space charge / PIC |
| Atomic two-level system | optical Bloch equations | hyperfine/Zeeman multilevel density matrix |
| Strong periodic atomic drive | dressed-state / Floquet | full dissipative Floquet master equation |

## 1. Plane wave

A minimal complex representation is

```python
import numpy as np
z = np.linspace(0, 2, 1000)
f = 1e9
c = 299_792_458
beta = 2*np.pi*f/c
E = np.exp(-1j*beta*z)
```

Checks include linear phase advance, constant $|E|$ in a lossless medium, and wavelength $2\pi/\beta$.

## 2. Transmission line and reflection

For a lossless line,

$$Z_{in}=Z_0\frac{Z_L+jZ_0\tan\beta l}{Z_0+jZ_L\tan\beta l}.$$

Plots of $Z_{in}(l)$ and $\Gamma(l)$ on a Smith chart show the effect of electrical length directly.

## 3. Antenna array factor

For a linear array,

$$AF(\theta)=\sum_{n=0}^{N-1}w_ne^{jn(kd\sin\theta+\beta_s)}.
$$

Useful parameters include element count, spacing, steering phase, amplitude taper, phase/amplitude errors, grating lobes, and scan loss after multiplication by an element pattern.

A full-wave model becomes important when mutual coupling and finite element patterns matter.

## 4. Radar waveform

An FMCW model contains

**transmit chirp → delayed/Doppler-shifted echo → mixer → beat signal → FFT → range/velocity estimate.**

Range resolution can be checked against $c/(2B)$ and Doppler against $2v/\lambda$.

## 5. Lorentz-force particle tracking

Integrate

$$m\dot{\mathbf v}=q(\mathbf E+\mathbf v\times\mathbf B),\qquad
\dot{\mathbf r}=\mathbf v.
$$

A Boris pusher is useful for long charged-particle trajectories in magnetic fields because it preserves gyromotion better than naive Euler stepping.

## 6. Monte Carlo transport + Shockley–Ramo

For particle $j$,

$$i_j=q_j\mathbf v_j\cdot\mathbf E_w.$$

A complete transport calculation can include sampled creation positions and velocities, actual $\mathbf E$ and $\mathbf B$ fields, stochastic collisions, wall/electrode interactions, weighting-field interpolation, particle summation, and the measured $Z_T(\omega)$ of the readout electronics.

This separates **transport physics** from **signal induction**.

## 7. Optical Bloch equations

For a two-level atom,

$$\dot\rho=-\frac{i}{\hbar}[H,\rho]+\mathcal L(\rho).
$$

Useful consistency checks include the zero-drive limit, weak-drive Lorentzian response, saturation/power broadening, expected detuning symmetry, $\mathrm{Tr}\rho=1$, and physical populations.

## 8. Three-level EIT

For a ladder system $|g\rangle\rightarrow|e\rangle\rightarrow|r\rangle$, calculate steady-state $\rho_{ge}$ and use

$$\chi\propto\rho_{ge}/\Omega_p.
$$

Realistic models may include Doppler averaging, transit time, laser linewidth, spatial Rabi variation, Zeeman structure and RF coupling.

## 9. Floquet / Shirley model

For a periodic Hamiltonian $H(t+T)=H(t)$, expand in photon replicas and diagonalize the enlarged Floquet Hamiltonian.

Useful outputs include quasienergies, bare-state overlap, target-state shift, avoided-crossing gaps, replica index $q$, pathway amplitudes, and eigenvector continuity by overlap between neighboring field points.

## 10. Magnetostatics and Halbach arrays

Solve

$$\nabla\cdot\mathbf B=0,\qquad \mathbf B=\mu_0(\mathbf H+\mathbf M).
$$

For atomic sensing, useful post-processing includes both $|B|$ and the distribution of **Zeeman shifts across the illuminated vapor volume**.

## 11. FEM, FDTD and MoM

- **FEM:** bounded complex geometries, waveguides, cavities and dielectric structures.
- **FDTD:** broadband time-domain propagation and transients.
- **MoM:** open-region conducting surfaces, wires, radiation and scattering.

See [Comparison Tables](../reference/comparison-tables.html) and [Computational Methods](../computational-methods/).

## 12. Reproducibility checklist

<div class="checklist">
<label><input type="checkbox"> State units and coordinate system.</label>
<label><input type="checkbox"> State sign/phasor convention.</label>
<label><input type="checkbox"> Check at least one analytic limiting case.</label>
<label><input type="checkbox"> Perform time-step / mesh / basis convergence.</label>
<label><input type="checkbox"> Save parameter values with results.</label>
<label><input type="checkbox"> Compare an actual observable, not only hidden state variables.</label>
<label><input type="checkbox"> Distinguish fitted parameters from independently measured inputs.</label>
</div>
