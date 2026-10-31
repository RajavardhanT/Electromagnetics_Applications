---
layout: default
title: RF Bands — Compact Reference
description: Compact RF band reference covering GSM, LTE, 5G NR, Wi-Fi/ISM, GNSS, and IEEE L/S/C/X/Ku/K/Ka/V/W microwave bands.
---

# RF Bands — Compact Reference

<div class="intuition"><span class="callout-title">30-second intuition</span>RF engineers use several overlapping naming systems. <strong>3GPP bands</strong> such as n77 or LTE Band 3 define a radio service with exact uplink/downlink ranges. <strong>IEEE letter bands</strong> such as L, S, C, X, Ku and Ka describe broad microwave frequency regions. <strong>Wi-Fi, GNSS and satellite bands</strong> are service allocations inside those broader regions. Always ask: “Is this a 3GPP operating band, a radar/microwave letter band, or a service allocation?”</div>

For practical stimulus and measurement of these bands, see [Modern Signal Generator](../modern-signal-generator/) for calibrated RF generation and [Spectrum Analyzer Signal Processing](../spectrum-analyzer-signal-processing/) for swept/real-time analysis and FFT/RBW processing.

## 1. The spectrum map to remember

| Frequency | Name / region | What to associate with it |
|---|---|---|
| 3–30 MHz | HF | ionosphere, shortwave, OTH radar |
| 30–300 MHz | VHF | FM, aviation, land mobile |
| 300 MHz–1 GHz | UHF | cellular low band, TV, 433/868/915 MHz |
| 1–2 GHz | **L-band** | GNSS, cellular, telemetry, radar |
| 2–4 GHz | **S-band** | 2.4 GHz Wi-Fi/Bluetooth, n41, radar, space TT&C |
| 4–8 GHz | **C-band** | 5/6 GHz Wi-Fi, satellite, mid-band RF |
| 8–12 GHz | **X-band** | radar, remote sensing, deep-space links |
| 12–18 GHz | **Ku-band** | satellite TV/VSAT, satcom |
| 18–27 GHz | **K-band** | radar/sensing; atmospheric absorption near 22 GHz |
| 26.5–40 GHz | **Ka-band** | satellite broadband, deep space, 5G FR2 |
| 40–75 GHz | **V-band** | mmWave links; 60 GHz systems |
| 75–110 GHz | **W-band** | radar, imaging, high-frequency sensing |
| 30–300 GHz | millimeter wave | broad mmWave region |

