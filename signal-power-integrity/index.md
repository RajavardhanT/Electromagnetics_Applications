---
layout: default
title: Signal Integrity & Power Integrity
description: Practical reference for high-speed digital signal integrity and power integrity, including transmission lines, S-parameters, eye diagrams, jitter, crosstalk, PDN impedance, decoupling, PCIe, USB, DDR, Ethernet, and NVIDIA GPU/accelerator hardware.
---

# Signal Integrity & Power Integrity

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Eye_pattern_example.png"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Eye_pattern_example.png?width=1200" alt="Measured eye pattern of a high-speed serial data signal." loading="lazy"></a>
  <figcaption>Measured eye pattern of a high-speed serial data stream—the most recognizable visual summary of signal-integrity margin. <a href="https://commons.wikimedia.org/wiki/File:Eye_pattern_example.png">Image source: Wikimedia Commons</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>At high data rates, a PCB trace is not an ideal wire and a power rail is not an ideal voltage source. <strong>Signal integrity (SI)</strong> asks whether bits arrive with enough voltage and timing margin. <strong>Power integrity (PI)</strong> asks whether every device receives sufficiently clean, stable power across frequency and load transients. Modern GPUs, PCIe links, USB4, DDR memory, and high-speed accelerators require both to work simultaneously.</div>

<div class="pathway"><span class="node">package / PCB geometry</span><span class="arrow">→</span><span class="node">channel + PDN impedance</span><span class="arrow">→</span><span class="node">loss / reflection / crosstalk / droop</span><span class="arrow">→</span><span class="node">eye + jitter + rail noise</span><span class="arrow">→</span><span class="node">BER / stability / performance</span></div>

# Part I — Signal integrity

## 1. When does a PCB trace become a transmission line?

A useful criterion is to treat an interconnect as distributed when its one-way propagation delay is no longer negligible compared with the signal rise time.

For propagation velocity $v_p$,

$$
t_d=\frac{l}{v_p}.
$$

On typical PCB material,

$$
v_p\sim\frac{c}{\sqrt{\epsilon_{eff}}},
$$

often roughly 150–180 mm/ns depending on geometry and dielectric.

A common engineering rule is that transmission-line effects deserve attention when

$$
t_d\gtrsim\frac{t_r}{6}
$$

or even earlier for stringent margin requirements.

The relevant frequency content is set much more by **edge rate** than by the bit clock alone.

---

## 2. Characteristic impedance

For a distributed line,

$$
Z_0=\sqrt{\frac{R+j\omega L}{G+j\omega C}}.
$$

For a low-loss approximation,

$$
Z_0\approx\sqrt{\frac{L}{C}}.
$$

High-speed serial interfaces generally use controlled differential impedance. Typical design targets include approximately

- PCI Express differential channels: **85 $\Omega$ differential class**;
- USB SuperSpeed / USB4 channels: **90 $\Omega$ differential class**;
- many Ethernet and display interfaces: protocol-specific 100-$\Omega$-class differential channels.

The exact compliance limits and reference planes are defined by the relevant specification and should take precedence over generic PCB rules.

---

## 3. Reflection coefficient and return loss

At an impedance discontinuity,

$$
\Gamma=\frac{Z_L-Z_0}{Z_L+Z_0}.
$$

Return loss is

$$
RL=-20\log_{10}|\Gamma|.
$$

Discontinuities arise from

- connector transitions;
- vias;
- pads and anti-pads;
- packages;
- neck-down regions;
- stubs;
- test points;
- layer transitions;
- poor reference-plane continuity.

At multi-GT/s data rates, even physically small discontinuities can significantly distort the channel.

---

## 4. Insertion loss

For a two-port channel, $S_{21}$ describes forward transmission.

Insertion loss is commonly expressed as

$$
IL=-20\log_{10}|S_{21}|.
$$

Loss comes from

- conductor resistance and skin effect;
- dielectric loss;
- copper roughness;
- vias and connectors;
- radiation and mode conversion.

A long channel can have acceptable DC continuity yet be unusable at the Nyquist and harmonic frequencies needed by the serializer.

---

## 5. Skin effect and conductor loss

The skin depth is

$$
\delta=
\sqrt{\frac{2}{\omega\mu\sigma}}.
$$

