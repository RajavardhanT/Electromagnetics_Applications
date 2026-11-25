---
layout: default
title: SPICE Circuit Simulation — Numerical Foundations, Device Models, QSPICE, LTspice and Related Software
description: Advanced guide to modified nodal analysis, nonlinear Newton iteration, AC/transient/noise simulation, compact models, convergence, QSPICE 2025–2026 updates and analog/RF/IC circuit design workflows.
---

# SPICE Circuit Simulation — From Circuit Laws to Numerical Results

**Updated November 25, 2026.** This is an engineering reference to circuit simulation theory, numerical solution methods, practical netlists, semiconductor compact models, and the different roles of **QSPICE, LTspice, ngspice, KiCad, PSpice, Spectre, PrimeSim HSPICE, Xyce and Keysight ADS**.

<div class="intuition"><span class="callout-title">Core principle</span>SPICE represents an electrical circuit as nonlinear differential-algebraic equations. Device equations and connectivity are converted to a sparse matrix problem; numerical solvers find operating points, time responses or small-signal characteristics. A converged answer is only as physically accurate as the circuit model, device parameters, excitation, numerical settings and validation.</div>

**Related chapters:** [Analog Mixed-Signal IC Design](../analog-mixed-signal/) · [Data Converters](../data-converters/) · [RF Transceiver Architecture](../rf-transceiver-architectures/) · [Ansys and Semiconductor EDA](../ansys-electronics/) · [Computational Methods](../computational-methods/).

## 1. What SPICE does and does not simulate

<figure class="topic-figure">
<a href="{{ '/assets/spice-circuit-simulation-architecture.svg' | relative_url }}"><img src="{{ '/assets/spice-circuit-simulation-architecture.svg' | relative_url }}" alt="Detailed SPICE numerical engine and circuit-to-measurement block diagram" loading="lazy"></a>
<figcaption>Device models and a circuit netlist enter a numerical engine; DC, AC, transient and noise results are compared against analytic or measured circuit behavior. <a href="{{ '/assets/spice-circuit-simulation-architecture.svg' | relative_url }}">Open SVG diagram</a>.</figcaption>
</figure>

| Physical level | Appropriate model and software |
|---|---|
| Electrical lumped networks | SPICE: R, L, C, diodes, transistors, feedback, controlled sources and parasitic circuits |
| 3-D RF geometry | HFSS, CST or other full-wave EM solvers: fields, radiation, distributed coupling, package and substrate geometry |
| Periodic nonlinear RF | ADS harmonic balance, SpectreRF and related RF solvers for steady-state harmonic content |
| Modulated RF systems | Circuit-envelope / RF system simulation; SystemVue for end-to-end DSP and RF chains |
| Hardware evidence | VNA, oscilloscope, SMU, power analyzer, spectrum analyzer, load-pull and EMI/EMC tests |

**SPICE is not automatically a Maxwell 3-D field solver.** EM-extracted networks can be imported, but reference planes, frequency range, passivity and causality have to be checked.

## 2. The mathematical engine: KCL and modified nodal analysis

Circuit elements obey Kirchhoff current balance, branch constitutive laws and dynamic storage equations:

$$
\sum i_k=0,\quad i_R=v/R,\quad i_C=C\,dv/dt,\quad v_L=L\,di_L/dt.
$$

In **modified nodal analysis (MNA)**, unknowns include node voltages and additional current variables for voltage sources and selected dynamic branches. A general nonlinear model is

$$
\boxed{\frac{d}{dt}\mathbf q(\mathbf x)+\mathbf i(\mathbf x)-\mathbf b(t)=\mathbf 0}.
$$

For linearized lumped elements this becomes

$$
\boxed{\mathbf C\dot{\mathbf x}+\mathbf G\mathbf x=\mathbf b(t)}.
$$

Components contribute local matrix stamps. The global matrix is usually sparse because each component connects only a few nodes.

**Why a simulator reports a singular matrix:** a floating net lacks a defined DC reference, contradictory ideal sources impose impossible conditions, or a model adds redundant internal constraints. Supply a **physical** leakage, series resistance, DC path or proper initial condition where the real circuit has one rather than blindly changing solver options.

