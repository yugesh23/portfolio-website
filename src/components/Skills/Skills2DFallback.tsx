import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_SKILLS, TechSkill } from '../../data/skills';
import {
  Database,
  Brain,
  Server,
  Code,
  Globe,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skills2DProps {
  onSelectSkill: (skill: TechSkill) => void;
  focusedSkill: TechSkill | null;
}

export function Skills2DFallback({ onSelectSkill, focusedSkill }: Skills2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const coreAnalytics = TECH_SKILLS.filter((s) => s.category === 'Core Analytics');
  const dataScienceAI = TECH_SKILLS.filter((s) => s.category === 'Data Science & AI');
  const databases = TECH_SKILLS.filter((s) => s.category === 'Databases');
  const devTools = TECH_SKILLS.filter((s) => s.category === 'Developer Tools');
  const webFrameworks = TECH_SKILLS.filter((s) => s.category === 'Web & Frameworks');
  const methodologies = TECH_SKILLS.filter((s) => s.category === 'Analytics Methodologies');

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const groups = containerRef.current?.querySelectorAll('.skill-group');
      groups?.forEach((group) => {
        const cards = group.querySelectorAll('.skill-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, rotationX: 8, transformPerspective: 1000, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderCard = (skill: TechSkill) => {
    const isSelected = focusedSkill?.id === skill.id;

    return (
      <div
        key={skill.id}
        onClick={() => onSelectSkill(skill)}
        data-cursor="Inspect"
        className={`skill-card group relative p-5 rounded-2xl bg-[#151F30] border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg ${
          isSelected
            ? 'border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/40 bg-[#151F30]'
            : 'border-[#263449] hover:border-[#38BDF8]/50 shadow-sm'
        }`}
      >
        {/* Top colored accent indicator with brand glow */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300"
          style={{
            backgroundColor: skill.color,
          }}
        />

        <div>
          {/* Header: Official Vector Logo inside Pod + Category Pill */}
          <div className="flex items-center justify-between gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-all duration-300 group-hover:scale-105 shadow-sm shrink-0 border relative overflow-hidden bg-[#0B1220]"
              style={{
                borderColor: '#263449',
              }}
            >
              <img
                src={skill.logoUrl}
                alt={skill.name}
                className="w-7 h-7 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                loading="lazy"
              />
            </div>

            <span
              className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border shrink-0 font-bold tracking-wide"
              style={{
                borderColor: `${skill.color}55`,
                backgroundColor: `${skill.color}15`,
                color: skill.color,
              }}
            >
              {skill.category}
            </span>
          </div>

          {/* Skill Title */}
          <div className="pt-3.5 space-y-1">
            <h4 className="font-display font-bold text-base text-white group-hover:text-[#38BDF8] transition-colors">
              {skill.name}
            </h4>

            {/* Resume Impact Bullet */}
            <p className="font-sans text-xs text-slate-400 leading-relaxed pt-1 line-clamp-3">
              {skill.resumeBullet}
            </p>
          </div>
        </div>

        {/* Footer Technical Detail */}
        <div className="pt-3 mt-3 border-t border-[#263449] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="truncate pr-2">{skill.context.split(',')[0]}</span>
          <span className="text-[#38BDF8] group-hover:translate-x-0.5 transition-transform shrink-0 font-bold">
            Inspect →
          </span>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="space-y-14">
      {/* 1. Core Analytics Engine */}
      <div className="skill-group space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263449] pb-3">
          <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#38BDF8] border border-[#263449]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white tracking-wide">
              Core Analytics Engine
            </h3>
            <p className="font-mono text-xs text-[#38BDF8] font-medium">
              Primary production query languages, BI dashboards & automated business models
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {coreAnalytics.map(renderCard)}
        </div>
      </div>

      {/* 2. Data Science & Applied AI */}
      <div className="skill-group space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263449] pb-3">
          <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#A78BFA] border border-[#263449]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white tracking-wide">
              Data Science & Applied AI
            </h3>
            <p className="font-mono text-xs text-[#A78BFA] font-medium">
              Python DataFrames, numerical array computing, statistical curves & ATS AI models
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataScienceAI.map(renderCard)}
        </div>
      </div>

      {/* 3. Databases & Warehousing */}
      <div className="skill-group space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263449] pb-3">
          <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#38BDF8] border border-[#263449]">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white tracking-wide">
              Databases & Cloud Warehouses
            </h3>
            <p className="font-mono text-xs text-[#38BDF8] font-medium">
              Relational schemas, transactional integrity, indexing and cloud database integration
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {databases.map(renderCard)}
        </div>
      </div>

      {/* 4. Developer Tools & Languages */}
      <div className="skill-group space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263449] pb-3">
          <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#A78BFA] border border-[#263449]">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white tracking-wide">
              Developer Tools & Core Languages
            </h3>
            <p className="font-mono text-xs text-[#A78BFA] font-medium">
              Version control repositories, development environments and procedural algorithmic logic
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devTools.map(renderCard)}
        </div>
      </div>

      {/* 5. Web Technologies & Frameworks */}
      <div className="skill-group space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263449] pb-3">
          <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#38BDF8] border border-[#263449]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white tracking-wide">
              Web Technologies & Frameworks
            </h3>
            <p className="font-mono text-xs text-[#38BDF8] font-medium">
              Interactive dashboard frontends, responsive grid layouts and live REST API connectors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {webFrameworks.map(renderCard)}
        </div>
      </div>

      {/* 6. Analytics Methodologies */}
      <div className="skill-group space-y-4">
        <div className="flex items-center gap-3 border-b border-[#263449] pb-3">
          <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#A78BFA] border border-[#263449]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white tracking-wide">
              Analytics Methodologies & Quantitative Modeling
            </h3>
            <p className="font-mono text-xs text-[#A78BFA] font-medium">
              M0–M5 cohort retention decay, customer RFM tiers, pipeline ETL and executive KPI metrics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {methodologies.map(renderCard)}
        </div>
      </div>
    </div>
  );
}
