import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Trophy3DProps {
  type: 'gold' | 'silver' | 'design' | 'research';
}

export function Trophy3D({ type }: Trophy3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2;
    }
  });

  const goldMat = new THREE.MeshPhysicalMaterial({
    color: '#F59E0B',
    metalness: 0.85,
    roughness: 0.18,
    clearcoat: 0.8,
    emissive: '#B45309',
    emissiveIntensity: 0.2,
  });

  const silverMat = new THREE.MeshPhysicalMaterial({
    color: '#E2E8F0',
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 0.8,
    emissive: '#64748B',
    emissiveIntensity: 0.15,
  });

  const cyanMat = new THREE.MeshPhysicalMaterial({
    color: '#22D3EE',
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 0.9,
    emissive: '#0891B2',
    emissiveIntensity: 0.3,
  });

  if (type === 'gold') {
    // 1st Prize Paper Presentation Trophy Cup
    return (
      <group ref={meshRef}>
        {/* Cup Pedestal Base */}
        <mesh position={[0, -0.6, 0]} material={goldMat}>
          <cylinderGeometry args={[0.45, 0.55, 0.2, 32]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} material={goldMat}>
          <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        </mesh>
        {/* Cup Body */}
        <mesh position={[0, 0.1, 0]} material={goldMat}>
          <cylinderGeometry args={[0.5, 0.2, 0.7, 32]} />
        </mesh>
        {/* Handles */}
        <mesh position={[0.52, 0.15, 0]} material={goldMat}>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
        </mesh>
        <mesh position={[-0.52, 0.15, 0]} material={goldMat}>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
        </mesh>
      </group>
    );
  }

  if (type === 'design') {
    // 1st Prize Logo Design Star / Diamond Crest
    return (
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]} material={goldMat}>
          <octahedronGeometry args={[0.65, 0]} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[0.85, 0.03, 16, 32]} />
          <meshBasicMaterial color="#F59E0B" wireframe />
        </mesh>
      </group>
    );
  }

  if (type === 'silver') {
    // 2nd Prize Silver Medal Disc
    return (
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={silverMat}>
          <cylinderGeometry args={[0.65, 0.65, 0.1, 32]} />
        </mesh>
        {/* Center Star Embellishment */}
        <mesh position={[0, 0, 0.08]} material={silverMat}>
          <octahedronGeometry args={[0.25, 0]} />
        </mesh>
      </group>
    );
  }

  // Taylor & Francis Peer-Reviewed Academic Research Book / Tome
  return (
    <group ref={meshRef} rotation={[0.2, 0, 0]}>
      {/* Journal Cover */}
      <mesh position={[0, 0, 0]} material={cyanMat}>
        <boxGeometry args={[0.85, 1.1, 0.18]} />
      </mesh>
      {/* Inner White Pages Edge */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[0.8, 1.05, 0.14]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
    </group>
  );
}
