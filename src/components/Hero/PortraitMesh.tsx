import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { PortraitShaderMaterial } from '../../shaders/portraitShader';
import { MouseState } from '../../hooks/useMousePosition';

interface PortraitMeshProps {
  mouse: MouseState;
  isMobile?: boolean;
}

export function PortraitMesh({ mouse, isMobile = false }: PortraitMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);

  // Load portrait texture and depth texture as an array
  const [colorTexture, depthTexture] = useTexture([
    '/assets/me.png',
    '/assets/me-depth.png',
  ]);

  // Configure textures
  useEffect(() => {
    if (colorTexture) {
      colorTexture.generateMipmaps = true;
      colorTexture.minFilter = THREE.LinearMipmapLinearFilter;
      colorTexture.magFilter = THREE.LinearFilter;
      colorTexture.needsUpdate = true;
    }
    if (depthTexture) {
      depthTexture.generateMipmaps = false;
      depthTexture.minFilter = THREE.LinearFilter;
      depthTexture.magFilter = THREE.LinearFilter;
      depthTexture.needsUpdate = true;
    }
  }, [colorTexture, depthTexture]);

  // Clone shader material uniforms for clean instance binding
  const shaderMaterial = useMemo(() => {
    const uniforms = THREE.UniformsUtils.clone(PortraitShaderMaterial.uniforms);
    uniforms.uTexture.value = colorTexture;
    uniforms.uDepthMap.value = depthTexture;
    uniforms.uHasDepth.value = depthTexture ? 1.0 : 0.0;
    uniforms.uIntensity.value = isMobile ? 0.02 : 0.045;
    uniforms.uAberration.value = isMobile ? 0.003 : 0.007;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: PortraitShaderMaterial.vertexShader,
      fragmentShader: PortraitShaderMaterial.fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [colorTexture, depthTexture, isMobile]);

  // Lerp tracking targets
  const currentRot = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const currentSpeed = useRef(0);

  // Max tilt in radians: ~12 degrees = 0.209 radians
  const MAX_TILT = 0.21;

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    let targetRotX = 0;
    let targetRotY = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let mouseNormX = 0;
    let mouseNormY = 0;
    let speedFactor = 0;

    if (isMobile) {
      // Gentle sinusoidal organic sway on mobile / touch
      targetRotX = Math.sin(time * 0.8) * 0.06;
      targetRotY = Math.cos(time * 0.6) * 0.08;
      targetPosX = Math.sin(time * 0.5) * 0.1;
      targetPosY = Math.cos(time * 0.7) * 0.1;
      mouseNormX = targetRotY * 2.0;
      mouseNormY = targetRotX * 2.0;
    } else {
      // Desktop cursor tracking: damped tilt (max 12 deg)
      targetRotX = -mouse.normalizedY * MAX_TILT;
      targetRotY = mouse.normalizedX * MAX_TILT;
      targetPosX = mouse.normalizedX * 0.25;
      targetPosY = mouse.normalizedY * 0.2;
      mouseNormX = mouse.normalizedX;
      mouseNormY = mouse.normalizedY;
      speedFactor = mouse.speed / 1000;
    }

    // Damped lerp (factor ~0.08 for buttery smooth fluid reaction)
    const lerpFactor = Math.min(1, delta * 5.0);
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, targetRotX, lerpFactor);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, targetRotY, lerpFactor);
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPosX, lerpFactor);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPosY, lerpFactor);

    currentMouse.current.x = THREE.MathUtils.lerp(currentMouse.current.x, mouseNormX, lerpFactor);
    currentMouse.current.y = THREE.MathUtils.lerp(currentMouse.current.y, mouseNormY, lerpFactor);
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, speedFactor, 0.1);

    if (meshRef.current) {
      meshRef.current.rotation.x = currentRot.current.x;
      meshRef.current.rotation.y = currentRot.current.y;
      meshRef.current.position.x = currentPos.current.x;
      meshRef.current.position.y = currentPos.current.y;
    }

    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);
      shaderMatRef.current.uniforms.uSpeed.value = currentSpeed.current;
      shaderMatRef.current.uniforms.uTime.value = time;
    }
  });

  // Calculate plane dimensions to match aspect ratio of Yugesh portrait (~1696 x 1767 = 0.96)
  const planeWidth = isMobile ? 3.0 : 3.8;
  const planeHeight = planeWidth * (1767 / 1696);

  return (
    <group position={[isMobile ? 0 : 1.3, -0.1, 0]}>
      {/* Soft glow edge lighting: Cyan-violet atmospheric aura */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[planeWidth * 1.08, planeHeight * 1.08]} />
        <meshBasicMaterial
          transparent
          opacity={0.35}
          color="#00D4FF"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0.1, -0.05, -0.25]}>
        <planeGeometry args={[planeWidth * 1.18, planeHeight * 1.18]} />
        <meshBasicMaterial
          transparent
          opacity={0.2}
          color="#7C3AED"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main 3D Depth Displaced Portrait Plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight, 64, 64]} />
        <primitive ref={shaderMatRef} object={shaderMaterial} attach="material" />
      </mesh>
    </group>
  );
}
