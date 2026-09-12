import React, { useState } from 'react';
import { mockRanks } from '../../data/ranks';
import { RankCard } from '../../components/cards/RankCard';

export const Ranks: React.FC = () => {
  const [tab, setTab] = useState<'SD' | 'JD'>('SD');

  const filteredRanks = mockRanks.filter((r) =>
    tab === 'SD' ? r.category.includes('Senior') : r.category.includes('Junior')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Cadet Hierarchy</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          NCC Rank Structure & Insignia
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Promotions in the NCC are earned through parade attendance, camp participation, drill proficiency, and leadership exams.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2 max-w-md w-full">
          <button
            onClick={() => setTab('SD')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              tab === 'SD' ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:text-navy'
            }`}
          >
            Senior Division / Wing (SD / SW)
          </button>
          <button
            onClick={() => setTab('JD')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              tab === 'JD' ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:text-navy'
            }`}
          >
            Junior Division / Wing (JD / JW)
          </button>
        </div>
      </div>

      {/* Ranks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRanks.map((rank) => (
          <RankCard key={rank.id} rank={rank} />
        ))}
      </div>
    </div>
  );
};
