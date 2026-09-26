import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { TechSkill } from '../../data/skills';

interface Logo3DProps {
  skill: TechSkill;
  position: [number, number, number];
  isActiveCategory: boolean;
  onHover: (skill: TechSkill | null, pos: { x: number; y: number } | null) => void;
  onClick: (skill: TechSkill) => void;
  isFocused: boolean;
}

// Global texture cache to prevent re-render lag
const textureCache = new Map<string, THREE.CanvasTexture>();

function getMedallionTexture(skill: TechSkill, hovered: boolean): THREE.CanvasTexture {
  const cacheKey = `medallion_dark_${skill.id}_${hovered ? 'hover' : 'idle'}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Deep Cyber Obsidian Medallion with Brand-Tinted Rim
  const bgGrad = ctx.createRadialGradient(256, 256, 30, 256, 256, 235);
  bgGrad.addColorStop(0, '#0F172A');
  bgGrad.addColorStop(0.68, '#030712');
  bgGrad.addColorStop(1, (skill.color || '#00F0FF') + '35');
  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.fill();

  // 2. High-precision Concentric Target Rings with Brand Accent
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = (skill.color || '#00F0FF') + '50';
  ctx.beginPath();
  ctx.arc(256, 256, 215, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = (skill.color || '#00F0FF') + '30';
  ctx.beginPath();
  ctx.arc(256, 256, 180, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Glowing Neon Brand Border Ring
  ctx.lineWidth = hovered ? 12 : 7;
  ctx.strokeStyle = hovered ? '#00F5A0' : (skill.color || '#387BFF');
  ctx.shadowColor = skill.color;
  ctx.shadowBlur = hovered ? 28 : 14;
  ctx.beginPath();
  ctx.arc(256, 256, 235, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  // 4. Draw Official Brand Vector
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    ctx.drawImage(img, 121, 121, 270, 270);
    texture.needsUpdate = true;
  };
  img.src = skill.logoUrl || ('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(skill.svgIcon));

  textureCache.set(cacheKey, texture);
  return texture;
}

function getBadgeTexture(name: string, color: string, category: string, hovered: boolean): THREE.CanvasTexture {
  const cacheKey = `badge_dark_${name}_${hovered ? 'hover' : 'idle'}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background pill in Dark Cyber Theme
  ctx.fillStyle = hovered ? 'rgba(14, 18, 27, 0.96)' : 'rgba(8, 10, 16, 0.92)';
  const radius = 32;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(8, 8, 496, 124, radius);
  } else {
    ctx.rect(8, 8, 496, 124);
  }
  ctx.fill();

  // Border
  ctx.lineWidth = hovered ? 4 : 2;
  ctx.strokeStyle = hovered ? '#00F5A0' : 'rgba(0, 245, 160, 0.4)';
  ctx.stroke();

  // Glowing brand dot
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(46, 70, 14, 0, Math.PI * 2);
  ctx.fill();

  // Inner dot highlight
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(43, 67, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Skill Name in Crisp White
  ctx.font = '900 34px "Space Grotesk", "Inter", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 76, 56);

  // Category Tag in Cyan
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#38BDF8';
  ctx.fillText(category.toUpperCase(), 78, 94);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  textureCache.set(cacheKey, texture);
  return texture;
}

export function Logo3D({
  skill,
  position,
  isActiveCategory,
  onHover,
  onClick,
  isFocused,
}: Logo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const medallionRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const medallionTexture = useMemo(() => {
    return getMedallionTexture(skill, hovered || isFocused);
  }, [skill, hovered, isFocused]);

  const badgeTexture = useMemo(() => {
    return getBadgeTexture(skill.name, skill.color, skill.category, hovered || isFocused);
  }, [skill.name, skill.color, skill.category, hovered, isFocused]);

  const currentPos = useRef(new THREE.Vector3(...position));
  const currentScale = useRef(1);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    const targetY = isActiveCategory ? position[1] : position[1] - 8;
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, position[0], delta * 4);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, delta * 4);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, position[2], delta * 4);
    groupRef.current.position.copy(currentPos.current);

    const targetScale = hovered ? 1.35 : isFocused ? 1.25 : isActiveCategory ? 1.0 : 0.25;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 8);
    groupRef.current.scale.setScalar(currentScale.current);

    if (medallionRef.current) {
      const rotSpeed = hovered ? 2.0 : 0.5;
      medallionRef.current.rotation.y += delta * rotSpeed;
      medallionRef.current.position.y = Math.sin(time * 1.5 + position[0]) * 0.12;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(skill, { x: e.clientX, y: e.clientY });
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null, null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(skill);
      }}
    >
      {/* 1. Pedestal Base */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.08, 36]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Outer Ring */}
      <mesh position={[0, -0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.025, 16, 40]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 1.0 : 0.6}
        />
      </mesh>

      {/* 3. The 3D Holographic Brand Medallion */}
      <group ref={medallionRef} position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.1, 40]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.84, 0.03, 16, 40]} />
          <meshBasicMaterial
            color={hovered ? '#2563EB' : (skill.color || '#3B82F6')}
          />
        </mesh>

        {/* Front Face: Official Brand Logo on White Porcelain Glass */}
        <mesh position={[0, 0, 0.055]}>
          <circleGeometry args={[0.78, 40]} />
          <meshBasicMaterial
            map={medallionTexture}
            transparent
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Back Face */}
        <mesh position={[0, 0, -0.055]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.78, 40]} />
          <meshBasicMaterial
            map={medallionTexture}
            transparent
            side={THREE.FrontSide}
          />
        </mesh>
      </group>

      {/* 4. Local volumetric point light on hover */}
      {(hovered || isFocused) && (
        <pointLight position={[0, 0.2, 0.8]} intensity={3.0} distance={3.5} color={skill.color} />
      )}

      {/* 5. Billboard Name Badge */}
      <Billboard position={[0, -1.18, 0]}>
        <mesh>
          <planeGeometry args={[1.6, 0.44]} />
          <meshBasicMaterial map={badgeTexture} transparent depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  );
}
