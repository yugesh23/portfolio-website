import React from 'react';
import { motion } from 'framer-motion';
import { SOFT_AND_BUSINESS_SKILLS } from '../../data/skills';
import { CheckCircle2 } from 'lucide-react';

const TYPE_BADGES: Record<string, { label: string; color: string; border: string }> = {
  Business: {
    label: 'Business Analytics',
    color: 'text-[#A78BFA] bg-[#0B1220]',
    border: 'border-[#263449]',
  },
  Soft: {
    label: 'Execution & Leadership',
    color: 'text-[#A78BFA] bg-[#0B1220]',
    border: 'border-[#263449]',
  },
  Data: {
    label: 'Applied AI & Automation',
    color: 'text-[#38BDF8] bg-[#0B1220]',
    border: 'border-[#263449]',
  },
};

export function SoftSkillsGrid() {
  return (
    <div className="space-y-6 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#263449] pb-4">
        <div>
          <span className="font-mono text-xs text-[#38BDF8] font-semibold uppercase tracking-wider block mb-1">
            Executive Competencies
          </span>
          <h3 className="text-2xl font-display font-bold text-white">
            Business, Strategic & Analytical Methodologies
          </h3>
        </div>
        <p className="font-mono text-xs text-slate-400">
          Stakeholder Alignment • Empirical Decision Frameworks
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOFT_AND_BUSINESS_SKILLS.map((skill, index) => {
          const badge = TYPE_BADGES[skill.type] || TYPE_BADGES.Business;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              data-cursor="Competency"
              className="bg-[#151F30] p-5 rounded-2xl border border-[#263449] shadow-sm hover:border-[#38BDF8]/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${badge.border} ${badge.color} font-bold`}>
                    {badge.label}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-display font-bold text-base text-white group-hover:text-[#38BDF8] transition-colors pt-1">
                  {skill.name}
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
