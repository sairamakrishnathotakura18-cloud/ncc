import React from 'react';
import { X, Shield, Phone, Mail, CheckCircle } from 'lucide-react';
import { Cadet } from '../../types';

interface DossierDrawerProps {
  cadet: Cadet | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DossierDrawer: React.FC<DossierDrawerProps> = ({ cadet, isOpen, onClose }) => {
  if (!isOpen || !cadet) return null;

  const regNum = cadet.regimentalNumber || 'WB/23/SD/A/104089';
  const bloodGrp = cadet.bloodGroup || 'B+';
  const camps = cadet.campsAttended || ['Combined Annual Training Camp (CATC-104)'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 bg-navy text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base tracking-wide">Cadet Service Dossier</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
            {/* Cadet Summary Banner */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-14 h-14 rounded-full bg-navy text-white font-bold text-xl flex items-center justify-center shadow-xs">
                {cadet.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 leading-tight">{cadet.name}</h4>
                <p className="text-xs font-medium text-navy-light">{cadet.rank} • {cadet.unit}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-sky-100 text-sky-800 font-mono text-[10px] font-bold rounded-md">
                  {regNum}
                </span>
              </div>
            </div>

            {/* General Info Grid */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Personal & Academic</h5>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Student ID</span>
                  <span className="font-semibold text-slate-800">{cadet.studentId}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Department</span>
                  <span className="font-semibold text-slate-800">{cadet.department}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Course / Year</span>
                  <span className="font-semibold text-slate-800">{cadet.course} ({cadet.year} Year)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Blood Group / DOB</span>
                  <span className="font-semibold text-slate-800">{bloodGrp} • {cadet.dob}</span>
                </div>
              </div>
            </div>

            {/* Attendance & Performance */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Parade Performance</h5>
              <div className="p-4 border border-slate-200 rounded-xl bg-gradient-to-r from-sky-50/50 to-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600 block">Current Session Attendance</span>
                  <span className="text-2xl font-black text-navy">{cadet.attendancePercentage}%</span>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${cadet.attendancePercentage >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {cadet.attendancePercentage >= 75 ? 'Eligible for Certificate' : 'Shortfall Warning'}
                  </span>
                </div>
              </div>
            </div>

            {/* Camps Attended */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Camps & Expeditions</h5>
              <div className="space-y-2 text-xs">
                {camps.length > 0 ? (
                  camps.map((campItem: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-slate-800">{campItem}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Completed</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs italic">No camps registered yet</p>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Channels</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{cadet.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{cadet.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
