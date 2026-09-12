import React from 'react';
import { Shield, ChevronRight, Award } from 'lucide-react';
import { Officer } from '../../types';

interface OfficerCardProps {
  officer: Officer;
  onViewProfile?: (officer: Officer) => void;
}

export const OfficerCard: React.FC<OfficerCardProps> = ({ officer, onViewProfile }) => {
  const defaultPhoto = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23082B57"/><circle cx="100" cy="75" r="35" fill="%23F5D061"/><path d="M40 180 C40 135, 65 120, 100 120 C135 120, 160 135, 160 180 Z" fill="%231677FF"/><text x="100" y="192" font-family="sans-serif" font-size="10" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">OFFICER PHOTO</text></svg>`;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-5 text-center relative group h-full select-none">
      {/* Top Gold / NCC Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#082B57] via-[#F5D061] to-[#082B57] rounded-t-xl" />

      {/* Officer Photo Container */}
      <div className="relative mt-2 mb-4">
        <img
          src={officer.photo || defaultPhoto}
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultPhoto;
          }}
          alt={officer.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#F5D061] shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#082B57] text-[#F5D061] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#F5D061]/50 shadow-2xs whitespace-nowrap flex items-center gap-1">
          <Award className="w-3 h-3" />
          {officer.rank}
        </span>
      </div>

      {/* Officer Details */}
      <div className="w-full flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#082B57] leading-tight tracking-tight mb-1 group-hover:text-blue-700 transition-colors">
            {officer.name}
          </h3>
          <p className="text-xs font-semibold text-slate-600 mb-1">
            {officer.designation}
          </p>

          <div className="inline-flex items-center gap-1 bg-blue-50 text-[#1677FF] px-2.5 py-0.5 rounded-md text-xs font-bold mb-3">
            <Shield className="w-3 h-3 text-[#1677FF]" />
            <span>{officer.unit}</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-3 italic mb-4 px-2 font-serif">
            "{officer.roleDescription || officer.bio || 'Leading cadet development, training and discipline.'}"
          </p>
        </div>

        {/* View Profile Button */}
        <button
          onClick={() => onViewProfile && onViewProfile(officer)}
          className="w-full mt-auto bg-slate-50 hover:bg-[#082B57] hover:text-white text-[#082B57] border border-slate-200 hover:border-[#082B57] text-xs font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:bg-[#082B57] group-hover:text-white"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

