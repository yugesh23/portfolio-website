import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { ScrollProgressHUD } from './components/UI/ScrollProgressHUD';
import { Global3DBackground } from './components/Background/Global3DBackground';
import { Hero } from './components/Hero/Hero';
import { TechStackStrip } from './components/TechStack/TechStackStrip';
import { WhatIDo } from './components/WhatIDo/WhatIDo';
import { DataStorytelling } from './components/Storytelling/DataStorytelling';
import { AnalyticsShowcase } from './components/Analytics/AnalyticsShowcase';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { ExecutiveSimulator } from './components/Simulator/ExecutiveSimulator';
import { Timeline } from './components/Experience/Timeline';
import { ProjectsGallery } from './components/Projects/ProjectsGallery';
import { Achievements } from './components/Achievements/Achievements';
import { Contact } from './components/Contact/Contact';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  (window as any).ScrollTrigger = ScrollTrigger;
  (window as any).gsap = gsap;
}

export default function App() {
  const [loading, setLoading] = useState(
    typeof window !== 'undefined' ? !window.location.search.includes('no_loader=1') : true
  );

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis();

  const previewSection = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('preview_section')
    : null;

  if (previewSection === 'what-i-do' || previewSection === 'services') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <WhatIDo />
      </div>
    );
  }
  if (previewSection === 'storytelling') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <DataStorytelling />
      </div>
    );
  }
  if (previewSection === 'analytics') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <AnalyticsShowcase />
      </div>
    );
  }
  if (previewSection === 'about') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <About />
      </div>
    );
  }
  if (previewSection === 'skills') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <Skills />
      </div>
    );
  }
  if (previewSection === 'simulator') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <ExecutiveSimulator />
      </div>
    );
  }
  if (previewSection === 'experience') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <Timeline />
      </div>
    );
  }
  if (previewSection === 'projects') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <ProjectsGallery />
      </div>
    );
  }
  if (previewSection === 'achievements') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <Achievements />
      </div>
    );
  }
  if (previewSection === 'contact') {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-100 p-6">
        <Cursor />
        <Contact />
      </div>
    );
  }

  const handleLoaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('section');
    if (target) {
      setTimeout(() => {
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.scrollTo(`#${target}`, { immediate: true });
        } else {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'auto' });
        }
      }, 400);
    }

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 relative selection:bg-sky-500/25 selection:text-[#38BDF8] overflow-x-clip max-w-[100vw]">
      {/* Immersive Disciplined 3D Background */}
      <Global3DBackground />

      {/* Intro Animated Curtain Loader */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Custom Precision Cursor */}
      <Cursor />

      {/* Right-Side Telemetry Scroll HUD (Section Points & Live Scroll %) */}
      <ScrollProgressHUD />

      {/* Main Section Architecture */}
      <main className="relative z-10 block">
        {/* Section 01: Hero with Dedicated Photo Centerpiece (No 3D Model) */}
        <Hero />

        {/* Section 02: Infinite Animated Tech Stack Strip */}
        <TechStackStrip />

        {/* Section 03: What I Do (4 Glass Cards: Cleaning, EDA, Dashboards, Insights) */}
        <WhatIDo />

        {/* Section 04: Storytelling - From Raw Data to Decisions */}
        <DataStorytelling />

        {/* Section 05: Dedicated Analytics Showcase with 3D Charts */}
        <AnalyticsShowcase />

        {/* Section 06: About with Kinetic Narrative & Rollup Counters */}
        <About />

        {/* Section 07: The Logo Universe with 2D Grid & 3D Constellation */}
        <Skills />

        {/* Section 08: Innovative Business ROI & Pipeline Simulator */}
        <ExecutiveSimulator />

        {/* Section 09: Experience & Education Vertical Self-Drawing Timeline */}
        <Timeline />

        {/* Section 10: Selected Projects Gallery & Case Studies */}
        <ProjectsGallery />

        {/* Section 11: Recognitions & Peer-Reviewed Publications */}
        <Achievements />

        {/* Section 12: Contact Suite, Marquee & Footer */}
        <Contact />
      </main>
    </div>
  );
}
