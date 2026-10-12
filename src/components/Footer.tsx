import React from 'react';

export const Footer: React.FC = () => {
  const techStack = [
    'React 19',
    'Three.js',
    'WebGL',
    'Tailwind CSS',
    'TypeScript',
    'Vite',
  ];

  const platformSpecs = [
    'Autonomous LiDAR Capture',
    'Real-time Point Cloud Telemetry',
    'Kinetic Defect Classification',
    'Georeferenced 3D Topography',
    'Automated Quality Reporting',
  ];

  return (
    <footer className="flex w-full flex-col bg-white px-4 pb-12 md:px-6 md:pb-6 dsk:px-8 border-t border-[#cacfd1]">
      <div className="flex w-full flex-col py-12 md:py-16 justify-between gap-12">
        {/* Top Row: Mission & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src="/nav/promptedsite.svg" alt="Promptedsite" className="size-6" />
              <span className="font-sans font-medium text-xl tracking-tight text-ink uppercase">
                PROMPTEDSITE
              </span>
            </div>
            <p className="font-sans text-xl md:text-2xl font-light text-ink leading-relaxed max-w-md">
              Enterprise-grade autonomous LiDAR scanning and automated structural telemetry.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-md md:ml-auto">
            <p className="font-sans text-base text-ink/70 font-light leading-relaxed">
              Accelerating aerial intelligence for energy grids, civil infrastructure, and mining sectors worldwide.
            </p>
          </div>
        </div>

        {/* Middle Row: Tech Stack & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-ink/10 pt-10 text-sm font-sans">
          <div>
            <p className="font-mono text-xs text-ink/50 uppercase tracking-widest mb-4">
              [ Tech Stack ]
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded bg-ink/5 border border-ink/10 font-mono text-xs text-ink/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-ink/50 uppercase tracking-widest mb-4">
              [ Platform Capabilities ]
            </p>
            <div className="flex flex-wrap gap-2">
              {platformSpecs.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 rounded bg-ink/5 border border-ink/10 font-mono text-xs text-ink/80"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-ink/10 pt-8 gap-4 font-mono text-xs text-ink/50">
          <p>
            High-precision autonomous LiDAR scanning platform.
          </p>
          <p>© Promptedsite 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
