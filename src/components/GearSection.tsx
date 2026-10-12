import React from 'react';

export const GearSection: React.FC = () => {
  const stats = [
    {
      value: '5 returns',
      label: 'MAX RETURNS',
      title: 'TECH',
      desc: 'Penetrates dense canopy and structural layers to capture true ground topography.',
    },
    {
      value: '±2 cm',
      label: 'DETECTION ACCURACY',
      title: 'PRECISION',
      desc: 'Sub-centimeter relative elevation accuracy across industrial and civil structures.',
    },
    {
      value: '450 m',
      label: 'MAX RANGE',
      title: 'RANGE',
      desc: 'Operational standoff distance ensuring safe mapping around high-voltage power lines.',
    },
  ];

  return (
    <section id="gear" className="relative min-h-screen bg-canvas px-4 md:px-6 dsk:px-8 py-24 md:py-36 flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-12 border-b border-ink/15">
        <div className="flex items-center gap-4">
          <h2 className="font-sans text-5xl md:text-7xl font-light text-ink tracking-tight">
            Gear
          </h2>
          <span className="flex size-7 items-center justify-center rounded-full border border-ink/20 font-mono text-xs text-ink/70">
            3
          </span>
        </div>

        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ink/60 uppercase tracking-widest">
            <span className="size-1.5 bg-ink" />
            <span>PAYLOAD ARCHITECTURE</span>
          </div>
          <p className="font-sans text-lg md:text-xl font-light text-ink leading-relaxed">
            Engineered around high-precision LiDAR payloads. Our system delivers frame-based point cloud acquisition with up to 240,000 pts/s and five simultaneous returns per pulse.
          </p>
        </div>
      </div>

      {/* Radar Dome Arc Area (Focal area for the 3D drone hovering in front) */}
      <div id="gear-dome" className="relative my-12 md:my-20 flex flex-col items-center justify-center min-h-[320px] pointer-events-none">
        {/* Semi-circular Radar Outline */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <svg className="w-full max-w-4xl h-48 md:h-64" viewBox="0 0 800 240" fill="none">
            <path
              d="M 100 240 A 300 180 0 0 1 700 240"
              stroke="#24363f"
              strokeOpacity="0.15"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            <circle cx="400" cy="60" r="4" fill="#24363f" fillOpacity="0.4" />
            <line x1="400" y1="60" x2="400" y2="240" stroke="#24363f" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 4" />
          </svg>
        </div>
      </div>

      {/* Stats Dome Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 border-t border-ink/15 pt-8">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className={`flex flex-col justify-between p-6 ${
              idx < 2 ? 'md:border-r border-ink/15' : ''
            }`}
          >
            <div>
              <div className="font-mono text-xs text-ink/50 uppercase tracking-widest mb-3">
                [ {s.title} ]
              </div>
              <div className="font-sans text-4xl md:text-5xl font-light text-ink tracking-tight mb-2">
                {s.value}
              </div>
              <div className="font-mono text-xs text-ink/70 uppercase tracking-wider mb-4">
                [ {s.label} ]
              </div>
            </div>
            <p className="font-sans text-sm text-ink/60 font-light leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
