import React from 'react';
import { mockActivities } from '../../data/activities';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerActivities: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Social Service Drive Manager</h1>
          <p className="text-xs text-text-secondary">Organize blood donation camps and Puneet Sagar drives.</p>
        </div>
        <button onClick={() => showToast('New Activity Dialog opened', 'info')} className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Create Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockActivities.map((act) => (
          <div key={act.id} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card space-y-2">
            <span className="bg-brand-light text-brand text-[11px] font-bold px-2.5 py-0.5 rounded-full">{act.category}</span>
            <h3 className="text-base font-bold text-navy">{act.title}</h3>
            <p className="text-xs text-text-secondary">{act.date} • {act.participantsCount} Cadets Enrolled</p>
          </div>
        ))}
      </div>
    </div>
  );
};
