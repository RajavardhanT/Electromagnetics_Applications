---
layout: default
title: Artemis Lunar Communications
description: Communications and navigation architecture for NASA Artemis missions, including Orion antennas, Near Space Network, Deep Space Network, S-band RF, optical communications, tracking, lunar blackouts, relay networks, Gateway, LunaNet, link budgets, and future lunar PNT.
---

# Artemis Lunar Communications

<figure class="topic-figure">
  <a href="https://commons.wikimedia.org/wiki/File:NASA%E2%80%99s_Orion_spacecraft_-_Artemis_II_-_By_Avi_Solomon.png"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/NASA%E2%80%99s_Orion_spacecraft_-_Artemis_II_-_By_Avi_Solomon.png?width=1200" alt="NASA Orion spacecraft during the Artemis II crewed lunar mission." loading="lazy"></a>
  <figcaption>NASA's Orion spacecraft during Artemis II. Communications must remain available across launch, Earth orbit, translunar flight, lunar flyby, return, entry, and recovery. <a href="https://commons.wikimedia.org/wiki/File:NASA%E2%80%99s_Orion_spacecraft_-_Artemis_II_-_By_Avi_Solomon.png">Image source: NASA via Wikimedia Commons, public domain</a>.</figcaption>
</figure>

<div class="intuition"><span class="callout-title">30-second intuition</span>Artemis communications are not one radio link. They are an <strong>end-to-end network of spacecraft antennas, RF and optical terminals, relay satellites, global ground stations, mission-control networks, tracking systems, and navigation processing</strong>. Near Earth, Orion uses NASA's Near Space Network and relay satellites; after translunar injection, primary support transitions to the Deep Space Network. Future sustained lunar operations add lunar relay satellites, Gateway links, and LunaNet-style communications and PNT services.</div>

<div class="pathway"><span class="node">crew / avionics / payload data</span><span class="arrow">→</span><span class="node">Orion comm system</span><span class="arrow">→</span><span class="node">NSN / DSN / optical link</span><span class="arrow">→</span><span class="node">ground network</span><span class="arrow">→</span><span class="node">Mission Control</span></div>

## 1. Communications is also navigation

The same network infrastructure provides several services:

- command uplink;
- spacecraft telemetry;
- astronaut voice;
- images and video;
- payload/science data;
- ranging;
- Doppler tracking;
- orbit determination.

Thus Artemis communication belongs to the broader **communications, position, navigation, and timing (CPNT)** architecture.

NASA's lunar architecture explicitly treats communications and navigation as an integrated capability required for crew safety, command and control, science return, and precise maneuvering.

---

## 2. Artemis II as the first crewed lunar communications demonstration

Artemis II flew a roughly 10-day crewed journey around the Moon in April 2026.

The mission exercised

- Near Space Network support near Earth;
- handoff to the Deep Space Network for deep-space operations;
- Orion phased-array RF communications;
- crew voice and mission telemetry;
- lunar-distance tracking and navigation;
- a planned far-side communications blackout;
- the Orion Artemis II Optical Communications System.

NASA later released more than 800 GB of Artemis II lunar science data, including thousands of images and hours of audio, illustrating the scale of data produced during a modern crewed lunar mission.

---

# Orion spacecraft communications

## 3. Orion's phased-array antennas

NASA states that Orion uses

- **four phased-array antennas on the crew module**;
- **two phased-array antennas on the service module**.

These antennas support

- voice;
- video;
- spacecraft data;
- command uplink;
- telemetry downlink.

The phased arrays steer the RF beam electronically without mechanically rotating the antenna.

This is important on a crewed spacecraft because it reduces moving hardware while allowing communication over changing spacecraft attitudes.

---

## 4. Why several antennas are needed

A spacecraft body, solar arrays, service module, and attitude can block or attenuate different directions.

Multiple antennas improve

- angular coverage;
- redundancy;
- handoff between antenna sectors;
- robustness during maneuvers.

The effective communications problem is therefore an **installed antenna pattern** problem rather than an isolated antenna-gain number.

That connects directly to [Spacecraft Electromagnetics](../computational-em/).

---

