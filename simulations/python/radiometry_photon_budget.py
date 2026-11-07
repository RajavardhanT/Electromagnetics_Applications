"""Illustrative infrared pixel photon/electron budget for a blackbody scene.
Requires: numpy, matplotlib. Uniform passband and no stray-light contribution.
"""
import numpy as np
import matplotlib.pyplot as plt

h, c, kb = 6.62607015e-34, 299792458.0, 1.380649e-23
wavelength = np.linspace(8e-6, 12e-6, 801)
area = 0.005                # optical collecting area, m^2
pixel_solid_angle = 1e-10   # sr, idealized
throughput = 0.40
quantum_efficiency = 0.70
integration_time = 0.010    # s
dark_electrons = 100.0
read_noise_e = 20.0

def spectral_radiance(temp_kelvin):
    exponent = h*c/(wavelength*kb*temp_kelvin)
    return 2*h*c*c / wavelength**5 / np.expm1(exponent)

def electron_budget(temp_kelvin):
    photon_rate_density = (spectral_radiance(temp_kelvin) * area
                           * pixel_solid_angle * throughput
                           * wavelength / (h*c))
    photon_rate = np.trapezoid(photon_rate_density, wavelength)
    electrons = photon_rate * quantum_efficiency * integration_time
    snr = electrons / np.sqrt(electrons + dark_electrons + read_noise_e**2)
    return electrons, snr

temps = np.linspace(250, 350, 101)
electron_counts, snr = np.array([electron_budget(temp) for temp in temps]).T
for temp in (260, 300, 340):
    n, value = electron_budget(temp)
    print(f"{temp:.0f} K: {n:,.0f} electrons / integration; SNR={value:.1f}")
print("Check detector full-well limits before using these results in a design.")
fig, ax = plt.subplots()
ax.plot(temps, electron_counts)
ax.set(xlabel="Scene blackbody temperature (K)",
       ylabel="Expected photoelectrons per integration")
ax.grid(True)
plt.show()
