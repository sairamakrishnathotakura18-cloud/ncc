import React from 'react';
import { mockActivities } from '../../data/activities';

export const StudentActivities: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">Social Service Activity Participation</h1>
        <p className="text-xs text-text-secondary">Record of your community drives and environmental initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockActivities.slice(0, 2).map((act) => (
          <div key={act.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-3">
            <span className="bg-brand-light text-brand text-[11px] font-bold px-2.5 py-0.5 rounded-full">{act.category}</span>
            <h3 className="text-base font-bold text-navy">{act.title}</h3>
            <p className="text-xs text-text-secondary">{act.description}</p>
            <span className="text-[11px] text-text-muted block pt-2 border-t border-gray-100">Date Attended: {act.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
