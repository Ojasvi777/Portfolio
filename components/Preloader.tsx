'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if preloader has already played in this browser session
    const hasLoaded = sessionStorage.getItem('ojasvi_depot_preloader_seen');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Run entrance sequence: 2.2 seconds total
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('ojasvi_depot_preloader_seen', 'true');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-[#0c51cf] flex flex-col justify-between items-center pointer-events-auto select-none overflow-hidden"
        >
          {/* Top Crane Rail */}
          <div className="relative w-full h-3 bg-gradient-to-b from-white via-slate-200 to-slate-400 border-b border-slate-400 shadow-md">
            <div className="absolute top-0.5 inset-x-0 h-[1px] bg-slate-400/50" />
          </div>

          {/* Crane & Container Descending Sequence */}
          <div className="relative flex-1 flex flex-col items-center justify-center">
            {/* Trolley, Hoist & Container Assembly */}
            <motion.div
              initial={{ y: -160, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center"
            >
              {/* White Trolley Carriage */}
              <div className="relative w-16 h-8 bg-white rounded-xs border border-slate-300 shadow-xl flex items-center justify-center">
                <div className="w-8 h-2 bg-slate-200 rounded-xs border border-slate-300" />
              </div>

              {/* Hoist Arm */}
              <div className="w-1.5 h-16 bg-white shadow-sm" />

              {/* Spreader Claw */}
              <div className="relative -mt-0.5 w-32 h-4 bg-white rounded-xs border border-slate-300 shadow-xl flex items-center justify-between px-1">
                <div className="w-3 h-8 bg-white rounded-b border border-slate-300 -mb-6" />
                <div className="w-12 h-1 bg-blue-500 rounded-full" />
                <div className="w-3 h-8 bg-white rounded-b border border-slate-300 -mb-6" />
              </div>

              {/* The Name Container: "OJASVI" */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mt-1 w-52 md:w-64 h-32 md:h-36 rounded-sm shadow-2xl bg-[#be2e26] border border-white/20 flex flex-col items-center justify-center"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      rgba(0, 0, 0, 0.35) 0px,
                      rgba(0, 0, 0, 0.35) 4px,
                      transparent 4px,
                      transparent 12px,
                      rgba(255, 255, 255, 0.15) 12px,
                      rgba(255, 255, 255, 0.15) 14px
                    ),
                    linear-gradient(
                      180deg,
                      rgba(255, 255, 255, 0.2) 0%,
                      transparent 25%,
                      rgba(0, 0, 0, 0.45) 100%
                    )
                  `
                }}
              >
                {/* ISO Corner Castings */}
                <div className="absolute top-1 left-1 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />
                <div className="absolute top-1 right-1 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />
                <div className="absolute bottom-1 left-1 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-slate-900 border border-white/30 rounded-xs" />

                {/* Stencil Name Typography */}
                <div className="relative z-10 text-center">
                  <span className="font-mono font-black text-3xl md:text-4xl tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
                    OJASVI
                  </span>
                  <div className="text-[10px] font-mono tracking-widest text-white/80 uppercase mt-1">
                    CONTAINER NO. 01 · DEPOT 2026
                  </div>
                </div>

                {/* Ground Touchdown Shadow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-4 inset-x-4 h-3 bg-black/60 blur-md rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Dock Status Line */}
          <div className="pb-8 text-center">
            <span className="text-xs font-mono text-white/80 tracking-widest uppercase animate-pulse">
              HOISTING CARGO MANIFEST // INITIALIZING THE DEPOT
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
