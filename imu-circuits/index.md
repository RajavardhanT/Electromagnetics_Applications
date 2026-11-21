---
layout: default
title: IMU Hardware and Internal Analog Circuits — MEMS Accelerometers, Gyroscopes and Readout
description: Physics-first IMU engineering reference: capacitive MEMS accelerometer, Coriolis gyro drive and sense loops, charge amplifiers, synchronous I/Q demodulation, force rebalance, ADCs, noise, Allan deviation, calibration, PCB design, sensor fusion and manufacturer sources.
---

# IMU Hardware and Internal Analog Circuits

An **inertial measurement unit (IMU)** measures body-frame **specific force** and angular rate, normally along three axes each. A common six-axis IMU integrates three MEMS accelerometers, three MEMS gyroscopes, analog sensor interfaces, precision clocks/bias, ADCs, digital filters, calibration and a host interface. A magnetometer is optional and is **not itself an inertial sensor**.

**Focus of this page:** the internal sensing and analog/mixed-signal circuits, including the vibrating MEMS structures, excitation/drive loops, differential capacitive interfaces, charge amplifiers, coherent demodulation, feedback electronics and conversion to calibrated digital data. The block diagrams below are **functional educational implementations**; they are not proprietary transistor-level schematics of a particular commercial IC.

<div class="intuition"><span class="callout-title">Physics first</span>The mechanical structure converts acceleration or rotation into submicrometer motion. A capacitive interface converts motion into charge/current. An analog front-end extracts a small signal, rejects unwanted electrical/mechanical feedthrough and translates it into a code. The system then calibrates the result and—if required—integrates it into an attitude/navigation estimate.</div>

**Related chapters:** [Modern Inertial Navigation](../inertial-navigation/) · [Modern Gyroscopes](../modern-gyroscopes/) · [Analog Mixed-Signal IC Design](../analog-mixed-signal/) · [Data Converters](../data-converters/) · [Spacecraft Attitude Determination](../spacecraft-attitude-determination/).

## 1. Complete internal architecture

<figure class="topic-figure">
  <img src="{{ '/assets/imu-analog-signal-chain.svg' | relative_url }}" alt="Two IMU internal circuit signal chains: acceleration moves a capacitive proof mass whose differential capacitance is amplified, synchronously demodulated, low-pass filtered and converted in an ADC; the gyroscope has a resonant drive oscillator and AGC/PLL loop, orthogonal Coriolis sense capacitors, charge amplifier, I/Q demodulator, low-pass filters, quadrature compensation, and a digitally filtered angular rate output." loading="lazy">
  <figcaption>Conceptual IMU analog circuitry. A MEMS accelerometer primarily senses slowly varying proof-mass displacement; a vibrating gyroscope uses a driven resonant mode and measures Coriolis-induced motion with coherent readout. Precise ordering of analog/digital demodulation and converter stages varies by IC.</figcaption>
</figure>

| Physical / electrical block | Typical implementation | Primary errors |
|---|---|---|
| Proof mass and suspension | Micromachined silicon beams, capacitive fingers | Mechanical Brownian noise, resonance, shock, temperature stress |
| Sensor excitation | AC carrier, switched-capacitor excitation or electrostatic bias | Excitation feedthrough, amplitude/phase drift |
| Capacitive readout | Differential electrodes, charge amplifier or capacitance-to-digital front end | Parasitic capacitance, amplifier voltage/current noise, switch charge injection |
| Gyro drive loop | Resonant drive, phase-locked loop (PLL), automatic gain control (AGC) | Amplitude instability, frequency tracking error, mode coupling |
| Sense demodulation | Synchronous multiplier / switched demodulator / I-Q DSP | Phase error, quadrature leakage, bias |
| Feedback actuation | Electrostatic force-rebalance DAC/driver when implemented | Nonlinearity, actuator asymmetry, control-loop stability |
| ADC and filters | Often oversampling/ΣΔ conversion plus decimation and digital LPF | Quantization, aliasing, group delay and saturation |
| Calibration engine | Offset, sensitivity, axis rotation, temperature compensation | Residual bias, alignment, thermal drift and g-sensitivity |
| Digital interface | SPI, I²C, sometimes I3C; FIFO, data-ready/timestamp | Dropped samples, asynchronous reads, interrupt jitter |

**Architecture variants:** open-loop and force-balanced MEMS sensors have different control structures. Some IMU ASICs digitize a modulated carrier before the final I/Q demodulation; therefore, the diagram shows *signal functions*, not a mandatory order of individual CMOS blocks.

