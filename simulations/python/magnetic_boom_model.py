"""Illustrative magnetic-dipole contamination along a spacecraft boom.

Requires: numpy, matplotlib. SI units, vacuum point-dipole approximation.
This is NOT an instrument calibration or a spacecraft magnetic model.
"""
import numpy as np
import matplotlib.pyplot as plt

MU0 = 4e-7 * np.pi
moment = np.array([0.0, 0.0, 0.10])   # magnetic dipole moment, A m^2
boom_z = np.linspace(0.4, 6.0, 500)   # distance from dipole, m
positions = np.column_stack((np.zeros_like(boom_z),
                             np.zeros_like(boom_z), boom_z))
r = np.linalg.norm(positions, axis=1)
rhat = positions / r[:, None]
field = (MU0 / (4 * np.pi)) * (
    3 * rhat * (rhat @ moment)[:, None] - moment
) / r[:, None] ** 3
ambient = np.array([12e-9, -7e-9, 25e-9])
measured = field + ambient
contamination_nt = np.linalg.norm(field, axis=1) * 1e9

print(f"At 1 m on axis: {2e-8 * 1e9:.1f} nT expected for 0.1 A m^2")
fig, ax = plt.subplots()
ax.plot(boom_z, contamination_nt, label="Spacecraft dipole field")
ax.axhline(np.linalg.norm(ambient) * 1e9, linestyle="--",
           label="Ambient-field magnitude (illustrative)")
ax.set_xlabel("Boom distance from equivalent dipole (m)")
ax.set_ylabel("Magnetic field magnitude (nT)")
ax.set_yscale("log")
ax.grid(True, which="both")
ax.legend()
plt.show()
