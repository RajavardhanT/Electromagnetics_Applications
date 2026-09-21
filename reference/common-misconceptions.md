---
layout: default
title: Common Electromagnetics Misconceptions
description: Concise corrections to common conceptual mistakes in fields, antennas, RF measurements, radar, magnetism, EIT, Floquet physics, and quantum sensing.
---

# Common Electromagnetics Misconceptions

These are useful because many technical errors come from a **correct equation applied with an incorrect mental model**.

## 1. “A higher-gain antenna creates extra RF power.”

No. Antenna gain redistributes radiated power directionally relative to a reference radiator and includes efficiency according to the gain definition. It does not create energy.

## 2. “The far field begins after a few wavelengths.”

Not generally. For an electrically large aperture, a common criterion is

$$
R_{FF}\gtrsim\frac{2D^2}{\lambda}.
$$

The antenna dimension matters.

## 3. “Electric and magnetic fields of a wave are independent signals.”

They are components of one electromagnetic solution constrained by Maxwell's equations and the medium/boundary conditions. In a uniform plane wave they have a fixed relation; in near fields that simple relation may fail.

## 4. “Negative dBm means negative power.”

No. dBm is logarithmic power relative to 1 mW. $-30$ dBm is $1\ \mu$W, a positive physical power.

## 5. “$S_{11}$ in dB and return loss are the same signed quantity.”

Conventions matter. Instruments often display $20\log_{10}|S_{11}|$, which is negative for a passive matched load, while return loss is commonly defined as

$$
RL=-20\log_{10}|\Gamma|
$$

and is therefore positive. Always check the display definition.

## 6. “A matched antenna has perfect efficiency.”

Matching and radiation efficiency are different. An antenna can be well matched and still dissipate substantial power as conductor/dielectric loss.

## 7. “More measurement bandwidth is always better.”

More bandwidth improves time resolution and captures wider signals, but integrated thermal noise increases as $kTB$. Choose bandwidth to match the information you need.

## 8. “A spectrum analyzer replaces a VNA.”

A spectrum analyzer measures spectral power. A VNA measures coherent complex network ratios such as S-parameters. Their purposes overlap only partially.

## 9. “A magnetic field does work on a point charge because it bends the trajectory.”

The magnetic Lorentz force $q\mathbf v\times\mathbf B$ is perpendicular to instantaneous velocity, so by itself it does no work on the point charge. It can nevertheless redirect motion and profoundly change where a particle goes and what current a detector sees.

## 10. “No DC bias across detector electrodes means no induced current.”

False. Shockley–Ramo current depends on charge motion projected on the weighting field:

$$
i=q\mathbf v\cdot\mathbf E_w.
$$

The weighting field is an auxiliary geometry-dependent field, not the applied physical bias field.

## 11. “A Halbach array is magnetic shielding.”

No. A Halbach arrangement can concentrate flux on one side and reduce external stray field, but it does not automatically reject environmental magnetic fields. Precision experiments may still require magnetic shielding.

## 12. “EIT and Autler–Townes splitting are the same phenomenon.”

They can produce superficially related spectral structures but arise from different limiting descriptions. EIT emphasizes destructive quantum interference and a dark state; AT splitting emphasizes strong coherent dressing and resolvable dressed eigenstates. Their distinction depends on coupling strength, linewidths and analysis.

## 13. “Two peaks can always be fitted as two independent Gaussians.”

Not if the peaks arise from coherently coupled states. Coupled resonances can have interference, shared coherence, dispersive components and linewidth changes that independent Gaussian fits do not capture physically.

## 14. “A Floquet replica is an additional bare atomic state.”

No. Floquet states are a representation of a periodically driven system in an enlarged basis. The sideband/replica index tracks exchange of drive quanta in the periodic Hamiltonian.

## 15. “Absorbing an RF photon permanently changes a $P$ state into a $D$ state.”

The electric-dipole interaction couples states according to selection rules. In a dressed/Floquet eigenstate the resulting state can be a coherent superposition of multiple bare atomic states and photon sectors; it is not best understood as a bare state simply “becoming” another orbital state.

## 16. “Higher Rydberg principal quantum number is always better.”

Higher $n$ often increases dipole matrix elements and polarizability, but also changes level spacing, blackbody coupling, state density, field sensitivity, available transition frequencies, ionization susceptibility and spectral congestion. The optimum $n$ is application specific.

## 17. “A quantum sensor automatically beats every classical sensor.”

No. Performance depends on the measurand, bandwidth, dynamic range, environment, calibration, size, readout noise, technical noise and integration time. “Quantum” describes the sensing mechanism, not a universal performance guarantee.

## 18. “A photodetector must follow the optical carrier frequency.”

Usually no. Direct photodetection responds to optical intensity; heterodyne detection responds to a difference frequency. A MHz-bandwidth photodiode can therefore read optical phenomena whose carrier is hundreds of THz when the envelope/beat lies in-band.

## 19. “Free-space path loss proves higher frequency always gives a worse link.”

Only under the assumptions used. With fixed dimensionless antenna gains, Friis contains a $\lambda^2$ factor. With fixed physical apertures, gain increases approximately as $1/\lambda^2$, changing the comparison.

## 20. “Simulation accuracy is set by mesh density alone.”

Mesh is only one part. Material models, boundary conditions, ports, convergence criteria, solver formulation, geometry fidelity, frequency sampling and validation against an analytic limit or measurement are equally important.

## 21. “A visually good fit validates the physical model.”

A fit can be numerically excellent and physically wrong. Validate parameter values, limiting behavior, symmetry, conservation laws, independent measurements and predictive ability outside the fitted dataset.

## 22. “Calibration removes all uncertainty.”

Calibration establishes a traceable relationship and corrects defined systematic effects. Residual uncertainty still includes drift, repeatability, connector/fixture variation, mismatch, environmental conditions and model uncertainty.

<div class="engineering"><span class="callout-title">A useful debugging question</span>When theory and experiment disagree, ask separately: <strong>Is the mechanism wrong? Is the parameter wrong? Is the measurement transfer function wrong? Is the comparison being made to the same observable?</strong></div>