## 5. RF communication path

A simplified spacecraft RF chain is

$$
\boxed{
\text{avionics data}
\rightarrow
\text{modem / coding}
\rightarrow
\text{RF transmitter}
\rightarrow
\text{power amplifier}
\rightarrow
\text{phased-array antenna}
\rightarrow
\text{space link}.
}
$$

The receive path reverses this process.

Important engineering quantities include

$$
P_t,\quad G_t,\quad G_r,\quad N_0,\quad R_b,\quad E_b/N_0.
$$

---

# Near-Earth communications

## 6. Near Space Network

NASA's **Near Space Network (NSN)** supports Orion during

- launch;
- Earth orbit;
- selected navigation periods;
- re-entry;
- splashdown/recovery.

It combines Earth-based antennas, relay satellites, and commercial/government infrastructure.

During launch and Earth-orbit phases, the spacecraft is still within the region where near-Earth relay infrastructure is effective.

---

## 7. Launch Communications Segment

The Launch Communications Segment includes ground stations positioned to support the ascent trajectory.

NASA identifies stations at

- Kennedy Space Center;
- Ponce de Leon, Florida;
- Bermuda.

During early ascent these stations provide uplink/downlink connectivity.

Later in ascent, Bermuda receives high-rate launch-vehicle telemetry while Orion can communicate through space relay infrastructure.

The different antenna views are combined into a usable operational data stream for mission controllers.

---

## 8. Tracking and Data Relay Satellites

NASA's Tracking and Data Relay Satellite system provides relay communications between spacecraft near Earth and ground terminals.

The conceptual path is

$$
\text{Orion}
\rightarrow
\text{TDRS}
\rightarrow
\text{ground terminal}
\rightarrow
\text{Mission Control}.
$$

Relay satellites reduce dependence on direct line of sight between a low-Earth spacecraft and a single ground station.

---

# Deep-space communications

## 9. Handoff to the Deep Space Network

After translunar injection, primary communications support transitions to the **Deep Space Network (DSN)**.

For Artemis II, the Near Space Network initially led communications after launch; NASA then handed Orion to the DSN as the spacecraft departed toward the Moon.

This was the first time in more than 50 years that the DSN supported a crewed spacecraft traveling through deep space.

---

## 10. The three DSN complexes

The DSN has complexes near

- Goldstone, California;
- Madrid, Spain;
- Canberra, Australia.

Their approximate 120° longitude separation allows Earth's rotation to hand a spacecraft from one complex to another.

<figure class="topic-figure topic-figure-small">
  <a href="https://commons.wikimedia.org/wiki/File:Goldstone%E2%80%99s_70-Meter_Antenna_Under_the_Stars_(PIA26716).png"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Goldstone%E2%80%99s_70-Meter_Antenna_Under_the_Stars_(PIA26716).png?width=900" alt="NASA Deep Space Network 70-meter antenna at Goldstone." loading="lazy"></a>
  <figcaption>Deep Space Station 14, the 70-m antenna at Goldstone. Large apertures provide the antenna gain and receiver sensitivity needed for lunar and deep-space links. <a href="https://commons.wikimedia.org/wiki/File:Goldstone%E2%80%99s_70-Meter_Antenna_Under_the_Stars_(PIA26716).png">Image source: NASA/JPL-Caltech via Wikimedia Commons, public domain</a>.</figcaption>
</figure>

---

## 11. Why DSN antennas are so large

For an aperture antenna,

$$
G\approx\eta
\left(
\frac{\pi D}{\lambda}
\right)^2.
$$

Large diameter $D$ produces high gain.

On receive, large effective aperture improves sensitivity:

$$
A_e=\frac{G\lambda^2}{4\pi}.
$$

This is essential because received power after hundreds of thousands of kilometers is extremely small.

---

## 12. Lunar link-budget physics

Ignoring other losses, Friis gives

$$
P_r
=
P_tG_tG_r
\left(
\frac{\lambda}{4\pi R}
\right)^2.
$$

The free-space path loss is

$$
\boxed{
L_{FS}
=
\left(
\frac{4\pi R}{\lambda}
\right)^2.
}
$$

