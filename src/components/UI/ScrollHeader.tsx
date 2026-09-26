import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  action?: React.ReactNode;
}

export function ScrollHeader({ badge, title, subtitle, tagline, action }: ScrollHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Badge glide and glow reveal
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, x: -30, filter: 'blur(3px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Bold Title upward kinetic reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Subtitle / Tagline fade and lift
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Horizontal divider self-drawing line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
        <div className="space-y-3">
          {/* Eyebrow Pill */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151F30] border border-[#263449] text-[#38BDF8] font-mono text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="font-semibold">{badge}</span>
          </div>

          {/* Title - Crisp Disciplined Typography */}
          <h2
            ref={titleRef}
            className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-[1.12]"
          >
            {title}
          </h2>

          {/* Subtitle / Description */}
          {subtitle && (
            <p
              ref={subtitleRef}
              className="text-slate-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed"
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side tagline or action controls */}
        <div className="flex flex-col sm:items-end gap-3 self-start sm:self-end">
          {action}
          {tagline && (
            <span className="font-mono text-xs text-slate-500 sm:text-right font-medium">
              {tagline}
            </span>
          )}
        </div>
      </div>

      {/* Self-drawing Divider Line */}
      <div
        ref={lineRef}
        className="w-full h-[1.5px] bg-gradient-to-r from-[#38BDF8]/80 via-[#A78BFA]/40 to-transparent origin-left"
      />
    </div>
  );
}
