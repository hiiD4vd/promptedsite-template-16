import React from 'react';

export const LandingSection: React.FC = () => {
  return (
    <section
      id="landing-section"
      className="relative flex h-80 md:h-[450px] w-full flex-col items-center justify-between overflow-x-clip bg-white px-6 py-8 border-t border-ink/10"
    >
      {/* Top Gradient Fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-white to-transparent" />

      {/* Top Telemetry Header */}
      <div className="relative z-20 flex w-full items-center justify-between font-mono text-xs text-ink/64 tracking-wider">
        <span>[ PROMPTEDSITE ]</span>
        <span className="text-right">[ TOUCHDOWN SYSTEM READY ]</span>
      </div>

      {/* Center Landing Pad Marker */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none opacity-40">
        <div className="size-32 rounded-full border border-dashed border-ink/40 flex items-center justify-center">
          <div className="size-20 rounded-full border border-ink/30 flex items-center justify-center font-mono text-xs text-ink/60">
            H
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-20 flex w-full items-center justify-between font-mono text-xs text-ink/64 tracking-wider">
        <span>[ STATUS: AUTONOMOUS DOCKING ]</span>
        <span className="text-right">[ D:02 M:CIF ]</span>
      </div>
    </section>
  );
};
