import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database,
  BarChart3,
  LayoutDashboard,
  Lightbulb,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  X,
  Code2,
  Layers,
  TrendingUp,
  Cpu,
  FileCode,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDetail {
  id: string;
  category: 'technical' | 'business';
  categoryLabel: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tools: string[];
  kpi: string;
  kpiStat?: string;
  accentColor: string;
  // Deep Matter for Inspect Modal
  overview: string;
  architectureSteps: string[];
  codeLanguage: string;
  codeSnippet: string;
  impactMetrics: { label: string; value: string; desc: string }[];
  caseScenario: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: 'cleaning',
    category: 'technical',
    categoryLabel: 'Technical Pipeline',
    icon: <Database className="w-6 h-6 text-[#38BDF8]" />,
    title: 'Data Cleaning & Preprocessing',
    subtitle: 'From messy rows to pristine analytical tables',
    description:
      'Eliminate null values, duplicate records, and schema inconsistencies. Design automated SQL and Python ETL scripts that prepare high-integrity datasets for downstream business intelligence.',
    deliverables: [
      'Automated Outlier & Anomaly Detection',
      'Schema Normalization & Type Casting',
      'Missing Value Imputation Strategies',
      'Robust SQL Stored Procedures',
    ],
    tools: ['SQL (PostgreSQL)', 'Python', 'Pandas', 'NumPy'],
    kpi: 'Data Accuracy',
    kpiStat: '99.8%',
    accentColor: '#38BDF8',
    overview:
      'Raw multi-source data regularly suffers from corrupted timestamps, negative prices, duplicate transactional UUIDs, and missing foreign keys. This pipeline automatically validates schema boundaries, imputes missing categorical/numerical values, and produces an idempotent clean data mart.',
    architectureSteps: [
      'Ingestion & Validation: Auto-detect schema discrepancies across CSV, Excel, and SQL databases.',
      'Deduplication & Sanitization: Hash customer IDs and deduplicate multi-entry orders using window functions.',
      'Statistical Outlier Detection: Calculate Z-score (|z| > 2.5) and IQR bounds to identify corrupted margin rows.',
      'Relational Star-Schema Normalization: Construct clean fact_orders and dim_customers dimensional tables.',
    ],
    codeLanguage: 'python',
    codeSnippet: `# Production Automated Cleaning Pipeline (Pandas & SQL)
import pandas as pd
import numpy as np

def clean_retail_transactions(df: pd.DataFrame) -> pd.DataFrame:
    # 1. Deduplicate based on order_id and timestamp
    df = df.drop_duplicates(subset=['order_id', 'transaction_time'])
    
    # 2. Impute missing customer IDs using session heuristics
    df['customer_id'] = df['customer_id'].fillna('GUEST_' + df['session_id'].astype(str))
    
    # 3. Handle anomalies: clamp negative quantities and calculate net revenue
    df = df[df['quantity'] > 0]
    df['net_revenue'] = (df['quantity'] * df['unit_price']) * (1 - df['discount_rate'].fillna(0))
    
    # 4. Outlier detection using Z-score on margins
    z_scores = (df['margin_rate'] - df['margin_rate'].mean()) / df['margin_rate'].std()
    df['is_margin_anomaly'] = np.abs(z_scores) > 2.5
    
    return df`,
    impactMetrics: [
      { label: 'Data Accuracy', value: '99.8%', desc: 'Verified constraint integrity' },
      { label: 'Ingestion Speed', value: '12,400+', desc: 'Rows normalized per second' },
      { label: 'Manual Errors', value: '0%', desc: 'Automated script verification' },
    ],
    caseScenario:
      'Retail transaction dataset with 14,200+ unverified rows across 8 stores. Cleaned duplicate orders, fixed corrupted discount rates, and recovered 8.4% gross margin visibility for executive management.',
  },
  {
    id: 'visualization',
    category: 'technical',
    categoryLabel: 'Technical Pipeline',
    icon: <BarChart3 className="w-6 h-6 text-[#38BDF8]" />,
    title: 'Exploratory Data Analysis (EDA)',
    subtitle: 'Uncovering trends, correlations & outliers',
    description:
      'Perform deep statistical analysis to uncover underlying patterns, customer behavior anomalies, and operational bottlenecks that standard top-line reports miss.',
    deliverables: [
      'Cohort & Customer Retention Curves',
      'RFM Behavioral Customer Segmentation',
      'Correlation Matrices & Trend Projections',
      'Statistical Hypothesis Testing',
    ],
    tools: ['Python', 'Seaborn', 'Matplotlib', 'Jupyter'],
    kpi: 'Records Analyzed',
    kpiStat: '2,400+',
    accentColor: '#38BDF8',
    overview:
      'Exploratory Data Analysis transforms flat tables into behavioral intelligence. By computing cohort retention decay rates across customer tenure and mapping customers into RFM segments, businesses can predict churn months before revenue drops.',
    architectureSteps: [
      'Cohort Month Indexing: Group customers by their initial acquisition month (Cohort M0).',
      'Decay Curve Modeling: Track retention percentage across M1 through M5 to identify early drop-off.',
      'RFM Quantile Scoring: Score Recency, Frequency, and Monetary values into 4 tiered quartiles.',
      'Persona Mapping: Classify users into Champions, Loyal Customers, At-Risk, and Churned cohorts.',
    ],
    codeLanguage: 'python',
    codeSnippet: `# RFM Behavioral Customer Segmentation & Cohort Matrix
import pandas as pd

def compute_rfm_segments(transactions: pd.DataFrame, snapshot_date) -> pd.DataFrame:
    rfm = transactions.groupby('customer_id').agg({
        'order_date': lambda d: (snapshot_date - d.max()).days,
        'order_id': 'count',
        'net_revenue': 'sum'
    }).rename(columns={'order_date': 'Recency', 'order_id': 'Frequency', 'net_revenue': 'Monetary'})
    
    # Quantile ranking (1 to 4)
    rfm['R_Score'] = pd.qcut(rfm['Recency'], 4, labels=[4, 3, 2, 1])
    rfm['F_Score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4])
    rfm['M_Score'] = pd.qcut(rfm['Monetary'], 4, labels=[1, 2, 3, 4])
    
    rfm['RFM_Group'] = rfm['R_Score'].astype(str) + rfm['F_Score'].astype(str) + rfm['M_Score'].astype(str)
    return rfm`,
    impactMetrics: [
      { label: 'Cohort Retention', value: '+24.6%', desc: 'Retention visibility across M0-M5' },
      { label: 'Customer Records', value: '2,400+', desc: 'Segmented into RFM quadrants' },
      { label: 'Churn Warning', value: '17 Days', desc: 'Average early detection window' },
    ],
    caseScenario:
      'Discovered that 68% of churn occurred between Month 1 and Month 2. Created an automated reactivation strategy targeting the high-monetary RFM quadrant, preserving high-value customer LTV.',
  },
  {
    id: 'dashboards',
    category: 'business',
    categoryLabel: 'Business Impact',
    icon: <LayoutDashboard className="w-6 h-6 text-[#A78BFA]" />,
    title: 'Executive Dashboard Building',
    subtitle: 'Real-time telemetry for executive stakeholders',
    description:
      'Construct interactive Power BI and Excel dashboards with drill-through hierarchies, dynamic DAX measures, and instant executive KPI visibility.',
    deliverables: [
      'Cross-Filtered Visual Reports',
      'Custom DAX Measures & Time Intelligence',
      'Automated Data Model Relationships',
      'Executive-Level KPI Summary Tiles',
    ],
    tools: ['Power BI', 'DAX', 'Excel Advanced', 'Power Query'],
    kpi: 'Reporting Turnaround',
    kpiStat: '-15%',
    accentColor: '#A78BFA',
    overview:
      'Executive dashboards replace tedious spreadsheet preparation with live, interactive decision telemetry. Built on clean star schemas with bidirectional filters and custom DAX measures, executives can drill down from national totals to store-level transactions in one click.',
    architectureSteps: [
      'Data Modeling: Link fact_transactions with dim_calendar, dim_store, and dim_product.',
      'DAX Business Logic: Write time-intelligence measures for Month-over-Month and Year-over-Year growth.',
      'Visual Hierarchy: Structure top-line KPI tiles, cohort heatmaps, and SKU margin scatterplots.',
      'Performance Optimization: Optimize DAX formulas to achieve sub-second cross-filtering response.',
    ],
    codeLanguage: 'dax',
    codeSnippet: `-- Power BI DAX: Dynamic Revenue & Month-over-Month Growth Measure
Revenue_MoM_Growth% = 
VAR CurrentMonthRev = [Total_Net_Revenue]
VAR PriorMonthRev = 
    CALCULATE(
        [Total_Net_Revenue],
        DATEADD('dim_calendar'[Date], -1, MONTH)
    )
RETURN
    IF(
        ISBLANK(PriorMonthRev),
        BLANK(),
        DIVIDE(CurrentMonthRev - PriorMonthRev, PriorMonthRev)
    )

-- Dynamic Customer Retention Rate Measure
Retention_Rate% = 
VAR ActiveCohortUsers = DISTINCTCOUNT('fact_orders'[customer_id])
VAR StartingCohortUsers = [Cohort_Initial_Users]
RETURN
    DIVIDE(ActiveCohortUsers, StartingCohortUsers, 0)`,
    impactMetrics: [
      { label: 'Turnaround Time', value: '-15%', desc: 'Weekly reporting hours reclaimed' },
      { label: 'Render Latency', value: '<0.8s', desc: 'Fast DAX measure execution' },
      { label: 'Interactive KPIs', value: '18+', desc: 'Dynamic drill-through metrics' },
    ],
    caseScenario:
      'Engineered an enterprise Power BI dashboard monitoring Rs. 4.2M+ in retail sales. Replaced manual Monday morning Excel reports, allowing C-suite leadership to review store health instantly.',
  },
  {
    id: 'insights',
    category: 'business',
    categoryLabel: 'Business Impact',
    icon: <Lightbulb className="w-6 h-6 text-[#A78BFA]" />,
    title: 'Actionable Business Insights',
    subtitle: 'Translating figures into profitable decisions',
    description:
      'Bridge the gap between raw data tables and boardroom strategy. Deliver structured slide decks, metric walk-throughs, and prioritized operational recommendations.',
    deliverables: [
      'Executive Summary Presentations',
      'Churn Prevention Recommendations',
      'Revenue Optimization Roadmaps',
      'Strategic ROI & Margin Impact Analysis',
    ],
    tools: ['PowerPoint', 'Excel Modeling', 'Business Strategy'],
    kpi: 'Boardroom Decisions',
    kpiStat: 'Strategic',
    accentColor: '#A78BFA',
    overview:
      'Analytics without actionable recommendations is just noise. This service synthesizes statistical findings into prioritized strategic initiatives: dynamic pricing adjustments, inventory rebalancing, and customer lifecycle interventions.',
    architectureSteps: [
      'Root-Cause Diagnosis: Trace margin leaks to specific store outlets or promotional discount abuse.',
      'Scenario Simulation: Model the business impact of capping discounts at 18% versus 25%.',
      'Boardroom Presentation: Synthesize findings into clear executive slide decks with zero jargon.',
      'Operational Roadmap: Provide department heads with immediate, medium-term, and quarterly milestones.',
    ],
    codeLanguage: 'text',
    codeSnippet: `Executive Strategic Recommendation Framework:
1. Promotional Bleed Cap:
   - Observation: 3 SKU categories show negative margin during flash sales.
   - Action: Cap maximum discount at 18% on low-margin goods.
   - Projected Benefit: +Rs. 180,000 gross margin recovered quarterly.

2. At-Risk Cohort Reactivation:
   - Observation: 42% of first-time buyers do not place a 2nd order within 45 days.
   - Action: Trigger targeted SMS discount on day 28 for RFM Group 411.
   - Projected Benefit: +12% increase in 60-day repeat customer rate.`,
    impactMetrics: [
      { label: 'Decision Speed', value: '1-Click', desc: 'Instant executive visibility' },
      { label: 'Margin Recovery', value: '+4.1%', desc: 'Identified promotional leakages' },
      { label: 'Executive Trust', value: '100%', desc: 'Data-backed boardroom alignment' },
    ],
    caseScenario:
      'Delivered strategic presentation identifying discount cannibalization across seasonal inventory. Implemented discount throttling that preserved gross margins without reducing overall sales volume.',
  },
];

