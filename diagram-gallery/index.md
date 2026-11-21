---
layout: default
title: Technical Diagram Gallery — 96 Physics and Hardware Illustrations
description: Original scalable SVG diagrams covering electromagnetics, RF, quantum sensing, engineering hardware, and spacecraft instrumentation.
---

# Technical Diagram Gallery

These **96 original SVGs** follow the style of the [IMU circuit signal-chain figure](../assets/imu-analog-signal-chain.svg): deep-blue background, distinct turquoise and violet process rows, directional arrows, and engineering insights.

Each illustration connects the **physical mechanism** with the **implementation and measurement chain**. Select any diagram to view its full-size vector version.

<div class="diagram-library-grid">
{% assign technical_diagrams = site.static_files | where_exp: 'item', "item.path contains '/assets/topic-diagrams/'" | sort: 'path' %}
{% for item in technical_diagrams %}
{% if item.path contains '.svg' %}
{% assign diagram_title = item.basename | replace: '-', ' ' | capitalize %}
  <figure class="diagram-library-card">
    <a href="{{ item.path | relative_url }}" title="Open {{ diagram_title }}">
      <img src="{{ item.path | relative_url }}" loading="lazy" decoding="async" alt="{{ diagram_title }} — original engineering diagram">
      <figcaption>{{ diagram_title }}</figcaption>
    </a>
  </figure>
{% endif %}
{% endfor %}
</div>

### Notes

All topic diagrams are independent, editable SVG files in the [GitHub source library](https://github.com/RajavardhanT/Electromagnetics_Applications/tree/main/assets/topic-diagrams). They are **functional educational diagrams**, not proprietary circuit schematics or claims about specific hardware implementations.

The [original, more detailed IMU signal-chain diagram](../assets/imu-analog-signal-chain.svg) remains in its [IMU chapter](../imu-circuits/).
