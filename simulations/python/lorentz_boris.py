"""Boris pusher for a charged particle in uniform E and B fields."""
import numpy as np
import matplotlib.pyplot as plt

q = -1.602176634e-19
m = 9.1093837015e-31
E = np.array([0.0, 0.0, 0.0])
B = np.array([0.0, 0.0, 1e-4])
dt = 2e-10
steps = 8000

r = np.zeros((steps, 3))
v = np.zeros((steps, 3))
v[0] = [1e5, 0.0, 0.0]

for k in range(steps-1):
    v_minus = v[k] + (q*E/m)*(dt/2)
    t = (q*B/m)*(dt/2)
    s = 2*t/(1 + np.dot(t,t))
    v_prime = v_minus + np.cross(v_minus, t)
    v_plus = v_minus + np.cross(v_prime, s)
    v[k+1] = v_plus + (q*E/m)*(dt/2)
    r[k+1] = r[k] + v[k+1]*dt

omega_c = abs(q)*np.linalg.norm(B)/m
r_c = m*np.linalg.norm(v[0,:2])/(abs(q)*np.linalg.norm(B))
print(f"Cyclotron frequency: {omega_c/(2*np.pi):.3e} Hz")
print(f"Expected radius: {r_c:.3e} m")

plt.figure(figsize=(5.2,5.2))
plt.plot(r[:,0], r[:,1])
plt.xlabel("x (m)")
plt.ylabel("y (m)")
plt.axis("equal")
plt.title("Electron trajectory: Boris pusher")
plt.tight_layout()
plt.show()
