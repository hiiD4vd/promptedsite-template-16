import React, { useState } from 'react';

interface StatItem {
  plain: { label: string; value: string };
  meter: { label: string; value: string; bar: number };
}

interface Solution {
  id: string;
  name: string;
  paragraphs: string;
  video: string;
  stats: StatItem[];
  tags: string[];
}

export const SolutionsSection: React.FC = () => {
  const solutions: Solution[] = [
    {
      id: 'energy',
      name: 'Energy',
      paragraphs:
        'Modern grids span thousands of acres of terrain that ground crews can no longer monitor at scale.\n\nLiDAR-equipped UAVs eliminate access risk while cutting inspection cycles from weeks to hours.',
      video: '/solutions/energy.mp4',
      stats: [
        { plain: { label: 'Scope', value: '360°' }, meter: { label: 'Scan modes', value: '2', bar: 0.72 } },
        { plain: { label: 'Coverage', value: '100 km²/day' }, meter: { label: 'Max altitude [m]', value: '500', bar: 0.95 } },
        { plain: { label: 'Accuracy', value: '±2 cm' }, meter: { label: 'Point rate [k/S]', value: '240', bar: 0.76 } },
      ],
      tags: ['Wind Turbines', 'Solar Farms', 'Power Lines', 'Substations'],
    },
    {
      id: 'geospatial',
      name: 'Geospatial',
      paragraphs:
        'City-scale digital twins and topographic surveys demand data density that satellite and traditional aerial methods cannot consistently deliver.\n\nDrone LiDAR captures 100–500 points per square meter at centimeter-level accuracy.',
      video: '/solutions/geospatial.mp4',
      stats: [
        { plain: { label: 'Scope', value: '360°' }, meter: { label: 'Scan modes', value: '2', bar: 0.72 } },
        { plain: { label: 'Coverage', value: '10 km²/flight' }, meter: { label: 'GSD [cm]', value: '3', bar: 0.62 } },
        { plain: { label: 'Accuracy', value: '±2 cm' }, meter: { label: 'Point density [/m²]', value: '400', bar: 0.94 } },
      ],
      tags: ['Urban Planning', 'Digital Twins', 'Flood Modeling', 'GIS'],
    },
    {
      id: 'industry',
      name: 'Industry',
      paragraphs:
        'Stockpile volumes, pit wall stability, and conveyor structures in active industrial sites require data that no ground crew can safely collect.\n\nDrone LiDAR surveys replace hours of manual work with a single autonomous flight.',
      video: '/solutions/industry.mp4',
      stats: [
        { plain: { label: 'Scope', value: '360°' }, meter: { label: 'Scan modes', value: '2', bar: 0.72 } },
        { plain: { label: 'Coverage', value: '1.2 km × 1 km' }, meter: { label: 'Accuracy [%]', value: '1-3', bar: 0.62 } },
        { plain: { label: 'Accuracy', value: '±2 cm' }, meter: { label: 'Point rate [k/S]', value: '240', bar: 0.76 } },
      ],
      tags: ['Mining', 'Stockpiles', 'Pit Walls', 'Manufacturing'],
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      paragraphs:
        'Bridges, tunnels, dams and road networks demand inspection cycles that traditional methods can no longer sustain.\n\nAutonomous LiDAR scanning eliminates access risk and cuts survey time by up to 80%.',
      video: '/solutions/infrastructure.mp4',
      stats: [
        { plain: { label: 'Scope', value: '360°' }, meter: { label: 'Scan modes', value: '60', bar: 0.72 } },
        { plain: { label: 'Scout time', value: '< 40 min' }, meter: { label: 'Max range [m]', value: '450', bar: 0.66 } },
        { plain: { label: 'Accuracy', value: '±2 cm' }, meter: { label: 'Point rate [k/S]', value: '240', bar: 0.76 } },
      ],
      tags: ['Bridges', 'Dams', 'Highways', 'Railway Networks'],
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('energy');
  const current = solutions.find((s) => s.id === activeTab) || solutions[0];

  return (
    <section id="solutions" className="relative min-h-screen bg-canvas px-4 md:px-6 dsk:px-8 py-24 md:py-36 border-t border-ink/15">
      {/* Title */}
      <div className="flex items-center justify-between pb-12 border-b border-ink/15">
        <div className="flex items-center gap-4">
          <h2 id="solutions-title" className="font-sans text-5xl md:text-7xl font-light text-ink tracking-tight">
            Solutions
          </h2>
          <span className="flex size-7 items-center justify-center rounded-full border border-ink/20 font-mono text-xs text-ink/70">
            4
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {solutions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                activeTab === s.id
                  ? 'bg-ink text-white'
                  : 'border border-ink/20 text-ink/70 hover:border-ink hover:text-ink'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Showcase */}
      <div className="grid grid-cols-1 dsk:grid-cols-12 gap-8 md:gap-12 pt-12 items-start">
        {/* Left Column: Description & Specs */}
        <div className="dsk:col-span-5 flex flex-col justify-between min-h-[480px]">
          <div>
            <h3 className="font-sans text-3xl md:text-4xl font-light text-ink mb-6">
              {current.name}
            </h3>
            <p className="font-sans text-lg text-ink/70 font-light leading-relaxed whitespace-pre-line mb-8">
              {current.paragraphs}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {current.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded bg-ink/5 border border-ink/10 font-mono text-xs text-ink/80">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
            {current.stats.map((st, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider">
                  {st.plain.label}
                </span>
                <span className="font-sans text-xl md:text-2xl font-light text-ink mt-1">
                  {st.plain.value}
                </span>
                <div className="w-full bg-ink/10 h-1 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-ink h-full rounded-full transition-all duration-500"
                    style={{ width: `${st.meter.bar * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Full Video Showcase */}
        <div className="dsk:col-span-7">
          <div className="relative w-full aspect-160/90 rounded-2xl overflow-hidden border border-ink/20 shadow-2xl bg-black">
            <video
              key={current.video}
              src={current.video}
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-white/90">
              [ SECTOR: {current.name.toUpperCase()} ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
