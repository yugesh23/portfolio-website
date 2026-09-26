import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MouseState } from '../../hooks/useMousePosition';

interface DataCoreModelProps {
  mouse: MouseState;
  isMobile?: boolean;
}

export function DataCoreModel({ mouse, isMobile = false }: DataCoreModelProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerNucleusRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  // Smooth lerp tracking
  const currentRot = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // Generate satellite node positions
  const satelliteData = useMemo(() => {
    return [
      { radius: 2.1, speed: 0.8, phase: 0, size: 0.12, color: '#00D4FF' },
      { radius: 2.5, speed: -0.6, phase: 1.5, size: 0.15, color: '#7C3AED' },
      { radius: 2.8, speed: 0.5, phase: 3.0, size: 0.1, color: '#00D4FF' },
      { radius: 2.3, speed: -0.9, phase: 4.2, size: 0.14, color: '#F59E0B' },
      { radius: 3.1, speed: 0.4, phase: 2.1, size: 0.11, color: '#10B981' },
      { radius: 2.6, speed: -0.7, phase: 5.4, size: 0.13, color: '#00D4FF' },
    ];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Damped cursor tracking
    const targetRotX = -mouse.normalizedY * 0.35;
    const targetRotY = mouse.normalizedX * 0.45;
    const targetPosX = mouse.normalizedX * 0.3;
    const targetPosY = mouse.normalizedY * 0.25;

    const lerpSpeed = Math.min(1, delta * 4.5);
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRotX, lerpSpeed);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRotY, lerpSpeed);
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPosX, lerpSpeed);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPosY, lerpSpeed);

    if (masterGroupRef.current) {
      masterGroupRef.current.rotation.x = currentRot.current.x;
      masterGroupRef.current.rotation.y = currentRot.current.y + time * 0.15;
      masterGroupRef.current.position.x = (isMobile ? 0 : 1.4) + currentPos.current.x;
      masterGroupRef.current.position.y = Math.sin(time * 1.2) * 0.12 + currentPos.current.y;
    }

    // Outer crystalline core rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.z += delta * 0.15;
      const pulse = 1 + Math.sin(time * 2.5) * 0.04;
      coreRef.current.scale.setScalar(pulse);
    }

    // Inner wireframe nucleus counter-spin
    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.y -= delta * 0.6;
      innerNucleusRef.current.rotation.x += delta * 0.4;
    }

    // Dual gyroscopic telemetry rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.35;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.3;
      ring2Ref.current.rotation.z = time * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.2;
      ring3Ref.current.rotation.x = -time * 0.25;
    }

    // Orbiting satellites
    if (satellitesRef.current) {
      satellitesRef.current.children.forEach((child, i) => {
        const sat = satelliteData[i];
        if (sat) {
          const angle = time * sat.speed + sat.phase;
          child.position.x = Math.cos(angle) * sat.radius;
          child.position.z = Math.sin(angle) * sat.radius;
          child.position.y = Math.sin(angle * 1.5) * 0.6;
          child.rotation.x += delta * 2;
          child.rotation.y += delta * 3;
        }
      });
    }
  });

  const coreScale = isMobile ? 1.0 : 1.35;

  return (
    <group ref={masterGroupRef} position={[isMobile ? 0 : 1.4, 0, 0]} scale={coreScale}>
      {/* Dynamic Point Lights radiating from the core */}
      <pointLight position={[0, 0, 0]} intensity={3.5} distance={6} color="#00D4FF" />
      <pointLight position={[0, 1.5, 0]} intensity={2.0} distance={4} color="#7C3AED" />

      {/* Atmospheric Core Glow Aura */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Layer 1: Outer Faceted Quantum Crystal Nucleus */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshPhysicalMaterial
          color="#00D4FF"
          emissive="#7C3AED"
          emissiveIntensity={0.4}
          roughness={0.08}
          metalness={0.2}
          transmission={0.82}
          ior={1.48}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Layer 2: Faceted Wireframe Overlay for Cybernetic Hologram Feel */}
      <mesh>
        <icosahedronGeometry args={[1.07, 0]} />
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Layer 3: Inner Pulsing Golden-Ratio Core */}
      <mesh ref={innerNucleusRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#00D4FF"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Layer 4: Primary Telemetry Orbit Ring (Cyan with Tick Segments) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.75, 0.022, 16, 80]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Ring Sensor Node */}
        <mesh position={[1.75, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Layer 5: Secondary Telemetry Orbit Ring (Violet) */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.05, 0.018, 16, 80]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 2.05, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#00D4FF" />
        </mesh>
      </group>

      {/* Layer 6: Tertiary Dotted Horizon Ring */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.35, 0.012, 16, 60]} />
          <meshBasicMaterial
            color="#00D4FF"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Layer 7: Swarm of Orbiting Data Satellites */}
      <group ref={satellitesRef}>
        {satelliteData.map((sat, idx) => (
          <mesh key={idx}>
            <octahedronGeometry args={[sat.size, 0]} />
            <meshStandardMaterial
              color={sat.color}
              emissive={sat.color}
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
        ))}
      </group>


    </group>
  );
}
