---
layout: default
title: CT / CAT Scan Physics
description: Physics and engineering of computed tomography, including X-ray production, attenuation, Hounsfield units, projection data, reconstruction, helical CT, detector systems, dose, artifacts, and spectral CT.
---

# CT / CAT Scan Physics

<div class="intuition"><span class="callout-title">30-second intuition</span>A CT scanner sends X-rays through the body from many angles. Each detector measurement records how strongly tissue attenuates the X-ray beam along one path. A computer then reconstructs the spatial distribution of attenuation coefficient from thousands of such line-integral measurements. CT is therefore <strong>electromagnetic propagation + matter interaction + inverse reconstruction</strong>.</div>

<div class="pathway"><span class="node">X-ray tube</span><span class="arrow">→</span><span class="node">collimation / filtration</span><span class="arrow">→</span><span class="node">patient attenuation</span><span class="arrow">→</span><span class="node">detector array</span><span class="arrow">→</span><span class="node">projection data</span><span class="arrow">→</span><span class="node">reconstructed CT image</span></div>

## 1. X-rays are electromagnetic waves

X-rays are high-frequency electromagnetic radiation. Photon energy is

$$
E=h\nu=\frac{hc}{\lambda}.
$$

For diagnostic CT, photon energies are typically in the tens to roughly hundreds of keV range. The X-ray wavelength is therefore much shorter than atomic dimensions relevant to ordinary RF or optical engineering.

The interaction regime is quantum: the detector records energy deposited by individual or ensembles of X-ray photons, while the propagation and imaging geometry can often be modeled with ray/integral methods.

---

## 2. X-ray production

A CT X-ray tube accelerates electrons through a high voltage toward a metal target.

An electron accelerated through potential $V$ can gain energy approximately

$$
E_e=eV.
$$

When the electron beam strikes the target, the X-ray spectrum contains:

- **bremsstrahlung** from electron deceleration in the target;
- **characteristic X-rays** associated with atomic-shell transitions.

The tube voltage, commonly specified in kVp, controls the maximum photon energy and strongly affects beam penetration and contrast.

Tube current and exposure time determine the approximate number of electrons striking the target and therefore strongly influence photon fluence.

A simplified engineering chain is

$$
\text{high voltage}
\rightarrow
\text{electron acceleration}
\rightarrow
\text{target interaction}
\rightarrow
\text{X-ray spectrum}.
$$

---

## 3. Beam filtration and bow-tie filters

Very low-energy X-rays are strongly absorbed near the patient surface and contribute disproportionately to dose without contributing much useful transmission information.

Filters remove part of this low-energy spectrum.

CT systems also use a **bow-tie filter** whose thickness varies across the fan beam. It compensates approximately for patient shape, reducing dynamic range at the detector and helping manage dose.

Because attenuation depends on photon energy, filtration changes not only total intensity but also the effective X-ray spectrum.

---

## 4. Beer–Lambert attenuation

For a monoenergetic beam traveling through homogeneous material,

$$
\boxed{
I=I_0e^{-\mu x}
}
$$

where

- $I_0$ is incident intensity;
- $I$ is transmitted intensity;
- $\mu$ is the linear attenuation coefficient;
- $x$ is path length.

For spatially varying material,

$$
\boxed{
I=I_0
\exp\left[
-\int_L \mu(\mathbf r)\,dl
\right].
}
$$

Taking the logarithm gives the measured projection value,

$$
p(L)
=
-\ln\left(\frac{I}{I_0}\right)
=
\int_L\mu(\mathbf r)\,dl.
$$

This is the mathematical heart of CT: each measurement is approximately a **line integral of attenuation coefficient**.

---

## 5. Why different tissues have different attenuation

Diagnostic X-ray attenuation depends primarily on

- photon energy;
- material density;
- atomic composition;
- photoelectric absorption;
- Compton scattering.

At lower diagnostic energies, photoelectric absorption has a strong dependence on atomic number. At higher diagnostic energies in soft tissue, Compton scattering is often important.

Because bone contains higher-density, higher-effective-atomic-number material than soft tissue, it generally has a larger attenuation coefficient and appears with higher CT number.

---

## 6. Hounsfield units

CT images normally display a normalized attenuation quantity called the **Hounsfield unit (HU)**:

$$
\boxed{
HU=
1000
\frac{\mu-\mu_{water}}
{\mu_{water}}.
}
$$

By definition, approximately,

| Material | Typical CT number |
|---|---:|
| air | $-1000$ HU |
| water | $0$ HU |
| fat | negative, often around $-100$ HU class |
| soft tissue | tens of HU |
| dense bone | hundreds to more than $1000$ HU |

Exact values depend on X-ray spectrum, reconstruction, scanner calibration, and material composition.

<div class="misconception"><span class="callout-title">Important distinction</span>HU is not a universal material constant. The underlying attenuation coefficient is energy dependent, so CT number can shift with tube spectrum, beam hardening, reconstruction method, and spectral CT technique.</div>