As frequency rises, current crowds toward conductor surfaces. Effective resistance increases, and copper surface roughness becomes increasingly important.

For very-high-speed links, PCB material selection therefore involves not just dielectric constant but also

$$
D_f,\qquad D_k,\qquad \text{copper profile},\qquad \text{glass weave}.
$$

---

## 6. Differential signaling

Two conductors carry complementary signals.

The differential voltage is

$$
V_d=V_+-V_-,
$$

while common-mode voltage is

$$
V_{cm}=\frac{V_++V_-}{2}.
$$

Differential signaling improves immunity to common external noise and reduces radiation when the pair is geometrically well balanced.

Imbalance causes differential-to-common-mode conversion, increasing EMI and reducing eye margin.

Important pair controls include

- intra-pair skew;
- differential impedance;
- pair-to-pair spacing;
- reference-plane continuity;
- via symmetry.

---

## 7. Eye diagrams

An eye diagram overlays many bit periods.

The open region directly visualizes available voltage and timing margin.

Important quantities include

- eye height;
- eye width;
- crossing level;
- jitter;
- noise;
- rise/fall asymmetry;
- overshoot;
- deterministic pattern dependence.

A closed eye may result from loss, reflections, crosstalk, jitter, poor equalization, or receiver noise.

---

## 8. Jitter

Timing error can be decomposed conceptually as

$$
TIE = RJ + DJ,
$$

where

- **RJ** = random jitter;
- **DJ** = deterministic jitter.

Deterministic jitter can include

- data-dependent jitter;
- duty-cycle distortion;
- periodic jitter;
- bounded uncorrelated jitter.

High-speed compliance commonly evaluates the statistical eye at a specified bit-error-ratio target rather than relying only on a visually captured eye.

---

## 9. Bit error rate

BER is

$$
BER=
\frac{N_{error}}{N_{bits}}.
$$

At very low target BER, direct counting can take impractically long. Statistical extrapolation, bathtub curves, eye-mask testing, and BERT measurements are therefore used.

The physical channel, transmitter equalization, receiver equalization, clock recovery, and coding/FEC together determine the effective error performance.

---

## 10. Crosstalk

A neighboring aggressor couples to a victim through mutual capacitance and inductance.

Two familiar forms are

- near-end crosstalk (NEXT);
- far-end crosstalk (FEXT).

Crosstalk depends strongly on

- parallel run length;
- pair spacing;
- layer geometry;
- reference planes;
- signaling direction;
- edge rate.

A useful design principle is to reduce long parallel coupled regions rather than relying only on a fixed “3W” spacing rule.

---

## 11. Vias, stubs, and layer transitions

A plated through-hole via introduces parasitic inductance and capacitance.

Unused via length creates a stub that can resonate approximately when it approaches a quarter wavelength in the effective medium.

Mitigations include

- back drilling;
- blind/buried vias;
- optimized anti-pads;
- nearby ground return vias;
- symmetric differential-via structures.

At PCIe Gen5/6-class rates, via design is often one of the dominant channel discontinuities.

---

## 12. Return-current path

High-frequency current returns along the path of lowest electromagnetic impedance, usually close to the signal trace on the adjacent reference plane.

A split or gap in the return plane forces current to detour, increasing loop area, inductance, radiation, and coupling.

When a signal changes reference planes, provide a nearby stitching path so the return current can transition cleanly.

---

## 13. Equalization

Channel loss is frequency dependent. High-speed serial interfaces use equalization to compensate.

Common techniques include

- transmitter pre-emphasis / de-emphasis;
- feed-forward equalization (FFE);
- continuous-time linear equalization (CTLE);
- decision-feedback equalization (DFE).

Equalization can recover eye opening, but it cannot correct arbitrary reflections, excessive noise, or severe mode conversion.

---

## 14. NRZ versus PAM4

NRZ uses two voltage levels and conveys one bit per symbol.

PAM4 uses four levels and conveys two bits per symbol.

For the same raw bit rate, PAM4 halves the symbol rate but reduces vertical eye spacing and increases sensitivity to noise and nonlinearity.

This is why PCIe 6.0 and 7.0 combine PAM4 with stronger error-handling mechanisms.

---

# Part II — Power integrity

## 15. The power-distribution network

The PDN includes

