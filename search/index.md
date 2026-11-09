---
layout: default
title: Search All Chapters
description: Search the complete contents of the Electromagnetics Applications reference, including phased arrays, RF hardware, computational electromagnetics, space instruments, and CUDA.
permalink: /search/
---

# Search the Electromagnetics Applications Reference

Search **chapter titles, descriptions and full page text** across the site. Results are generated from the current GitHub Pages content, so new chapters are included automatically after deployment.

<div class="site-search-page">
  <form id="search-page-form" class="search-page-form" role="search" method="get" action="{{ '/search/' | relative_url }}">
    <label for="search-page-input">Search the reference</label>
    <div class="search-page-controls">
      <input id="search-page-input" type="search" name="q" placeholder="e.g. active impedance, HFSS, TTD, Rydberg" autocomplete="off" minlength="2" aria-describedby="search-page-hint">
      <button type="submit">Search</button>
    </div>
    <p id="search-page-hint" class="search-page-hint">Try multiple technical terms to narrow the results. Press <kbd>/</kbd> or <kbd>Ctrl</kbd>+<kbd>K</kbd> from any page to open search.</p>
  </form>
  <p id="search-page-status" role="status" aria-live="polite">Enter at least two characters to begin searching.</p>
  <div id="search-page-results" class="search-page-results" aria-label="Search result pages"></div>
</div>

### Example searches

[Phased-array hardware]({{ '/search/' | relative_url }}?q=phased%20array%20hardware) ·
[HFSS coupling]({{ '/search/' | relative_url }}?q=HFSS%20coupling) ·
[CUDA]({{ '/search/' | relative_url }}?q=CUDA) ·
[Magnetometer calibration]({{ '/search/' | relative_url }}?q=magnetometer%20calibration)

<noscript>Search requires JavaScript. You can still browse the [Knowledge Map]({{ '/knowledge-map/' | relative_url }}) and [Advanced Engineering Learning Map]({{ '/advanced-engineering/' | relative_url }}).</noscript>
