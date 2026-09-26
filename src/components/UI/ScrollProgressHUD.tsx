import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: '01', title: 'Overview' },
  { id: 'services', label: '02', title: 'What I Do' },
  { id: 'storytelling', label: '03', title: 'Data Story' },
  { id: 'analytics', label: '04', title: '3D Analytics' },
  { id: 'about', label: '05', title: 'Data Philosophy' },
  { id: 'skills', label: '06', title: 'Skills & Stack' },
  { id: 'simulator', label: '07', title: 'ROI Simulator' },
  { id: 'experience', label: '08', title: 'Experience' },
  { id: 'projects', label: '09', title: 'Case Studies' },
  { id: 'achievements', label: '10', title: 'Recognitions' },
  { id: 'contact', label: '11', title: 'Connect' },
];

export function ScrollProgressHUD() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, Math.round((scrollY / (docHeight || 1)) * 100)));
      setScrollPercent(pct);

      // Detect active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-1.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center select-none pointer-events-auto">
      {/* Prominent Live Scroll Percentage Counter */}
      <div className="mb-2 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#151F30] backdrop-blur-xl border border-[#263449] shadow-md flex items-center justify-center">
        <span className="font-mono text-[10px] sm:text-[11px] font-black text-[#38BDF8] tracking-wider">
          {scrollPercent}%
        </span>
      </div>

      {/* Vertical Navigation Track with Section Points */}
      <div className="relative flex flex-col items-center gap-2 sm:gap-2.5 py-2.5 sm:py-3 px-1 sm:px-1.5 rounded-full bg-[#151F30] backdrop-blur-xl border border-[#263449] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        {/* Background Vertical Line Track */}
        <div className="absolute top-3 bottom-3 w-[2px] bg-[#263449] rounded-full" />

        {/* Dynamic Glowing Filled Progress Line */}
        <div
          className="absolute top-3 w-[2px] bg-gradient-to-b from-[#38BDF8] to-[#A78BFA] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)] transition-all duration-150"
          style={{ height: `${scrollPercent}%`, maxHeight: 'calc(100% - 24px)' }}
        />

        {/* Section Navigation Point Nodes */}
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-center group cursor-pointer z-10 p-0.5"
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => scrollTo(sec.id)}
            >
              {/* Outer Indicator Ring */}
              <div
                className={`rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-125'
                    : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#0B1220] border border-[#263449] group-hover:border-[#38BDF8] group-hover:scale-110 shadow-sm'
                }`}
              >
                {/* Inner Dot */}
                <div
                  className={`rounded-full transition-all duration-200 ${
                    isActive ? 'w-1 h-1 bg-[#0B1220] scale-100' : 'w-1 h-1 bg-slate-500 group-hover:bg-[#38BDF8]'
                  }`}
                />
              </div>

              {/* Flyout Label */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`hidden md:flex absolute right-7 px-3 py-1 rounded-xl whitespace-nowrap pointer-events-none items-center gap-2 border font-mono text-xs shadow-xl backdrop-blur-xl ${
                      isActive
                        ? 'bg-[#151F30] border-[#38BDF8]/60 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        : 'bg-[#151F30] border-[#263449] text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-[#38BDF8] font-bold">{sec.label}</span>
                    <span className="font-sans font-medium text-xs">{sec.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
