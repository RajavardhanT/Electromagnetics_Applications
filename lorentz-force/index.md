---
layout: default
title: Lorentz Force — Electrodynamics, History & Modern Applications
---

# Lorentz Force — Electrodynamics, History & Modern Applications

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:ForceLorentz.svg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/ForceLorentz.svg?width=1000" alt="Lorentz-force geometry showing the relation between charge motion, magnetic field and force." loading="lazy"></a>
  <figcaption>Lorentz-force geometry showing the relation between charge motion, magnetic field and force. <a href="https://commons.wikimedia.org/wiki/File:ForceLorentz.svg">Image source</a>.</figcaption>
</figure>


The **Lorentz force law** is the bridge between electromagnetic fields and mechanical motion. Maxwell's equations describe how electric and magnetic fields are generated and evolve; the Lorentz force describes how those fields act on charged matter.

## 1. Fundamental equation

For a particle of charge $q$, velocity $\mathbf{v}$, in electric and magnetic fields $\mathbf{E}$ and $\mathbf{B}$,

$$
\boxed{\mathbf{F}=q\left(\mathbf{E}+\mathbf{v}\times\mathbf{B}\right)}.
$$

The two contributions are

$$
\mathbf{F}_E=q\mathbf{E}, \qquad
\mathbf{F}_B=q\mathbf{v}\times\mathbf{B}.
$$

The electric force can change both the direction and kinetic energy of a charged particle. The magnetic force is perpendicular to the instantaneous velocity and therefore does no mechanical work on an ideal point charge:

$$
P=\mathbf{F}\cdot\mathbf{v}=q\mathbf{E}\cdot\mathbf{v},
$$

because

$$
\mathbf{v}\cdot(\mathbf{v}\times\mathbf{B})=0.
$$

Thus **electric fields accelerate particles energetically; magnetic fields are especially useful for steering them**.

For relativistic motion the equation of motion is

$$
\boxed{\frac{d\mathbf{p}}{dt}=q(\mathbf{E}+\mathbf{v}\times\mathbf{B})},
$$

where

$$
\mathbf{p}=\gamma m\mathbf{v},\qquad
\gamma=\frac{1}{\sqrt{1-v^2/c^2}}.
$$

## 2. Direction of the magnetic force

The cross product means that $\mathbf{F}_B$ is perpendicular to both $\mathbf{v}$ and $\mathbf{B}$.

For a positive charge the direction follows the right-hand rule. For an electron, $q=-e$, the force direction is reversed.

Its magnitude is

$$
F_B=|q|vB\sin\theta,
$$

where $\theta$ is the angle between velocity and magnetic field.

Important limits:

- $\mathbf{v}\parallel\mathbf{B}$: $F_B=0$.
- $\mathbf{v}\perp\mathbf{B}$: magnetic force is maximum.
- $v=0$: there is no magnetic Lorentz force on the point charge.

## 3. Charged-particle motion in a magnetic field

For $\mathbf{v}\perp\mathbf{B}$, the magnetic force supplies the centripetal force:

$$
|q|vB=\frac{mv^2}{r}
$$

in the nonrelativistic limit, giving

$$
\boxed{r=\frac{mv}{|q|B}=\frac{p}{|q|B}}.
$$

The cyclotron angular frequency is

$$
\boxed{\omega_c=\frac{|q|B}{m}}
$$

and

$$
f_c=\frac{|q|B}{2\pi m}.
$$

Relativistically,

$$
\omega_c=\frac{|q|B}{\gamma m}.
$$

If the particle also has velocity parallel to $\mathbf B$, its trajectory becomes a helix. This simple result underlies cyclotrons, synchrotrons, magnetic spectrometers, plasma confinement, mass analysis and charged-particle detectors.

## 4. Crossed electric and magnetic fields

If $\mathbf E\perp\mathbf B$, particles can experience competing electric and magnetic forces. For the special condition

$$
qE=qvB,
$$

the net transverse force vanishes and

$$
\boxed{v=\frac{E}{B}}.
$$

This is the principle of the **Wien velocity selector**. Combined with magnetic bending, it provides a route to measuring charge-to-mass ratio and separating ions by mass.

In plasmas, crossed fields also produce the important $\mathbf E\times\mathbf B$ drift,

$$
\boxed{\mathbf v_{E\times B}=\frac{\mathbf E\times\mathbf B}{B^2}},
$$

for uniform fields in the usual guiding-center approximation.

## 5. From a single charge to current-carrying matter

For many charges, the microscopic force law becomes a force density. A common macroscopic expression is

$$
\boxed{\mathbf f=\rho\mathbf E+\mathbf J\times\mathbf B},
$$

where $\rho$ is charge density and $\mathbf J$ is current density.

For a straight conductor carrying current $I$ in a uniform magnetic field,

