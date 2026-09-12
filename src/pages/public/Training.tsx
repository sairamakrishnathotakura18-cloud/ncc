import React, { useState } from 'react';
import { mockTrainingSessions } from '../../data/training';
import { Calendar, Clock, MapPin, User, Search, Filter } from 'lucide-react';

export const Training: React.FC = () => {
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredSessions = mockTrainingSessions.filter((s) => {
    const matchesFilter = filterType === 'ALL' || s.type === filterType;
    const matchesSearch = s.topic.toLowerCase().includes(search.toLowerCase()) || s.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Parade & Institutional Schedule</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          NCC Parade Training Schedule
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Weekly drill parades, weapon handling theory, map reading, and physical conditioning classes.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topic or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Drill Practice', 'Physical Training', 'Map Reading', 'Weapon Training Theory', 'First Aid'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterType === t ? 'bg-brand text-white shadow-xs' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-brand-light text-brand text-[11px] font-bold px-3 py-0.5 rounded-full">{session.type}</span>
                <span className="text-xs font-bold text-navy">{session.unit}</span>
              </div>
              <h3 className="text-lg font-bold text-navy">{session.topic}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand" /> {session.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand" /> {session.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand" /> {session.location}</span>
              </div>
            </div>

            <div className="bg-page p-3.5 rounded-xl border border-gray-100 text-xs shrink-0 w-full md:w-auto">
              <span className="text-text-muted block text-[10px]">Instructor / PI Staff</span>
              <span className="font-bold text-navy">{session.instructor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
