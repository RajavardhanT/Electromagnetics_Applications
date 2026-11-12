"""Conventional, MVDR and LCMV adaptive beamforming in a narrowband receive ULA.

Simulates a 12-element array with target at 10 deg and interferers at
-30 and +35 deg. Trains on independent target-free snapshots and evaluates
analytical held-out output SINR under the known simulated interference/noise.

Run: python adaptive_beamforming_mvdr_lcmv.py
Requires: numpy, matplotlib
Educational ideal-array model, not a full RF/EM/ADC implementation.
"""
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)
n = 12
spacing_lambda = 0.5
n_snapshots = 600
desired_deg = 10.0
interferer_deg = np.array([-30.0, 35.0])
interferer_power = np.array([150.0, 80.0])
desired_power = 1.0
noise_power = 1.0
diagonal_load_factor = 0.03


def steering(degrees):
    """Returns N-vector for scalar angle, N x K matrix for K angles."""
    degrees_array = np.atleast_1d(np.asarray(degrees, dtype=float))
    phase = -2j * np.pi * spacing_lambda * np.arange(n)[:, None]
    response = np.exp(phase * np.sin(np.deg2rad(degrees_array))[None, :])
    return response[:, 0] if np.ndim(degrees) == 0 else response


def complex_white(shape):
    return (rng.standard_normal(shape) +
            1j * rng.standard_normal(shape)) / np.sqrt(2.0)


a0 = steering(desired_deg)
aj = steering(interferer_deg)
jammers = np.sqrt(interferer_power)[:, None] * complex_white(
    (len(interferer_deg), n_snapshots))
thermal = np.sqrt(noise_power) * complex_white((n, n_snapshots))
x_train = aj @ jammers + thermal  # no desired source in training

r_sample = x_train @ x_train.conj().T / n_snapshots
mean_eigenvalue = np.trace(r_sample).real / n
r_loaded = r_sample + diagonal_load_factor * mean_eigenvalue * np.eye(n)

# Conventional: unity gain at modeled desired angle.
w_cbf = a0 / np.vdot(a0, a0)

# MVDR: solve a Hermitian linear system; do not form inv(R).
v = np.linalg.solve(r_loaded, a0)
w_mvdr = v / np.vdot(a0, v)

# LCMV: desired and nearby guard both unity, first jammer forced to null.
# The second jammer is suppressed through the adaptive covariance term.
c = np.column_stack([a0, steering(13.0), steering(-30.0)])
f = np.array([1.0, 1.0, 0.0], dtype=complex)
z = np.linalg.solve(r_loaded, c)
w_lcmv = z @ np.linalg.solve(c.conj().T @ z, f)

weights = {"Conventional": w_cbf, "MVDR": w_mvdr, "LCMV": w_lcmv}
r_in = ((aj * interferer_power[None, :]) @ aj.conj().T +
        noise_power * np.eye(n))


def sinr_db(w):
    signal = desired_power * abs(np.vdot(w, a0)) ** 2
    residual = np.vdot(w, r_in @ w).real
    return 10 * np.log10(signal / residual)


def wng_db(w):
    return 10 * np.log10(abs(np.vdot(w, a0)) ** 2 /
                         np.vdot(w, w).real)


angles = np.linspace(-80.0, 80.0, 1601)
a_grid = steering(angles)
fig, ax = plt.subplots(figsize=(9, 5.5))

for label, w in weights.items():
    response = np.abs(w.conj() @ a_grid)  # w^H a(theta)
    pattern_db = 20 * np.log10(np.maximum(response, 1e-6))
    ax.plot(angles, pattern_db, label=label)
    print(f"{label:12s} | SINR {sinr_db(w):7.2f} dB | "
          f"WNG {wng_db(w):7.2f} dB | "
          f"desired response {np.vdot(w, a0):.5f}")

print(f"LCMV constraint error: "
      f"{np.linalg.norm(c.conj().T @ w_lcmv - f):.2e}")
print(f"Loaded covariance condition number: {np.linalg.cond(r_loaded):.2g}")

ax.axvline(desired_deg, linestyle="--", color="black",
           linewidth=1, label="Desired look angle")
for angle in interferer_deg:
    ax.axvline(angle, linestyle=":", linewidth=1,
               label=f"Interferer {angle:g}°")
ax.set(xlabel="Angle from broadside (degrees)",
       ylabel="Array response (dB, unity at desired look)",
       title="Narrowband CBF vs loaded MVDR vs LCMV",
       xlim=(-80, 80), ylim=(-65, 20))
ax.grid(True)
ax.legend(fontsize=8, ncol=2)
fig.tight_layout()
plt.show()

# Future work: reduce snapshots, contaminate training with desired signal,
# perturb channel phase, test finite BFIC states and hybrid RF combining,
# or replace ideal steering vectors with HFSS embedded-element data.
