import React, { useState, useEffect, useRef } from 'react';
import { Trophy, ChevronLeft, ChevronRight, Filter, Star, Sparkles, History } from 'lucide-react';
import { AchievementCard } from '../cards/AchievementCard';
import { mockAchievements } from '../../data/achievements';
import { Achievement } from '../../types';

const CATEGORIES = [
  'ALL',
  'LATEST',
  'NATIONAL',
  'STATE',
  'UNIVERSITY',
  'CAMPS',
  'SPORTS',
  'LEADERSHIP',
  'SOCIAL SERVICE',
];

interface AchieverSectionProps {
  onViewDetails?: (achievement: Achievement) => void;
}

export const AchieverSection: React.FC<AchieverSectionProps> = ({ onViewDetails }) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'past'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter achievements by Tab and Category
  const filteredAchievements = mockAchievements.filter((ach) => {
    // Tab filter
    if (activeTab === 'latest' && !ach.isLatest && Number(ach.year) < 2026) return false;
    if (activeTab === 'past' && ach.isLatest) return false;

    // Category filter
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'LATEST') return ach.isLatest;
    if (selectedCategory === 'NATIONAL') return ach.level === 'National';
    if (selectedCategory === 'STATE') return ach.level === 'State';
    if (selectedCategory === 'UNIVERSITY') return ach.level === 'University';
    if (selectedCategory === 'CAMPS') return ach.category.toUpperCase().includes('CAMP') || ach.category.toUpperCase().includes('RDC');
    if (selectedCategory === 'SPORTS') return ach.category.toUpperCase().includes('SPORT') || ach.category.toUpperCase().includes('SHOOTING');
    if (selectedCategory === 'LEADERSHIP') return ach.category.toUpperCase().includes('LEADERSHIP') || ach.category.toUpperCase().includes('COMMAND');
    if (selectedCategory === 'SOCIAL SERVICE') return ach.category.toUpperCase().includes('SERVICE') || ach.category.toUpperCase().includes('SOCIAL');

    return true;
  });

  // Duplicate items for continuous infinite scroll
  const displayItems = filteredAchievements.length > 0
    ? [...filteredAchievements, ...filteredAchievements, ...filteredAchievements]
    : [];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || displayItems.length === 0) return;

    let animationFrameId: number;
    const speed = 0.7; // Smooth auto scroll speed

    const scroll = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        const oneThird = el.scrollWidth / 3;
        if (el.scrollLeft >= oneThird) {
          el.scrollLeft -= oneThird;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, displayItems.length]);

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
    <section id="achievers-section" className="py-12 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF5F4] text-[#D92D20] text-xs font-extrabold px-3 py-1 rounded-full mb-2 uppercase tracking-wider border border-red-200">
              <Trophy className="w-3.5 h-3.5" />
              <span>Cadet Excellence Roll</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B57] tracking-tight">
              NCC Achievers & Honor Roll
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Celebrating ITM NCC cadets who have brought pride to the university through National, State, and Inter-Unit excellence.
            </p>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Achievement Card"
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[#082B57] hover:bg-[#082B57] hover:text-white transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Achievement Card"
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[#082B57] hover:bg-[#082B57] hover:text-white transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Major Tabs: Latest Achievements vs Past Achievements */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('latest'); setSelectedCategory('ALL'); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'latest'
                  ? 'bg-[#082B57] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
              <span>Latest Achievements</span>
            </button>
            <button
              onClick={() => { setActiveTab('past'); setSelectedCategory('ALL'); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-[#082B57] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5 text-[#F5D061]" />
              <span>Past Achievements</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Showing {filteredAchievements.length} Verified Records</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-[#1677FF]" /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#1677FF] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Achiever Carousel */}
        {displayItems.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500 text-sm">
            No achievements found for category "{selectedCategory}" in {activeTab} records.
          </div>
        ) : (
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
              {displayItems.map((ach, idx) => (
                <div
                  key={`${ach.id}-${idx}`}
                  className="w-[260px] sm:w-[290px] lg:w-[280px] shrink-0 snap-start"
                >
                  <AchievementCard achievement={ach} onViewDetails={onViewDetails} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
