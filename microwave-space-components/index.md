---
layout: default
title: Microwave & Space Electronics Components
description: Practical component reference for microwave/RF and space systems, covering receiver and transmitter chains, frequency conversion, filters, beamforming, clocks, data converters, waveguide hardware, power electronics, semiconductor technologies, radiation effects, and space qualification.
---

# Microwave & Space Electronics Components

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:SDR_HackRF_one_PCB.jpg"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/SDR_HackRF_one_PCB.jpg?width=1200" alt="RF transceiver PCB containing RF front end, mixer, PLL/VCO, ADC/DAC, digital logic and connectors." loading="lazy"></a>
  <figcaption>A compact RF transceiver board illustrates how mixers, oscillators, PLLs, ADC/DAC, RF front-end components, digital control, and interconnect coexist in a real microwave signal chain. <a href="https://commons.wikimedia.org/wiki/File:SDR_HackRF_one_PCB.jpg">Image source: Wikimedia Commons, Wdwd, CC BY-SA 4.0</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>A microwave or space RF system is built from a surprisingly repeatable set of components. <strong>LNAs protect sensitivity; mixers move frequency; oscillators and PLLs create coherent references; filters reject unwanted energy; PAs/TWTAs create transmit power; switches, couplers, phase shifters and attenuators route/control RF; ADCs/DACs connect the RF world to DSP; and space qualification determines whether all of it survives radiation, thermal cycling and long mission life.</strong></div>

<div class="pathway"><span class="node">antenna</span><span class="arrow">→</span><span class="node">filter / limiter</span><span class="arrow">→</span><span class="node">LNA</span><span class="arrow">→</span><span class="node">mixer / converter</span><span class="arrow">→</span><span class="node">ADC / modem / DSP</span></div>

<div class="pathway"><span class="node">DSP / modem / DAC</span><span class="arrow">→</span><span class="node">upconverter</span><span class="arrow">→</span><span class="node">driver + PA / TWTA</span><span class="arrow">→</span><span class="node">filter / switch / diplexer</span><span class="arrow">→</span><span class="node">antenna</span></div>

A useful starting reference is Baljit Chandhoke's *Microwave Journal* article [RF Signal Chain and Components for Space-Based Satcom Applications](https://www.microwavejournal.com/articles/42156-rf-signal-chain-and-components-for-space-based-satcom-applications), which organizes the RF transmitter and receiver around the same building blocks described here.

---

# 1. Core component map

| Component | Main job | Parameters you should recognize |
|---|---|---|
| **LNA** | amplify weak received signal with minimal added noise | NF, gain, $P_{1dB}$, IIP3, stability |
| **PA / SSPA** | create RF transmit power | $P_{sat}$, $P_{1dB}$, gain, PAE, linearity, thermal resistance |
| **TWTA** | very high RF/microwave power in space | output power, efficiency, gain, lifetime, EPC/high-voltage requirements |
| **Driver amplifier** | drive final PA/TWTA | gain, linearity, output level |
| **Mixer** | translate RF ↔ IF/baseband | conversion loss/gain, IIP3, isolation, LO drive, image response |
| **Filter** | select wanted spectrum / reject unwanted signals | insertion loss, rejection, bandwidth, Q, group delay |
| **Diplexer / duplexer / multiplexer** | separate/combine frequency bands | isolation, insertion loss, power handling, group delay |
| **Switch** | route RF paths | insertion loss, isolation, switching time, power handling |
| **Circulator / isolator** | route or absorb reverse power | insertion loss, isolation, VSWR, power |
| **Limiter** | protect receiver from large signals | limiting threshold, leakage, recovery, power handling |
| **Attenuator / DSA** | control signal level | attenuation range, step size, phase variation, linearity |
| **Phase shifter** | control RF phase | phase range, resolution, insertion loss, RMS error |
| **Beamformer IC** | amplitude/phase control for arrays | channels, gain/phase resolution, NF, linearity, power |
| **Power divider / combiner** | split/combine RF power | loss, isolation, amplitude/phase balance |
| **Directional coupler** | sample forward/reverse power | coupling, directivity, insertion loss |
| **Hybrid coupler** | equal split with defined phase | amplitude balance, phase balance, isolation |
| **VCO / oscillator** | create RF reference | tuning range, phase noise, pushing/pulling |
| **PLL / synthesizer** | lock/tune RF frequency | phase noise, spurs, lock time, step size |
| **OCXO / TCXO / CSAC** | stable frequency/time reference | stability, aging, radiation tolerance, phase noise |
| **Frequency multiplier/divider** | generate related frequencies | conversion loss/gain, phase noise multiplication |
| **Detector / log detector** | measure RF power/amplitude | dynamic range, response time, accuracy |
| **ADC / DAC** | RF/IF ↔ digital conversion | sample rate, ENOB, SFDR, jitter, power |
| **FPGA / ASIC / RFSoC** | digital modem, beamforming, control | throughput, interfaces, radiation strategy |
| **Waveguide / coax / connector** | carry microwave energy | loss, power, mode, VSWR, multipaction margin |
| **Antenna feed / OMT / polarizer** | couple RF into desired polarization/mode | isolation, axial ratio, return loss, bandwidth |
| **DC-DC / LDO / POL regulator** | power the RF electronics | efficiency, ripple, PSRR, radiation, EMI |
| **Transponder** | integrated receive/command/track/transmit function | coherent/noncoherent operation, turnaround ratio, bands, ranging |
| **Modem** | modulation, coding, framing | data rate, coding gain, EVM, latency |

