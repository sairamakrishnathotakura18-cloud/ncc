import React from 'react';
import { mockCamps } from '../../data/camps';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerCamps: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Camp Management</h1>
          <p className="text-xs text-text-secondary">Organize Annual Training Camps and select participants.</p>
        </div>
        <button onClick={() => showToast('Create Camp Dialog opened', 'info')} className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Create New Camp
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCamps.map((camp) => (
          <div key={camp.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-3">
            <h3 className="text-base font-bold text-navy">{camp.name}</h3>
            <p className="text-xs text-text-secondary">{camp.location} • {camp.duration}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <span className="font-semibold text-brand">{camp.appliedCount} / {camp.maxParticipants} Applicants</span>
              <button onClick={() => showToast(`Reviewing applicants for ${camp.name}`, 'info')} className="bg-navy text-white font-bold px-3 py-1.5 rounded-xl">
                Manage Applicants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
