---
layout: default
title: Gravity Probe B — Ultra-Precise Gyroscopes and Simulation
---

# Gravity Probe B (GP-B)

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Einstein_gyro_gravity_probe_b.jpg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Einstein_gyro_gravity_probe_b.jpg?width=1200" alt="One of Gravity Probe B's extraordinarily spherical fused-quartz gyroscopes, shown refracting an image of Einstein. NASA/Stanford." loading="lazy"></a>
  <figcaption>One of Gravity Probe B's extraordinarily spherical fused-quartz gyroscopes, shown refracting an image of Einstein. NASA/Stanford. <a href="https://commons.wikimedia.org/wiki/File:Einstein_gyro_gravity_probe_b.jpg">Image source</a>.</figcaption>
</figure>


**Gravity Probe B (GP-B)** was a NASA/Stanford space experiment designed to test two predictions of Einstein's general theory of relativity using extraordinarily precise gyroscopes in Earth orbit: **geodetic precession** (curvature of spacetime produced by Earth's mass) and **frame dragging** or the Lense–Thirring effect (the effect associated with Earth's rotation).

The experiment is particularly interesting from an electromagnetics and simulation perspective because the measurement depended on **four ultra-precise, nearly spherical quartz gyroscope rotors**, electrostatic suspension, superconductivity, SQUID magnetometry, extreme magnetic shielding, cryogenics, drag-free spacecraft control, and detailed mathematical/computational modeling of tiny non-relativistic torques and disturbances.

---

## 1. Measurement concept

A freely spinning ideal gyroscope preserves the direction of its angular momentum. General relativity predicts that the direction of a gyroscope transported around Earth changes slightly because of spacetime curvature and frame dragging.

GP-B therefore compared the spin directions of its gyroscopes with an astronomical reference direction supplied by a quartz telescope pointed at the guide star **IM Pegasi**.

The conceptual measurement was

$$
\text{gyro spin direction}(t)-\text{guide-star reference}(t)
\rightarrow
\text{relativistic precession}.
$$

Because the desired angular changes were extremely small, ordinary torques caused by mechanical contact, electrostatic forces, magnetic fields, mass asymmetry, residual gas and spacecraft acceleration had to be reduced, modeled, measured or removed from the data.

NASA described GP-B as targeting sub-milliarcsecond-per-year measurement precision and identified electrostatically suspended superconducting quartz gyroscopes, superconducting magnetic shielding, a quartz star-tracking telescope, helium microthrusters and a superfluid-helium dewar as enabling technologies.

---

# 2. The four ultra-precise floating spheres

The heart of GP-B was a set of **four spherical gyroscopes** mounted in a fused-quartz instrument structure. The flight gyroscope rotors were approximately

$$
D\approx38\ \mathrm{mm}\;(1.5\ \mathrm{in}).
$$

The GP-B project describes the fused-quartz rotors as exceptionally spherical and homogeneous. Fused quartz was attractive because of its dimensional stability at cryogenic temperature, very low magnetic character, optical/manufacturing properties and achievable material homogeneity.

A useful mental model is

**precision sphere → almost torque-free suspension → superconducting magnetic readout → inertial direction reference.**

### Why spherical?

For a perfect homogeneous sphere, the principal moments of inertia are equal:

$$
I_x=I_y=I_z=\frac{2}{5}MR^2.
$$

Consequently, its dynamics do not strongly depend on which material axis happens to become the spin axis. Departures from perfect sphericity or density homogeneity create differences in the moments of inertia and can couple external forces into unwanted torques and precession.

This is why GP-B characterization and modeling paid extraordinary attention to

- rotor sphericity,
- density homogeneity,
- mass unbalance,
- differences between principal moments of inertia,
- higher-order rotor shape harmonics,
- electrostatic suspension forces,
- residual magnetic moments,
- spin-axis dynamics.

NASA/Stanford technical documentation includes dedicated verification reports for rotor homogeneity, composition, mass unbalance and differences in moments of inertia.

---

## 3. The spheres were not mechanically supported

Calling the GP-B rotors **floating spheres** is physically useful: during science operation they had no conventional bearings touching them.

Each rotor was enclosed in a precisely manufactured housing and maintained near its center using an **electrostatic suspension system**. Electrodes around the housing sensed and controlled rotor position. The GP-B project states that the rotor operated only about **32 μm** from the housing wall after spin-up and evacuation.

The basic electrostatic idea is that the force is obtained from the dependence of capacitance on rotor position. For a voltage-driven electrode,

$$
U=\frac{1}{2}C(x)V^2,
$$

and therefore approximately

$$
F_x=\frac{1}{2}V^2\frac{dC}{dx}.
$$

Opposing electrodes allow differential control of the sphere's position.

This is an important electromagnetics application: **electric fields replace a mechanical bearing**.

During operation, drag-free spacecraft control greatly reduced the required suspension force. One gyro could serve as the drag-free proof mass; microthrusters commanded the spacecraft to follow its free-fall trajectory. The other gyroscopes required only very small electrostatic support forces associated with relative accelerations and gravity gradients.

Earlier GP-B analyses describe an AC electrostatic suspension with capacitive position sensing and feedback and predicted extremely tight centering of the gyro inside its cavity.

---

## 4. Spin-up and free rotation

Before science measurements, helium gas was directed around the rotor to spin it up. The flight-system description reports spin-up to roughly **4,000 rpm**. Afterward, the spin-up gas was evacuated and the rotor was allowed to rotate freely in the vacuum environment.

Because there were no conventional bearings, mechanical friction was extraordinarily small. The GP-B project reports an average spin-down time constant of roughly **15,000 years** for the four flight gyroscopes.

This gives an intuitive picture of the experiment: the rotor was not simply a very good laboratory gyroscope—it approached a freely rotating inertial body in space.

---

# 5. Superconducting niobium coating and the London moment

The quartz spheres were coated with a thin layer of **niobium**. At GP-B's cryogenic operating temperature the niobium became superconducting.

A rotating superconductor develops a small magnetic moment known as the **London moment**. Its magnetic axis is aligned with the rotor's spin axis. Thus GP-B converted the otherwise difficult-to-observe mechanical quantity

$$
\mathbf L=I\boldsymbol\omega
$$

into an extremely small but measurable magnetic signal.

Conceptually,

$$
\text{mechanical rotation}
\rightarrow
\text{superconducting London moment}
\rightarrow
\text{magnetic flux}
\rightarrow
\text{SQUID signal}.
$$

This is one of the most elegant electromagnetic aspects of GP-B.

---

## 6. SQUID measurement of spin direction

**Superconducting Quantum Interference Devices (SQUIDs)** monitored the magnetic signal associated with each spinning superconducting rotor.

The SQUID readout measured changes in magnetic flux linked to the gyroscope's London moment. Since the London-moment direction follows the spin axis, the magnetic measurement provided a precision measurement of gyroscope orientation relative to the quartz instrument structure.

The quartz telescope then supplied the external astronomical reference.

Thus the experiment linked

**general relativity → mechanical gyroscope → superconductivity → magnetic flux → SQUID → precision angle measurement.**

---

# 7. Why extreme magnetic shielding was necessary

The London moment is extremely weak. Environmental magnetic fields or trapped magnetic flux could therefore contaminate the orientation measurement or produce unwanted torques.

GP-B used superconducting magnetic shielding and carefully selected low-magnetic materials. Magnetic modeling and calibration were consequently part of the complete measurement problem.

A magnetic dipole in an external field experiences

$$
\boldsymbol\tau_m=\boldsymbol\mu\times\mathbf B.
$$

Even a minute residual magnetic moment $\boldsymbol\mu$ can therefore create a systematic torque when the target relativistic precession is extraordinarily small.

---

# 8. Why simulation was essential

GP-B could not interpret the gyroscope drift by assuming the spheres were mathematically perfect. The experiment required simulations and analytical models that connected the real rotor, suspension, spacecraft and readout system to the ideal relativistic observable.

The simulation problem can be viewed as

$$
\mathbf I\frac{d\boldsymbol\omega}{dt}
+
\boldsymbol\omega\times(\mathbf I\boldsymbol\omega)
=
\sum\boldsymbol\tau,
$$

where the torque sum can contain electrostatic, magnetic, residual-gas, gravity-gradient and other disturbance terms in addition to the relativistic evolution being measured.

Several particularly important simulation/modeling areas were associated with the four spheres.

---

## 9. Rotor geometry and mass-unbalance simulation

If the geometric center and center of mass of a rotor do not coincide, electrostatic suspension forces can generate torque. A simple representation is

$$
\boldsymbol\tau=\mathbf r_{cm}\times\mathbf F_{sus}.
$$

Therefore microscopic mass unbalance can become relevant even though the suspension force itself is tiny.

GP-B prototype testing measured spin-vector histories, mass unbalance, rotor-shape harmonics and spin-vector position. NASA's archive describes a mathematical model of **electrostatic suspension torques** developed from these measurements.

The modeling chain was approximately

**measured rotor geometry / mass distribution → electrostatic force → torque → simulated spin-axis evolution → allowable gyro drift.**

This is an excellent example of simulation turning manufacturing imperfections into a quantitative error budget.

---

## 10. Electrostatic suspension simulation

The rotor and surrounding electrodes form a three-dimensional capacitive system. Rotor displacement changes the electrode capacitances, which are used both to detect position and generate restoring forces.

A simplified control model is

$$
x(t)
\rightarrow
C_i(x)
\rightarrow
\text{capacitive position estimate}
\rightarrow
V_i(t)
\rightarrow
F_{ES}(t)
\rightarrow
x(t).
$$

However, the same forces can produce torque if there is rotor mass offset, electrode asymmetry or geometric imperfection. Consequently the suspension cannot be treated only as a translational control system; its coupling into rotational dynamics must also be modeled.

NASA/Stanford documentation contains verification analyses specifically for the Gyroscope Suspension System and detailed studies of rotor mass unbalance and moment-of-inertia differences.

---

## 11. Drag-free gyroscope and spacecraft simulation

A major GP-B design principle was to make the spacecraft follow a freely falling gyroscope rather than force the gyroscope to follow the spacecraft.

Conceptually,

$$
\Delta\mathbf r
=
\mathbf r_{spacecraft}-\mathbf r_{gyro}
$$

was measured, and the spacecraft's helium microthrusters were controlled to reduce this displacement.

The resulting hierarchy was

**free gyro → displacement sensing → drag-free controller → microthrusters → spacecraft follows gyro.**

NASA's GP-B technical archive contains dedicated **Drag-Free Gyroscope Simulator (DFGS)** documentation used in the Integrated Test Facility. NASA also reports updates to the TREETOPS GP-B spacecraft simulation to assess control behavior including helium slosh effects on spacecraft pointing.

This is important: simulation was not limited to the rotor. It extended from the sphere all the way to the spacecraft dynamics and attitude-control system.

---

## 12. Microthruster flow simulation

The drag-free control system used helium boil-off gas as propellant for extremely small thrusters. NASA researchers modeled the flow through GP-B microthrusters using **Direct Simulation Monte Carlo (DSMC)**.

That connects the gyroscope experiment to another simulation domain:

**gyro displacement → control demand → helium microthruster → rarefied-gas flow simulation → spacecraft force/torque → gyro environment.**

Thus a measurement of relativistic spacetime curvature ultimately depended partly on accurate modeling of microscopic gas flow through spacecraft thrusters.

---

## 13. End-to-end simulation and data reduction

GP-B maintained dedicated simulation and verification infrastructure rather than treating each subsystem independently. The Stanford technical archive lists reports on **data-reduction and simulation algorithms**, an Integrated Test Facility Drag-Free Gyroscope Simulator, Gyroscope Suspension System verification, timing-system tests and analytical treatment of unmodeled errors.

The overall simulation chain can therefore be summarized as

$$
\boxed{
\text{rotor properties}
\rightarrow
\text{suspension dynamics}
\rightarrow
\text{gyro spin dynamics}
\rightarrow
\text{SQUID readout}
\rightarrow
\text{spacecraft control}
\rightarrow
\text{telescope reference}
\rightarrow
\text{data model}
\rightarrow
\text{relativistic drift}
}
$$

For precision experiments, this **end-to-end model** is often as important as the sensitivity of the sensor itself.

---

# 14. Important systematic effects associated with real gyroscopes

The four spheres were extraordinarily precise, but not mathematically perfect. Important quantities requiring characterization, modeling or calibration included:

| Effect | Why it matters |
|---|---|
| Rotor asphericity | Produces unequal moments of inertia and orientation-dependent dynamics |
| Density inhomogeneity | Shifts center of mass and inertia tensor |
| Mass unbalance | Suspension force can generate torque |
| Electrostatic suspension | Necessary for centering but can introduce disturbance torque |
| Residual gas | Can produce damping and torque |
| Magnetic fields | Couple to residual/trapped magnetic moments |
| Trapped magnetic flux | Complicates SQUID readout and gyro dynamics |
| Gravity gradients | Produce small differential accelerations among the four gyro locations |
| Spacecraft drag | Requires drag-free compensation |
| Thruster noise | Couples spacecraft control back into the gyro environment |
| Readout/calibration errors | Can appear as apparent spin-axis motion |

The central experimental challenge was therefore not merely to build a spherical rotor. It was to **measure and model the residual departures from ideal free rotation accurately enough that they could not masquerade as relativity**.

---

# 15. Why four gyroscopes?

Using four independent gyroscopes provided redundancy and, crucially, allowed common and differential behavior to be distinguished. Comparisons among suspension feedback signals could reveal relative accelerations and gravity-gradient effects at the different gyro locations. Multiple rotors also allowed consistency checks on the measured relativistic drift and on gyro-specific systematic behavior.

The gyroscopes were integrated with the telescope into a highly stable fused-quartz structure so that the local gyro readout frame and astronomical reference frame were mechanically tied together.

---

# 16. Electromagnetics lessons from GP-B

GP-B is fundamentally a gravitational-physics experiment, yet much of the technology that made it possible is electromagnetic:

**Electrostatics** — levitated and centered the rotors without mechanical bearings.

**Capacitive sensing** — measured rotor displacement for suspension and drag-free control.

**Superconductivity** — generated the London moment and enabled exceptional magnetic shielding.

**SQUID magnetometry** — converted minute magnetic flux changes into a precision measurement of spin-axis direction.

**Magnetic-field control** — suppressed torques and readout errors that could overwhelm the relativistic signal.

**Control-system and multiphysics simulation** — connected electrostatic forces, rotor imperfections, spacecraft dynamics, helium thrusters and sensor readout to the final measurement.

The experiment is therefore an outstanding example of the chain

**fundamental physics → precision mechanics → electromagnetics → superconducting sensing → simulation → spacecraft control → scientific measurement.**

---

## References

1. [NASA Technical Reports Server — Gravity Probe B: Testing Einstein with Gyroscopes](https://ntrs.nasa.gov/citations/20040001714) — mission overview and enabling technologies including electrostatically suspended superconducting quartz gyroscopes, magnetic shielding, telescope, helium microthrusters and cryogenic system.

2. [Stanford Gravity Probe B — Extraordinary Technologies](https://einstein.stanford.edu/TECH/technology1.html) — flight-gyroscope construction, electrostatic suspension, rotor/housing spacing, spin-up and spin-down performance.

3. [Stanford Gravity Probe B — Integrated Spacecraft & Payload](https://einstein.stanford.edu/TECH/technology2) — Science Instrument Assembly, quartz block, four gyro housings and SQUID readout.

4. [Stanford Gravity Probe B — Life of a Flight Gyroscope Assembly](https://einstein.stanford.edu/content/topics/gyrolife.html) — 38-mm fused-quartz rotor, electrostatic suspension, helium spin-up and superconducting readout.

5. [NASA Technical Reports Server — Results of Dynamic Testing of GP-B Spherical Gyroscopes](https://ntrs.nasa.gov/citations/19890065168) — measurements of spin history, mass unbalance, rotor-shape harmonics and mathematical modeling of electrostatic-suspension torques.

6. [NASA Technical Reports Server — Review of Gravity Probe B](https://ntrs.nasa.gov/api/citations/19950024360/downloads/19950024360.pdf) — discussion of four nearly spherical gyros, free-fall/drag-free operation, electrostatic support and fused-quartz instrument structure.

7. [NASA Technical Reports Server — The GP-B and STEP Science Experiments](https://ntrs.nasa.gov/api/citations/19910004475/downloads/19910004475.pdf) — AC electrostatic suspension, capacitive feedback, gyro centering and force/acceleration comparisons among the four gyros.

8. [Stanford GP-B Technical Reports Archive](https://einstein.stanford.edu/TECH/technology5-s.html) — rotor homogeneity, mass-unbalance, Gyroscope Suspension System verification, data-reduction/simulation algorithms and Drag-Free Gyroscope Simulator documentation.

9. [Stanford GP-B — Homogeneity and Composition of GP-B Rotors](https://einstein.stanford.edu/content/tech_docs/sdocs/gyros/S0287.pdf) — technical rotor material and homogeneity requirements.

10. [NASA Technical Reports Server — Modeling of Micro Thrusters for Gravity Probe B](https://ntrs.nasa.gov/citations/19960025450) — Direct Simulation Monte Carlo modeling of helium flow through GP-B microthrusters and description of the superconducting gyro readout concept.

11. [NASA Technical Reports Server — Avionics GP-B Control System Analysis](https://ntrs.nasa.gov/citations/20030067892) — spacecraft/control-system simulation, TREETOPS model updates and helium-slosh effects on pointing performance.

12. [NASA Technical Reports Server — Gravity Field Information from Gravity Probe-B](https://ntrs.nasa.gov/api/citations/19900011197/downloads/19900011197.pdf) — overview of the four fused-quartz, niobium-coated gyroscopes, electrostatic suspension and magnetic readout.

[← Home](../)