---

# 2. Low-noise amplifier (LNA)

The LNA is usually the first active device in a receiver.

Its job is to provide gain before noisier downstream components.

For a cascade,

$$
F_{total}
=
F_1+
\frac{F_2-1}{G_1}
+
\frac{F_3-1}{G_1G_2}
+\cdots.
$$

Thus first-stage LNA noise figure and gain strongly determine receiver sensitivity.

### Important specifications

- noise figure (NF);
- gain;
- gain flatness;
- input/output return loss;
- $P_{1dB}$;
- IIP3/OIP3;
- stability factor;
- DC power;
- radiation and temperature behavior for space.

*Microwave Journal* emphasizes LNA noise figure as one of the defining receiver parameters in its [space satcom signal-chain article](https://www.microwavejournal.com/articles/42156-rf-signal-chain-and-components-for-space-based-satcom-applications).

---

# 3. Power amplifier (PA) and SSPA

The PA creates the final RF output power.

Typical semiconductor technologies include

- GaAs;
- GaN;
- silicon LDMOS at lower microwave bands;
- integrated MMIC architectures.

Key quantities include

$$
PAE
=
\frac{P_{RF,out}-P_{RF,in}}{P_{DC}}.
$$

and

$$
P_{1dB},\qquad P_{sat},\qquad OIP3.
$$

### Why GaN matters

GaN offers high breakdown voltage and high RF power density. *Microwave Journal* has repeatedly highlighted GaN-on-SiC for satellite PAs because it can reduce amplifier size and power consumption while maintaining high RF output.

See:

- [GaN SSPA Technology for Space-Based Applications](https://www.microwavejournal.com/articles/31995-gan-sspa-technology-for-space-based-applications)
- [Linear Ka-Band GaN-on-SiC MMIC for Satcom Terminals](https://www.microwavejournal.com/articles/37114-linear-ka-band-gan-on-sic-mmic-for-satcom-terminals)

---

# 4. Traveling-wave-tube amplifier (TWTA)

TWTAs remain important in spacecraft where very high microwave output power and efficiency are needed.

NASA describes the TWTA as a microwave vacuum-tube amplifier in which an RF wave interacts with an electron beam traveling along the tube.

A spacecraft chain may be

$$
\text{exciter}
\rightarrow
\text{TWTA}
\rightarrow
\text{waveguide switch}
\rightarrow
\text{HGA}.
$$

The NASA Roman Space Telescope, for example, uses a TWTA to create the high RF output power required for its Ka-band science downlink.

### Know these concepts

- helix TWT;
- electron gun;
- slow-wave structure;
- collector;
- electronic power conditioner (EPC);
- gain and saturation;
- efficiency;
- lifetime;
- high-voltage design.

NASA continues to develop higher-efficiency Ka-band TWTAs for long-range space telecommunications.

---

# 5. Mixer and frequency converter

A mixer multiplies two signals and creates sum/difference frequencies:

$$
f_{IF}=|f_{RF}-f_{LO}|.
$$

The same component can perform

- downconversion;
- upconversion;
- image-reject conversion;
- I/Q conversion.

### Specifications

- conversion loss/gain;
- LO drive;
- RF/LO/IF isolation;
- IIP3;
- $P_{1dB}$;
- noise figure;
- spurious products.

*Microwave Journal* discusses practical I/Q and image-reject mixer architectures in [Implementing I/Q, Single Sideband and Image Reject Mixers](https://www.microwavejournal.com/articles/26068-implementing-iq-single-sideband-and-image-reject-mixers).

---

# 6. Filters

Filters control where RF energy is allowed to propagate.

Types include

- low-pass;
- high-pass;
- band-pass;
- band-stop/notch;
- cavity;
- waveguide;
- microstrip;
- SAW/BAW;
- tunable RFIC filters.

Important specifications are

$$
IL,\quad RL,\quad BW,\quad Q,\quad \tau_g.
$$

where $\tau_g$ is group delay.

In a receiver, filter loss before the LNA directly degrades noise figure.

In a transmitter, filtering suppresses

- harmonics;
- mixer products;
- broadband PA noise;
- adjacent-channel emissions.

The *Microwave Journal* article [SOI RFIC Tunable Filters Improve Phased Array System Performance](https://www.microwavejournal.com/articles/38328-soi-rfic-tunable-filters-improve-phased-array-system-performance) is a useful example of the trade between filter loss, LNA gain, receiver NF and front-end power.

---

# 7. Diplexers, duplexers, IMUX and OMUX

These are especially important in satellite payloads.

### Diplexer

Combines/separates two frequency bands onto a common path.

### Duplexer

Allows transmit and receive functions to share an antenna while providing isolation.

### IMUX

**Input multiplexer** separates incoming satellite channels.

### OMUX

**Output multiplexer** combines high-power amplified channels before the antenna.

Know

- channel isolation;
- insertion loss;
- group delay;
- power handling;
- multipaction;
- thermal stability.

A useful *Microwave Journal* reference is [Transceiver Duplexer Design Considerations](https://www.microwavejournal.com/articles/6962-transceiver-duplexer-design-considerations).

---

# 8. RF switches

Common implementations include

- PIN-diode switches;
- GaAs pHEMT;
- SOI/SOS RFIC;
- MEMS switches;
- electromechanical/coaxial switches;
- ferrite waveguide switches.

Important specifications:

- insertion loss;
- isolation;
- switching time;
- linearity;
- hot-switching capability;
- power handling;
- control voltage/current.

In spacecraft, waveguide transfer switches can provide redundant routing between transmitters and multiple antennas.

---

# 9. Circulators and isolators

A circulator is a nonreciprocal device:

$$
1\rightarrow2,\qquad
2\rightarrow3,\qquad
3\rightarrow1.
$$

If one port is terminated, it becomes an isolator.

Uses include

- protecting a PA from reflected power;
- Tx/Rx routing;
- stabilizing amplifier load impedance;
- protecting sensitive receivers.

Key parameters:

- isolation;
- insertion loss;
- VSWR;
- bandwidth;
- power handling.

*Microwave Journal* discusses their role in [Duplexer Considerations for X-Band T/R Modules](https://www.microwavejournal.com/articles/2970-duplexer-considerations-for-x-band-t-r-modules).

---

# 10. RF limiter / receiver protector

A limiter protects the receiver front end from large RF power.

Typical technologies include

- PIN diodes;
- Schottky diodes;
- GaAs/GaN limiter structures.

Know

- limiting threshold;
- flat leakage;
- spike leakage;
- recovery time;
- insertion loss;
- survival power.

A limiter often appears directly ahead of the LNA in radar, EW and shared-antenna systems.

---

# 11. Attenuators and DSAs

An attenuator provides a known RF loss.

A **digital step attenuator (DSA)** allows programmable gain control.

Important metrics:

- attenuation range;
- LSB/step size;
- RMS attenuation error;
- insertion loss;
- phase variation;
- IP3;
- power handling.

Space-qualified RFIC attenuators are attractive because they can replace larger discrete networks and support digital calibration.

---

# 12. Phase shifters

Phase shifters control

$$
\phi
$$

without ideally changing signal amplitude.

They are central to

- phased arrays;
- vector modulators;
- cancellation loops;
- calibration.

Important specifications:

- phase range;
- phase resolution;
- RMS phase error;
- insertion loss;
- amplitude variation;
- bandwidth.

---

# 13. Beamformer IC and T/R module

A modern phased-array channel may contain

$$
\boxed{
\text{switch}
+
\text{LNA}
+
\text{PA}
+
\text{phase shifter}
+
\text{attenuator}
}
$$

around each antenna element or small subarray.

*Microwave Journal* describes planar array front ends built around **PAs, LNAs and beamformers** in [Overcoming Planar Phased Array Circuit Design Challenges](https://www.microwavejournal.com/articles/39773-overcoming-planar-phased-array-circuit-design-challenges).

A beamformer IC may integrate

- phase control;
- gain control;
- T/R switching;
- channel calibration;
- telemetry.

---

# 14. Power dividers and combiners

Common types include

- Wilkinson;
- resistive;
- reactive;
- corporate feed;
- high-power combiners.

For an ideal equal two-way split,

$$
P_{out,each}=\frac{P_{in}}{2}
$$

before dissipative losses.

Know

- insertion loss;
- isolation;
- amplitude balance;
- phase balance;
- power handling.

---

# 15. Directional couplers

A directional coupler samples a known fraction of forward or reverse traveling power.

Applications:

- power monitoring;
- VSWR/reflection measurement;
- feedback loops;
- test ports.

Important metrics:

- coupling factor;
- directivity;
- insertion loss;
- return loss;
- frequency flatness.

---

# 16. Hybrid couplers

A 90° or 180° hybrid splits signals with a known phase relationship.

They appear in

- balanced amplifiers;
- image-reject mixers;
- IQ modulators;
- monopulse receivers;
- power combiners.

The key specifications are amplitude and phase balance.

---

# 17. VCO, DRO and YIG oscillator

### VCO

Voltage tunes oscillator frequency.

### DRO

Uses a dielectric resonator for low-noise microwave oscillation.

### YIG oscillator

Uses a magnetically tuned ferrimagnetic resonator for wide tuning and good spectral purity.

Important quantities include

- frequency range;
- phase noise;
- tuning sensitivity;
- pushing;
- pulling;
- harmonic content.

---

# 18. PLL and frequency synthesizer

A typical PLL contains

$$
\boxed{
\text{reference}
\rightarrow
\text{phase-frequency detector}
\rightarrow
\text{loop filter}
\rightarrow
\text{VCO}
\rightarrow
\text{divider}.
}
$$

A synthesizer generates many coherent frequencies from one reference.

Know

- phase noise;
- reference spurs;
- fractional-N spurs;
- loop bandwidth;
- lock time;
- frequency resolution.

Phase noise matters because it directly affects

- EVM;
- reciprocal mixing;
- radar coherence;
- Doppler/ranging accuracy.

---

# 19. Stable frequency references

Space systems may use

- TCXO;
- OCXO;
- ultra-stable quartz oscillator (USO);
- chip-scale atomic clock (CSAC);
- rubidium or other atomic references in demanding systems.

Important quantities:

- Allan deviation;
- aging;
- temperature coefficient;
- phase noise;
- radiation sensitivity;
- holdover.

*Microwave Journal* has reported space-qualified crystal oscillators designed for high total-dose tolerance and precision frequency control.

---

# 20. Frequency multipliers and dividers

A multiplier generates

$$
f_{out}=Nf_{in}.
$$

Ideally, phase noise increases approximately by

$$
20\log_{10}N
$$

in dB when frequency is multiplied by $N$.

Dividers can improve phase noise referred to the lower output frequency.

These blocks are common in microwave LO chains.

---

# 21. Detectors and log amplifiers

RF detectors convert RF amplitude/power into a low-frequency voltage or digital measurement.

Types include

- diode detectors;
- RMS detectors;
- logarithmic detectors;
- detector/controller loops.

Applications include

- PA power monitoring;
- AGC;
- telemetry;
- fault detection;
- calibration.

---

# 22. Modulators and demodulators

Common forms include

- I/Q modulator;
- vector modulator;
- BPSK/QPSK modulator;
- direct-conversion transceiver.

They connect complex baseband

$$
I(t)+jQ(t)
$$

to an RF carrier.

Important impairments include

- I/Q gain mismatch;
- quadrature phase error;
- LO leakage;
- DC offset;
- EVM.

---

# 23. ADC and DAC

For the dedicated high-speed converter reference—including direct-RF sampling/synthesis, jitter limits, ENOB/SFDR, JESD204, ADC/DAC architectures and measurement—see [ADC & DAC — Data Converters](../data-converters/).

Modern microwave systems increasingly digitize closer to the antenna.

Important ADC metrics:

- sample rate;
- analog input bandwidth;
- ENOB;
- SNR;
- SFDR;
- aperture jitter.

For a sine-wave input, clock jitter limits SNR approximately as

$$
SNR_{jitter}
\approx
-20\log_{10}(2\pi f_{in}\sigma_t).
$$

Important DAC metrics include

- sample rate;
- SFDR;
- output bandwidth;
- interpolation;
- noise spectral density.

*Microwave Journal* discusses the increasing use of direct ADC/DAC and integrated transceivers in [Integrated Transceivers Simplify Design, Improve Phased Array Radar Performance](https://www.microwavejournal.com/articles/33312-integrated-transceivers-simplify-design-improve-phased-array-radar-performance).

---

# 24. FPGA, ASIC, RFSoC and DSP

The digital side handles

- modulation/demodulation;
- FEC;
- filtering;
- digital down/upconversion;
- beamforming;
- packet handling;
- encryption;
- telemetry;
- calibration.

For space, the choice also depends on

- radiation tolerance;
- configuration upset behavior;
- redundancy;
- scrubbing;
- power.

---

# 25. Transponder

A spacecraft transponder integrates much of the communication chain.

NASA describes spacecraft transponders as combined receive/transmit electronics that can

- acquire an uplink;
- track it with a PLL;
- demodulate command data;
- derive a coherent frequency reference;
- generate a downlink.

Deep-space transponders may support coherent turnaround for precise Doppler/ranging measurements.

See NASA's [Onboard Systems — Telecommunications Subsystems](https://science.nasa.gov/learn/basics-of-space-flight/chapter11-2/).

---

# 26. Exciter

An exciter generates the low-power modulated RF signal that is later amplified.

It may contain

- reference oscillator;
- synthesizer;
- modulator;
- DAC;
- IF/RF conversion;
- filtering.

The exciter's spectral purity contributes directly to transmitter EVM and phase noise.

---

# 27. Waveguide

At microwave and millimeter-wave frequencies, waveguide is often preferred for high-power, low-loss routing.

Know

- TE/TM modes;
- cutoff frequency;
- flange types;
- insertion loss;
- bends/twists;
- pressurization;
- power handling;
- multipaction in space.

For rectangular waveguide,

$$
f_{c,10}
=
\frac{c}{2a\sqrt{\epsilon_r}}.
$$

---

# 28. Coaxial cable and connectors

Common microwave interfaces include

- SMA;
- 3.5 mm;
- 2.92 mm (K);
- 2.4 mm;
- 1.85 mm (V);
- SMP/SMPM;
- TNC/N in lower-frequency rugged systems.

Know

- upper usable frequency;
- mode-free operation;
- repeatability;
- return loss;
- torque;
- power handling.

Connector transitions can dominate high-frequency measurement uncertainty.

---

# 29. Antenna feed, horn, OMT and polarizer

Space antennas often include more RF hardware than the reflector itself.

### Feed horn

Illuminates a reflector.

### OMT

Orthomode transducer separates two orthogonal polarizations.

### Polarizer

Converts linear ↔ circular polarization.

### Feed network

Routes multiple frequencies/polarizations.

Important specifications include

- return loss;
- isolation;
- axial ratio;
- cross-polarization;
- insertion loss.

---

# 30. Switch matrices and RF distribution units

Spacecraft with redundant radios and several antennas need routing networks.

An RF distribution unit may include

- transfer switches;
- diplexers;
- couplers;
- loads;
- waveguide;
- coax.

NASA/JPL spacecraft frequently use commandable waveguide switches to select the active antenna and amplifier path.

---

# 31. DC-DC converters

Space electronics rarely operate directly from the spacecraft bus voltage.

DC-DC converters create local rails.

Important quantities:

- efficiency;
- ripple;
- switching frequency;
- conducted/radiated EMI;
- transient response;
- radiation tolerance;
- fault behavior.

A 2026 *Microwave Journal* article, [Radiation-Hardened Space-Based Power Systems](https://www.microwavejournal.com/articles/45215-radiation-hardened-space-based-power-systems), emphasizes that switching-supply noise can directly degrade sensitive RF systems.

---

# 32. LDO regulators

LDOs are useful for low-noise local rails.

Important specifications include

- PSRR;
- output noise;
- dropout;
- load transient;
- radiation;
- temperature.

A common architecture is

$$
\text{DC-DC}
\rightarrow
\text{LDO}
\rightarrow
\text{PLL/LNA/ADC}.
$$

This combines conversion efficiency with local noise cleanup.

---

# 33. Semiconductor technologies to recognize

## GaAs

Strong for

- LNAs;
- mixers;
- switches;
- phase shifters;
- medium-power PAs.

## GaN

Strong for

- high-power PA;
- SSPA;
- radar;
- high-power satcom.

## SiGe BiCMOS

Useful when high-frequency analog and dense digital/control integration must coexist.

## RF SOI / SOS

Strong for

- switches;
- attenuators;
- tuners;
- integrated RF control.

## CMOS

Excellent for high integration and digital-heavy RF transceivers.

## InP

Used for very high frequency and very low-noise mmWave/THz applications.

The right technology is chosen by frequency, noise, output power, linearity, integration, radiation, cost and thermal requirements.

---

# 34. MMIC

A monolithic microwave integrated circuit implements several microwave functions on one semiconductor die.

Examples:

- PA;
- LNA;
- mixer;
- phase shifter;
- switch;
- attenuator;
- multifunction core chip.

MMICs reduce

- size;
- interconnect parasitics;
- assembly complexity.

But they introduce new concerns around

- thermal density;
- package transitions;
- yield;
- radiation qualification.

---

# 35. Packaging

Microwave packaging is part of the circuit.

Packages may include

- plastic QFN;
- ceramic QFN;
- hermetic ceramic;
- metal housing;
- bare die / chip-and-wire;
- LTCC;
- multichip modules.

Important effects include

- bond-wire inductance;
- package resonance;
- grounding;
- thermal path;
- cavity modes;
- outgassing;
- hermeticity.

Space applications often favor ceramic, metal and hermetic approaches when reliability or power dissipation justifies them.

---

# 36. Thermal design

A PA can be electrically excellent and still fail as a product because of junction temperature.

A basic thermal estimate is

$$
T_j
=
T_{case}
+
P_{diss}\theta_{JC}.
$$

In vacuum there is no convective cooling.

Heat must be moved by

- conduction;
- heat pipes/straps;
- spacecraft structure;
- radiation to space.

This makes RF efficiency directly related to spacecraft thermal mass.

---

# 37. Radiation effects

Space components must be evaluated for several radiation mechanisms.

### Total ionizing dose (TID)

Long-term accumulated ionizing exposure changes transistor/device parameters.

### Single-event upset (SEU)

A particle changes logic state.

### Single-event latchup (SEL)

A parasitic structure enters a high-current state.

### Single-event burnout (SEB)

A destructive high-energy event, especially important in power devices.

### Displacement damage

Particles physically damage the semiconductor lattice.

Radiation tolerance must be specified for the actual orbit and mission duration.

---

# 38. Space reliability and screening

Useful concepts include

- MIL-STD-883;
- MIL-PRF-38535;
- MIL-PRF-38534;
- NASA EEE-INST-002;
- lot qualification;
- burn-in;
- temperature cycling;
- hermeticity;
- derating.

The 2024 *Microwave Journal* space signal-chain article emphasizes reliability, packaging and radiation as first-order component-selection criteria.

---

# 39. Redundancy

Space communication chains commonly use redundant equipment.

Examples:

- two transponders;
- two PAs/TWTAs;
- cross-strapped receivers;
- multiple antennas;
- redundant oscillators;
- redundant power converters.

A failed component must not necessarily cause a failed mission.

RF switches and distribution networks are therefore part of reliability architecture, not merely signal routing.

---

# 40. Example deep-space spacecraft chain

A representative architecture is

$$
\boxed{
\text{HGA}
\rightarrow
\text{diplexer/filter}
\rightarrow
\text{LNA}
\rightarrow
\text{downconverter}
\rightarrow
\text{transponder/modem}
}
$$

for receive, and

$$
\boxed{
\text{transponder/exciter}
\rightarrow
\text{upconverter}
\rightarrow
\text{driver}
\rightarrow
\text{TWTA/SSPA}
\rightarrow
\text{waveguide switch}
\rightarrow
\text{HGA}
}
$$

for transmit.

NASA's spacecraft documentation gives real examples using

- deep-space transponders;
- TWTAs;
- waveguide transfer switches;
- diplexers;
- filters;
- coax/waveguide;
- multiple high/medium/low-gain antennas.

---

# 41. Example phased-array front end

A representative active-array channel is

$$
\boxed{
\text{antenna element}
\leftrightarrow
\text{T/R switch}
\leftrightarrow
\text{PA / LNA}
\leftrightarrow
\text{phase + gain control}
\leftrightarrow
\text{converter / beamformer}.
}
$$

The *Microwave Journal* articles

- [Overcoming Planar Phased Array Circuit Design Challenges](https://www.microwavejournal.com/articles/39773-overcoming-planar-phased-array-circuit-design-challenges)
- [Digital Beamforming Accelerates the Evolution to Next-Generation Radar](https://www.microwavejournal.com/articles/27654-digital-beamforming-accelerates-the-evolution-to-next-generation-radar)

are useful references for the component-level evolution from analog T/R modules toward highly integrated and digital beamforming architectures.

---

# 42. Specifications that repeatedly appear

For microwave components, be comfortable reading

$$
S_{11},\ S_{21},\ S_{12},\ S_{22},
$$

plus

- insertion loss;
- return loss;
- VSWR;
- gain;
- noise figure;
- $P_{1dB}$;
- $P_{sat}$;
- IIP3/OIP3;
- PAE;
- isolation;
- phase noise;
- spurs;
- group delay;
- EVM;
- ACLR;
- dynamic range;
- SFDR;
- bandwidth;
- switching speed;
- power handling.

For space parts, add

- TID;
- SEE/SEU/SEL/SEB;
- operating temperature;
- thermal resistance;
- screening level;
- mission life;
- hermeticity;
- vibration/shock;
- outgassing;
- derating.

---

# 43. Component checklist by subsystem

## Receiver front end

- antenna/feed;
- preselector/filter;
- limiter;
- T/R switch/circulator;
- LNA;
- DSA/VGA;
- mixer/downconverter;
- LO/PLL/VCO;
- IF filter/amplifier;
- ADC.

## Transmitter

- DAC/modulator;
- LO/PLL;
- upconverter;
- driver amplifier;
- DSA/VGA;
- PA/SSPA or TWTA;
- harmonic/output filter;
- isolator/circulator;
- coupler/detector;
- switch/diplexer;
- antenna.

## Phased array

- core/beamformer IC;
- phase shifter;
- attenuator;
- switch;
- LNA;
- PA;
- power detector;
- calibration coupler;
- control IC;
- ADC/DAC for digital arrays.

## Spacecraft telecom

- transponder;
- exciter;
- USO/OCXO/atomic reference;
- receiver;
- SSPA/TWTA;
- RF distribution unit;
- diplexer;
- waveguide transfer switch;
- coax/waveguide;
- HGA/MGA/LGA;
- modem/FEC;
- FPGA/ASIC;
- rad-hard DC-DC/LDO.

---

# 44. Trade and institutional references

### Microwave Journal

1. [RF Signal Chain and Components for Space-Based Satcom Applications](https://www.microwavejournal.com/articles/42156-rf-signal-chain-and-components-for-space-based-satcom-applications) — excellent overall component map.
2. [Overcoming Planar Phased Array Circuit Design Challenges](https://www.microwavejournal.com/articles/39773-overcoming-planar-phased-array-circuit-design-challenges) — PA/LNA/beamformer/T-R module integration.
3. [SOI RFIC Tunable Filters Improve Phased Array System Performance](https://www.microwavejournal.com/articles/38328-soi-rfic-tunable-filters-improve-phased-array-system-performance) — filter placement and front-end tradeoffs.
4. [Digital Beamforming Accelerates the Evolution to Next-Generation Radar](https://www.microwavejournal.com/articles/27654-digital-beamforming-accelerates-the-evolution-to-next-generation-radar) — phase shifters, attenuators, ADC/DAC and digital beamforming.
5. [Integrated Transceivers Simplify Design, Improve Phased Array Radar Performance](https://www.microwavejournal.com/articles/33312-integrated-transceivers-simplify-design-improve-phased-array-radar-performance) — integrated ADC/DAC/mixer/PLL/transceiver architectures.
6. [Transceiver Duplexer Design Considerations](https://www.microwavejournal.com/articles/6962-transceiver-duplexer-design-considerations) — switch/limiter/circulator duplexers.
7. [GaN SSPA Technology for Space-Based Applications](https://www.microwavejournal.com/articles/31995-gan-sspa-technology-for-space-based-applications) — space PAs and GaN.
8. [Radiation-Hardened Space-Based Power Systems](https://www.microwavejournal.com/articles/45215-radiation-hardened-space-based-power-systems) — space power and RF noise.
9. [UltraCMOS RFICs Ease the Complexity of Satellite Designs](https://www.microwavejournal.com/articles/8333-ultracmos-rfics-ease-the-complexity-of-satellite-designs) — RFIC integration and radiation tolerance.
10. [An Enabling Future: The Evolution of GaN for Higher Performance Microwave and mmWave Systems](https://www.microwavejournal.com/articles/38497-an-enabling-future-the-evolution-of-gan-for-higher-performance-microwave-and-mmwave-systems) — semiconductor technology context.

### NASA / JPL

- [NASA Small Spacecraft Communications State of the Art](https://www.nasa.gov/smallsat-institute/sst-soa/soa-communications/) — radios, mixers, filters, amplifiers, antennas and modem functions.
- [NASA Basics of Space Flight — Onboard Systems](https://science.nasa.gov/learn/basics-of-space-flight/chapter11-2/) — spacecraft receivers, transponders, TWTAs, waveguide switches and antennas.
- [NASA Roman RF Communications Electronics](https://science.nasa.gov/mission/roman-space-telescope/communications/) — real S/Ka-band spacecraft architecture with Ka transmitter and TWTA.
- [NASA Deep Space Network](https://science.nasa.gov/learn/basics-of-space-flight/chapter18-3/) — LNAs, IF conversion, exciters and high-power uplink amplifiers.

---

## 45. Arduino / MCU control of RF components

Many laboratory RF components are digitally controlled even though the signal path is analog or microwave. Arduino-class MCUs are often sufficient to configure PLLs, DSAs, RF switches, synthesizers, detectors, relays, and temperature/power-monitoring ICs over SPI, I²C, UART, or GPIO.

A common control path is

$
\text{PC}
\rightarrow
\text{Arduino / MCU}
\xrightarrow{SPI}
\text{PLL / attenuator / switch}.
$

See [Arduino Boards — What You Need to Know](../arduino/) for voltage levels, buses, timers, interrupts, drivers, and debugging.

---

## Radio-astronomy receiver components

Radio astronomy pushes many of these components to their sensitivity limits: cryogenic InP HEMT LNAs, superconducting SIS mixers, waveguide hybrids/OMTs, ultra-low-phase-noise LO chains, IF amplifiers, ADCs and correlator electronics. See [Radio Astronomy — RF Circuits & Receiver Systems](../radio-astronomy-rf/).

---

## 46. Relation to the rest of this reference

This page connects component-level RF hardware to the larger system:

$$
\boxed{
\text{component}
\rightarrow
\text{RF chain}
\rightarrow
\text{antenna / array}
\rightarrow
\text{link budget}
\rightarrow
\text{mission}.
}
$$

Related: [RF & Microwave](../rf-microwave/) · [AESA & Phased Arrays](../aesa/) · [Signal Integrity & Power Integrity](../signal-power-integrity/) · [Spacecraft Electromagnetics](../computational-em/) · [Artemis Lunar Communications](../artemis-communications/) · [Measurements & Instruments](../measurements/)
