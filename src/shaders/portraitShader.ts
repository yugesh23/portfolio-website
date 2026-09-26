import * as THREE from 'three';

export const PortraitShaderMaterial = {
  uniforms: {
    uTexture: { value: null as THREE.Texture | null },
    uDepthMap: { value: null as THREE.Texture | null },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uIntensity: { value: 0.045 }, // Depth displacement intensity
    uAberration: { value: 0.006 }, // Chromatic aberration strength
    uSpeed: { value: 0.0 }, // Mouse velocity factor
    uTime: { value: 0.0 },
    uHasDepth: { value: 1.0 }, // 1.0 if depth map loaded, 0.0 otherwise
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthMap;
    uniform vec2 uMouse;
    uniform float uIntensity;
    uniform float uAberration;
    uniform float uSpeed;
    uniform float uTime;
    uniform float uHasDepth;

    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate depth displacement
      float depth = 0.5;
      if (uHasDepth > 0.5) {
        depth = texture2D(uDepthMap, uv).r;
      }
      
      // Displace UV coordinates based on mouse position and depth map
      // Objects closer to camera (higher depth value) move more
      vec2 parallax = uMouse * (depth - 0.4) * uIntensity;
      vec2 displacedUv = uv + parallax;

      // Ensure UV stays within bounds to prevent edge smear
      displacedUv = clamp(displacedUv, vec2(0.001), vec2(0.999));

      // Dynamic Chromatic Aberration based on mouse movement speed
      float dynamicAberration = uAberration * (1.0 + clamp(uSpeed * 0.8, 0.0, 4.0));
      vec2 rOffset = uMouse * dynamicAberration;
      vec2 bOffset = -uMouse * dynamicAberration;

      float r = texture2D(uTexture, clamp(displacedUv + rOffset, 0.001, 0.999)).r;
      float g = texture2D(uTexture, displacedUv).g;
      float b = texture2D(uTexture, clamp(displacedUv + bOffset, 0.001, 0.999)).b;
      float a = texture2D(uTexture, displacedUv).a;

      // Soft analytical cyan rim light on the edge of the subject
      float rimIntensity = smoothstep(0.1, 0.9, depth) * (1.0 - smoothstep(0.4, 0.95, depth));
      vec3 rimColor = vec3(0.133, 0.827, 0.933); // Cyan #22D3EE
      vec3 finalRgb = vec3(r, g, b) + rimColor * rimIntensity * 0.18 * (0.5 + 0.5 * sin(uTime * 1.5));

      // Subtle breathing ambient luminescence
      gl_FragColor = vec4(finalRgb, a);
    }
  `,
};
