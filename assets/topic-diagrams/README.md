# Topic diagram SVG library

This folder contains 96 original, independent SVG illustrations.

The shared default Jekyll layout derives the SVG filename from the Markdown page path.
Examples:
- aesa/index.md becomes assets/topic-diagrams/aesa.svg
- foundations/maxwells-equations.md becomes assets/topic-diagrams/foundations-maxwells-equations.svg
- index.md becomes assets/topic-diagrams/index.svg

The layout displays an SVG only when that static file exists.
The accompanying site JavaScript places the figure directly after the page title.
The IMU analog-circuits chapter preserves its separately authored detailed drawing.

Design standard:
- SVG viewBox of 1280 by 645, responsive and editable.
- Navy background, turquoise physical signal-flow row, violet implementation row.
- Five topic-specific blocks per row, with directional arrows.
- Engineering insight and accessibility title/description.

For a new page, create the corresponding SVG file using the same structure.
These figures are conceptual technical diagrams, not vendor schematics.
