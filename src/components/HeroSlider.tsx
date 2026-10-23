"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { INITIAL_HERO_SLIDES } from "@/data/mockData";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = INITIAL_HERO_SLIDES;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[58vh] md:h-[66vh] lg:h-[72vh] min-h-[340px] sm:min-h-[400px] max-h-[680px] overflow-hidden bg-neutral-950 group select-none transition-all duration-300">
      {/* Slides Container */}
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background ambient glow/blur */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={slide.imageUrl}
                  alt=""
                  className="w-full h-full object-cover blur-3xl scale-150 opacity-60 transform-gpu"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/45 backdrop-brightness-90"></div>
              </div>

              {/* Main Banner Foreground Content */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-300 mb-2">
                  OFFICIAL COLLECTION
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wider max-w-4xl drop-shadow-md uppercase">
                  {slide.title}
                </h2>
                <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-neutral-200 max-w-2xl font-light leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
                  <Link
                    href={slide.primaryBtnHref}
                    className="px-6 sm:px-8 py-3 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {slide.primaryBtnText}
                  </Link>
                  <Link
                    href={slide.secondaryBtnHref}
                    className="px-6 sm:px-8 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/30 backdrop-blur-sm text-xs sm:text-sm font-semibold transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {slide.secondaryBtnText}
                  </Link>
                </div>
              </div>

              {/* Gradient Bottom Shadow */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Prev Navigation Button */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/80 hover:bg-white text-neutral-900 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-95 cursor-pointer focus:outline-none"
        title="สไลด์ก่อนหน้า"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 text-neutral-900" />
      </button>

      {/* Next Navigation Button */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/80 hover:bg-white text-neutral-900 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-95 cursor-pointer focus:outline-none"
        title="สไลด์ถัดไป"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 text-neutral-900" />
      </button>

      {/* Carousel Progress Indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md select-none">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className="group relative py-1 px-0.5 cursor-pointer focus:outline-none"
            title={`ไปที่สไลด์ ${i + 1}`}
          >
            <span className="block w-8 sm:w-12 md:w-16 h-[3px] rounded-full bg-white/30 group-hover:bg-white/60 overflow-hidden transition-colors">
              {i === currentSlide && (
                <span
                  key={currentSlide}
                  className="block h-full bg-[#ff6900] rounded-full"
                  style={{
                    animation: isPlaying ? "heroSlideProgress 5500ms linear forwards" : "none",
                    width: isPlaying ? undefined : "100%",
                  }}
                />
              )}
            </span>
          </button>
        ))}

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer ml-1"
          title={isPlaying ? "หยุดชั่วคราว" : "เล่นต่อ"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