$$
\boxed{
\text{VRM}
\rightarrow
\text{bulk capacitors}
\rightarrow
\text{planes}
\rightarrow
\text{package}
\rightarrow
\text{on-die decoupling}
\rightarrow
\text{transistors}.
}
$$

Each element contributes resistance, inductance, capacitance, and resonances.

The rail seen by the silicon is therefore frequency dependent.

---

## 16. Target impedance

A central PI concept is

$$
\boxed{
Z_{target}=\frac{\Delta V_{allow}}{\Delta I_{step}}.
}
$$

If a 1.0-V rail must stay within 30 mV during a 100-A load transient,

$$
Z_{target}=\frac{0.03}{100}=0.3\ \mathrm{m}\Omega.
$$

Maintaining sub-milliohm impedance over a broad bandwidth is extremely challenging, which explains the dense decoupling and multi-phase regulation used around CPUs and GPUs.

---

## 17. Decoupling capacitor hierarchy

Different capacitor values and physical locations address different frequency ranges.

A simplified hierarchy is

- VRM + bulk capacitance: low frequency;
- board capacitors: low-to-mid frequency;
- package capacitors: mid-to-high frequency;
- on-die capacitance: highest frequency.

Real capacitors have ESR and ESL:

$$
Z_C(\omega)
=
ESR+j\omega ESL+\frac{1}{j\omega C}.
$$

Above self-resonance, the capacitor becomes inductive.

---

## 18. Anti-resonance

Paralleling capacitors of different values can create impedance peaks between their resonances.

This **anti-resonance** can be worse than using a smaller number of well-damped capacitors.

Useful controls include

- realistic ESR;
- package selection;
- careful value distribution;
- plane spreading inductance;
- intentional damping.

The goal is not merely “more capacitance,” but a controlled PDN impedance profile.

---

## 19. Voltage regulators and transient response

Modern GPU/CPU rails use multi-phase switched regulators because load current can change by tens or hundreds of amperes rapidly.

A first-order droop estimate is

$$
\Delta V
\approx
L\frac{\Delta I}{\Delta t}
+
\frac{\Delta Q}{C}
+
I\,ESR.
$$

This shows why both inductance and capacitance matter.

Long power paths and connector inductance can produce significant transient droop even when DC resistance is acceptable.

---

## 20. Plane pairs and PDN resonances

Power and ground planes form distributed capacitance but also support electromagnetic cavity modes.

Approximate rectangular-plane resonances scale as

$$
f_{mn}
\sim
\frac{c}{2\sqrt{\epsilon_r}}
\sqrt{
\left(\frac{m}{a}\right)^2+
\left(\frac{n}{b}\right)^2
}.
$$

At high frequency, the PDN should therefore be treated as a distributed electromagnetic structure rather than a lumped capacitor network.

---

## 21. Simultaneous switching noise

Large digital devices switch many current paths simultaneously.

Ground bounce and supply bounce arise from shared inductance:

$$
V=L\frac{di}{dt}.
$$

This can modulate

- I/O thresholds;
- PLLs;
- serializer clocks;
- memory interfaces;
- analog blocks.

SI and PI therefore cannot be analyzed independently.

---

## 22. Measuring power integrity

Useful tools include

- low-noise oscilloscope with high-bandwidth rail probe;
- coaxial or browser-tip probing;
- VNA-based PDN impedance measurement;
- current probes;
- differential probes;
- power-rail spectrum analysis.

Probe loop inductance can easily dominate the measured waveform, so connection technique is part of the measurement.

---

# Part III — PCI Express

## 23. PCIe architecture

PCI Express is a point-to-point serial interconnect.

A lane contains

- one differential transmit pair;
- one differential receive pair.

Links aggregate lanes as

$$
x1,\ x2,\ x4,\ x8,\ x16.
$$

A GPU typically uses a physical x16 edge connector even when the negotiated electrical width may differ by device or system.

---

## 24. PCIe generations and signaling rates

| Generation | Raw transfer rate per lane | Signaling | Approx. x16 payload direction class* |
|---|---:|---|---:|
| PCIe 1.x | 2.5 GT/s | NRZ, 8b/10b | 4 GB/s |
| PCIe 2.x | 5 GT/s | NRZ, 8b/10b | 8 GB/s |
| PCIe 3.x | 8 GT/s | NRZ, 128b/130b | 15.75 GB/s |
| PCIe 4.x | 16 GT/s | NRZ, 128b/130b | 31.5 GB/s |
| PCIe 5.x | 32 GT/s | NRZ, 128b/130b | 63 GB/s |
| PCIe 6.x | 64 GT/s | PAM4 + FLIT/FEC | about 128 GB/s |
| PCIe 7.x | 128 GT/s | PAM4 + FLIT | about 256 GB/s |

