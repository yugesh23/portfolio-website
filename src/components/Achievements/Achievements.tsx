import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralDataSphere } from './NeuralDataSphere';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';
import { Presentation, Layers, BarChart3, BookOpen, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { ScrollHeader } from '../UI/ScrollHeader';

gsap.registerPlugin(ScrollTrigger);

export function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement>(ACHIEVEMENTS[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    const ctx = gsap.context(() => {
      // 3D Sphere card entrance
      if (sphereRef.current) {
        gsap.fromTo(
          sphereRef.current,
          { opacity: 0, x: -40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sphereRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Achievement cards staggered entrance
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.achievement-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, rotationX: 8, transformPerspective: 1000, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'presentation':
        return <Presentation className="w-5 h-5 text-[#38BDF8]" />;
      case 'design':
        return <Layers className="w-5 h-5 text-[#A78BFA]" />;
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-[#38BDF8]" />;
      case 'research':
        return <BookOpen className="w-5 h-5 text-[#A78BFA]" />;
      default:
        return <Award className="w-5 h-5 text-[#38BDF8]" />;
    }
  };

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#263449]/70 space-y-16"
    >
      {/* Section Header */}
      <ScrollHeader
        badge="06 // Honors & Peer Recognition"
        title="Recognitions & Publications"
        tagline="Peer-Reviewed Academic Paper • Competitive Analytics Honors"
      />

      {/* Main Grid: 3D Neural Data Sphere + Minimal Cards */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 3D Neural Data Sphere */}
        <div
          ref={sphereRef}
          className="lg:col-span-4 h-[320px] sm:h-[400px] rounded-3xl bg-[#151F30] border border-[#263449] shadow-xl relative overflow-hidden flex flex-col justify-between p-6"
        >
          <div className="flex items-center justify-between z-10">
            <span className="font-mono text-xs text-[#38BDF8] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Neural Data Graph</span>
            </span>
            <span className="font-mono text-[10px] text-[#38BDF8] bg-[#0B1220] px-2.5 py-1 rounded-full border border-[#263449] font-semibold">
              Interactive 3D
            </span>
          </div>

          <div className="absolute inset-0">
            {isIntersecting && (
              <Canvas
                camera={{ position: [0, 0, 3.4], fov: 42 }}
                dpr={[1, 1.35]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFFFF" />
                <pointLight position={[-3, -2, 2]} intensity={2.5} color="#38BDF8" />
                <pointLight position={[3, -2, 2]} intensity={2.5} color="#A78BFA" />
                <Float speed={2.0} rotationIntensity={0.5} floatIntensity={0.4}>
                  <Suspense fallback={null}>
                    <NeuralDataSphere />
                  </Suspense>
                </Float>
              </Canvas>
            )}
          </div>

          <div className="z-10 bg-[#0B1220] p-3 rounded-2xl border border-[#263449] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-medium">Selected Honor</span>
              <span className="text-[#38BDF8] font-bold">{selectedAchievement.year}</span>
            </div>
            <p className="font-display font-bold text-sm text-white truncate">
              {selectedAchievement.title}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Minimal Cards */}
        <div ref={cardsGridRef} className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((item) => {
            const isSelected = selectedAchievement.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedAchievement(item)}
                data-cursor="Inspect Honor"
                className={`achievement-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-[#151F30] border-[#38BDF8] ring-1 ring-[#38BDF8]/30 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-[#151F30] border-[#263449] hover:border-[#38BDF8]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#0B1220] border border-[#263449] group-hover:scale-105 transition-transform">
                      {getIcon(item.iconType)}
                    </div>
                    <span className="font-mono text-xs text-[#38BDF8] font-semibold bg-[#0B1220] px-2.5 py-0.5 rounded-full border border-[#263449]">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#38BDF8] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#263449] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{item.organization}</span>
                  <span className="text-[#34D399] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
