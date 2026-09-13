import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Award, Shield, Star, UserCheck } from 'lucide-react';
import { mockNccLeaders, NccLeader } from '../../data/leaders';

interface HeroLeaderGalleryProps {
  onSelectLeader?: (leader: NccLeader) => void;
}

export const HeroLeaderGallery: React.FC<HeroLeaderGalleryProps> = ({ onSelectLeader }) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Triple items array for gapless infinite scroll
  const tripleLeaders = [...mockNccLeaders, ...mockNccLeaders, ...mockNccLeaders];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.8; // Smooth auto scroll px per frame

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
  }, [isPaused]);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const defaultPhoto = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="350" viewBox="0 0 300 350"><rect width="300" height="350" fill="%23082B57"/><circle cx="150" cy="120" r="55" fill="%23F5D061"/><path d="M50 310 C50 220, 90 200, 150 200 C210 200, 250 220, 250 310 Z" fill="%231677FF"/><text x="150" y="335" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">OFFICER / CADET PHOTO</text></svg>`;

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Horizontal Carousel Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative overflow-hidden w-full rounded-2xl"
      >
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none py-1 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tripleLeaders.map((leader, index) => (
            <div
              key={`${leader.id}-${index}`}
              className="w-[250px] sm:w-[270px] shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl select-none"
            >
              {/* Card Image Header */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={leader.photo || defaultPhoto}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultPhoto;
                  }}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${leader.badgeBg}`}>
                    {leader.badgeText}
                  </span>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-3 text-[11px] font-bold text-amber-300 flex items-center gap-1 z-10">
                  <Award className="w-3 h-3 text-[#F5D061]" />
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

                {/* View Profile Action */}
                <button
                  onClick={() => onSelectLeader && onSelectLeader(leader)}
                  className="w-full mt-auto bg-slate-50 hover:bg-[#082B57] hover:text-white text-[#082B57] border border-slate-200 hover:border-[#082B57] text-xs font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer group-hover:bg-[#082B57] group-hover:text-white"
                >
                  <span>View Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Senior Command Officer Directive Quote Banner */}
      <div className="bg-slate-900/90 border border-amber-400/40 p-4 rounded-2xl space-y-1.5 backdrop-blur-md text-left shadow-xl">
        <div className="flex items-center gap-2 text-[#F5D061] text-[11px] font-extrabold uppercase tracking-wider">
          <Shield className="w-4 h-4 text-[#F5D061]" />
          <span>Senior Command Officer Directive</span>
        </div>
        <p className="text-xs text-slate-100 italic font-serif leading-relaxed">
          "Unity, Discipline, and Selfless Service form the cornerstone of Nation Building. Our mission is to empower cadets with leadership, courage, and unwavering dedication to the country."
        </p>
        <p className="text-[11px] font-bold text-amber-300 text-right">— Senior NCC Command Leadership</p>
      </div>
    </div>
  );
};