## 2. MEMS accelerometer — mechanical plant and displacement

A mass-spring-damper accelerometer is described by its relative proof-mass displacement $x$:

$$
m\ddot x+b\dot x+kx=-m a_{\mathrm{input}},
\qquad
\omega_n=\sqrt{k/m},\quad Q=\frac{m\omega_n}{b}.
$$

For an acceleration stimulus varying well below mechanical resonance ($\omega\ll\omega_n$), the quasi-static displacement magnitude is $|x|\simeq |a_{\mathrm{input}}|/\omega_n^2$. The sign depends on the defined sensor axis.

The accelerometer responds to **specific force** $\mathbf f=\mathbf a_{\mathrm{inertial}}-\mathbf g$, resolved in the sensor body frame under a consistent navigation convention. An accelerometer resting on a horizontal table measures approximately **1 g along its upward sensitive axis**, even though its inertial acceleration is zero. It cannot independently separate dynamic acceleration from gravity without attitude or additional information.

### Differential capacitive transducer

For a simplified variable-gap pair, with one proof-mass displacement $x$ and nominal gap $d$,

$$
C_+(x)=\frac{\epsilon A}{d-x},\qquad
C_-(x)=\frac{\epsilon A}{d+x},
$$

and for $|x|\ll d$,

$$
\boxed{\Delta C=C_+-C_-\simeq\frac{2\epsilon A}{d^2}x=\frac{2C_0}{d}x.}
$$

Real comb-finger structures may use **overlap variation rather than gap variation**; their capacitance-displacement law is different. Always use the actual micromechanical geometry.

**What this buys:** a differential readout suppresses common-mode parasitic effects and doubles first-order displacement sensitivity under ideal symmetry, but lithographic mismatch, packaging stress and parasitic return paths produce finite offsets and cross-axis sensitivity.

## 3. Internal accelerometer analog circuits

### 3.1 Excitation / switched-capacitor front end

A typical interface drives the capacitive bridge using an AC excitation or switched voltage and detects differential charge. The small-signal output charge scales approximately as

$$
\Delta Q\simeq V_{\mathrm{exc}}\Delta C
$$

under an appropriate electrode-voltage and virtual-ground convention. Static parasitic capacitances can be much larger than the motion-dependent $\Delta C$; differential excitation and charge-domain processing reduce their effect.

### 3.2 Charge amplifier and equivalent input noise

An ideal capacitive-feedback amplifier converts a packet of sensor charge to voltage:

$$
\boxed{\Delta V_o\simeq-\frac{\Delta Q}{C_f}.}
$$

For a resistively reset or continuous-time feedback configuration, the transfer function includes feedback impedance, finite op-amp gain, input capacitance and reset effects. The amplifier also sees the sensor's parasitic capacitance: this creates **voltage-noise-to-charge-noise conversion**, can reduce phase margin and may amplify clock feedthrough.

Design considerations:
- Low-noise OTA/op-amp; adequate loop gain and bandwidth at the excitation frequency.
- Feedback capacitor $C_f$ chosen for sensitivity versus dynamic range.
- Chopper stabilization or correlated double sampling (CDS) where appropriate to suppress offset and low-frequency noise.
- Common-mode feedback, mismatch, dielectric absorption and switch charge injection.
- **kT/C** sampling noise and clock phase nonoverlap in switched-capacitor designs.

### 3.3 Coherent detection and filtering

If the capacitive bridge output is modulated at excitation frequency $\omega_c$,

$$
v_s(t)=A_x\cos(\omega_c t+\phi_s)+v_{\mathrm{feedthrough}}(t)+n(t),
$$

multiply by a phase-coherent reference and low-pass filter. The desired baseband term is proportional to $A_x\cos\phi_s$; an incorrect demodulation phase reduces sensitivity and can fold unwanted feedthrough into the apparent acceleration.

**Typical readout path:** differential excitation → charge amplifier → synchronous demodulator → antialias / low-pass filtering → ADC or capacitance-to-digital converter → calibrated acceleration. A number of commercial architectures combine these functions in a sigma-delta sensor interface.

## 4. MEMS Coriolis gyroscope — drive and sense mechanics

A vibrating MEMS gyroscope first creates a controlled velocity on a drive axis. For rotation $\boldsymbol\Omega$ of the device, the rotating-frame Coriolis force is

$$
\boxed{\mathbf F_C=-2m(\boldsymbol\Omega\times\mathbf v_{\mathrm{rel}})}
$$

