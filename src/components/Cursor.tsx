import React, { useEffect, useState, useRef } from 'react';

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || reducedMotion || window.innerWidth < 1024) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const onMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');

      if (interactiveEl) {
        setIsHovering(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animId: number;
    const lerp = () => {
      const dx = targetPosRef.current.x - posRef.current.x;
      const dy = targetPosRef.current.y - posRef.current.y;
      posRef.current.x += dx * 0.22;
      posRef.current.y += dy * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);

    return () => {
      cancelAnimationFrame(animId);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer Lerped Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height,background-color,border-color] duration-150 ease-out will-change-transform flex items-center justify-center ${
          isHovering
            ? 'w-14 h-14 bg-sky-500/15 border border-[#38BDF8]/80 shadow-[0_0_20px_rgba(56,189,248,0.35)] backdrop-blur-[2px] rounded-full'
            : 'w-7 h-7 border border-[#38BDF8]/50 shadow-[0_0_8px_rgba(56,189,248,0.2)] rounded-full'
        }`}
        style={{
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-wider font-bold text-[#38BDF8] uppercase px-1 select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Pinpoint Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-opacity duration-150 will-change-transform ${
          isHovering ? 'w-2 h-2 bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]' : 'w-1.5 h-1.5 bg-[#38BDF8] opacity-90'
        }`}
        style={{
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
