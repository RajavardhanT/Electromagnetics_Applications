---
layout: default
title: Subatomic Particles & Electromagnetics
---

# Subatomic Particles & Electromagnetics

Electromagnetism played a central role in the discovery of the first subatomic particles. Long before modern particle accelerators and collider detectors, physicists learned to infer the existence, charge, mass, momentum, and trajectories of invisible particles by observing how they interact with **electric and magnetic fields**.

This page connects classical electromagnetics to the historical discovery of the electron, proton, neutron, and later particle physics.

> **Central idea:** charged particles reveal themselves through their response to electromagnetic fields.

---

## 1. The electromagnetic bridge to particle physics

The Lorentz force is the most direct connection:

$$
\mathbf F=q(\mathbf E+\mathbf v\times\mathbf B).
$$

An electric field accelerates a charged particle, while a magnetic field bends its trajectory perpendicular to its velocity. By measuring the resulting motion, experimenters can determine fundamental properties of the particle.

For a particle moving perpendicular to a uniform magnetic field,

$$
qvB=\frac{mv^2}{r},
$$

so that

$$
\frac{q}{m}=\frac{v}{Br}.
$$

This simple relationship lies behind some of the most important early measurements in atomic and particle physics.

For a relativistic particle the momentum relation becomes

$$
p=qBr,
$$

where $p=\gamma mv$. Modern magnetic spectrometers use essentially the same principle: **particle momentum is inferred from track curvature in a known magnetic field**.

---

## 2. Cathode rays and the electron

During the nineteenth century, electrical discharges through low-pressure gases produced mysterious rays emerging from the cathode. Experiments showed that these rays could be deflected by electric and magnetic fields.

In 1897, **J. J. Thomson** used this electromagnetic deflection to measure the charge-to-mass ratio $e/m$ of cathode-ray particles. The ratio was far larger than that associated with known ions, indicating that the particles were much lighter than atoms.

The result provided compelling evidence that atoms were not indivisible: they contained a smaller negatively charged constituent, later called the **electron**.

### Electromagnetic principle

Crossed electric and magnetic fields can select a particle velocity. If the electric and magnetic forces cancel,

$$
qE=qvB,
$$

then

$$
v=\frac{E}{B}.
$$

A subsequent magnetic deflection gives the trajectory radius and therefore $e/m$.

**Why it matters for electromagnetics:** the electron was discovered not by seeing it directly, but by measuring its interaction with electromagnetic fields.

---

## 3. Measuring the elementary charge

Thomson measured $e/m$, not the electron charge and mass independently. The elementary charge was subsequently measured with high precision through experiments associated especially with **Robert Millikan's oil-drop work**.

For a charged droplet in an electric field,

$$
F_E=qE.
$$

Balancing electrical and mechanical forces allowed the charge on individual droplets to be inferred. The measured charges appeared in integer multiples of a fundamental value $e$.

Combining the elementary charge with Thomson's $e/m$ measurement yielded the electron mass.

---

## 4. Positive rays and the proton

Gas-discharge experiments also revealed positively charged particles. **Eugen Goldstein's canal rays** and later measurements by Thomson and others established the existence of positive ions in discharge tubes.

Ernest Rutherford's nuclear experiments transformed the picture of the atom. His interpretation of alpha-particle scattering showed that positive charge and most atomic mass are concentrated in a tiny nucleus.

Rutherford later identified the hydrogen nucleus as a fundamental nuclear constituent—the particle now called the **proton**.

### Electromagnetic connection

Charged positive particles can be separated according to their charge-to-mass ratios by electric and magnetic fields. This principle developed into **mass spectrometry** and magnetic particle analysis.

For particles accelerated through a potential difference $V$,

$$
qV=\frac{1}{2}mv^2
$$

in the nonrelativistic limit. Combining electrostatic acceleration with magnetic bending provides $q/m$ and, when the charge is known, the mass.

---

