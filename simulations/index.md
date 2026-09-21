---
layout: default
title: Simulation Library
description: A roadmap from equations to reproducible numerical models for electromagnetics, RF systems, charged particles, and atomic/quantum sensing.
---

# Simulation Library

<div class="intuition"><span class="callout-title">Simulation principle</span>Use the simplest model that preserves the physics needed for the question. A model is useful when its assumptions are explicit, its limiting cases are checked, and at least one observable can be compared with experiment.</div>

## Model-selection map

| Problem | First model | When to upgrade |
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

Checks: phase advances linearly, $|E|$ is constant in a lossless medium, and wavelength equals $2\pi/\beta$.

## 2. Transmission line and reflection

For a lossless line,

$$Z_{in}=Z_0\frac{Z_L+jZ_0\tan\beta l}{Z_0+jZ_L\tan\beta l}.$$

A useful simulation plots $Z_{in}(l)$ and $\Gamma(l)$ on a Smith chart while sweeping electrical length.

## 3. Antenna array factor

For a linear array,

$$AF(\theta)=\sum_{n=0}^{N-1}w_ne^{jn(kd\sin\theta+\beta_s)}.
$$

Simulate:

- element count;
- spacing;
- steering phase;
- amplitude taper;
- phase/amplitude errors;
- grating lobes;
- scan loss after multiplying by an element pattern.

Then upgrade to a full-wave solver when mutual coupling and finite element patterns matter.

## 4. Radar waveform

An FMCW simulation should separate:

**transmit chirp → delayed/Doppler-shifted echo → mixer → beat signal → FFT → range/velocity estimate.**

Test range resolution against $c/(2B)$ and Doppler against $2v/\lambda$.

## 5. Lorentz-force particle tracking

Integrate

$$m\dot{\mathbf v}=q(\mathbf E+\mathbf v\times\mathbf B),\qquad
\dot{\mathbf r}=\mathbf v.
$$

Prefer a Boris pusher for long charged-particle trajectories in magnetic fields because it preserves gyromotion better than naive Euler stepping.

## 6. Monte Carlo transport + Shockley–Ramo

For each particle:

1. sample creation position/time;
2. sample initial velocity;
3. propagate through actual $\mathbf E,\mathbf B$;
4. apply stochastic collisions;
5. evaluate $i_j=q_j\mathbf v_j\cdot\mathbf E_w$;
6. sum particles;
7. convolve/filter through measured $Z_T(\omega)$.

This naturally separates **transport physics** from **signal induction**.

## 7. Optical Bloch equations

For a two-level atom,

$$\dot\rho=-\frac{i}{\hbar}[H,\rho]+\mathcal L(\rho).
$$

Validate a code in this order:

- zero drive → ground state;
- weak resonant drive → Lorentzian response;
- increasing drive → saturation/power broadening;
- detuning symmetry where expected;
- trace $\mathrm{Tr}\rho=1$;
- populations remain physical.

## 8. Three-level EIT

For a ladder system $|g\rangle\rightarrow|e\rangle\rightarrow|r\rangle$, calculate steady-state $\rho_{ge}$ and use

$$\chi\propto\rho_{ge}/\Omega_p.
$$

Then add, one at a time:

**Doppler averaging → transit time → laser linewidth → spatial Rabi variation → Zeeman structure → RF coupling.**

Incremental validation prevents a large density-matrix script from becoming impossible to debug.

## 9. Floquet / Shirley model

For a periodic Hamiltonian $H(t+T)=H(t)$, expand in photon replicas and diagonalize the enlarged Floquet Hamiltonian.

Useful outputs:

- quasienergies;
- bare-state overlap;
- target-state shift;
- avoided-crossing gaps;
- replica index $q$;
- pathway amplitudes;
- eigenvector continuity by overlap between neighboring field points.

## 10. Magnetostatics and Halbach arrays

Solve

$$\nabla\cdot\mathbf B=0,\qquad \mathbf B=\mu_0(\mathbf H+\mathbf M).
$$

For atomic sensing, post-process not only $|B|$ but the distribution of **Zeeman shifts across the illuminated vapor volume**.

## 11. FEM, FDTD and MoM

- **FEM:** excellent for bounded complex geometries, waveguides, cavities and dielectric structures.
- **FDTD:** broadband time-domain propagation and transients.
- **MoM:** efficient for open-region conducting surfaces, wires, radiation and scattering.

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

## Recommended progression

**analytic limit → small Python model → parameter sweep → realistic geometry/multilevel model → uncertainty/sensitivity analysis → experimental comparison.**