for the usual convention of inertial forces in the rotating sensor frame. The physical **sense** displacement is orthogonal to the drive motion and is approximately proportional to angular rate for small signal.

A simplified two-axis model is

$$
m_d\ddot x_d+b_d\dot x_d+k_dx_d=F_d(t),
$$

$$
m_s\ddot y_s+b_s\dot y_s+k_sy_s
=F_C(t)+F_q(t)+F_{\mathrm{fb}}(t).
$$

Here $F_q$ denotes unwanted mechanical/electrical quadrature coupling and $F_{\mathrm{fb}}$ denotes an optional sense feedback force. The signs of $F_C$ depend on the axis convention.

For $x_d(t)=X_d\cos(\omega_d t)$, the drive velocity amplitude is $\omega_d X_d$, so the Coriolis-force amplitude scales as

$$
\boxed{|F_C|\simeq 2m_s|\Omega|\,\omega_d X_d}
$$

for a suitable mode's effective mass. The sense displacement additionally depends on the mechanical transfer function

$$
H_s(j\omega)=\frac{1}{k_s-m_s\omega^2+j b_s\omega}.
$$

Therefore the rate sensitivity depends on **drive amplitude**, **sense-mode Q**, **drive/sense modal frequency separation** and the demodulation phase.

## 5. The gyroscope's internal drive circuit: oscillator, PLL and AGC

A vibratory gyro is an actively driven electromechanical resonator. The drive electronics maintain the correct phase and amplitude.

**Representative drive loop:**

1. Differential capacitive displacement/velocity pickoff from drive-mode electrodes.
2. Analog amplifier / band-pass filter and phase detector.
3. PLL or resonant frequency-tracking loop adjusting drive frequency.
4. AGC estimating drive amplitude and comparing it with a calibrated target.
5. DAC/electrostatic driver applying periodic force to the drive electrodes.
6. Continuous monitoring for startup, low drive amplitude, mode shift or saturation.

The resonance frequency is $\omega_d\simeq\sqrt{k_d/m_d}$ in the ideal unloaded model. The drive-to-sense phase reference must account for the **mechanical transfer function**; simplistic "same phase = rate" assignments are not universal.

**Why two loops?** Frequency control keeps the drive near the selected mode, while amplitude control keeps $X_d$ approximately constant so the sensitivity $2m\omega_d X_d$ is not mistaken for a changing $\Omega$.

## 6. Gyroscope sense electronics: I/Q demodulation and quadrature suppression

**Representative sense path:** sense capacitor bridge → charge-sensitive front end → programmable gain → synchronous I/Q demodulation with drive reference → low-pass filter → calibration/ADC or digital conversion → signed angular rate.

Write an idealized signal as

$$
v_s(t)=A_\Omega\cos(\omega_dt+\phi_\Omega)
+A_Q\cos(\omega_dt+\phi_Q)+n(t).
$$

$A_\Omega$ is rate-sensitive; $A_Q$ is parasitic quadrature or direct coupling. The *relative phase* depends on resonator dynamics and chosen readout reference. Two orthogonal demodulators produce

$$
I=\operatorname{LPF}\{2v_s(t)\cos(\omega_dt)\},
\qquad
Q=\operatorname{LPF}\{-2v_s(t)\sin(\omega_dt)\}.
$$

After appropriate axis rotation / phase calibration, one combination estimates rate and the other diagnoses quadrature leakage. If there is reference phase error $\epsilon$, a large quadrature component can create an apparent rate offset proportional to $A_Q\sin\epsilon$ in the simplest model.

### Quadrature-error mechanisms

- Unequal suspension stiffness and lithographic mismatch coupling drive motion into the sense axis.
- Capacitive electrode mismatch, parasitic feedthrough, packaging stress and thermal drift.
- Nonideal synchronous-demodulator phase and actuator cross coupling.

### Compensation / force-rebalance

A trimming DAC or electrostatic force applied to designated electrodes can reduce quadrature feedthrough. In **force-rebalance** gyroscopes, the sense displacement is driven toward zero and the feedback control effort estimates the required Coriolis force. This improves linearity and may extend measurement bandwidth, but introduces closed-loop stability, electrostatic-drive and noise-shaping tradeoffs.

**Do not confuse:** drive amplitude control, quadrature cancellation and sense force-rebalance are distinct loops with different error signals and stability requirements.

## 7. Analog and mixed-signal block-by-block design table

