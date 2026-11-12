# Python examples

These scripts are deliberately small, readable starting points for the equations used throughout the site.

- `array_factor.py` — steer a uniform linear array and inspect sidelobes/grating lobes.
- `link_budget.py` — wavelength, free-space path loss and Friis received power.
- `lorentz_boris.py` — charged-particle motion in uniform electric and magnetic fields using the Boris pusher.
- `optical_bloch_two_level.py` — driven dissipative two-level atom and steady/transient excited-state population.
- `halbach_ideal.py` — ideal Halbach-cylinder bore-field scaling and parameter sweep.

## Advanced space and RF exercises

- [phased_array_beam_squint.py](phased_array_beam_squint.py) — ideal 16-element array: RF phase shifters, quantization, true time delay, beam squint, 1-D element-spacing condition. See [hardware design chapter](../../phased-array-hardware/).


- [magnetic_boom_model.py](magnetic_boom_model.py) — 3-D magnetic dipole contamination of a spacecraft boom-mounted sensor.
- [coherent_timing_demo.py](coherent_timing_demo.py) — relative carrier phase, frequency error and RF-channel delay.
- [doa_array_demo.py](doa_array_demo.py) — simulated narrowband Bartlett array direction finding with calibrated steering vectors.
- [radiometry_photon_budget.py](radiometry_photon_budget.py) — photon/electron budget for a thermal-infrared blackbody scene.

Each script uses a **synthetic, idealized model**. Verify assumptions and substitute measured instrument transfer functions before interpreting real data.

- [adaptive_beamforming_mvdr_lcmv.py](adaptive_beamforming_mvdr_lcmv.py) — 12-element ULA with two interferers: conventional, diagonally loaded MVDR, LCMV, and output SINR. [Theory](../../aesa/#advanced-adaptive-beamforming-mvdr-lcmv-gsc-and-robust-arrays).

## Recommended environment

```bash
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install numpy scipy matplotlib
```

The scripts are educational references, not substitutes for convergence tests or a validated experimental model. Whenever possible compare them with an analytic limiting case and then with a measured observable.
