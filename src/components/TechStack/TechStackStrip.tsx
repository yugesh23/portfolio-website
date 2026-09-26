import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileSpreadsheet, BarChart2, Cpu, GitBranch, Layers, Workflow, LineChart, Code2 } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  color: string;
  icon: string;
  tag: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'SQL', category: 'Query Engine', color: '#38BDF8', icon: 'sql', tag: 'CTEs & Window Functions' },
  { name: 'Python', category: 'Data Analysis', color: '#38BDF8', icon: 'python', tag: 'Automation & Analysis' },
  { name: 'Power BI', category: 'Executive Dashboards', color: '#A78BFA', icon: 'powerbi', tag: 'DAX & Data Modeling' },
  { name: 'Excel Advanced', category: 'Business Modeling', color: '#A78BFA', icon: 'excel', tag: 'VLOOKUP, Pivot & Macros' },
  { name: 'Pandas', category: 'Data Wrangling', color: '#38BDF8', icon: 'pandas', tag: 'DataFrame Transformations' },
  { name: 'NumPy', category: 'Numerical Computing', color: '#38BDF8', icon: 'numpy', tag: 'Matrix & Vector Arrays' },
  { name: 'Scikit-learn', category: 'Predictive Modeling', color: '#A78BFA', icon: 'scikit', tag: 'Clustering & Regression' },
  { name: 'PostgreSQL', category: 'Relational DB', color: '#38BDF8', icon: 'postgres', tag: 'Schema & Joins' },
  { name: 'MySQL', category: 'Transactional DB', color: '#38BDF8', icon: 'mysql', tag: 'Query Optimization' },
  { name: 'Git & GitHub', category: 'Version Control', color: '#38BDF8', icon: 'git', tag: 'CI/CD & Analytics Repos' },
  { name: 'Matplotlib & Seaborn', category: 'Data Visualization', color: '#38BDF8', icon: 'charts', tag: 'Statistical Plots' },
  { name: 'ETL Pipelines', category: 'Data Engineering', color: '#A78BFA', icon: 'etl', tag: 'Cleaning & Normalization' },
];

export function TechStackStrip() {
  // Duplicate for seamless loop
  const duplicatedItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="relative w-full py-8 overflow-hidden overflow-x-clip max-w-full bg-[#0B1220] border-y border-[#263449]">
      {/* Edge Gradient Mask for Smooth Infinite Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#0B1220] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#0B1220] to-transparent z-20 pointer-events-none" />

      {/* Marquee Track with Framer Motion infinite linear scroll */}
      <motion.div
        className="flex items-center gap-5 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 32,
        }}
      >
        {duplicatedItems.map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-3.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#151F30] border border-[#263449] hover:border-[#38BDF8]/50 hover:bg-[#1A263A] transition-all duration-200 shadow-md group cursor-default select-none"
          >
            {/* Glow Dot / Icon Pod */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner"
              style={{
                backgroundColor: `${tech.color}15`,
                color: tech.color,
                border: `1px solid ${tech.color}35`,
              }}
            >
              {tech.name === 'SQL' && <Database className="w-4 h-4" />}
              {tech.name === 'Python' && <Code2 className="w-4 h-4" />}
              {tech.name === 'Power BI' && <BarChart2 className="w-4 h-4" />}
              {tech.name === 'Excel Advanced' && <FileSpreadsheet className="w-4 h-4" />}
              {tech.name === 'Pandas' && <Layers className="w-4 h-4" />}
              {tech.name === 'NumPy' && <Cpu className="w-4 h-4" />}
              {tech.name === 'Scikit-learn' && <Workflow className="w-4 h-4" />}
              {tech.name === 'PostgreSQL' && <Database className="w-4 h-4" />}
              {tech.name === 'MySQL' && <Database className="w-4 h-4" />}
              {tech.name === 'Git & GitHub' && <GitBranch className="w-4 h-4" />}
              {tech.name === 'Matplotlib & Seaborn' && <LineChart className="w-4 h-4" />}
              {tech.name === 'ETL Pipelines' && <Workflow className="w-4 h-4" />}
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white group-hover:text-[#38BDF8] transition-colors">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0B1220] text-slate-400 border border-[#263449]">
                  {tech.category}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
                {tech.tag}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
