"""Transient optical Bloch equations for a driven two-level atom."""
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

Gamma = 2*np.pi*5e6
Omega = 2*np.pi*2e6
Delta = 0.0
gamma2 = Gamma/2

# state y = [rho_ee, Re(rho_ge), Im(rho_ge)]
def rhs(t, y):
    ree, x, z = y
    # convention rho_ge=x+i z
    dree = -Gamma*ree - Omega*z
    dx = -gamma2*x + Delta*z
    dz = -gamma2*z - Delta*x + 0.5*Omega*(2*ree-1)
    return [dree, dx, dz]

t = np.linspace(0, 2e-6, 2500)
sol = solve_ivp(rhs, (t[0], t[-1]), [0,0,0], t_eval=t, rtol=1e-9, atol=1e-11)
ree = sol.y[0]
print(f"Final excited-state population: {ree[-1]:.5f}")

plt.figure(figsize=(7,4.2))
plt.plot(t*1e6, ree)
plt.xlabel("Time (microseconds)")
plt.ylabel("Excited-state population")
plt.title("Driven dissipative two-level atom")
plt.tight_layout()
plt.show()
