import React, { useState, useRef } from 'react';
import { ProjectData } from '../../data/projects';
import { VyaptiqChart } from './VyaptiqChart';
import { RetentionChart } from './RetentionChart';
import {
  ArrowUpRight,
  AlertCircle,
  Database,
  Cpu,
  TrendingUp,
  ExternalLink,
  Code2,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal: (project: ProjectData) => void;
  className?: string;
}

export function ProjectCard({ project, onOpenModal, className }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 4;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleViewCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewDashboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenModal(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(project)}
      data-cursor="Inspect Case Study"
      className={`w-full cursor-pointer perspective-[1200px] transition-transform duration-300 hover:scale-[1.012] flex flex-col ${className || ''}`}
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.16s ease-out',
        }}
        className="relative h-full bg-[#151F30] rounded-3xl p-6 sm:p-8 border border-[#263449] hover:border-[#38BDF8]/50 transition-all duration-300 shadow-xl group overflow-hidden flex flex-col justify-between space-y-6"
      >
        {/* Dynamic Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, ${glarePos.opacity}), transparent 60%)`,
          }}
        />

        {/* Card Header */}
        <div className="space-y-2.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider bg-[#0B1220] px-3 py-1 rounded-full border border-[#263449] font-semibold">
              {project.year} // Case Study
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>Production Validated</span>
            </div>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#38BDF8] transition-colors">
            {project.title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Structured Case Study Grid: Problem, Dataset, Approach, Outcome */}
        <div className="grid grid-cols-1 gap-3 relative z-10 font-sans text-xs">
          {/* Problem */}
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#263449] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono font-bold text-[11px] uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Problem</span>
            </div>
            <p className="text-slate-300 leading-relaxed line-clamp-2">
              {project.problem}
            </p>
          </div>

          {/* Dataset */}
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#263449] space-y-1">
            <div className="flex items-center gap-1.5 text-[#38BDF8] font-mono font-bold text-[11px] uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Dataset</span>
            </div>
            <p className="text-slate-300 leading-relaxed line-clamp-2 font-mono text-[11px]">
              {project.dataset}
            </p>
          </div>

          {/* Approach */}
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#263449] space-y-1">
            <div className="flex items-center gap-1.5 text-[#A78BFA] font-mono font-bold text-[11px] uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Approach</span>
            </div>
            <ul className="text-slate-300 space-y-1 pl-3.5 list-disc marker:text-[#A78BFA]">
              {project.approach.slice(0, 2).map((item, i) => (
                <li key={i} className="line-clamp-1">{item}</li>
              ))}
            </ul>
          </div>

          {/* Outcome / Impact */}
          <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#263449] space-y-1">
            <div className="flex items-center gap-1.5 text-[#34D399] font-mono font-bold text-[11px] uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Outcome</span>
            </div>
            <ul className="text-slate-300 space-y-1 pl-3.5 list-disc marker:text-[#34D399]">
              {project.outcomes.slice(0, 2).map((item, i) => (
                <li key={i} className="line-clamp-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live Recharts Preview */}
        <div className="relative z-10 py-1 rounded-2xl bg-[#0B1220] border border-[#263449] p-2">
          {project.chartType === 'retail-anomalies' ? (
            <VyaptiqChart data={project.chartData} />
          ) : (
            <RetentionChart data={project.chartData} />
          )}
        </div>

        {/* Tools Used (Tech Stack Badges) */}
        <div className="space-y-2 relative z-10">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Tools & Methodologies:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#0B1220] border border-[#263449] text-slate-300 font-medium group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Functional Action Buttons: View Dashboard & View Code */}
        <div className="pt-4 border-t border-[#263449] flex items-center justify-between gap-3 relative z-10">
          <button
            onClick={handleViewDashboard}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#38BDF8]/20 to-[#A78BFA]/20 hover:from-[#38BDF8]/30 hover:to-[#A78BFA]/30 border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] hover:text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>View Dashboard</span>
          </button>

          <button
            onClick={handleViewCode}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] text-slate-200 hover:text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Code2 className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>View Code</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
