'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EvidenceChip from '@/components/EvidenceChip';
import ImageCarousel from '@/components/ImageCarousel';
import DepotManifestModal, { ManifestTab } from '@/components/DepotManifestModal';
import { CONTAINERS_DATA, ContainerItem } from '@/lib/containersData';
import { ExternalLink, X, ArrowRight } from 'lucide-react';

export default function DepotScene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeContainerId, setActiveContainerId] = useState<string | null>(null);
  const [pickedUpId, setPickedUpId] = useState<string | null>(null);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Crane dynamic coordinates:
  // Starts centered at 50%, with high retracted cable (8vh)
  const [craneX, setCraneX] = useState<number>(50);
  const [craneCableVh, setCraneCableVh] = useState<number>(8);

  // Extension Manifest Popup state
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [manifestInitialTab, setManifestInitialTab] = useState<ManifestTab>('work');

  // References for keyboard trapping & return focus
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Reduced motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const activeContainer = CONTAINERS_DATA.find((c) => c.id === activeContainerId) || null;

  // OPEN CONTAINER INTERACTION WITH PHYSICAL CRANE CHOREOGRAPHY
  const handleOpenContainer = useCallback(
    (id: string) => {
      if (isAnimating) return;
      const target = CONTAINERS_DATA.find((c) => c.id === id);
      if (!target) return;

      // If already open, do nothing
      if (activeContainerId === id && doorsOpen) return;

      // If another container is currently open: close it, return it, then move to new one
      if (activeContainerId && activeContainerId !== id) {
        const current = CONTAINERS_DATA.find((c) => c.id === activeContainerId);
        if (!current) return;

        setIsAnimating(true);
        // Phase 1: Shut barn doors
        setDoorsOpen(false);

        setTimeout(() => {
          // Phase 2: Return current container to its dock
          setCraneX(current.trolleyPercent);
          setCraneCableVh(current.clawHeightVh);

          setTimeout(() => {
            // Phase 3: Unclasp and retract cable
            setActiveContainerId(null);
            setPickedUpId(null);
            setCraneCableVh(8);

            setTimeout(() => {
              // Phase 4: Glide along rail from old container to new container
              setCraneX(target.trolleyPercent);

              setTimeout(() => {
                // Phase 5: Lower claw down onto new container
                setCraneCableVh(target.clawHeightVh);

                setTimeout(() => {
                  // Phase 6: Clasp & lift new container up to center
                  setPickedUpId(target.id);
                  setActiveContainerId(target.id);
                  setCraneX(50);
                  setCraneCableVh(12);

                  setTimeout(() => {
                    // Phase 7: Barn doors swing open
                    setDoorsOpen(true);
                    setIsAnimating(false);
                  }, 480);
                }, 350);
              }, 400);
            }, 250);
          }, 450);
        }, 350);
        return;
      }

      // Standard pick from idle center (50%)
      setIsAnimating(true);

      if (prefersReducedMotion) {
        setCraneX(50);
        setCraneCableVh(12);
        setPickedUpId(id);
        setActiveContainerId(id);
        setDoorsOpen(true);
        setIsAnimating(false);
        return;
      }

      // Step 1: Slide crane trolley from center (50%) across rail to target container
      setCraneX(target.trolleyPercent);
      setCraneCableVh(8);

      setTimeout(() => {
        // Step 2: Lower hoist cable down to clasp container
        setCraneCableVh(target.clawHeightVh);

        setTimeout(() => {
          // Step 3: Locked on! Lift container up and glide to center (50%)
          setPickedUpId(target.id);
          setActiveContainerId(target.id);
          setCraneX(50);
          setCraneCableVh(12);

          setTimeout(() => {
            // Step 4: Barn doors swing wide open
            setDoorsOpen(true);
            setIsAnimating(false);
          }, 480);
        }, 350);
      }, 420);
    },
    [isAnimating, activeContainerId, doorsOpen, prefersReducedMotion]
  );

  // CLOSE CONTAINER INTERACTION: RETURN TO DOCK & GLIDE BACK TO CENTER
  const handleCloseContainer = useCallback(() => {
    if (isAnimating || !activeContainerId) return;
    const current = CONTAINERS_DATA.find((c) => c.id === activeContainerId);
    if (!current) return;

    setIsAnimating(true);

    if (prefersReducedMotion) {
      setDoorsOpen(false);
      setActiveContainerId(null);
      setPickedUpId(null);
      setCraneX(50);
      setCraneCableVh(8);
      setIsAnimating(false);
      return;
    }

    // Step 1: Barn doors swing shut
    setDoorsOpen(false);

    setTimeout(() => {
      // Step 2: Crane carries container back to its dock spot
      setCraneX(current.trolleyPercent);
      setCraneCableVh(current.clawHeightVh);

      setTimeout(() => {
        // Step 3: Touchdown! Release container and retract cable
        setPickedUpId(null);
        setActiveContainerId(null);
        setCraneCableVh(8);

        setTimeout(() => {
          // Step 4: Empty crane smoothly glides all the way back to CENTER (50%)!
          setCraneX(50);

          setTimeout(() => {
            setIsAnimating(false);
            const origIndex = CONTAINERS_DATA.findIndex((c) => c.id === current.id);
            if (origIndex >= 0 && triggerRefs.current[origIndex]) {
              triggerRefs.current[origIndex]?.focus();
            }
          }, 420);
        }, 250);
      }, 460);
    }, 350);
  }, [isAnimating, activeContainerId, prefersReducedMotion]);

  // Open the Depot Manifest modal directly without leaving the page
  const handleOpenManifest = (tab: ManifestTab) => {
    setManifestInitialTab(tab);
    setIsManifestOpen(true);
  };

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isManifestOpen) {
          setIsManifestOpen(false);
        } else if (activeContainerId) {
          e.preventDefault();
          handleCloseContainer();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeContainerId, handleCloseContainer, isManifestOpen]);

  // Focus trap inside opened dialog
  useEffect(() => {
    if (doorsOpen && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }
  }, [doorsOpen]);

  return (
    <div className="relative w-full min-h-screen bg-[#1260e6] text-white overflow-hidden select-none font-sans">
      {/* =========================================================================
          DESKTOP DEPOT YARD SCENE (>= 768px): 100% Visual Parity with Blueprint
         ========================================================================= */}
      <div className="hidden md:block w-full h-screen relative overflow-hidden bg-[#1260e6]">

        {/* ================= TOP NAVIGATION HEADER ================= */}
        <header className="relative w-full z-40 px-8 lg:px-12 pt-5 flex items-center justify-between text-white">
          <div className="flex flex-col">
            <span className="font-extrabold text-3xl tracking-tight text-white leading-none">
              Ojasvi
            </span>
            <span className="text-[10px] font-mono tracking-widest text-blue-100/80 uppercase mt-1">
              OJASVI&apos;S DEPOT · 7 CONTAINERS · 2026
            </span>
          </div>

          <nav className="flex items-center gap-7 lg:gap-10 text-xs font-semibold tracking-wide">
            <button
              onClick={() => handleOpenManifest('work')}
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={() => handleOpenManifest('leadership')}
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              Leadership
            </button>
            <button
              onClick={() => handleOpenManifest('cases')}
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              PM Work
            </button>
            <button
              onClick={() => handleOpenManifest('about')}
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleOpenManifest('contact')}
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => handleOpenManifest('contact')}
              className="text-white hover:text-white flex items-center gap-1.5 font-bold text-xs bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full border border-white/25 transition-all shadow-sm cursor-pointer"
            >
              <span>Let&apos;s Talk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </nav>
        </header>

        {/* ================= OVERHEAD GANTRY CRANE TOP RAIL ================= */}
        <div className="relative w-full z-30 pt-3">
          {/* Continuous rail beam spanning 100% of viewport */}
          <div className="relative w-full h-2.5 bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#cbd5e1] border-b border-slate-400 shadow-sm">
            <div className="absolute top-0.5 inset-x-0 h-[1px] bg-slate-300/80" />
            <div className="absolute inset-0 flex justify-between items-center px-6 pointer-events-none opacity-50">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600 shadow-xs" />
              ))}
            </div>
          </div>

          {/* CRANE TROLLEY, HOIST ROD & SPREADER CLAW */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute top-1 pointer-events-none z-30 flex flex-col items-center"
              initial={false}
              animate={{
                left: `${craneX}%`,
                x: '-50%'
              }}
              transition={{
                type: 'spring',
                stiffness: 95,
                damping: 20,
                mass: 0.95
              }}
            >
              {/* White Mechanical Trolley Runner Carriage */}
              <div className="relative w-16 h-7 bg-white rounded-xs border border-slate-300 shadow-xl flex items-center justify-center">
                {/* Upper steel runner wheels */}
                <div className="absolute -top-1.5 inset-x-2 flex justify-between">
                  <div className="w-2.5 h-2 bg-slate-300 rounded-xs border border-slate-400" />
                  <div className="w-2.5 h-2 bg-slate-300 rounded-xs border border-slate-400" />
                </div>
                {/* 2 Circular Rivets on front face */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-500 shadow-inner" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-500 shadow-inner" />
                </div>
              </div>

              {/* Vertical Hoist Shaft Rod */}
              <motion.div
                className="w-2 bg-white shadow-md"
                initial={false}
                animate={{
                  height: `${craneCableVh}vh`
                }}
                transition={{
                  type: 'spring',
                  stiffness: 95,
                  damping: 20
                }}
              />

              {/* White Spreader Bar Frame with Two Drop Claws */}
              <div className="relative -mt-0.5 w-44 lg:w-52 h-4 bg-white rounded-xs border border-slate-300 shadow-2xl flex items-center justify-between px-1">
                {/* Left vertical drop leg */}
                <div className="w-3.5 h-9 bg-white rounded-b-xs border-r border-b border-l border-slate-300 shadow-md -mb-7" />
                {/* Center hoist indicator */}
                <div className="w-14 h-1.5 bg-slate-300 rounded-full" />
                {/* Right vertical drop leg */}
                <div className="w-3.5 h-9 bg-white rounded-b-xs border-r border-b border-l border-slate-300 shadow-md -mb-7" />
              </div>
            </motion.div>
          )}
        </div>

        {/* ================= GIGANTIC BACKGROUND TYPOGRAPHY: "PORTFOLIO" ================= */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
          style={{ top: '6%' }}
          aria-hidden="true"
        >
          <span
            className="font-black text-white uppercase select-none leading-none tracking-tight opacity-95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            style={{
              fontSize: '17vw',
              letterSpacing: '-0.04em'
            }}
          >
            PORTFOLIO
          </span>
        </div>

        {/* ================= 7 GROUND CONTAINERS YARD (PHYSICAL 3D DOCK) ================= */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {CONTAINERS_DATA.map((container, idx) => {
            const isHovered = hoveredIndex === idx;
            const isPickedUp = pickedUpId === container.id;

            return (
              <div
                key={container.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${container.dockLeft}%`,
                  top: `${container.dockTop}%`,
                  transform: `rotate(${container.angle}deg)`,
                  transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                {/* Empty Dock Slot when container is picked up by crane */}
                {isPickedUp ? (
                  <div
                    className="w-[190px] lg:w-[220px] h-[95px] lg:h-[110px] rounded-xs border-2 border-dashed border-white/35 bg-black/20 pointer-events-none"
                  />
                ) : (
                  <motion.button
                    ref={(el) => { triggerRefs.current[idx] = el; }}
                    onClick={() => handleOpenContainer(container.id)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(idx)}
                    onBlur={() => setHoveredIndex(null)}
                    disabled={isAnimating}
                    aria-label={`Open container: ${container.label}`}
                    tabIndex={0}
                    className="relative block w-[190px] lg:w-[220px] h-[95px] lg:h-[110px] rounded-xs focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1260e6] cursor-pointer group"
                    style={{
                      backgroundColor: container.color,
                      transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                      transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease',
                      boxShadow: isHovered
                        ? '0 24px 38px -6px rgba(0,0,0,0.55), 0 0 20px rgba(255,255,255,0.2)'
                        : '0 14px 28px -4px rgba(0,0,0,0.45)'
                    }}
                  >
                    {/* Realistic 3D Top Shaded Bevel */}
                    <div
                      className="absolute -top-3.5 inset-x-0 h-3.5 rounded-t-xs pointer-events-none opacity-90"
                      style={{
                        backgroundColor: container.colorDark,
                        transform: 'skewX(-28deg)',
                        transformOrigin: 'bottom left'
                      }}
                    />

                    {/* Corrugated Vertical Ribbed Steel Texture */}
                    <div
                      className="absolute inset-0 rounded-xs pointer-events-none opacity-85"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            90deg,
                            rgba(0, 0, 0, 0.35) 0px,
                            rgba(0, 0, 0, 0.35) 5px,
                            transparent 5px,
                            transparent 13px,
                            rgba(255, 255, 255, 0.2) 13px,
                            rgba(255, 255, 255, 0.2) 15px
                          ),
                          linear-gradient(
                            180deg,
                            rgba(255, 255, 255, 0.25) 0%,
                            transparent 25%,
                            rgba(0, 0, 0, 0.4) 100%
                          )
                        `
                      }}
                    />

                    {/* Corner Castings */}
                    <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#121620] border border-white/20 rounded-xs" />
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#121620] border border-white/20 rounded-xs" />
                    <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-[#121620] border border-white/20 rounded-xs" />
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#121620] border border-white/20 rounded-xs" />

                    {/* Vertical Center Lock Seam */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/60" />
                    <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-[2px] bg-slate-200/50 rounded-full" />

                    {/* Container Face Stencil Typography: 2 Lines */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 text-center select-none leading-none">
                      <span className="font-mono font-black tracking-tight text-white text-base lg:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
                        {container.splitLabel[0]}
                      </span>
                      <span className="font-mono font-black tracking-tight text-white text-base lg:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase mt-0.5">
                        {container.splitLabel[1]}
                      </span>
                    </div>

                    {/* Cast Ground Shadow Under Container */}
                    <div className="absolute -bottom-3 inset-x-2 h-2.5 bg-black/45 blur-xs rounded-full pointer-events-none" />
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM CENTER BUTTON: "PICK A CONTAINER ↓" ================= */}
        <div className="absolute bottom-5 inset-x-0 flex justify-center z-20 pointer-events-auto">
          <button
            onClick={() => handleOpenContainer('say-hello')}
            className="px-5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-mono text-[11px] font-bold tracking-widest uppercase transition-all shadow-md backdrop-blur-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>PICK A CONTAINER</span>
            <span className="text-sm">↓</span>
          </button>
        </div>

        {/* ================= OPEN CONTAINER SHOWCASE (CRANE LIFTED + BARN DOORS SWUNG OPEN) ================= */}
        <AnimatePresence>
          {activeContainer && (
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center">
              {/* Subtle Yard Dimmer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={handleCloseContainer}
                className="absolute inset-0 bg-[#06193d]/50 backdrop-blur-[2px] cursor-pointer pointer-events-auto"
              />

              {/* Lifted Container Assembly (Held right under top crane claw) */}
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={activeContainer.label}
                initial={
                  !prefersReducedMotion
                    ? {
                        y: 340,
                        scale: 0.5,
                        opacity: 0.8
                      }
                    : { opacity: 0, scale: 0.95 }
                }
                animate={
                  !prefersReducedMotion
                    ? {
                        y: 0,
                        scale: 1,
                        opacity: 1
                      }
                    : { opacity: 1, scale: 1 }
                }
                exit={
                  !prefersReducedMotion
                    ? {
                        y: 340,
                        scale: 0.5,
                        opacity: 0
                      }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 20
                }}
                className="relative mt-20 lg:mt-24 w-[92vw] max-w-[860px] min-h-[430px] rounded-xl shadow-2xl pointer-events-auto"
                style={{
                  perspective: '1400px'
                }}
              >
                {/* Spreader Claw gripping the top of the container */}
                <div className="absolute -top-6 inset-x-16 h-4 bg-white rounded-xs border border-slate-300 shadow-xl flex items-center justify-between px-2 pointer-events-none z-40">
                  <div className="w-3.5 h-6 bg-white rounded-b border border-slate-400 -mb-4 shadow-sm" />
                  <div className="w-20 h-1 bg-slate-300 rounded-full" />
                  <div className="w-3.5 h-6 bg-white rounded-b border border-slate-400 -mb-4 shadow-sm" />
                </div>

                {/* ================= 3D CONTAINER BARN DOORS (SWING OUTWARD) ================= */}
                {/* Left Door */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: doorsOpen ? -78 : 0 }}
                  exit={{ rotateY: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute inset-y-0 left-0 w-1/2 z-30 pointer-events-none rounded-l-xl border-r border-black/40 shadow-2xl"
                  style={{
                    backgroundColor: activeContainer.color,
                    transformOrigin: 'left center',
                    backgroundImage: `
                      repeating-linear-gradient(
                        90deg,
                        rgba(0, 0, 0, 0.35) 0px,
                        rgba(0, 0, 0, 0.35) 6px,
                        transparent 6px,
                        transparent 16px,
                        rgba(255, 255, 255, 0.18) 16px,
                        rgba(255, 255, 255, 0.18) 18px
                      ),
                      linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 0.25) 0%,
                        transparent 25%,
                        rgba(0, 0, 0, 0.4) 100%
                      )
                    `
                  }}
                >
                  <div className="absolute top-2 left-2 w-3 h-3 bg-[#111622] border border-white/20 rounded-xs" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#111622] border border-white/20 rounded-xs" />
                </motion.div>

                {/* Right Door */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: doorsOpen ? 78 : 0 }}
                  exit={{ rotateY: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute inset-y-0 right-0 w-1/2 z-30 pointer-events-none rounded-r-xl border-l border-black/40 shadow-2xl"
                  style={{
                    backgroundColor: activeContainer.color,
                    transformOrigin: 'right center',
                    backgroundImage: `
                      repeating-linear-gradient(
                        90deg,
                        rgba(0, 0, 0, 0.35) 0px,
                        rgba(0, 0, 0, 0.35) 6px,
                        transparent 6px,
                        transparent 16px,
                        rgba(255, 255, 255, 0.18) 16px,
                        rgba(255, 255, 255, 0.18) 18px
                      ),
                      linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 0.25) 0%,
                        transparent 25%,
                        rgba(0, 0, 0, 0.4) 100%
                      )
                    `
                  }}
                >
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#111622] border border-white/20 rounded-xs" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#111622] border border-white/20 rounded-xs" />
                </motion.div>

                {/* ================= DARK CORRUGATED INTERIOR (REVEALED INSIDE) ================= */}
                <div className="relative w-full h-full p-6 lg:p-8 rounded-xl border border-slate-700/80 bg-[#0d0f14] overflow-hidden flex flex-col justify-between shadow-2xl">
                  {/* Vertical corrugated shadow ribs */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, transparent 2px, transparent 22px)'
                    }}
                  />

                  {/* Top Header inside container */}
                  <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                        {activeContainer.num} / {activeContainer.label}
                      </span>
                    </div>

                    <button
                      ref={closeButtonRef}
                      onClick={handleCloseContainer}
                      aria-label="Close container"
                      className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Interior Content Grid */}
                  <div className="relative z-10 py-3 grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                    {/* LEFT COLUMN: 2.5s Auto-scrolling Image Carousel */}
                    <div className="md:col-span-5 w-full h-[220px] lg:h-[240px] rounded-lg overflow-hidden shadow-xl border border-white/10">
                      <ImageCarousel
                        images={activeContainer.images}
                        autoPlayInterval={2500}
                        className="w-full h-full"
                      />
                    </div>

                    {/* RIGHT COLUMN: Headline, Tags, Description & Evidence Chips */}
                    <div className="md:col-span-7 flex flex-col justify-center space-y-3">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
                          {activeContainer.headline}{' '}
                          {activeContainer.highlightWord && (
                            <span className="text-red-500 font-extrabold">
                              {activeContainer.highlightWord}
                            </span>
                          )}
                        </h2>
                      </div>

                      {/* Pill Tags Row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeContainer.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Descriptive Paragraph */}
                      <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
                        {activeContainer.description}
                      </p>

                      {/* Evidence Chips */}
                      {activeContainer.evidenceChips && activeContainer.evidenceChips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {activeContainer.evidenceChips.map((chip, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1.5 text-[11px] font-mono text-slate-200 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                            >
                              <span>{chip.label}</span>
                              <EvidenceChip
                                type={chip.type}
                                method={chip.method}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Footer: Open Depot Manifest CTA (Keeps user in Depot layer!) */}
                  <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">Esc</kbd> or click outside to close
                    </span>

                    <button
                      onClick={() => handleOpenManifest(activeContainer.manifestTab)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-400/40 cursor-pointer"
                    >
                      <span>{activeContainer.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          DEPOT EXTENSION MANIFEST MODAL (Full Reading Blueprint Overlay)
         ========================================================================= */}
      <DepotManifestModal
        isOpen={isManifestOpen}
        initialTab={manifestInitialTab}
        onClose={() => setIsManifestOpen(false)}
      />

      {/* =========================================================================
          MOBILE FALLBACK (< 768px): Clean Stacked Cards
         ========================================================================= */}
      <div className="block md:hidden min-h-screen px-4 py-8 bg-[#1260e6] text-white">
        <div className="text-center pb-6">
          <h1 className="font-extrabold text-3xl font-bold">Ojasvi</h1>
          <p className="text-xs font-mono text-blue-100 uppercase mt-1">
            OJASVI&apos;S DEPOT · 7 CONTAINERS
          </p>
        </div>

        <div className="space-y-4">
          {CONTAINERS_DATA.map((container) => (
            <div
              key={container.id}
              className="p-5 rounded-xl border border-white/20 shadow-lg"
              style={{ backgroundColor: container.color }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs uppercase font-bold text-white/80">
                  {container.num} / {container.label}
                </span>
                <button
                  onClick={() => handleOpenManifest(container.manifestTab)}
                  className="p-1.5 bg-black/30 rounded-full hover:bg-black/50 text-white cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{container.headline}</h3>
              <p className="text-xs text-white/90 leading-relaxed mb-3">{container.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {container.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-black/25 text-[10px] font-mono text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleOpenManifest(container.manifestTab)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>{container.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
