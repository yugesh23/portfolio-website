import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Activity,
  Cpu,
  Zap,
  Sparkles,
  Layers,
  Network,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

// Responsive scene wrapper that auto-scales for mobile/tablet/desktop viewports
function ResponsiveSceneWrapper({ children }: { children: React.ReactNode }) {
  const { size } = useThree();
  const scale = useMemo(() => {
    if (size.width < 450) return 0.72;
    if (size.width < 640) return 0.82;
    if (size.width < 1024) return 0.92;
    return 1.0;
  }, [size.width]);

  return <group scale={scale}>{children}</group>;
}

// =============================================================
// 1. 3D SCENE 1: BAR CHART SCENE
// =============================================================
interface BarItem {
  name: string;
  value: number;
  color: string;
  x: number;
}

const BARS: BarItem[] = [
  { name: 'SQL', value: 95, color: '#38BDF8', x: -2.0 },
  { name: 'Python', value: 90, color: '#38BDF8', x: -1.0 },
  { name: 'Power BI', value: 88, color: '#A78BFA', x: 0 },
  { name: 'Excel', value: 92, color: '#34D399', x: 1.0 },
  { name: 'ML / EDA', value: 82, color: '#A78BFA', x: 2.0 },
];

function BarMesh({
  bar,
  hovered,
  onHover,
}: {
  bar: BarItem;
  hovered: boolean;
  onHover: (name: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetHeight = (bar.value / 100) * 2.1;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const hoverScale = hovered ? 1.08 : 1;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, hoverScale, delta * 8);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, hoverScale, delta * 8);
  });

  return (
    <group position={[bar.x, 0, 0]}>
      <mesh
        ref={meshRef}
        position={[0, targetHeight / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(bar.name);
        }}
        onPointerOut={() => onHover(null)}
      >
        <boxGeometry args={[0.56, targetHeight, 0.56]} />
        <meshStandardMaterial
          color={bar.color}
          emissive={bar.color}
          emissiveIntensity={hovered ? 0.9 : 0.3}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      <Text
        position={[0, -0.32, 0.35]}
        fontSize={0.20}
        color={hovered ? '#FFFFFF' : '#94A3B8'}
        anchorX="center"
        anchorY="top"
      >
        {bar.name}
      </Text>

      <Text
        position={[0, targetHeight + 0.28, 0]}
        fontSize={0.22}
        color={hovered ? '#38BDF8' : '#E2E8F0'}
        anchorX="center"
        anchorY="bottom"
      >
        {`${bar.value}%`}
      </Text>
    </group>
  );
}

function ThreeBarChartScene({
  hoveredBar,
  setHoveredBar,
}: {
  hoveredBar: string | null;
  setHoveredBar: (name: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.75, 0]}>
      <gridHelper args={[6.4, 10, '#38BDF8', '#1E293B']} position={[0, -0.01, 0]} />
      {BARS.map((bar) => (
        <BarMesh
          key={bar.name}
          bar={bar}
          hovered={hoveredBar === bar.name}
          onHover={setHoveredBar}
        />
      ))}
    </group>
  );
}

// =============================================================
// 2. 3D SCENE 2: RFM CUSTOMER SEGMENTATION NEURAL CLOUD
// =============================================================
interface ClusterNode {
  id: number;
  pos: [number, number, number];
  cluster: 'Champions' | 'Loyal' | 'At-Risk' | 'New';
  color: string;
  size: number;
}

