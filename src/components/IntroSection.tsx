import React, { useState } from 'react';

interface WordItem {
  text: string;
  muted?: boolean;
  video?: string;
}

export const IntroSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string>('/intro/video1.mp4');

  const words: WordItem[] = [
    { text: 'Detecting' },
    { text: 'cracks,', muted: true, video: '/intro/video1.mp4' },
    { text: 'deformations', muted: true, video: '/intro/video2.mp4' },
    { text: 'and' },
    { text: 'structural risks', muted: true, video: '/intro/video3.mp4' },
    { text: 'before' },
    { text: 'they' },
    { text: 'become' },
    { text: 'failures.' },
  ];

  return (
    <section id="intro-section" className="relative bg-canvas px-4 md:px-6 dsk:px-8 py-24 md:py-36 border-y border-[rgba(36,54,63,0.16)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 dsk:grid-cols-12 gap-12 items-center">
        {/* Kinetic Typography */}
        <div className="dsk:col-span-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-4">
          {words.map((w, idx) => {
            const hasVideo = !!w.video;
            return (
              <span
                key={idx}
                onMouseEnter={() => w.video && setActiveVideo(w.video)}
                className={`font-sans font-light tracking-[-1.5px] md:tracking-[-3px] transition-all duration-300 text-3xl sm:text-5xl md:text-6xl dsk:text-7xl ${
                  hasVideo
                    ? 'text-ink font-normal underline decoration-ink/30 decoration-2 underline-offset-8 cursor-pointer hover:decoration-ink'
                    : 'text-ink/64'
                }`}
              >
                {w.text}
              </span>
            );
          })}
        </div>

        {/* Live Inline Telemetry Video Preview */}
        <div className="dsk:col-span-4 flex flex-col items-start gap-4">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-ink/20 shadow-2xl bg-black/5">
            <video
              key={activeVideo}
              src={activeVideo}
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-white/90 uppercase tracking-widest">
              Live LiDAR Feed
            </div>
          </div>
          <p className="font-mono text-xs text-ink/60 uppercase tracking-wider">
            [ Structural Risk Detection Telemetry ]
          </p>
        </div>
      </div>
    </section>
  );
};
