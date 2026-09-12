import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { Camp } from '../../types';

interface CampEligibilityModalProps {
  camp: Camp | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CampEligibilityModal: React.FC<CampEligibilityModalProps> = ({ camp, isOpen, onClose }) => {
  const [userWing, setUserWing] = useState<'Army Wing' | 'Naval Wing' | 'Air Wing'>('Army Wing');
  const [attendancePct, setAttendancePct] = useState<number>(82);
  const [cadetYear, setCadetYear] = useState<number>(2);

  if (!isOpen || !camp) return null;

  const isWingEligible = camp.wing === 'All Wings' || camp.wing === userWing;
  const isAttendanceEligible = attendancePct >= 75;
  const isYearEligible = cadetYear >= 1;

  const overallEligible = isWingEligible && isAttendanceEligible && isYearEligible;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0F2942] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base tracking-tight">Camp Eligibility Evaluator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-slate-800">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Camp</span>
            <h4 className="font-extrabold text-sm text-[#0F2942]">{camp.name}</h4>
            <p className="text-slate-500 text-[11px] mt-0.5">{camp.location} • Wing: <strong className="text-brand">{camp.wing}</strong></p>
          </div>

          {/* User Parameters Interactive Controls */}
          <div className="space-y-3 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
            <span className="font-extrabold text-slate-900 text-xs block">Simulate Cadet Profile</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Cadet Wing</label>
                <select
                  value={userWing}
                  onChange={(e) => setUserWing(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-xs"
                >
                  <option value="Army Wing">Army Wing</option>
                  <option value="Naval Wing">Naval Wing</option>
                  <option value="Air Wing">Air Wing</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Parade Attendance %</label>
                <input
                  type="number"
                  value={attendancePct}
                  onChange={(e) => setAttendancePct(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-xs"
                  min="0" max="100"
                />
              </div>
            </div>
          </div>

          {/* Criteria Checklist Breakdown */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Criteria Checklist</span>
            
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800">✓ Active Cadet Status</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800">✓ Drill Attendance (Min 75%)</span>
              <span className={`font-bold flex items-center gap-1 ${isAttendanceEligible ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isAttendanceEligible ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                {attendancePct}%
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800">✓ Wing Compatibility ({camp.wing})</span>
              <span className={`font-bold flex items-center gap-1 ${isWingEligible ? 'text-emerald-700' : 'text-rose-600'}`}>
                {isWingEligible ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                {userWing}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800">✓ Medical Fitness Form & ID Card</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified</span>
            </div>
          </div>

          {/* Diagnostic Result Result Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            overallEligible ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}>
            <div className="flex items-center space-x-2">
              {overallEligible ? <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" /> : <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />}
              <div>
                <h4 className="font-extrabold text-sm">{overallEligible ? 'ELIGIBLE FOR CAMP' : 'NOT ELIGIBLE'}</h4>
                <p className="text-[11px] text-slate-600">
                  {overallEligible ? 'All mandatory criteria satisfied. You can submit application.' : 'Shortfall detected in attendance or wing matching.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-300 transition-colors">Close</button>
        </div>

      </div>
    </div>
  );
};
