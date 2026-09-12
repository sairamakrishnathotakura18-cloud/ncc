import React from 'react';
import { mockOfficers } from '../../data/officers';
import { mockUnits } from '../../data/units';
import { OfficerCard } from '../../components/cards/OfficerCard';
import { Shield, Building, Users, Calendar, Award } from 'lucide-react';

export const UniversityNCC: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Campus Battalion Setup</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          NCC at State Central University
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Detailed overview of our active Senior Division (SD) and Senior Wing (SW) companies, Associate Officers, and infrastructure.
        </p>
      </div>

      {/* Units Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-navy border-l-4 border-brand pl-3">Active Battalion Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockUnits.map((u) => (
            <div key={u.id} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand bg-brand-light px-2.5 py-1 rounded-full">{u.code}</span>
                <span className="text-xs text-text-muted">{u.totalCadets} Cadets Capacity</span>
              </div>
              <h3 className="text-lg font-bold text-navy">{u.name}</h3>
              <p className="text-xs text-text-secondary"><strong>Location:</strong> {u.location}</p>
              <p className="text-xs text-text-secondary"><strong>Commanding Officer:</strong> {u.commandingOfficer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Officers Profile Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-navy border-l-4 border-amber-400 pl-3">Associate NCC Officers (ANOs)</h2>
        <div className="space-y-4">
          {mockOfficers.map((off) => (
            <OfficerCard key={off.id} officer={off} />
          ))}
        </div>
      </div>

      {/* Training Facilities */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-card space-y-6">
        <h2 className="text-xl font-bold text-navy">Campus Training Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-page rounded-xl border border-gray-100 space-y-2">
            <h4 className="font-bold text-navy text-sm">Parade Arena</h4>
            <p className="text-text-secondary">500-meter paved parade ground with podium for squad drill and Independence Day parade.</p>
          </div>
          <div className="p-4 bg-page rounded-xl border border-gray-100 space-y-2">
            <h4 className="font-bold text-navy text-sm">Obstacle Training Course</h4>
            <p className="text-text-secondary">10 standard military obstacles including high wall, ditch jump, balance beam, and ramp.</p>
          </div>
          <div className="p-4 bg-page rounded-xl border border-gray-100 space-y-2">
            <h4 className="font-bold text-navy text-sm">Armoury & Simulator</h4>
            <p className="text-text-secondary">Secure .22 rifle armoury and computerized electronic firing simulator for marksmanship.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
