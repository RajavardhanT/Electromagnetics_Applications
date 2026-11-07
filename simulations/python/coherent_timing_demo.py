"""Coherent-channel example: distinguish frequency error, phase offset and delay.
Requires: numpy, matplotlib. Synthetic complex-baseband samples.
"""
import numpy as np
import matplotlib.pyplot as plt

fs = 1_000_000.0        # complex sample rate, Hz
n = 12000
t = np.arange(n) / fs
tone_hz = 140_000.0
relative_frequency_hz = 20.0
static_phase_rad = 0.6
channel_delay_s = 0.25e-6

ch1 = np.exp(1j * 2 * np.pi * tone_hz * t)
ch2 = np.exp(1j * (2 * np.pi * (tone_hz + relative_frequency_hz)
                      * (t - channel_delay_s) + static_phase_rad))
relative_phase = np.unwrap(np.angle(ch2 * np.conj(ch1)))
slope, intercept = np.polyfit(t, relative_phase, 1)
print(f"Estimated frequency offset: {slope / (2*np.pi):.6f} Hz")
print(f"Phase at first sample: {relative_phase[0]:.3f} rad")
print("Phase offset and delay are not independently identifiable with one CW tone.")
fig, ax = plt.subplots()
ax.plot(t * 1000, relative_phase, label="Measured relative phase")
ax.plot(t * 1000, slope * t + intercept, "--", label="Linear phase fit")
ax.set(xlabel="Time (ms)", ylabel="Unwrapped phase (rad)")
ax.grid(True)
ax.legend()
plt.show()
