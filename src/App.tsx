import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { GearSection } from './components/GearSection';
import { SolutionsSection } from './components/SolutionsSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { SoftwareSection } from './components/SoftwareSection';
import { LandingSection } from './components/LandingSection';
import { Footer } from './components/Footer';
import { DroneOverlay } from './components/DroneOverlay';

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-ink font-sans selection:bg-ink selection:text-white">
      {/* 3D Drone Three.js WebGL Overlay */}
      <DroneOverlay />

      {/* Global Header */}
      <Header />

      {/* Main Sections */}
      <main className="relative z-0">
        <HeroSection />
        <IntroSection />
        <GearSection />
        <SolutionsSection />
        <CapabilitiesSection />
        <SoftwareSection />
        <LandingSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
