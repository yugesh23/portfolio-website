import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectData } from '../../data/projects';
import { X, ExternalLink, Github, CheckCircle2, Lightbulb, TrendingUp, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative max-w-3xl w-full bg-[#151F30] rounded-3xl border border-[#263449] p-4 sm:p-10 shadow-2xl space-y-6 sm:space-y-8 z-10 my-4 sm:my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#263449] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider font-semibold">
                  Case Study // {project.year}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                {project.title}
              </h2>
              <p className="font-mono text-xs sm:text-sm text-slate-400">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              data-cursor="Close"
              className="p-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0B1220] border border-[#263449]">
                <div className="font-mono text-[10px] text-slate-400 font-medium">{m.label}</div>
                <div className="font-display font-bold text-base text-[#34D399] mt-0.5">{m.value}</div>
                {m.delta && <div className="font-mono text-[9px] text-[#34D399] font-semibold">{m.delta}</div>}
              </div>
            ))}
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              The Business Problem
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed bg-[#0B1220] p-4 rounded-xl border border-[#263449]">
              {project.problem}
            </p>
          </div>

          {/* Analytical Approach */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#38BDF8]" />
              Technical & Analytical Approach
            </h3>
            <div className="space-y-2">
              {project.approach.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measurable Outcomes */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#34D399]" />
              Measurable Business Outcomes
            </h3>
            <div className="space-y-2">
              {project.outcomes.map((out, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] flex-shrink-0 mt-1.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations (if available) */}
          {project.recommendations && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
                Strategic Business Recommendations
              </h3>
              <div className="space-y-2">
                {project.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0B1220] border border-[#263449] text-xs font-sans text-slate-300">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-slate-400 font-semibold">Engineering & Analytics Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-[#0B1220] border border-[#263449] text-slate-300 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#263449]">
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Demo"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-[#0B1220] bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] hover:opacity-95 hover:scale-105 transition-all shadow-md font-bold"
            >
              <span>Live Interactive Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Code"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-300 bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:text-white hover:scale-105 transition-all"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>Source Repository</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
