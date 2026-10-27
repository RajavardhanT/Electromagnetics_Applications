---
layout: default
title: 3GPP Standards — What an RF & Wireless Engineer Should Know
description: Practical guide to the 3GPP specifications most useful for NR/LTE RF, conformance, RRM, PHY, RRC, capabilities, NSA/SA, RedCap, NTN, IMS/VoNR, and 5G-Advanced.
---

# 3GPP Standards — What an RF & Wireless Engineer Should Know

<div class="intuition"><span class="callout-title">30-second intuition</span>Do not try to memorize the whole 3GPP library. Learn the <strong>specification chains</strong>. For UE RF work, the requirement usually lives in <strong>38.101-x</strong>, the conformance test in <strong>38.521-x</strong>, and the common setup/configuration in <strong>38.508-x</strong>. For gNB RF, the corresponding chain is <strong>38.104 → 38.141-1/-2</strong>. For RRM, think <strong>38.133 → 38.533</strong>. For signaling, think <strong>38.331</strong>. That map is far more useful than memorizing hundreds of document numbers.</div>

<div class="pathway"><span class="node">requirement</span><span class="arrow">→</span><span class="node">conformance test</span><span class="arrow">→</span><span class="node">test environment</span><span class="arrow">→</span><span class="node">UE / gNB implementation</span></div>

## RF operating-band lookup

For a compact lookup of the most important GSM, LTE and NR bands—together with L/S/C/X/Ku/K/Ka/V/W microwave naming—see [RF Bands — Compact Reference](../rf-bands/).

## 1. The specifications to know first

If your work is mainly **RF validation, wireless compliance, conformance, UE characterization, or modem/RF debugging**, start with these:

| Area | Core specification | What it gives you |
|---|---|---|
| NR UE RF requirements — Range 1 | [TS 38.101-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-1/) | UE Tx/Rx RF requirements |
| NR UE RF requirements — Range 2 | [TS 38.101-2](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-2/) | FR2 / Range-2 UE RF requirements |
| NR interworking / multi-radio RF | [TS 38.101-3](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-3/) | NR operation with other radios |
| NR UE performance | [TS 38.101-4](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-4/) | demodulation, CSI and performance requirements |
| NR UE satellite / NTN RF | [TS 38.101-5](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-5/) | satellite-access RF and performance requirements |
| NR UE RF conformance — Range 1 | [TS 38.521-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-1/) | actual RF conformance tests |
| NR UE RF conformance — Range 2 | [TS 38.521-2](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-2/) | FR2 / Range-2 tests |
| NR interworking conformance | [TS 38.521-3](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-3/) | interworking RF tests |
| NR performance conformance | [TS 38.521-4](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-4/) | UE performance test cases |
| NR NTN conformance | [TS 38.521-5](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-5/) | satellite RF/performance test cases |
| Common UE test environment | [TS 38.508-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.508-1/) | reference configurations, cells, channels, message content |
| UE test applicability | [TS 38.522](https://www.3gpp.org/ftp/Specs/archive/38_series/38.522/) | which RF/RRM tests apply to a UE |
| NR RRM requirements | [TS 38.133](https://www.3gpp.org/ftp/Specs/archive/38_series/38.133/) | mobility and measurement requirements |
| NR RRM conformance | [TS 38.533](https://www.3gpp.org/ftp/Specs/archive/38_series/38.533/) | RRM test cases |
| UE capabilities | [TS 38.306](https://www.3gpp.org/ftp/Specs/archive/38_series/38.306/) | what a UE declares it supports |
| NR RRC | [TS 38.331](https://www.3gpp.org/ftp/Specs/archive/38_series/38.331/) | configuration/signaling IEs and procedures |

<div class="engineering"><span class="callout-title">Engineering reality</span>When a conformance test fails, do not read only the test specification. Trace the test back to its <strong>core requirement</strong>, then verify the <strong>UE capability condition</strong>, <strong>RRC configuration</strong>, and the <strong>common test environment</strong>. A large fraction of apparent RF failures are actually applicability, configuration, signaling, or measurement-condition issues.</div>

---

# Part I — How 3GPP is organized

## 2. TS versus TR

**TS — Technical Specification**

Normative requirements and procedures.

Examples:

- 38.101-1;
- 38.104;
- 38.331;
- 38.521-1.

**TR — Technical Report**

Study material, evaluations, candidate solutions, assumptions, and background.

Examples:

- [TR 38.811](https://www.3gpp.org/ftp/Specs/archive/38_series/38.811/) — study on NR support for non-terrestrial networks;
- [TR 38.821](https://www.3gpp.org/ftp/Specs/archive/38_series/38.821/) — solutions for NR NTN.

A TR helps explain **why** a feature was developed. A TS tells you **what must be implemented or tested**.

---

## 3. Working groups worth recognizing

| Group | What you should associate with it |
|---|---|
| **RAN1** | physical layer |
| **RAN2** | MAC/RLC/PDCP/RRC and radio procedures |
| **RAN3** | RAN architecture and network interfaces |
| **RAN4** | RF requirements, radio performance, RRM performance |
| **RAN5** | UE conformance testing |
| **SA2** | system architecture |
| **SA3** | security |
| **CT1** | UE ↔ core-network protocols / NAS |

This explains why a requirement and its conformance test often live in different working groups.

---

## 4. Releases and versions

3GPP specifications evolve by **Release**.

For 5G:

- **Release 15** — initial 5G NR / 5GS;
- **Release 16** — major 5G expansion;
- **Release 17** — additional verticals, RedCap/NTN-era capabilities and broader maturation;
- **Release 18** — beginning of **5G-Advanced**;
- **Release 19** — further 5G-Advanced evolution;
- **Release 20** — current 5G-Advanced work plus early 6G studies;
- **Release 21** — open for future work.

Official current release status: [3GPP Releases](https://portal.3gpp.org/home/main).

As of **October 2026**, 3GPP lists Release 18 and Release 19 as frozen, while Release 20 and Release 21 are open.

A version such as

$$
19.4.0
$$

means the document belongs to Release 19.

A frozen Release can still receive corrections through formal **Change Requests (CRs)**.

---

# Part II — UE RF requirements

## 5. TS 38.101-1 — Range 1 standalone

[TS 38.101-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-1/) is one of the most important documents for a UE RF engineer.

Typical requirement families include

### Transmitter

- maximum output power;
- configured / minimum output power;
- transmit-power control;
- output-power dynamics;
- occupied bandwidth;
- spectrum emission mask;
- adjacent-channel leakage ratio;
- spurious emissions;
- transmitter intermodulation;
- modulation quality / EVM-related requirements.

### Receiver

- reference sensitivity;
- maximum input level;
- adjacent-channel selectivity;
- blocking;
- spurious response;
- receiver intermodulation;
- narrowband/wideband sensitivity conditions.

The exact limits depend on band, bandwidth, subcarrier spacing, power class, CA configuration, and Release.

---

## 6. TS 38.101-2 — Range 2

[TS 38.101-2](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-2/) covers Range-2 standalone UE RF.

At mmWave frequencies the test viewpoint changes substantially because the antenna array is tightly integrated with the radio.

Important concepts include

- EIRP;
- TRP-like radiated metrics;
- beam direction;
- spherical coverage;
- radiated sensitivity;
- beamforming;
- OTA test geometry.

For FR2 work, conducted RF access may no longer represent the actual product RF interface.

---

## 7. TS 38.101-3 — interworking

[TS 38.101-3](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-3/) covers Range-1/Range-2 operation when NR is working with other radio technologies.

This becomes important for

- EN-DC;
- multi-radio operation;
- simultaneous LTE + NR;
- coexistence constraints;
- inter-band combinations.

---

## 8. TS 38.101-4 — UE performance

[TS 38.101-4](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-4/) focuses on performance rather than basic transmitter/receiver RF limits.

Examples include

- PDSCH demodulation;
- PDCCH performance;
- CSI;
- CQI/PMI/RI behavior;
- MIMO performance;
- receiver performance under defined propagation/channel conditions.

This is the document to think about when the question is

> “Can the UE correctly receive/demodulate under this channel condition?”

rather than simply

> “Does the RF front end meet its emission/sensitivity limit?”

---

## 9. TS 38.101-5 — satellite access / NTN

[TS 38.101-5](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-5/) contains NR UE RF and performance requirements for satellite access.

NTN adds issues such as

- much larger Doppler;
- long propagation delay;
- satellite beam geometry;
- elevation-angle-dependent link behavior;
- satellite/VSAT power definitions;
- different RF operating conditions.

Useful background studies:

- [TR 38.811 — Study on NR to support NTN](https://www.3gpp.org/ftp/Specs/archive/38_series/38.811/)
- [TR 38.821 — Solutions for NR NTN](https://www.3gpp.org/ftp/Specs/archive/38_series/38.821/)

---

# Part III — UE RF conformance

## 10. The most important relationship

For UE RF work:

$$
\boxed{
38.101-x
\rightarrow
38.521-x
\rightarrow
38.508-1
}
$$

Interpretation:

**38.101-x**  
What performance is required?

**38.521-x**  
How is that requirement tested?

**38.508-1**  
What network/test configuration and signaling environment is used?

---

## 11. TS 38.521-1

[TS 38.521-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-1/) contains NR UE Range-1 RF conformance test cases.

A test case typically gives

- initial conditions;
- test configuration;
- RF levels;
- resource allocation;
- test procedure;
- measurement method;
- minimum conformance requirement;
- measurement uncertainty / test tolerance information.

For RF validation work, this is often the document you spend the most time inside.

---

## 12. TS 38.521-2

[TS 38.521-2](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-2/) contains Range-2 standalone conformance tests.

Think

$$
\boxed{
\text{FR2 requirement}
\rightarrow
\text{OTA/radiated test procedure}
}
$$

rather than a simple cabled RF connection.

---

## 13. TS 38.521-3

[TS 38.521-3](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-3/) addresses interworking operation.

Use it when testing combinations involving

- LTE;
- NR;
- EN-DC;
- simultaneous radio operation;
- inter-RAT configurations.

---

## 14. TS 38.521-4

[TS 38.521-4](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-4/) is the conformance counterpart to 38.101-4.

It contains performance test cases for areas such as

- PDSCH/PDCCH;
- CSI;
- MIMO;
- receiver demodulation performance.

---

## 15. TS 38.521-5

[TS 38.521-5](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-5/) is the satellite-access RF and performance conformance specification.

It should be read together with

[TS 38.101-5](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-5/).

---

## 16. TS 38.508-1 — common test environment

[TS 38.508-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.508-1/) is easy to underestimate.

It defines common test machinery such as

- reference configurations;
- cell setup;
- RRC message content;
- default parameters;
- reference channels;
- UE/test-equipment connection assumptions.

If a 38.521 or 38.533 test says “configure the UE according to …”, this is often where the details live.

---

## 17. TS 38.508-2 — ICS

[TS 38.508-2](https://www.3gpp.org/ftp/Specs/archive/38_series/38.508-2/) contains the Common Implementation Conformance Statement proforma.

ICS information describes what the implementation claims to support.

This is central to **test applicability**.

---

## 18. TS 38.509 — special test functions

[TS 38.509](https://www.3gpp.org/ftp/Specs/archive/38_series/38.509/) defines special UE functions used for conformance testing.

These functions let the test system place the UE into controlled states that may not be naturally reachable through ordinary user operation.

---

## 19. TS 38.522 — applicability

[TS 38.522](https://www.3gpp.org/ftp/Specs/archive/38_series/38.522/) answers a critical question:

> Does this test actually apply to this UE?

Applicability depends on

- supported bands;
- CA combinations;
- power class;
- MIMO capability;
- Release;
- optional features;
- RedCap/eRedCap capability;
- supported radio configurations.

Never assume every listed 38.521 test applies to every device.

---

# Part IV — RRM

## 20. TS 38.133 — RRM requirements

[TS 38.133](https://www.3gpp.org/ftp/Specs/archive/38_series/38.133/) contains NR radio-resource-management requirements.

This is where you look for requirements involving

- cell selection/reselection;
- measurement accuracy;
- measurement reporting;
- handover;
- mobility;
- interruption time;
- beam measurements;
- radio-link monitoring;
- measurement gaps.

---

## 21. TS 38.533 — RRM conformance

[TS 38.533](https://www.3gpp.org/ftp/Specs/archive/38_series/38.533/) turns the RRM requirements into UE conformance tests.

The relationship is

$$
\boxed{
38.133
\rightarrow
38.533.
}
$$

If an RRM test fails, also inspect

- [38.331](https://www.3gpp.org/ftp/Specs/archive/38_series/38.331/) for signaling;
- [38.306](https://www.3gpp.org/ftp/Specs/archive/38_series/38.306/) for capability conditions.

---

# Part V — Physical layer

## 22. TS 38.211 — channels and modulation

[TS 38.211](https://www.3gpp.org/ftp/Specs/archive/38_series/38.211/) defines the physical waveform structure.

Know it for

- OFDM numerology;
- resource elements;
- resource blocks;
- PDSCH/PUSCH;
- PDCCH/PUCCH;
- PRACH;
- reference signals;
- modulation;
- DM-RS;
- CSI-RS;
- SRS.

When you ask

> “What exactly is transmitted?”

38.211 is usually the first PHY document.

---

## 23. TS 38.212 — coding

[TS 38.212](https://www.3gpp.org/ftp/Specs/archive/38_series/38.212/) defines

- channel coding;
- rate matching;
- CRC attachment;
- code-block processing;
- multiplexing.

Important coding families include

- LDPC for data;
- Polar codes for control.

---

## 24. TS 38.213 — control procedures

[TS 38.213](https://www.3gpp.org/ftp/Specs/archive/38_series/38.213/) covers physical-layer procedures for control.

Examples include

- power-control procedures;
- control-channel operation;
- random-access-related PHY behavior;
- timing/control interactions.

---

## 25. TS 38.214 — data procedures

[TS 38.214](https://www.3gpp.org/ftp/Specs/archive/38_series/38.214/) is essential for

- transport block behavior;
- MCS;
- HARQ-related PHY procedures;
- MIMO layers;
- precoding;
- CSI reporting;
- scheduling-related PHY parameters.

For throughput or MIMO debugging, 38.214 becomes central very quickly.

---

## 26. TS 38.215 — measurements

[TS 38.215](https://www.3gpp.org/ftp/Specs/archive/38_series/38.215/) defines NR physical-layer measurements.

Examples include signal-strength and signal-quality quantities used by higher layers.

---

# Part VI — Layer 2 and RRC

## 27. TS 38.321 — MAC

[TS 38.321](https://www.3gpp.org/ftp/Specs/archive/38_series/38.321/) covers MAC.

Important concepts include

- logical channels;
- scheduling requests;
- buffer-status reporting;
- HARQ handling;
- random access;
- MAC control elements.

---

## 28. TS 38.322 — RLC

[TS 38.322](https://www.3gpp.org/ftp/Specs/archive/38_series/38.322/) defines Radio Link Control.

Know the basic modes:

- TM;
- UM;
- AM.

RLC handles functions such as segmentation/reassembly and retransmission in acknowledged mode.

---

## 29. TS 38.323 — PDCP

[TS 38.323](https://www.3gpp.org/ftp/Specs/archive/38_series/38.323/) defines PDCP.

Important functions include

- header compression;
- ciphering/integrity interactions;
- sequence numbering;
- duplication;
- reordering;
- multi-connectivity support.

---

## 30. TS 38.331 — RRC

[TS 38.331](https://www.3gpp.org/ftp/Specs/archive/38_series/38.331/) is one of the most important documents outside RF requirements.

It defines

- RRC states;
- system information;
- measurement configuration;
- mobility signaling;
- bearer configuration;
- capability exchange;
- radio configuration information elements.

When a test log contains an unfamiliar IE, 38.331 is often where you decode it.

---

# Part VII — Capabilities

## 31. TS 38.306

[TS 38.306](https://www.3gpp.org/ftp/Specs/archive/38_series/38.306/) describes NR UE radio-access capabilities.

It tells you how a device advertises support for features such as

- bands;
- bandwidth;
- CA combinations;
- MIMO;
- modulation;
- CSI;
- feature sets;
- optional Release capabilities.

A requirement may exist in a specification but apply only when the UE advertises the corresponding capability.

---

## 32. Why capabilities matter in test

A useful mental chain is

$$
\boxed{
\text{38.306 capability}
\rightarrow
\text{38.522 applicability}
\rightarrow
\text{38.521/38.533 test}.
}
$$

This is especially important for advanced MIMO, CA, RedCap, and newer Release features.

---

# Part VIII — Overall NR architecture

## 33. TS 38.300

[TS 38.300](https://www.3gpp.org/ftp/Specs/archive/38_series/38.300/) is the overall NR/NG-RAN Stage-2 description.

Use it before diving into lower-level specs when you need the big picture:

- NR architecture;
- protocol stack;
- interfaces;
- mobility;
- carrier aggregation;
- dual connectivity;
- QoS interactions.

---

## 34. TS 38.401

[TS 38.401](https://www.3gpp.org/ftp/Specs/archive/38_series/38.401/) defines NG-RAN architecture.

Useful when your work expands from the UE radio interface to

- gNB architecture;
- CU/DU;
- NG;
- Xn;
- network-side interfaces.

---

# Part IX — Base-station RF

## 35. TS 38.104

[TS 38.104](https://www.3gpp.org/ftp/Specs/archive/38_series/38.104/) is the primary NR base-station RF requirement document.

It covers areas such as

- BS output power;
- unwanted emissions;
- ACLR;
- EVM;
- receiver sensitivity;
- blocking;
- intermodulation;
- conducted/radiated BS requirements;
- active antenna systems.

---

## 36. TS 38.141-1 and 38.141-2

The gNB conformance chain is

$$
\boxed{
38.104
\rightarrow
38.141.
}
$$

[TS 38.141-1 — conducted BS conformance](https://www.3gpp.org/ftp/Specs/archive/38_series/38.141-1/)

[TS 38.141-2 — radiated BS conformance](https://www.3gpp.org/ftp/Specs/archive/38_series/38.141-2/)

The split matters because active-array BS products may need OTA/radiated conformance rather than only connector-based measurements.

---

# Part X — NSA, EN-DC and multi-connectivity

## 37. TS 37.340

[TS 37.340](https://www.3gpp.org/ftp/Specs/archive/37_series/37.340/) gives the overall description of E-UTRA/NR multi-connectivity.

This is essential for understanding

- EN-DC;
- NE-DC;
- NR-DC;
- MR-DC;
- master/secondary nodes;
- bearer split;
- LTE/NR interaction.

For NSA debugging, 37.340 is one of the most useful architecture documents.

---

## 38. LTE specifications still matter

For NSA/EN-DC and legacy support, keep these 36-series specifications close:

| Area | LTE specification |
|---|---|
| UE RF requirements | [TS 36.101](https://www.3gpp.org/ftp/Specs/archive/36_series/36.101/) |
| BS RF requirements | [TS 36.104](https://www.3gpp.org/ftp/Specs/archive/36_series/36.104/) |
| UE RF conformance | [TS 36.521-1](https://www.3gpp.org/ftp/Specs/archive/36_series/36.521-1/) |
| UE RF ICS | [TS 36.521-2](https://www.3gpp.org/ftp/Specs/archive/36_series/36.521-2/) |
| LTE RRM conformance | [TS 36.521-3](https://www.3gpp.org/ftp/Specs/archive/36_series/36.521-3/) |
| Common test environment | [TS 36.508](https://www.3gpp.org/ftp/Specs/archive/36_series/36.508/) |
| LTE RRM requirements | [TS 36.133](https://www.3gpp.org/ftp/Specs/archive/36_series/36.133/) |
| LTE RRC | [TS 36.331](https://www.3gpp.org/ftp/Specs/archive/36_series/36.331/) |
| BS conformance | [TS 36.141](https://www.3gpp.org/ftp/Specs/archive/36_series/36.141/) |
| Protocol conformance | [TS 36.523-1](https://www.3gpp.org/ftp/Specs/archive/36_series/36.523-1/) |

---

# Part XI — Protocol conformance

## 39. TS 38.523-1

[TS 38.523-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.523-1/) is the UE protocol-conformance specification.

Use it when the failure is not fundamentally an RF-number problem but rather

- registration;
- connection setup;
- mobility signaling;
- PDU-session behavior;
- feature procedure;
- RRC/NAS sequence.

---

# Part XII — 5G core and NAS

## 40. TS 23.501

[TS 23.501](https://www.3gpp.org/ftp/Specs/archive/23_series/23.501/) defines the 5G System architecture.

Know the major functions:

- AMF;
- SMF;
- UPF;
- UDM;
- AUSF;
- PCF;
- NRF.

You do not need every service-based interface for RF work, but the architecture helps you understand SA call flows and test-system behavior.

---

## 41. TS 23.502

[TS 23.502](https://www.3gpp.org/ftp/Specs/archive/23_series/23.502/) describes 5GS procedures.

Useful for

- registration;
- PDU-session establishment;
- mobility;
- service requests;
- session modification/release.

---

## 42. TS 24.501

[TS 24.501](https://www.3gpp.org/ftp/Specs/archive/24_series/24.501/) is the 5GS NAS protocol specification.

When a log contains

- Registration Request;
- Authentication;
- Security Mode;
- PDU Session Establishment;
- mobility-management NAS messages,

24.501 is the document to open.

---

## 43. TS 33.501

[TS 33.501](https://www.3gpp.org/ftp/Specs/archive/33_series/33.501/) defines 5GS security architecture and procedures.

At minimum understand

- authentication;
- key hierarchy;
- integrity protection;
- ciphering;
- security contexts.

---

# Part XIII — IMS / VoNR

## 44. IMS documents

For voice over LTE/NR, the radio link is only part of the system.

Useful specifications include

[TS 23.228 — IMS Stage 2](https://www.3gpp.org/ftp/Specs/archive/23_series/23.228/)

and

[TS 24.229 — SIP/SDP call control Stage 3](https://www.3gpp.org/ftp/Specs/archive/24_series/24.229/).

These become relevant for

- VoLTE;
- VoNR;
- IMS registration;
- SIP call setup;
- SDP media negotiation.

---

# Part XIV — Features to recognize

## 45. Carrier aggregation

CA requirements are distributed across several specifications.

For UE RF, start with

- [38.101-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-1/);
- [38.101-3](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-3/);
- [38.521-1](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-1/);
- [38.522](https://www.3gpp.org/ftp/Specs/archive/38_series/38.522/);
- [38.306](https://www.3gpp.org/ftp/Specs/archive/38_series/38.306/).

CA failures frequently depend on **band-combination-specific applicability**, not simply individual-band performance.

---

## 46. MIMO

For MIMO work, useful specifications include

- [38.214](https://www.3gpp.org/ftp/Specs/archive/38_series/38.214/) — layers, precoding, CSI procedures;
- [38.306](https://www.3gpp.org/ftp/Specs/archive/38_series/38.306/) — UE capabilities;
- [38.101-4](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-4/) — performance requirements;
- [38.521-4](https://www.3gpp.org/ftp/Specs/archive/38_series/38.521-4/) — conformance tests.

---

## 47. RedCap / eRedCap

Reduced Capability devices are not defined by one isolated “RedCap spec.”

Their requirements are integrated into the main NR specifications.

For RF/testing, use the current Release versions of

- 38.101-x;
- 38.306;
- 38.521-x;
- 38.522;
- 38.508-1.

A test may apply differently depending on a UE's RedCap capability declaration.

---

## 48. NTN

For NR NTN, keep this set together:

$$
\boxed{
38.811/38.821
\rightarrow
38.101-5
\rightarrow
38.521-5.
}
$$

The first two reports provide study/solution background; 38.101-5 and 38.521-5 contain normative requirements and conformance tests.

---

## 49. Positioning

For NR positioning, a useful starting point is

[TS 38.305 — UE positioning in NG-RAN](https://www.3gpp.org/ftp/Specs/archive/38_series/38.305/).

Positioning-specific conformance also appears in the 37.571 family.

---

# Part XV — The specifications behind common measurements

## 50. RF measurement → specification map

| Measurement / issue | Start here |
|---|---|
| Maximum UE output power | 38.101-1 / 38.521-1 |
| UE EVM / modulation quality | 38.101-x / 38.521-x |
| Occupied bandwidth | 38.101-x / 38.521-x |
| ACLR | 38.101-x / 38.521-x |
| Spectrum emission mask | 38.101-x / 38.521-x |
| Spurious emissions | 38.101-x / 38.521-x |
| Receiver sensitivity | 38.101-x / 38.521-x |
| Blocking | 38.101-x / 38.521-x |
| Receiver intermodulation | 38.101-x / 38.521-x |
| FR2 radiated power | 38.101-2 / 38.521-2 |
| PDSCH demodulation | 38.101-4 / 38.521-4 |
| Handover / mobility | 38.133 / 38.533 |
| Measurement reporting | 38.133 / 38.533 / 38.331 |
| UE capability mismatch | 38.306 |
| EN-DC / NSA behavior | 37.340 + 36.331 + 38.331 |
| gNB RF requirement | 38.104 |
| gNB conducted conformance | 38.141-1 |
| gNB radiated conformance | 38.141-2 |
| NTN RF | 38.101-5 / 38.521-5 |
| Protocol procedure | 38.523-1 / 38.331 / 24.501 |

---

# Part XVI — Debugging workflows

## 51. UE RF conformance failure

Use

$$
\boxed{
38.521
\rightarrow
38.101
\rightarrow
38.522
\rightarrow
38.306
\rightarrow
38.508
}
$$

Questions:

1. What exactly is the test requirement?
2. What is the minimum core requirement?
3. Does the test apply to this UE?
4. What capability triggered applicability?
5. Was the UE configured exactly as required?
6. Is the measurement uncertainty/test tolerance being interpreted correctly?

---

## 52. RRM failure

Use

$$
\boxed{
38.533
\rightarrow
38.133
\rightarrow
38.331
\rightarrow
38.306.
}
$$

Check

- measurement configuration;
- thresholds;
- events;
- timing;
- capability support;
- interruption requirements;
- message sequence.

---

## 53. NSA / EN-DC failure

Use

$$
\boxed{
37.340
+
36.331
+
38.331
+
36.101
+
38.101-3.
}
$$

You often need both LTE and NR traces because LTE may be the master radio in EN-DC.

---

## 54. Throughput / MIMO failure

Use

- 38.211;
- 38.212;
- 38.213;
- 38.214;
- 38.306;
- 38.331.

Do not assume a low throughput result is an RF issue.

It may be caused by

- MCS;
- rank;
- CSI;
- scheduling;
- HARQ;
- bandwidth part;
- capability;
- RRC configuration.

---

# Part XVII — 5G-Advanced and current releases

## 55. Release 18+

3GPP identifies Release 18 as the start of **5G-Advanced**.

For an RF/test engineer, newer Releases increasingly affect

- MIMO;
- mobility;
- RedCap/eRedCap;
- NTN;
- sidelink;
- positioning;
- carrier aggregation;
- receiver/transmitter enhancements;
- energy efficiency.

The important practice is not to memorize feature names but to always note the **Release version** of the core and test specifications used by your test platform.

---

## 56. Release status — checked October 27, 2026

According to the official 3GPP portal:

| Release | Status |
|---|---|
| Rel-17 | Frozen |
| Rel-18 | Frozen |
| Rel-19 | Frozen |
| Rel-20 | Open |
| Rel-21 | Open |

[Official 3GPP release status](https://portal.3gpp.org/home/main)

Even after freeze, specifications continue receiving approved corrections under change control.

---

# Part XVIII — Useful 3GPP navigation links

## 57. Official resources

- [3GPP Portal](https://portal.3gpp.org/)
- [3GPP Specifications archive](https://www.3gpp.org/ftp/Specs/archive/)
- [3GPP Releases](https://portal.3gpp.org/home/main)
- [38-series archive — NR](https://www.3gpp.org/ftp/Specs/archive/38_series/)
- [36-series archive — LTE](https://www.3gpp.org/ftp/Specs/archive/36_series/)
- [37-series archive — multi-RAT / common RAN](https://www.3gpp.org/ftp/Specs/archive/37_series/)
- [23-series archive — system architecture](https://www.3gpp.org/ftp/Specs/archive/23_series/)
- [24-series archive — UE/core protocols](https://www.3gpp.org/ftp/Specs/archive/24_series/)
- [33-series archive — security](https://www.3gpp.org/ftp/Specs/archive/33_series/)

---

# Part XIX — Minimal set to remember

## 58. If you remember only these

For **UE RF/conformance**:

$$
\boxed{
38.101
\quad
38.521
\quad
38.508
}
$$

For **RRM**:

$$
\boxed{
38.133
\quad
38.533
}
$$

For **signaling/capabilities**:

$$
\boxed{
38.331
\quad
38.306
}
$$

For **PHY**:

$$
\boxed{
38.211
\quad
38.212
\quad
38.213
\quad
38.214
}
$$

For **gNB RF**:

$$
\boxed{
38.104
\quad
38.141
}
$$

For **NSA / EN-DC**:

$$
\boxed{
37.340
+
36\text{-series}
+
38\text{-series}
}
$$

For **5GC/NAS**:

$$
\boxed{
23.501
\quad
23.502
\quad
24.501
}
$$

That small map is enough to navigate most day-to-day 3GPP RF and conformance work.

---

## 59. Related pages

[Wireless & MIMO](../wireless/) · [RF & Microwave](../rf-microwave/) · [Measurements & Instruments](../measurements/) · [Signal Integrity & Power Integrity](../signal-power-integrity/) · [Microwave & Space Electronics Components](../microwave-space-components/)
