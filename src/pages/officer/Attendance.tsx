import React, { useState } from 'react';
import { mockCadets } from '../../data/students';
import { CheckCircle2, Save, Users, Calendar, Check, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerAttendance: React.FC = () => {
  const { showToast } = useToast();
  const [unit, setUnit] = useState('1st Bengal Battalion NCC');
  const [date, setDate] = useState('2026-09-14');
  const [trainingClass, setTrainingClass] = useState('Squad Drill & Ceremonial Marching');

  const [cadetStatuses, setCadetStatuses] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>({
    'cadet-001': 'Present',
    'cadet-002': 'Present',
    'cadet-003': 'Present',
    'cadet-004': 'Absent',
    'cadet-005': 'Present',
    'cadet-006': 'Excused',
  });

  const setAllStatus = (status: 'Present' | 'Absent') => {
    const updated: Record<string, 'Present' | 'Absent'> = {};
    mockCadets.forEach((c) => {
      updated[c.id] = status;
    });
    setCadetStatuses(updated);
    showToast(`Marked all cadets as ${status}`, 'info');
  };

  const handleStatusToggle = (cadetId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setCadetStatuses((prev) => ({ ...prev, [cadetId]: status }));
  };

  const handleSave = () => {
    showToast(`Attendance saved for ${date} (${unit})!`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">Mark Parade Attendance</h1>
        <p className="text-xs text-text-secondary">Record attendance for weekly drill parades and theory lectures.</p>
      </div>

      {/* Class Selection Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-bold text-navy block mb-1">Select Battalion Unit</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold">
            <option value="1st Bengal Battalion NCC">1st Bengal Battalion NCC</option>
            <option value="1st Bengal Girls Battalion">1st Bengal Girls Battalion</option>
          </select>
        </div>
        <div>
          <label className="font-bold text-navy block mb-1">Parade Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
        </div>
        <div>
          <label className="font-bold text-navy block mb-1">Training Topic</label>
          <input type="text" value={trainingClass} onChange={(e) => setTrainingClass(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setAllStatus('Present')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-200">
            Mark All Present
          </button>
          <button onClick={() => setAllStatus('Absent')} className="bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold px-4 py-2 rounded-xl border border-red-200">
            Mark All Absent
          </button>
        </div>
        <button onClick={handleSave} className="w-full sm:w-auto bg-brand hover:bg-brand-hover text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> Save Attendance Log
        </button>
      </div>

      {/* Attendance Grid Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="p-4">Cadet Name</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Rank</th>
                <th className="p-4 text-center">Attendance Status Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-navy font-medium">
              {mockCadets.map((cadet) => {
                const currentStatus = cadetStatuses[cadet.id] || 'Present';
                return (
                  <tr key={cadet.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={cadet.photo} alt={cadet.name} className="w-8 h-8 rounded-full object-cover border border-brand shrink-0" />
                      <span className="font-bold">{cadet.name}</span>
                    </td>
                    <td className="p-4 font-mono">{cadet.studentId}</td>
                    <td className="p-4 text-brand font-semibold">{cadet.rank}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        {(['Present', 'Absent', 'Late', 'Excused'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusToggle(cadet.id, st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              currentStatus === st
                                ? st === 'Present'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : st === 'Absent'
                                  ? 'bg-red-600 text-white shadow-xs'
                                  : 'bg-amber-500 text-white shadow-xs'
                                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
