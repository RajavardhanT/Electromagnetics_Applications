---
layout: default
title: Hardware Interfaces & PCB/Flex Design
description: Practical reference for PCIe, USB, I2C, Thunderbolt, SPI, UART, HDMI, high-speed PCB and flex layout, signal/power integrity, CAD tools, bring-up, and debug.
---

# Hardware Interfaces & PCB/Flex Design

<div class="intuition"><span class="callout-title">30-second intuition</span>“Proficiency in PCIe, USB, I²C, Thunderbolt, SPI, UART and HDMI” means more than knowing protocol names. You should understand <strong>what signals exist, how the link initializes, what the electrical channel requires, how it is laid out on a PCB/flex, what commonly fails, and how to debug it with instruments and protocol tools</strong>. Strong PCB/flex knowledge means you can turn those interface requirements into stackup, constraints, placement, routing, power delivery, manufacturing data and a board that passes bring-up.</div>

<div class="pathway"><span class="node">interface specification</span><span class="arrow">→</span><span class="node">schematic + constraints</span><span class="arrow">→</span><span class="node">PCB / flex layout</span><span class="arrow">→</span><span class="node">SI/PI + DRC/DFM</span><span class="arrow">→</span><span class="node">bring-up + compliance</span></div>

# Part I — Interface map

## 1. What you should know at a glance

| Interface | Physical style | Main use | Hardware topics to know |
|---|---|---|---|
| **PCIe** | high-speed differential serial lanes | CPU/SoC ↔ GPU, SSD, NIC, accelerator | lanes, LTSSM, equalization, refclk, PERST#, channel loss, retimers |
| **USB** | USB2 differential + SuperSpeed pairs; often USB-C | peripherals, storage, charging, tunneling | USB2 vs USB3/USB4, Type-C, CC, PD, orientation mux, ESD, retimers |
| **Thunderbolt** | high-speed USB-C cable interface | PCIe/DisplayPort/USB tunneling | controllers, USB4 relation, bandwidth, security, PD, cable/retimer design |
| **I²C** | 2-wire open-drain bus | sensors, PMICs, EEPROM, control | pull-ups, capacitance, addressing, ACK/NACK, arbitration, clock stretching |
| **SPI** | synchronous single-ended point-to-point/multi-target | flash, ADC/DAC, RF ICs, displays | CPOL/CPHA, chip-select, timing, edge rate, fanout, termination |
| **UART** | asynchronous TX/RX | debug, GPS, modules, MCU links | baud rate, framing, level standards, clock mismatch |
| **HDMI** | high-speed differential video/audio link | display interface | TMDS/FRL, DDC, HPD, eARC, ESD, connector/launch quality |

---

# Part II — PCI Express

## 2. PCIe architecture

A PCIe link is built from one or more bidirectional serial **lanes**.

Common widths are

$$
x1,quad x2,quad x4,quad x8,quad x16.
$$

Each lane contains a transmit and receive differential pair.

Conceptually,

$$
\boxed{
\text{Transaction Layer}
\rightarrow
\text{Data Link Layer}
\rightarrow
\text{Physical Layer}
\rightarrow
\text{PCB / connector channel}
}
$$

The PHY handles serialization, equalization, clock recovery and lane behavior; the higher layers handle packets, flow control and configuration.

---

## 3. PCIe generations

| Generation | Raw rate per lane | Signaling |
|---|---:|---|
| PCIe 3.0 | 8 GT/s | NRZ |
| PCIe 4.0 | 16 GT/s | NRZ |
| PCIe 5.0 | 32 GT/s | NRZ |
| PCIe 6.x | 64 GT/s | PAM4 + FLIT/FEC |
| PCIe 7.x | 128 GT/s | PAM4 |

PCI-SIG lists **PCI Express Base Specification Revision 7.1** as the current approved base specification as of September 2026.

