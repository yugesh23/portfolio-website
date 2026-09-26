import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  Cpu,
  TrendingUp,
  Database,
  CheckCircle,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoryStage {
  step: string;
  stageName: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bulletHeader: string;
  bullets: string[];
  accentColor: string;
  glowColor: string;
  icon: React.ReactNode;
  terminalHeader: string;
  terminalSub: string;
  terminalLines: { text: string; color: string }[];
  telemetry: { label: string; value: string }[];
}

const STAGES: StoryStage[] = [
  {
    step: '01',
    stageName: 'The Problem',
    badge: 'STAGE 1: THE BOTTLENECK',
    title: 'Businesses Struggle with Unstructured Data & Silos',
    subtitle: '15+ hours lost every week to manual copy-pasting',
    description:
      'Transactional tables are scattered across CSV exports, unverified ERP logs, and fragile spreadsheets. Teams waste 15+ hours weekly manually reconciling figures, leaving customer churn signals and gross margin decay completely invisible.',
    bulletHeader: 'Critical Friction Points:',
    bullets: [
      '15+ hours lost to repetitive manual reporting',
      '18.4% data discrepancies between sales and operations',
      'Zero real-time visibility into executive customer cohorts',
    ],
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.2)',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
    terminalHeader: 'STATUS: CRITICAL BOTTLENECK',
    terminalSub: 'UNRESOLVED',
    terminalLines: [
      { text: '[ERR] 342 duplicate customer orders found', color: 'text-red-400' },
      { text: '[WARN] 18% schema mismatch in Q3 revenue logs', color: 'text-amber-400' },
      { text: '[ERR] NULL price fields in 120 checkout events', color: 'text-red-400' },
      { text: '... manual Excel reconciliation in progress: 15h 22m', color: 'text-slate-500' },
    ],
    telemetry: [
      { label: 'Manual Reporting', value: '15+ hrs/wk' },
      { label: 'Discrepancy Rate', value: '18.4%' },
      { label: 'Executive Trust', value: 'Low' },
    ],
  },
  {
    step: '02',
    stageName: 'The Process',
    badge: 'STAGE 2: THE ENGINE',
    title: 'Automated SQL Pipelines & Python Transformation',
    subtitle: 'From messy transactions to clean dimensional schemas',
    description:
      'Eliminating manual Excel bottlenecks with modular SQL CTEs, window functions, and automated Python anomaly detection. Data is transformed into clean dimensional star schemas in seconds.',
    bulletHeader: 'Engineering Deliverables:',
    bullets: [
      'Automated schema normalization & foreign key verification',
      '100% automated null value imputation algorithms',
      'Sub-second query execution with optimized relational indexing',
    ],
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    icon: <Cpu className="w-5 h-5 text-[#38BDF8]" />,
    terminalHeader: 'SQL / PYTHON PIPELINE ACTIVE',
    terminalSub: '1.2ms RUNTIME',
    terminalLines: [
      { text: 'WITH ranked_cohorts AS (', color: 'text-[#38BDF8]' },
      { text: '  SELECT customer_id, purchase_date,', color: 'text-slate-400' },
      { text: '  ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY purchase_date)', color: 'text-slate-400' },
      { text: ') SELECT * FROM clean_mart;', color: 'text-[#38BDF8]' },
    ],
    telemetry: [
      { label: 'Pipeline Runtime', value: '1.2ms' },
      { label: 'ETL Automation', value: '100%' },
      { label: 'Data Integrity', value: '99.8%' },
    ],
  },
  {
    step: '03',
    stageName: 'The Insights',
    badge: 'STAGE 3: THE INSIGHTS',
    title: 'Executive Dashboards & Cohort Telemetry',
    subtitle: 'Real-time telemetry for executive stakeholders',
    description:
      'Interactive Power BI models armed with dynamic DAX time intelligence and RFM customer segmentation. Stakeholders slice revenue velocity, retention curves, and SKU margins within 1 click.',
    bulletHeader: 'Actionable Intelligence:',
    bullets: [
      '+24.6% cohort retention visibility across customer lifecycle',
      'Automated early-warning churn alerts triggered in real time',
      'Single-pane-of-glass executive dashboards with drill-downs',
    ],
    accentColor: '#A78BFA',
    glowColor: 'rgba(167, 139, 250, 0.2)',
    icon: <LayoutDashboard className="w-5 h-5 text-[#A78BFA]" />,
    terminalHeader: 'POWER BI LIVE TELEMETRY',
    terminalSub: 'DAX ACTIVE',
    terminalLines: [
      { text: 'Total Revenue Analyzed: Rs. 4.2M+', color: 'text-white' },
      { text: 'Gross Margin %: 34.2% (+4.1% MoM)', color: 'text-[#34D399]' },
      { text: 'High LTV Cohort Retention: +24.6%', color: 'text-[#38BDF8]' },
      { text: 'Automated Churn Trigger: Active', color: 'text-[#A78BFA]' },
    ],
    telemetry: [
      { label: 'Cohort Retention', value: '+24.6%' },
      { label: 'Drilldown Speed', value: '1-Click' },
      { label: 'Visibility', value: 'Instant' },
    ],
  },
  {
    step: '04',
    stageName: 'The Decisions',
    badge: 'STAGE 4: THE OUTCOME',
    title: 'Boardroom Decisions Driven by High-Confidence Data',
    subtitle: 'Strategic ROI and operational excellence',
    description:
      'Turnaround time reduced by 15%, manual errors eradicated, and leadership armed with predictive visibility to allocate marketing budgets, optimize pricing, and accelerate growth.',
    bulletHeader: 'Business ROI Realized:',
    bullets: [
      '15% reduction in weekly reporting turnaround time',
      '2,400+ customer lifecycle records analyzed with 99.8% accuracy',
      'Confident, evidence-based boardroom budget allocations',
    ],
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    icon: <TrendingUp className="w-5 h-5 text-[#34D399]" />,
    terminalHeader: 'STRATEGIC OUTCOME REALIZED',
    terminalSub: 'DEPLOYED',
    terminalLines: [
      { text: 'Turnaround Time Reclaimed: -15%', color: 'text-[#34D399]' },
      { text: 'Verified Transaction Records: 2,400+', color: 'text-[#38BDF8]' },
      { text: 'Decision Confidence Index: 100%', color: 'text-white' },
      { text: 'Enterprise Ready for Analytics Roles', color: 'text-slate-300' },
    ],
    telemetry: [
      { label: 'Turnaround', value: '-15%' },
      { label: 'Records', value: '2,400+' },
      { label: 'Actionable', value: '100%' },
    ],
  },
];