## 3. Newton iteration, linearization and time integration

### DC operating point

A nonlinear transistor model is solved using Newton-type iteration. For residual vector \(\mathbf f(\mathbf x)\),

$$
\mathbf J(\mathbf x_k)\Delta\mathbf x=-\mathbf f(\mathbf x_k),
\qquad \mathbf x_{k+1}=\mathbf x_k+\Delta\mathbf x.
$$

The Jacobian is updated as nonlinear device slopes change. Damping, source stepping and conductance stepping can improve convergence. **Convergence to one DC solution does not prove the operating state is unique or stable.**

### Transient

Time derivatives are discretized, for example backward Euler:

$$
\dot{\mathbf x}(t_n)\approx
\frac{\mathbf x_n-\mathbf x_{n-1}}{\Delta t}.
$$

Trapezoidal or BDF/Gear-type integration and adaptive timesteps are used in suitable simulators. Every step generally requires solving a nonlinear algebraic system. Verify fast edges, ringdown, startup and soft-switching behavior by **converging the maximum timestep** and comparing integration methods where available.

### AC small signal

After finding a DC bias point, SPICE linearizes nonlinear devices. The phasor perturbation satisfies

$$
\boxed{(\mathbf G+j\omega\mathbf C)\tilde{\mathbf x}=\tilde{\mathbf b}}.
$$

This is not large-signal harmonic generation. A PA's EVM/ACLR, switching ringing and mixer conversion products generally require nonlinear time/periodic analysis rather than ordinary small-signal AC.

## 4. Analysis options you must understand

| Common directive/analysis | Physical question |
|---|---|
| **.op** | What voltages, currents, powers and device operating regions exist at DC? |
| **.dc** | How does static bias or I–V response change with a swept source? |
| **.tran** | What happens during switching, startup, a pulse or a time-varying excitation? |
| **.ac** | What is the linearized transfer/impedance versus frequency about the DC bias? |
| **.noise** | What is the modeled input/output small-signal noise in a given band? |
| **.step / parameter sweeps** | How do circuit predictions vary with parameters? |
| **.meas** | Can gain, delay, ripple, peak current or RMS power be extracted automatically? |
| **Temperature / corner / Monte Carlo** | What do PVT, part tolerances, random mismatch and yield imply? |
| **PSS / HB / envelope** | What does a nonlinear periodic or digitally modulated RF circuit do? Use a solver that actually implements the desired method. |

Directive details are **dialect dependent**. QSPICE, LTspice, ngspice, Spectre and HSPICE are not guaranteed to interpret every behavioral expression, stepping command or compact-model syntax identically.

## 5. SPICE netlist anatomy — a reproducible RC example

SPICE represents circuit connections as text. Node **0** is the standard ground reference. A component's first character generally identifies its instance class (R resistor, C capacitor, L inductor, V voltage source, D diode, M MOSFET and X subcircuit instance).

~~~spice
* RC low-pass: title line in classic SPICE
V1 in 0 AC 1 PULSE(0 1 0 1n 1n 20u 40u)
R1 in out 1k
C1 out 0 10n
.ac dec 80 100 10Meg
.tran 0 200u 0 50n
.end
~~~

Run the AC or transient analysis appropriate to your environment; some schematic interfaces require selecting one active simulation. For this circuit,

$$
H(s)=\frac{V_{\rm out}}{V_{\rm in}}=\frac{1}{1+sRC},
\quad
\tau=RC=10\ \mu{\rm s},
\quad
f_c=\frac1{2\pi RC}\approx15.915\ {\rm kHz}.
$$

At the pole $|H|=-3.010$ dB relative to DC gain and phase is $-45^\circ$. Check these values in SPICE rather than treating the simulator as the reference truth.

**File:** [RC low-pass SPICE netlist](../simulations/spice/rc_lowpass.cir) and [Python analytical reference](../simulations/python/spice_rc_reference.py).

**Critical suffix convention:** m means $10^{-3}$, whereas meg means $10^6$. The common prefixes f, p, n, u, m, k, meg and g correspond to femto through giga. Misreading m as mega is a classic SPICE error.

## 6. Semiconductor device models and compact-model reliability

A basic diode law is