---

## 7. Projection geometry

A modern CT scanner rotates an X-ray source and detector array around the patient.

Common geometric descriptions include

- fan-beam CT;
- cone-beam CT;
- axial step-and-shoot scanning;
- helical or spiral CT.

For a 2-D idealization, the set of line integrals as a function of angle and detector position is related to the **Radon transform** of the attenuation map.

If

$$
f(x,y)=\mu(x,y),
$$

then a projection can be represented as

$$
P_\theta(s)
=
\int f(x,y)
\,\delta(s-x\cos\theta-y\sin\theta)
\,dx\,dy.
$$

Image reconstruction seeks the inverse mapping

$$
\{P_\theta(s)\}
\rightarrow
\mu(x,y).
$$

---

## 8. Filtered backprojection

Simple backprojection smears each measured projection back across the image and produces a blurred result.

Filtered backprojection (FBP) first filters each projection and then backprojects it.

In Fourier language, an ideal reconstruction uses a ramp-like filter proportional to spatial frequency magnitude,

$$
|k|.
$$

Conceptually,

$$
\boxed{
\text{projections}
\rightarrow
\text{frequency-domain filtering}
\rightarrow
\text{backprojection}
\rightarrow
\text{image}.
}
$$

Practical filters modify the ideal ramp to trade spatial resolution against noise.

---

## 9. Iterative reconstruction

Iterative methods begin with an estimated image, predict the measurements that image would produce, compare with the actual projections, and update the image.

A generic inverse problem is

$$
\mathbf p=\mathbf A\boldsymbol\mu+\mathbf n,
$$

where

- $\mathbf p$ is measured projection data;
- $\mathbf A$ is the projection/system matrix;
- $\boldsymbol\mu$ is the discretized attenuation image;
- $\mathbf n$ represents noise/model mismatch.

Modern methods can include statistical photon models, regularization, physical system models, and increasingly learned reconstruction components.

The benefit is often improved noise/artifact performance at a given dose, at the cost of greater computational complexity and dependence on the reconstruction model.

---

## 10. Helical CT and pitch

In helical CT, the patient table moves continuously while the source rotates.

A commonly used pitch definition is

$$
\text{pitch}
=
\frac{\text{table travel per rotation}}
{\text{total nominal beam width}}.
$$

Pitch changes axial sampling, scan speed, interpolation requirements, and dose behavior. The exact dose relationship depends on scanner operating mode and automatic exposure control.

---

## 11. Detector systems

Modern energy-integrating CT detectors commonly use a scintillator coupled to photodiodes.

The chain is

$$
\text{X-ray photon}
\rightarrow
\text{scintillation light}
\rightarrow
\text{photodiode charge}
\rightarrow
\text{readout electronics}.
$$

Important detector properties include

- quantum efficiency;
- scintillator stopping power;
- afterglow;
- cross-talk;
- electronic noise;
- dynamic range;
- temporal response.

Detector calibration is essential because the reconstruction assumes that variations across detector channels are known and corrected.

---

## 12. Photon-counting CT

Photon-counting detector CT attempts to register individual X-ray photon events and estimate their deposited energies.

Potential benefits include

- spectral discrimination;
- improved dose efficiency in some regimes;
- reduced electronic-noise influence;
- material decomposition;
- very high spatial resolution.

Important nonidealities include

- pulse pile-up;
- charge sharing;
- fluorescence escape;
- detector dead time;
- energy-threshold calibration.

Photon-counting CT makes the quantum nature of the X-ray field especially explicit.

---

## 13. Dual-energy and spectral CT

Because attenuation depends on photon energy, measurements acquired with different spectra provide additional material information.

For two basis materials,

$$
\mu(E,\mathbf r)
\approx
a_1(\mathbf r)\mu_1(E)
+
a_2(\mathbf r)\mu_2(E).
$$

Spectral measurements can therefore support decomposition into effective basis-material maps.

This is useful for tasks such as differentiating materials that may have similar conventional CT numbers but different energy dependence.

---

## 14. Beam hardening

A polychromatic X-ray beam does not obey the simple monoenergetic exponential law exactly.

Lower-energy photons are preferentially absorbed, so the transmitted beam's mean energy rises with path length. This is called **beam hardening**.

It can produce

- cupping artifacts;
- dark streaks between dense objects;
- bias in reconstructed CT numbers.

Correction methods include calibration, spectral modeling, filtration, and iterative reconstruction.

---

## 15. Scatter

Not all photons arriving at the detector traveled directly from source to detector. Compton-scattered photons can reach the detector along altered trajectories.

Scatter violates the ideal line-integral model and can reduce contrast or produce shading artifacts.

Scatter control methods include

- detector collimation;
- bow-tie shaping;
- geometric design;
- software correction;
- model-based reconstruction.

Scatter is particularly important in wide cone-beam geometries.

---

## 16. Spatial resolution

CT spatial resolution is influenced by

