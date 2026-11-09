"""Idealized phased-array hardware check: phase shifter versus true time delay.

Illustrative 16-element ULA at 9/10/11 GHz, 30-degree commanded scan.
No element-pattern variation, mutual coupling, RF nonlinearity, or
physical time-delay dispersion. Validate against HFSS embedded patterns
and calibrated beamformer states before using for hardware decisions.

Run: python phased_array_beam_squint.py
Requires: numpy and matplotlib
"""
import numpy as np
import matplotlib.pyplot as plt

C0 = 299_792_458.0
F0 = 10e9
FREQS = np.array([9e9, 10e9, 11e9])
N = 16
D = 14e-3
TARGET_DEG = 30.0
MAX_SCAN_DEG = 60.0
PHASE_BITS = 6

element_x = (np.arange(N) - (N - 1) / 2) * D
angle_deg = np.linspace(-80.0, 80.0, 1601)
u = np.sin(np.deg2rad(angle_deg))
u0 = np.sin(np.deg2rad(TARGET_DEG))


def ideal_phase_weights():
    return np.exp(-1j * 2 * np.pi * F0 * element_x * u0 / C0)


def quantized_phase_weights(bits):
    phase_step = 2 * np.pi / (2**bits)
    commanded = np.angle(ideal_phase_weights())
    quantized = phase_step * np.round(commanded / phase_step)
    return np.exp(1j * quantized)


def delay_weights(frequency):
    delays = element_x * u0 / C0
    return np.exp(-1j * 2 * np.pi * frequency * delays)


def pattern_db(weights, frequency):
    field = np.exp(1j * 2 * np.pi * frequency / C0
                   * element_x[:, None] * u[None, :])
    response = np.abs(weights @ field) / N
    return 20 * np.log10(np.maximum(response, 1e-12))


print("Frequency (GHz) | phase scan (deg) | 6-bit scan (deg) | TTD scan (deg)")
for f in FREQS:
    p = pattern_db(ideal_phase_weights(), f)
    q = pattern_db(quantized_phase_weights(PHASE_BITS), f)
    t = pattern_db(delay_weights(f), f)
    directions = [angle_deg[np.argmax(a)] for a in (p, q, t)]
    print(f"{f/1e9:8.2f}        | {directions[0]:10.2f}"
          f"       | {directions[1]:10.2f}      | {directions[2]:10.2f}")

max_pitch = (C0 / max(FREQS)
             / (1 + np.sin(np.deg2rad(MAX_SCAN_DEG))))
adjacent_delay = D * np.sin(np.deg2rad(MAX_SCAN_DEG)) / C0
print(f"1-D max pitch for +/-{MAX_SCAN_DEG:.0f} deg: "
      f"{max_pitch*1e3:.3f} mm")
print(f"Chosen pitch: {D*1e3:.3f} mm")
print(f"Adjacent delay at max scan: {adjacent_delay*1e12:.2f} ps")
print(f"Full aperture differential delay: "
      f"{(N-1)*adjacent_delay*1e12:.2f} ps")
print("This 1-D check does NOT verify a finite 2-D array or active match.")

fig, axes = plt.subplots(2, 1, sharex=True, figsize=(9, 8))
for f in FREQS:
    axes[0].plot(angle_deg, pattern_db(ideal_phase_weights(), f),
                 label=f"{f/1e9:g} GHz")
    axes[1].plot(angle_deg, pattern_db(delay_weights(f), f),
                 label=f"{f/1e9:g} GHz")

for axis, title in zip(axes, ["Fixed 10 GHz phase law (beam squint)",
                              "True time delay (fixed pointing)"]):
    axis.axvline(TARGET_DEG, color="k", linestyle=":", linewidth=0.8)
    axis.set_ylabel("Normalized array response (dB)")
    axis.set_ylim(-65, 3)
    axis.grid(True)
    axis.set_title(title)
    axis.legend()
axes[1].set_xlabel("Angle from broadside (degrees)")
fig.tight_layout()
plt.show()
