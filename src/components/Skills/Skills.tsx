import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoUniverseCanvas } from './LogoUniverseCanvas';
import { Skills2DFallback } from './Skills2DFallback';
import { SoftSkillsGrid } from './SoftSkillsGrid';
import { TECH_SKILLS, TechSkill, SkillCategory } from '../../data/skills';
import {
  Sparkles,
  Box,
  LayoutGrid,
  X,
  Code2,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { ScrollHeader } from '../UI/ScrollHeader';

const SKILL_TECHNICAL_MATTER: Record<
  string,
  {
    pipelineRole: string;
    codeLanguage: string;
    codeSnippet: string;
    impactKpi: { value: string; label: string; desc: string };
    keyConcepts: string[];
  }
> = {
  sql: {
    pipelineRole:
      'Core relational querying engine used to extract, filter, join, and aggregate transactional datasets from enterprise databases into star schemas.',
    codeLanguage: 'sql',
    codeSnippet: `-- Production Cohort Retention & Churn Window Query
WITH customer_activity AS (
  SELECT 
    customer_id,
    order_date,
    DATE_TRUNC('month', order_date) AS order_month,
    MIN(DATE_TRUNC('month', order_date)) OVER(PARTITION BY customer_id) AS cohort_month
  FROM fact_orders
  WHERE status = 'COMPLETED'
)
SELECT 
  cohort_month,
  ROUND((EXTRACT(YEAR FROM order_month) - EXTRACT(YEAR FROM cohort_month)) * 12 + 
        (EXTRACT(MONTH FROM order_month) - EXTRACT(MONTH FROM cohort_month))) AS month_number,
  COUNT(DISTINCT customer_id) AS active_users
FROM customer_activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
    impactKpi: { value: '5,000+', label: 'Records Queried', desc: 'Optimized CTEs & Window Functions' },
    keyConcepts: [
      'CTEs & Window Functions',
      'Join Optimization',
      'DENSE_RANK()',
      'Aggregate Partitioning',
    ],
  },
  python: {
    pipelineRole:
      'Automated data manipulation, statistical hypothesis testing, and algorithmic anomaly detection across multi-source retail streams.',
    codeLanguage: 'python',
    codeSnippet: `# Statistical Outlier & Retail Margin Anomaly Detector
import pandas as pd
import numpy as np

def detect_margin_anomalies(df: pd.DataFrame) -> pd.DataFrame:
    # Calculate rolling Z-Score on transaction margin rates
    mean_margin = df['margin_pct'].mean()
    std_margin = df['margin_pct'].std()
    
    df['z_score'] = (df['margin_pct'] - mean_margin) / std_margin
    df['is_leakage'] = np.where(df['z_score'] < -2.5, True, False)
    
    # Priority triage for executive alerts
    flagged_orders = df[df['is_leakage']][['order_id', 'store_id', 'margin_pct', 'z_score']]
    return flagged_orders`,
    impactKpi: { value: '99.8%', label: 'Data Accuracy', desc: 'Automated anomaly detection pipeline' },
    keyConcepts: [
      'Pandas Vectorization',
      'Statistical Z-Score',
      'NumPy Arrays',
      'Outlier Imputation',
    ],
  },
  powerbi: {
    pipelineRole:
      'Enterprise interactive decision dashboarding, multi-table star schema modeling, and dynamic DAX business measure formulation.',
    codeLanguage: 'dax',
    codeSnippet: `-- Executive Dynamic YTD Revenue Growth DAX Measure
Revenue_YTD = 
CALCULATE(
    [Total_Net_Revenue],
    DATESYTD('dim_date'[Date])
)

-- Prior Year Variance Comparison
Revenue_YoY_Growth% = 
VAR CurrentYTD = [Revenue_YTD]
VAR PriorYTD = CALCULATE([Revenue_YTD], SAMEPERIODLASTYEAR('dim_date'[Date]))
RETURN
    DIVIDE(CurrentYTD - PriorYTD, PriorYTD, 0)`,
    impactKpi: {
      value: '-15%',
      label: 'Turnaround Time',
      desc: 'Weekly reporting hours reclaimed at Infyntrek',
    },
    keyConcepts: [
      'Star Schema Dimensional Modeling',
      'DAX Time Intelligence',
      'Dynamic Drillthrough',
      'Row-Level Security',
    ],
  },
  excel: {
    pipelineRole:
      'Rapid exploratory data modeling, multi-criteria reconciliation, and executive summary dashboards utilizing advanced lookup functions.',
    codeLanguage: 'excel',
    codeSnippet: `=XLOOKUP(A2, fact_orders[order_id], fact_orders[net_revenue], "NOT FOUND", 0)
=LET(
    cohort_data, FILTER(raw_sales, raw_sales[region] = "South"),
    unique_clients, UNIQUE(CHOOSECOLS(cohort_data, 2)),
    COUNTA(unique_clients)
)`,
    impactKpi: {
      value: '5,000+',
      label: 'Rows Reconciled',
      desc: 'Advanced XLOOKUP & Dynamic Pivot Models',
    },
    keyConcepts: [
      'Dynamic Array Formulas',
      'XLOOKUP / INDEX-MATCH',
      'Nested Pivot Tables',
      'Scenario Modeling',
    ],
  },
  'bi-reporting': {
    pipelineRole:
      'Scheduled telemetry delivery, KPI scorecard generation, and cross-departmental executive communication frameworks.',
    codeLanguage: 'sql',
    codeSnippet: `-- Automated Executive Daily KPI Snapshot
CREATE OR REPLACE VIEW v_executive_daily_scorecard AS
SELECT 
    CURRENT_DATE AS snapshot_date,
    COUNT(DISTINCT customer_id) AS daily_transacting_users,
    SUM(net_revenue) AS daily_revenue,
    AVG(margin_pct) AS daily_blended_margin,
    ROUND(SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) AS checkout_failure_pct
FROM fact_orders
WHERE order_date >= CURRENT_DATE - INTERVAL '1 day';`,
    impactKpi: {
      value: '1-Click',
      label: 'C-Suite Delivery',
      desc: 'Automated executive scorecard refresh',
    },
    keyConcepts: [
      'Automated Refreshes',
      'Telemetry Scorecards',
      'Stakeholder Communication',
      'Error Alert Thresholds',
    ],
  },
  pandas: {
    pipelineRole:
      'High-speed DataFrame manipulation, cohort matrix generation, customer RFM segmentation, and feature engineering.',
    codeLanguage: 'python',
    codeSnippet: `# Automated RFM Customer Segmentation
import pandas as pd

# 1. Aggregate Recency, Frequency, Monetary values
rfm = df.groupby('customer_id').agg({
    'order_date': lambda d: (analysis_date - d.max()).days,
    'order_id': 'count',
    'net_revenue': 'sum'
}).rename(columns={'order_date': 'recency', 'order_id': 'frequency', 'net_revenue': 'monetary'})

# 2. Assign quintile behavioral scores (1-5)
rfm['R_Score'] = pd.qcut(rfm['recency'].rank(method='first'), 5, labels=[5, 4, 3, 2, 1])
rfm['F_Score'] = pd.qcut(rfm['frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5])`,
    impactKpi: {
      value: '14,200+',
      label: 'Rows Transformed',
      desc: 'Vectorized DataFrame aggregation',
    },
    keyConcepts: [
      'pd.qcut RFM Scoring',
      'Multi-Index Pivots',
      'Vectorized Operations',
      'Merge & Concatenation',
    ],
  },
};

export function Skills() {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>(() => {
    if (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('mode') === '3d'
    ) {
      return '3d';
    }
    return '2d';
  });
  const [focusedSkill, setFocusedSkill] = useState<TechSkill | null>(() => {
    if (typeof window !== 'undefined') {
      const inspectParam = new URLSearchParams(window.location.search).get('inspect_skill');
      if (inspectParam) {
        return TECH_SKILLS.find((s) => s.id === inspectParam) || null;
      }
    }
    return null;
  });
  const [hoveredSkill, setHoveredSkill] = useState<TechSkill | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const handleHover = (skill: TechSkill | null, pos: { x: number; y: number } | null) => {
    setHoveredSkill(skill);
    setHoverPos(pos);
  };

  const handleSelectSkill = (skill: TechSkill) => {
    setFocusedSkill(skill);
  };

  const skillMatter = focusedSkill
    ? SKILL_TECHNICAL_MATTER[focusedSkill.id] || {
        pipelineRole: focusedSkill.context,
        codeLanguage: 'sql',
        codeSnippet: `-- Verified Analytics Implementation
-- Tool: ${focusedSkill.name} (${focusedSkill.category})
-- Achievement: ${focusedSkill.resumeBullet}
SELECT * FROM production_analytics 
WHERE skill_verified = TRUE 
  AND proficiency_index >= 90;`,
        impactKpi: {
          value: 'Production',
          label: 'Skill Proficiency',
          desc: focusedSkill.resumeBullet,
        },
        keyConcepts: [
          focusedSkill.category,
          'Data Integrity',
          'Pipeline Integration',
          'Business Impact',
        ],
      }
    : null;

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#263449]/70 space-y-12"
    >
      {/* Section Header with 2D / 3D Toggle */}
      <ScrollHeader
        badge="02 // Analytical Architecture"
        title="Core Stack & Analytics"
        subtitle="Data transformations, statistical models, and automated business dashboards built with SQL, Python, and Power BI."
        action={
          <button
            onClick={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
            data-cursor="Toggle View"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-sans text-xs font-semibold text-[#38BDF8] bg-[#151F30] hover:bg-[#1A2238] border border-[#263449] hover:border-[#38BDF8]/50 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            {viewMode === '2d' ? (
              <>
                <Box className="w-4 h-4 text-[#38BDF8]" />
                <span>Switch to 3D View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-4 h-4 text-[#38BDF8]" />
                <span>Switch to 2D Grid</span>
              </>
            )}
          </button>
        }
      />

      {/* Main Skills Content */}
      <div className="relative">
        {viewMode === '2d' ? (
          <Skills2DFallback
            onSelectSkill={handleSelectSkill}
            focusedSkill={focusedSkill}
          />
        ) : (
          <div className="space-y-4">
            <div className="text-center font-mono text-xs text-[#38BDF8] bg-[#151F30] py-2.5 rounded-xl border border-[#263449] font-semibold">
              Interactive 3D Constellation • Click & Drag to Orbit • Click Any Node to Inspect
            </div>
            <LogoUniverseCanvas
              selectedCategory="All"
              onHoverSkill={handleHover}
              onSelectSkill={handleSelectSkill}
              focusedSkill={focusedSkill}
            />
          </div>
        )}

        {/* Hover Tooltip in 3D Mode */}
        {viewMode === '3d' && hoveredSkill && hoverPos && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-4 px-4 py-3 rounded-2xl bg-[#151F30]/95 border border-[#263449] shadow-2xl backdrop-blur-xl max-w-xs transition-opacity duration-150"
            style={{ left: hoverPos.x, top: hoverPos.y - 15 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: hoveredSkill.color }}
              />
              <span className="font-display font-bold text-sm text-white">
                {hoveredSkill.name}
              </span>
              <span className="font-mono text-[9px] text-[#38BDF8] px-2 py-0.5 rounded-full bg-[#0B1220] border border-[#263449] ml-auto font-bold">
                {hoveredSkill.category}
              </span>
            </div>
            <p className="font-mono text-xs text-slate-300 leading-snug">
              {hoveredSkill.context}
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* Enriched Technical Inspection Modal for Skills             */}
        {/* ========================================================= */}
        <AnimatePresence>
          {focusedSkill && skillMatter && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFocusedSkill(null)}
                className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative max-w-2xl w-full bg-[#151F30] rounded-3xl border border-[#263449] p-4 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] space-y-6 z-10 my-4 sm:my-6 max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-[#263449] pb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 shadow-sm border border-[#263449] shrink-0 bg-[#0B1220]"
                      style={{
                        boxShadow: `0 0 20px ${focusedSkill.color}35`,
                        borderColor: `${focusedSkill.color}60`,
                      }}
                    >
                      <img
                        src={focusedSkill.logoUrl}
                        alt={focusedSkill.name}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-2xl text-white">
                          {focusedSkill.name}
                        </h3>
                        <span
                          className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border font-bold"
                          style={{
                            borderColor: `${focusedSkill.color}60`,
                            backgroundColor: `${focusedSkill.color}20`,
                            color: focusedSkill.color,
                          }}
                        >
                          {focusedSkill.category}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-[#38BDF8] mt-0.5">
                        Technical Inspection & Methodology
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setFocusedSkill(null)}
                    data-cursor="Close"
                    className="p-2 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Key Metric Highlight */}
                <div className="p-4 rounded-2xl bg-[#0B1220] border border-[#263449] flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-slate-400">
                      {skillMatter.impactKpi.label}
                    </div>
                    <div
                      className="font-display font-black text-2xl mt-0.5"
                      style={{ color: focusedSkill.color }}
                    >
                      {skillMatter.impactKpi.value}
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-300 max-w-xs">
                    {skillMatter.impactKpi.desc}
                  </div>
                </div>

                {/* Architecture & Pipeline Role */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#38BDF8]" />
                    <span>Pipeline Architecture Role</span>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B1220] p-3.5 rounded-2xl border border-[#263449]">
                    {skillMatter.pipelineRole}
                  </p>
                </div>

                {/* Production Code Snippet */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#A78BFA]" />
                    <span>Production Syntax / Implementation Logic</span>
                  </h4>
                  <div className="rounded-2xl p-4 bg-[#0B1220] border border-[#263449] font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed shadow-inner">
                    <pre>{skillMatter.codeSnippet}</pre>
                  </div>
                </div>

                {/* Key Concepts Chips */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                    Core Technical Mechanics:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillMatter.keyConcepts.map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0B1220] border border-[#263449] text-slate-200"
                      >
                        ✓ {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Close */}
                <div className="pt-4 border-t border-[#263449] flex justify-end">
                  <button
                    onClick={() => setFocusedSkill(null)}
                    className="px-5 py-2 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] text-white text-xs font-semibold font-sans transition-colors cursor-pointer"
                  >
                    Close Inspection
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Strategic & Soft Skills */}
      <SoftSkillsGrid />
    </section>
  );
}