Official reference: [PCI-SIG PCI Express Specifications](https://pcisig.com/specifications).

---

## 4. Signals you should recognize

Beyond the differential data lanes, a platform may include

- REFCLK;
- PERST#;
- CLKREQ#;
- WAKE#;
- sideband management;
- SMBus/I²C-related management depending on form factor.

For M.2 or add-in cards, the connector specification adds mechanical and power constraints.

---

## 5. Link training

PCIe does not simply begin sending application data after power-up.

The LTSSM moves through states such as

- Detect;
- Polling;
- Configuration;
- Recovery;
- L0;
- low-power states.

A board that enumerates at Gen3 but not Gen5 may have a channel/equalization problem rather than a software problem.

---

## 6. PCIe equalization

At high speed, the channel attenuates high-frequency components.

The link uses combinations of

- transmitter de-emphasis / FFE;
- receiver CTLE;
- DFE;
- link-training coefficient adaptation.

For PCIe 6.0 and later, PAM4 makes vertical noise margin smaller and FEC/FLIT operation becomes part of the architecture.

PCI-SIG's PCIe 6.0 overview documents 64 GT/s, PAM4, FLIT mode and lightweight FEC. [PCIe 6.0 overview](https://pcisig.com/pci-express-6.0-specification).

---

## 7. PCIe PCB layout

Key rules:

- maintain controlled differential impedance;
- keep pair skew small;
- minimize via count;
- avoid long via stubs;
- use backdrilling where needed;
- control connector/BGA breakout discontinuities;
- maintain continuous return paths;
- keep aggressive signals away from the pair;
- budget package + PCB + connector + cable loss together.

The exact target impedance/tolerance comes from the applicable PCIe/CEM/platform specification and stackup.

---

## 8. PCIe debug

Useful tools include

- high-bandwidth oscilloscope;
- BERT;
- TDR/TDT;
- VNA;
- PCIe protocol analyzer;
- link-training/status registers.

Useful questions:

1. Does the device enumerate?
2. At what negotiated generation and width?
3. Is the link down-training?
4. Does Recovery occur repeatedly?
5. Are errors lane-specific?
6. Is the problem channel loss, REFCLK/jitter, power, reset, firmware, or protocol?

---

# Part III — USB and USB Type-C

## 9. USB is not the same as USB-C

**USB-C is a connector system.**

A USB-C port can carry different combinations of

- USB 2.0;
- USB 3.x;
- USB4;
- DisplayPort Alt Mode;
- Thunderbolt;
- USB Power Delivery.

Do not infer speed merely from connector shape.

---

## 10. USB speed families

| Technology | Nominal data rate |
|---|---:|
| USB 2.0 High-Speed | 480 Mb/s |
| USB 3.2 Gen 1 | 5 Gb/s |
| USB 3.2 Gen 2 | 10 Gb/s |
| USB 3.2 Gen 2x2 | 20 Gb/s |
| USB4 | up to 40 Gb/s class |
| USB4 Version 2.0 | 80 Gb/s class with higher asymmetric capability |

The current USB4 Version 2.0 specification was published by USB-IF in April 2026.

Official: [USB4 Specification v2.0](https://www.usb.org/document-library/usb4r-specification-v20).

---

## 11. USB-C signals

Important USB-C pins/signals include

- D+/D− for USB 2.0;
- high-speed TX/RX differential pairs;
- CC1 / CC2;
- SBU1 / SBU2;
- VBUS;
- GND.

The CC pins establish

- cable orientation;
- source/sink role;
- current advertisement;
- Power Delivery communication context.

Current official reference: [USB Type-C Cable and Connector Specification Release 2.5](https://www.usb.org/document-library/usb-type-cr-cable-and-connector-specification-release-25).

---

## 12. USB Power Delivery

USB PD negotiates voltage/current over the Type-C ecosystem.

Board-level considerations include

- PD controller;
- VBUS FETs;
- current sense;
- over-voltage/current protection;
- thermal behavior;
- ESD;
- connector current rating.

High-speed data and high-power delivery coexist physically, so SI, PI and thermal design interact.

---

## 13. USB PCB layout

For SuperSpeed/USB4 paths:

- treat the connector launch as part of the channel;
- maintain differential impedance;
- minimize discontinuities;
- route pairs over continuous references;
- minimize stubs;
- place ESD components so their parasitic capacitance does not destroy the channel;
- use muxes/retimers/redrivers only with a complete loss budget;
- consider cable + connector + board together.

USB2 D+/D− routing is less demanding than USB4 but still benefits from controlled geometry and clean return paths.

---

# Part IV — Thunderbolt

## 14. What Thunderbolt is

Thunderbolt uses the USB-C connector ecosystem and transports high-performance data/display traffic.

Thunderbolt 5 supports USB4 compatibility and can carry

- PCIe traffic;
- DisplayPort;
- USB;
- power through USB-C infrastructure.

Intel specifies Thunderbolt 5 links at up to **80 Gb/s bidirectional**, with bandwidth boost modes reaching **up to 120 Gb/s** in one direction for display-intensive use cases.

Official overview: [Intel Thunderbolt Technology](https://www.intel.com/content/www/us/en/architecture-and-technology/thunderbolt/overview.html).

---

## 15. What matters in a Thunderbolt design

Know the system around the controller:

- USB-C connector;
- Thunderbolt/USB4 controller;
- retimers;
- high-speed muxes;
- DisplayPort inputs;
- PCIe connection to the host;
- PD controller;
- cable identification;
- security / DMA protection;
- certification.

Thunderbolt is therefore a **system integration problem**, not merely four high-speed traces.

---

# Part V — I²C

## 16. Electrical principle

I²C uses two lines:

$$
\boxed{
SDA\quad \text{and}\quad SCL
}
$$

Standard I²C uses open-drain/open-collector signaling.

Devices pull the line LOW; external resistors pull it HIGH.

This allows wired-AND behavior and arbitration.

---

## 17. I²C speed modes

NXP's UM10204 defines:

| Mode | Data rate |
|---|---:|
| Standard-mode | 100 kbit/s |
| Fast-mode | 400 kbit/s |
| Fast-mode Plus | 1 Mbit/s |
| High-speed mode | 3.4 Mbit/s |
| Ultra Fast-mode | 5 Mbit/s, unidirectional |

Official reference: [NXP UM10204 — I²C-bus specification](https://www.nxp.com/docs/en/user-guide/UM10204.pdf).

---

## 18. Pull-up resistor tradeoff

The bus rise time is approximately related to

$$
\tau\sim R_P C_B.
$$

A pull-up that is too large gives slow edges.

A pull-up that is too small requires excessive sink current.

Therefore choose $R_P$ from

- bus capacitance;
- required rise time;
- voltage;
- device sink capability.

---

## 19. I²C protocol concepts

Know

- START / STOP;
- 7-bit and 10-bit addressing;
- read/write direction;
- ACK/NACK;
- repeated START;
- arbitration;
- clock stretching;
- multi-controller behavior.

Common problems are incorrect address, missing pull-ups, wrong voltage level, excessive bus capacitance and a target holding SDA low.

---

# Part VI — SPI

## 20. SPI signals

A typical SPI bus contains

- SCLK;
- MOSI / COPI;
- MISO / CIPO;
- CS#.

SPI is normally push-pull and synchronous.

Unlike I²C, there is no universal central SPI standard defining one maximum speed or one connector.

Always read the **device datasheet**.

---

## 21. CPOL and CPHA

The four common SPI modes are defined from

- clock polarity, CPOL;
- sampling phase, CPHA.

A controller and target using different modes can produce completely plausible-looking clocks but corrupted data.

---

## 22. SPI PCB issues

At low speed SPI behaves like ordinary digital logic.

At fast edge rates it becomes a transmission-line problem.

Watch

- clock ringing;
- long stubs;
- fanout;
- poor return paths;
- overshoot/undershoot;
- source termination;
- chip-select timing.

The **edge rate**, not merely the clock frequency, tells you when SI becomes important.

---

# Part VII — UART

## 23. UART basics

UART is asynchronous.

A typical frame contains

$$
\boxed{
\text{start}
+
\text{data}
+
\text{optional parity}
+
\text{stop}.
}
$$

Both ends must agree on baud rate and framing.

---

## 24. UART is not RS-232

UART describes the logical serial framing/peripheral.

Electrical standards such as

- logic-level CMOS/TTL UART;
- RS-232;
- RS-485;

use different voltage levels and drivers.

Do not connect an MCU UART pin directly to an RS-232 voltage-level interface without a transceiver.

---

## 25. UART debug

Use

- oscilloscope;
- logic analyzer;
- USB-UART adapter.

Check

- idle level;
- voltage compatibility;
- baud;
- start/stop configuration;
- crossed TX/RX;
- ground reference.

---

# Part VIII — HDMI

## 26. HDMI architecture

HDMI transports uncompressed/digitally encoded video and audio plus control/management channels.

Modern HDMI includes

- high-speed video lanes;
- DDC;
- HPD;
- CEC;
- eARC in appropriate products.

Older HDMI generations use TMDS; newer high-rate modes use **Fixed Rate Link (FRL)**.

---

## 27. HDMI 2.2

HDMI Forum released **HDMI 2.2** in June 2025.

Its headline maximum bandwidth is **96 Gb/s**, with higher-resolution/high-refresh display modes and next-generation FRL.

Official overview: [HDMI 2.2 Specification](https://www.hdmi.org/spec/hdmi2).

---

## 28. HDMI board layout

Important concerns include

- differential impedance;
- intra-pair skew;
- lane-to-lane timing;
- connector launch;
- ESD-device capacitance;
- common-mode conversion;
- return-path continuity;
- DDC/HPD pull-ups and level requirements.

For high-rate HDMI, connector region layout and ESD selection can determine whether a nominally correct schematic passes compliance.

---

# Part IX — High-speed PCB design

## 29. Start with stackup

Do not route first and “calculate impedance later.”

The stackup determines

- trace width;
- spacing;
- reference-plane distance;
- propagation velocity;
- loss;
- via geometry;
- manufacturability.

A strong workflow is

$$
\boxed{
\text{fabricator stackup}
\rightarrow
\text{impedance targets}
\rightarrow
\text{routing rules}
\rightarrow
\text{SI verification}.
}
$$

---

## 30. Controlled impedance

For high-speed links, trace geometry and dielectric construction are chosen for a target impedance.

Typical design types:

- single-ended microstrip/stripline;
- edge-coupled differential pair;
- broadside-coupled pair.

Do not copy trace width from another PCB: impedance depends on the actual stackup.

---

## 31. Return current

High-frequency return current flows near the signal path on its reference plane.

A split/gap under a high-speed trace forces the return current to detour, increasing loop inductance and radiation.

Therefore:

> Route high-speed signals over continuous reference planes.

When changing reference planes, provide an intentional return-current transition.

---

## 32. Differential pairs

Important quantities include

- differential impedance;
- common-mode impedance;
- intra-pair skew;
- pair spacing;
- coupling;
- asymmetry.

Avoid obsessing over geometrical symmetry while ignoring the complete electromagnetic channel.

A differential pair still needs a good reference plane.

---

## 33. Length versus delay matching

Equal physical length does not always mean equal electrical delay.

Delay depends on

$$
t_d=\frac{l}{v_p}.
$$

If traces use different layers with different effective permittivity, **time-domain matching** may be more meaningful than simple length matching.

Current KiCad documentation explicitly supports both length- and delay-domain tuning for high-speed nets. [KiCad PCB Editor](https://docs.kicad.org/master/en/pcbnew/pcbnew.html).

---

## 34. Vias and stubs

A via is a 3-D discontinuity containing

- capacitance;
- inductance;
- unused barrel stub;
- antipads;
- coupling to nearby vias.

At high data rates, unused stubs can create resonances.

Mitigations include

- fewer layer transitions;
- blind/buried vias;
- microvias;
- backdrilling;
- optimized antipads.

---

## 35. Connector and BGA breakout

The hardest part of a channel is often not the long uniform trace.

Pay special attention to

- BGA escape;
- neck-down;
- via fields;
- connector pads;
- connector transition;
- ESD footprint;
- AC coupling capacitor footprints.

These localized discontinuities can dominate return loss.

---

## 36. Crosstalk

Coupling increases with

- long parallel routing;
- small spacing;
- weak reference-plane coupling;
- large edge rate.

Mitigate through

- spacing;
- orthogonal routing on adjacent signal layers;
- solid references;
- layer assignment;
- shorter parallel run length.

---

## 37. Via stubs and backdrilling

Backdrilling removes unused plated-through-hole barrel beneath the active signal transition.

It is common in

- PCIe;
- high-speed Ethernet;
- SerDes;
- high-rate storage/server boards.

It should be designed together with PCB fabrication capability and residual-stub limits.

---

# Part X — Power integrity

## 38. Decoupling

A digital IC draws transient current.

The PDN must provide low impedance over the relevant frequency range.

A basic target is

$$
\boxed{
Z_{target}=\frac{\Delta V_{allow}}{\Delta I}.
}
$$

Use

- plane capacitance;
- local MLCCs;
- bulk capacitors;
- appropriate VRM control.

Do not select decoupling only by nominal capacitance; ESL/ESR and placement matter.

---

## 39. Power rails for high-speed interfaces

High-speed PHYs often have separate

- analog;
- PLL;
- core;
- I/O;
- termination

supplies.

Noise coupling into PLL/CDR/SerDes rails can become jitter.

The PCB layout must therefore connect SI and PI thinking.

---

# Part XI — Flex and rigid-flex

## 40. Why use flex

Flex is used when the product needs

- folding;
- compact 3-D packaging;
- reduced connector count;
- motion;
- weight reduction;
- reliable interconnection between rigid regions.

A **rigid-flex** design combines rigid PCB regions and flexible interconnect in one fabricated structure.

---

## 41. Static versus dynamic flex

Two very different cases:

### Flex-to-install

Bent during assembly and then mostly stationary.

### Dynamic flex

Repeatedly moves during product life.

Dynamic flex requires substantially more conservative mechanical design.

IPC-6013 distinguishes installation-use and continuous-flex usage classes.

---

## 42. Flex layout rules

Good practice includes

- avoid vias in bend regions;
- avoid component pads in bend zones;
- route conductors roughly perpendicular to the bend axis;
- avoid abrupt width changes;
- use smooth transitions;
- use teardrops where appropriate;
- stagger traces in multilayer flex where the stackup requires it;
- coordinate coverlay openings and stiffeners;
- respect fabricator minimum bend radius.

Never choose a universal bend-radius rule without the material stackup and fabrication process.

---

## 43. Flex copper and materials

Flex constructions commonly use polyimide and may use rolled-annealed copper for improved repeated-flex behavior.

Important mechanical/electrical parameters include

- copper thickness;
- dielectric thickness;
- adhesive;
- coverlay;
- stiffener;
- bend radius;
- grain direction;
- impedance through the flex region.

A high-speed rigid-flex link must preserve both **mechanical reliability and electrical impedance**.

---

## 44. Flex standards

Two standards worth recognizing are

- **IPC-2223** — design standard for flexible/rigid-flex printed boards;
- **IPC-6013** — qualification and performance requirements for flex/rigid-flex boards.

IPC explicitly identifies IPC-2223 for flexible/rigid-flex design and IPC-6013 for qualification/performance.

Official references:

- [IPC-2223D overview](https://www.ipc.org/TOC/IPC-2223D.pdf)
- [IPC-6013D overview](https://www.ipc.org/TOC/IPC-6013D.pdf)

Always check the revision required by your organization or fabricator.

---

# Part XII — PCB design workflow

## 45. Schematic capture

A strong schematic includes

- clear power hierarchy;
- interface grouping;
- readable net names;
- decoupling intent;
- termination values;
- test points;
- pull-ups/pull-downs;
- reset/boot straps;
- connector pin mapping.

The schematic should communicate design intent, not merely connectivity.

---

## 46. Library quality

For each component verify

- schematic symbol;
- footprint;
- pin mapping;
- courtyard;
- assembly outline;
- solder-mask/paste geometry;
- 3-D model;
- manufacturer part number.

One bad footprint can invalidate an otherwise perfect circuit.

---

## 47. Constraint management

Create constraints before detailed routing.

Examples:

- impedance classes;
- differential pairs;
- max via count;
- length/delay matching;
- spacing;
- high-current width;
- sensitive analog keepouts;
- flex bend zones;
- component height limits.

Professional PCB design is heavily **constraint-driven**.

---

## 48. Placement

Placement determines most of the eventual routing quality.

Prioritize

1. connectors;
2. processors/FPGAs/SoCs;
3. memories;
4. SerDes/PHY devices;
5. regulators;
6. clocks;
7. decoupling;
8. remaining support circuitry.

Place the topology before drawing traces.

---

## 49. Routing order

A useful priority is

1. clocks / reference;
2. highest-speed serial interfaces;
3. DDR/source-synchronous memory;
4. sensitive analog/RF;
5. power;
6. lower-speed digital/control.

The exact order depends on system architecture, but not all nets are equal.

---

## 50. Fabrication outputs

Know how to generate/review

- Gerber or ODB++ / IPC-2581;
- NC drill;
- stackup;
- fabrication drawing;
- assembly drawing;
- pick-and-place;
- BOM;
- netlist;
- impedance coupons/requirements;
- flex bend/stiffener/coverlay documentation.

A PCB is not finished when routing ends; it is finished when fabrication and assembly intent is unambiguous.

---

# Part XIII — CAD tools

## 51. Altium Designer

Common in product-development teams.

Know

- schematic;
- PCB editor;
- constraint manager;
- layer-stack manager;
- differential routing;
- length tuning;
- 3-D/mechanical view;
- rigid-flex regions;
- outputs/OutJob.

Altium's current rigid-flex documentation covers substacks, board regions and bend definitions. [Altium rigid-flex design](https://www.altium.com/documentation/altium-designer/pcb/rigid-flex-design).

---

## 52. Cadence OrCAD / Allegro

Widely used for complex/high-speed commercial electronics.

Important concepts include

- Capture/OrCAD schematic flow;
- Allegro PCB Editor;
- Constraint Manager;
- differential-pair rules;
- timing/length constraints;
- high-density routing;
- SI/PI integration with Sigrity.

The skill that transfers between CAD packages is **constraint-driven board design**, not memorizing menu locations.

---

## 53. Siemens Xpedition

Xpedition targets high-density and advanced PCB systems.

Siemens describes current Xpedition Advanced capabilities including

- high-speed constraints;
- routing automation;
- rigid-flex design;
- integrated SI;
- ECAD/MCAD collaboration;
- manufacturing documentation.

Official: [Siemens Xpedition Advanced](https://www.siemens.com/en-us/products/pcb/xpedition/advanced/).

Rigid-flex reference: [Siemens Xpedition rigid-flex design](https://www.siemens.com/en-us/products/pcb/engineering-productivity-and-efficiency/advanced-design/rigid-flex-pcb-design/).

---

## 54. KiCad

KiCad is a capable open-source PCB platform.

Its PCB editor supports

- differential pairs;
- custom DRC rules;
- length tuning;
- differential skew tuning;
- time-domain delay tuning;
- interactive routing;
- 3-D inspection.

Official: [KiCad PCB Editor](https://docs.kicad.org/master/en/pcbnew/pcbnew.html).

---

## 55. SI/PI and electromagnetic tools

CAD layout is only one layer.

Useful analysis tools include

- **Cadence Sigrity** — PCB/package SI/PI;
- **Siemens HyperLynx** — SI/PI and high-speed verification;
- **Ansys SIwave** — board/package SI/PI;
- **Ansys HFSS** — 3-D full-wave structures, vias, connectors;
- **Keysight ADS** — channel, RF/microwave and SerDes analysis.

Know what problem requires 2-D/3-D extraction versus a simple transmission-line model.

---

# Part XIV — Bring-up and debug

## 56. Board bring-up order

A disciplined sequence is

$$
\boxed{
\text{shorts}
\rightarrow
\text{power rails}
\rightarrow
\text{clocks}
\rightarrow
\text{reset}
\rightarrow
\text{JTAG/debug}
\rightarrow
\text{low-speed buses}
\rightarrow
\text{high-speed links}.
}
$$

Do not begin by blaming PCIe if the PHY PLL supply is wrong.

---

## 57. Instruments you should be comfortable with

| Instrument | Use |
|---|---|
| DMM | rails, resistance, continuity |
| Oscilloscope | clocks, power noise, eye/jitter, signal quality |
| Logic analyzer | I²C/SPI/UART/protocol timing |
| TDR/TDT | impedance/discontinuities |
| VNA | channel S-parameters |
| BERT | BER/jitter tolerance |
| Protocol analyzer | PCIe/USB/Thunderbolt transaction/link debug |
| Current probe | rail/load/transient behavior |

---

## 58. Common failure patterns

### PCIe

- trains at lower generation;
- narrower negotiated width;
- repeated Recovery;
- lane-specific errors.

### USB / Thunderbolt

- orientation-specific failure;
- USB2 works but SuperSpeed fails;
- device falls back to lower speed;
- PD works but data does not;
- marginal cable/connector behavior.

### I²C

- SDA stuck low;
- wrong address;
- missing ACK;
- slow rise time;
- level mismatch.

### SPI

- incorrect CPOL/CPHA;
- setup/hold violation;
- clock ringing;
- wrong CS timing.

### UART

- wrong baud;
- TX/RX not crossed;
- wrong voltage standard;
- framing error.

### HDMI

- low-rate video works, high-rate fails;
- display detection/EDID failure;
- HPD/DDC issue;
- ESD/connector loss limiting FRL.

---

# Part XV — What “proficiency” should mean

## 59. Interface proficiency

You should be able to explain for each interface:

- electrical topology;
- clocking;
- initialization/training;
- speed generations;
- power/sideband signals;
- PCB constraints;
- compliance metrics;
- likely failure modes;
- debug approach.

---

## 60. PCB/flex proficiency

You should be able to

- read and create a stackup;
- define controlled-impedance rules;
- route differential pairs;
- manage length/delay constraints;
- understand return paths;
- review via/connector discontinuities;
- design a PDN and decoupling strategy;
- create flex bend/stiffener/coverlay constraints;
- perform DRC;
- review fabrication/assembly outputs;
- work with a PCB fabricator;
- correlate board measurements with SI simulation.

---

## 61. Interview-level summary

A strong answer to “Do you know PCIe/USB/I²C/SPI/UART/HDMI and PCB layout?” should connect protocol and physical design:

> A digital interface is only reliable when its protocol, PHY, clocking, power, connector and PCB channel are designed together. For high-speed interfaces I treat the package, vias, traces, connectors and cable as one channel, define stackup/impedance and loss constraints before routing, and validate with SI tools and measurements. For low-speed buses I still check voltage levels, pull-ups, timing and edge integrity. For flex/rigid-flex I add mechanical bend, coverlay, stiffener and fabrication constraints to the electrical design.

---

# Part XVI — Official and practical references

## 62. Interface specifications

- [PCI-SIG — PCI Express specifications](https://pcisig.com/specifications)
- [PCI Express Base Specification overview](https://pcisig.com/specification-overview/pci-express-base)
- [USB-IF — USB4 Specification v2.0](https://www.usb.org/document-library/usb4r-specification-v20)
- [USB-IF — USB Type-C specification](https://www.usb.org/usb-type-cr-cable-and-connector-specification)
- [NXP UM10204 — I²C-bus specification](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)
- [Intel — Thunderbolt Technology](https://www.intel.com/content/www/us/en/architecture-and-technology/thunderbolt/overview.html)
- [HDMI — HDMI 2.2 Specification overview](https://www.hdmi.org/spec/hdmi2)

SPI and UART are implemented across many device families rather than governed by one single modern public specification; use the controller/target device datasheets for timing and electrical limits.

## 63. PCB / flex references

- [IPC-2223D — Flexible/Rigid-Flexible Printed Board Design](https://www.ipc.org/TOC/IPC-2223D.pdf)
- [IPC-6013D — Flexible/Rigid-Flexible Board Qualification and Performance](https://www.ipc.org/TOC/IPC-6013D.pdf)
- [Altium — Rigid-Flex Design](https://www.altium.com/documentation/altium-designer/pcb/rigid-flex-design)
- [Siemens — Xpedition Advanced](https://www.siemens.com/en-us/products/pcb/xpedition/advanced/)
- [KiCad PCB Editor](https://docs.kicad.org/master/en/pcbnew/pcbnew.html)

---

## 64. Related pages

[Signal Integrity & Power Integrity](../signal-power-integrity/) · [High-Speed SerDes & IO](../high-speed-serdes/) · [Silicon Interfaces & SoC](../silicon-soc/) · [ADC & DAC](../data-converters/) · [Arduino Boards](../arduino/) · [Measurements & Instruments](../measurements/)
