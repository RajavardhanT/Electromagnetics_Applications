"""Ideal infinitely long p=1 Halbach-cylinder bore-field scaling."""
import numpy as np
import matplotlib.pyplot as plt

Br = 1.2
Ri = 20e-3
Ro = np.linspace(21e-3, 80e-3, 400)
B = Br*np.log(Ro/Ri)

chosen_Ro = 40e-3
chosen_B = Br*np.log(chosen_Ro/Ri)
print(f"For Br={Br:.2f} T, Ri={Ri*1e3:.1f} mm, Ro={chosen_Ro*1e3:.1f} mm:")
print(f"Ideal bore field = {chosen_B:.3f} T")
print("Finite length, segmentation, temperature and material nonlinearity are not included.")

plt.figure(figsize=(7,4.2))
plt.plot(Ro*1e3, B)
plt.xlabel("Outer radius Ro (mm)")
plt.ylabel("Ideal bore field (T)")
plt.title("Ideal Halbach-cylinder scaling")
plt.tight_layout()
plt.show()
