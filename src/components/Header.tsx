import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getUTCHours();
      const mins = now.getUTCMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 || 12;
      const formattedMins = mins.toString().padStart(2, '0');
      setTimeStr(`GMT ${formattedHours}:${formattedMins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Gear', href: '#gear' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Software', href: '#software' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-6 dsk:px-8 border-b border-[#24363f]/10 bg-white/70 backdrop-blur-md transition-all duration-300">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <a href="#hero" className="flex items-center gap-2 group">
          <img src="/nav/promptedsite.svg" alt="Promptedsite" className="size-6 transition-transform group-hover:rotate-45" />
          <span className="font-sans font-medium text-lg tracking-[-0.4px] text-ink uppercase">
            Promptedsite
          </span>
        </a>
        <span className="hidden sm:inline text-ink/30">•</span>
        <span className="hidden sm:inline font-mono text-xs text-ink/64 uppercase tracking-wider">
          LiDAR Drone Inspection
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(link.href, e)}
            className="text-sm font-sans text-ink/64 hover:text-ink transition-colors tracking-tight"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Clock & Menu Trigger */}
      <div className="flex items-center gap-4">
        <div className="font-mono text-xs text-ink/64 tracking-tight">
          {timeStr}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center px-3 py-1 text-xs font-mono rounded border border-ink/20 text-ink hover:bg-ink/5"
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-[#24363f]/15 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className="text-xl font-light text-ink py-2 border-b border-ink/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