$$
\boxed{\mathbf F=I\mathbf L\times\mathbf B}.
$$

This form connects the microscopic Lorentz force directly to electric motors, actuators, loudspeakers, electromagnetic launchers and electrodynamic spacecraft tethers.

## 6. Historical development

The force law emerged gradually rather than from a single experiment.

### Coulomb — electrostatic force

In the eighteenth century, quantitative experiments established the force between electric charges. Coulomb's torsion-balance work provided the inverse-square electrostatic law that became the electrostatic component of classical electrodynamics.

### Ørsted and Ampère — electricity and magnetism become connected

Ørsted's 1820 observation that an electric current deflects a magnetic compass demonstrated that electric current produces magnetic effects. Ampère rapidly developed a quantitative theory of forces associated with currents.

### Faraday — fields and lines of force

Michael Faraday shifted the conceptual picture away from purely action-at-a-distance forces toward physical electric and magnetic **fields** and lines of force. This field viewpoint was essential for later electrodynamics.

### Maxwell — electromagnetic field theory

James Clerk Maxwell synthesized electricity, magnetism and induction into a field theory. His 1860s work predicted electromagnetic waves and identified light as an electromagnetic phenomenon. Maxwell's equations determine the fields, but a force law is needed to specify how those fields act on charged matter.

### J. J. Thomson and Oliver Heaviside

J. J. Thomson attempted in 1881 to derive the magnetic force on a moving charged body from Maxwellian electrodynamics. The form contained the essential $\mathbf v\times\mathbf B$ structure but an incorrect numerical factor. Oliver Heaviside subsequently reformulated Maxwell's theory using modern vector methods and obtained the correct magnetic-force form.

### Hendrik Antoon Lorentz

Hendrik Lorentz developed an electron-based microscopic theory of electrodynamics and, by the 1890s, arrived at the combined electric and magnetic force on a moving charge. The resulting law became known as the **Lorentz force**.

The historical development is therefore roughly

**Coulomb → Ørsted/Ampère → Faraday → Maxwell → Thomson/Heaviside → Lorentz.**

## 7. Lorentz force and Maxwell's equations

Classical electrodynamics can be viewed as two coupled parts:

### Fields

$$
\nabla\cdot\mathbf D=\rho,
$$

$$
\nabla\cdot\mathbf B=0,
$$

$$
\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t},
$$

$$
\nabla\times\mathbf H=\mathbf J+\frac{\partial\mathbf D}{\partial t}.
$$

### Motion of matter

$$
\boxed{\frac{d\mathbf p}{dt}=q(\mathbf E+\mathbf v\times\mathbf B)}.
$$

This gives a useful mental model:

**charges/currents → Maxwell equations → electromagnetic fields → Lorentz force → motion of charges → new charges/currents.**

In self-consistent plasma and beam simulations this loop is solved numerically.

## 8. Relativistic interpretation

Electric and magnetic fields are not completely independent entities: special relativity shows that they are observer-dependent components of a single electromagnetic field.

In covariant notation the Lorentz force can be written

$$
\boxed{\frac{dp^\mu}{d\tau}=qF^{\mu\nu}u_\nu},
$$

where $F^{\mu\nu}$ is the electromagnetic field tensor and $u^\nu$ is the four-velocity.

This compact expression is one reason the Lorentz force occupies such a central place in modern electrodynamics.

## 9. Particle accelerators

Particle accelerators are among the clearest large-scale applications.

Electric fields provide energy:

$$
\frac{dW}{dt}=q\mathbf E\cdot\mathbf v,
$$

while dipole magnets bend particle beams according to

$$
p=|q|Br
$$

for perpendicular motion. Quadrupole magnets provide focusing, while RF cavities create oscillating electric fields that accelerate particles.

The same physics governs cyclotrons, synchrotrons, storage rings, electron microscopes and many charged-particle beam systems.

## 10. Mass spectrometry

Mass spectrometers exploit controlled Lorentz forces to separate ions according to mass-to-charge ratio $m/q$.

For an ion entering a magnetic field perpendicular to its velocity,

$$
r=\frac{mv}{|q|B}.
$$

If $v$ is selected or otherwise known, measuring the trajectory radius identifies $m/q$. Modern mass spectrometry uses more sophisticated ion optics, but electromagnetic manipulation of charged particles remains fundamental to many analyzer architectures.

## 11. Hall effect and magnetic-field sensing

Charge carriers moving through a conductor or semiconductor in a magnetic field experience

$$
q\mathbf v_d\times\mathbf B.
$$

Charges accumulate transversely until the electric force balances the magnetic force:

$$
q\mathbf E_H+q\mathbf v_d\times\mathbf B=0.
$$

This produces the Hall voltage. Hall sensors are now ubiquitous in current sensing, motor commutation, position sensing and magnetic-field measurement.

## 12. Electric motors, generators and loudspeakers