| Circuit block | Representative implementation | What to calculate or measure |
|---|---|---|
| Capacitive bridge and electrode bias | Two differential capacitors and AC/switched excitation | $dC/dx$, parasitic $C_p$, excitation-to-signal gain |
| Input OTA / charge amplifier | Capacitive feedback, high open-loop gain | Input-referred charge noise, saturation, loop bandwidth |
| Chopper / CDS | Modulation or sampled offset subtraction | Residual $1/f$ noise, ripple, demod artifacts |
| PLL/drive-frequency tracker | Phase detector, loop filter, oscillator | Lock range, mode tracking, phase error and loop stability |
| Drive AGC | Envelope detector, PI filter, drive DAC | Amplitude settling, resonance drift, gain stability |
| Gyro synchronous demod | Analog mixers/switches or digital I/Q | Rate/quadrature separation, reference phase sensitivity |
| Electrostatic actuation | Bias-controlled electrode force, DAC/HV stage | Actuator linearity, feedthrough, closed-loop margin |
| ADC / capacitance-to-digital | Oversampling/ΣΔ modulator and decimation or alternative ADC | ENOB, quantization, aliasing, overload and group delay |
| Digital filter/FIFO | LPF, decimator, data-ready and timestamp | Output data rate versus physical bandwidth |
| Calibration / compensation | Multiaxis gain matrix, temperature LUT | Bias versus $T$, cross-axis errors, residual scale factor |
| Supplies / reference | LDO, bandgap, bias-current and oscillator | Supply rejection, reference drift, switching spurs |

**Important:** an output-data-rate register is **not** the same as the analog measurement bandwidth. A nominal 16-bit register is also not evidence of 16-bit effective precision.

For analog design foundations see [Analog Mixed-Signal IC Design](../analog-mixed-signal/), [Data Converters](../data-converters/) and [Precision Timing](../precision-timing-synchronization/).

## 8. Noise and accuracy: from MEMS physics to Allan deviation

### Brownian / thermomechanical noise

In an ideal viscously damped proof-mass oscillator, the **one-sided** mechanical Langevin force-noise amplitude spectral density is

$$
S_F^{1/2}\simeq\sqrt{4k_BT\,b}\quad\mathrm{N}/\sqrt{\mathrm{Hz}},
$$

where $b$ is the viscous damping coefficient. The corresponding *equivalent input acceleration* spectral density is approximately

$$
\boxed{S_a^{1/2}\simeq\frac{\sqrt{4k_BT\,b}}{m}}
\quad \frac{\mathrm{m/s^2}}{\sqrt{\mathrm{Hz}}}
$$

under the same simplified convention and away from details of force-feedback shaping. Actual IMU noise includes readout, reference, package and digital-filter contributions, and the spectrum may be colored.

### Bias, angle random walk and acceleration integration

Let measured angular rate be $\tilde{\omega}=\omega+b_g+n_g$. A constant uncompensated gyro bias creates an angle error

$$
\delta\theta(t)\simeq b_g t.
$$

Likewise, a constant acceleration bias $b_a$ causes, in an ideal fixed-frame single-axis free-integration model,

$$
\delta v(t)\simeq b_a t,\qquad
\delta r(t)\simeq \tfrac12 b_a t^2.
$$

As a scale example, **1 mg acceleration bias** equals $\approx9.81\times10^{-3}$ m/s² and causes approximately **17.7 m position error after 60 s** in that simplified unaided model. Real strapdown errors also include attitude error coupling into gravity, Coriolis effects and cross-axis calibration.

### Allan deviation for inertial data

For consecutive averaged rate/acceleration samples $\bar y_k(\tau)$ over integration interval $\tau$,

$$
\sigma_A(\tau)=\sqrt{\tfrac12\mathbb E\big[
(\bar y_{k+1}(\tau)-\bar y_k(\tau))^2\big]}.
$$

For ideal white rate noise, Allan deviation follows an approximately $\tau^{-1/2}$ slope; some bias-instability processes produce a broad minimum/plateau, while rate random walk follows an increasing trend. Interpreting a plot requires the actual sensor data units, detrending policy, observation duration and noise model. **Bias instability is not simply the 1σ sample standard deviation**.

### Other IMU error mechanisms

Zero-rate offset, temperature drift, g-sensitivity of gyros, scale factor, misalignment, vibration rectification error (VRE), mechanical resonance, cross-axis coupling, saturation, sample timing jitter and aliasing. Industrial/precision devices may include dedicated calibration of **delta angle and delta velocity**, axis alignment and mounting point.

## 9. Sensor calibration and navigation equations

