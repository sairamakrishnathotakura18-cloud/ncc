import React from 'react';
import { ShieldAlert, ShieldCheck, Boxes, Award, Medal, ChevronUp, User, CheckCircle2 } from 'lucide-react';
import { Rank } from '../../types';

interface RankCardProps {
  rank: Rank;
}

const rankIconMap: Record<string, any> = {
  ShieldAlert,
  ShieldCheck,
  Boxes,
  Award,
  Medal,
  ChevronUp,
  User
};

export const RankCard: React.FC<RankCardProps> = ({ rank }) => {
  const Icon = rankIconMap[rank.insigniaIcon] || Award;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-navy text-amber-400 flex items-center justify-center shadow-md shrink-0 border border-navy-light">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-brand uppercase tracking-wider block">{rank.code}</span>
            <h3 className="text-lg font-extrabold text-navy leading-tight">{rank.name}</h3>
          </div>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          {rank.description}
        </p>

        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-navy uppercase tracking-wider block">Key Duties:</span>
          <ul className="space-y-1 text-xs text-text-secondary">
            {rank.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-text-muted">
        <span>Hierarchy Level</span>
        <span className="font-bold text-navy">{rank.category}</span>
      </div>
    </div>
  );
};
