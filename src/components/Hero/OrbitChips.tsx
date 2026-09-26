import React from 'react';
import { motion } from 'framer-motion';
import { MouseState } from '../../hooks/useMousePosition';
import { Clock, LayoutDashboard, Users, BarChart3 } from 'lucide-react';

interface OrbitChipsProps {
  mouse: MouseState;
  isMobile: boolean;
}

const CHIPS = [
  {
    id: 'reporting-time',
    label: 'Reduced Reporting Time by 15%',
    sub: 'Workflow Automation',
    icon: Clock,
    border: 'border-cyan-500/30 hover:border-cyan-400',
    iconColor: 'text-cyan-accent',
    glow: 'hover:shadow-[0_0_25px_rgba(0,212,255,0.35)]',
    position: 'top-[16%] right-[22%] lg:right-[24%]',
    delay: 0.2,
    yOffset: -10,
  },
  {
    id: 'dashboards',
    label: 'Built 2 Production Dashboards',
    sub: 'Power BI & Live KPI Telemetry',
    icon: LayoutDashboard,
    border: 'border-violet-500/30 hover:border-violet-400',
    iconColor: 'text-violet-400',
    glow: 'hover:shadow-[0_0_25px_rgba(124,58,237,0.35)]',
    position: 'top-[44%] right-[2%] lg:right-[3%]',
    delay: 0.4,
    yOffset: 12,
  },
  {
    id: 'cohorts',
    label: 'Cohort & Retention Analysis',
    sub: 'RFM & M0–M5 Decay Curves',
    icon: Users,
    border: 'border-cyan-500/30 hover:border-cyan-400',
    iconColor: 'text-cyan-accent',
    glow: 'hover:shadow-[0_0_25px_rgba(0,212,255,0.35)]',
    position: 'top-[22%] right-[2%] lg:right-[4%]',
    delay: 0.3,
    yOffset: 10,
  },
  {
    id: 'insights',
    label: 'Delivered Business Insights',
    sub: 'Empirical Decision Support',
    icon: BarChart3,
    border: 'border-amber-500/30 hover:border-amber-400',
    iconColor: 'text-amber-accent',
    glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]',
    position: 'bottom-[22%] right-[26%] lg:right-[28%]',
    delay: 0.6,
    yOffset: -8,
  },
];

export function OrbitChips({ mouse, isMobile }: OrbitChipsProps) {
  if (isMobile) {
    // Render static compact chip row on mobile below hero
    return (
      <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-md mx-auto z-10 relative">
        {CHIPS.map((chip) => {
          const Icon = chip.icon;
          return (
            <div
              key={chip.id}
              className={`p-3 rounded-xl bg-space-850/90 backdrop-blur-md border ${chip.border} flex items-center gap-2.5 shadow-lg`}
            >
              <div className={`p-2 rounded-lg bg-white/5 ${chip.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-display font-bold text-xs text-white leading-tight">{chip.label}</p>
                <p className="font-mono text-[9px] text-slate-400">{chip.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop floating orbiting chips with mouse counter-parallax
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {CHIPS.map((chip) => {
        const Icon = chip.icon;
        // Subtle counter-parallax based on mouse position
        const shiftX = mouse.normalizedX * -18;
        const shiftY = mouse.normalizedY * -14;

        return (
          <motion.div
            key={chip.id}
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, chip.yOffset, 0],
              x: shiftX,
            }}
            transition={{
              opacity: { duration: 0.8, delay: chip.delay },
              scale: { duration: 0.8, delay: chip.delay },
              y: {
                repeat: Infinity,
                duration: 4.8 + chip.delay * 1.5,
                ease: 'easeInOut',
              },
              x: { type: 'spring', damping: 25, stiffness: 90 },
            }}
            className={`absolute ${chip.position} pointer-events-auto`}
          >
            <div
              data-cursor="Metric"
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-space-900/85 backdrop-blur-xl border ${chip.border} ${chip.glow} shadow-2xl hover:scale-105 hover:bg-space-850/95 transition-all duration-300 cursor-pointer`}
            >
              <div className={`p-2 rounded-xl bg-white/5 ${chip.iconColor} group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-display font-bold text-xs sm:text-sm text-slate-100 tracking-wide group-hover:text-cyan-accent transition-colors">
                  {chip.label}
                </p>
                <p className="font-mono text-[10px] text-slate-400">{chip.sub}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
