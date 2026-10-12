import React from 'react';

export const HeroSection: React.FC = () => {
  const handleScrollDown = () => {
    const next = document.getElementById('intro-section');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex h-svh flex-col justify-between overflow-hidden bg-canvas px-4 md:px-6 dsk:px-8 pt-20 pb-8"
    >
      {/* Background Curtain & Watermark Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,#dde5e9_0%,#fdfdfd_100%)] z-0">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-2515/723 w-full opacity-60">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-size-[100%_auto] transition-all duration-1000"
            style={{ backgroundImage: 'url(/hero/promptedsite.svg)' }}
          />
        </div>
      </div>

      {/* Spacer for 3D Drone focal area */}
      <div className="relative min-h-0 flex-1 pointer-events-none" />

      {/* Bottom Content Bar */}
      <div className="relative z-10 flex flex-col gap-4 md:grid md:grid-cols-12 md:items-end md:gap-0 pt-6 border-t border-[rgba(36,54,63,0.12)]">
        <div className="md:col-span-8 max-w-2xl">
          <h1 className="text-xl md:text-2xl dsk:text-3xl font-light text-ink leading-tight tracking-[-0.6px]">
            Autonomous LIDAR inspection systems.
          </h1>
          <p className="text-lg md:text-xl font-light text-[rgba(36,54,63,0.64)] leading-relaxed tracking-[-0.4px] mt-1">
            Precision that secures critical infrastructure.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-start md:justify-end">
          <button
            onClick={handleScrollDown}
            className="group flex items-center gap-3 font-mono text-xs text-ink/80 hover:text-ink transition-colors uppercase tracking-wider py-2"
          >
            <span>Scroll Down</span>
            <span className="flex size-6 items-center justify-center rounded-full border border-ink/20 group-hover:border-ink/60 transition-colors">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
