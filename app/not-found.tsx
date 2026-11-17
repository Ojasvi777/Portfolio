'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, FolderKanban, Search, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';
import CommandPalette from '@/components/CommandPalette';

export default function NotFoundPage() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isRepaired, setIsRepaired] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#060c1c] via-[#091530] to-[#040813] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background ambient yard glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(18,88,212,0.25)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Overhead Rail (broken / misaligned at the end) */}
      <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-slate-700 to-slate-900 border-b border-slate-600/50">
        <div className="absolute top-1 left-1/4 w-32 h-0.5 bg-amber-400/80 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center space-y-6">
        {/* 3D Fallen Shipping Container Graphic */}
        <div className="relative w-64 h-36 md:w-80 md:h-44 preserve-3d transition-transform duration-700">
          {/* Ground Impact Shadow */}
          <div className="absolute -bottom-6 inset-x-4 h-8 bg-black/70 blur-xl rounded-full" />

          {/* The Fallen Container: tilted and askew */}
          <div
            onClick={() => setIsRepaired(!isRepaired)}
            className={`w-full h-full rounded-md shadow-2xl relative cursor-pointer border border-white/20 transition-all duration-500 ${
              isRepaired
                ? 'rotate-0 translate-y-0 scale-100 bg-[#1e6878]'
                : '-rotate-12 translate-y-2 scale-95 bg-[#a33226]'
            }`}
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.4) 0px,
                  rgba(0, 0, 0, 0.4) 5px,
                  transparent 5px,
                  transparent 14px,
                  rgba(255, 255, 255, 0.15) 14px,
                  rgba(255, 255, 255, 0.15) 16px
                ),
                linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.2) 0%,
                  transparent 30%,
                  rgba(0, 0, 0, 0.5) 100%
                )
              `
            }}
          >
            {/* Industrial corner castings */}
            <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />

            {/* Lock rods */}
            <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[2px] bg-slate-300/60" />

            {/* Container Stencil */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-3 text-center">
              <span className="font-mono font-black text-2xl md:text-3xl tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
                {isRepaired ? 'CONTAINER SECURED' : 'CONTAINER 404'}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-amber-300 uppercase mt-0.5">
                {isRepaired ? 'HOIST READY' : 'STATUS: OVERBOARD'}
              </span>
            </div>

            {/* Hazard Stripe Bottom Bar */}
            <div
              className="absolute bottom-0 inset-x-0 h-2 opacity-60 rounded-b-md"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 6px, #f59e0b 6px, #f59e0b 12px)'
              }}
            />
          </div>
        </div>

        {/* Headline & Story */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 font-mono text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>LOST AT SEA</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            This page fell off the ship.
          </h1>

          <p className="text-xs md:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            The cargo container you were looking for was lost during sea transit or never made it onto the dock manifests.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-lg shadow-blue-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to The Depot</span>
          </Link>

          <Link
            href="/studio/work"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-colors"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Open The Studio</span>
          </Link>

          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e1f20] hover:bg-[#282a2c] text-slate-300 hover:text-white font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search (Cmd+K)</span>
          </button>
        </div>

        {/* Helper footnote */}
        <div className="text-[11px] font-mono text-slate-500 pt-4">
          Tip: Tap the fallen container to attempt emergency repairs.
        </div>
      </div>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </div>
  );
}
