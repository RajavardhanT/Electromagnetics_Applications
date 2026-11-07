---
layout: default
title: Scientific Data Acquisition, SpaceWire & Spacecraft Telemetry
description: FPGA signal processing, ADC time tags, packetization, onboard interfaces, storage, error correction and science-data provenance.
---

# Scientific Data Acquisition, SpaceWire & Spacecraft Telemetry

<div class="intuition"><span class="callout-title">An instrument is only useful if its data remain interpretable</span>Sampling accuracy, timestamps, packet integrity, metadata and compression determine whether the downlinked information can be converted into traceable scientific measurements.</div>

## 1. End-to-end data path

Sensor → anti-alias and ADC → FPGA preprocessing → event detection / compression → packet timestamp → onboard mass memory → spacecraft telemetry system → radio/optical downlink → ground calibration pipeline.

**Time tags:** a hardware timestamp should reference a defined clock epoch. Timestamps acquired after nondeterministic host/software buffering can systematically bias simultaneous sensor correlations.

## 2. Interface families and tradeoffs

| Link | Useful properties | Engineering limitation |
|---|---|---|
| SPI/I²C/UART | Simple low-speed command/control | Device-specific timing and fault tolerance |
| CAN / MIL-STD-1553 | Structured spacecraft control networks | Payload bandwidth and architecture constraints |
| SpaceWire | Point-to-point high-speed data routing for spacecraft payloads | Interface/routing design and deterministic timing considerations |
| SpaceFibre | Higher-rate, fault-tolerant spacecraft serial link | More complex implementation and verification |
| Time-triggered Ethernet | Synchronization and deterministic scheduled traffic | Scheduling, switches and certification considerations |
| LVDS direct channels | Compact sensor/ADC data transfer | Cabling, skew, EMI and synchronization |

## 3. Data budgets and fault detection

For $N_p$ pixels, $b$ bits per pixel and frame rate $f_r$, raw video rate is $R=N_pb f_r$ bit/s before overhead. A 2048×2048 imager at 16 bits and 1 frame/s generates about 67.1 Mbit/s (SI units), or about 8.39 MB/s before packaging. Storage/telemetry design must include calibration frames, housekeeping, retransmission and compression ratios.

Use packet sequence counts, CRCs, time-tag checks, watchdogs and scrubbing where needed. **CRC detects corruption; it does not itself correct bits.** Forward error correction requires an explicit code and decoding scheme.

## 4. Verification plan

Replay recorded sample streams through the processing chain and compare bit-exact results. Inject clock slips, packet loss, sensor saturation, memory upset and power interruptions. Preserve detector configuration, calibration version, processing software version and clock-source metadata.

**Advanced exercise:** design a loss-aware packetization scheme for bursty detector data; calculate FIFO depth for peak event rate and limited downlink contact windows.

## 5. Primary reading

- [ESA — Architectures of Onboard Data Systems](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Onboard_Computers_and_Data_Handling/Architectures_of_Onboard_Data_Systems).
- [ESA — Onboard Computers & Data Handling](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Onboard_Computers_and_Data_Handling).
- [Payload Electronics](../payload-electronics/) · [Precision Timing](../precision-timing-synchronization/) · [Spacecraft Qualification](../spacecraft-qualification/).
