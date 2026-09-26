import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberGridProps {
  mouse: { normalizedX: number; normalizedY: number };
}

export function CyberGrid({ mouse }: CyberGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (gridRef.current) {
      // Endless smooth forward flow
      gridRef.current.position.z = (time * 0.35) % 1;
    }

    if (groupRef.current) {
      // Subtle mouse reactive sway
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.normalizedX * 0.04,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.35 - mouse.normalizedY * 0.04,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.4, -2]} rotation={[0.35, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[32, 48, '#00D4FF', '#172238']}
        position={[0, 0, 0]}
      />
    </group>
  );
}