Thus lunar communication benefits from

- high spacecraft EIRP;
- high ground-station gain;
- low-noise receivers;
- strong coding gain;
- appropriate data rate;
- accurate antenna pointing.

---

## 13. Data rate versus link margin

For a fixed received carrier power, increasing bit rate reduces energy per bit:

$$
\frac{E_b}{N_0}
=
\frac{C}{N_0R_b}.
$$

Therefore deep-space communications always trade

$$
\boxed{
\text{data rate}
\leftrightarrow
\text{link margin}
\leftrightarrow
\text{antenna gain}
\leftrightarrow
\text{transmit power}.
}
$$

Crew safety voice/telemetry is therefore prioritized differently from high-resolution imagery.

---

# RF bands and data

## 14. S-band RF links

Orion's primary RF communications historically use S-band-class links for crew voice, command, telemetry, and data.

During Artemis II, NASA continued to rely on conventional RF as the operational communications backbone while optical communications were demonstrated in parallel.

NASA described the Artemis II S-band system as supporting data rates of roughly several megabits per second, with the exact rate depending on link conditions and configuration.

---

## 15. Why higher frequency can support more data

Higher-frequency systems can provide larger available bandwidth and higher antenna gain for the same physical aperture.

However, higher frequency also brings

- tighter pointing requirements;
- greater sensitivity to atmospheric effects;
- greater implementation complexity.

This is why lunar architecture uses different bands for different service classes rather than one universal carrier.

---

## 16. Ka-band in the lunar architecture

NASA's lunar communications architecture uses Ka-band for high-rate links in several future lunar systems.

Examples include

- Gateway direct-to-Earth high-rate data;
- high-rate Gateway-to-lunar-system links;
- future lunar surface science return.

Ka-band is attractive for high throughput because of its larger available bandwidth and high aperture gain.

---

# Optical / laser communications

## 17. Orion Artemis II Optical Communications System

Artemis II carried the **Orion Artemis II Optical Communications System (O2O)**.

Unlike RF, O2O uses infrared laser light.

NASA's design included

- an optical module;
- modem;
- controller;
- a 4-inch telescope;
- two-axis gimbaled pointing.

The optical terminal interfaces with Orion avionics and points a narrow laser beam toward Earth.

---

## 18. O2O ground terminals

NASA selected optical ground stations at

- White Sands Complex, New Mexico;
- Table Mountain Facility, California.

High, dry locations are advantageous because clouds and atmospheric turbulence can interrupt or degrade optical links.

This illustrates an important difference:

> RF deep-space links can tolerate weather conditions that completely block an optical link.

---

## 19. Optical data rates

NASA/MIT Lincoln Laboratory material for the Artemis II O2O system listed design rates of approximately

$$
\boxed{
260\ \mathrm{Mb/s}\ \text{downlink}
}
$$

and

$$
\boxed{
20\ \mathrm{Mb/s}\ \text{uplink}.
}
$$

These rates were aimed at capabilities such as

- high-definition/4K video;
- file transfer;
- high-volume mission data;
- real-time bidirectional communications demonstrations.

---

## 20. Artemis II optical communications result

NASA reported after Artemis II that the optical terminal successfully transmitted mission data during the crewed lunar flight and helped demonstrate the value of laser communications for future human exploration.

The optical demonstration did **not replace RF**.

Instead,

$$
\boxed{
\text{RF}
=
\text{robust operational backbone}
}
$$

while

$$
\boxed{
\text{optical}
=
\text{high-data-rate augmentation}.
}
$$

That hybrid architecture is likely to remain important in future deep-space systems.

---

## 21. Why laser communications are difficult

Optical beams are extremely narrow.

The pointing problem is roughly

$$
\text{spacecraft attitude}
+
\text{terminal gimbal}
+
\text{fine pointing}
\rightarrow
\text{ground telescope}.
$$

Errors from

- vibration;
- attitude uncertainty;
- gimbal error;
- ephemeris error;
- atmospheric turbulence

can move the beam away from the ground receiver.

The higher data rate is obtained at the cost of much more stringent pointing.

---

# Navigation through communications signals

