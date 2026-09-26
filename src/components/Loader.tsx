import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Database, Activity } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ultra-snappy cyber boot loader (completes in ~400ms instead of 3000ms)
    const startTime = performance.now();
    const duration = 420; // 420ms total boot time

    const frame = () => {
      const elapsed = performance.now() - startTime;
      const ratio = Math.min(1, elapsed / duration);
      // Ease-out curve for fast snap
      const easedProgress = Math.round((1 - Math.pow(1 - ratio, 3)) * 100);
      setProgress(easedProgress);

      if (ratio < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(onComplete, 80);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#0B1220] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      >
        {/* Ambient Soft Glow in Loader */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#38BDF8]/08 blur-[140px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#A78BFA]/06 blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm w-full text-center">
          {/* Rotating Ring Monogram */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Outer rotating dash ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#38BDF8]/40"
            />
            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute inset-1.5 rounded-full border border-[#A78BFA]/30"
            />
            {/* Center Monogram Badge */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-[#A78BFA] p-[2px] shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <div className="w-full h-full bg-[#0B1220] rounded-[14px] flex items-center justify-center">
                <span className="font-display font-black text-lg tracking-wider bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] bg-clip-text text-transparent">
                  HY
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry Progress Indicator */}
          <div className="space-y-2.5 w-full">
            <div className="flex items-center justify-between text-xs font-mono px-1">
              <span className="flex items-center gap-2 text-[#38BDF8] font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
                <span className="text-[11px] sm:text-xs">INITIALIZING PORTFOLIO...</span>
              </span>
              <span className="font-bold text-white font-mono text-xs">{progress}%</span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#151F30] border border-[#263449] overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Subtext info */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            <span>Hari Sai Yugesh</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#38BDF8]">Data Analyst</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
