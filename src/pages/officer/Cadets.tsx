import React, { useState } from 'react';
import { mockCadets } from '../../data/students';
import { Cadet } from '../../types';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, X, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const OfficerCadets: React.FC = () => {
  const [search, setSearch] = useState('');
  const [unitFilter, setUnitFilter] = useState('ALL');
  const [selectedCadet, setSelectedCadet] = useState<Cadet | null>(null);

  const filteredCadets = mockCadets.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesUnit = unitFilter === 'ALL' || c.unit === unitFilter;
    return matchesSearch && matchesUnit;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Cadet Directory & Roster</h1>
          <p className="text-xs text-text-secondary">Manage enrolled Senior Division and Senior Wing cadets.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Cadet Name or Roll ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-navy"
          >
            <option value="ALL">All Battalion Units</option>
            <option value="1st Bengal Battalion NCC">1st Bengal Battalion NCC</option>
            <option value="1st Bengal Girls Battalion">1st Bengal Girls Battalion</option>
          </select>
        </div>
      </div>

      {/* Cadet Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="p-4">Cadet Name</th>
                <th className="p-4">Roll ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Rank</th>
                <th className="p-4">Battalion Unit</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-navy font-medium">
              {filteredCadets.map((cadet) => (
                <tr key={cadet.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={cadet.photo} alt={cadet.name} className="w-8 h-8 rounded-full object-cover border border-brand shrink-0" />
                    <span className="font-bold">{cadet.name}</span>
                  </td>
                  <td className="p-4 font-mono">{cadet.studentId}</td>
                  <td className="p-4 text-text-secondary">{cadet.department}</td>
                  <td className="p-4"><span className="text-brand font-semibold">{cadet.rank}</span></td>
                  <td className="p-4 text-text-secondary">{cadet.unit}</td>
                  <td className="p-4">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{cadet.attendancePercentage}%</span>
                  </td>
                  <td className="p-4"><StatusBadge status={cadet.status} /></td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedCadet(cadet)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-navy rounded-xl transition-colors"
                      title="View Cadet Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cadet Side Drawer Preview */}
      {selectedCadet && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-base font-extrabold text-navy">Cadet Profile Dossier</h3>
                <button onClick={() => setSelectedCadet(null)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-2">
                <img src={selectedCadet.photo} alt={selectedCadet.name} className="w-24 h-24 rounded-full object-cover border-4 border-brand mx-auto shadow-md" />
                <span className="bg-brand-light text-brand text-xs font-bold px-3 py-0.5 rounded-full inline-block">{selectedCadet.rank}</span>
                <h2 className="text-xl font-extrabold text-navy">{selectedCadet.name}</h2>
                <p className="text-xs text-text-secondary font-mono">{selectedCadet.studentId}</p>
              </div>

              <div className="bg-page p-4 rounded-2xl border border-gray-100 space-y-3 text-xs">
                <div><span className="text-text-muted block">Department:</span> <strong className="text-navy">{selectedCadet.department}</strong></div>
                <div><span className="text-text-muted block">Unit:</span> <strong className="text-navy">{selectedCadet.unit}</strong></div>
                <div><span className="text-text-muted block">Enrollment Date:</span> <strong className="text-navy">{selectedCadet.enrollmentDate}</strong></div>
                <div><span className="text-text-muted block">Parade Attendance:</span> <strong className="text-emerald-700 font-bold">{selectedCadet.attendancePercentage}% ({selectedCadet.presentCount} Present / {selectedCadet.absentCount} Absent)</strong></div>
                <div><span className="text-text-muted block">Emergency Contact:</span> <strong className="text-navy">{selectedCadet.emergencyContact}</strong></div>
              </div>
            </div>

            <button onClick={() => setSelectedCadet(null)} className="w-full bg-navy text-white text-xs font-bold py-3 rounded-xl">
              Close Dossier
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
