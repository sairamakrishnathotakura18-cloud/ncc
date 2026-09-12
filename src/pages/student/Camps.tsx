import React, { useState } from 'react';
import { mockCamps } from '../../data/camps';
import { CampCard } from '../../components/cards/CampCard';
import { StatusBadge } from '../../components/common/StatusBadge';

export const StudentCamps: React.FC = () => {
  const [tab, setTab] = useState<'UPCOMING' | 'APPLIED' | 'COMPLETED'>('UPCOMING');

  const myAppliedCamps = [
    { camp: mockCamps[0], appStatus: 'Approved' },
    { camp: mockCamps[1], appStatus: 'Pending' },
    { camp: mockCamps[2], appStatus: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">My Camp Applications</h1>
        <p className="text-xs text-text-secondary">View status of submitted camp applications and past training camps.</p>
      </div>

      <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-2 max-w-md">
        {(['UPCOMING', 'APPLIED', 'COMPLETED'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === t ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:text-navy'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCamps.map((camp) => (
          <div key={camp.id} className="relative">
            <CampCard camp={camp} isApplied={true} />
            <div className="absolute top-4 left-4 z-20">
              <StatusBadge status="Approved" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
