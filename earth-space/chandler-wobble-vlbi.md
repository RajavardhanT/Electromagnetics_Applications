---
layout: default
title: Measuring the Chandler Wobble with VLBI
---

# Measuring the Chandler Wobble with VLBI

## Overview

The **Chandler wobble** is a free oscillation of Earth's rotation axis relative to the solid Earth. Its characteristic period is roughly **430–435 days**. Unlike the annual component of polar motion, which is driven by seasonal redistribution of atmospheric, oceanic, and hydrological mass, the Chandler wobble is a natural rotational mode of the Earth.

Precise measurements of polar motion are part of the **Earth Orientation Parameters (EOP)**. Modern space-geodetic techniques—including **Very Long Baseline Interferometry (VLBI)**, GNSS, Satellite Laser Ranging (SLR), and Lunar Laser Ranging (LLR)—are combined to determine Earth orientation with very high precision.

## Electromagnetic connection: Very Long Baseline Interferometry

VLBI is fundamentally an application of **radio-frequency electromagnetics and interferometry**. Radio telescopes separated by hundreds to thousands of kilometres observe the same distant compact radio source, usually an extragalactic quasar.

Because quasars are extremely distant, their incoming radio waves can be treated approximately as plane wavefronts. The wavefront reaches different antennas at slightly different times. For a baseline vector $\mathbf{B}$ and source direction $\hat{\mathbf{s}}$, the leading geometric delay is approximately

$$
\tau_g \approx \frac{\mathbf{B}\cdot\hat{\mathbf{s}}}{c},
$$

where $c$ is the speed of light.

The received broadband radio signals are time-tagged using highly stable frequency standards and cross-correlated. Measuring the delay between stations constrains the orientation of the terrestrial baseline relative to the celestial reference frame.

## From radio waves to Earth's wobble

VLBI therefore creates a direct measurement chain:

**quasar radio emission → electromagnetic wave propagation → geographically separated radio telescopes → interferometric time delay → terrestrial/celestial reference-frame orientation → Earth Orientation Parameters → polar motion**.

Repeated observations of many quasars with a global telescope network allow the orientation of Earth to be determined relative to the nearly inertial **International Celestial Reference Frame (ICRF)**. VLBI is particularly important because the ICRF itself is realized from VLBI observations of compact extragalactic radio sources.

The polar-motion coordinates describe the displacement of Earth's instantaneous rotation axis relative to the crust. Analysis of their time dependence reveals the Chandler and annual components of polar motion.

## Physical significance

The Chandler period and damping provide information about Earth's internal structure and dissipation. The observed period differs from the simple rigid-Earth Euler wobble because Earth is deformable and contains oceans, atmosphere, mantle, and fluid core. Atmospheric, oceanic, and hydrological angular-momentum variations also continually excite polar motion.

A modern analysis by Nastula and Gross obtained a preferred Chandler period of $430.9\pm0.7$ solar days and investigated its quality factor using space-geodetic polar-motion observations together with SLR and GRACE gravity observations.

## Why this belongs in electromagnetics

The Chandler wobble is a striking example in which an electromagnetic measurement made at radio frequencies reveals a global mechanical property of a planet. The phenomenon being measured is rotational/geophysical, but the measurement is enabled by electromagnetic-wave reception, antennas, low-noise RF systems, frequency standards, signal correlation, and radio interferometry over intercontinental baselines.

## References

1. NASA Goddard Space Flight Center, **[VLBI](https://earth.gsfc.nasa.gov/geo/instruments/vlbi)** — overview of VLBI as a space-geodetic technique for defining an inertial reference frame and measuring Earth's orientation.

2. NASA Earthdata, **[Beacons in the Sky Help Monitor Earth's Orientation in Space](https://www.earthdata.nasa.gov/learn/sensing-our-planet/beacons-in-the-sky-help-monitor-earth-s-orientation-in-space)** — description of quasar VLBI, Earth Orientation Parameters, polar motion, and UT1.

3. NASA CDDIS / Earthdata, **[Very Long Baseline Interferometry (VLBI) Earth Orientation Parameters (EOP) Products](https://www.earthdata.nasa.gov/data/catalog/cddis-vlbi-eop-prod-1)** — operational Earth-orientation products derived from VLBI.

4. International Earth Rotation and Reference Systems Service (IERS), **[International Celestial Reference System / International Celestial Reference Frame](https://www.iers.org/iers/en/dataproducts/icrs/icrs)** — the celestial reference system and its realization using VLBI observations of extragalactic compact radio sources.

5. J. Nastula and R. Gross, **[Chandler wobble parameters from SLR and GRACE](https://doi.org/10.1002/2014JB011825)**, *Journal of Geophysical Research: Solid Earth*, **120**, 4474–4483 (2015). DOI: 10.1002/2014JB011825.

6. J. Höpfner, **[Chandler and annual wobbles based on space-geodetic measurements](https://doi.org/10.1016/S0264-3707(03)00056-5)**, *Journal of Geodynamics*, **36**, 369–381 (2003). DOI: 10.1016/S0264-3707(03)00056-5.

[← Home](../)
