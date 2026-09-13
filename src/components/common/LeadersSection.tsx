import React, { useState, useEffect, useRef } from 'react';
import { Shield, Award, ChevronLeft, ChevronRight, Filter, Star, Sparkles } from 'lucide-react';
import { mockNccLeaders, NccLeader } from '../../data/leaders';

const LEADER_CATEGORIES = [
  'ALL LEADERS',
  'SENIOR OFFICERS',
  'ANO OFFICERS',
  'SENIOR CADETS',
  'BEST CADETS',
];

interface LeadersSectionProps {
  onSelectLeader?: (leader: NccLeader) => void;
}

export const LeadersSection: React.FC<LeadersSectionProps> = ({ onSelectLeader }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL LEADERS');
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter leaders by category
  const filteredLeaders = mockNccLeaders.filter((leader) => {
    if (selectedCategory === 'ALL LEADERS') return true;
    if (selectedCategory === 'SENIOR OFFICERS') return leader.category === 'Senior Officer';
    if (selectedCategory === 'ANO OFFICERS') return leader.category === 'ANO Officer';
    if (selectedCategory === 'SENIOR CADETS') return leader.category === 'Senior Cadet';
    if (selectedCategory === 'BEST CADETS') return leader.category === 'Best Cadet';
    return true;
  });

  // Duplicate items for continuous infinite scroll
  const displayItems = filteredLeaders.length > 0
    ? [...filteredLeaders, ...filteredLeaders, ...filteredLeaders]
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
      scrollRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    }
  };

  const defaultPhoto = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="350" viewBox="0 0 300 350"><rect width="300" height="350" fill="%23082B57"/><circle cx="150" cy="120" r="55" fill="%23F5D061"/><path d="M50 310 C50 220, 90 200, 150 200 C210 200, 250 220, 250 310 Z" fill="%231677FF"/><text x="150" y="335" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">OFFICER / CADET PHOTO</text></svg>`;

  return (
    <section id="leaders-section" className="py-12 bg-slate-50 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-[#082B57] text-xs font-extrabold px-3 py-1 rounded-full mb-2 uppercase tracking-wider border border-blue-200">
              <Shield className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>Institutional Honor Roll</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B57] tracking-tight">
              Meet Our NCC Leaders & Achievers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Honoring the ANO Officers, Military Instructors, and Senior Cadet Leaders guiding ITM University National Cadet Corps to national distinction.
            </p>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Profile Card"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#082B57] hover:bg-[#082B57] hover:text-white transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Profile Card"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#082B57] hover:bg-[#082B57] hover:text-white transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#1677FF]" /> Category:
          </span>
          {LEADER_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#082B57] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Leaders Carousel */}
        {displayItems.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 text-sm">
            No profile records found for category "{selectedCategory}".
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
              {displayItems.map((leader, idx) => (
                <div
                  key={`${leader.id}-${idx}`}
                  className="w-[260px] sm:w-[285px] shrink-0 snap-start bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group select-none"
                >
                  {/* Card Image */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={leader.photo || defaultPhoto}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultPhoto;
                      }}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${leader.badgeBg}`}>
                        {leader.badgeText}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-3 text-[11px] font-bold text-amber-300 flex items-center gap-1 z-10">
                      <Award className="w-3.5 h-3.5 text-[#F5D061]" />
                      {leader.unit}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white text-slate-800">
                    <div>
                      <h4 className="text-base font-extrabold text-[#082B57] leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                        {leader.name}
                      </h4>
                      <p className="text-xs font-bold text-[#1677FF] mb-1.5">
                        {leader.rank} • {leader.designation}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {leader.achievement || leader.roleDescription}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectLeader && onSelectLeader(leader)}
                      className="w-full mt-auto bg-slate-50 hover:bg-[#082B57] hover:text-white text-[#082B57] border border-slate-200 hover:border-[#082B57] text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer group-hover:bg-[#082B57] group-hover:text-white"
                    >
                      <span>View Full Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
