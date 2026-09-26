import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, LayoutDashboard, Users, Award } from 'lucide-react';
import { ScrollHeader } from '../UI/ScrollHeader';

gsap.registerPlugin(ScrollTrigger);

const METRIC_CARDS = [
  {
    icon: Clock,
    value: 15,
    suffix: '%',
    label: 'Reduced Reporting Time',
    sub: 'Workflow Automation',
    color: 'text-[#34D399]',
    iconBg: 'bg-[#0B1220] text-[#34D399] border border-[#263449]',
    hoverBorder: 'hover:border-[#34D399]/50',
  },
  {
    icon: LayoutDashboard,
    value: 2,
    suffix: '',
    label: 'Production Dashboards',
    sub: 'Power BI & Live KPI Telemetry',
    color: 'text-[#A78BFA]',
    iconBg: 'bg-[#0B1220] text-[#A78BFA] border border-[#263449]',
    hoverBorder: 'hover:border-[#A78BFA]/50',
  },
  {
    icon: Users,
    value: 1400,
    suffix: '+',
    label: 'Customer Cohorts Analyzed',
    sub: 'RFM & Retention Decay Models',
    color: 'text-[#38BDF8]',
    iconBg: 'bg-[#0B1220] text-[#38BDF8] border border-[#263449]',
    hoverBorder: 'hover:border-[#38BDF8]/50',
  },
  {
    icon: Award,
    value: 4,
    suffix: '',
    label: 'Honors & Publications',
    sub: 'Taylor & Francis Author & State Wins',
    color: 'text-[#A78BFA]',
    iconBg: 'bg-[#0B1220] text-[#A78BFA] border border-[#263449]',
    hoverBorder: 'hover:border-[#A78BFA]/50',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Word illumination kinetic scrub
      const words = textRef.current?.querySelectorAll('.about-word');
      if (words && words.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        });

        tl.fromTo(
          words,
          { opacity: 0.25, color: '#64748B' },
          {
            opacity: 1,
            color: '#FFFFFF',
            stagger: 0.03,
            ease: 'power2.out',
          }
        );
      }

      // Metric cards entrance with 3D perspective scroll trigger
      if (countersRef.current) {
        const cards = countersRef.current.querySelectorAll('.metric-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, rotationX: 10, transformPerspective: 1000, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: countersRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Counter count-up numbers
        const statElements = countersRef.current.querySelectorAll('.stat-number');
        statElements.forEach((el) => {
          const card = el as HTMLElement;
          const targetVal = parseFloat(card.dataset.value || '0');
          ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: targetVal,
                duration: 1.8,
                ease: 'power3.out',
                onUpdate: () => {
                  card.textContent = Math.floor(obj.val).toLocaleString();
                },
              });
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#263449]/70 space-y-16"
    >
      {/* Section Header */}
      <ScrollHeader
        badge="01 // Data Philosophy & Impact"
        title="Turning Data Into Decisions"
        tagline="Actionable Intelligence • Behavioral Analytics • Automated Reporting"
      />

      {/* Kinetic Narrative Statement */}
      <div
        ref={textRef}
        className="max-w-5xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.38] tracking-tight font-semibold text-white"
      >
        <span className="about-word">I</span>{' '}
        <span className="about-word">specialize</span>{' '}
        <span className="about-word">in</span>{' '}
        <span className="about-word">transforming</span>{' '}
        <span className="about-word">raw</span>{' '}
        <span className="about-word">data</span>{' '}
        <span className="about-word">into</span>{' '}
        <span className="relative inline-block mr-2">
          <span className="about-word text-[#38BDF8] font-bold">actionable business insights</span>
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] rounded-full" />
        </span>
        <span className="about-word">.</span>{' '}
        <span className="about-word">Using</span>{' '}
        <span className="relative inline-block mr-2">
          <span className="about-word text-[#A78BFA] font-bold bg-[#151F30] px-2.5 py-0.5 rounded-lg border border-[#263449]">
            SQL, Python, and Power BI
          </span>
        </span>
        <span className="about-word">,</span>{' '}
        <span className="about-word">I</span>{' '}
        <span className="about-word">analyze</span>{' '}
        <span className="about-word">behavior,</span>{' '}
        <span className="relative inline-block mr-2">
          <span className="about-word text-[#38BDF8] font-bold">detect anomalies</span>
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#38BDF8] rounded-full" />
        </span>
        <span className="about-word">,</span>{' '}
        <span className="about-word">and</span>{' '}
        <span className="about-word">build</span>{' '}
        <span className="relative inline-block mr-2">
          <span className="about-word text-[#A78BFA] font-bold">automated dashboards</span>
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#A78BFA] rounded-full" />
        </span>
        <span className="about-word">that</span>{' '}
        <span className="about-word">solve</span>{' '}
        <span className="about-word">real</span>{' '}
        <span className="about-word">business</span>{' '}
        <span className="about-word">problems.</span>
      </div>

      {/* Animated Metric Cards */}
      <div
        ref={countersRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {METRIC_CARDS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              data-cursor="Metric"
              className={`metric-card bg-[#151F30] p-6 rounded-2xl border border-[#263449] ${item.hoverBorder} shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${item.iconBg} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Verified Data
                </span>
              </div>

              <div className="pt-3">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-display text-4xl sm:text-5xl font-black ${item.color} stat-number`}
                    data-value={item.value}
                  >
                    0
                  </span>
                  <span className={`font-display text-3xl font-black ${item.color}`}>
                    {item.suffix}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm text-white mt-2">
                  {item.label}
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
