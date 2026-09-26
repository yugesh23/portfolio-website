import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

// -------------------------------------------------------------
// Component 1: Camera Controller linked to Scroll & Mouse Parallax
// -------------------------------------------------------------
function ScrollCameraController({ mouse }: { mouse: { normalizedX: number; normalizedY: number } }) {
  const { camera } = useThree();
  const currentRot = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0, z: 8 });

  useFrame((_, delta) => {
    const lenis = typeof window !== 'undefined' ? (window as any).lenis : null;
    const scrollY = lenis ? lenis.scroll : (typeof window !== 'undefined' ? window.scrollY : 0);
    const maxScroll = typeof document !== 'undefined'
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      : 1000;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

    const targetY = -scrollProgress * 22;
    const targetZ = 8 + Math.sin(scrollProgress * Math.PI) * 1.8;
    const targetX = mouse.normalizedX * 1.2;

    const lerpFactor = Math.min(1, delta * 3.8);
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, lerpFactor);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, lerpFactor);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, lerpFactor);

    camera.position.x = currentPos.current.x;
    camera.position.y = currentPos.current.y;
    camera.position.z = currentPos.current.z;

    const targetRotX = -mouse.normalizedY * 0.06 + Math.sin(scrollProgress * Math.PI) * 0.05;
    const targetRotY = mouse.normalizedX * 0.06;
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRotX, lerpFactor);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRotY, lerpFactor);

    camera.rotation.x = currentRot.current.x;
    camera.rotation.y = currentRot.current.y;
    camera.rotation.z = Math.sin(scrollProgress * Math.PI * 1.5) * 0.02;
  });

  return null;
}

// -------------------------------------------------------------
// Component 2: Glowing Cyber Neural Data Nodes & Interconnecting Web
// -------------------------------------------------------------
function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const sky = new THREE.Color('#38BDF8');
    const violet = new THREE.Color('#A78BFA');
    const subtleSlate = new THREE.Color('#64748B');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 60 - 5;
      const z = (Math.random() - 0.5) * 16 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const r = Math.random();
      const c = r > 0.55 ? sky : r > 0.25 ? violet : subtleSlate;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.012; // slow, gentle drift
      pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.38}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// -------------------------------------------------------------
// Disciplined Global Background: Clean Deep Navy with Soft Glows
// -------------------------------------------------------------
export function Global3DBackground() {
  const mouse = useMousePosition();
  const [isDocVisible, setIsDocVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => setIsDocVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden overflow-x-clip max-w-full bg-[#0B1220]">
      {/* Soft, Non-Distracting Sky & Soft Violet Gradient Blobs */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-[#38BDF8]/06 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[650px] h-[650px] bg-[#A78BFA]/05 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Atmospheric Radial Falloff */}
      <div className="absolute inset-0 bg-cyber-radial pointer-events-none" />

      <Canvas
        frameloop={isDocVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 8, 5]} intensity={1.2} color="#38BDF8" />
        <pointLight position={[-6, -10, 4]} intensity={1.0} color="#A78BFA" />

        <ScrollCameraController mouse={mouse} />
        <Starfield />
      </Canvas>
    </div>
  );
}