$$
I_D\approx I_S\left[e^{V_D/(nV_T)}-1\right],\qquad V_T=k_BT/q.
$$

Realistic diode, BJT, MOSFET or SiC/GaN models also need junction capacitance, charge storage, package parasitics, breakdown, bias dependence and often electrothermal response.

| Model | Main use | Major missing physics if used carelessly |
|---|---|---|
| Ideal RLC, ideal switch | First-order transfer and ideal converter | ESR, charge, finite edge and layout coupling |
| Behavioral source | Analytic gain/controller and custom block | Hidden physical nonlinearity, discontinuity and state |
| Vendor model / subcircuit | Particular op amp, power transistor, filter, driver | Model validity at untested bias, temperature and frequency |
| Foundry compact model / PDK | IC transistor corners and mismatch | Layout parasitics unless extracted and included |
| Nonlinear capacitor + charge model | $C_{\rm oss}$, $C_{\rm gd}$ and switching charge | Incorrect energy if $i=dQ/dt$ is not enforced |
| EM-extracted S/RLC model | Package, PCB, connector and distributed effects | Out-of-band stability, passivity/causality and nonlinearity |

**Model versus measured part:** vendor curves for DC $I$–$V$, $C$–$V$, $Q_g$, switching loss, reverse recovery, temperature and frequency are validation targets. A model matching DC on-resistance alone cannot establish switching energy or PA spectral distortion.

**Verilog is not Verilog-A:** Verilog HDL models event-driven logic, Verilog-A describes continuous-time analog equations, and C++ blocks can implement specialized executable controls. Availability depends on a simulator's model interface. QSPICE's supported C++/Verilog workflow does not guarantee native compatibility with arbitrary Verilog-A/PDK models.

## 7. SPICE software comparison — selection by physical problem

