import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Logo3D } from './Logo3D';
import { TECH_SKILLS, TechSkill, SkillCategory } from '../../data/skills';

interface LogoUniverseCanvasProps {
  selectedCategory?: SkillCategory;
  onHoverSkill: (skill: TechSkill | null, pos: { x: number; y: number } | null) => void;
  onSelectSkill: (skill: TechSkill) => void;
  focusedSkill: TechSkill | null;
}

// 24 skills distributed spaciously across 3 concentric orbital rings
const SKILL_POSITIONS: Record<string, [number, number, number]> = {
  // --- Tier 1: Core Analytics (Front & Center High-Priority Arc) ---
  'sql': [-2.4, 2.2, 2.2],
  'python': [2.4, 2.2, 2.2],
  'powerbi': [-4.4, 0.8, 1.4],
  'excel': [4.4, 0.8, 1.4],
  'bi-reporting': [0.0, 3.4, 1.6],

  // --- Tier 2: Data Science & AI (Mid Front Arc) ---
  'pandas': [-3.2, -0.4, 3.0],
  'numpy': [-1.1, -0.8, 3.2],
  'matplotlib': [1.1, -0.8, 3.2],
  'applied-ai': [3.2, -0.4, 3.0],

  // --- Tier 3: Databases & Warehousing ---
  'mysql': [-5.4, -1.4, 1.6],
  'postgresql': [5.4, -1.4, 1.6],

  // --- Tier 4: Developer Tools & Languages ---
  'git': [-5.8, 2.6, -0.4],
  'vscode': [5.8, 2.6, -0.4],
  'eclipse': [-6.6, 0.6, -1.0],
  'c-lang': [6.6, 0.6, -1.0],

  // --- Tier 5: Web Technologies & Frameworks ---
  'react': [-2.2, -2.4, 2.4],
  'html5': [-4.6, -3.2, 0.8],
  'css3': [-1.5, -3.8, 1.2],
  'bootstrap': [1.5, -3.8, 1.2],
  'rest-api': [4.6, -3.2, 0.8],

  // --- Tier 6: Analytics Methodologies ---
  'cohort-analysis': [-6.0, -3.4, -1.2],
  'rfm-segmentation': [-3.0, -4.8, -0.2],
  'data-cleaning': [3.0, -4.8, -0.2],
  'data-visualization': [6.0, -3.4, -1.2],
  'kpi-tracking': [0.0, -5.2, -0.4],
};

const CATEGORIES: SkillCategory[] = [
  'All',
  'Core Analytics',
  'Data Science & AI',
  'Databases',
  'Developer Tools',
  'Web & Frameworks',
  'Analytics Methodologies',
];

export function LogoUniverseCanvas({
  onHoverSkill,
  onSelectSkill,
  focusedSkill,
}: LogoUniverseCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[680px] sm:h-[780px] relative rounded-3xl overflow-hidden bg-[#080A10] border border-slate-800 shadow-2xl flex flex-col"
    >
      {/* Background soft ambient radial light */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-950/20 via-slate-950/60 to-[#080A10] pointer-events-none" />

      {/* Category Filter Pills across the top */}
      <div className="relative z-10 px-4 pt-4 pb-2 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count =
            cat === 'All'
              ? TECH_SKILLS.length
              : TECH_SKILLS.filter((s) => s.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor="Filter"
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-500/20 text-[#00F5A0] font-bold shadow-[0_0_15px_rgba(0,245,160,0.3)] scale-105 border border-[#00F5A0]/60'
                  : 'bg-[#0E121B]/80 text-slate-400 hover:text-white hover:bg-[#121724] border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-[#00F5A0]/20 text-[#00F5A0]' : 'bg-slate-800 text-[#00F5A0] font-semibold'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 relative">
        <Canvas
          frameloop={isIntersecting ? 'always' : 'never'}
          camera={{ position: [0, 0, 13.5], fov: 48 }}
          dpr={[1, 1.35]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Crisp, clean high-visibility lighting */}
          <ambientLight intensity={1.8} />
          <directionalLight position={[0, 6, 12]} intensity={2.6} color="#FFFFFF" />
          <directionalLight position={[0, -6, 10]} intensity={1.4} color="#E0F2FE" />
          <pointLight position={[-8, 4, 6]} intensity={2.0} color="#00F5A0" />
          <pointLight position={[8, -4, 6]} intensity={2.0} color="#387BFF" />

          {/* User zoom and orbit controls */}
          <OrbitControls
            enableZoom={true}
            minDistance={7}
            maxDistance={20}
            enablePan={false}
            rotateSpeed={0.55}
            maxPolarAngle={Math.PI / 1.55}
            minPolarAngle={Math.PI / 2.75}
          />

          {/* Background Orbital Rings */}
          <group position={[0, 0, -1]}>
            <mesh rotation={[Math.PI / 2.3, 0, 0]}>
              <torusGeometry args={[5.2, 0.015, 16, 100]} />
              <meshBasicMaterial color="#00F5A0" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
              <torusGeometry args={[7.2, 0.012, 16, 100]} />
              <meshBasicMaterial color="#387BFF" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 2.1, -0.4, 0]}>
              <torusGeometry args={[9.4, 0.01, 16, 100]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
            </mesh>
          </group>

          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
            <group position={[0, 0, 0]}>
              <Suspense fallback={null}>
                {TECH_SKILLS.map((skill) => {
                  const pos = SKILL_POSITIONS[skill.id] || [0, 0, 0];
                  const isActiveCategory =
                    activeCategory === 'All' || skill.category === activeCategory;

                  return (
                    <Logo3D
                      key={skill.id}
                      skill={skill}
                      position={pos}
                      isActiveCategory={isActiveCategory}
                      onHover={onHoverSkill}
                      onClick={onSelectSkill}
                      isFocused={focusedSkill?.id === skill.id}
                    />
                  );
                })}
              </Suspense>
            </group>
          </Float>
        </Canvas>
      </div>

      {/* Orbit Helper Tip */}
      <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-[#0E121B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse" />
        <span>Click & drag to rotate 3D constellation • Scroll to zoom • Click any node to inspect details</span>
      </div>
    </div>
  );
}
