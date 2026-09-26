import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, ProjectData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { ArrowRight, GitFork } from 'lucide-react';
import { ScrollHeader } from '../UI/ScrollHeader';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const pipelineBannerRef = useRef<HTMLDivElement>(null);

  const displayedProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.id === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (pipelineBannerRef.current) {
        gsap.fromTo(
          pipelineBannerRef.current,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pipelineBannerRef.current,
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800 space-y-12"
    >
      {/* Section Header */}
      <ScrollHeader
        badge="05 // Flagship Deployments"
        title="Selected Analytics Projects"
        subtitle="End-to-end data products combining automated SQL pipelines, Python statistical modeling, and interactive decision telemetry."
        action={
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#38BDF8]/15 text-[#38BDF8] shadow-sm border border-[#38BDF8]/40'
                  : 'bg-[#151F30] text-slate-400 hover:text-white hover:bg-[#1A2238] border border-[#263449]'
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveFilter(proj.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeFilter === proj.id
                    ? 'bg-[#38BDF8]/15 text-[#38BDF8] shadow-sm border border-[#38BDF8]/40'
                    : 'bg-[#151F30] text-slate-400 hover:text-white hover:bg-[#1A2238] border border-[#263449]'
                }`}
              >
                0{idx + 1} // {proj.title.split(' ')[0]}
              </button>
            ))}
          </div>
        }
      />

      {/* Main Grid: 2-Column Responsive Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={`grid gap-8 items-stretch ${
            activeFilter === 'all'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full flex flex-col"
            >
              <ProjectCard
                project={project}
                onOpenModal={setSelectedProject}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Sleek Next In Pipeline Showcase Banner */}
      <div
        ref={pipelineBannerRef}
        className="rounded-3xl bg-[#151F30] p-6 sm:p-8 border border-[#263449] hover:border-[#38BDF8]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group shadow-xl"
      >
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider font-bold">
              Next In Pipeline // Active Development
            </span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#38BDF8] transition-colors">
            Predictive Demand Forecasting & Automated ATS Resume Screening
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
            Constructing ARIMA & Prophet time-series models for stockout prevention and spaCy NLP semantic parsing for candidate ranking.
          </p>
        </div>

        <a
          href="https://github.com/yugesh-placeholder"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="GitHub"
          className="flex-shrink-0 inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:border-[#38BDF8]/50 text-xs sm:text-sm font-mono text-[#38BDF8] hover:text-white font-semibold transition-all shadow-md group-hover:scale-105 active:scale-95"
        >
          <GitFork className="w-4 h-4 text-[#38BDF8]" />
          <span>Explore All Analytics Repos</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Shared Layout Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