| Simulator | Typical strength | Official software/reference |
|---|---|---|
| **QSPICE (Qorvo)** | Analog/power circuits and mixed-signal controls via compiled C++/Verilog models; free commercial use; Windows 10/11 x64 | [QSPICE](https://www.qorvo.com/design-hub/calculators-simulation/qspice) |
| **LTspice (Analog Devices)** | Fast free schematic-based analog/power design with vendor models, waveform analysis | [LTspice](https://ltspice.analog.com/) |
| **ngspice** | Open-source, reproducible netlist scripting, shared-library interfaces and advanced device-model support | [ngspice](https://ngspice.sourceforge.io/) |
| **KiCad + ngspice** | Free schematic/PCB and circuit simulation workflow | [KiCad SPICE](https://www.kicad.org/discover/spice/) |
| **PSpice / OrCAD X (Cadence)** | Industry PCB, Monte Carlo, worst-case analysis and vendor model workflows | [PSpice](https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/analog-mixed-signal-simulation/pspice.html) |
| **Spectre / Spectre X / FX (Cadence)** | Analog/RF/mixed-signal IC and foundry-oriented verification, hierarchical designs | [Spectre X](https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design/circuit-simulation/spectre-x-simulator.html) |
| **PrimeSim HSPICE (Synopsys)** | Transistor-level IC, memory characterization and high-speed SI | [HSPICE](https://www.synopsys.com/blogs/chip-design/celebrating-40-years-of-hspice.html) |
| **Xyce (Sandia)** | Open-source high-performance and distributed large-circuit SPICE-compatible simulation | [Xyce](https://xyce.sandia.gov/) |
| **Keysight ADS** | RF/microwave S-parameters, harmonic balance, circuit envelope and EM/circuit cosimulation | [Keysight ADS](https://www.keysight.com/us/en/products/software/pathwave-design-software/pathwave-advanced-design-system.html) |
| **Keysight SystemVue** | RF system, modulation, beamforming and digital signal-processing models—not a transistor SPICE substitute | [SystemVue](https://www.keysight.com/us/en/products/design-engineering-software/electronic-design-automation/wireless-and-rf-systems-suite/rf-system-design-systemvue.html) |

**Choice by project:** use QSPICE/LTspice for power and analog circuits, ngspice for open-source scripting and repeatability, Spectre/HSPICE for PDK-dependent IC design, and ADS for nonlinear RF harmonic/envelope tasks. A SystemVue digital link-budget model does not replace physical PA matching or switching-device transient simulation.

## 8. QSPICE fundamentals and architecture

**QSPICE was launched by Qorvo in July 2023**, developed by Mike Engelhardt. Qorvo advertises SPICE simulation, schematic capture, waveform display, free commercial use, compiled C++/Verilog blocks, and device-model generation tools.

A typical mixed-signal power-electronics project is:

**Analog plant:** MOSFET → inductor → output capacitor → load, including package/parasitic models.

**Digital controller:** sensed voltage/current → compensation and PWM written as a C++ or digital Verilog module → driver and protection.

**Verification:** startup, regulation, thermal effects, current limits, deadtime, switching spikes and conducted emission-related waveforms.

For unusual digital control algorithms, compiled model blocks can avoid simulating every logic gate as a slow analog circuit. But the model must handle event timing, numerical coupling and valid states correctly. **A custom executable block is not proof of analog stability or physical correctness.**

**Current operating requirements published by Qorvo:** Windows 11 or 64-bit Windows 10; 4 GB RAM minimum (16 GB recommended). [Official QSPICE page](https://www.qorvo.com/design-hub/calculators-simulation/qspice).

### QSPICE versus LTspice

Both are useful free schematic/circuit simulators. QSPICE emphasizes compiled digital/behavioral blocks and model-generation features; LTspice benefits from longstanding device examples, Analog Devices parts and mature analog/power workflows. Avoid categorical speed rankings without using the same circuit, device models, solver tolerances and timestep/accuracy criteria.

## 9. Recent QSPICE developments — verified through November 25, 2026

Dates distinguish **official product announcements** from **community-reported changes**. An item found on a user forum is not necessarily a formal vendor release note.

| Date | Development | Why it matters | Source |
|---|---|---|---|
| **March 5, 2025** | Qorvo officially announced rapid device-model creation for **MOSFETs, JFETs and diodes** using typical datasheet information | Faster first-pass compact-model creation; requires independent device validation | [Qorvo announcement](https://www.qorvo.com/about/news-events/news-releases/2025/qorvo-adds-modeling-capabilities-to-award-winning-qspice-circuit-simulation-software) |
| **2025–2026 documentation** | Continued emphasis on **compiled C++ and Verilog** models and new learning examples | Practical power converter plus digital control cosimulation | [Qorvo C++ / Verilog tutorial](https://www.qorvo.com/design-hub/videos/using-c-plus-plus-and-verilog-in-qspice) |
| **May 2026** | Community-reported **drag-and-drop schematic files** from the Symbol & IP Browser | Schematic/model reuse and editing productivity | [Qorvo forum](https://forum.qorvo.com/t/new-feature-view-and-drag-schematic-files-sch-from-symbol-ip-browser/25551) |
| **October 24–25, 2026** | **VsatOffset** and **SatAsym** parameters added to the saturating nonlinear capacitor model | Better fitting of $C_{\rm oss}$ and related voltage-dependent capacitance around zero and negative voltages | [Qorvo forum — voltage-dependent capacitor](https://forum.qorvo.com/t/new-feature-voltage-dependent-capacitor-modeling-new-instance-parameters-vsatoffset-and-satasym/26720) |
| **October 24, 2026** | Hierarchy-sensitive filtering of **.options listparam** parameter output via quoted patterns | Less noisy inspection/debugging of hierarchical parameters | [Qorvo forum — LISTPARAM](https://forum.qorvo.com/t/new-feature-option-listparam-only-print-global-scope-or-one-layer-down/26714) |
| **November 20, 2026** | A QSPICE update regression affecting simulations was reported; the forum topic is subsequently labeled **fixed** | Retain known-good project/model snapshots and regression netlists before automatic updates | [Qorvo forum — November regression](https://forum.qorvo.com/t/failure-after-the-latest-update-on-november-20-2026-fixed/27128) |

**Important limitation:** The above evidence does **not** establish a specific latest numbered QSPICE installer version or universal superiority in accuracy/speed. For your actual installed build, consult the application's revision notes and [Qorvo technical forum](https://forum.qorvo.com/c/qspice/9).

## 10. Power semiconductor modeling: why nonlinear capacitance matters

High-voltage MOSFET output capacitance varies strongly with drain-source voltage. The physically important curves are

$$
Q_{\rm oss}(V)=\int_0^V C_{\rm oss}(v)\,dv,\qquad
E_{\rm oss}(V)=\int_0^V vC_{\rm oss}(v)\,dv.
$$

Charge consistency implies $i=dQ(V)/dt$; simply selecting a constant capacitor can mispredict switching energy, resonant transition times and current spikes. The October 2026 QSPICE changes affect a saturating-capacitor model's transition around low or reverse voltages; consult the built-in model guide before assuming exact device syntax.

**Validation procedure:** compare datasheet/measurement $C_{\rm iss},C_{\rm oss},C_{\rm rss}$ versus bias, integrate charge/energy, run double-pulse transients and compare switching losses. Include gate resistance, lead inductance, body diode and temperature. A model generator is a starting point—not evidence that all dynamic waveforms are accurate.

## 11. Convergence failures: what you should actually inspect

1. **Topology:** floating nodes, shorted ideal voltage sources, missing input return, unintended feedback sign.
2. **Models:** unrealistic parameters, abrupt behavioral discontinuities, dependent source algebraic loops and missing ESR/leakage.
3. **Initial state:** DC bias versus zero-state startup, magnetic/capacitive stored energy and initial condition sensitivity.
4. **Numerics:** tolerances, integration scheme, maximum timestep, Newton iteration and matrix conditioning.
5. **Physical reality:** thermal drift, package L/C, current limiting and parasitic paths ignored by ideal circuits.
6. **Validation:** repeat with smaller timestep, modified tolerances, alternate model fidelity or independent analytical references.

Be careful with **gmin** and leakage: they are often numerical aids and can also alter very high-impedance circuits. Report when they change physically relevant leakage or pole locations.

## 12. RF engineer's SPICE workflow: circuit, EM and system-level boundaries

| Task | Preferred simulation boundary |
|---|---|
| LNA bias and supply ripple | SPICE with characterized transistor and realistic package/bias |
| Active RF matching and stability | Small-signal RF circuit model plus measured/EM-extracted S-parameters |
| PA two-tone intermodulation or compression | Nonlinear RF circuit / harmonic balance |
| Modulated PA ACLR/EVM | Circuit envelope + real modulated waveform where supported |
| RF PCB package/via coupling | HFSS, ADS Momentum or similar EM extraction, with circuit cosimulation |
| PLL analog loop and supply spurs | SPICE/suitable phase-domain models plus noise analysis |
| Antenna radiation and scan loss | HFSS / dedicated full-wave method, then link-system model |
| Full RF transceiver, modem and interference | SystemVue or equivalent digital/RF system-level simulator |

**Harmonic balance versus long transient:** for periodic high-frequency RF waveforms, a frequency-domain steady-state solver can avoid integrating millions of carrier cycles. For modulated, multitone or transient switching signals use a suitable envelope or transient approach. The correct solver depends on nonlinearity, bandwidth, memory effects and model support.

**Bridge to your previous HFSS + SystemVue + STK workflow:** EM gives physically grounded interconnect/antenna models; SPICE and RF circuit simulation give nonlinear device responses and circuit bias; SystemVue combines RF impairment and signal-processing behavior; STK supplies mission geometry and propagation scenarios. Keep all frequency, impedance, amplitude, reference-plane and waveform conventions consistent.

## 13. Circuit examples worth implementing

**Project A — Op-amp/TIA noise:** input-current shot noise, op-amp input noise, sensor capacitance, feedback compensation and measurement bandwidth. Compare model to photodetector / Rydberg EIT readout.

**Project B — Buck converter with digital controller:** MOSFET gate driver, nonlinear $C_{\rm oss}$, diode reverse recovery, inductor ESR, output ripple, loop dynamics and current limit. Compare the analog plant in QSPICE to a C++/Verilog controller.

**Project C — LNA bias and matching:** determine DC operating state and thermal noise; insert realistic 2-port RF device/interconnect model and examine stability. Verify the network on a VNA at matched reference planes.

**Project D — IMU capacitive readout:** build differential capacitive excitation, charge amplifier, synchronous demodulator, filter and ADC input. Calculate $kT/C$, voltage-noise-to-charge coupling and phase-reference leakage. Compare [IMU circuitry](../imu-circuits/).

**Project E — RF supply pulsing:** model pulsed PA drain bias and supply droop, assess voltage ringing and effect on real RF PA operating point; do not infer EVM from a supply transient without a PA RF sensitivity model.

### PMIC and PCB power-tree simulation

A **PMIC** manages multiple voltage rails, enable sequencing, power-good/fault supervision and often buck/LDO regulation. A practical QSPICE/LTspice project should couple a switching-regulator plant to **time-dependent processor load steps**, capacitor ESR/ESL and realistic PCB resistance/inductance. Model startup ramp, brownout, PGOOD timing, load-switch inrush and thermal dissipation; then correlate at the **SoC power pins**, not only the converter output.

See the [dedicated PMIC-on-PCB implementation section](../hardware-interfaces-pcb-flex/#39a-pmics-on-pcbs--power-architecture-sequencing-and-physical-design) for an annotated power-tree diagram, rail definitions, sequencing/faults, hot-loop layout, PDN target impedance and TI/ADI references. SPICE alone cannot replace distributed PDN extraction and oscilloscope/impedance validation.

## 14. Practical study sequence

1. **DC / AC fundamentals:** divider, RC, RL and RLC; check poles, time constants and passivity against hand calculations.
2. **Transistor operating points:** diode rectifier, MOSFET switch, BJT or CMOS differential amplifier; inspect current/charge/nonlinearity.
3. **Feedback circuits:** op amp, LDO and switching controller; study loop gain, transients, slew and phase margin carefully.
4. **Model imports:** read the vendor subcircuit pin order, model revision and temperature behavior; compare to datasheets.
5. **Mixed signal:** QSPICE C++ or digital Verilog controller, sample/hold, ADC timing and PWM states.
6. **PVT/yield:** corners, parameter sweeps, mismatch and Monte Carlo according to simulator capabilities.
7. **RF cosimulation:** integrate S-parameters, circuit models and circuit-envelope/system performance; compare bench data.

For every deliverable archive: netlist, model libraries, model/solver version, physical assumptions, units, operating state, integration settings, a convergence test and independent experimental or analytic comparison.

## 15. Documentation, manuals and further reading

- [Qorvo QSPICE overview, downloads and tutorials](https://www.qorvo.com/design-hub/calculators-simulation/qspice); [QSPICE QuickStart](https://www.qorvo.com/design-hub/videos/quickstart-guide-for-qspice-simulation-tool); [QSPICE forum](https://forum.qorvo.com/c/qspice/9).
- [Analog Devices LTspice](https://ltspice.analog.com/); [LTspice learning articles](https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator/ltspice-recommended-reading-list.html).
- [ngspice documentation](https://ngspice.sourceforge.io/docs.html); [ngspice release news](https://ngspice.sourceforge.io/news.html), including **ngspice 47 released August 11, 2026**; [KiCad built-in ngspice](https://www.kicad.org/discover/spice/).
- [Cadence PSpice](https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/analog-mixed-signal-simulation/pspice.html); [Cadence Spectre X](https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design/circuit-simulation/spectre-x-simulator.html); [Synopsys HSPICE](https://www.synopsys.com/blogs/chip-design/celebrating-40-years-of-hspice.html).
- [Sandia Xyce](https://xyce.sandia.gov/); [Keysight ADS RF nonlinear simulation](https://www.keysight.com/us/en/products/software/pathwave-design-software/pathwave-advanced-design-system.html).

**Foundational books:** L. W. Nagel, *SPICE2: A Computer Program to Simulate Semiconductor Circuits*; A. Vladimirescu, *The SPICE Book*; P. W. Tuinenga, *SPICE: A Guide to Circuit Simulation and Analysis Using PSpice*; R. Jacob Baker, *CMOS: Circuit Design, Layout, and Simulation*.

**See also:** [Simulation Library](../simulations/) · [RF/Microwave](../rf-microwave/) · [Mixed-Signal](../analog-mixed-signal/) · [Numerical Methods](../computational-methods/) · [Phased-Array Hardware](../phased-array-hardware/).
