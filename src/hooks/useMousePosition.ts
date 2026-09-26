import { useState, useEffect, useRef } from 'react';

export interface MouseState {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  velocityX: number;
  velocityY: number;
  speed: number;
}

export function useMousePosition() {
  const [mouse, setMouse] = useState<MouseState>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
  });

  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastPos.current.time) / 1000;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      const vx = dx / dt;
      const vy = dy / dt;
      const speed = Math.sqrt(vx * vx + vy * vy);

      lastPos.current = { x: e.clientX, y: e.clientY, time: now };

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalizedX: normX,
        normalizedY: normY,
        velocityX: vx,
        velocityY: vy,
        speed,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}
