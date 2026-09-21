---
layout: default
title: Wireless Communications — MIMO Interview Reference
---

# Wireless Communications

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:MIMO_with_building.png"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/MIMO_with_building.png?width=1200" alt="MIMO exploits multiple propagation paths between multiple transmit and receive antennas to create spatial channels." loading="lazy"></a>
  <figcaption>MIMO exploits multiple propagation paths between multiple transmit and receive antennas to create spatial channels. <a href="https://commons.wikimedia.org/wiki/File:MIMO_with_building.png">Image source</a>.</figcaption>
</figure>


Electromagnetic propagation, antennas, modulation, channel behavior, and RF hardware come together in wireless communication systems.

## Topics

- Cellular communications
- Wi-Fi
- Bluetooth
- **MIMO and beamforming**
- Satellite communications
- Millimeter-wave communications
- 5G and emerging 6G technologies
- Link budgets and propagation

---

# MIMO — Interview Quick Reference

**MIMO (Multiple-Input Multiple-Output)** uses multiple transmit and receive antennas to exploit the spatial dimension of the wireless channel. The important interview point is that multiple antennas do not automatically mean higher data rate: performance depends on the **channel matrix, spatial correlation, SNR, antenna patterns, propagation environment, and signal processing**.

For $N_t$ transmit antennas and $N_r$ receive antennas, the narrowband baseband model is

$$
\mathbf y=\mathbf H\mathbf x+\mathbf n,
$$

where $\mathbf x$ is the transmitted vector, $\mathbf y$ the received vector, $\mathbf H\in\mathbb C^{N_r\times N_t}$ the MIMO channel matrix, and $\mathbf n$ receiver noise.

Each element $h_{ij}$ represents the complex channel from transmit antenna $j$ to receive antenna $i$, including amplitude attenuation and phase.

## Why MIMO works

Multipath is often described as an impairment, but MIMO can use sufficiently independent multipath components to create multiple spatial channels. If the propagation paths seen by the antennas are weakly correlated, $\mathbf H$ can have multiple significant singular values and therefore support several simultaneous data streams.

The singular-value decomposition

$$
\mathbf H=\mathbf U\mathbf\Sigma\mathbf V^H
$$

is one of the most useful ways to understand MIMO. The singular values in $\mathbf\Sigma$ describe the strengths of independent spatial eigenchannels.

The maximum number of independent spatial streams is bounded by

$$
N_s\leq \operatorname{rank}(\mathbf H)\leq\min(N_t,N_r).
$$

Thus an ideal $4\times4$ MIMO channel may support four spatial streams, but a highly correlated channel may have much lower effective rank.

## Three concepts interviewers often separate

### Spatial diversity

Multiple antennas carry redundant information so that if one propagation path fades, another may remain usable. The goal is **reliability**, lower outage probability, and improved link robustness rather than primarily higher peak throughput.

Examples include receive diversity, transmit diversity, maximal-ratio combining, and space-time coding.

### Spatial multiplexing

Different data streams are transmitted simultaneously through the same time-frequency resource. The receiver separates them using differences in their spatial channels.

The goal is **higher spectral efficiency and throughput**.

### Beamforming

Signals from multiple antenna elements are weighted in amplitude and phase so that they combine constructively in desired directions and, when possible, destructively in undesired directions.

For array weights $w_n$, a simplified array factor is

$$
AF(\theta)=\sum_{n=0}^{N-1}w_n e^{jnkd\sin\theta}.
$$

Beamforming therefore uses the antenna array coherently, whereas spatial multiplexing uses multiple independent spatial modes. Modern systems can combine both.

## MIMO capacity

A useful idealized expression is

$$
C=B\log_2\det\left(\mathbf I_{N_r}+\frac{\rho}{N_t}\mathbf H\mathbf H^H\right),
$$

where $B$ is bandwidth and $\rho$ is the received SNR under the assumed normalization.

The key interview interpretation is more important than memorizing the equation: **MIMO capacity increases when the channel has several strong, sufficiently independent spatial eigenmodes.**

## Channel correlation

Closely spaced antennas, similar radiation patterns, insufficient angular spread, poor polarization diversity, or line-of-sight geometry can make channel columns/rows similar. Correlation reduces the number and quality of independent spatial channels.

This connects communications directly to electromagnetics: antenna spacing, mutual coupling, radiation pattern, polarization, chassis scattering, and the propagation environment all influence $\mathbf H$.

A common rule of thumb in rich terrestrial scattering is antenna separation on the order of $\lambda/2$, but there is no universal spacing requirement; the correct metric is the resulting pattern/correlation/channel behavior.

## Massive MIMO

Massive MIMO uses many antenna elements—particularly at a base station—to provide array gain, spatially separate users, suppress interference, and support multi-user beamforming. Large arrays also enable narrow electronically steerable beams.

At millimeter-wave frequencies, the short wavelength makes physically compact arrays with many elements practical. Because RF-chain power and cost become important, mmWave systems often use **analog or hybrid beamforming** rather than a fully digital RF chain for every element.

## SU-MIMO versus MU-MIMO

**SU-MIMO:** multiple spatial streams are exchanged between one transmitter and one receiver/user.

