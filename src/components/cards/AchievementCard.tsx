import React from 'react';
import { Award, Trophy, Calendar, MapPin } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementCardProps {
  achievement: Achievement;
  onViewDetails?: (achievement: Achievement) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onViewDetails }) => {
  const defaultPhoto = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="%23082B57"/><circle cx="75" cy="55" r="28" fill="%23F5D061"/><path d="M25 140 C25 105, 45 95, 75 95 C105 95, 125 105, 125 140 Z" fill="%231677FF"/></svg>`;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group h-full select-none">
      {/* Header Badge */}
      <div className="bg-slate-900 text-white p-4 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-[#F5D061]/20 blur-lg pointer-events-none" />
        
        <div className="flex items-center justify-between z-10 mb-3">
          <span className="bg-[#F5D061] text-[#082B57] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1 uppercase tracking-wider">
            <Trophy className="w-3 h-3 text-[#082B57]" /> {achievement.level} Level
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-xs backdrop-blur-xs flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {achievement.year}
          </span>
        </div>

        {/* Cadet Profile */}
        <div className="flex items-center gap-3 z-10">
          <img
            src={achievement.photo || defaultPhoto}
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultPhoto;
            }}
            alt={achievement.cadetName}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#F5D061] shadow-xs shrink-0"
          />
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">{achievement.cadetName}</h4>
            <span className="text-[11px] text-amber-300 font-semibold bg-amber-400/10 px-2 py-0.2 rounded-xs inline-block mt-0.5">
              {achievement.unit || 'Army Unit'}
            </span>
          </div>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
            <span className="truncate">{achievement.eventCamp || achievement.category || 'National NCC Event'}</span>
          </div>

          <h3 className="text-sm font-bold text-[#082B57] leading-snug group-hover:text-blue-600 transition-colors mb-2">
            🏆 {achievement.achievementTitle}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {achievement.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-[#082B57] bg-slate-100 px-2 py-0.5 rounded-xs">
            {achievement.category}
          </span>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(achievement)}
              className="text-[11px] font-bold text-[#1677FF] hover:underline flex items-center gap-0.5"
            >
              View Details →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