*Approximate one-direction link class; exact usable payload depends on protocol overhead. PCI-SIG quotes PCIe 6.0 up to 256 GB/s **bidirectional aggregate** for x16 and PCIe 7.0 up to 512 GB/s bidirectional aggregate.

PCIe 6.0 introduces PAM4, FLIT-mode operation, lightweight FEC, and CRC. PCIe 7.0 doubles the raw rate to 128 GT/s while retaining PAM4 and backward compatibility.

---

## 25. PCIe physical channel

The channel can include

$$
\text{GPU package}
\rightarrow
\text{card PCB}
\rightarrow
\text{edge connector}
\rightarrow
\text{motherboard}
\rightarrow
\text{CPU / switch package}.
$$

At Gen5 and above, insertion loss, return loss, lane-to-lane skew, connector discontinuities, via stubs, and crosstalk consume a substantial part of the channel budget.

Retimers may be used when the passive channel cannot meet the required reach.

---

## 26. Link training

PCIe receivers and transmitters negotiate link width, speed, and equalization.

The link can fall back to

- fewer lanes;
- a lower generation;
- both.

Therefore a system may appear functional while silently operating below expected bandwidth.

SI debugging should verify the negotiated link state, not only whether the device enumerates.

---

## 27. PCIe CEM hardware

A conventional add-in card uses the PCI Express Card Electromechanical (CEM) ecosystem.

Important hardware concerns include

- x16 edge connector geometry;
- slot power;
- auxiliary power connectors;
- card length/height/thickness;
- retention and mechanical load;
- airflow;
- ground contacts;
- connector insertion-loss budget.

High-power GPUs depend far more on auxiliary power than on slot-delivered power alone.

---

# Part IV — USB and USB-C

## 28. USB is not the same as USB-C

<figure class="topic-figure topic-figure-small">
  <a href="https://commons.wikimedia.org/wiki/File:USB_Type-C_plug_pinout.svg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/USB_Type-C_plug_pinout.svg?width=1200" alt="USB Type-C plug pinout showing high-speed, power and configuration contacts." loading="lazy"></a>
  <figcaption>USB Type-C plug pinout. The connector supports power, configuration and multiple high-speed signal paths; the connector type alone does not define the protocol or data rate. <a href="https://commons.wikimedia.org/wiki/File:USB_Type-C_plug_pinout.svg">Image source: Wikimedia Commons, Chindi.ap, CC BY-SA 4.0</a>.</figcaption>
</figure>

**USB-C is a connector and cable ecosystem.**

The protocol running through it may be

- USB 2.0;
- USB 3.2;
- USB4;
- DisplayPort Alt Mode;
- Thunderbolt-compatible tunneling;
- USB Power Delivery signaling.

A USB-C connector therefore does not by itself specify data speed or available power.

---

## 29. USB data-rate families

| Technology | Marketed data rate |
|---|---:|
| USB 2.0 High-Speed | 480 Mb/s |
| USB 3.2 Gen 1 | 5 Gb/s |
| USB 3.2 Gen 2 | 10 Gb/s |
| USB 3.2 Gen 2x2 | 20 Gb/s |
| USB4 Gen 2 class | up to 20 Gb/s |
| USB4 Gen 3 class | up to 40 Gb/s |
| USB4 Gen 4 / USB4 v2 | up to 80 Gb/s |

USB4 v2 supports 80-Gb/s operation over certified USB-C cables and dynamically shares link bandwidth among data and display protocols.

---

## 30. USB4 architecture

USB4 is architecturally different from earlier USB because it can tunnel multiple protocols over the same fabric.

It can transport combinations of

- USB data;
- DisplayPort;
- PCIe tunneling where supported.

This means compliance involves not only an electrical eye but also router, tunneling, protocol, and interoperability behavior.

---

## 31. USB Power Delivery

USB Power Delivery negotiates voltage/current over the Configuration Channel (CC).