function ThreeRFMClusterScene({
  hoveredNode,
  setHoveredNode,
}: {
  hoveredNode: string | null;
  setHoveredNode: (info: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 4 distinct customer segment clusters with bounded coordinates
  const nodes = useMemo<ClusterNode[]>(() => {
    const list: ClusterNode[] = [];
    let id = 0;
    
    // Champions (Sky Blue) - Center top
    for (let i = 0; i < 16; i++) {
      list.push({
        id: id++,
        pos: [
          -1.0 + (Math.random() - 0.5) * 1.0,
          0.65 + (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 1.0,
        ],
        cluster: 'Champions',
        color: '#38BDF8',
        size: 0.12 + Math.random() * 0.05,
      });
    }

    // Loyal Customers (Soft Violet) - Right top
    for (let i = 0; i < 18; i++) {
      list.push({
        id: id++,
        pos: [
          1.0 + (Math.random() - 0.5) * 1.1,
          0.55 + (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 1.1,
        ],
        cluster: 'Loyal',
        color: '#A78BFA',
        size: 0.11 + Math.random() * 0.05,
      });
    }

    // At-Risk Churn (Slate / Neutral) - Center bottom
    for (let i = 0; i < 15; i++) {
      list.push({
        id: id++,
        pos: [
          0.0 + (Math.random() - 0.5) * 1.1,
          -0.75 + (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 1.1,
        ],
        cluster: 'At-Risk',
        color: '#64748B',
        size: 0.10 + Math.random() * 0.04,
      });
    }

    // New Leads (Sky Blue) - Left bottom
    for (let i = 0; i < 14; i++) {
      list.push({
        id: id++,
        pos: [
          -1.1 + (Math.random() - 0.5) * 0.9,
          -0.5 + (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.9,
        ],
        cluster: 'New',
        color: '#38BDF8',
        size: 0.09 + Math.random() * 0.04,
      });
    }

    return list;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer bounding sphere cage */}
      <mesh>
        <sphereGeometry args={[2.5, 20, 20]} />
        <meshBasicMaterial color="#263449" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Cluster Node Spheres */}
      {nodes.map((node) => (
        <mesh
          key={node.id}
          position={node.pos}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredNode(`${node.cluster} Segment (RFM Score 4-5)`);
          }}
          onPointerOut={() => setHoveredNode(null)}
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hoveredNode?.includes(node.cluster) ? 1.0 : 0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Floating 3D Cluster Labels */}
      <Text position={[-1.2, 1.5, 0]} fontSize={0.18} color="#38BDF8" anchorX="center">
        Champions (35%)
      </Text>
      <Text position={[1.2, 1.4, 0]} fontSize={0.18} color="#A78BFA" anchorX="center">
        Loyal (30%)
      </Text>
      <Text position={[0, -1.5, 0]} fontSize={0.18} color="#94A3B8" anchorX="center">
        At-Risk Churn (20%)
      </Text>
    </group>
  );
}

// =============================================================
// 3. 3D SCENE 3: TECH ECOSYSTEM TORUS RADAR
// =============================================================
function ThreeTorusScene({
  hoveredSlice,
  setHoveredSlice,
}: {
  hoveredSlice: string | null;
  setHoveredSlice: (name: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
      groupRef.current.rotation.x = 0.45 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.12;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Center 3D Core Sphere */}
      <mesh
        onPointerOver={() => setHoveredSlice('Analytics Engine Core')}
        onPointerOut={() => setHoveredSlice(null)}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Tech Torus 1 (Sky Blue) */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.55, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Orbiting Tech Torus 2 (Soft Violet Outer) */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.05, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#A78BFA"
          emissive="#A78BFA"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Satellite Nodes */}
      <mesh position={[1.55, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[-1.55, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#A78BFA" emissive="#A78BFA" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

// =============================================================
// DATASETS FOR 2D INTERACTIVE GRAPHS
// =============================================================
const FORECAST_SCENARIOS = {
  aggressive: [
    { period: 'Q1', baseline: 1200, forecast: 1350, turnaround: -12 },
    { period: 'Q2', baseline: 1800, forecast: 2200, turnaround: -15 },
    { period: 'Q3', baseline: 2500, forecast: 3300, turnaround: -18 },
    { period: 'Q4', baseline: 3400, forecast: 4700, turnaround: -22 },
    { period: 'Q1 25', baseline: 4200, forecast: 6200, turnaround: -25 },
  ],
  baseline: [
    { period: 'Q1', baseline: 1200, forecast: 1250, turnaround: -10 },
    { period: 'Q2', baseline: 1800, forecast: 2000, turnaround: -12 },
    { period: 'Q3', baseline: 2500, forecast: 2900, turnaround: -15 },
    { period: 'Q4', baseline: 3400, forecast: 3950, turnaround: -17 },
    { period: 'Q1 25', baseline: 4200, forecast: 4900, turnaround: -19 },
  ],
  conservative: [
    { period: 'Q1', baseline: 1200, forecast: 1220, turnaround: -8 },
    { period: 'Q2', baseline: 1800, forecast: 1900, turnaround: -10 },
    { period: 'Q3', baseline: 2500, forecast: 2650, turnaround: -12 },
    { period: 'Q4', baseline: 3400, forecast: 3600, turnaround: -13 },
    { period: 'Q1 25', baseline: 4200, forecast: 4400, turnaround: -15 },
  ],
};

// Cohort Retention Matrix Data (6 Cohorts x 5 Intervals)
const COHORT_MATRIX = [
  { cohort: 'Jan 24', users: 450, rates: [100, 78, 64, 55, 48] },
  { cohort: 'Feb 24', users: 520, rates: [100, 81, 68, 59, 52] },
  { cohort: 'Mar 24', users: 610, rates: [100, 84, 71, 63, null] },
  { cohort: 'Apr 24', users: 740, rates: [100, 86, 75, null, null] },
  { cohort: 'May 24', users: 890, rates: [100, 89, null, null, null] },
];

export function AnalyticsShowcase() {
  const [active3DMode, setActive3DMode] = useState<'bars' | 'rfm' | 'torus'>('bars');
  const [hovered3DItem, setHovered3DItem] = useState<string | null>(null);
  const [scenario, setScenario] = useState<'aggressive' | 'baseline' | 'conservative'>('baseline');
  const [selectedCohortCell, setSelectedCohortCell] = useState<{
    cohort: string;
    month: number;
    rate: number;
    users: number;
  } | null>({
    cohort: 'Feb 24',
    month: 1,
    rate: 81,
    users: 520,
  });

  return (
    <section
      id="analytics"
      className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20 space-y-10"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/05 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151F30] border border-[#263449] text-[#38BDF8] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>DATA TELEMETRY & 3D OBSERVATORY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          Interactive Analytics Suite
        </h2>

        <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-sans leading-relaxed">
          Explore real-time data telemetry, interactive 3D multidimensional models, and live predictive analytics.
        </p>
      </div>

      {/* Live Telemetry KPI Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#151F30] border border-[#263449] hover:border-[#38BDF8]/50 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-mono text-xs">Query Latency</span>
            <Zap className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">1.2ms</div>
          <div className="text-[10px] sm:text-[11px] text-[#38BDF8] font-mono mt-1">42% Execution Speedup</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#151F30] border border-[#263449] hover:border-[#38BDF8]/50 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-mono text-xs">ETL Processing</span>
            <Cpu className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">12,400+</div>
          <div className="text-[10px] sm:text-[11px] text-[#38BDF8] font-mono mt-1">Rows Normalized/Sec</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#151F30] border border-[#263449] hover:border-[#34D399]/50 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-mono text-xs">Data Integrity</span>
            <Activity className="w-4 h-4 text-[#34D399] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">99.8%</div>
          <div className="text-[10px] sm:text-[11px] text-[#34D399] font-mono mt-1">Constraint Validation</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#151F30] border border-[#263449] hover:border-[#34D399]/50 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-mono text-xs">Turnaround Time</span>
            <TrendingUp className="w-4 h-4 text-[#34D399] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#34D399] tracking-tight">-15%</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1">Hours Reclaimed Weekly</div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3D INTERACTIVE OBSERVATORY CANVAS (MULTI-MODE) */}
      {/* ========================================================= */}
      <div className="rounded-3xl p-5 sm:p-7 bg-[#151F30] border border-[#263449] shadow-xl space-y-4">
        {/* Observatory Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#263449]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B1220] border border-[#263449] text-[#38BDF8] flex items-center justify-center shadow-inner flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-xl text-white">
                  3D Interactive Data Canvas
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#0B1220] border border-[#263449] text-[#38BDF8] font-mono text-[10px]">
                  LIVE THREE.JS
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Drag to orbit 360° • Hover elements to inspect data nodes
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0B1220] p-1.5 rounded-2xl border border-[#263449] self-start md:self-auto">
            <button
              onClick={() => setActive3DMode('bars')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 ${
                active3DMode === 'bars'
                  ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>3D Bar Matrix</span>
            </button>

            <button
              onClick={() => setActive3DMode('rfm')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 ${
                active3DMode === 'rfm'
                  ? 'bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/40 shadow-[0_0_12px_rgba(167,139,250,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>3D RFM Clusters</span>
            </button>

            <button
              onClick={() => setActive3DMode('torus')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 ${
                active3DMode === 'torus'
                  ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>3D Tech Torus</span>
            </button>
          </div>
        </div>

        {/* 3D Viewport Area */}
        <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-2xl bg-[#0B1220] border border-[#263449] overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Active Hover / Mode Telemetry HUD Tag */}
          <div className="absolute top-3.5 left-3.5 z-10 font-mono text-[10px] sm:text-xs text-[#38BDF8] bg-[#151F30]/90 px-3.5 py-1.5 rounded-xl border border-[#263449] shadow-md backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>
              {hovered3DItem
                ? `INSPECT: ${hovered3DItem}`
                : active3DMode === 'bars'
                ? 'MODE: Skill Competency Extrusion'
                : active3DMode === 'rfm'
                ? 'MODE: Customer Cohort RFM Point Cloud'
                : 'MODE: Multi-Stack Gyroscope Radar'}
            </span>
          </div>

          <div className="absolute bottom-3.5 right-3.5 z-10 font-mono text-[10px] sm:text-[11px] text-slate-400 bg-[#151F30]/90 px-3 py-1.5 rounded-xl border border-[#263449] shadow-md backdrop-blur-md">
            Rotate: Mouse/Touch • Non-Blocking Orbit
          </div>

          <Canvas camera={{ position: [0, 1.1, 5.8], fov: 38 }}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[5, 8, 6]} intensity={2.2} color="#FFFFFF" />
            <directionalLight position={[-5, -1, 4]} intensity={1.5} color="#38BDF8" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              target={[0, 0.2, 0]}
              maxPolarAngle={Math.PI / 2.05}
              minPolarAngle={Math.PI / 5}
              enableDamping={true}
              dampingFactor={0.06}
              autoRotate={!hovered3DItem}
              autoRotateSpeed={0.5}
            />

            <ResponsiveSceneWrapper>
              {active3DMode === 'bars' && (
                <ThreeBarChartScene
                  hoveredBar={hovered3DItem}
                  setHoveredBar={setHovered3DItem}
                />
              )}

              {active3DMode === 'rfm' && (
                <ThreeRFMClusterScene
                  hoveredNode={hovered3DItem}
                  setHoveredNode={setHovered3DItem}
                />
              )}

              {active3DMode === 'torus' && (
                <ThreeTorusScene
                  hoveredSlice={hovered3DItem}
                  setHoveredSlice={setHovered3DItem}
                />
              )}
            </ResponsiveSceneWrapper>
          </Canvas>
        </div>

        {/* Legend / Metrics Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="text-[#38BDF8] font-semibold">● SQL (95%)</span>
            <span className="text-[#38BDF8] font-semibold">● Python (90%)</span>
            <span className="text-[#A78BFA] font-semibold">● Power BI (88%)</span>
            <span className="text-[#34D399] font-semibold">● Excel (92%)</span>
            <span className="text-[#A78BFA] font-semibold">● ML / EDA (82%)</span>
          </div>
          <span className="text-[11px] text-slate-500">GPU Accelerated • WebGL 2.0</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2D GRAPH SUITE: FORECAST SIMULATOR & COHORT HEATMAP */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Interactive Revenue & Turnaround Forecast Curve (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl p-5 sm:p-7 bg-[#151F30] border border-[#263449] shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Predictive Growth & Turnaround Curve
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Simulated automated pipeline throughput vs legacy manual reporting
              </p>
            </div>

            {/* Scenario Buttons */}
            <div className="flex items-center gap-1.5 bg-[#0B1220] p-1 rounded-xl border border-[#263449]">
              <button
                onClick={() => setScenario('aggressive')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs transition-colors ${
                  scenario === 'aggressive'
                    ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Aggressive
              </button>
              <button
                onClick={() => setScenario('baseline')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs transition-colors ${
                  scenario === 'baseline'
                    ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Baseline
              </button>
              <button
                onClick={() => setScenario('conservative')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs transition-colors ${
                  scenario === 'conservative'
                    ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Conservative
              </button>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="w-full h-[240px] sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FORECAST_SCENARIOS[scenario]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="forecastAreaGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="baselineAreaGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="period" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-[#263449] shadow-xl font-mono text-xs space-y-1">
                          <div className="text-slate-400 font-bold">{label} Projections</div>
                          <div className="text-[#38BDF8]">
                            Predicted Volume: {payload[0]?.value?.toLocaleString()} records
                          </div>
                          <div className="text-[#A78BFA]">
                            Baseline: {payload[1]?.value?.toLocaleString()} records
                          </div>
                          <div className="text-[#34D399]">
                            Turnaround Delta: {payload[0]?.payload?.turnaround}% time reclaimed
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#forecastAreaGlow)"
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#baselineAreaGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-[#263449]">
            <span className="flex items-center gap-1.5 text-[#38BDF8]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#38BDF8]" /> Automated Model
            </span>
            <span className="flex items-center gap-1.5 text-[#A78BFA]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#A78BFA]" /> Legacy Manual Run
            </span>
            <span className="text-[#34D399] font-semibold">-15% Avg Latency</span>
          </div>
        </div>

        {/* Right: Interactive Customer Cohort Retention Heatmap (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl p-5 sm:p-7 bg-[#151F30] border border-[#263449] shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Cohort Retention Matrix
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#0B1220] border border-[#263449] text-[#A78BFA] font-mono text-[10px]">
                RFM ANALYTICS
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Month-over-month customer retention decay matrix (Tap cell to inspect)
            </p>
          </div>

          {/* Interactive Heatmap Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="text-slate-400 border-b border-[#263449]">
                  <th className="text-left pb-2 font-medium">Cohort</th>
                  <th className="text-center pb-2 font-medium">M0</th>
                  <th className="text-center pb-2 font-medium">M1</th>
                  <th className="text-center pb-2 font-medium">M2</th>
                  <th className="text-center pb-2 font-medium">M3</th>
                  <th className="text-center pb-2 font-medium">M4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#263449]/60">
                {COHORT_MATRIX.map((c) => (
                  <tr key={c.cohort} className="hover:bg-[#0B1220]/50 transition-colors">
                    <td className="py-1.5 text-white font-semibold text-[11px] whitespace-nowrap">
                      {c.cohort}
                    </td>
                    {c.rates.map((rate, idx) => {
                      if (rate === null) {
                        return (
                          <td key={idx} className="p-1 text-center">
                            <span className="inline-block w-8 sm:w-10 py-1 rounded bg-[#0B1220]/60 text-slate-600 text-[10px]">
                              -
                            </span>
                          </td>
                        );
                      }
                      // Calculate heat intensity
                      const isHigh = rate >= 80;
                      const isMed = rate >= 65 && rate < 80;
                      const bgClass = isHigh
                        ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40'
                        : isMed
                        ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                        : 'bg-[#0B1220] text-slate-400 border border-[#263449]';

                      return (
                        <td key={idx} className="p-1 text-center">
                          <button
                            onClick={() =>
                              setSelectedCohortCell({
                                cohort: c.cohort,
                                month: idx,
                                rate,
                                users: c.users,
                              })
                            }
                            className={`w-8 sm:w-10 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer ${bgClass}`}
                          >
                            {rate}%
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Cell Inspector Card */}
          {selectedCohortCell ? (
            <div className="p-3 rounded-2xl bg-[#0B1220] border border-[#263449] font-mono text-xs flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[#38BDF8] font-bold">
                  {selectedCohortCell.cohort} • Month {selectedCohortCell.month}
                </span>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Cohort Base: {selectedCohortCell.users} users
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-white text-sm">
                  {selectedCohortCell.rate}% Retained
                </span>
                <div className="text-[10px] text-[#34D399]">
                  Healthy Churn Slope
                </div>
              </div>
            </div>
          ) : (
            <div className="text-[11px] font-mono text-slate-500 text-center py-2">
              Select any cell above to inspect cohort health
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
