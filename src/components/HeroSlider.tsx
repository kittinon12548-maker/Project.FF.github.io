"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { INITIAL_HERO_SLIDES, HeroSlide } from "@/data/mockData";

const CLONES = 2; // Clone 2 slides before and after for true infinite looping balance

export default function HeroSlider() {
  const slides: HeroSlide[] = INITIAL_HERO_SLIDES;
  const N = slides.length;

  // Extended slides with clones on both ends
  const extendedSlides = [
    ...slides.slice(-CLONES),
    ...slides,
    ...slides.slice(0, CLONES),
  ];

  // extendedIndex starts at CLONES (which is Slide 0: The Family Plan 2)
  const [extendedIndex, setExtendedIndex] = useState(CLONES);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Layout measurements
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1400);
  const [cardWidth, setCardWidth] = useState(1150);
  const gap = 16; // Gap between cards in px

  // Touch and mouse drag states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  // Measure and compute responsive card dimensions
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const cWidth = containerRef.current.clientWidth;
      setContainerWidth(cWidth);

      // Card width logic matching Apple TV gallery proportions:
      // Mobile (<640px): ~86% of container width
      // Tablet (<1024px): ~78% of container width
      // Desktop: ~70% of container width, capped at 1220px
      let width = Math.min(1220, cWidth * 0.70);
      if (cWidth < 640) {
        width = Math.round(cWidth * 0.86);
      } else if (cWidth < 1024) {
        width = Math.round(cWidth * 0.78);
      }
      setCardWidth(width);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Re-enable transitions after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setExtendedIndex((prev) => prev + 1);
  }, []);

  const goToPrev = useCallback(() => {
    setIsTransitioning(true);
    setExtendedIndex((prev) => prev - 1);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setIsTransitioning(true);
    setExtendedIndex(CLONES + slideIndex);
  };

  // Infinite looping boundary transition handler
  const handleTransitionEnd = () => {
    if (extendedIndex >= CLONES + N) {
      setIsTransitioning(false);
      setExtendedIndex(extendedIndex - N);
    } else if (extendedIndex < CLONES) {
      setIsTransitioning(false);
      setExtendedIndex(extendedIndex + N);
    }
  };

  // Real active slide index (0 to N - 1)
  const activeRealIndex = (extendedIndex - CLONES + N) % N;

  // Auto-play timer (4.16s, matching Apple TV spec)
  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const timer = setInterval(() => {
      goToNext();
    }, 4160);

    return () => clearInterval(timer);
  }, [isPlaying, isDragging, goToNext, extendedIndex]);

  // Drag / Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragDelta(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragDelta < -60) {
      goToNext();
    } else if (dragDelta > 60) {
      goToPrev();
    }
    setIsDragging(false);
    setDragDelta(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDelta(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragDelta(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragDelta < -60) {
      goToNext();
    } else if (dragDelta > 60) {
      goToPrev();
    }
    setIsDragging(false);
    setDragDelta(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      if (dragDelta < -60) {
        goToNext();
      } else if (dragDelta > 60) {
        goToPrev();
      }
      setIsDragging(false);
      setDragDelta(0);
    }
  };

  // Center alignment offset formula:
  // Offset to center the active card (at extendedIndex)
  const centerBaseOffset = (containerWidth - cardWidth) / 2;
  const currentOffset = centerBaseOffset - extendedIndex * (cardWidth + gap) + dragDelta;

  return (
    <section
      className="section-endless-entertainment-gallery relative w-full overflow-hidden bg-neutral-100/60 dark:bg-neutral-950 py-3 sm:py-5 select-none"
      data-analytics-region="endless-entertainment-gallery"
      aria-label="แกลเลอรี่รายการ ภาพยนตร์ และกีฬาของ Apple TV"
    >
      {/* Gallery Track Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex items-center"
          style={{
            transform: `translate3d(${currentOffset}px, 0px, 0px)`,
            transition:
              isDragging || !isTransitioning
                ? "none"
                : "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)",
            gap: `${gap}px`,
          }}
        >
          {extendedSlides.map((slide, i) => {
            const isActive = i === extendedIndex;

            return (
              <div
                key={`${slide.id}-${i}`}
                onClick={() => {
                  if (isDragging && Math.abs(dragDelta) > 10) return;
                  if (!isActive) {
                    setIsTransitioning(true);
                    setExtendedIndex(i);
                  }
                }}
                className={`relative flex-shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-out select-none ${
                  isActive
                    ? "opacity-100 shadow-2xl scale-100 cursor-default"
                    : "opacity-65 hover:opacity-85 shadow-lg scale-[0.985] cursor-pointer"
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: "clamp(260px, 48vw, 620px)",
                }}
              >
                {/* Background Image Artwork */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover select-none pointer-events-none transform-gpu"
                    draggable={false}
                  />
                  {/* Subtle Top & Bottom Gradients for UI contrast */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                </div>



                {/* Bottom Left Content (White Pill Button + Genre & Tagline) */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-7 left-4 sm:left-7 right-4 sm:right-7 z-20 flex items-center gap-3 sm:gap-4 flex-wrap select-none">
                  <Link
                    href={slide.primaryBtnHref}
                    onClick={(e) => {
                      if (isDragging && Math.abs(dragDelta) > 5) {
                        e.preventDefault();
                      }
                      e.stopPropagation();
                    }}
                    className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{slide.primaryBtnText || "สตรีมเลย"}</span>
                  </Link>

                  <p className="text-white text-xs sm:text-sm md:text-base font-light drop-shadow-md flex items-center gap-2">
                    <span className="font-bold text-white">{slide.genre}</span>
                    <span className="text-white/60">•</span>
                    <span className="text-white/90 line-clamp-1">
                      {slide.tagline || slide.subtitle}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Apple-style Dot Navigation & Play/Pause Controller */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-3 sm:mt-4 flex items-center justify-center relative select-none">
        {/* Dotnav List */}
        <div
          className="flex items-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="แถบเลือกเรื่อง Apple TV Gallery"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === activeRealIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`เรื่องที่ ${idx + 1} - ${slide.title}`}
                onClick={() => goToSlide(idx)}
                className="group relative py-1 px-0.5 cursor-pointer focus:outline-none"
              >
                {isActive ? (
                  <span className="block w-9 sm:w-12 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 overflow-hidden relative">
                    <span
                      key={`${activeRealIndex}-${isPlaying}`}
                      className="block h-full bg-neutral-900 dark:bg-white rounded-full"
                      style={{
                        animation: isPlaying
                          ? "appleDotProgress 4160ms linear forwards"
                          : "none",
                        width: isPlaying ? undefined : "100%",
                      }}
                    />
                  </span>
                ) : (
                  <span className="block w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-500 dark:group-hover:bg-neutral-500 transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="absolute right-4 sm:right-6 md:right-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
          aria-label={isPlaying ? "หยุดพักแกลเลอรี่" : "เล่นแกลเลอรี่"}
          title={isPlaying ? "หยุดพักแกลเลอรี่" : "เล่นแกลเลอรี่"}
        >
          {isPlaying ? (
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="m21.7334 36.67h2.5342c1.1483 0 1.7324-.5796 1.7324-1.7193v-13.9015c0-1.12-.5841-1.6898-1.7324-1.7193h-2.5342c-1.1483 0-1.7324.5698-1.7324 1.7193v13.9015c-.0297 1.1396.5544 1.7193 1.7324 1.7193zm9.9992 0h2.5347c1.1485 0 1.7327-.5796 1.7327-1.7193v-13.9015c0-1.12-.5842-1.7193-1.7327-1.7193h-2.5347c-1.1485 0-1.7327.5698-1.7327 1.7193v13.9015c0 1.1396.5545 1.7193 1.7327 1.7193z" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="m23.7555 36.6237c.4478 0 .8598-.1343 1.4241-.4568l10.9178-6.3322c.8598-.5016 1.3614-1.021 1.3614-1.8361 0-.8061-.5016-1.3255-1.3614-1.8271l-10.9178-6.3322c-.5643-.3314-.9762-.4657-1.4241-.4657-.9315 0-1.7555.7165-1.7555 1.9435v13.3629c0 1.227.824 1.9435 1.7555 1.9435z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
