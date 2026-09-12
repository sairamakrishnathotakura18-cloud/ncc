import React from 'react';
import { mockActivities } from '../../data/activities';
import { Calendar, MapPin, Users, HeartHandshake } from 'lucide-react';

export const Activities: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Selfless National Service</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Community Social Service Activities
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Blood donation drives, Puneet Sagar river cleaning, tree sapling plantation, and disaster response seminars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockActivities.map((act) => (
          <div key={act.id} className="bg-white rounded-3xl border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="relative h-56 overflow-hidden">
              <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent flex items-end p-6">
                <span className="bg-brand text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {act.category}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-navy mb-2">{act.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{act.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-text-secondary">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand" /> {act.date}</span>
                <span className="flex items-center gap-1 font-bold text-navy"><Users className="w-3.5 h-3.5 text-brand" /> {act.participantsCount} Cadets Participated</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
