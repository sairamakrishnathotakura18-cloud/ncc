import React, { useState } from 'react';
import { mockCamps } from '../../data/camps';
import { CampCard } from '../../components/cards/CampCard';
import { Modal } from '../../components/common/Modal';
import { Camp } from '../../types';
import { useToast } from '../../context/ToastContext';

export const Camps: React.FC = () => {
  const { showToast } = useToast();
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const [filter, setFilter] = useState('ALL');

  const filteredCamps = mockCamps.filter((c) => filter === 'ALL' || c.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">State & National Training Camps</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          NCC Training Camps 2026
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Annual Training Camps (ATC), National Integration Camps (NIC), Basic Leadership Camps (BLC), and Adventure Expeditions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2 max-w-sm w-full">
          {['ALL', 'OPEN', 'UPCOMING', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === st ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:text-navy'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Camps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <CampCard
            key={camp.id}
            camp={camp}
            onView={(c) => setSelectedCamp(c)}
            onApply={(c) => showToast(`Camp Application draft for ${c.name} initiated!`, 'success')}
          />
        ))}
      </div>

      {/* Camp Modal */}
      {selectedCamp && (
        <Modal isOpen={!!selectedCamp} onClose={() => setSelectedCamp(null)} title={selectedCamp.name} maxWidth="2xl">
          <div className="space-y-4 text-xs">
            <img src={selectedCamp.image} alt={selectedCamp.name} className="w-full h-64 object-cover rounded-xl" />
            <p className="text-text-secondary text-sm leading-relaxed">{selectedCamp.description}</p>
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div><span className="text-text-muted block">Location:</span><span className="font-bold text-navy">{selectedCamp.location}</span></div>
              <div><span className="text-text-muted block">Dates:</span><span className="font-bold text-navy">{selectedCamp.startDate} to {selectedCamp.endDate}</span></div>
              <div><span className="text-text-muted block">Organizer:</span><span className="font-bold text-navy">{selectedCamp.organizer}</span></div>
              <div><span className="text-text-muted block">Eligibility:</span><span className="font-bold text-brand">{selectedCamp.eligibility}</span></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
