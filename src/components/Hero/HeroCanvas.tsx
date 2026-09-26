import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundParticles } from './BackgroundParticles';
import { MouseState } from '../../hooks/useMousePosition';

interface HeroCanvasProps {
  mouse: MouseState;
  isMobile: boolean;
}

export function HeroCanvas({ mouse, isMobile }: HeroCanvasProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft atmospheric gradient blob in Sky Blue and Soft Violet */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[#38BDF8]/06 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#A78BFA]/05 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
}
