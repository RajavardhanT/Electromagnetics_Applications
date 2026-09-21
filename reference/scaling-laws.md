---
layout: default
title: Scaling Laws & Dimensionless Numbers
description: A regime map for electrical size, far field, skin depth, loss, resonance, antennas, radar, diffraction, atomic sensing, and Rydberg physics.
---

# Scaling Laws & Dimensionless Numbers

<div class="intuition"><span class="callout-title">Physical intuition in 30 seconds</span>A scaling law tells you what matters before you calculate the exact coefficient. A dimensionless number tells you which physical model is appropriate.</div>

## 1. Electrical size: $ka$

$$
\boxed{ka=\frac{2\pi a}{\lambda}}
$$

- $ka\ll1$: quasistatic/small-scatterer regime.
- $ka\sim1$: full-wave effects are central.
- $ka\gg1$: electrically large structure.

This single ratio is useful across antennas, scattering, resonators, EMC, nanoparticles and spacecraft.

## 2. Electrical length of an interconnect

$$
\theta=\beta l=\frac{2\pi l}{\lambda_g}.
$$

When phase varies appreciably along an interconnect, treat it as a transmission line rather than an ideal wire.

## 3. Wavelength with frequency

$$
\lambda\propto f^{-1}.
$$

Doubling frequency halves free-space wavelength. That affects antenna size, array spacing, diffraction, waveguide cutoff, electrical length and scattering.

## 4. Far-field distance

$$
R_{FF}\sim\frac{2D^2}{\lambda}.
$$

For fixed physical aperture $D$, far-field distance grows approximately linearly with frequency because $1/\lambda\propto f$.

## 5. Skin depth

For a good conductor,

$$
\delta\approx\sqrt{\frac{2}{\omega\mu\sigma}}
\propto(f\mu\sigma)^{-1/2}.
$$

A useful dimensionless parameter is conductor thickness divided by skin depth:

$$
\frac{t}{\delta}.
$$

If $t\gg\delta$, current is concentrated near the surface.

## 6. Waveguide cutoff

For rectangular TE$_{10}$ in an air-filled guide,

$$
f_c=\frac{c}{2a}.
$$

So cutoff scales as

$$
f_c\propto a^{-1}.
$$

Smaller waveguide dimensions move the operating band upward.

## 7. Antenna aperture and gain

For effective aperture $A_e$,

$$
G=\frac{4\pi A_e}{\lambda^2}.
$$

For fixed physical/effective aperture,

$$
G\propto\lambda^{-2}\propto f^2.
$$

This is why statements such as “free-space loss always gets worse with frequency” need context. In Friis, fixed **dimensionless gains** give one scaling; fixed **physical apertures** give another.

## 8. Diffraction-limited beamwidth

A characteristic aperture beamwidth scales roughly as

$$
\theta\sim\frac{\lambda}{D}.
$$

Larger electrical aperture gives a narrower beam.

## 9. Phased-array spacing

To avoid visible grating lobes over broad scan regions, spacing is commonly kept near or below

$$
d\lesssim\frac{\lambda}{2}
$$

with the exact requirement depending on scan angle and geometry.

For a fixed physical array area, the number of half-wavelength-spaced elements increases approximately as $1/\lambda^2$.

## 10. Friis transmission

$$
P_r=P_tG_tG_r\left(\frac{\lambda}{4\pi R}\right)^2.
$$

With fixed gains,

$$
P_r\propto\lambda^2R^{-2}.
$$

With fixed physical apertures, each antenna gain itself scales approximately as $1/\lambda^2$, which changes the frequency dependence.

## 11. Radar range scaling

For a monostatic radar,

$$
P_r\propto\frac{P_tG^2\lambda^2\sigma}{R^4}.
$$

Solving for detection range gives a fourth-root dependence:

$$
R_{max}\propto P_t^{1/4}G^{1/2}\sigma^{1/4}.
$$

A 16× increase in transmitter power gives only about 2× range if all else remains fixed.

## 12. Doppler

For monostatic radial motion,

$$
f_D=\frac{2v}{\lambda}\propto vf.
$$

Higher carrier frequency gives larger Doppler shift for the same velocity.

## 13. Range resolution

For bandwidth $B$,

$$
\Delta R\approx\frac{c}{2B}.
$$

Resolution improves as bandwidth increases. Carrier frequency by itself does not determine this ideal range resolution.

