---
layout: default
title: Essential Electromagnetics Derivations
description: Selected derivations of the wave equation, Poynting theorem, skin depth, transmission-line reflection, Friis scaling, radar resolution, Larmor precession, Rabi coupling, AC Stark shift, and Shockley–Ramo current.
---

# Essential Electromagnetics Derivations

The goal here is not to reproduce a textbook. These are derivations worth remembering because each reveals a **reusable physical structure**.

## 1. Wave equation from Maxwell's equations

In a homogeneous, source-free, linear medium,

$$
\nabla\times\mathbf E=-\mu\frac{\partial\mathbf H}{\partial t},
\qquad
\nabla\times\mathbf H=\epsilon\frac{\partial\mathbf E}{\partial t}.
$$

Take the curl of Faraday's law:

$$
\nabla\times(\nabla\times\mathbf E)
=-\mu\frac{\partial}{\partial t}(\nabla\times\mathbf H).
$$

Use

$$
\nabla\times(\nabla\times\mathbf E)=\nabla(\nabla\cdot\mathbf E)-\nabla^2\mathbf E.
$$

With no free charge in a homogeneous medium, $\nabla\cdot\mathbf E=0$. Substitute Ampère–Maxwell:

$$
-\nabla^2\mathbf E=-\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2}.
$$

Therefore

$$
\boxed{\nabla^2\mathbf E-\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2}=0}
$$

with speed

$$
\boxed{v=\frac1{\sqrt{\mu\epsilon}}}.
$$

<div class="intuition"><span class="callout-title">What the derivation teaches</span>The wave is not added as a separate postulate. It is already contained in the coupled curl structure of Maxwell's equations.</div>

## 2. Poynting theorem

Start with

$$
\nabla\times\mathbf H=\mathbf J+\frac{\partial\mathbf D}{\partial t},
\qquad
\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t}.
$$

Use the vector identity

$$
\nabla\cdot(\mathbf E\times\mathbf H)
=\mathbf H\cdot(\nabla\times\mathbf E)-\mathbf E\cdot(\nabla\times\mathbf H).
$$

Substitution gives

$$
\nabla\cdot(\mathbf E\times\mathbf H)
=-\mathbf H\cdot\frac{\partial\mathbf B}{\partial t}
-\mathbf E\cdot\mathbf J
-\mathbf E\cdot\frac{\partial\mathbf D}{\partial t}.
$$

For linear nondispersive media identify field-energy density

$$
u=\frac12\mathbf E\cdot\mathbf D+\frac12\mathbf B\cdot\mathbf H.
$$

Then

$$
\boxed{
\nabla\cdot\mathbf S+
\frac{\partial u}{\partial t}+
\mathbf J\cdot\mathbf E=0,
\qquad
\mathbf S=\mathbf E\times\mathbf H.
}
$$

This is local electromagnetic energy conservation.

## 3. Reflection coefficient on a transmission line

At the load,

$$
V=V^++V^-,
\qquad
I=\frac{V^+}{Z_0}-\frac{V^-}{Z_0}.
$$

Enforce $Z_L=V/I$ and define $\Gamma=V^-/V^+$. Solving gives

$$
\boxed{\Gamma_L=\frac{Z_L-Z_0}{Z_L+Z_0}}.
$$

Special cases follow instantly:

- $Z_L=Z_0\Rightarrow\Gamma=0$;
- open circuit $Z_L\rightarrow\infty\Rightarrow\Gamma\rightarrow+1$;
- short circuit $Z_L=0\Rightarrow\Gamma=-1$.

## 4. Skin depth

In a good conductor, $\sigma\gg\omega\epsilon$. The propagation constant becomes approximately

$$
\gamma\approx(1+j)\sqrt{\frac{\omega\mu\sigma}{2}}.
$$

Thus attenuation constant

$$
\alpha=\sqrt{\frac{\omega\mu\sigma}{2}}.
$$

Define skin depth as the distance for amplitude to fall by $1/e$:

$$
\boxed{\delta=\frac1\alpha=\sqrt{\frac{2}{\omega\mu\sigma}}}.
$$

The key result is $\delta\propto f^{-1/2}$.

## 5. Friis scaling from power density and effective aperture

A transmitter with gain $G_t$ produces far-field power density

