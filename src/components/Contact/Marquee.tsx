import React from 'react';
import { TECH_SKILLS, SOFT_AND_BUSINESS_SKILLS } from '../../data/skills';

export function Marquee() {
  const items = [
    ...TECH_SKILLS.map((s) => s.name),
    ...SOFT_AND_BUSINESS_SKILLS.map((s) => s.name),
    'Data-Driven Decision Making',
    'Z-Score Anomaly Detection',
    'RFM Customer Segmentation',
    'Cohort Retention Modeling',
    'Power BI Automation',
    'ETL Data Warehousing',
  ];

  return (
    <div className="w-full overflow-hidden py-5 border-y border-[#263449]/70 bg-[#0B1220] relative select-none">
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-400 hover:text-[#38BDF8] font-semibold transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/60 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