## 14. Thermal noise

$$
P_n=k_BT B.
$$

Therefore

$$
P_n\propto TB.
$$

Doubling bandwidth doubles noise power (+3 dB). Ten times bandwidth adds 10 dB.

## 15. Resonance quality factor

$$
Q\approx\frac{f_0}{\Delta f}.
$$

For fixed $f_0$, larger $Q$ means narrower bandwidth and longer energy-storage time. High $Q$ improves selectivity and field enhancement but can reduce response speed and tolerance to detuning.

## 16. Fresnel number

A useful diffraction parameter is

$$
N_F=\frac{a^2}{\lambda L}.
$$

It distinguishes diffraction regimes for an aperture of characteristic radius $a$ observed over distance $L$.

## 17. Loss tangent

For dielectric loss,

$$
\tan\delta=\frac{\epsilon''}{\epsilon'}.
$$

The dimensionless loss tangent helps compare material dissipation independent of geometry.

## 18. Reflection coefficient

$$
\Gamma=\frac{Z_L-Z_0}{Z_L+Z_0}.
$$

$|\Gamma|$ directly gives reflected-to-incident voltage-wave amplitude ratio. Reflected power fraction is $|\Gamma|^2$ for the usual normalized case.

## 19. Cyclotron motion versus collisions

For charged particles in a collisional gas,

$$
\boxed{\frac{\omega_c}{\nu_{coll}}}
$$

is more informative than cyclotron frequency alone.

- $\omega_c/\nu_{coll}\gg1$: many radians of gyromotion between collisions.
- $\omega_c/\nu_{coll}\ll1$: collisions strongly interrupt magnetic deflection.

This is especially important when interpreting electron/ion motion in vapor cells.

## 20. Rabi coupling versus decoherence

$$
\frac{\Omega}{\Gamma}
$$

compares coherent drive strength with linewidth/decoherence.

- $\Omega\ll\Gamma$: weak-drive regime.
- $\Omega\gtrsim\Gamma$: coherent splitting/dynamics become resolvable depending on system details.

## 21. Far-detuned drive

$$
\frac{\Omega}{\Delta}
$$

controls perturbative validity. When $|\Omega/\Delta|\ll1$, a far-detuned AC-Stark approximation is often useful. As the ratio grows, full dressed-state treatment becomes increasingly important.

## 22. Optical depth

A common resonant optical-depth scale is

$$
OD\sim n\sigma L.
$$

Larger optical depth increases absorption/interaction but can also make propagation, reabsorption and nonlinear effects more important.

## 23. Atomic magnetometry

For a magnetic resonance,

$$
\omega_L=\gamma B.
$$

A useful resolution scale is

$$
\frac{\gamma B}{\Gamma}.
$$

This compares field-induced precession/splitting to the resonance linewidth.

## 24. Rydberg scaling with principal quantum number

For hydrogenic/high-$n$ intuition away from strong perturbations and resonances:

| Quantity | Approximate scaling |
|---|---:|
| orbital radius | $n^2$ |
| adjacent-level spacing | $n^{-3}$ |
| radiative lifetime | roughly $n^3$ |
| neighboring-state electric dipole matrix element | roughly $n^2$ |
| DC polarizability | often roughly $n^7$ |

<div class="engineering"><span class="callout-title">Engineering reality</span>Real alkali Rydberg states include quantum defects, nearby resonances, blackbody transitions, level mixing, selection rules and frequency-dependent dynamic polarizability. A scaling law gives trend intuition; ARC/Shirley or a full atomic model gives the experiment-specific answer.</div>

## 25. A model-selection checklist

Before solving:

| Question | Useful ratio |
|---|---|
| Is the object electrically small? | $ka$ |
| Is an interconnect distributed? | $\beta l$ |
| Is conductor loss surface dominated? | $t/\delta$ |
| Am I in the far field? | $R\lambda/D^2$ |
| Is a resonance narrow/slow? | $Q$ |
| Is magnetic particle motion collision dominated? | $\omega_c/\nu_{coll}$ |
| Is atomic driving coherent enough to resolve? | $\Omega/\Gamma$ |
| Is far-detuned perturbation valid? | $\Omega/\Delta$ |
| Is optical propagation weak or strong? | $OD$ |

That table is often a better starting point than choosing an equation by memory.
