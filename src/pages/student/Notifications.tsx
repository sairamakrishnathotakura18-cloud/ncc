import React from 'react';
import { mockNotifications } from '../../data/notifications';
import { Bell } from 'lucide-react';

export const StudentNotifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">Notifications & Alerts</h1>
        <p className="text-xs text-text-secondary">Updates on parade schedules, camp approvals, and notices.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card p-6 divide-y divide-gray-100">
        {mockNotifications.map((n) => (
          <div key={n.id} className="py-4 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-navy">{n.title}</h4>
              <span className="text-[10px] text-text-muted">{n.timestamp}</span>
            </div>
            <p className="text-xs text-text-secondary">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
