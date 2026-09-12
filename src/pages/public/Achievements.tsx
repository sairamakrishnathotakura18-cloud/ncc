import React, { useState } from 'react';
import { mockAchievements } from '../../data/achievements';
import { AchievementCard } from '../../components/cards/AchievementCard';

export const Achievements: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState('ALL');

  const filtered = mockAchievements.filter((a) => levelFilter === 'ALL' || a.level === levelFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Hall of Fame</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Campus Achievers Gallery
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Honoring cadets who represented State Central University at National Republic Day Parades, Governor Awards, and All-India competitions.
        </p>
      </div>

      {/* Filter */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2 max-w-md w-full">
          {['ALL', 'National', 'State', 'University'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                levelFilter === lvl ? 'bg-navy text-white shadow-md' : 'text-text-secondary hover:text-navy'
              }`}
            >
              {lvl} Level
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((ach) => (
          <AchievementCard key={ach.id} achievement={ach} />
        ))}
      </div>
    </div>
  );
};
