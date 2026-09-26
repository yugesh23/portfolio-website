import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MouseState } from '../../hooks/useMousePosition';

interface DataHologramModelProps {
  mouse: MouseState;
}

export function DataHologramModel({ mouse }: DataHologramModelProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate glowing coordinate points on a sphere
  const [pointPositions, pointColors] = React.useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00D4FF');
    const violet = new THREE.Color('#8B5CF6');
    const emerald = new THREE.Color('#10B981');

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.6 + (Math.random() - 0.5) * 0.15;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const rand = Math.random();
      const col = rand > 0.6 ? cyan : rand > 0.3 ? violet : emerald;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return [positions, colors];
  }, []);

  // Smooth lerp mouse tracking
  const currentRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse tracking lerp
    const targetX = -mouse.normalizedY * 0.3;
    const targetY = mouse.normalizedX * 0.4;
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetX, delta * 3);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetY, delta * 3);

    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.x = currentRot.current.x + Math.sin(time * 0.3) * 0.05;
      globeGroupRef.current.rotation.y = currentRot.current.y + time * 0.18;
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = time * 0.12;
      ringGroupRef.current.rotation.x = Math.PI / 4 + Math.sin(time * 0.5) * 0.1;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ambient and Key Lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#00D4FF" />
      <pointLight position={[-3, -3, 2]} intensity={2.0} color="#7C3AED" />

      {/* Main Hologram Globe Group */}
      <group ref={globeGroupRef}>
        {/* Core Wireframe Geodesic Sphere */}
        <mesh>
          <icosahedronGeometry args={[1.5, 3]} />
          <meshBasicMaterial
            wireframe
            color="#00D4FF"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Luminous Core */}
        <mesh>
          <sphereGeometry args={[1.0, 24, 24]} />
          <meshStandardMaterial
            color="#050B18"
            emissive="#1E1B4B"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Latitude & Equator Data Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.52, 1.55, 64]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[1.52, 1.54, 48]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        {/* Constellation Data Points */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pointPositions.length / 3}
              array={pointPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={pointColors.length / 3}
              array={pointColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            vertexColors
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </points>
      </group>

      {/* Outer Orbiting Data Ring with Marker Nodes */}
      <group ref={ringGroupRef}>
        <mesh>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
        </mesh>
        <mesh position={[2.2, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <mesh position={[-2.2, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#A78BFA" />
        </mesh>
      </group>
    </group>
  );
}
