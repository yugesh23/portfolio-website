import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MouseState } from '../../hooks/useMousePosition';
import { ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

interface HeroVisualProps {
  mouse: MouseState;
  isMobile: boolean;
}

export function HeroVisual({ mouse, isMobile }: HeroVisualProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt: max 5-6 degrees strictly per requirement
  const rotX = isMobile ? 0 : -mouse.normalizedY * 5.5;
  const rotY = isMobile ? 0 : mouse.normalizedX * 5.5;
  const glareX = (mouse.normalizedX + 1) * 50;
  const glareY = (-mouse.normalizedY + 1) * 50;

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[450px] mx-auto flex flex-col items-center">
      {/* Floating Badge 1 (Max 2): Top Left - Verified Analyst */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3.5 sm:-top-4 -left-2 sm:-left-3 z-40 px-3 sm:px-3.5 py-2 rounded-2xl bg-[#151F30]/95 backdrop-blur-xl border border-[#263449] shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-2 sm:gap-2.5 text-xs font-sans group hover:border-[#38BDF8]/60 transition-colors pointer-events-none sm:pointer-events-auto"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0B1220] text-[#38BDF8] border border-[#263449] flex items-center justify-center font-bold flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
        </div>
        <div>
          <div className="font-bold text-white text-xs sm:text-sm tracking-wide">Verified Analyst</div>
          <div className="text-[10px] text-slate-400 font-mono">Industry Ready</div>
        </div>
      </motion.div>

      {/* Floating Badge 2 (Max 2): Bottom Right - Stat Callout (-15% Turnaround) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-3.5 sm:-bottom-4 -right-2 sm:-right-3 z-40 px-3 sm:px-3.5 py-2 rounded-2xl bg-[#151F30]/95 backdrop-blur-xl border border-[#263449] shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-2 sm:gap-2.5 text-xs font-sans group hover:border-[#34D399]/60 transition-colors pointer-events-none sm:pointer-events-auto"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0B1220] text-[#34D399] border border-[#263449] flex items-center justify-center font-bold flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-[#34D399]" />
        </div>
        <div>
          <div className="font-bold text-[#34D399] text-xs sm:text-sm tracking-wide">-15% Turnaround</div>
          <div className="text-[10px] text-slate-400 font-mono">Automated Reporting</div>
        </div>
      </motion.div>

      {/* Main Card Container with Subtle 3D Tilt */}
      <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[520px] perspective-[1200px]">
        {/* Soft Ambient Sky Bloom */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-[#38BDF8]/08 to-[#A78BFA]/06 rounded-3xl blur-xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          ref={cardRef}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.18s ease-out',
          }}
          className="relative w-full h-full rounded-3xl overflow-hidden bg-[#151F30] backdrop-blur-2xl border border-[#263449] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between p-4 sm:p-6 group hover:border-[#38BDF8]/40 transition-colors"
        >
          {/* Subtle Dynamic Glare Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(56, 189, 248, 0.07), transparent 70%)`,
            }}
          />

          {/* Top Status Header */}
          <div className="relative z-30 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1220]/80 border border-[#263449] text-slate-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span className="font-semibold text-[11px] tracking-wider uppercase text-slate-200">
                Ready for Data Roles
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              HY / 2026
            </div>
          </div>

          {/* Center Stage: Clean 3D Profile Photo with Subtler Animated Glowing Ring */}
          <div className="relative flex-1 w-full flex items-center justify-center my-3">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 flex items-center justify-center">
              
              {/* Subtle Single-Color Animated Outer Orbit Ring (#38BDF8) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 sm:-inset-4 rounded-full pointer-events-none"
              >
                <div className="w-full h-full rounded-full border border-dashed border-[#38BDF8]/30 relative">
                  {/* Subtle Orbiting Node */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#A78BFA]/70" />
                </div>
              </motion.div>

              {/* Subtler Animated Pulse Glow via Framer Motion (Single Color: #38BDF8) */}
              <motion.div
                animate={{
                  scale: [1, 1.035, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-1 rounded-full border border-[#38BDF8]/50 shadow-[0_0_20px_rgba(56,189,248,0.25)] pointer-events-none z-20"
              />

              {/* Circular Avatar Container Holding Hari's Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0B1220] border-2 border-[#263449] shadow-inner z-10 flex items-center justify-center">
                {/* Soft gradient backing */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,rgba(11,18,32,0.95)_75%)] pointer-events-none" />

                {/* Hari's crisp photo centered cleanly inside circular viewport */}
                <img
                  src="/assets/me.png"
                  alt="Hari Sai Yugesh - Data Analyst"
                  className="w-full h-full object-cover object-[50%_15%] select-none pointer-events-none filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
                  loading="eager"
                />

                {/* Bottom subtle shadow inside photo circle */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0B1220]/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom Identification Bar */}
          <div className="relative z-30 p-3 sm:p-3.5 rounded-2xl bg-[#0B1220]/90 backdrop-blur-md border border-[#263449] space-y-1">
            <div className="flex items-center justify-between">
              <div className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                Hari Sai Yugesh
              </div>
              <span className="font-mono text-[10px] text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-full border border-[#38BDF8]/25 font-semibold uppercase tracking-wider">
                Data Analyst
              </span>
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-slate-300 flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
              <span className="truncate">SQL • Python • Power BI • Dashboards & ETL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
