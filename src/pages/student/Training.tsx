import React from 'react';
import { mockTrainingSessions } from '../../data/training';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const StudentTraining: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">My Enrolled Training Schedule</h1>
        <p className="text-xs text-text-secondary">Weekly mandatory drill parades and theory lectures.</p>
      </div>

      <div className="space-y-4">
        {mockTrainingSessions.map((session) => (
          <div key={session.id} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="bg-brand-light text-brand text-[11px] font-bold px-3 py-0.5 rounded-full">{session.type}</span>
              <h3 className="text-base font-bold text-navy">{session.topic}</h3>
              <p className="text-xs text-text-secondary">{session.date} • {session.time} • 📍 {session.location}</p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Enrolled
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