export function WhatIDo() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(() => {
    if (typeof window !== 'undefined') {
      const inspectParam = new URLSearchParams(window.location.search).get('inspect');
      if (inspectParam) {
        return SERVICES.find((s) => s.id === inspectParam) || null;
      }
    }
    return null;
  });
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Scroll Reveal with GSAP (Smooth without locking scroll)
  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.service-card-3d');

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            rotationX: 8,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20"
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#38BDF8]/05 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151F30] border border-[#263449] text-[#38BDF8] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>CORE ANALYTICAL CAPABILITIES</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          What I Do & Deliver
        </h2>

        <p className="text-slate-300 text-sm sm:text-lg font-sans leading-relaxed">
          End-to-end data analytics pipeline execution — from raw multi-table extraction to automated
          executive intelligence and strategic ROI.
        </p>
      </div>

      {/* Responsive 4-Card Grid with GSAP Entrance + Framer Motion Hover */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 perspective-[1200px]"
      >
        {SERVICES.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => setSelectedService(item)}
            data-cursor="Inspect Methodology"
            whileHover={{ y: -4, borderColor: item.accentColor }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="service-card-3d relative rounded-3xl p-5 sm:p-8 bg-[#151F30] border border-[#263449] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between cursor-pointer group"
          >
            {/* Card Content Top */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0B1220] border border-[#263449] flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-semibold border"
                    style={{
                      color: item.accentColor,
                      backgroundColor: `${item.accentColor}12`,
                      borderColor: `${item.accentColor}30`,
                    }}
                  >
                    {item.categoryLabel}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-[#0B1220] border border-[#263449] text-slate-300 font-semibold">
                    {item.kpiStat && (
                      <span
                        className="font-bold mr-1.5"
                        style={{
                          color: item.kpiStat.includes('%') ? '#34D399' : item.accentColor,
                        }}
                      >
                        {item.kpiStat}
                      </span>
                    )}
                    {item.kpi}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono mt-1" style={{ color: item.accentColor }}>
                  {item.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                {item.description}
              </p>

              {/* Deliverables Bullet List */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  Key Deliverables:
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {item.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs font-sans text-slate-300"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: item.accentColor }}
                      />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Tools Badges & Inspect Button */}
            <div className="pt-6 mt-6 border-t border-[#263449] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[#0B1220] text-slate-300 border border-[#263449]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Interactive Inspect Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(item);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all hover:opacity-90"
                style={{
                  color: item.accentColor,
                  backgroundColor: `${item.accentColor}15`,
                  borderColor: `${item.accentColor}40`,
                }}
              >
                <span>Inspect</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* Comprehensive Inspect Modal with Deep Matter               */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-[#060B14]/80 backdrop-blur-md"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative max-w-3xl w-full bg-[#151F30] rounded-3xl border border-[#263449] p-4 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6 z-10 my-4 sm:my-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#263449] pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        color: selectedService.accentColor,
                        backgroundColor: `${selectedService.accentColor}15`,
                        border: `1px solid ${selectedService.accentColor}40`,
                      }}
                    >
                      Technical Methodology & Architecture
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    {selectedService.title}
                  </h2>
                  <p className="font-mono text-xs" style={{ color: selectedService.accentColor }}>
                    {selectedService.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  data-cursor="Close"
                  className="p-2 rounded-xl bg-[#0B1220] hover:bg-[#1E2C44] border border-[#263449] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quantitative Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedService.impactMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0B1220] border border-[#263449] text-left"
                  >
                    <div className="font-mono text-xs text-slate-400">{m.label}</div>
                    <div
                      className="font-mono font-bold text-xl mt-0.5"
                      style={{
                        color: m.value.includes('%') ? '#34D399' : selectedService.accentColor,
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">{m.desc}</div>
                  </div>
                ))}
              </div>

              {/* Architectural Overview */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4" style={{ color: selectedService.accentColor }} />
                  <span>Pipeline Architecture & Methodology</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B1220] p-4 rounded-2xl border border-[#263449]">
                  {selectedService.overview}
                </p>
              </div>

              {/* Step-by-Step Execution Sequence */}
              <div className="space-y-2.5">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4" style={{ color: selectedService.accentColor }} />
                  <span>Engineering Workflow Sequence</span>
                </h3>
                <div className="space-y-2">
                  {selectedService.architectureSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1220] border border-[#263449] text-xs sm:text-sm text-slate-300"
                    >
                      <span
                        className="font-mono font-bold text-xs mt-0.5"
                        style={{ color: selectedService.accentColor }}
                      >
                        0{sIdx + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Code Snippet */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#38BDF8]" />
                  <span>Production Code / Logic Implementation</span>
                </h3>
                <div className="rounded-2xl p-4 bg-[#0B1220] border border-[#263449] font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed shadow-inner">
                  <pre>{selectedService.codeSnippet}</pre>
                </div>
              </div>

              {/* Real-World Case Scenario */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                  <span>Real-World Business Application</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B1220] p-3.5 rounded-2xl border border-[#263449]">
                  {selectedService.caseScenario}
                </p>
              </div>

              {/* Footer Tools Strip */}
              <div className="pt-4 border-t border-[#263449] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-[#0B1220] border border-[#263449] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 rounded-xl bg-[#0B1220] hover:bg-[#1E2C44] border border-[#263449] text-white font-semibold transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
