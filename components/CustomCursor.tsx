'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPosition, setTrailingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('input'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing effect
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTrailingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Trailing Ring */}
      <div
        className="fixed rounded-full pointer-events-none border transition-transform duration-75 ease-out"
        style={{
          width: isHovered ? 44 : 28,
          height: isHovered ? 44 : 28,
          transform: `translate3d(${trailingPosition.x - (isHovered ? 22 : 14)}px, ${
            trailingPosition.y - (isHovered ? 22 : 14)
          }px, 0)`,
          borderColor: isHovered ? 'rgba(138, 180, 248, 0.7)' : 'rgba(255, 255, 255, 0.35)',
          backgroundColor: isHovered ? 'rgba(138, 180, 248, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 15px rgba(138, 180, 248, 0.4)' : 'none'
        }}
      />

      {/* Center High-precision Dot */}
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-blue-400 pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`
        }}
      />
    </div>
  );
}