## 22. Ranging

A spacecraft range can be obtained from propagation delay.

Conceptually,

$$
R
\approx
\frac{c\Delta t}{2}
$$

for a two-way ranging observable after calibration of delays.

Accurate timing therefore becomes part of navigation.

---

## 23. Doppler tracking

The line-of-sight velocity produces a carrier Doppler shift.

In a simple one-way approximation,

$$
\frac{\Delta f}{f}
\approx
-\frac{v_r}{c}.
$$

Precision Doppler observables allow mission navigation teams to estimate spacecraft velocity and constrain the trajectory.

---

## 24. Three-way Doppler

NASA has used Near Space Network and Deep Space Network assets together for **three-way Doppler tracking**.

One ground station can transmit while another receives.

This provides additional geometric information and improves orbit determination.

Communications infrastructure is therefore also a precision navigation instrument.

---

## 25. State vectors and ephemerides

Orion navigation produces state information,

$$
\mathbf x=
[
\mathbf r,
\mathbf v
]^T.
$$

During Artemis II, NASA published ephemeris/state-vector information through the Artemis Real-time Orbit Website.

Those data are ultimately built from onboard navigation sensors and ground-based tracking measurements.

---

# Propagation delay and operations

## 26. Earth–Moon latency

At lunar distance, electromagnetic propagation takes roughly **1.3 s one way** and roughly **2.6 s round trip**.

That is small compared with Mars communications but large enough to make conversations noticeably delayed.

Mission control therefore cannot treat a lunar spacecraft like a terrestrial remote-control system.

The spacecraft must retain significant onboard autonomy.

---

## 27. Command architecture

Commands must be

- generated;
- validated;
- transmitted;
- decoded;
- checked;
- executed.

Crewed spacecraft also need fault protection that operates without waiting for Earth.

Orion's avionics therefore combine ground command capability with autonomous onboard guidance, navigation, control, and fault-management functions.

---

## 28. Emergency navigation when communications are lost

Orion includes an **optical navigation camera** capable of imaging the Moon and Earth.

NASA states that this system can estimate range and bearing and forms part of an emergency return capability if communication with Earth is lost.

Thus Artemis navigation is not completely dependent on continuous ground contact.

---

# Lunar far-side blackout

## 29. Why the Moon blocks communications

RF links require line of sight unless a relay exists.

When Orion passes behind the Moon,

$$
\text{Earth}
\;\not\leftrightarrow\;
\text{Orion}.
$$

The lunar body physically blocks direct RF propagation.

---

## 30. Artemis II blackout

NASA planned an approximately **41-minute communications blackout** during Artemis II's passage behind the Moon.

When Orion reappeared, the DSN reacquired the spacecraft.

This is not a radio failure—it is a geometric occultation.

---

## 31. Why the lunar south pole is difficult

Future exploration is concentrated near the lunar south pole.

The local terrain is severe:

- craters;
- mountains;
- low elevation angles to Earth;
- permanently shadowed regions;
- intermittent Earth visibility.

Direct-to-Earth communications cannot provide uniform coverage everywhere.

This motivates lunar relay satellites.

---

# Lunar relay architecture

## 32. Lunar Communications Relay and Navigation Systems

NASA is developing commercial lunar relay services to provide

- communications;
- navigation;
- persistent coverage;
- higher data rate;
- support for far-side and polar assets.

The architecture places relay spacecraft around the Moon so that surface users can communicate through an orbiter even when Earth is not visible.

---

## 33. Relay link

The communication path becomes

$$
\boxed{
\text{surface asset}
\rightarrow
\text{lunar relay}
\rightarrow
\text{Earth}.
}
$$

or

$$
\boxed{
\text{surface asset}
\rightarrow
\text{Gateway / relay}
\rightarrow
\text{Earth}.
}
$$

This is analogous in concept to a cellular or satellite relay network, but with lunar orbital geometry and deep-space link budgets.

---

## 34. Gateway communications

Gateway's communications architecture includes links for

- Earth ↔ Gateway;
- Gateway ↔ lunar surface;
- Gateway ↔ visiting vehicles.

NASA technical architecture has described

