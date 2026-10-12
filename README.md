# Promptedsite LiDAR Inspection Drone Platform

Next-generation interactive 3D web application showcasing an autonomous LiDAR drone inspection system with real-time point-cloud scanning, defect detection, and structural telemetry.

## Features

- **Interactive 3D Three.js Drone**: Scroll-driven flight dynamics, rotor rotation with shutter physics, and gimbal mouse tracking.
- **Topography & Terrain Viewer**: 3D point cloud surface elevation inspection and interactive defect classification markers.
- **Telemetry Video Showcase**: Embedded inline video loops demonstrating structural defect recognition across energy, geospatial, industry, and civil infrastructure.
- **Lenis Smooth Scrolling**: Decoupled inertial scroll animations integrated seamlessly with WebGL render loops.
- **High-Performance Architecture**: Built with Vite, React 19, TypeScript, and Tailwind CSS tokens.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **3D & Graphics**: Three.js + WebGL (DRACO & Meshopt compression)
- **Animation**: GSAP + Lenis Smooth Scroll
- **Styling**: Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

## License

MIT © Promptedsite 2026. All rights reserved.
