"""Bartlett direction finding for a simulated ideal uniform linear array.
Requires: numpy, matplotlib. Assumes a narrowband plane wave, no coupling.
"""
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)
n_ant = 8
spacing_lambda = 0.5
true_angle_deg = 23.0
snapshots = 300
snr_db = 12.0
element = np.arange(n_ant)

def steering(angle_deg):
    return np.exp(-1j * 2 * np.pi * spacing_lambda * element
                  * np.sin(np.deg2rad(angle_deg)))

signal = (rng.standard_normal(snapshots)
          + 1j * rng.standard_normal(snapshots)) / np.sqrt(2)
noise = (rng.standard_normal((n_ant, snapshots))
         + 1j * rng.standard_normal((n_ant, snapshots))) / np.sqrt(2)
data = steering(true_angle_deg)[:, None] * signal[None, :]
data += 10 ** (-snr_db / 20) * noise
cov = data @ data.conj().T / snapshots

angles = np.linspace(-90, 90, 721)
power = np.array([np.real(steering(a).conj() @ cov @ steering(a))
                  / n_ant for a in angles])
power_db = 10 * np.log10(np.maximum(power / power.max(), 1e-12))
estimated = angles[np.argmax(power)]
print(f"True angle: {true_angle_deg:.2f} deg; estimated: {estimated:.2f} deg")
fig, ax = plt.subplots()
ax.plot(angles, power_db)
ax.axvline(true_angle_deg, linestyle="--", label="True angle")
ax.set(xlabel="Angle (degrees)", ylabel="Bartlett spectrum (dB, normalized)",
       ylim=(-45, 2))
ax.grid(True)
ax.legend()
plt.show()