USB PD 3.1 extended the ecosystem to **240 W** using Extended Power Range.

Defined high-power fixed-voltage levels include

- 28 V;
- 36 V;
- 48 V.

At 48 V and 5 A,

$$
P=VI=240\ \mathrm W.
$$

High-power USB-C design therefore becomes a PI, connector-temperature, cable-resistance, and contact-reliability problem in addition to a protocol problem.

---

## 32. USB signal-integrity concerns

Important issues include

- Type-C connector discontinuity;
- cable loss;
- orientation mux;
- ESD-protection capacitance;
- redrivers/retimers;
- differential skew;
- common-mode conversion;
- connector and cable return loss.

USB4 compliance uses defined electrical test fixtures and high-speed measurement equipment including oscilloscopes, BERTs, and VNAs.

---

# Part V — Other important high-speed interfaces

## 33. DDR memory

DDR links are parallel rather than high-speed serial.

Important SI topics include

- DQ/DQS timing;
- command/address topology;
- fly-by routing;
- byte-lane matching;
- write leveling;
- read training;
- termination;
- simultaneous switching noise.

For GPU boards, memory interfaces can be among the most demanding routing structures because many high-speed signals switch in a compact area next to a very high-current processor.

---

## 34. Ethernet

Modern Ethernet spans copper and optical links from low speeds to hundreds of gigabits per second and beyond.

High-speed electrical Ethernet uses sophisticated

- PAM signaling;
- equalization;
- FEC;
- channel characterization.

The same SI concepts—loss, return loss, crosstalk, jitter, BER, and channel compliance—apply even though connector and coding details differ from PCIe.

---

## 35. DisplayPort and HDMI

Display interfaces operate at multi-Gb/s lane rates and can share USB-C physical infrastructure through alternate modes or tunneling.

Design issues include

- differential channel loss;
- connector/cable quality;
- retimers;
- ESD devices;
- common-mode noise;
- EMI.

Graphics cards make these interfaces particularly relevant because the board simultaneously carries PCIe, memory, display links, and very high-current power rails.

---

# Part VI — NVIDIA GPU and accelerator cards

## 36. Why NVIDIA cards are excellent SI/PI case studies

A modern NVIDIA GPU card combines

- a high-power GPU package;
- very wide high-speed memory interfaces;
- PCIe;
- high-speed GPU-to-GPU interconnects on some products;
- display links on graphics products;
- multi-phase voltage regulation;
- dense decoupling;
- large transient currents;
- complex mechanical and thermal constraints.

It is therefore a real-world example in which **SI, PI, EMC, thermal design, packaging, and protocol compliance are inseparable**.

---

## 37. NVIDIA H100 PCIe as an example

NVIDIA specifies the H100 PCIe-class accelerator with PCIe Gen5 connectivity.

Official NVIDIA specifications give the PCIe interface bandwidth as approximately

$$
128\ \mathrm{GB/s}
$$

aggregate bidirectional for Gen5 x16, corresponding to roughly 64 GB/s in each direction before higher-layer overhead.

The H100 PCIe implementation is a full-height, full-length, dual-slot accelerator card.

Its high-speed link must pass through

$$
\text{GPU package}
\rightarrow
\text{accelerator PCB}
\rightarrow
\text{PCIe edge connector}
\rightarrow
\text{server motherboard}.
$$

Every discontinuity in that path contributes to the Gen5 channel budget.

---

## 38. NVIDIA GPU-to-GPU interconnect

NVIDIA NVLink is distinct from PCIe.

NVIDIA reports interconnect bandwidth per GPU of approximately

- Hopper generation: up to 900 GB/s;
- Blackwell generation: up to 1,800 GB/s.

These links create a different SI problem from the host PCIe interface: many very-high-speed lanes, short package/board paths, connector or module interfaces, and strict skew/loss requirements.

The design lesson is that a GPU system may have multiple independent high-speed channel classes simultaneously.

---

## 39. GPU power integrity

A large accelerator may dissipate hundreds of watts, with some module-level GPU platforms operating at substantially higher power than ordinary PCIe cards.

For example, NVIDIA's H100 specifications list approximately

- H100 PCIe: 350-W-class TDP;
- H100 SXM: up to 700-W-class TDP.

The power-distribution challenge is more severe than the average power number suggests because current changes rapidly as compute blocks, memory, and clocks change activity.