export function DataStorytelling() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStage = STAGES[activeIdx];
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 40, rotationX: 7, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="storytelling"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#38BDF8]/05 blur-[160px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151F30] border border-[#263449] text-[#38BDF8] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>END-TO-END ANALYTICAL JOURNEY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          From Data → Insights → Decisions
        </h2>

        <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
          How I systematically convert ambiguous business questions and messy transactional records
          into streamlined automated decision engines.
        </p>
      </div>

      {/* 3D Animated Interactive Container */}
      <div ref={containerRef} className="perspective-[1200px] space-y-8">
        {/* Interactive Step Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAGES.map((stage, idx) => {
          const isCurrent = activeIdx === idx;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveIdx(idx)}
              className={`relative text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between group cursor-pointer ${
                isCurrent
                  ? 'bg-[#151F30] border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                  : 'bg-[#151F30] border-[#263449] hover:border-[#38BDF8]/40 hover:bg-[#1A263A]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                    isCurrent
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 shadow-inner'
                      : 'bg-[#0B1220] text-slate-400 border border-[#263449]'
                  }`}
                >
                  {stage.step}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Step {stage.step}
                  </div>
                  <div
                    className={`font-display font-bold text-xs sm:text-sm transition-colors ${
                      isCurrent ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {stage.stageName}
                  </div>
                </div>
              </div>

              {isCurrent && (
                <div className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Presentation Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative rounded-3xl p-6 sm:p-10 bg-[#151F30] border border-[#263449] shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl shadow-inner"
                  style={{
                    backgroundColor: `${activeStage.accentColor}15`,
                    border: `1px solid ${activeStage.accentColor}35`,
                  }}
                >
                  {activeStage.icon}
                </div>
                <span
                  className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    color: activeStage.accentColor,
                    backgroundColor: `${activeStage.accentColor}12`,
                    border: `1px solid ${activeStage.accentColor}25`,
                  }}
                >
                  {activeStage.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {activeStage.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono mt-1" style={{ color: activeStage.accentColor }}>
                  {activeStage.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
                {activeStage.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  {activeStage.bulletHeader}
                </div>
                <div className="space-y-1.5">
                  {activeStage.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm font-sans text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeStage.accentColor }} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Strip */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#263449]">
                {activeStage.telemetry.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0B1220] border border-[#263449] text-center"
                  >
                    <div className="text-base sm:text-lg font-mono font-bold text-white">
                      {t.value}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Demonstration Mockup */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl p-5 bg-[#0B1220] border border-[#263449] shadow-xl relative overflow-hidden font-mono text-xs space-y-3">
                {/* Window Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#263449] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] inline-block" />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    telemetry://step-{activeStage.step}.pipeline
                  </span>
                </div>

                {/* Status Bar */}
                <div
                  className="flex items-center justify-between p-2.5 rounded-xl border text-[11px]"
                  style={{
                    backgroundColor: `${activeStage.accentColor}12`,
                    borderColor: `${activeStage.accentColor}25`,
                    color: activeStage.accentColor,
                  }}
                >
                  <span className="font-bold">{activeStage.terminalHeader}</span>
                  <span className="text-[10px] font-bold">{activeStage.terminalSub}</span>
                </div>

                {/* Terminal Code / Execution Mockup */}
                <div className="p-3.5 rounded-xl bg-[#060B14] border border-[#263449] space-y-1.5 text-[11px]">
                  {activeStage.terminalLines.map((line, lIdx) => (
                    <div key={lIdx} className={line.color}>
                      {line.text}
                    </div>
                  ))}
                </div>

                {/* Summary Validation Pill */}
                <div className="p-2.5 rounded-xl bg-[#151F30] border border-[#263449] flex items-center justify-between text-slate-300 text-[11px]">
                  <span className="font-sans">Transformation Status:</span>
                  <span className="font-mono text-[#34D399] font-bold">100% Validated</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    </section>
  );
}
