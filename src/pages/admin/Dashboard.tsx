import React, { useState } from 'react';
import {
  Users, Award, Calendar, ShieldCheck, UserPlus, Tent, CheckSquare, Upload, Bell, FileText, Filter
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [selectedWing, setSelectedWing] = useState<'ALL' | 'Army Unit' | 'Naval Unit'>('ALL');

  // Dynamic statistics based on unit filter
  const statsMap = {
    ALL: { totalCadets: 650, activeCadets: 580, wings: 2, camps: 12, certificates: 428 },
    'Army Unit': { totalCadets: 420, activeCadets: 380, wings: 1, camps: 7, certificates: 280 },
    'Naval Unit': { totalCadets: 230, activeCadets: 200, wings: 1, camps: 5, certificates: 148 },
  };

  const currentStats = statsMap[selectedWing];

  // Recharts Mock Datasets
  const wingDistribution = [
    { wing: 'Army Unit', cadets: 420 },
    { wing: 'Naval Unit', cadets: 230 },
  ];

  const attendanceTrend = [
    { month: 'Oct', attendance: 82 },
    { month: 'Nov', attendance: 86 },
    { month: 'Dec', attendance: 79 },
    { month: 'Jan', attendance: 91 },
    { month: 'Feb', attendance: 88 },
    { month: 'Mar', attendance: 93 },
  ];

  const enrollmentHistory = [
    { year: '2023-24', cadets: 480 },
    { year: '2024-25', cadets: 540 },
    { year: '2025-26', cadets: 610 },
    { year: '2026-27', cadets: 650 },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & Wing Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-extrabold text-[#1677FF] uppercase tracking-wider">ITM UNIVERSITY ADMIN</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942]">ITM NCC Analytics Dashboard</h1>
          <p className="text-xs text-slate-500">Real-time unit analytics across Army and Naval units.</p>
        </div>

        {/* Unit Filter Switcher */}
        <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          <span className="text-xs font-bold text-slate-500 mr-1">Unit:</span>
          {[
            { label: 'ALL UNITS', value: 'ALL' },
            { label: 'ARMY UNIT', value: 'Army Unit' },
            { label: 'NAVAL UNIT', value: 'Naval Unit' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setSelectedWing(item.value as any);
                showToast(`Analytics filtered for ${item.label}`, 'info');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedWing === item.value
                  ? 'bg-[#082B57] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Cadets</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1677FF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-[#082B57] tracking-tight block">{currentStats.totalCadets}</span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            ✓ {currentStats.activeCadets} Active Cadets
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">NCC Units</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-[#082B57] tracking-tight block">{currentStats.wings} Units</span>
          <span className="text-[11px] text-slate-500 font-semibold">Army Unit • Naval Unit</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Upcoming Camps</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0EA5E9] flex items-center justify-center">
              <Tent className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-[#0F2942] tracking-tight block">{currentStats.camps}</span>
          <span className="text-[11px] text-amber-600 font-bold">Registration Open</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Certificates</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-[#0F2942] tracking-tight block">{currentStats.certificates}</span>
          <span className="text-[11px] text-emerald-600 font-bold">✓ 100% Verified Records</span>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Quick Authority Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-bold">
          <button onClick={() => showToast('Opening Cadet Registration Form...', 'info')} className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1677FF] rounded-xl border border-blue-200 flex items-center justify-center gap-1.5 cursor-pointer">
            <UserPlus className="w-4 h-4" /> Add Cadet
          </button>
          <button onClick={() => showToast('Opening Camp Creation Wizard...', 'info')} className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 flex items-center justify-center gap-1.5 cursor-pointer">
            <Tent className="w-4 h-4" /> Create Camp
          </button>

          <Link to="/officer/attendance" className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer">
            <CheckSquare className="w-4 h-4" /> Mark Attendance
          </Link>

          <Link to="/officer/selected-cadets" className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl border border-amber-200 flex items-center justify-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4" /> Upload List
          </Link>

          <button onClick={() => showToast('Publishing New Notice...', 'info')} className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 cursor-pointer">
            <Bell className="w-4 h-4" /> Publish Notice
          </button>
          <Link to="/officer/selected-cadets" className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer">
            <FileText className="w-4 h-4" /> Applications
          </Link>
        </div>
      </div>

      {/* Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Cadets by NCC Wing */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-[#0F2942]">Cadets Strength by NCC Wing</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wingDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="wing" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="cadets" fill="#1677FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Attendance Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-[#0F2942]">Parade Attendance Trend (%)</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis domain={[60, 100]} stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 5, fill: '#0EA5E9' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Annual Enrollment */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <h3 className="font-extrabold text-sm text-[#0F2942]">Annual NCC Cadet Enrollment Growth</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="cadets" fill="#0F2942" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