If a core rail is near 1 V, hundreds of watts correspond to hundreds of amperes.

Thus the local target impedance can enter the sub-milliohm regime.

---

## 40. Multi-phase VRMs on GPU boards

GPU boards use many regulator phases in parallel to

- share current;
- reduce output ripple;
- improve transient response;
- distribute thermal load.

Interleaving $N$ phases increases the effective ripple frequency and can reduce input/output ripple for a given total current.

The layout must minimize

- switching-loop area;
- phase imbalance;
- power-plane inductance;
- package-entry inductance.

---

## 41. GPU decoupling hierarchy

A high-performance GPU uses capacitance at multiple physical scales:

$$
\boxed{
\text{bulk board capacitors}
\rightarrow
\text{MLCC arrays}
\rightarrow
\text{package capacitance}
\rightarrow
\text{on-die capacitance}.
}
$$

The board-level capacitors cannot respond instantaneously to the highest-frequency current demand because the interconnect inductance isolates them.

This is why capacitor **placement and loop inductance** can matter as much as nominal capacitance.

---

## 42. GPU memory integrity

Accelerator cards can use GDDR or HBM depending on product architecture.

### GDDR

GDDR devices surround the GPU package on the PCB. Routing must control

- impedance;
- skew;
- timing;
- crosstalk;
- reference planes;
- power noise.

### HBM

HBM uses very wide interfaces in advanced packages rather than long PCB routes.

This reduces per-bit off-package channel distance but moves a large part of the SI/PI problem into the package, interposer, power delivery, and thermal structure.

NVIDIA H100-class accelerators use HBM3-family memory, making package-level EM behavior especially important.

---

## 43. PCIe versus NVLink versus HBM

| Interconnect | Primary purpose | Physical scale |
|---|---|---|
| PCIe | CPU/host ↔ accelerator and peripheral I/O | package + PCB + connector + motherboard |
| NVLink | high-bandwidth GPU ↔ GPU / switch fabric | package/board/module/system |
| HBM interface | GPU ↔ local high-bandwidth memory | package/interposer |
| GDDR interface | GPU ↔ local graphics memory | package + PCB |

These interfaces solve different bandwidth problems and therefore impose different SI and packaging constraints.

---

## 44. Power connectors and contact integrity

High-power cards require attention to connector resistance and current sharing.

Contact heating scales approximately as

$$
P_{contact}=I^2R_{contact}.
$$

A small increase in contact resistance can therefore create disproportionate heating at high current.

Engineering controls include

- full connector insertion;
- adequate cable bend radius;
- uniform current sharing;
- connector-temperature validation;
- proper crimp/contact quality;
- minimizing mechanical side load.

This is fundamentally a PI and reliability issue.

---

## 45. Thermal coupling to SI and PI

Temperature affects

- copper resistance;
- dielectric loss;
- regulator efficiency;
- semiconductor leakage;
- connector resistance;
- clock behavior.

Therefore a GPU board cannot be validated with electrical simulation alone.

A realistic workflow couples

$$
\text{electrical loss}
\rightarrow
\text{temperature}
\rightarrow
\text{material / device properties}
\rightarrow
\text{electrical behavior}.
$$

---

# Part VII — Simulation and measurement

## 46. SI simulation workflow

A practical channel workflow is

1. define stackup and material models;
2. extract trace/via/connector S-parameters;
3. cascade package + PCB + connector channel;
4. include transmitter and receiver models;
5. apply equalization;
6. calculate eye/BER metrics;
7. correlate with TDR/VNA/oscilloscope measurements.

IBIS and IBIS-AMI models are widely used for transmitter/receiver behavior.

---

## 47. PI simulation workflow

A practical PDN workflow is

1. obtain VRM small-signal/output model;
2. extract planes, vias, connectors, and package;
3. include capacitor RLC models;
4. calculate $Z_{PDN}(f)$;
5. compare with $Z_{target}$;
6. identify resonances;
7. simulate load transients;
8. validate with VNA and time-domain rail measurements.

A key plot is

$$
|Z_{PDN}(f)|
$$

versus target impedance.

---

## 48. S-parameters for SI

Useful mixed-mode quantities include

- $S_{DD21}$: differential insertion loss;
- $S_{DD11}$: differential return loss;
- $S_{DC21}$: differential-to-common conversion;
- $S_{CD21}$: common-to-differential conversion.

