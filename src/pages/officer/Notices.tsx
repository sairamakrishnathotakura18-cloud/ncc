import React from 'react';
import { mockNotices } from '../../data/notices';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerNotices: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Publish Circulars & Notices</h1>
          <p className="text-xs text-text-secondary">Post official parade updates and camp deadlines.</p>
        </div>
        <button onClick={() => showToast('Publish Notice Dialog opened', 'info')} className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Publish New Notice
        </button>
      </div>

      <div className="space-y-4">
        {mockNotices.map((n) => (
          <div key={n.id} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card flex items-center justify-between">
            <div>
              <span className="bg-brand-light text-brand text-[11px] font-bold px-2.5 py-0.5 rounded-full">{n.category}</span>
              <h3 className="text-base font-bold text-navy pt-1">{n.title}</h3>
              <p className="text-xs text-text-secondary">{n.date} • {n.shortDesc}</p>
            </div>
            <button onClick={() => showToast(`Editing notice ${n.title}`, 'info')} className="bg-gray-100 hover:bg-gray-200 text-navy font-bold text-xs px-3 py-1.5 rounded-xl">
              Edit Notice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