## 5. Rutherford scattering and the atomic nucleus

The scattering of alpha particles by thin metal foils provided one of the decisive steps toward nuclear physics. Rutherford explained large-angle scattering through the Coulomb interaction between a positively charged alpha particle and a compact positively charged atomic nucleus.

The electrostatic interaction is described by

$$
F=\frac{1}{4\pi\epsilon_0}\frac{|q_1q_2|}{r^2}.
$$

The Rutherford differential scattering cross section has the characteristic dependence

$$
\frac{d\sigma}{d\Omega}\propto\frac{1}{\sin^4(\theta/2)}.
$$

The experiment illustrates an important theme of particle physics: **infer microscopic structure from how particles scatter through a known interaction**.

---

## 6. The neutron: where electromagnetic probing becomes indirect

In 1932, **James Chadwick** established the existence of the neutron. Unlike the proton and electron, the neutron has zero net electric charge, so it does not undergo ordinary electrostatic acceleration or Lorentz-force bending as a charged particle does.

Its discovery therefore required a different strategy: neutral radiation produced by bombarding beryllium was allowed to strike matter, and the energies of recoiling nuclei were analyzed using conservation of energy and momentum.

This is an important boundary case for an electromagnetics reference. Electromagnetic fields are exceptionally powerful probes of **charged** particles, but neutral particles often have to be detected through secondary interactions. The neutron nevertheless has internal charged constituents and a magnetic moment, so it can interact electromagnetically through its magnetic structure.

---

## 7. From the first particles to the particle zoo

The electron, proton, and neutron were only the beginning. During the twentieth century experiments revealed positrons, muons, pions, kaons, neutrinos, and many other particles. The apparently complicated particle zoo eventually led to the modern quark and lepton picture embodied in the Standard Model.

Electromagnetism remained one of the central experimental tools. Magnetic fields determine momentum from curvature; electric fields accelerate particles; RF cavities provide controlled acceleration; synchrotrons guide charged beams; electromagnetic calorimeters measure particle energy; and photodetectors convert photons into measurable electrical signals.

The experimental chain can be summarized as

**particle → electromagnetic interaction → force or energy transfer → trajectory / radiation / ionization → detector signal → inferred particle properties.**

---

## 8. Particle accelerators are electromagnetic machines

Modern accelerators are large-scale applications of electromagnetics.

### Electric-field acceleration

The work done by an electric potential is

$$
\Delta K=q\Delta V.
$$

Radio-frequency cavities generate oscillating electric fields timed so that particles repeatedly gain energy.

### Magnetic steering

Dipole magnets bend particle beams according to

$$
p=qBr.
$$

### Quadrupole focusing

Quadrupole magnets create transverse magnetic-field gradients that focus a charged-particle beam in one plane while defocusing it in the orthogonal plane. Sequences of quadrupoles provide net beam focusing.

### Synchrotron radiation

Accelerated relativistic charged particles emit electromagnetic radiation. For electrons in circular accelerators this becomes a major energy-loss mechanism, but the same phenomenon is deliberately exploited in synchrotron light sources.

---

## 9. Electromagnetics inside particle detectors

Modern detectors combine several EM principles.

| Detector function | Electromagnetic idea |
|---|---|
| Momentum measurement | Lorentz-force curvature in magnetic field |
| Tracking | Ionization of detector material |
| Electromagnetic calorimetry | Electron/photon showers through EM interactions |
| Cherenkov detection | Radiation from particles exceeding the phase velocity of light in a medium |
| Photomultipliers | Photoelectric emission + electron multiplication |
| Silicon detectors | Electron-hole generation and charge collection |
| RF acceleration | Time-varying electric fields in resonant cavities |
| Beam steering | Dipole magnetic fields |
| Beam focusing | Magnetic-field gradients |

### Cherenkov radiation

A charged particle moving through a dielectric faster than the phase velocity of light in that medium emits Cherenkov radiation. The emission angle satisfies

