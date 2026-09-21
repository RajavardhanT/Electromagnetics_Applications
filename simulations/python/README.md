# Python examples

These scripts are deliberately small, readable starting points for the equations used throughout the site.

- `array_factor.py` — steer a uniform linear array and inspect sidelobes/grating lobes.
- `link_budget.py` — wavelength, free-space path loss and Friis received power.
- `lorentz_boris.py` — charged-particle motion in uniform electric and magnetic fields using the Boris pusher.
- `optical_bloch_two_level.py` — driven dissipative two-level atom and steady/transient excited-state population.
- `halbach_ideal.py` — ideal Halbach-cylinder bore-field scaling and parameter sweep.

## Recommended environment

```bash
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install numpy scipy matplotlib
```

The scripts are educational references, not substitutes for convergence tests or a validated experimental model. Whenever possible compare them with an analytic limiting case and then with a measured observable.
