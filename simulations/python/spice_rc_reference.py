"""Analytical reference for the SPICE RC low-pass netlist.

Verifies the low-pass magnitude/phase and a 1-V step response.
Requires: numpy and matplotlib.
Run: python spice_rc_reference.py
"""
import numpy as np
import matplotlib.pyplot as plt

R = 1_000.0          # ohms
C = 10e-9            # farads
tau = R * C
fc = 1.0 / (2.0 * np.pi * tau)

frequency = np.logspace(2, 7, 600)
omega = 2 * np.pi * frequency
transfer = 1 / (1 + 1j * omega * tau)
gain_db = 20 * np.log10(abs(transfer))
phase_deg = np.rad2deg(np.angle(transfer))

time = np.linspace(0, 80e-6, 401)
step_out = 1 - np.exp(-time / tau)

print(f"RC time constant: {tau * 1e6:.3f} microseconds")
print(f"3-dB frequency: {fc:.3f} Hz")
print(f"Gain at f_c: {-10 * np.log10(2):.4f} dB")
print("Reference: pulse source netlist is periodic; step response assumes")
print("an isolated rising step with enough time to settle.")

fig, axes = plt.subplots(3, 1, figsize=(9, 9))
axes[0].semilogx(frequency, gain_db)
axes[0].axvline(fc, linestyle="--", label="f_c")
axes[0].set(ylabel="Gain (dB)", title="Analytical RC response")
axes[0].grid(True, which="both")
axes[0].legend()
axes[1].semilogx(frequency, phase_deg)
axes[1].axvline(fc, linestyle="--")
axes[1].set(xlabel="Frequency (Hz)", ylabel="Phase (degrees)")
axes[1].grid(True, which="both")
axes[2].plot(time * 1e6, step_out)
axes[2].axvline(tau * 1e6, linestyle="--", label="RC time constant")
axes[2].set(xlabel="Time (microseconds)", ylabel="Output voltage (V)")
axes[2].grid(True)
axes[2].legend()
fig.tight_layout()
plt.show()