$$
\cos\theta_C=\frac{1}{\beta n},
$$

where $\beta=v/c$ and $n$ is the refractive index.

This converts particle velocity into an optical measurement.

---

## 10. Book note — Steven Weinberg, *The Discovery of Subatomic Particles*

Steven Weinberg's *The Discovery of Subatomic Particles* is especially appropriate for this section because it tells the history of particle discovery through the development of the underlying physics rather than presenting the electron, proton, and neutron merely as established facts.

### Publicly available summary

The book follows the sequence of experiments and ideas that led to the identification of the atom's first known constituents—the **electron, proton, and neutron**—while introducing the classical physics required to understand how those discoveries were made. In particular, the story of the electron is intertwined with the development of knowledge about electricity, magnetism, energy, and cathode rays. The later development of nuclear physics leads to the proton and neutron, after which Weinberg connects these historical discoveries to the much larger family of elementary particles uncovered in twentieth-century physics. This makes the book useful not only as a history of particle physics but also as an illustration of how experimental evidence, physical theory, and measurement technology develop together. The revised edition also connects the early discoveries with later particle physics. This summary is based on the publisher description and publicly available bibliographic/review material rather than reproduction of the copyrighted text.

A CERN Courier review emphasizes a particularly useful feature of the book: Weinberg develops the classical ideas needed to understand the discoveries while following their historical development, with a substantial part of the book devoted to the electron before moving to the proton, neutron, and later particles.

### Citation

**Steven Weinberg, *The Discovery of Subatomic Particles*, Revised Edition, Cambridge University Press (2003), ISBN 978-0-521-82351-7. First edition published by Scientific American Library (1983).**

### Public sources

- [Cambridge University Press — sample/front matter for *The Discovery of Subatomic Particles*](https://assets.cambridge.org/97805218/23517/sample/9780521823517ws.pdf)
- [Google Books — *The Discovery of Subatomic Particles*, Revised Edition](https://books.google.com/books?id=dDhDacnDIlAC)
- [WorldCat — bibliographic record and publisher summary](https://search.worldcat.org/title/The-discovery-of-subatomic-particles/oclc/52286554)
- [CERN Courier — review of the revised edition](https://cern-courier.web.cern.ch/a/the-discovery-of-subatomic-particles-revised-edition/)
- [Open Library — editions and bibliographic information](https://openlibrary.org/works/OL3398956W/The_discovery_of_subatomic_particles)

---

## 11. Why subatomic particles belong in an electromagnetics applications collection

Particle physics may appear to sit far beyond conventional RF and microwave engineering, but historically and experimentally the connection is direct.

The same electromagnetic principles recur across scales:

**Coulomb force → atomic structure**  
**Lorentz force → charged-particle trajectories**  
**electric potential → particle acceleration**  
**magnetic fields → momentum measurement and beam steering**  
**RF resonators → accelerator cavities**  
**electromagnetic radiation → synchrotron and Cherenkov radiation**  
**matter–field interaction → particle detection**

Thus electromagnetics is not merely one application within particle physics—it is one of the principal tools through which the subatomic world became experimentally accessible.

---

## References and further reading

1. [S. Weinberg, *The Discovery of Subatomic Particles*, Revised Edition, Cambridge University Press (2003)](https://books.google.com/books?id=dDhDacnDIlAC)
2. [CERN Courier, review: *The Discovery of Subatomic Particles, Revised Edition*](https://cern-courier.web.cern.ch/a/the-discovery-of-subatomic-particles-revised-edition/)
3. [WorldCat record for Weinberg's *The Discovery of Subatomic Particles*](https://search.worldcat.org/title/The-discovery-of-subatomic-particles/oclc/52286554)
4. [Open Library — *The Discovery of Subatomic Particles*](https://openlibrary.org/works/OL3398956W/The_discovery_of_subatomic_particles)

[← Daily Reference Home](../)