Represent raw outputs from gyros and accelerometers in sensor coordinates by

$$
\tilde{\boldsymbol\omega}=
\mathbf M_g(T)\boldsymbol\omega+\mathbf b_g(T)+\boldsymbol\eta_g,
$$

$$
\tilde{\mathbf f}=
\mathbf M_a(T)\mathbf f+\mathbf b_a(T)+\boldsymbol\eta_a.
$$

Matrices $\mathbf M_g,\mathbf M_a$ include sensitivities and nonorthogonal axes. A first-order calibrated value is $\hat{\boldsymbol\omega}=\mathbf M_g^{-1}(\tilde{\boldsymbol\omega}-\mathbf b_g)$, with an analogous accelerometer correction. More complete models include lever arm, g-sensitivity and temperature-hysteresis terms.

**Six-position static accelerometer calibration:** place each sensing axis along $\pm g$; fit scale and bias and check nonorthogonality using additional orientations. **Rate-table gyro calibration:** apply known $\pm$ angular rates at various temperatures, measure biases and scale factors, then hold out unseen rates for validation.

For body-frame specific force $\mathbf f^b$, a simplified inertial-frame relationship is

$$
\mathbf a^n=\mathbf R_b^n\,\mathbf f^b+\mathbf g^n,
$$

with a documented frame and gravity convention. INS mechanization also needs Earth rotation, transport-rate and position kinematics as required by the accuracy/application. See [Inertial Navigation](../inertial-navigation/) for the full propagation and fusion models.

### Complementary and Kalman filtering

A simple pitch/roll complementary filter combines integrated gyro rate with accelerometer-derived gravity direction:

$$
\hat{\theta}_k=\alpha(\hat{\theta}_{k-1}
+\omega_k\Delta t)+(1-\alpha)\theta_{\mathrm{acc},k}.
$$

This assumes acceleration is dominated by gravity over the accelerometer-correction timescale. An accelerometer **cannot independently resolve absolute yaw**; heading requires another observable or a navigation aid. Extended Kalman filters (EKF/ESKF) can estimate orientation, velocity, position, gyro/accelerometer biases and auxiliary-sensor errors, with explicit uncertainty and observation models.

## 10. Practical IMU ICs: what their data sheets reveal

