---
layout: default
title: Arduino Boards — What You Need to Know
description: Practical engineering reference for Arduino boards: board families, microcontrollers, GPIO, ADC/DAC/PWM, timers, interrupts, UART/I2C/SPI/CAN/USB, voltage levels, power, sensors, motors, debugging, real-time behavior, and when to move beyond Arduino.
---

# Arduino Boards — What You Need to Know

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective-transparent.png"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Arduino-uno-perspective-transparent.png?width=1000" alt="Arduino Uno development board showing the microcontroller, USB connector, power jack, digital pins and analog pins." loading="lazy"></a>
  <figcaption>The classic Arduino Uno makes the microcontroller, power, digital I/O, analog inputs, serial interfaces, and USB programming connection physically visible. <a href="https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective-transparent.png">Image source: Creative Tools via Wikimedia Commons, CC BY 2.0</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>An Arduino board is a <strong>microcontroller development platform</strong>, not a magical electronics box. The board gives you a processor, clock, power regulation, USB programming, and accessible I/O pins; the Arduino software layer hides much of the MCU complexity. To use Arduino well, understand both levels: <strong>the easy API</strong> and <strong>the real hardware underneath</strong>.</div>

<div class="pathway"><span class="node">sensor / switch</span><span class="arrow">→</span><span class="node">GPIO / ADC / timer / bus</span><span class="arrow">→</span><span class="node">microcontroller</span><span class="arrow">→</span><span class="node">control logic</span><span class="arrow">→</span><span class="node">driver / actuator / communication</span></div>

# 1. First concept: Arduino is an ecosystem

"Arduino" can mean several things:

- a development board;
- an Arduino-compatible microcontroller platform;
- the Arduino IDE;
- the Arduino API;
- libraries;
- board support packages ("cores");
- shields and sensor modules;
- Arduino Cloud and IoT tooling.

The hardware family now spans simple 8-bit AVR boards, 32-bit Arm boards, ESP32-based boards, dual-core STM32 boards, industrial modules, and Linux-capable hybrid boards.

