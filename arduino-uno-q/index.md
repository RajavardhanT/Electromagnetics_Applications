---
layout: default
title: Arduino UNO Q — Dual-Processor Hardware, Linux, Zephyr and Engineering Interfaces
description: Technical reference to Arduino UNO Q with Qualcomm Dragonwing QRB2210, STM32U585, Linux/Zephyr architecture, bridge RPC, pin mapping, ADC/DAC, 3.3 V and 1.8 V logic, power domains, expansion, and laboratory applications.
---

# Arduino UNO Q — Dual-Processor Hardware and System Architecture

**Technical status: November 2026.** The UNO Q is not merely a faster UNO R3/R4. It combines a **Qualcomm Dragonwing QRB2210 Linux application processor** with an **STM32U585 real-time microcontroller** in the UNO form factor. The two sides communicate through **Arduino Bridge (RPC)**. Electrical limits, GPIO timing, memory ownership, software deployment and debug paths must therefore be treated as two distinct systems.

**Official sources:** [Arduino UNO Q product and downloadable hardware files](https://docs.arduino.cc/hardware/uno-q) · [UNO Q user manual](https://docs.arduino.cc/tutorials/uno-q/user-manual/) · [Power specifications](https://docs.arduino.cc/tutorials/uno-q/power-specification/) · [Arduino UNO Q datasheet](https://docs.arduino.cc/resources/datasheets/ABX00162-datasheet.pdf).

<div class="intuition"><span class="callout-title">Hardware principle</span>Run networking, filesystems, image processing and orchestration on the Linux MPU. Run time-critical peripheral control, interrupts, ADC acquisition, timer/PWM generation and safety-related local state machines on the STM32 MCU. Communicate between them using explicit messages, not assumptions of synchronous shared-memory timing.</div>

## 1. Architecture and processing split

<div class="pathway">
  <span class="node">Sensors, camera, network</span>
  <span class="arrow">→</span>
  <span class="node">Qualcomm QRB2210 — Debian Linux, Python, AI</span>
  <span class="arrow">⇄</span>
  <span class="node">Arduino Bridge / RPC</span>
  <span class="arrow">⇄</span>
  <span class="node">STM32U585 — Zephyr, timers, ADC, DAC, GPIO</span>
  <span class="arrow">→</span>
  <span class="node">Actuators and instruments</span>
</div>

| Subsystem | Implementation | Main role |
|---|---|---|
| **Application processor** | Qualcomm Dragonwing **QRB2210**, 4 × 64-bit Arm Cortex-A53 cores, up to 2.0 GHz | Debian Linux applications, networking, image processing, containers |
| **Graphics** | Adreno **702 GPU**, specified at 845 MHz in Arduino manual | Graphical acceleration; **not an NVIDIA CUDA GPU** |
| **Image processing** | Dual ISPs: **2 × 13 MP or 1 × 25 MP at 30 fps** (processor capability; actual throughput depends on camera/carrier/software) | Camera processing and edge vision |
| **Real-time MCU** | ST **STM32U585**, Arm Cortex-M33 at up to **160 MHz**, with FPU | Deterministic peripheral timing, hardware timers, local control |
| **MCU flash / SRAM** | **2 MB flash**, **786 kB SRAM** | Sketches, RTOS, acquisition buffers |
| **Application RAM** | **2 GB or 4 GB** LPDDR4/LPDDR4X (variant-specific) | Linux userspace, vision and containers |
| **Onboard storage** | **16 GB or 32 GB eMMC** (variant-specific) | Boot, OS, software, logged data |
| **Software** | Debian Linux on MPU; **Arduino Core on Zephyr OS** on MCU | Linux applications + Arduino sketches |
| **Processor bridge** | **Arduino Bridge**, built on RPC / Arduino_RPClite | Bidirectional commands, state and data |

> **Engineering interpretation:** Zephyr helps manage real-time tasks on the MCU, but "real time" depends on interrupt priorities, DMA, peripheral configuration, scheduler and worst-case execution time. Bridge traffic and Linux application scheduling introduce additional latency. A closed-loop controller should not depend on an unbounded Linux-to-MCU round trip.

### Variants

| Board variant | Model/SKU | Application RAM | eMMC | Appropriate use |
|---|---|---:|---:|---|
| UNO Q **2 GB** | **ABX00162** | 2 GB | 16 GB | Embedded Linux applications and moderate single-purpose inference |
| UNO Q **4 GB** | **ABX00173** | 4 GB | 32 GB | More memory-intensive applications, graphics, computer vision and multitasking |

These are **not** alternative STM32 memory configurations: both share the same MCU. [Official 2 GB listing](https://store.arduino.cc/products/uno-q) · [Official 4 GB listing](https://store.arduino.cc/collections/boards-modules/products/uno-q-4gb).

## 2. Interface and expansion map

| Connector / interface | Signals / features | Electrical / design comments |
|---|---|---|
| **JDIGITAL** | UNO-style digital-header signals, UART, SPI, I²C, CAN, GPIO and PWM multiplexing | **3.3 V** MCU logic; pin multiplexing matters |
| **JANALOG** | A0–A5 analog/alternate functions, DAC and I²C multiplexing; power pins | ADC voltage range limited to **VREF+**, typically 3.3 V—not 5 V |
| **JSPI** | SPI signals and power | SPI signals are **3.3 V**; 5 V header pins are power, not logic reference |
| **Qwiic** | I²C accessory connector | **3.3 V** I²C, suited to compatible Modulino/Qwiic nodes |
| **JMEDIA** | High-speed MIPI-CSI / MIPI-DSI and camera control; dedicated media lanes | Processor-side **1.8 V** signaling; high-speed PCB constraints |
| **JMISC** | Mixed MCU interfaces, processor I/O, audio endpoints, power rails | Multiple voltage domains; inspect each actual pin |
| **JCTL** | Processor control/debug | Processor-side **1.8 V** domain |
| **USB-C** | USB host/device role switching, power, video output through supported adapters | Use compatible USB-C adapter and proper power budget |
| **Wireless** | Wi-Fi 5, dual-band **2.4/5 GHz**; **Bluetooth 5.1** | Onboard antenna; respect RF keep-out and EMC concerns |

[UNO Q pinout, schematics, CAD and STEP files](https://docs.arduino.cc/hardware/uno-q) are the authoritative sources for exact header numbering and alternate-function assignments. Avoid relying on an UNO R3 or UNO R4 pinout image when attaching new hardware to UNO Q.

### Selected MCU pin assignments

| UNO label | STM32U585 pin | Functions |
|---|---|---|
| **D0 / D1** | PB7 / PB6 | UART RX / TX |
| **D4 / D5** | PA12 / PA11 | FDCAN1 TX / RX (with suitable external physical-layer transceiver) |
| **D10–D13** | PB9, PB15, PB14, PB13 | SPI SS, MOSI, MISO, SCK |
| **D20 / D21** | PB11 / PB10 | I²C SDA / SCL |
| **A0 / A1** | PA4 / PA5 | ADC and DAC0 / DAC1 |
| **A2 / A3** | PA6 / PA7 | ADC and OPAMP alternate functions |
| **A4 / A5** | PC1 / PC0 | ADC and I²C alternate functions |

Arduino documents **47 MCU-controlled digital signals** in total: **22 UNO-style header signals** and **25 additional JMISC signals**, though availability depends on routing, pin multiplexing and the selected carrier. The UNO-style analog header provides **six ADC channels** and **two DAC-capable pins**. A pin configured as a DAC output cannot simultaneously act as an independent ADC input.

**MCU PWM:** Arduino's user manual lists D3, D5, D6, D9, D10 and D11 as supported PWM pins. Timer frequency, PWM resolution and shared-peripheral conflicts must be verified in the selected Arduino Core/Zephyr implementation.

## 3. ADC, DAC and measurable analog performance

The UNO Q MCU provides **14-bit ADC operation** on six Arduino analog-header pins (configurable read resolution of 14, 12, 10 or 8 bits) and **two DAC outputs**, configurable at up to **12 bits** according to Arduino's documented API.

For an ideal unipolar converter,

$$\Delta V_{\mathrm{LSB}}\approx \frac{V_{\mathrm{REF}}}{2^N}.$$

At $V_{\mathrm{REF}}=3.3$ V:
- **14-bit ADC:** ideal code spacing $\approx0.201$ mV.
- **12-bit DAC:** ideal code spacing $\approx0.806$ mV.

These are **quantization steps**, not measured voltage accuracy or achievable noise floor. ADC ENOB, INL/DNL, sample-and-hold loading, reference noise, source impedance, oversampling, sampling time and MCU analog supply noise matter.

### Critical analog-input limit

An **A0–A5 input used in analog mode is not 5 V tolerant**. Keep the input inside its documented analog range (nominally 0–$V_{\mathrm{REF+}}$). Arduino specifically warns that applying excessive voltage can cause injection current or damage. Condition higher-voltage measurements using an appropriate divider/buffer, series protection and antialias filtering.

**Simple lab example (MCU sketch only):** read a 3.3-V-compatible sensor on A2 and drive the onboard DAC0 output on A0. Do not attach an external circuit requiring more load current than the DAC can safely supply.

~~~cpp
// Arduino UNO Q: runs on the STM32U585 Arduino Core / Zephyr side.
// A2 is the ADC input; DAC0 (A0) is a distinct analog output.
const int sensorInput = A2;

void setup() {
  Serial.begin(115200);
  analogReadResolution(14);   // 0 ... 16383
  analogWriteResolution(12);  // 0 ... 4095 for the DAC
}

void loop() {
  const int sample = analogRead(sensorInput);
  const int dacCode = sample >> 2;  // ideal 14-bit to 12-bit mapping

  analogWrite(DAC0, dacCode);
  Serial.println(sample);

  delay(10);   // illustrative, NOT deterministic high-rate acquisition
}
~~~

For precise sampling use a hardware timer, DMA and bounded buffering on the STM32 side; profile the ISR/DMA completion time and move data to Linux in buffered frames rather than RPC calls per ADC sample. Treat MCU DAC waveforms as **low-frequency control/test signals**, not calibrated RF generators.

**Documentation:** [UNO Q user manual — ADC, DAC and pin assignments](https://docs.arduino.cc/tutorials/uno-q/user-manual/), [STM32U585 MCU datasheet](https://www.st.com/en/microcontrollers-microprocessors/stm32u585ai.html).

## 4. Electrical safety: 3.3 V MCU versus 1.8 V processor domains

The UNO form factor can be misleading: **UNO Q is not a 5 V logic board.**

| Signal bank | Normal signal level | Maximum specified in Arduino power guide |
|---|---:|---:|
| Maker MCU I/O: JDIGITAL / JANALOG | **3.3 V** | **3.6 V absolute maximum** |
| Processor I/O: JMEDIA / relevant JMISC / JCTL signals | **1.8 V** | **2.1 V absolute maximum** |
| ADC inputs in analog mode | **0 to VREF+** (typically 3.3 V) | Do not exceed the MCU analog-pin limits |

Some MCU pads can tolerate 5 V in particular *digital-input* configurations, but this **must not** be generalized to the headers, DACs, ADCs or processor banks. Use the pin-specific datasheet rules and an external translator where required. A powered shield designed to drive 5 V logic into UNO pins may be incompatible.

The board also routes 5 V and 7–24 V **power** on designated pins. These **are not logic signal levels**. [Official Arduino UNO Q power and pin-level guide](https://docs.arduino.cc/tutorials/uno-q/power-specification/).

## 5. Power tree and bring-up

### Inputs and derived rails

- **USB-C:** 5 V power; Arduino recommends a supply/cable supporting **5 V at 3 A**. USB Power Delivery negotiation requests a **5 V / 3 A** contract only.
- **VIN:** **7–24 V DC** at the specified input connection, converted to the system 5 V bus.
- **Regulated 5 V header supply:** permitted by the official power guide with correct wiring and supply budget.
- **5V_SYS:** common system power domain; upstream power paths are diode-OR combined.
- **3.8 V intermediate rail:** derived from 5 V; reserved for internal/system usage.
- **3.3 V rail:** supports STM32 and common peripheral logic.
- **1.8 V rail:** PMIC-derived, used by Qualcomm I/O and high-speed domains.

The power-conversion chain is conceptually:

<div class="pathway"><span class="node">USB-C 5 V / VIN 7–24 V</span><span class="arrow">→</span><span class="node">5V_SYS</span><span class="arrow">→</span><span class="node">3.8 V → 3.3 V</span><span class="arrow">+</span><span class="node">PMIC → 1.8 V / MPU rails</span></div>

**Input source ratings are not guaranteed accessory output current.** Available current on the 3.3 V or 5 V headers depends on system consumption, regulator limits, peripheral loads and thermal conditions. Budget Wi-Fi bursts, USB peripherals, camera start-up, DAC/ADC loads and worst-case application CPU utilization.

### Engineering bring-up procedure

1. Confirm SKU and power supply selection, including USB-C cable current rating.
2. Record 5V_SYS and 3.3/1.8 V rail quality under idle and stress conditions.
3. Measure startup/sleep states, load-step transients and USB-C host/device role changes.
4. Inspect the thermal distribution over PMIC, SoC, MCU and wireless module.
5. Check GPIO/analog-input protection and return-current paths before attaching a 5 V shield.
6. Perform a software reboot and MCU reset independently; document how bridge services reconnect.

**Official detailed power architecture:** [Arduino UNO Q Power Specifications](https://docs.arduino.cc/tutorials/uno-q/power-specification/).

## 6. Debian Linux, Zephyr and Arduino Bridge (RPC)

**MPU side:** Debian Linux, Python/C++ user-space applications, networking, media handling, Docker/Docker Compose and supported edge-AI workflows. **MCU side:** Arduino sketches running over Zephyr RTOS, using MCU timers, GPIO, ADC/DAC and hardware interrupts.

Arduino App Lab enables projects composed of Arduino sketches, Python processes, AI-model integrations and graphical components. Arduino IDE programs **only the microcontroller side**; App Lab and Linux workflows are needed to deploy Linux applications.

### Bridge transactions

1. Linux app or MCU sketch sends a request through the Arduino Bridge RPC framework.
2. The bridge/Arduino Router dispatches it to a registered endpoint on the other processor.
3. The remote processor executes the operation and returns a result or acknowledgment.
4. The caller handles timeout, out-of-order responses, startup ordering and device-reset recovery.

**Timing rule:** RPC is for configuration, status, bounded-size messages and noncritical control—not a substitute for synchronous digital control or a sample-accurate streaming interface. Configure the MCU to execute waveform generation or timed measurements autonomously and transmit summaries or captured buffers back to the Linux side.

**Recommended partition for RF test automation:** Linux runs SCPI, SSH, Ethernet/logging, user interface, data analysis and file storage; STM32 runs synchronized triggers, deterministic PWM, local interlocks and low-rate sensor acquisition. Use external frequency references/oscilloscopes for RF precision; UNO Q itself is not a calibrated VNA, spectrum analyzer or phase-coherent RF digitizer.

**Official:** [UNO Q Bridge / RPC examples and documentation](https://docs.arduino.cc/tutorials/uno-q/user-manual/), [Arduino App Lab documentation](https://docs.arduino.cc/software/app-lab/).

## 7. Connectivity, multimedia and carrier design

- **Wi-Fi 5**: dual-band 2.4 GHz / 5 GHz with onboard antenna; **Bluetooth 5.1**.
- **USB-C**: host/device role switching, video and accessory connectivity through supported adapters.
- **Camera/display:** MIPI CSI and DSI via JMEDIA; camera subsystem includes dual image-signal processors.
- **Audio:** additional analog-audio signals accessible through JMISC and carrier breakout.
- **Carrier:** [UNO Media Carrier](https://docs.arduino.cc/hardware/uno-media-carrier) exposes **two MIPI CSI camera connections**, a MIPI DSI display interface and audio connectors.
- **Qwiic:** 3.3 V I²C expansion for compatible modules.

**PCB / SI implications:** keep MIPI lanes short, impedance-controlled and referenced to continuous ground. Maintain differential-pair skew and avoid stubs. Check orientation, clock lane, voltage domains, power sequencing and high-speed connector stack before producing custom carriers. The SoC's camera throughput is not a guarantee of every USB camera or MIPI carrier's achievable frame rate.

**RF/EMC implication:** board Wi-Fi/Bluetooth transmitters, DC-DC switching and high-speed digital edges can corrupt low-level analog and magnetometer measurements. Keep antenna RF clearance, physical shielding, test-cable returns, separate sensor grounds where appropriate, and conducted/radiated emission checks in mind.

## 8. What UNO Q changes compared with UNO R4 WiFi

| Feature | **UNO Q** | **UNO R4 WiFi** |
|---|---|---|
| Main processor architecture | Quad Cortex-A53 Linux MPU **plus** Cortex-M33 MCU | Renesas RA4M1 Cortex-M4 + ESP32-S3 connectivity coprocessor |
| Real-time workflow | STM32U585 running Arduino Core on Zephyr | Main MCU Arduino workflow |
| Linux userspace | Yes, on onboard QRB2210 | No native application-processor Linux environment |
| RAM | 2 / 4 GB Linux RAM; MCU SRAM separately | 32 kB main MCU SRAM |
| Integrated eMMC | 16 / 32 GB | Not equivalent to an application-processor eMMC filesystem |
| Arduino-style I/O logic | **3.3 V** | **5 V** |
| Edge AI / camera | Linux, dedicated ISP/GPU and MIPI carriers | Much more constrained; generally external computing |
| System complexity | Higher: two processors, RPC, PMIC, Linux administration | Lower: traditional MCU-oriented embedded design |

UNO Q may be appropriate for edge vision, robotics, instrument control with logging and IoT gateway projects. A lower-cost MCU board can remain preferable for extremely simple GPIO/timer projects, ultra-low-power tasks or designs needing established 5 V shield compatibility.

## 9. Engineering projects relevant to EM and RF laboratories

| Project | Appropriate UNO Q subsystem | Key validation |
|---|---|---|
| **RF test bench orchestrator** | Linux Python driving SCPI/VISA instruments over network/USB | Command latency and traceable time stamps |
| **Synchronous test trigger generation** | STM32 timer/GPIO + external hardware sync where needed | Scope-verified jitter and timing repeatability |
| **Near-field scanning control** | Linux route planning + MCU motor interlock / position capture | Motion-induced EMI, trigger alignment |
| **Instrument environmental monitor** | MCU ADC/I²C sensors + Linux database/display | ADC calibration, sensor self-heating, shielding |
| **Camera-assisted optical measurement** | Qualcomm ISP / CSI and Linux analysis | Radiometric linearity, camera exposure and frame time |
| **Slow beamformer state controller** | MCU SPI/GPIO plus Linux control UI | BFIC latch/timing, electrical compatibility, state-to-measurement correspondence |
| **Real-time feedback demo** | STM32 ADC / timer / PWM, Linux dashboard | Closed-loop WCET, delay and fault-safe response |

### Suggested lab characterization

Measure the power spectrum on 3.3 V under Linux CPU load and Wi-Fi bursts; characterize ADC offsets and noise with a precision input; compare GPIO trigger jitter before and during bridge traffic; test conducted interference into a high-impedance analog frontend; verify operation following power interruption and network loss.

For high-rate RF acquisition or precisely timed phased-array channels, use an FPGA/RF data converter or dedicated instrumentation. UNO Q is better suited to **control, supervision and auxiliary sensing** rather than being the coherent high-speed digitizer itself.

## 10. Official engineering links

1. [Arduino UNO Q hardware landing page](https://docs.arduino.cc/hardware/uno-q) — authoritative pinout, schematic, datasheet, CAD and STEP downloads.
2. [UNO Q User Manual](https://docs.arduino.cc/tutorials/uno-q/user-manual/) — MCU pin assignments, ADC/DAC/PWM, Bridge, application architecture.
3. [UNO Q Power Specifications](https://docs.arduino.cc/tutorials/uno-q/power-specification/) — 5/3.3/1.8 V rails, absolute maxima, current budget and sequencing.
4. [UNO Q 2 GB store page](https://store.arduino.cc/products/uno-q) and [UNO Q 4 GB store page](https://store.arduino.cc/collections/boards-modules/products/uno-q-4gb) — SKU-specific RAM/eMMC.
5. [Qualcomm's UNO Q technical overview](https://www.qualcomm.com/developer/hardware/arduino-uno-q) — Dragonwing processor and division of work.
6. [UNO Media Carrier documentation](https://docs.arduino.cc/hardware/uno-media-carrier) — camera, display and audio carrier signals.
7. [STM32U585 manufacturer information](https://www.st.com/en/microcontrollers-microprocessors/stm32u585ai.html) — MCU analog and digital peripheral behavior.
8. [Arduino App Lab](https://docs.arduino.cc/software/app-lab/) — Linux/MCU integrated development.

**See also:** [Arduino Board Families](../arduino/) · [Hardware Interfaces & PCB/Flex](../hardware-interfaces-pcb-flex/) · [Data Converters](../data-converters/) · [Precision Timing](../precision-timing-synchronization/) · [Phased-Array Hardware](../phased-array-hardware/) · [CUDA & NVIDIA GPUs](../cuda-gpus/) (not applicable to the UNO Q Adreno GPU).