$$
S=\frac{P_tG_t}{4\pi R^2}.
$$

The receiving antenna captures

$$
P_r=SA_e.
$$

Using

$$
A_e=\frac{G_r\lambda^2}{4\pi}
$$

gives

$$
\boxed{P_r=P_tG_tG_r\left(\frac{\lambda}{4\pi R}\right)^2}.
$$

<div class="assumption-box"><span class="callout-title">Assumptions</span>Far field, polarization alignment incorporated appropriately, impedance matching/losses treated consistently, unobstructed free-space propagation, and gains defined in the relevant directions.</div>

## 6. Radar range resolution

For a signal bandwidth $B$, the characteristic compressed pulse/time resolution is roughly

$$
\Delta t\sim\frac1B.
$$

Radar round-trip delay is

$$
\Delta t=\frac{2\Delta R}{c}.
$$

Therefore

$$
\boxed{\Delta R\approx\frac{c}{2B}}.
$$

This makes clear why range resolution is fundamentally a bandwidth problem.

## 7. Larmor precession

A magnetic moment experiences torque

$$
\boldsymbol\tau=\boldsymbol\mu\times\mathbf B.
$$

For angular momentum $\mathbf F$ with $\boldsymbol\mu=\gamma\mathbf F$,

$$
\frac{d\mathbf F}{dt}=\gamma\mathbf F\times\mathbf B.
$$

The derivative is perpendicular to $\mathbf F$, so the magnitude stays approximately constant while the vector precesses. The angular frequency is

$$
\boxed{\omega_L=|\gamma|B}.
$$

## 8. Rabi frequency from the dipole Hamiltonian

For a classical oscillating electric field

$$
\mathbf E(t)=\mathbf E_0\cos\omega t
$$

and electric-dipole interaction

$$
H_I=-\mathbf d\cdot\mathbf E(t),
$$

the matrix element between $|g\rangle$ and $|e\rangle$ is proportional to

$$
-\langle e|\mathbf d|g\rangle\cdot\mathbf E_0.
$$

Under the usual resonant rotating-wave convention,

$$
\boxed{\Omega=\frac{\mathbf d_{eg}\cdot\mathbf E_0}{\hbar}}
$$

up to amplitude/convention definitions. Polarization enters through the projected vector matrix element.

## 9. AC Stark shift from dressed-state expansion

For a two-level system in the rotating frame, a common Hamiltonian is

$$
H=\frac{\hbar}{2}
\begin{pmatrix}
0 & \Omega\\
\Omega & -2\Delta
\end{pmatrix}.
$$

The eigenvalue separation involves

$$
\sqrt{\Delta^2+\Omega^2}.
$$

For $|\Omega/\Delta|\ll1$,

$$
\sqrt{\Delta^2+\Omega^2}
\approx|\Delta|\left(1+\frac{\Omega^2}{2\Delta^2}\right).
$$

The leading correction therefore scales as

$$
\boxed{\delta\omega_{AC}\sim\frac{|\Omega|^2}{4\Delta}}
$$

with sign and exact factor following the state/detuning convention.

<div class="intuition"><span class="callout-title">What the derivation teaches</span>The far-detuned Stark shift is the perturbative shadow of full dressed-state level repulsion. Near resonance, use the complete dressed/Floquet model rather than forcing a quadratic-shift approximation.</div>

## 10. Shockley–Ramo current from weighting potential

Define weighting field

$$
\mathbf E_w=-\nabla\phi_w.
$$

For charge $q$ moving with velocity $\mathbf v$,

$$
\frac{d\phi_w}{dt}=\nabla\phi_w\cdot\mathbf v=-\mathbf E_w\cdot\mathbf v.
$$

Thus, subject to electrode-current sign convention,

$$
\boxed{i=q\mathbf v\cdot\mathbf E_w=-q\frac{d\phi_w}{dt}}.
$$

This derivation makes the central point explicit: signal depends on **motion through weighting potential**, not only on charge collection at the electrode.

## Derivation practice

For each derivation, try to identify:

- the conservation law or symmetry used;
- the approximation that simplifies it;
- the dimensionless parameter controlling that approximation;
- the experimentally measurable quantity at the end.

That is more valuable than memorizing the algebra alone.