For a current-carrying conductor,

$$
\mathbf F=I\mathbf L\times\mathbf B.
$$

A motor arranges conductor geometry so that these forces generate torque. A loudspeaker uses the same principle to move a voice coil and diaphragm. Generators represent the complementary electromechanical conversion picture, with motion and electromagnetic induction converting mechanical energy to electrical energy.

Thus the Lorentz force connects fundamental particle electrodynamics directly to everyday electromechanical technology.

## 13. Magnetrons and microwave technology

A magnetron uses crossed electric and magnetic fields to control electron trajectories. The electrons interact with resonant microwave cavities, transferring kinetic energy into coherent microwave oscillations.

The same basic charged-particle dynamics appears in other vacuum-electronic devices, including traveling-wave tubes, klystrons and gyro-devices, although their detailed interaction mechanisms differ.

## 14. Plasma physics and fusion

A plasma contains mobile electrons and ions, so the Lorentz force is fundamental to its dynamics:

$$
m_s\frac{d\mathbf v_s}{dt}=q_s(\mathbf E+\mathbf v_s\times\mathbf B)+\cdots.
$$

It determines gyromotion, cyclotron frequencies, guiding-center drifts, magnetic confinement and many wave-particle interactions.

In magnetohydrodynamics, the corresponding electromagnetic body force is commonly represented by

$$
\boxed{\mathbf J\times\mathbf B}.
$$

Tokamaks and stellarators exploit magnetic fields to confine charged fusion plasmas. Space plasmas in Earth's magnetosphere, the solar wind and astrophysical systems are likewise governed by Lorentz-force dynamics.

## 15. Spacecraft: electrodynamic tethers

One of the most striking modern engineering applications is the **electrodynamic tether**.

A conducting tether moving through a planetary magnetic field experiences a motional electric field approximately

$$
\mathbf E_m=\mathbf v\times\mathbf B.
$$

If current flows through a tether of effective vector length $\mathbf L$, the geomagnetic field exerts a force

$$
\boxed{\mathbf F=I\mathbf L\times\mathbf B}.
$$

NASA describes electrodynamic tethers as a potential propellantless propulsion technology. Depending on current direction, the Lorentz force can contribute to orbital deboost, orbit raising or inclination changes. The spacecraft's motion through the geomagnetic field can also generate electrical power in generator-mode operation.

This is an unusually direct example of a fundamental electrodynamics equation producing a spacecraft-scale mechanical force.

## 16. Magnetohydrodynamic and electromagnetic propulsion

Conducting fluids and plasmas can be accelerated through electromagnetic body forces. The relevant force density contains

$$
\mathbf J\times\mathbf B.
$$

This principle appears in magnetoplasmadynamic thrusters and other plasma-propulsion concepts. In such devices electrical energy establishes plasma current and magnetic fields, and their interaction produces thrust.

## 17. Charged-particle detectors and scientific instrumentation

Tracking detectors in particle physics frequently place charged particles in known magnetic fields. The curvature of a track gives its momentum:

$$
p=|q|Br
$$

for ideal perpendicular motion, with the appropriate relativistic momentum.

The sign of curvature reveals charge sign. This is fundamental to magnetic spectrometers used in nuclear and high-energy physics.

Electron microscopes likewise use electromagnetic fields as **charged-particle optics**, steering and focusing electron beams rather than visible light.

## 18. Earth's magnetosphere and space weather

Charged particles from the solar wind and magnetosphere undergo Lorentz-force motion in Earth's magnetic field. Their gyromotion, mirroring and drifts contribute to the structure of the Van Allen belts, auroral particle transport and magnetospheric current systems.

Thus the same equation used to design a laboratory mass spectrometer also describes particle motion on planetary scales.

## 19. Lorentz force in numerical simulation

Modern multiphysics simulation often integrates the particle equation of motion,

$$
\frac{d\mathbf p}{dt}=q(\mathbf E+\mathbf v\times\mathbf B),
$$

while fields are obtained from Maxwell solvers.

Examples include:

- particle-in-cell (PIC) plasma simulations,
- accelerator beam dynamics,
- electron and ion optics,
- plasma thrusters,
- magnetosphere modeling,
- charged-particle detectors,
- vacuum electronics,
- electrodynamic tether dynamics.

In a PIC calculation, particles deposit charge/current onto a computational grid; Maxwell's equations update $\mathbf E$ and $\mathbf B$; the Lorentz force advances particle momentum and position; the cycle repeats.

## 20. Connection to quantum physics and quantum sensing

The Lorentz force is a **classical equation of motion**, whereas atomic quantum sensors are normally described through Hamiltonian interactions such as

$$
H_E=-\mathbf d\cdot\mathbf E,
$$

and

$$
H_B=-\boldsymbol\mu\cdot\mathbf B.
$$

This distinction is important.

