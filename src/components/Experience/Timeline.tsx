import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '../../data/profile';
import { Briefcase, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { ScrollHeader } from '../UI/ScrollHeader';

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animated SVG line drawing
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength() || 1000;
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        });
      }

      // Alternating 3D perspective reveal of timeline cards
      const cards = containerRef.current?.querySelectorAll('.timeline-card');
      cards?.forEach((card, index) => {
        const isEven = index % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isEven ? -40 : 40,
            rotationY: isEven ? -8 : 8,
            rotationX: 4,
            transformPerspective: 1000,
            scale: 0.96,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#263449]/70 space-y-16"
    >
      {/* Section Header */}
      <ScrollHeader
        badge="04 // Career & Trajectory"
        title="Experience & Education"
        tagline="Infyntrek Internship • Academic Foundations"
      />

      {/* Vertical Timeline Container */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* SVG Drawing Trail */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 pointer-events-none hidden sm:block">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#263449"
              strokeWidth="2"
            />
            <path
              ref={pathRef}
              d="M 2 0 L 2 2000"
              stroke="url(#timelineGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="space-y-12">
          {/* 1. Infyntrek Internship Milestone */}
          <div className="timeline-card relative sm:grid sm:grid-cols-2 gap-8 items-center">
            {/* Left Column: Role Details */}
            <div className="sm:text-right space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220] border border-[#263449] text-[#38BDF8] font-mono text-xs font-semibold shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
                Aug 2026 – Present (Remote)
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                Data Analyst Intern
              </h3>
              <p className="font-mono text-sm text-[#38BDF8] font-bold">
                Infyntrek Systems
              </p>
            </div>

            {/* Central Node Marker */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0B1220] border-2 border-[#38BDF8] items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)] z-10">
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            </div>

            {/* Right Column: Impact Bullets */}
            <div className="bg-[#151F30] p-6 sm:p-8 rounded-3xl border border-[#263449] shadow-xl space-y-4 hover:border-[#38BDF8]/50 transition-all duration-300">
              <ul className="space-y-3 font-sans text-sm text-slate-300 leading-relaxed">
                {PROFILE.experience[0].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] mt-1 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="pt-2 flex flex-wrap gap-2 border-t border-[#263449]">
                {PROFILE.experience[0].skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0B1220] border border-[#263449] text-slate-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. B.Tech IT Education Milestone */}
          <div className="timeline-card relative sm:grid sm:grid-cols-2 gap-8 items-center">
            {/* Left Card */}
            <div className="sm:order-2 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220] border border-[#263449] text-[#A78BFA] font-mono text-xs font-semibold shadow-sm">
                <GraduationCap className="w-3.5 h-3.5" />
                2023 – 2027
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                B.Tech, Information Technology
              </h3>
              <p className="font-mono text-sm text-[#A78BFA] font-bold">
                NRI Institute of Technology, Agiripalli
              </p>
              <p className="font-mono text-xs text-slate-400 font-medium">
                Roll No: 23KN1A1239
              </p>
            </div>

            {/* Central Node Marker */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0B1220] border-2 border-[#A78BFA] items-center justify-center shadow-[0_0_12px_rgba(167,139,250,0.5)] z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
            </div>

            {/* Right Card */}
            <div className="sm:order-1 bg-[#151F30] p-6 rounded-2xl border border-[#263449] sm:text-right space-y-2 shadow-lg">
              <p className="font-sans text-sm text-slate-300">
                Comprehensive training in database architectures, algorithmic logic, and applied data analytics pipelines.
              </p>
              <span className="inline-block font-mono text-xs text-[#A78BFA] bg-[#0B1220] px-3 py-1 rounded-lg border border-[#263449] font-semibold">
                Undergraduate Degree
              </span>
            </div>
          </div>

          {/* 3. Intermediate Education Milestone */}
          <div className="timeline-card relative sm:grid sm:grid-cols-2 gap-8 items-center">
            <div className="sm:text-right space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220] border border-[#263449] text-slate-300 font-mono text-xs font-semibold shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                2021 – 2023
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Intermediate (Class XII)
              </h3>
              <p className="font-mono text-sm text-slate-400">
                Sr Junior College, Andhra Pradesh
              </p>
            </div>

            {/* Central Node Marker */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B1220] border-2 border-[#38BDF8] items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10">
              <div className="w-1 h-1 rounded-full bg-[#38BDF8]" />
            </div>

            <div className="bg-[#151F30] p-6 rounded-2xl border border-[#263449] space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">Score</span>
                <span className="font-display font-black text-xl text-[#34D399]">
                  79.1%
                </span>
              </div>
              <p className="font-sans text-xs text-slate-300">
                Mathematics, Physics, and Chemistry analytical foundations.
              </p>
            </div>
          </div>

          {/* 4. SSC High School Milestone */}
          <div className="timeline-card relative sm:grid sm:grid-cols-2 gap-8 items-center">
            <div className="sm:order-2 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220] border border-[#263449] text-slate-300 font-mono text-xs font-semibold shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                2020 – 2021
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                SSC (Class X)
              </h3>
              <p className="font-mono text-sm text-slate-400">
                KC High School, Andhra Pradesh
              </p>
            </div>

            {/* Central Node Marker */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B1220] border-2 border-[#A78BFA] items-center justify-center shadow-[0_0_10px_rgba(167,139,250,0.5)] z-10">
              <div className="w-1 h-1 rounded-full bg-[#A78BFA]" />
            </div>

            <div className="sm:order-1 bg-[#151F30] p-6 rounded-2xl border border-[#263449] sm:text-right space-y-2 shadow-lg">
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="font-mono text-xs text-slate-400">Cumulative GPA</span>
                <span className="font-display font-black text-xl text-[#34D399]">
                  10.0 / 10.0
                </span>
              </div>
              <p className="font-sans text-xs text-slate-300">
                Perfect score graduation across all state academic examinations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
