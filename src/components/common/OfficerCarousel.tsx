import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Award, Shield, UserCheck } from 'lucide-react';
import { OfficerCard } from '../cards/OfficerCard';
import { mockOfficers } from '../../data/officers';
import { Officer } from '../../types';

interface OfficerCarouselProps {
  onViewProfile?: (officer: Officer) => void;
}

export const OfficerCarousel: React.FC<OfficerCarouselProps> = ({ onViewProfile }) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Triple items for seamless infinite scroll
  const items = [...mockOfficers, ...mockOfficers, ...mockOfficers];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.8; // Smooth auto scroll px per frame

    const scroll = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        // When scroll reaches 1/3 of total scrollable width, reset to 0 quietly
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird) {
          el.scrollLeft -= oneThird;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-slate-50/70 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100/80 text-[#082B57] text-xs font-extrabold px-3 py-1 rounded-full mb-2 uppercase tracking-wider border border-blue-200">
              <Shield className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>NCC Sir & Officer Profiles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B57] tracking-tight">
              NCC Officers & Leadership
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Meet our esteemed Associate NCC Officers (ANOs) and Instructors guiding cadets in discipline, leadership, and service across Army and Naval Units.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Officer Profile"
              className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#082B57] hover:bg-[#082B57] hover:text-white transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Officer Profile"
              className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#082B57] hover:bg-[#082B57] hover:text-white transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative overflow-hidden"
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-none py-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((officer, index) => (
              <div
                key={`${officer.id}-${index}`}
                className="w-[280px] sm:w-[320px] lg:w-[310px] shrink-0 snap-start"
              >
                <OfficerCard officer={officer} onViewProfile={onViewProfile} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
