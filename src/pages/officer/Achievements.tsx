import React from 'react';
import { mockAchievements } from '../../data/achievements';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerAchievements: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Campus Achievers Manager</h1>
          <p className="text-xs text-text-secondary">Add and spotlight cadet awards and state medals.</p>
        </div>
        <button onClick={() => showToast('Add Achiever Dialog opened', 'info')} className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Achiever Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAchievements.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card space-y-2">
            <span className="gold-gradient-badge text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block">{a.level} Level</span>
            <h3 className="text-base font-bold text-navy">{a.achievementTitle}</h3>
            <p className="text-xs text-text-secondary">Cadet: {a.cadetName} ({a.year})</p>
          </div>
        ))}
      </div>
    </div>
  );
};