Official board overview: [Arduino Hardware](https://www.arduino.cc/hardware/).

---

# 2. Microcontroller versus microprocessor

A **microcontroller (MCU)** typically contains

$$
\boxed{
\text{CPU}
+
\text{Flash}
+
\text{RAM}
+
\text{GPIO}
+
\text{timers}
+
\text{ADC}
+
\text{serial peripherals}
}
$$

on one chip.

A **microprocessor / application processor** usually relies on external memory and often runs a full OS such as Linux.

Classic Arduino development is MCU-based and normally runs one firmware image directly on the hardware.

Modern Arduino products now also include hybrid Linux + MCU boards such as the UNO Q family.

---

# 3. Board families worth recognizing

You do **not** need to memorize every Arduino board.

Know the role of these families:

| Family / board | Why it matters |
|---|---|
| **UNO R3** | classic 8-bit AVR reference platform |
| **UNO R4 Minima / WiFi** | modern 32-bit Arm replacement in UNO form factor |
| **UNO Q** | newer Linux + MCU hybrid architecture |
| **Nano family** | compact, breadboard-friendly embedded/IoT boards |
| **MKR family** | compact 32-bit IoT/communications-oriented boards |
| **MEGA 2560** | many I/O pins, classic AVR architecture |
| **GIGA R1 WiFi** | high-performance dual-core STM32 with many I/O/peripherals |
| **Portenta** | industrial/professional high-performance modules |

Arduino's current hardware catalog explicitly spans UNO, Nano, GIGA, Portenta, industrial, and newer Linux/AI-capable boards. [Arduino Hardware](https://www.arduino.cc/hardware/)

---

# 4. UNO R3 — the classic reference

The UNO R3 uses an **ATmega328P**.

Important ideas:

- 8-bit AVR CPU;
- 16 MHz clock;
- 5 V logic;
- 14 digital I/O;
- 6 analog inputs;
- UART, SPI, I²C;
- limited RAM compared with modern MCUs.

Why it still matters:

- huge tutorial ecosystem;
- simple architecture;
- easy to understand registers/timers;
- ideal for basic electronics and embedded-control concepts.

The main limitation is not functionality—it is compute/memory headroom.

---

# 5. UNO R4 — modern UNO architecture

The UNO R4 Minima and UNO R4 WiFi use a **Renesas RA4M1 Arm Cortex-M4** at 48 MHz.

Compared with UNO R3, UNO R4 adds

- 32-bit CPU;
- much more Flash/RAM;
- 14-bit ADC;
- 12-bit DAC;
- RTC;
- CAN controller;
- native USB capability.

The UNO R4 WiFi additionally includes an **ESP32-S3** for Wi-Fi and Bluetooth and a 12×8 LED matrix.

Official specifications list 256 kB Flash, 32 kB RAM, 14 digital I/O, 6 analog inputs, one DAC, CAN, and 5 V GPIO operation. [Arduino UNO R4 WiFi](https://docs.arduino.cc/hardware/uno-r4-wifi)

---

# 6. Important UNO R3 → R4 electrical difference

Do not assume every UNO-compatible board can source the same pin current.

Arduino specifies approximately

- UNO R3: 20 mA class per GPIO;
- UNO R4: 8 mA per GPIO.

This matters when driving

- LEDs;
- transistor gates;
- relays;
- optocouplers.

The general rule is:

> Check the **specific board's datasheet**, not the board shape.

---

# 7. Nano family

Nano boards are compact and breadboard friendly.

Current examples include:

### Nano ESP32

- ESP32-S3;
- Wi-Fi;
- Bluetooth;
- USB-C;
- 16 MB Flash;
- MicroPython support.

[Arduino Nano ESP32](https://docs.arduino.cc/hardware/nano-esp32)

### Nano 33 BLE Rev2

- nRF52840;
- Arm Cortex-M4;
- 64 MHz;
- 1 MB Flash;
- 256 kB RAM;
- Bluetooth;
- onboard IMU;
- **3.3 V I/O**.

[Arduino Nano 33 BLE Rev2](https://store.arduino.cc/products/nano-33-ble-rev2)

The lesson is that "Nano" describes a form factor more than one processor architecture.

---

# 8. MKR family

MKR boards were designed around compact connected systems.

For example, the MKR WiFi 1010 uses

- SAMD21 Cortex-M0+;
- 48 MHz;
- 3.3 V logic;
- Wi-Fi/Bluetooth module;
- secure element;
- Li-Po battery support.

[Arduino MKR WiFi 1010](https://store.arduino.cc/products/arduino-mkr-wifi-1010)

MKR boards are useful for learning

- embedded IoT;
- low-power operation;
- battery-powered systems;
- 3.3 V interfacing.

---

# 9. GIGA R1 WiFi

The GIGA R1 WiFi is a much more capable board.

It uses an STM32H747 with

- Cortex-M7 at up to 480 MHz;
- Cortex-M4 at up to 240 MHz;
- 2 MB Flash;
- 1 MB RAM;
- 76 digital I/O;
- 12 analog inputs;
- 2 DACs;
- multiple UART/SPI/I²C interfaces;
- CAN controller;
- Wi-Fi/Bluetooth.

[Arduino GIGA R1 WiFi](https://store.arduino.cc/products/giga-r1-wifi)

This is closer to a serious embedded-control platform than a simple beginner board.

---

# 10. Portenta H7

The Portenta H7 is built around an STM32H747 dual-core MCU.

Important capabilities include

- Cortex-M7 + Cortex-M4;
- 8 MB SDRAM;
- 16 MB external Flash;
- Wi-Fi/Bluetooth;
- secure element;
- USB high-speed;
- Ethernet PHY;
- high-density connectors;
- industrial temperature range.

[Arduino Portenta H7](https://www.arduino.cc/pro/hardware-product-portenta-h7)

Portenta is where the Arduino ecosystem begins overlapping heavily with professional embedded development.

---

# 11. UNO Q and Linux-capable Arduino boards

The Arduino ecosystem now also includes boards where a Linux-capable application processor works alongside a microcontroller.

This changes the architecture:

$$
\boxed{
\text{Linux application processor}
+
\text{real-time MCU}
}
$$

instead of one bare-metal MCU.

This type of board is useful when a project needs

- Linux networking/software;
- computer vision;
- AI frameworks;
- high-level applications;

while still retaining deterministic low-level I/O through an MCU.

Treat these boards conceptually closer to a **single-board computer + MCU** than to a traditional Uno.

---

# 12. Voltage level is one of the first things to check

Two common logic domains are

$$
5\ \mathrm V
$$

and

$$
3.3\ \mathrm V.
$$

Never assume a 3.3 V input is 5 V tolerant.

Examples:

- UNO R3: 5 V logic;
- UNO R4: 5 V GPIO;
- Nano 33 BLE: 3.3 V;
- MKR WiFi 1010: 3.3 V;
- GIGA R1: 3.3 V.

Connecting 5 V directly into a non-tolerant 3.3 V input can damage the MCU.

Use

- resistor dividers;
- MOSFET level shifters;
- buffer/translator ICs;

when necessary.

---

# 13. GPIO

A GPIO pin can usually be configured as

- digital input;
- digital output;
- alternate peripheral function.

Arduino hides the register details with

~~~cpp
pinMode(8, OUTPUT);
digitalWrite(8, HIGH);
~~~

Underneath, the MCU is changing direction and output registers.

For fast or deterministic work, direct register/peripheral access can be dramatically faster than repeated high-level calls.

---

# 14. Inputs must not float

A disconnected CMOS input can assume unpredictable values.

Use

- external pull-up;
- external pull-down;
- internal pull-up/pull-down when available.

A switch is often wired as

$$
\text{GPIO}
\rightarrow
\text{switch}
\rightarrow
GND
$$

with an internal pull-up enabled.

---

# 15. Debouncing

Mechanical switches do not transition cleanly.

Contacts bounce for milliseconds.

Solutions include

- RC filtering;
- Schmitt-trigger hardware;
- software time filtering;
- state-machine debouncing.

Never interpret every raw edge from a mechanical button as a genuine press.

---

# 16. ADC

For a deeper treatment of converter architecture and specifications—including ENOB, SINAD, SFDR, INL/DNL, jitter, SAR/pipeline/delta-sigma ADCs, DAC settling and RF converters—see [ADC & DAC — Data Converters](../data-converters/).

An ADC converts voltage into a digital code.

For an ideal $N$-bit ADC,

$$
LSB
=
\frac{V_{REF}}{2^N}.
$$

A 10-bit ADC with 5 V reference gives approximately

$$
LSB\approx4.88\ \mathrm{mV}.
$$

Important ADC concepts:

- resolution;
- reference voltage;
- input source impedance;
- sampling rate;
- settling time;
- noise;
- calibration.

Higher nominal bit depth does not automatically mean equivalent effective resolution.

---

# 17. ADC input is not infinitely benign

The ADC often contains a sample-and-hold capacitor.

A high source impedance may not charge that capacitor quickly enough.

Therefore sensor-output impedance matters.

Possible solutions:

- longer acquisition time;
- lower source resistance;
- buffer op-amp.

This becomes important when measuring precision analog signals.

---

# 18. DAC versus PWM

A real DAC outputs an analog voltage.

PWM produces a pulse train with duty cycle

$$
D=\frac{t_{ON}}{T}.
$$

The average is approximately

$$
V_{avg}=DV_{DD}
$$

after suitable low-pass filtering.

Do not confuse

~~~cpp
analogWrite(...)
~~~

with a physical DAC unless the selected pin/board actually contains one.

UNO R4 includes a DAC; UNO R3 does not.

---

# 19. PWM

PWM is useful for

- LED brightness;
- motor control;
- heater control;
- crude analog output.

PWM relies on hardware timers.

Changing timer configuration can therefore affect other functions or libraries that use the same timer.

---

# 20. Timers

Timers are among the most important MCU peripherals.

They can generate

- periodic interrupts;
- PWM;
- pulse measurement;
- frequency counting;
- input capture;
- output compare.

For serious embedded work, learn the MCU's timer architecture beyond

~~~cpp
delay(...)
~~~

because hardware timers provide much better timing precision.

---

# 21. Interrupts

An interrupt temporarily suspends normal code to service an event.

Typical interrupt sources:

- GPIO edge;
- timer;
- UART RX;
- ADC completion;
- CAN message.

An interrupt service routine should usually be

- short;
- deterministic;
- nonblocking.

Avoid long delays, printing large messages, or doing heavy computation inside an ISR.

---

# 22. Polling versus interrupt-driven design

Polling:

~~~cpp
if (digitalRead(pin)) {
    // respond
}
~~~

is simple.

Interrupt-driven systems react asynchronously.

A good embedded architecture often combines

- interrupts for time-critical events;
- main-loop/state-machine processing for heavier work.

---

# 23. UART

UART is asynchronous serial communication.

Signals:

- TX;
- RX;
- GND.

Important parameters:

- baud rate;
- data bits;
- parity;
- stop bits.

UART is excellent for

- debugging;
- GPS modules;
- instrument interfaces;
- MCU-to-MCU communication.

---

# 24. I²C

I²C uses

- SDA;
- SCL.

Multiple devices share the same bus and use addresses.

Important points:

- requires pull-up resistors;
- open-drain signaling;
- bus capacitance limits speed;
- voltage compatibility matters.

Typical devices:

- temperature sensors;
- IMUs;
- EEPROM;
- RTC;
- ADC/DAC expanders.

---

# 25. SPI

SPI commonly uses

- SCLK;
- MOSI/COPI;
- MISO/CIPO;
- chip select.

Advantages:

- higher speed than typical I²C;
- full duplex;
- simple hardware.

Disadvantage:

- each peripheral usually needs its own CS.

Common SPI devices:

- ADCs;
- DACs;
- RF synthesizers;
- displays;
- SD cards.

For RF laboratory automation, SPI is particularly important because many PLLs, attenuators, switches, and transceiver ICs are register-programmed through SPI.

---

# 26. CAN

CAN is a robust differential communication bus widely used in

- vehicles;
- robotics;
- industrial equipment.

Important distinction:

> A microcontroller's CAN peripheral is **not the entire physical interface**.

You normally still need an external CAN transceiver connected to CAN-H/CAN-L.

The UNO R4 includes a CAN controller but requires an external transceiver for a real CAN bus.

---

# 27. USB

Modern Arduino boards may support USB as more than just a serial-programming cable.

Depending on the MCU, USB can provide

- serial CDC;
- keyboard/mouse HID;
- MIDI;
- custom USB device;
- USB host.

The UNO R4's native USB capability, for example, allows HID functionality.

---

# 28. Wi-Fi and Bluetooth

Wireless boards typically contain either

- a wireless MCU directly;
- or a separate radio module controlled by the main MCU.

Know the difference between

- Wi-Fi;
- Bluetooth Classic;
- Bluetooth Low Energy;
- ESP-NOW;
- Matter/Thread on supported hardware.

Wireless protocols bring additional concerns:

- antenna placement;
- current peaks;
- network security;
- firmware updates;
- latency;
- regulatory certification.

---

# 29. Sensors

Arduino is excellent for quickly interfacing sensors.

Common sensor outputs include

- analog voltage;
- resistance/capacitance;
- frequency;
- pulse width;
- I²C;
- SPI;
- UART.

A sensor interface is not just code.

Also understand

- supply voltage;
- reference;
- bandwidth;
- calibration;
- noise;
- grounding;
- sample rate.

---

# 30. Driving loads: never power motors directly from GPIO

GPIO is meant for logic-level current.

Do not directly drive

- motors;
- solenoids;
- relays;
- heaters;
- high-power LEDs.

Use a driver stage such as

- MOSFET;
- BJT;
- H-bridge;
- motor-driver IC;
- relay driver.

For inductive loads, include a flyback path.

---

# 31. MOSFET low-side switch

A common architecture is

$$
\text{GPIO}
\rightarrow
\text{gate resistor}
\rightarrow
\text{logic MOSFET}
\rightarrow
\text{load}.
$$

The MCU controls the MOSFET; it does not supply the load current.

Check

- $V_{GS}$ required for low $R_{DS(on)}$;
- current;
- power dissipation;
- gate charge;
- flyback diode for inductive loads.

---

# 32. Grounds must have a reference relationship

If two circuits communicate using single-ended logic, they normally need a common reference ground.

However, careless grounding can create

- ground loops;
- noise coupling;
- ADC errors;
- USB-ground problems.

For noisy motors or RF systems, think about **current return paths**, not merely whether two points are labeled GND.

---

# 33. Powering the board

Possible sources include

- USB;
- VIN;
- barrel jack;
- regulated 5 V / 3.3 V rail;
- battery on boards designed for it.

Do not blindly feed voltage into multiple power inputs simultaneously.

Check

- recommended VIN;
- regulator dissipation;
- USB current;
- available 3.3/5 V current.

A linear regulator dropping

$$
V_{in}-V_{out}
$$

dissipates approximately

$$
P=(V_{in}-V_{out})I.
$$

---

# 34. Decoupling

Digital switching creates current transients.

Good practice includes

- local ceramic decoupling;
- short power/ground paths;
- bulk capacitance near larger loads.

For custom Arduino-compatible hardware, the MCU datasheet's decoupling recommendations matter.

---

# 35. Arduino program structure

A basic sketch contains

~~~cpp
void setup() {
    // runs once
}

void loop() {
    // repeats forever
}
~~~

This is convenient but conceptually equivalent to

$$
\text{initialization}
\rightarrow
\text{infinite control loop}.
$$

Once you understand that, Arduino becomes much less mysterious.

---

# 36. Avoid blocking code

Code such as

~~~cpp
delay(1000);
~~~

stops ordinary program progress for that interval.

For responsive systems, prefer time-based scheduling:

~~~cpp
if (millis() - last >= interval) {
    last = millis();
    // task
}
~~~

This is the beginning of cooperative embedded scheduling.

---

# 37. State machines

A robust embedded program often uses explicit states:

$$
\boxed{
IDLE
\rightarrow
ARMED
\rightarrow
MEASURE
\rightarrow
PROCESS
\rightarrow
REPORT
}
$$

State machines scale much better than deeply nested delays and conditional statements.

---

# 38. Memory

Understand the difference between

- Flash: program/nonvolatile storage;
- SRAM: runtime variables/stack/heap;
- EEPROM or emulated nonvolatile storage.

On small AVR boards, RAM is extremely limited.

Symptoms of memory problems can include

- random resets;
- corrupted strings;
- unstable behavior.

---

# 39. Integer sizes matter

Embedded processors use fixed-width data types.

Prefer explicit types when size matters:

~~~cpp
uint8_t
uint16_t
uint32_t
int32_t
~~~

Be alert to

- overflow;
- signed/unsigned comparisons;
- integer division.

For example,

~~~cpp
3 / 2
~~~

is integer division and produces 1, not 1.5.

---

# 40. Floating point

Modern 32-bit MCUs often handle floating point far better than an 8-bit AVR.

The RA4M1 used on UNO R4 includes an Arm Cortex-M4 with FPU support.

Still, floating point may be unnecessary for simple timing, counters, and fixed-point control.

Choose numeric representation based on precision, speed, and determinism.

---

# 41. Libraries are useful—but inspect assumptions

Libraries speed development dramatically.

But check

- supported boards;
- pin assumptions;
- timer use;
- interrupt use;
- memory requirements;
- bus speed;
- blocking behavior.

Two libraries can conflict because both expect exclusive use of the same hardware peripheral.

---

# 42. Arduino core versus MCU datasheet

The Arduino API might expose

~~~cpp
analogRead()
~~~

but the actual MCU ADC has many more controls:

- reference;
- acquisition timing;
- averaging;
- triggering;
- gain;
- calibration;
- DMA.

For deeper work, move through this hierarchy:

$$
\boxed{
\text{Arduino function}
\rightarrow
\text{Arduino core implementation}
\rightarrow
\text{MCU peripheral}
\rightarrow
\text{datasheet/reference manual}.
}
$$

---

# 43. Debugging

Basic debugging:

- Serial print;
- LEDs;
- logic analyzer;
- oscilloscope.

More advanced boards support hardware debugging through

- SWD;
- JTAG;
- breakpoints;
- watchpoints;
- register inspection.

The Nano ESP32, for example, supports onboard debugging without an external probe.

---

# 44. Logic analyzer versus oscilloscope

Use a **logic analyzer** for

- UART;
- SPI;
- I²C;
- protocol timing;
- digital state.

Use an **oscilloscope** for

- rise/fall time;
- ringing;
- analog noise;
- voltage levels;
- PWM waveform;
- power rail behavior.

A digital bus can decode correctly while still having poor analog signal integrity.

---

# 45. Real-time behavior

Arduino is often used bare metal or with lightweight scheduling.

Real-time behavior depends on

- interrupt latency;
- timer configuration;
- blocking libraries;
- communication stacks;
- wireless tasks.

If deterministic timing matters, measure it with a scope or logic analyzer.

Do not assume a line of C++ runs at a predictable instant just because the code looks simple.

---

# 46. RTOS

On more advanced boards, a real-time operating system can provide

- tasks;
- priorities;
- queues;
- semaphores;
- timers.

An RTOS helps organize complex systems but does not automatically make them deterministic.

You still need to understand scheduling and shared-resource behavior.

---

# 47. Arduino for RF and laboratory work

Arduino can be very useful for

- programming PLL/synthesizer registers;
- controlling RF switches;
- setting DSAs and phase shifters;
- switching relays;
- reading temperature/power sensors;
- controlling motors/positioners;
- generating triggers;
- automating experiments.

For example,

$$
\text{Arduino}
\xrightarrow{SPI}
\text{PLL / DSA / RF switch}
$$

can create a simple custom RF-control subsystem.

---

# 48. What Arduino is not good at

A typical Arduino MCU is not the right tool for

- GHz RF waveform generation;
- high-speed ADC streaming without suitable hardware;
- very large DSP workloads;
- precision analog measurement without external front end;
- high-performance Linux applications on MCU-only boards;
- hard safety-critical systems without appropriate engineering process.

Use

- FPGA;
- RFSoC;
- dedicated ADC/DAC;
- DSP;
- Linux SBC;
- industrial controller;

when the application demands it.

---

# 49. Arduino versus Raspberry Pi

### Arduino MCU board

- deterministic low-level I/O;
- fast startup;
- no full OS required;
- low power;
- excellent for sensors/actuators.

### Raspberry Pi / Linux SBC

- Linux;
- filesystem;
- networking;
- high compute;
- Python/services/UI.

A common system uses both:

$$
\boxed{
\text{Linux computer}
\leftrightarrow
\text{Arduino/MCU}
\leftrightarrow
\text{real-time hardware}.
}
$$

---

# 50. Arduino versus FPGA

Arduino executes instructions sequentially on a CPU.

An FPGA implements hardware logic that operates in parallel.

Use an FPGA when you need

- deterministic ns-scale timing;
- many parallel channels;
- custom digital interfaces;
- high-speed DSP;
- very precise waveform/control logic.

Use Arduino when you need fast development and MCU-level control.

---

# 51. What you should be able to do

A useful Arduino skill set is the ability to:

- read a board pinout;
- identify 3.3 V vs 5 V logic;
- wire a button and LED safely;
- read an analog sensor;
- generate PWM;
- use timers;
- use interrupts;
- communicate with UART/I²C/SPI;
- connect a CAN transceiver;
- drive a MOSFET/relay/motor driver;
- read a datasheet;
- debug with Serial + scope + logic analyzer;
- write nonblocking code;
- implement a state machine;
- understand current and power limits;
- move below the Arduino API when necessary.

If you can do these things, you understand Arduino at an engineering level rather than only at a tutorial level.

---

# 52. Board-selection summary

| Need | Good starting category |
|---|---|
| Learn basic embedded electronics | UNO R4 / UNO R3 |
| Modern 5 V prototype | UNO R4 |
| Wi-Fi/Bluetooth in UNO format | UNO R4 WiFi |
| Small Wi-Fi/Bluetooth project | Nano ESP32 |
| BLE + inertial sensing | Nano 33 BLE / Sense |
| Battery/IoT prototype | MKR |
| Many I/O / advanced robotics | GIGA R1 |
| Professional/industrial MCU system | Portenta |
| Linux + real-time MCU | UNO Q / newer Q-class board |
| Extreme deterministic digital logic | FPGA instead of Arduino |

---

# 53. Official references

- [Arduino Hardware](https://www.arduino.cc/hardware/) — current board families.
- [Arduino UNO R4 WiFi documentation](https://docs.arduino.cc/hardware/uno-r4-wifi) — RA4M1, ESP32-S3, DAC, CAN, RTC and pinout resources.
- [UNO R3 versus R4](https://support.arduino.cc/hc/en-us/articles/9350551575964-What-s-the-difference-between-UNO-R3-and-UNO-R4-boards) — processor, memory, I/O and ADC differences.
- [Nano ESP32](https://docs.arduino.cc/hardware/nano-esp32) — ESP32-S3, Wi-Fi/Bluetooth and MicroPython.
- [Nano 33 BLE Rev2](https://store.arduino.cc/products/nano-33-ble-rev2) — nRF52840 and onboard IMU.
- [MKR WiFi 1010](https://store.arduino.cc/products/arduino-mkr-wifi-1010) — SAMD21, wireless connectivity and battery support.
- [GIGA R1 WiFi](https://store.arduino.cc/products/giga-r1-wifi) — dual-core STM32H747 and high I/O count.
- [Portenta H7](https://www.arduino.cc/pro/hardware-product-portenta-h7) — dual-core STM32H747 professional module.
- [Arduino Language Reference](https://docs.arduino.cc/language-reference/) — GPIO, time, interrupts and standard API.

Related: [Measurements & Instruments](../measurements/) · [Computational Methods](../computational-methods/) · [Silicon Interfaces & SoC](../silicon-soc/) · [Signal Integrity & Power Integrity](../signal-power-integrity/) · [Microwave & Space Electronics Components](../microwave-space-components/)
