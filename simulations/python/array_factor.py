"""Uniform linear-array factor with electronic steering."""
import numpy as np
import matplotlib.pyplot as plt

N = 16
spacing_lambda = 0.5
steer_deg = 30.0

th = np.linspace(-90, 90, 4001)
th_r = np.deg2rad(th)
th0 = np.deg2rad(steer_deg)
kd = 2*np.pi*spacing_lambda
n = np.arange(N)
progressive_phase = -kd*np.sin(th0)
phase = np.outer(n, kd*np.sin(th_r) + progressive_phase)
af = np.abs(np.exp(1j*phase).sum(axis=0))
af /= af.max()
af_db = 20*np.log10(np.maximum(af, 1e-5))

print(f"N={N}, d/lambda={spacing_lambda}, steering={steer_deg:.1f} deg")
print(f"Peak angle from sampled pattern: {th[np.argmax(af)]:.2f} deg")

plt.figure(figsize=(8,4.5))
plt.plot(th, af_db)
plt.ylim(-50, 0)
plt.xlim(-90, 90)
plt.xlabel("Angle (deg)")
plt.ylabel("Normalized array factor (dB)")
plt.title("Uniform linear array")
plt.grid(True, alpha=0.25)
plt.tight_layout()
plt.show()
