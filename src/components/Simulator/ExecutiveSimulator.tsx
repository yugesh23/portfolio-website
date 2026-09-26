import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollHeader } from '../UI/ScrollHeader';
import {
  Sliders,
  TrendingDown,
  DollarSign,
  Clock,
  Sparkles,
  Database,
  Code2,
  BarChart,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ExecutiveSimulator() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  // Simulator Sliders State
  const [weeklyReports, setWeeklyReports] = useState(12);
  const [hoursPerReport, setHoursPerReport] = useState(4);
  const [reductionPct, setReductionPct] = useState(15); // Hari achieved 15% at Infyntrek
  const [hourlyRate, setHourlyRate] = useState(45);

  // Active Pipeline Stage Tab
  const [activeStage, setActiveStage] = useState<'raw' | 'sql' | 'python' | 'bi'>('sql');

  // Computed Business Impact
  const totalWeeklyHours = weeklyReports * hoursPerReport;
  const hoursSavedWeekly = (totalWeeklyHours * (reductionPct / 100));
  const annualHoursSaved = Math.round(hoursSavedWeekly * 52);
  const annualDollarSavings = Math.round(annualHoursSaved * hourlyRate);
  const teamEfficiencyBoost = Math.round((reductionPct / (100 - reductionPct)) * 100);

  // 3D Perspective Scroll Reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (leftCardRef.current) {
        gsap.fromTo(
          leftCardRef.current,
          { opacity: 0, y: 40, rotationX: 8, rotationY: -4, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftCardRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      if (rightCardRef.current) {
        gsap.fromTo(
          rightCardRef.current,
          { opacity: 0, y: 40, rotationX: 8, rotationY: 4, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.85,
            delay: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightCardRef.current,
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
      id="simulator"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#263449]/70 space-y-16"
    >
      <ScrollHeader
        badge="03 // Interactive Innovation"
        title="Executive Business Impact Simulator"
        subtitle="Calculate the quantifiable ROI of automated data pipelines and explore live SQL vs Python transformation stages."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start perspective-[1200px]">
        {/* Left Column: Interactive ROI Calculator with Sliders */}
        <div
          ref={leftCardRef}
          className="lg:col-span-6 bg-[#151F30] p-6 sm:p-7 rounded-3xl border border-[#263449] shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#263449]">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#38BDF8] border border-[#263449]">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Automation ROI Calculator
                </h3>
                <p className="font-mono text-xs text-slate-400">
                  Simulate time & cost savings from automated pipeline methodology
                </p>
              </div>
            </div>
            <span className="font-mono text-[11px] text-[#38BDF8] bg-[#0B1220] px-2.5 py-1 rounded-full border border-[#263449] font-bold">
              Live Model
            </span>
          </div>

          {/* Sliders Container */}
          <div className="space-y-5">
            {/* Slider 1: Weekly Reports */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-medium">Weekly Reports Generated</span>
                <span className="font-bold text-[#38BDF8] bg-[#0B1220] px-2 py-0.5 rounded border border-[#263449]">
                  {weeklyReports} reports / wk
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={40}
                value={weeklyReports}
                onChange={(e) => setWeeklyReports(Number(e.target.value))}
                className="w-full h-2 bg-[#0B1220] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>4 reports</span>
                <span>20 reports</span>
                <span>40 reports</span>
              </div>
            </div>

            {/* Slider 2: Hours Per Report */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-medium">Manual Hours Per Report (Legacy)</span>
                <span className="font-bold text-[#38BDF8] bg-[#0B1220] px-2 py-0.5 rounded border border-[#263449]">
                  {hoursPerReport} hrs / report
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={hoursPerReport}
                onChange={(e) => setHoursPerReport(Number(e.target.value))}
                className="w-full h-2 bg-[#0B1220] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 hr</span>
                <span>5 hrs</span>
                <span>10 hrs</span>
              </div>
            </div>

            {/* Slider 3: Reporting Reduction % */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-medium">Automated Time Reduction Target</span>
                <span className="font-bold text-[#34D399] bg-[#0B1220] px-2 py-0.5 rounded border border-[#263449]">
                  {reductionPct}% reduction
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                value={reductionPct}
                onChange={(e) => setReductionPct(Number(e.target.value))}
                className="w-full h-2 bg-[#0B1220] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10% (Baseline)</span>
                <span>15% (Infyntrek Result)</span>
                <span>40% (Max Automated)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Reactive Metric Outputs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <motion.div
              layout
              className="p-4 rounded-2xl bg-[#0B1220] border border-[#263449] text-center shadow-inner"
            >
              <div className="flex items-center justify-center gap-1 text-[#34D399] mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold">Annual Saved</span>
              </div>
              <div className="text-2xl font-black font-display text-white">
                {annualHoursSaved}
                <span className="text-sm font-normal text-[#34D399]"> hrs</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                ~{Math.round(annualHoursSaved / 8)} business days
              </div>
            </motion.div>

            <motion.div
              layout
              className="p-4 rounded-2xl bg-[#0B1220] border border-[#263449] text-center shadow-inner"
            >
              <div className="flex items-center justify-center gap-1 text-[#38BDF8] mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold">Annual Value</span>
              </div>
              <div className="text-2xl font-black font-display text-[#38BDF8]">
                ${annualDollarSavings.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                @ ${hourlyRate}/hr analyst rate
              </div>
            </motion.div>

            <motion.div
              layout
              className="p-4 rounded-2xl bg-[#0B1220] border border-[#263449] text-center col-span-2 sm:col-span-1 shadow-inner"
            >
              <div className="flex items-center justify-center gap-1 text-[#A78BFA] mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold">Efficiency</span>
              </div>
              <div className="text-2xl font-black font-display text-[#A78BFA]">
                +{teamEfficiencyBoost}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                throughput gain
              </div>
            </motion.div>
          </div>

          {/* Comparative Process Bar */}
          <div className="pt-2 border-t border-[#263449] space-y-2">
            <div className="text-xs font-mono font-semibold text-slate-300">
              Weekly Resource Allocation:
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Manual Legacy Process:</span>
                <span className="font-bold text-slate-200">{totalWeeklyHours} hrs/wk</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-full overflow-hidden">
                <div className="h-full bg-slate-600 rounded-full w-full" />
              </div>

              <div className="flex items-center justify-between text-[#38BDF8] pt-1 font-semibold">
                <span>With Automated SQL/BI Pipeline:</span>
                <span className="text-[#34D399]">{(totalWeeklyHours - hoursSavedWeekly).toFixed(1)} hrs/wk</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '85%' }}
                  animate={{ width: `${100 - reductionPct}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Stage Interactive Data Pipeline Showcase */}
        <div
          ref={rightCardRef}
          className="lg:col-span-6 bg-[#151F30] p-6 sm:p-7 rounded-3xl border border-[#263449] shadow-xl space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#263449]">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#0B1220] text-[#A78BFA] border border-[#263449]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Data Pipeline Architecture
                </h3>
                <p className="font-mono text-xs text-slate-400">
                  From raw ingestion to automated executive delivery
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#34D399] bg-[#0B1220] px-2.5 py-0.5 rounded-full border border-[#263449] font-bold">
              Automated
            </span>
          </div>

          {/* 4 Interactive Stage Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#0B1220] rounded-2xl border border-[#263449] text-xs font-mono">
            {[
              { id: 'raw', label: '1. Ingest' },
              { id: 'sql', label: '2. SQL' },
              { id: 'python', label: '3. Python' },
              { id: 'bi', label: '4. Power BI' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStage(tab.id as any)}
                className={`py-2 rounded-xl transition-all font-semibold ${
                  activeStage === tab.id
                    ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stage Detail Visual Code Box */}
          <div className="rounded-2xl bg-[#0B1220] border border-[#263449] text-slate-100 p-5 font-mono text-xs overflow-x-auto min-h-[260px] flex flex-col justify-between shadow-inner">
            {activeStage === 'raw' && (
              <div className="space-y-3">
                <div className="text-slate-400 text-[11px] flex items-center justify-between border-b border-[#263449] pb-2">
                  <span>INPUT: raw_transactional_stream.csv (14,200 rows)</span>
                  <span className="text-[#A78BFA]">UNSTRUCTURED</span>
                </div>
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>txn_id,user_id,amount,timestamp,status</div>
                  <div className="text-[#38BDF8]">TXN_90812,USR_412,420.50,2024-03-12 14:02:11,COMPLETED</div>
                  <div className="text-slate-500">TXN_90813,USR_412,NULL,2024-03-12 14:03:00,FAILED [MISSING]</div>
                  <div className="text-[#38BDF8]">TXN_90814,USR_899,1200.00,2024-03-12 14:05:43,COMPLETED</div>
                  <div className="text-[#A78BFA]">TXN_90815,USR_104,15.20,2024-03-12 14:10:19,REFUND</div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 italic">
                  Problem: Dirty timestamps, null amounts, duplicate retries skewing executive numbers.
                </div>
              </div>
            )}

            {activeStage === 'sql' && (
              <div className="space-y-2">
                <div className="text-slate-400 text-[11px] flex items-center justify-between border-b border-[#263449] pb-2">
                  <span>TRANSFORMATION: sql_cohort_window_model.sql</span>
                  <span className="text-[#38BDF8]">OPTIMIZED CTE</span>
                </div>
                <pre className="text-[#38BDF8] text-[11px] leading-relaxed">
{`WITH cleaned_txns AS (
  SELECT user_id, amount,
         DATE_TRUNC('month', timestamp) AS txn_month,
         ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY timestamp) AS rk
  FROM raw_transactions
  WHERE status = 'COMPLETED' AND amount IS NOT NULL
),
cohort_base AS (
  SELECT user_id, MIN(txn_month) AS cohort_month
  FROM cleaned_txns GROUP BY user_id
)
SELECT c.cohort_month, t.txn_month,
       COUNT(DISTINCT t.user_id) AS active_retained
FROM cohort_base c
JOIN cleaned_txns t ON c.user_id = t.user_id
GROUP BY 1, 2 ORDER BY 1, 2;`}
                </pre>
              </div>
            )}

            {activeStage === 'python' && (
              <div className="space-y-2">
                <div className="text-slate-400 text-[11px] flex items-center justify-between border-b border-[#263449] pb-2">
                  <span>ANALYTICS: rfm_retention_scoring.py</span>
                  <span className="text-[#A78BFA]">PANDAS / NUMPY</span>
                </div>
                <pre className="text-[#A78BFA] text-[11px] leading-relaxed">
{`import pandas as pd
import numpy as np

# Compute RFM Segmentation Matrix
now = df['timestamp'].max()
rfm = df.groupby('user_id').agg({
    'timestamp': lambda x: (now - x.max()).days, # Recency
    'txn_id': 'count',                           # Frequency
    'amount': 'sum'                              # Monetary
}).rename(columns={'timestamp': 'R', 'txn_id': 'F', 'amount': 'M'})

rfm['R_Score'] = pd.qcut(rfm['R'], 5, labels=[5,4,3,2,1])
rfm['FM_Score'] = pd.qcut(rfm['F'] + rfm['M'], 5, labels=[1,2,3,4,5])
# M0-M5 Retention Decay Analysis
retention_matrix = cohort_pivot.divide(cohort_size, axis=0) * 100`}
                </pre>
              </div>
            )}

            {activeStage === 'bi' && (
              <div className="space-y-3">
                <div className="text-slate-400 text-[11px] flex items-center justify-between border-b border-[#263449] pb-2">
                  <span>OUTPUT: power_bi_executive_telemetry.pbit</span>
                  <span className="text-[#38BDF8]">LIVE DAX MEASURES</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-slate-200">
                  <div className="p-3 rounded-xl bg-[#151F30] border border-[#263449]">
                    <div className="text-[10px] text-slate-400">M1 Retention Rate</div>
                    <div className="text-lg font-bold text-[#34D399]">68.4%</div>
                    <div className="text-[10px] text-slate-400">+4.2% vs prior quarter</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#151F30] border border-[#263449]">
                    <div className="text-[10px] text-slate-400">Churn Velocity</div>
                    <div className="text-lg font-bold text-[#38BDF8]">-12.8%</div>
                    <div className="text-[10px] text-slate-400">Stabilized in M3–M5</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#151F30] border border-[#263449] text-slate-300 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Scheduled automatic refresh every Monday 06:00 AM UTC.</span>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-[#263449] flex items-center justify-between text-[10px] text-slate-400">
              <span>Stack: SQL Windowing • Python Pandas • Power BI DAX</span>
              <span className="text-[#34D399] font-bold">100% Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