Mode-conversion parameters are especially useful for detecting pair imbalance.

---

## 49. TDR and TDT

Time-domain reflectometry launches a fast edge into the channel and infers impedance versus distance.

It is useful for locating

- connector discontinuities;
- via impedance errors;
- neck-down regions;
- opens/shorts.

TDT observes the transmitted waveform and complements reflection measurements.

---

## 50. Compliance versus design margin

Passing a protocol compliance test establishes that a device meets the specified test requirements at defined reference points.

It does **not** mean the design has large internal margin.

Robust development therefore combines

- compliance testing;
- simulation;
- corner analysis;
- temperature variation;
- manufacturing tolerance;
- interoperability testing.

---

## 51. Common SI/PI failure symptoms

| Symptom | Possible root causes |
|---|---|
| PCIe falls back to lower generation | excessive loss, reflection, jitter, connector/via problem |
| PCIe link width reduced | lane failure, skew, routing defect |
| USB works only with short cable | insufficient channel margin |
| random GPU crash under load | rail droop, transient PI, thermal or software issue |
| memory errors | SI timing margin, rail noise, thermal effects |
| EMI peak tied to data activity | common-mode conversion / return-path issue |
| resets during workload transition | PDN impedance or connector droop |
| eye closes at high rate only | channel loss/equalization limit |

The same visible symptom can have multiple causes, so correlation between protocol logs and physical measurements is essential.

---

## 52. Key engineering quantities

### Signal integrity

$$
Z_0,\quad S_{11},\quad S_{21},\quad
TDR,\quad
\text{eye height},\quad
\text{eye width},\quad
RJ,\quad DJ,\quad BER.
$$

### Power integrity

$$
Z_{PDN}(f),\quad
Z_{target},\quad
\Delta V,\quad
di/dt,\quad
ESR,\quad ESL,\quad
VRM\ bandwidth.
$$

### System-level

$$
\text{temperature},\quad
\text{EMI},\quad
\text{protocol margin},\quad
\text{manufacturing tolerance}.
$$

---

## 53. Selected standards and primary resources

- PCI-SIG, [PCI Express 6.0 Specification overview](https://pcisig.com/pci-express-6.0-specification) — 64 GT/s, PAM4, FLIT/FEC.
- PCI-SIG, [PCI Express 7.0 specification information](https://pcisig.com/what-are-key-features-pcie-70-specification) — 128 GT/s and up to 512 GB/s bidirectional x16.
- USB-IF, [USB4](https://www.usb.org/usb4) — USB4 architecture and up to 80-Gb/s operation.
- USB-IF, [USB Power Delivery](https://www.usb.org/usb-charger-pd) — power negotiation and up to 240 W.
- USB-IF, [USB 3.2](https://www.usb.org/usb-32) — electrical and compliance resources.
- NVIDIA, [H100 Tensor Core GPU specifications](https://www.nvidia.com/en-us/data-center/h100/) — PCIe/SXM power, PCIe Gen5, HBM and NVLink examples.
- NVIDIA, [NVLink](https://www.nvidia.com/en-us/data-center/nvlink/) — GPU interconnect bandwidth by architecture.

## 54. On-die SerDes and mixed-signal implementation

Board-level SI/PI is only one part of a high-speed link. Inside the SoC, serializers, TX drivers, CTLE/DFE equalizers, CDRs, PLLs, ADCs, calibration loops, and low-noise supplies determine how much channel impairment the system can tolerate.

See [High-Speed SerDes & IO](../high-speed-serdes/) for TX/RX architecture, NRZ/PAM4, equalization and CDR, and [Analog Mixed-Signal IC Design](../analog-mixed-signal/) for the circuit blocks, mismatch/noise/stability, digitally assisted calibration, FinFET implementation, layout, and silicon characterization behind those interfaces.

Related: [High-Speed SerDes & IO](../high-speed-serdes/) · [Analog Mixed-Signal IC Design](../analog-mixed-signal/) · [RF & Microwave](../rf-microwave/) · [EMI / EMC](../emc/) · [Computational Methods](../computational-methods/) · [Measurements & Instruments](../measurements/) · [Electromagnetic Simulation of Quantum-Computing Hardware](../quantum/em-simulation-quantum-computing.html)