- X-band for command/ranging/telemetry functions;
- Ka-band for high-rate direct-to-Earth data;
- Ka-band lunar links;
- S-band capabilities for lower-rate lunar users and visiting vehicles.

Gateway therefore acts as both a destination and potentially a communications relay node.

---

# LunaNet

## 35. What LunaNet is

**LunaNet is not one satellite.**

It is a framework of interoperable standards, protocols, and interfaces for lunar communications and navigation.

Conceptually it brings an Internet-like service model to the Moon:

$$
\boxed{
\text{users}
+
\text{relay providers}
+
\text{ground networks}
+
\text{PNT}
+
\text{standards}.
}
$$

---

## 36. LunaNet services

NASA's LunaNet concept includes

- networked communications;
- lunar PNT;
- science services;
- alerts;
- interoperability among NASA, commercial, and international assets.

The long-term goal is to avoid every lunar mission having to build an entirely independent communications architecture.

---

## 37. Delay/disruption-tolerant networking

Deep-space links are intermittent.

Future lunar networking can therefore use concepts from **Delay/Disruption-Tolerant Networking (DTN)**.

Rather than assuming a continuous end-to-end connection, data can be

$$
\text{stored}
\rightarrow
\text{forwarded when link exists}
\rightarrow
\text{stored again}.
$$

This is useful for scheduled contacts, occultations, and relay networks.

---

# Data handling

## 38. Data prioritization

Not all bits have the same importance.

A crewed lunar spacecraft must prioritize

1. safety-critical command/telemetry;
2. crew voice;
3. navigation;
4. spacecraft engineering data;
5. science;
6. imagery/video.

High-volume video can be compressed or delayed if link capacity is needed for operational data.

NASA explicitly managed Artemis II data compression and prioritization to protect crew and mission information.

---

## 39. Compression

The raw data volume from modern cameras can greatly exceed available continuous downlink.

Compression reduces

$$
\text{bits per image/frame}
$$

at the cost of some fidelity.

The design problem is therefore

$$
\boxed{
\text{image quality}
\leftrightarrow
\text{bandwidth}
\leftrightarrow
\text{storage}
\leftrightarrow
\text{mission priority}.
}
$$

---

## 40. Store-and-forward operations

If a high-rate link is unavailable, spacecraft can store data onboard and transmit it later.

This decouples

$$
\text{data generation rate}
$$

from instantaneous

$$
\text{downlink rate}.
$$

Onboard storage is therefore part of the communications architecture.

---

# RF engineering considerations

## 41. Antenna pointing and spacecraft attitude

Communication performance depends on spacecraft attitude.

The installed gain is

$$
G_t(\theta,\phi).
$$

A maneuver can therefore change link margin even if transmitter power is unchanged.

Communications, GNC, thermal constraints, and solar-array pointing must be coordinated.

---

## 42. Doppler and frequency acquisition

Relative spacecraft velocity shifts the received carrier.

The receiver must

- predict the expected Doppler;
- search/acquire within uncertainty;
- track changing frequency.

At lunar mission velocities, frequency dynamics are operationally significant.

---

## 43. Polarization

Transmit and receive antennas must maintain sufficient polarization match.

A mismatch introduces polarization loss.

Spacecraft rotation, antenna geometry, and propagation geometry therefore enter the RF link budget.

---

## 44. Noise temperature

Deep-space receivers are often characterized using

$$
G/T,
$$

the ratio of antenna gain to system noise temperature.

For a fixed spacecraft signal,

$$
\boxed{
\text{higher }G/T
\rightarrow
\text{better receive sensitivity}.
}
$$

This is one reason DSN receiver systems are highly optimized.

---

## 45. Coding gain

Forward-error-correcting codes reduce the required raw link SNR for a target error probability.

Coding therefore effectively trades

$$
\text{processing complexity}
\rightarrow
\text{link margin}.
$$

Deep-space communications rely heavily on coding because transmit power and spacecraft antenna size are limited.

---

# Current Artemis context

## 46. Artemis II — completed lunar flyby

As of October 2026, Artemis II has completed its crewed lunar flyby.

