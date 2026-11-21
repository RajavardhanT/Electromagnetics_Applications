"""Simplified MEMS gyro carrier readout and synchronous I/Q demodulation.

Models a driven mechanical carrier with a small rate-dependent channel,
a large quadrature component, additive voltage noise, demodulation phase
error, and first-order baseband low-pass filtering.

This is not a proprietary IMU ASIC or a complete mechanical model.
Use: python imu_gyro_demodulation.py
Requires: numpy, matplotlib
"""
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(124)
sample_rate = 200_000.0          # Hz
drive_frequency = 12_000.0       # Hz
duration = 0.10                 # s
angular_rate = 15.0             # deg/s (illustrative)
sensitivity = 0.4e-3           # V peak per deg/s (illustrative)
quadrature_amplitude = 0.050  # V peak
noise_std = 0.003              # V rms, sample-to-sample
reference_error_deg = 5.0      # degrees: demodulator phase error
baseband_bandwidth = 250.0     # Hz

time = np.arange(int(sample_rate * duration)) / sample_rate
carrier_phase = 2 * np.pi * drive_frequency * time

# Simplified mechanical/electrical relative-phase convention:
# Coriolis rate in cos reference; parasitic quadrature in sin reference.
rate_amp = sensitivity * angular_rate
v = (rate_amp * np.cos(carrier_phase)
     + quadrature_amplitude * np.sin(carrier_phase)
     + noise_std * rng.standard_normal(len(time)))

# Clock phase error rotates the quadrature into the rate estimate.
error = np.deg2rad(reference_error_deg)
ref_i = 2 * np.cos(carrier_phase + error)
ref_q = -2 * np.sin(carrier_phase + error)
mixed_i, mixed_q = v * ref_i, v * ref_q

# Simple first-order discrete LPF: use a small time step relative to the pole.
dt = 1.0 / sample_rate
alpha = 1 - np.exp(-2 * np.pi * baseband_bandwidth * dt)

def first_order_lowpass(signal):
    out = np.empty_like(signal)
    state = 0.0
    for k, item in enumerate(signal):
        state += alpha * (item - state)
        out[k] = state
    return out

i_out = first_order_lowpass(mixed_i)
q_out = first_order_lowpass(mixed_q)

settled = time > 0.06
rate_est = np.mean(i_out[settled]) / sensitivity
quadrature_est = np.mean(q_out[settled])
expected_bias = quadrature_amplitude * np.sin(error) / sensitivity
print(f"True rate: {angular_rate:.2f} deg/s")
print(f"Apparent rate with {reference_error_deg:.1f}° phase error:"
      f" {rate_est:.2f} deg/s")
print(f"Quadrature leakage predicted approximately:"
      f" {expected_bias:.2f} deg/s")
print(f"Estimated Q channel: {quadrature_est*1e3:.2f} mV")
print("Illustrative only: results depend on the selected phase convention.")

fig, axes = plt.subplots(2, 1, figsize=(9, 7), sharex=False)
short = time < 0.001
axes[0].plot(time[short] * 1000, v[short] * 1000)
axes[0].set(xlabel="Time (ms)", ylabel="Sense signal (mV)",
            title="Rate + quadrature + electronics noise")
axes[0].grid(True)
axes[1].plot(time * 1000, i_out / sensitivity, label="I: apparent rate (deg/s)")
axes[1].axhline(angular_rate, linestyle="--", label="True angular rate")
axes[1].set(xlabel="Time (ms)", ylabel="Apparent angular rate (deg/s)",
            title="Low-pass demodulator output with 5° phase mismatch")
axes[1].legend()
axes[1].grid(True)
fig.tight_layout()
plt.show()
