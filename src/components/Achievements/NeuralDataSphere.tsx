import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NeuralDataSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate fibonacci sphere points & connect close neighbors
  const { positions, linePositions } = useMemo(() => {
    const nodeCount = 42;
    const coords: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      coords.push(new THREE.Vector3(x * 1.35, y * 1.35, z * 1.35));
    }

    const linePairs: number[] = [];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const dist = coords[i].distanceTo(coords[j]);
        if (dist < 0.95) {
          linePairs.push(
            coords[i].x, coords[i].y, coords[i].z,
            coords[j].x, coords[j].y, coords[j].z
          );
        }
      }
    }

    const posArray = new Float32Array(coords.length * 3);
    coords.forEach((c, idx) => {
      posArray[idx * 3] = c.x;
      posArray[idx * 3 + 1] = c.y;
      posArray[idx * 3 + 2] = c.z;
    });

    return {
      positions: posArray,
      linePositions: new Float32Array(linePairs),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y += delta * 0.45;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.18;
  });

  return (
    <group ref={groupRef}>
      {/* Central Core Crystal */}
      <mesh>
        <octahedronGeometry args={[0.65, 0]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.6}
          wireframe
        />
      </mesh>

      {/* Network Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#38BDF8"
          transparent
          opacity={0.95}
        />
      </points>

      {/* Connecting Data Filaments */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.6}
        />
      </lineSegments>
    </group>
  );
}
