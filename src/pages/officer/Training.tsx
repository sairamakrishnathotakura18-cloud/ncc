import React from 'react';
import { mockTrainingSessions } from '../../data/training';
import { Plus, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerTraining: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Training Schedule Management</h1>
          <p className="text-xs text-text-secondary">Create and assign parade drill classes for Senior Division and Senior Wing.</p>
        </div>
        <button onClick={() => showToast('New Training Session Dialog opened', 'info')} className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Training Class
        </button>
      </div>

      <div className="space-y-4">
        {mockTrainingSessions.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card flex items-center justify-between">
            <div>
              <span className="bg-brand-light text-brand text-[11px] font-bold px-2.5 py-0.5 rounded-full">{s.type}</span>
              <h3 className="text-base font-bold text-navy pt-1">{s.topic}</h3>
              <p className="text-xs text-text-secondary">{s.date} • {s.time} • Instructor: {s.instructor}</p>
            </div>
            <button onClick={() => showToast(`Editing session ${s.topic}`, 'info')} className="bg-gray-100 hover:bg-gray-200 text-navy font-bold text-xs px-3 py-1.5 rounded-xl">
              Edit Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
