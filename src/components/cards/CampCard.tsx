import React from 'react';
import { MapPin, Calendar, Users, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Camp } from '../../types';

interface CampCardProps {
  camp: Camp;
  onApply?: (camp: Camp) => void;
  onView?: (camp: Camp) => void;
  isApplied?: boolean;
}

export const CampCard: React.FC<CampCardProps> = ({ camp, onApply, onView, isApplied }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={camp.image}
          alt={camp.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-navy text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border border-white/50">
          {camp.type}
        </span>
        <span className={`absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs ${
          camp.status === 'OPEN'
            ? 'bg-emerald-500 text-white'
            : camp.status === 'UPCOMING'
            ? 'bg-amber-500 text-white'
            : 'bg-gray-700 text-white'
        }`}>
          {camp.status}
        </span>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-base font-bold leading-snug line-clamp-1">{camp.name}</h3>
          <p className="text-xs text-gray-200 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" /> {camp.location}
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="flex items-center gap-1.5 font-medium text-navy">
              <Calendar className="w-3.5 h-3.5 text-brand" /> Dates:
            </span>
            <span className="font-semibold text-text-primary">{camp.startDate} to {camp.endDate} ({camp.duration})</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="flex items-center gap-1.5 font-medium text-navy">
              <Users className="w-3.5 h-3.5 text-brand" /> Seats / Applicants:
            </span>
            <span className="font-semibold text-text-primary">{camp.appliedCount} / {camp.maxParticipants} Enrolled</span>
          </div>

          <div className="pt-1">
            <span className="font-bold text-navy block mb-1">Eligibility:</span>
            <p className="text-[11px] text-text-secondary bg-gray-50 p-2 rounded-lg border border-gray-100">
              {camp.eligibility}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {onView && (
            <button
              onClick={() => onView(camp)}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-navy font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors border border-gray-200 text-center"
            >
              Camp Details
            </button>
          )}
          {onApply && camp.status === 'OPEN' && (
            <button
              onClick={() => onApply(camp)}
              disabled={isApplied}
              className={`flex-1 font-semibold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                isApplied
                  ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed'
                  : 'bg-brand hover:bg-brand-hover text-white'
              }`}
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                </>
              ) : (
                <>
                  Apply Now <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