A Hall probe measures the collective classical deflection of charge carriers through the Lorentz force. An atomic magnetometer instead measures the quantum evolution of magnetic moments. A Rydberg electrometer measures electric-dipole coupling between quantum states.

The technologies therefore share the same electromagnetic fields but use different microscopic observables:

**Lorentz-force sensor:** field → force → charge motion → electrical/mechanical readout

**Atomic quantum sensor:** field → quantum Hamiltonian → coherence/level shift → optical or RF readout

Understanding both viewpoints provides a useful bridge from classical electromagnetics to modern quantum sensing.

## 21. Applications at a glance

| Application | Lorentz-force role |
|---|---|
| Cyclotron/synchrotron | Magnetic bending of charged particles |
| RF accelerator | Electric-field acceleration |
| Mass spectrometer | $m/q$ separation by charged-particle trajectories |
| Hall sensor | Transverse carrier deflection |
| Electric motor | Force/torque on current-carrying conductors |
| Loudspeaker | Voice-coil force |
| Magnetron | Electron control in crossed $\mathbf E$ and $\mathbf B$ fields |
| Plasma confinement | Charged-particle gyromotion and drifts |
| Fusion device | Magnetic control of plasma |
| MPD thruster | $\mathbf J\times\mathbf B$ plasma acceleration |
| Electrodynamic tether | Geomagnetic Lorentz thrust/drag |
| Particle detector | Momentum/charge determination from track curvature |
| Electron microscope | Electron-beam steering/focusing |
| Magnetosphere | Motion of charged space plasma |
| PIC simulation | Particle pusher coupled to Maxwell fields |

## 22. Key physical insight

The Lorentz force completes the classical electromagnetic feedback loop:

$$
\boxed{\text{charges and currents}\rightarrow\mathbf E,\mathbf B\rightarrow\text{force}\rightarrow\text{motion of charges}}.
$$

Maxwell's equations tell us **what the electromagnetic field does**.

The Lorentz force tells us **what the electromagnetic field does to matter**.

That combination forms the dynamical core of classical electrodynamics.

---

## References and further reading

1. H. A. Lorentz, *Versuch einer Theorie der electrischen und optischen Erscheinungen in bewegten Körpern* (1895). Historical source for Lorentz's electron theory and electrodynamics.
2. J. C. Maxwell, *A Dynamical Theory of the Electromagnetic Field*, Philosophical Transactions of the Royal Society of London **155**, 459–512 (1865). [Royal Society / DOI](https://doi.org/10.1098/rstl.1865.0008)
3. J. J. Thomson, *On the Electric and Magnetic Effects produced by the Motion of Electrified Bodies*, Philosophical Magazine (1881). Historical precursor to the magnetic force on moving charge.
4. O. Heaviside, *Electromagnetic induction and its propagation*, *The Electrician* (1880s). Heaviside's vector reformulation of Maxwellian electrodynamics helped establish the modern field representation.
5. J. D. Jackson, *Classical Electrodynamics*, 3rd ed., Wiley (1998). Standard advanced reference for classical electrodynamics, relativistic formulation and charged-particle motion.
6. D. J. Griffiths, *Introduction to Electrodynamics*, Cambridge University Press. Standard undergraduate treatment of the Lorentz force and Maxwell equations.
7. H. Wiedemann, *Particle Accelerator Physics*, Springer. [Springer: Introduction to Accelerator Physics](https://link.springer.com/chapter/10.1007/978-3-319-18317-6_1)
8. IEEE Spectrum, *The Long Road to Maxwell's Equations*. [Historical overview](https://spectrum.ieee.org/the-long-road-to-maxwells-equations)
9. NASA Small Spacecraft Systems Virtual Institute, *State of the Art of Small Spacecraft Technology — In-Space Propulsion*. [NASA](https://www.nasa.gov/smallsat-institute/sst-soa/in-space_propulsion/)
10. L. Johnson, *T-Rex: A Japanese Space Tether Experiment*, NASA Marshall Space Flight Center (2009). [NASA Technical Reports Server](https://ntrs.nasa.gov/citations/20090034470)
11. R. L. Forward et al./NASA technical literature on electrodynamic tether propulsion. [NASA NTRS: Electrodynamic Tether Propulsion for Spacecraft and Upper Stages](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19980236665.pdf)
12. NASA, *Tether Electrodynamics Propulsion CubeSat Experiment (TEPCE)*. [NASA](https://www.nasa.gov/smallsat-institute/community-of-practice/tether-electrodynamics-propulsion-cubesat-experiment-tepce/)
13. NASA NIAC, *Magnetour: Surfing Planetary Systems on Electromagnetic and Multi-Body Gravity Fields*. [NASA](https://www.nasa.gov/general/magnetour-surfing-planetary-systems-on-electromagnetic-and-multi-body-gravity-fields/)

[← Home](../)
