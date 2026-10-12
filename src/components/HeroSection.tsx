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
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-canvas px-4 md:px-8 dsk:px-12 pt-24 pb-8"
    >
      {/* Background Curtain & Watermark Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,#dde5e9_0%,#fdfdfd_100%)] z-0 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1440px] px-4 md:px-8 aspect-[26/12] opacity-100 flex items-center justify-center -translate-y-8">
          <div
            className="w-full h-full bg-center bg-no-repeat bg-contain transition-all duration-700"
            style={{ backgroundImage: 'url(/hero/promptedsite.svg)' }}
          />
        </div>
      </div>

      {/* Spacer for 3D Drone focal area */}
      <div className="relative min-h-[45vh] flex-1 pointer-events-none" />

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
