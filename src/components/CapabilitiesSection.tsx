import React, { useState } from 'react';

interface CapabilityItem {
  id: string;
  label: string;
  value: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const CapabilitiesSection: React.FC = () => {
  const items: CapabilityItem[] = [
    {
      id: 'scan',
      label: 'Scan',
      value: '360°',
      description:
        'Full-hemisphere LiDAR capture at 240,000 points per second across terrain, structures and vegetation in a single pass.',
      specs: [
        { label: 'Pulse Rate', value: '240 kHz' },
        { label: 'Field of View', value: 'Full Hemisphere' },
        { label: 'Returns', value: 'Up to 5 simultaneous' },
      ],
    },
    {
      id: 'connection',
      label: 'Connection',
      value: '7 km',
      description:
        'Encrypted dual-band command uplink with real-time point-cloud telemetry and automatic interference handling.',
      specs: [
        { label: 'Frequency', value: '2.4 GHz / 5.8 GHz' },
        { label: 'Encryption', value: 'AES-256 GCM' },
        { label: 'Latency', value: '< 25 ms' },
      ],
    },
    {
      id: 'compactness',
      label: 'Compactness',
      value: '42 cm',
      description:
        'Folds down to 42 cm and deploys in minutes — no ground station, no tooling.',
      specs: [
        { label: 'Folded Length', value: '420 mm' },
        { label: 'Takeoff Weight', value: '4.8 kg' },
        { label: 'Deployment Time', value: '< 180 seconds' },
      ],
    },
  ];

  const [activeId, setActiveId] = useState<string>('scan');
  const current = items.find((i) => i.id === activeId) || items[0];

  return (
    <section
      id="capabilities-section"
      className="relative min-h-screen bg-canvas px-4 md:px-6 dsk:px-8 py-24 md:py-36 border-t border-ink/15"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 border-b border-ink/15 gap-6">
        <div className="flex items-center gap-4">
          <h2 id="capabilities" className="font-sans text-5xl md:text-7xl font-light text-ink tracking-tight">
            Capabilities
          </h2>
          <span className="flex size-7 items-center justify-center rounded-full border border-ink/20 font-mono text-xs text-ink/70">
            5
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-ink/60 uppercase">
          <span>[ tech ]</span>
          <span className="text-ink/20">/</span>
          <span>[ stats ]</span>
        </div>
      </div>

      {/* Main Interactive Layout */}
      <div className="grid grid-cols-1 dsk:grid-cols-12 gap-8 md:gap-12 pt-12 items-start">
        {/* Navigation Selector */}
        <div className="dsk:col-span-4 flex flex-col gap-3">
          {items.map((item) => {
            const isSelected = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center justify-between p-6 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-ink bg-white shadow-lg'
                    : 'border-ink/10 hover:border-ink/30 bg-transparent'
                }`}
              >
                <div>
                  <div className="font-mono text-xs text-ink/50 uppercase tracking-widest mb-1">
                    [ MODE 0{items.indexOf(item) + 1} ]
                  </div>
                  <div className="font-sans text-2xl font-light text-ink">
                    {item.label}
                  </div>
                </div>
                <div className="font-sans text-3xl font-light text-ink tracking-tight">
                  {item.value}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Focal & Details Area */}
        <div
          id="capabilities-visual"
          className="dsk:col-span-8 flex flex-col justify-between min-h-[460px] p-8 md:p-12 rounded-2xl bg-white border border-ink/15 shadow-sm"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-ink/60 uppercase tracking-wider">
              <span className="size-2 bg-ink rounded-full animate-pulse" />
              <span>Telemetry: {current.label.toUpperCase()} MODE ACTIVE</span>
            </div>

            <div className="font-sans text-5xl md:text-6xl font-light text-ink mb-6 tracking-tight">
              {current.value}
            </div>

            <p className="font-sans text-xl md:text-2xl font-light text-ink/80 leading-relaxed max-w-2xl mb-12">
              {current.description}
            </p>
          </div>

          {/* Technical Specs Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {current.specs.map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <span className="font-mono text-xs text-ink/50 uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="font-sans text-lg font-medium text-ink mt-1">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