- detector element size;
- focal-spot size;
- source-to-object and source-to-detector geometry;
- number of projection angles;
- reconstruction kernel;
- patient motion;
- slice thickness.

Resolution and noise are linked: emphasizing high spatial frequencies generally improves edge sharpness while increasing image noise.

The modulation-transfer function (MTF) is commonly used to characterize spatial-resolution performance.

---

## 17. Noise and photon statistics

For an ideal photon-counting process,

$$
\sigma_N\sim\sqrt N,
$$

so relative counting noise scales approximately as

$$
\frac{\sigma_N}{N}
\sim
\frac{1}{\sqrt N}.
$$

More detected photons generally reduce quantum noise, but require greater radiation exposure if other parameters remain fixed.

After the logarithm used to form projection data, noise becomes signal dependent, especially for strongly attenuated rays.

---

## 18. Dose metrics

CT uses ionizing radiation, so dose optimization is a central engineering requirement.

Common scanner output metrics include

- **CTDI$_{vol}$** — a standardized scanner-output dose index;
- **DLP** — dose-length product.

A common relationship is

$$
\boxed{
DLP=CTDI_{vol}\times\text{scan length}.
}
$$

These quantities characterize scanner output and scan extent; they are not identical to the absorbed dose in every organ or to an individual patient's biological risk.

Tube current modulation, tube voltage selection, collimation, pitch, reconstruction, and patient size all influence dose-performance tradeoffs.

---

## 19. Common CT artifacts

| Artifact | Main origin |
|---|---|
| beam hardening | polychromatic attenuation |
| photon starvation | too few transmitted photons |
| metal streaks | severe attenuation + beam hardening + scatter |
| ring artifacts | detector calibration mismatch |
| motion artifacts | patient/object motion during acquisition |
| partial-volume artifact | multiple materials within a voxel |
| cone-beam artifact | incomplete sampling/model limitations |
| aliasing | insufficient angular or detector sampling |

Understanding artifacts often requires tracing the error through the full chain

$$
\text{source spectrum}
\rightarrow
\text{transport}
\rightarrow
\text{detector}
\rightarrow
\text{projection correction}
\rightarrow
\text{reconstruction}.
$$

---

## 20. CT versus MRI

| Property | CT | MRI |
|---|---|---|
| Primary field | X-rays | static $B_0$ + gradients + RF |
| Ionizing radiation | yes | no ionizing radiation |
| Main contrast origin | X-ray attenuation | nuclear-spin dynamics / relaxation |
| Acquisition | projection measurements | spatial-frequency encoding |
| Typical strength | fast imaging, bone/lung, emergency imaging | soft-tissue contrast, functional/sequential imaging |
| Main EM regime | ionizing X-ray photons | static through RF |

Both are electromagnetic imaging technologies, but they operate in fundamentally different physical regimes.

---

## 21. Computational modeling of CT

Useful simulation layers include

### Source model

- focal spot;
- X-ray spectrum;
- filtration;
- bow-tie filter.

### Photon transport

Monte Carlo methods model photoelectric absorption, Compton scatter, detector interactions, and dose deposition.

### Projection model

Fast line-integral or ray-tracing models are useful for reconstruction development.

### Detector model

Models can include scintillator blur, energy response, electronic noise, photon-counting thresholds, pile-up, and charge sharing.

### Reconstruction

- filtered backprojection;
- algebraic reconstruction;
- statistical iterative methods;
- model-based iterative methods;
- learned reconstruction.

CT therefore combines electromagnetic/quantum transport with inverse-problem computation.

---

## 22. Engineering view of the complete scanner

A CT scanner can be viewed as a coupled system:

$$
\boxed{
\text{high-voltage power}
\rightarrow
\text{X-ray generation}
\rightarrow
\text{beam shaping}
\rightarrow
\text{matter interaction}
\rightarrow
\text{detector electronics}
\rightarrow
\text{data acquisition}
\rightarrow
\text{inverse reconstruction}.
}
$$

This makes CT an excellent example of electromagnetic physics extending all the way from electron acceleration and photon generation to sensing, signal processing, and image formation.

---

## 23. Selected references

- A. M. Cormack, “Representation of a Function by Its Line Integrals, with Some Radiological Applications,” *Journal of Applied Physics* **34**, 2722–2727 (1963). [DOI](https://doi.org/10.1063/1.1729798)
- G. N. Hounsfield, “Computerized transverse axial scanning (tomography): Part 1. Description of system,” *British Journal of Radiology* **46**, 1016–1022 (1973). [DOI](https://doi.org/10.1259/0007-1285-46-552-1016)
- FDA, [Computed Tomography (CT)](https://www.fda.gov/radiation-emitting-products/medical-x-ray-imaging/computed-tomography-ct)
- AAPM, [CT resources and reports](https://www.aapm.org/)

Related: [Medical Electromagnetics](../medical/) · [Computational Methods](../computational-methods/) · [Optics & Photonics](../optics-photonics/) · [Theory ↔ Experiment](../theory-experiment/)
