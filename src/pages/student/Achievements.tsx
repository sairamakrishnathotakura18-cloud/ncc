import React from 'react';
import { mockAchievements } from '../../data/achievements';
import { AchievementCard } from '../../components/cards/AchievementCard';

export const StudentAchievements: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">My Awards & Honors</h1>
        <p className="text-xs text-text-secondary">Official commendations and competition awards earned during your cadetship.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAchievements.slice(0, 2).map((ach) => (
          <AchievementCard key={ach.id} achievement={ach} />
        ))}
      </div>
    </div>
  );
};