| Device family / example | Architecture and noteworthy functions | Official technical source |
|---|---|---|
| **Bosch BMI270** | 6-axis consumer MEMS IMU, programmable digital filtering, configurable range, FIFO, SPI/I²C and motion-feature processing | [Bosch product and data sheet](https://www.bosch-sensortec.com/en/products/motion-sensors/imus/bmi270/) · [Full data sheet PDF](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bmi270-ds000.pdf) |
| **ST LSM6DSV16X** | 3-axis accel + 3-axis gyro, sensor-fusion low-power engine, separate OIS/EIS/UI processing paths and analog sensor hub | [ST product](https://www.st.com/en/mems-and-sensors/lsm6dsv16x.html) · [Full data sheet PDF](https://www.st.com/resource/en/datasheet/lsm6dsv16x.pdf) · [Application note](https://www.st.com/resource/en/application_note/DM00851721.pdf) |
| **ADI ADIS16470** | Precision 6-axis MEMS IMU; outputs calibrated acceleration, angular rate, integrated delta angle and delta velocity over SPI | [Product](https://www.analog.com/en/products/adis16470.html) · [Full data sheet](https://www.analog.com/media/en/technical-documentation/data-sheets/ADIS16470.pdf) |

**Example of a precision performance figure:** the ADIS16470 data sheet lists **8°/hour in-run gyro bias stability** under its specified test/estimation definition, a ±2000°/s gyro range, and ±40 g accelerometer range. This is a specific device/test condition, **not** a universal IMU specification.

**Important distinction:** these data sheets often document *functional block diagrams, digital filtering and calibration behavior*, not the complete transistor-level OTA, biasing, feedback-DAC and switched-capacitor schematics of the internal ASIC. The design topology shown here is grounded in published sensor-interface principles, not presented as undisclosed manufacturer IP.

## 11. PCB, power and measurement integration

| Design issue | Recommended engineering check |
|---|---|
| Mechanical placement | Put IMU close to desired body-frame measurement point; document lever arm to rotation center |
| Mounting strain | Avoid uncontrolled PCB bending, screw load and adhesive stress near MEMS package |
| Temperature | Model self-heating and gradients from regulators, PA/FPGA and ambient conditions |
| Supplies | Local bypass and low-noise rails; measure ripple at IMU pins during switching activity |
| I/O | Correct SPI/I²C voltage domain, pullups, trace lengths and interrupt/data-ready wiring |
| Ground and EMI | Keep high-current loops, DC-DC converters and RF antennas away from sensitive sensor/reference paths |
| Timing | Use data-ready, timestamps and FIFO as supported; quantify host read latency and dropped samples |
| Vibration | Test high-frequency mechanical excitation and vibration-rectification bias rather than only static calibration |
| Magnetic sensors | Keep motors, magnets, ferromagnetic metal and current loops away from magnetometer |
| Validation | Compare static gravity, multi-axis rate-table results, temperature sweeps, Allan deviation and independent references |

A calibrated IMU should be tested **after mounting** on its intended mechanical assembly. Packaging strain, board temperature gradients and vibration can change apparent bias and alignment even when factory calibration is good.

## 12. Engineering exercises and reproducible simulation

The [MEMS gyroscope drive/sense and lock-in example](../simulations/python/imu_gyro_demodulation.py) implements a pedagogical rate channel: resonant carrier drive, Coriolis-proportional readout, large quadrature feedthrough, coherent I/Q demodulation, reference-phase misalignment and low-pass filtering. It demonstrates why imperfect quadrature rejection produces apparent rate bias.

Other useful exercises:
1. Plot accelerometer displacement transfer $x(\omega)/a(\omega)$ and thermal input-noise spectral density versus damping and resonance.
2. Simulate ADC input referred noise versus charge amplifier $C_f$, sensor parasitics and excitation amplitude.
3. Calculate gyro scale-factor drift from a drive-amplitude error and frequency shift.
4. Generate six-position calibration data and recover accelerometer offsets plus sensitivity/axis matrix.
5. Use long stationary IMU records to estimate Allan deviation and distinguish white noise from slow drift.
6. Compute the position drift from constant accelerometer bias and an independent gyro-tilt error coupling gravity into horizontal acceleration.

## 13. Authoritative reading and original circuit references

1. [Analog Devices — Accelerometer and Gyroscope Sensors: Operation, Sensing and Applications](https://www.analog.com/en/resources/technical-articles/accelerometer-and-gyroscopes-sensors-operation-sensing-and-applications.html) — capacitive MEMS physics, charge readout, coherent demodulation and sigma-delta interfaces.
2. [Analog Devices — Improving Industrial Control with Integrated MEMS Inertial Sensors](https://www.analog.com/en/resources/technical-articles/improving-industrial-control-with-integrated-mems-inertial-sensors.html) — gyroscope capacitive sensing, electronics and integrated signal conditioning.
3. [Analog Devices — Charge Amplifier and ADC Interface (CN0350)](https://www.analog.com/en/resources/reference-designs/circuits-from-the-lab/cn0350.html) — external charge-sensor electronics; useful for principles, **not** the proprietary internal IMU ASIC.
4. [Bosch BMI270 data sheet](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bmi270-ds000.pdf) — real system block diagram, filtering, timing, SPI/I²C and interface setup.
5. [ST LSM6DSV16X datasheet](https://www.st.com/resource/en/datasheet/lsm6dsv16x.pdf) — integrated motion sensing, digital signal chain, sensor fusion and FIFO.
6. [ADI ADIS16470 data sheet](https://www.analog.com/media/en/technical-documentation/data-sheets/ADIS16470.pdf) — calibration, inertial error/noise specifications, data timing and delta-angle outputs.
7. [ADI MEMS IMU performance glossary](https://wiki.analog.com/resources/eval/user-guides/inertial-mems/imu-overview) — noise density, bias instability, Allan variance and measurement conditions.
8. [ST LSM6DSV16X application note](https://www.st.com/resource/en/application_note/DM00851721.pdf) — filter settings, sensor data and embedded processing.
9. A. Lawrence, *Modern Inertial Technology: Navigation, Guidance, and Control*, 2nd edition — sensors and navigation fundamentals.
10. P. Horowitz and W. Hill, *The Art of Electronics*, 3rd edition — analog signal conditioning, feedback, noise and converters.

**Further study:** [Modern Gyroscopes](../modern-gyroscopes/) · [Modern Inertial Navigation](../inertial-navigation/) · [Spacecraft Attitude and Precision Pointing](../spacecraft-attitude-determination/) · [Analog Mixed-Signal Circuits](../analog-mixed-signal/) · [Data Converters](../data-converters/) · [Simulation Library](../simulations/).