The L/S/C/X/Ku/K/Ka/V/W definitions above follow the IEEE radar-frequency letter-band convention. See [IEEE 521](https://standards.ieee.org/ieee/521/11683/).

---

# 2. 5G NR frequency ranges

The first distinction to remember is:

| NR frequency range | Approximate range | What to associate |
|---|---:|---|
| **FR1** | 410 MHz–7.125 GHz | sub-7-GHz cellular |
| **FR2-1** | 24.25–52.6 GHz | conventional 5G mmWave |
| **FR2-2** | 52.6–71 GHz | upper-mmWave NR |

For exact current operating-band tables, use:

- [3GPP TS 38.101-1 — NR UE Range-1 RF](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-1/)
- [3GPP TS 38.101-2 — NR UE Range-2 RF](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-2/)
- [3GPP TS 38.104 — NR base-station RF](https://www.3gpp.org/ftp/Specs/archive/38_series/38.104/)

---

## 3. NR bands worth recognizing immediately

This is **not every NR band**. It is the compact set you are most likely to encounter in RF, validation, conformance, and system discussions.

### FR1

| NR band | UL / DL or TDD range | Common association |
|---|---|---|
| **n1** | UL 1920–1980 / DL 2110–2170 MHz | 2100 MHz |
| **n2** | UL 1850–1910 / DL 1930–1990 MHz | PCS 1900 |
| **n3** | UL 1710–1785 / DL 1805–1880 MHz | 1800 MHz |
| **n5** | UL 824–849 / DL 869–894 MHz | 850 MHz |
| **n7** | UL 2500–2570 / DL 2620–2690 MHz | 2600 MHz |
| **n8** | UL 880–915 / DL 925–960 MHz | 900 MHz |
| **n12** | UL 699–716 / DL 729–746 MHz | US 700 MHz |
| **n13** | UL 777–787 / DL 746–756 MHz | US 700 MHz |
| **n14** | UL 788–798 / DL 758–768 MHz | FirstNet / public safety |
| **n20** | UL 832–862 / DL 791–821 MHz | European 800 MHz |
| **n25** | UL 1850–1915 / DL 1930–1995 MHz | extended PCS |
| **n26** | UL 814–849 / DL 859–894 MHz | extended 850 |
| **n28** | UL 703–748 / DL 758–803 MHz | global 700 MHz |
| **n30** | UL 2305–2315 / DL 2350–2360 MHz | WCS |
| **n38** | 2570–2620 MHz TDD | 2.6 GHz TDD |
| **n40** | 2300–2400 MHz TDD | 2.3 GHz TDD |
| **n41** | 2496–2690 MHz TDD | major US/Asia mid-band |
| **n48** | 3550–3700 MHz TDD | CBRS |
| **n66** | UL 1710–1780 / DL 2110–2200 MHz | AWS |
| **n70** | UL 1695–1710 / DL 1995–2020 MHz | AWS-related |
| **n71** | UL 663–698 / DL 617–652 MHz | US 600 MHz |
| **n77** | 3300–4200 MHz TDD | broad 3.3–4.2 GHz 5G |
| **n78** | 3300–3800 MHz TDD | global 3.5 GHz 5G |
| **n79** | 4400–5000 MHz TDD | 4.5 GHz 5G |

### FR2

| NR band | Frequency range | Common association |
|---|---:|---|
| **n258** | 24.25–27.5 GHz | 26 GHz |
| **n257** | 26.5–29.5 GHz | 28 GHz-class |
| **n261** | 27.5–28.35 GHz | US 28 GHz |
| **n260** | 37–40 GHz | US 39 GHz |
| **n262** | 47.2–48.2 GHz | 47 GHz |
| **n263** | 57–71 GHz | upper-mmWave / 60 GHz region |

<div class="engineering"><span class="callout-title">RF-test shortcut</span>For US device work, the bands that repeatedly appear are <strong>n2, n5, n12, n14, n25, n26, n30, n41, n48, n66, n70, n71, n77, n260 and n261</strong>. For global work add <strong>n1, n3, n7, n8, n20, n28, n38, n40, n78 and n79</strong>.</div>

---

# 4. LTE bands worth recognizing

Many LTE and NR bands occupy closely related spectrum.

For exact LTE operating-band definitions use [3GPP TS 36.101](https://www.3gpp.org/ftp/Specs/archive/36_series/36.101/).

| LTE band | UL / DL or TDD | Association |
|---|---|---|
| **B1** | 1920–1980 / 2110–2170 MHz | 2100 MHz |
| **B2** | 1850–1910 / 1930–1990 MHz | PCS |
| **B3** | 1710–1785 / 1805–1880 MHz | 1800 MHz |
| **B4** | 1710–1755 / 2110–2155 MHz | AWS-1 |
| **B5** | 824–849 / 869–894 MHz | 850 MHz |
| **B7** | 2500–2570 / 2620–2690 MHz | 2600 MHz |
| **B8** | 880–915 / 925–960 MHz | 900 MHz |
| **B12** | 699–716 / 729–746 MHz | US 700 MHz |
| **B13** | 777–787 / 746–756 MHz | US 700 MHz |
| **B14** | 788–798 / 758–768 MHz | FirstNet |
| **B20** | 832–862 / 791–821 MHz | European 800 MHz |
| **B25** | 1850–1915 / 1930–1995 MHz | extended PCS |
| **B26** | 814–849 / 859–894 MHz | extended 850 |
| **B28** | 703–748 / 758–803 MHz | global 700 MHz |
| **B30** | 2305–2315 / 2350–2360 MHz | WCS |
| **B38** | 2570–2620 MHz TDD | 2.6 GHz TDD |
| **B40** | 2300–2400 MHz TDD | 2.3 GHz TDD |
| **B41** | 2496–2690 MHz TDD | 2.5 GHz |
| **B46** | 5150–5925 MHz TDD | unlicensed LTE |
| **B48** | 3550–3700 MHz TDD | CBRS |
| **B66** | 1710–1780 / 2110–2200 MHz | extended AWS |
| **B71** | 663–698 / 617–652 MHz | US 600 MHz |

### LTE ↔ NR memory rule

Examples:

$$
B2\leftrightarrow n2,
\qquad
B5\leftrightarrow n5,
\qquad
B41\leftrightarrow n41,
\qquad
B66\leftrightarrow n66,
\qquad
B71\leftrightarrow n71.
$$

The numbering often—but not universally—carries over.

---

# 5. GSM bands

For GSM/EDGE RF requirements, see [3GPP TS 45.005](https://www.3gpp.org/ftp/Specs/archive/45_series/45.005/).

These four are the ones to remember:

| GSM band | Uplink | Downlink | Common name |
|---|---:|---:|---|
| **GSM 850** | 824–849 MHz | 869–894 MHz | Americas |
| **E-GSM 900** | 880–915 MHz | 925–960 MHz | Europe/global |
| **DCS 1800** | 1710–1785 MHz | 1805–1880 MHz | GSM 1800 |
| **PCS 1900** | 1850–1910 MHz | 1930–1990 MHz | North America |

A useful historical progression is

$$
\boxed{
GSM
\rightarrow
LTE
\rightarrow
NR
}
$$

while much of the underlying spectrum was refarmed and reused.

---

# 6. Wi-Fi, Bluetooth and common unlicensed bands

| Band | Frequency | Associate with |
|---|---:|---|
| 433 MHz ISM | ~433.05–434.79 MHz | remote controls, sensors |
| 868 MHz SRD | Europe ~863–870 MHz | IoT / low-power |
| 902–928 MHz ISM | US | ISM, RFID, LoRa |
| **2.4 GHz ISM** | 2400–2483.5 MHz | Wi-Fi, Bluetooth, Zigbee |
| **5 GHz WLAN** | multiple sub-bands ~5.15–5.895 GHz | Wi-Fi 5/6 |
| **6 GHz WLAN** | 5.925–7.125 GHz in the US | Wi-Fi 6E/7 |
| **60 GHz** | roughly 57–71 GHz ecosystem | WiGig / short-range mmWave |

Exact unlicensed allocations vary by country.

---

# 7. GNSS frequencies to recognize

GNSS is primarily an **L-band** application.

| Signal | Center frequency | What to remember |
|---|---:|---|
| **GPS L1** | 1575.42 MHz | main civil GPS band |
| **GPS L2** | 1227.60 MHz | precision / dual-frequency |
| **GPS L5** | 1176.45 MHz | safety-of-life / modern civil |
| Galileo E1 | 1575.42 MHz | overlaps GPS L1 region |
| Galileo E5a | 1176.45 MHz | overlaps GPS L5 region |

---

# 8. Microwave letter bands and applications

The broad microwave names are **not cellular band numbers**.

| Letter band | IEEE range | Typical associations |
|---|---:|---|
| **L** | 1–2 GHz | GNSS, surveillance radar, satcom |
| **S** | 2–4 GHz | radar, 2.4 GHz ISM, telemetry, TT&C |
| **C** | 4–8 GHz | satellite, radar, 5/6 GHz WLAN |
| **X** | 8–12 GHz | defense radar, SAR, deep-space comm |
| **Ku** | 12–18 GHz | satellite TV, VSAT, satcom |
| **K** | 18–27 GHz | radar; 24 GHz sensing |
| **Ka** | 26.5–40 GHz | high-throughput satcom, deep space, NR FR2 |
| **V** | 40–75 GHz | 60 GHz links |
| **W** | 75–110 GHz | radar, imaging |

Reference: [IEEE 521-2026](https://standards.ieee.org/ieee/521/11683/).

---

# 9. Space / satellite associations

For space systems, memorize the associations rather than one universal allocation:

| Band | Think |
|---|---|
| **L-band** | navigation, mobile satcom |
| **S-band** | spacecraft TT&C, telemetry, near-Earth links |
| **X-band** | radar, Earth observation, deep-space communications |
| **Ku-band** | commercial satellite links, VSAT |
| **Ka-band** | high-data-rate satcom and deep-space links |

Exact uplink/downlink allocations depend on the service and regulatory allocation.

See [Artemis Lunar Communications](../artemis-communications/) and [Microwave & Space Electronics Components](../microwave-space-components/).

---

# 10. Quick frequency-to-name lookup

| If you hear… | Think… |
|---|---|
| **600–900 MHz** | cellular low band / UHF |
| **1.2–1.6 GHz** | L-band / GNSS |
| **1.7–2.2 GHz** | PCS/AWS/LTE/NR; upper L/lower S context |
| **2.4 GHz** | Wi-Fi/Bluetooth + S-band |
| **2.5–2.7 GHz** | LTE B41 / NR n41; S-band |
| **3.3–4.2 GHz** | NR n77/n78; mid-band 5G |
| **3.55–3.7 GHz** | CBRS / B48 / n48 |
| **5–7 GHz** | WLAN / C-band region |
| **8–12 GHz** | X-band |
| **12–18 GHz** | Ku-band |
| **24–30 GHz** | K/Ka boundary + NR FR2 |
| **26.5–40 GHz** | Ka-band |
| **37–40 GHz** | NR n260 |
| **57–71 GHz** | 60-GHz ecosystem / V-band / NR n263 |
| **75–110 GHz** | W-band |

---

# 11. The three naming systems

Keep these separate:

### 3GPP operating band

Example:

$$
n77=3300\text{–}4200\ \mathrm{MHz}.
$$

Defines an actual NR radio operating band.

### IEEE microwave letter band

Example:

$$
S=2\text{–}4\ \mathrm{GHz}.
$$

Defines a broad radar/microwave frequency region.

### Service allocation

Example:

$$
\text{Wi-Fi 2.4 GHz}.
$$

Defines spectrum used by a specific radio service.

These overlap physically but mean different things.

---

# 12. Minimal memory set

If you want the smallest useful set:

### Cellular

$$
\boxed{
600/700/800/850/900
\rightarrow
1.7/1.8/1.9/2.1
\rightarrow
2.3/2.5/2.6
\rightarrow
3.5/3.7
\rightarrow
28/39\ \mathrm{GHz}
}
$$

### Microwave

$$
\boxed{
L:1\text{–}2,
S:2\text{–}4,
C:4\text{–}8,
X:8\text{–}12,
Ku:12\text{–}18,
K:18\text{–}27,
Ka:26.5\text{–}40
}
$$

in GHz.

### GSM

$$
\boxed{
850,\ 900,\ 1800,\ 1900\ \mathrm{MHz}.
}
$$

That compact map covers a surprisingly large fraction of RF conversations.

---

## 13. Official references

- [3GPP TS 38.101-1 — NR UE Range-1 RF](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-1/)
- [3GPP TS 38.101-2 — NR UE Range-2 RF](https://www.3gpp.org/ftp/Specs/archive/38_series/38.101-2/)
- [3GPP TS 38.104 — NR BS RF](https://www.3gpp.org/ftp/Specs/archive/38_series/38.104/)
- [3GPP TS 36.101 — LTE UE RF](https://www.3gpp.org/ftp/Specs/archive/36_series/36.101/)
- [3GPP TS 45.005 — GSM/EDGE RF](https://www.3gpp.org/ftp/Specs/archive/45_series/45.005/)
- [IEEE 521-2026 — radar-frequency letter designations](https://standards.ieee.org/ieee/521/11683/)

Related: [3GPP Standards](../3gpp-standards/) · [RF & Microwave](../rf-microwave/) · [Wireless & MIMO](../wireless/) · [Artemis Lunar Communications](../artemis-communications/) · [Microwave & Space Electronics Components](../microwave-space-components/)
