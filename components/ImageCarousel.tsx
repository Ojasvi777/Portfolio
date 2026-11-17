'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselImage {
  src: string;
  caption?: string;
  alt?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number; // default 2500ms
  className?: string;
}

export default function ImageCarousel({
  images,
  autoPlayInterval = 2500,
  className = ''
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  // Fallback safe images list: if empty, default to neutral graphic
  const safeImages = images.length > 0 ? images : [{ src: '/projects/stageconnect.svg', caption: 'StageConnect' }];

  // Autoplay timer: changes slide every 2-3 seconds
  useEffect(() => {
    if (isPaused || safeImages.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, safeImages.length, autoPlayInterval]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const currentImage = safeImages[currentIndex] || safeImages[0];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div
      className={`relative w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Image */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.src}
                alt={currentImage.alt || currentImage.caption || 'Photo'}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                unoptimized
                priority
                onError={(e) => {
                  // Fallback safely to neutral graphic without rendering broken image
                  const target = e.target as HTMLImageElement;
                  if (target.src && !target.src.includes('stageconnect.svg')) {
                    target.src = '/projects/stageconnect.svg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            {/* Slide Caption */}
            {currentImage.caption && (
              <div className="absolute bottom-2 left-2.5 right-24 z-10 pointer-events-none">
                <span className="inline-block px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-mono text-white/90 truncate max-w-full pointer-events-auto shadow-md">
                  {currentImage.caption}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Visible on hover or touch) */}
      {safeImages.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 md:w-7 md:h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs border border-white/20"
          >
            <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 md:w-7 md:h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs border border-white/20"
          >
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-1.5 right-2 z-20 flex items-center gap-1">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full ${
                  idx === currentIndex
                    ? 'w-4 h-1 bg-white'
                    : 'w-1.5 h-1 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