The mission demonstrated the communications architecture for crewed translunar operations and provided a real operational test of

- NSN/DSN handoffs;
- crewed deep-space RF links;
- far-side blackout/reacquisition;
- optical communications.

---

## 47. Artemis III and later missions

NASA's current October 2026 plan places **Artemis III in low Earth orbit in 2027** as an integrated demonstration involving Orion and test versions of commercial human landing systems.

NASA currently describes the subsequent crewed lunar landing effort as beginning in **2028**.

Therefore the communications architecture described on this page should be read as

- **demonstrated Orion/DSN/NSN capability from Artemis II**, plus
- **evolving architecture for future lunar surface missions, Gateway, commercial landers, and lunar relays**.

---

# Complete communications chain

## 48. From astronaut to Earth

A simplified voice/data route during deep-space flight is

$$
\boxed{
\text{crew / payload}
\rightarrow
\text{Orion avionics}
\rightarrow
\text{RF or optical terminal}
\rightarrow
\text{DSN / optical ground terminal}
\rightarrow
\text{terrestrial network}
\rightarrow
\text{Mission Control}.
}
$$

Future surface operations add another hop:

$$
\boxed{
\text{astronaut / rover}
\rightarrow
\text{lunar relay / Gateway}
\rightarrow
\text{Earth ground network}
\rightarrow
\text{Mission Control}.
}
$$

---

## 49. What makes Artemis communications an electromagnetics problem?

At the physical layer, the entire system reduces to

$$
\boxed{
\text{antenna aperture}
+
\text{frequency}
+
\text{power}
+
\text{distance}
+
\text{noise}
+
\text{pointing}
+
\text{propagation}
}.
$$

But mission success also requires

$$
\boxed{
\text{networking}
+
\text{navigation}
+
\text{data handling}
+
\text{autonomy}
+
\text{operations}.
}
$$

Artemis is therefore an excellent example of electromagnetics becoming a complete systems-engineering problem.

---

## 50. Selected NASA references

- NASA, [Networks Keeping NASA's Artemis II Mission Connected](https://www.nasa.gov/missions/artemis/networks-keeping-nasas-artemis-ii-mission-connected/) — Near Space Network, DSN, blackout, O2O, and lunar relay overview.
- NASA, [Artemis II Press Kit](https://www.nasa.gov/artemis-ii-press-kit/) — mission profile and communications/network architecture.
- NASA, [Orion Avionics and Software — Communications and Tracking](https://www.nasa.gov/reference/avionics-and-software/) — Orion phased arrays, voice/data/video, command and telemetry.
- NASA, [Orion Artemis II Optical Communications System](https://www.nasa.gov/technology/space-comms/o2o/) — O2O terminal and optical ground system.
- NASA/JPL, [Deep Space Network](https://www.nasa.gov/communicating-with-missions/dsn/) — global deep-space RF infrastructure.
- NASA, [Near Space Network](https://www.nasa.gov/technology/space-comms/what-is-the-near-space-network/) — near-Earth and lunar commercial communications services.
- NASA, [Lunar Communications and Navigation Architecture](https://www.nasa.gov/wp-content/uploads/2024/01/lunar-communications-and-navigation-architecture.pdf) — Artemis lunar CPNT architecture.
- NASA NTRS, [Gateway Power and Propulsion Element Communications Links](https://ntrs.nasa.gov/citations/20210019019) — Earth, Gateway, and lunar links.
- NASA, [LunaNet Interoperability Specification](https://www.nasa.gov/directorates/somd/space-communications-navigation-program/lunanet-interoperability-specification/) — interoperable lunar networking and PNT framework.
- NASA, [Artemis II Lunar Science Data Release](https://www.nasa.gov/blogs/artemis/2026/10/07/nasa-releases-artemis-ii-lunar-science-data-images/) — scale of data returned from the crewed lunar flyby.

Related: [Spacecraft Electromagnetics](../computational-em/) · [Antennas & Radiation](../antennas/) · [RF & Microwave](../rf-microwave/) · [Laser Systems](../laser-systems/) · [Inertial Navigation](../inertial-navigation/) · [Measurements & Instruments](../measurements/)
