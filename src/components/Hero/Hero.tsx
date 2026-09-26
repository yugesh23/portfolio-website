import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroVisual } from './HeroVisual';
import { HeroCanvas } from './HeroCanvas';
import { useMousePosition } from '../../hooks/useMousePosition';
import { AnimatedCounter } from '../UI/AnimatedCounter';
import {
  Sparkles,
  ArrowDown,
  FileText,
  TrendingUp,
  Database,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

export function Hero() {
  const mouse = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo('#projects', { duration: 1.2 });
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative min-h-[92vh] w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-16 px-4 sm:px-8 bg-[#0B1220]"
    >
      {/* Subtle Background Atmosphere */}
      <HeroCanvas mouse={mouse} isMobile={isMobile} />

      {/* Main 2-Column Clean Layout */}
      <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Strategic Positioning & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151F30] border border-[#263449] text-[#38BDF8] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="tracking-wider uppercase font-semibold">
              Hari Sai Yugesh • Portfolio
            </span>
          </div>

          {/* Headline: Only "DATA ANALYST" receives gradient, rest is solid high-contrast white */}
          <h1 className="font-display font-extrabold tracking-tight uppercase leading-[1.15] select-none text-white">
            <span className="text-3xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] bg-clip-text text-transparent inline-block">
              Data Analyst
            </span>{' '}
            <span className="text-slate-500 font-light text-2xl sm:text-4xl lg:text-5xl mx-1 sm:mx-2 hidden sm:inline">
              |
            </span>{' '}
            <span className="text-white text-xl sm:text-3xl lg:text-4xl xl:text-5xl block sm:inline mt-1.5 sm:mt-0 font-display">
              Turning Data into Business Decisions
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
            Built automated dashboards, reduced reporting turnaround by{' '}
            <span className="text-[#34D399] font-semibold bg-[#34D399]/10 px-2 py-0.5 rounded border border-[#34D399]/25">
              15%
            </span>
            , and analyzed customer behavior using{' '}
            <span className="text-[#38BDF8] font-semibold bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/25">
              SQL
            </span>
            ,{' '}
            <span className="text-[#38BDF8] font-semibold bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/25">
              Python
            </span>
            , and{' '}
            <span className="text-[#A78BFA] font-semibold bg-[#A78BFA]/10 px-2 py-0.5 rounded border border-[#A78BFA]/25">
              Power BI
            </span>
            .
          </p>

          {/* Disciplined Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 py-1 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#151F30] border border-[#263449] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[#38BDF8] font-semibold">PIPELINE:</span> 12.4K ROWS/S
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#151F30] border border-[#263449] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              <span className="text-[#34D399] font-semibold">ACCURACY:</span> 99.8% INTEGRITY
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#151F30] border border-[#263449] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              <span className="text-[#A78BFA] font-semibold">SQL & DAX:</span> PROD READY
            </span>
          </div>

          {/* Functional CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto lg:mx-0">
            <a
              href="#projects"
              onClick={scrollToProjects}
              data-cursor="Explore"
              className="group relative px-6 py-3.5 rounded-xl font-sans text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A78BFA] hover:opacity-95 transition-all duration-200 shadow-[0_4px_20px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="/assets/Yugesh_Resume_main.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Download"
              className="px-6 py-3.5 rounded-xl font-sans text-sm font-semibold text-slate-200 hover:text-white bg-[#151F30] hover:bg-[#1E2C44] border border-[#263449] hover:border-[#38BDF8]/40 transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Preserved Row: 4 Clean Stat Cards Below CTA Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-3 pt-6 border-t border-[#263449] text-xs font-sans">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#151F30] border border-[#263449] hover:border-[#34D399]/40 transition-colors">
              <TrendingUp className="w-4 h-4 text-[#34D399] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#34D399] font-mono text-xs sm:text-sm">
                  -<AnimatedCounter to={15} suffix="%" />
                </span>
                <span className="text-[10px] text-slate-400">Reporting Time</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#151F30] border border-[#263449] hover:border-[#38BDF8]/40 transition-colors">
              <Database className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-white font-mono text-xs sm:text-sm">
                  <AnimatedCounter to={2400} suffix="+" />
                </span>
                <span className="text-[10px] text-slate-400">Cohort & RFM Records</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#151F30] border border-[#263449] hover:border-[#A78BFA]/40 transition-colors">
              <BarChart3 className="w-4 h-4 text-[#A78BFA] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-white font-mono text-xs sm:text-sm">
                  <AnimatedCounter to={2} suffix=" Live" />
                </span>
                <span className="text-[10px] text-slate-400">BI Dashboards</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#151F30] border border-[#263449] hover:border-[#34D399]/40 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-[#34D399] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#34D399] font-mono text-xs sm:text-sm">
                  <AnimatedCounter to={99.8} decimals={1} suffix="%" />
                </span>
                <span className="text-[10px] text-slate-400">Data Integrity</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: User Portrait Showcase */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <HeroVisual mouse={mouse} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