**MU-MIMO:** a multi-antenna transmitter serves multiple users simultaneously using spatial precoding/beamforming to separate them.

A common interview distinction: spatial multiplexing does not necessarily mean MU-MIMO. A single user can receive several spatial layers.

## Precoding

The transmitter may apply a precoding matrix

$$
\mathbf x=\mathbf W\mathbf s,
$$

where $\mathbf s$ contains the data streams and $\mathbf W$ maps them to physical antennas.

Precoding can perform beam steering, interference suppression, spatial multiplexing, or combinations of these functions. Examples include maximum-ratio transmission, zero forcing, and MMSE-type precoding.

## Receiver detection

The receiver estimates the transmitted streams from $\mathbf y$. Common concepts include:

- **Zero Forcing (ZF):** suppresses inter-stream interference by approximately inverting the channel, but can strongly enhance noise when $\mathbf H$ is poorly conditioned.
- **MMSE:** balances interference suppression against noise enhancement and is generally more robust at finite SNR.
- **Maximum Likelihood:** can provide excellent detection performance but complexity rises rapidly with modulation order and stream count.

## CSI — Channel State Information

MIMO processing requires knowledge or estimates of the channel. **CSI** includes the complex channel coefficients used for equalization, precoding, beamforming, rank selection, and link adaptation.

In practical systems CSI is obtained from pilots/reference signals and may be fed back, inferred through reciprocity in TDD systems, or otherwise estimated depending on the air interface.

Bad or stale CSI causes beamforming and precoding errors.

## Rank, layers, ports, and physical antennas

These terms are related but are not interchangeable:

- **Physical antenna elements:** actual radiating structures.
- **Antenna ports:** logical RF/reference-signal entities used by the communication system.
- **Layers:** independent data streams before mapping/precoding.
- **Rank:** number of spatial layers the current channel can effectively support.

An array can contain many physical elements while carrying only one or a few data layers.

## MIMO and OFDM

Wideband wireless channels are frequency selective. OFDM divides the channel into many narrow subcarriers so that each subcarrier can be treated approximately as a narrowband MIMO channel:

$$
\mathbf y_k=\mathbf H_k\mathbf x_k+\mathbf n_k.
$$

The channel matrix therefore varies with subcarrier $k$. Modern Wi-Fi, LTE, and 5G combine OFDM/OFDMA with MIMO.

## RF impairments that matter in MIMO

For an RF/hardware interview, connect MIMO algorithms to physical implementation. Important impairments include **EVM, phase noise, frequency error, IQ imbalance, PA compression/nonlinearity, gain/phase mismatch between RF chains, antenna mutual coupling, receiver noise figure, timing synchronization, and calibration errors**.

For example, a beamforming array depends on relative phase. A phase error $\Delta\phi_n$ changes the effective array weights and can reduce peak gain, increase sidelobes, or shift the beam.

## MIMO OTA testing

Conducted testing of individual RF chains cannot fully characterize the combined effect of antennas, chassis, propagation, beamforming, and receiver algorithms. Over-the-air testing therefore becomes important for integrated MIMO systems.

Useful interview concepts include **anechoic chambers, channel emulators, radiated power/sensitivity, beam measurements, spatial channel models, EVM, throughput, correlation, and repeatable multipath environments**.

## Ten rapid interview questions

**What is MIMO?** Multiple transmit/receive antennas exploiting spatial channel properties for diversity, multiplexing, beamforming, or combinations of them.

**What limits the number of spatial streams?** Primarily the rank and singular-value structure of $\mathbf H$, bounded by $\min(N_t,N_r)$.

**Why does low correlation help?** It makes the spatial channels more distinguishable and improves effective channel rank/conditioning.

**Diversity versus multiplexing?** Diversity improves reliability; multiplexing increases simultaneous data streams/spectral efficiency.

**Beamforming versus MIMO?** Beamforming is one multi-antenna technique; MIMO is broader and can include beamforming, diversity, and spatial multiplexing.

**Why $\lambda/2$ spacing?** It is a common array spacing that can provide useful spatial sampling while avoiding grating lobes for broad scanning in simple arrays; it is not a universal MIMO requirement.

**What is CSI?** An estimate/knowledge of the complex propagation channel used for detection, precoding, beamforming, and adaptation.

**ZF versus MMSE?** ZF prioritizes interference cancellation and may amplify noise; MMSE explicitly balances noise and interference.

**Why is MIMO harder at RF hardware level?** Multiple coherent RF chains require calibration and are affected by phase/gain mismatch, coupling, PA nonlinearities, oscillator impairments, antenna patterns, and thermal/power constraints.

**What does a high condition number mean?** The spatial eigenchannels have very unequal strengths; channel inversion becomes sensitive to noise and spatial multiplexing performance degrades.

## Interview mental model

Remember this chain:

**antenna geometry + propagation → channel matrix $\mathbf H$ → rank/correlation/singular values → precoding & detection → EVM/SNR/SINR → throughput and reliability.**

That connects electromagnetic intuition to communication-system behavior and is particularly useful in RF validation, antenna, wireless-system, and modem interviews.

[← Home](../)
