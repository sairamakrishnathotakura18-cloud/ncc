import React, { useState } from 'react';
import { Shield, Anchor, Award, Users, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { mockUnits } from '../../data/wings';
import { mockCamps } from '../../data/camps';
import { mockOfficers } from '../../data/officers';
import { CampCard } from '../../components/cards/CampCard';
import { CampEligibilityModal } from '../../components/common/CampEligibilityModal';
import { Camp } from '../../types';

export const WingDetail: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<'Army Unit' | 'Naval Unit'>('Army Unit');
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

  const currentUnitInfo = mockUnits.find(u => u.name === selectedUnit) || mockUnits[0];
  const unitCamps = mockCamps.filter(c => c.unit === selectedUnit || c.unit === 'All Units' || c.wing === selectedUnit);
  const unitOfficers = mockOfficers.filter(o => o.unit === selectedUnit || o.wing === selectedUnit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Unit Switcher Header Tabs */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold text-[#1677FF] uppercase tracking-widest">ONE NCC • TWO UNITS</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B57] tracking-tight">ITM University NCC Units</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Explore unit details, commanding officers, training curricula, and upcoming camps for Army Unit and Naval Unit.
        </p>
        
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            onClick={() => setSelectedUnit('Army Unit')}
            className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
              selectedUnit === 'Army Unit'
                ? 'bg-[#D92D20] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" /> 🪖 Army Unit
          </button>

          <button
            onClick={() => setSelectedUnit('Naval Unit')}
            className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
              selectedUnit === 'Naval Unit'
                ? 'bg-[#1677FF] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <Anchor className="w-4 h-4" /> ⚓ Naval Unit
          </button>
        </div>
      </div>

      {/* Selected Unit Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase ${currentUnitInfo.badgeBg}`}>
              {currentUnitInfo.code}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B57]">{currentUnitInfo.name}</h2>
            <p className="text-xs font-semibold text-amber-600 italic">Motto: "{currentUnitInfo.motto}"</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center min-w-[120px]">
              <span className="text-slate-400 block text-[10px] uppercase">Enrolled Cadets</span>
              <span className="text-2xl font-black text-[#082B57]">{currentUnitInfo.totalCadets}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center min-w-[120px]">
              <span className="text-slate-400 block text-[10px] uppercase">Active Camps</span>
              <span className="text-2xl font-black text-[#1677FF]">{currentUnitInfo.upcomingCampsCount}</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          {currentUnitInfo.description}
        </p>
      </div>

      {/* Unit Leadership Officers */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-[#082B57]">{selectedUnit} Officers & Leadership</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unitOfficers.map((officer) => (
            <div key={officer.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <img src={officer.photo} alt={officer.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#F5D061] shadow-xs shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{officer.name}</h4>
                <p className="text-xs font-semibold text-[#1677FF]">{officer.rank} • {officer.designation}</p>
                <p className="text-[11px] text-slate-500 mt-1">{officer.roleDescription || officer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Camps Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-extrabold text-[#082B57]">{selectedUnit} Camps & Training</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {unitCamps.map((camp) => (
            <CampCard
              key={camp.id}
              camp={camp}
              onView={(c) => setSelectedCamp(c)}
            />
          ))}
        </div>
      </div>

      {/* Eligibility Modal */}
      {selectedCamp && (
        <CampEligibilityModal
          camp={selectedCamp}
          isOpen={!!selectedCamp}
          onClose={() => setSelectedCamp(null)}
        />
      )}

    </div>
  );
};
