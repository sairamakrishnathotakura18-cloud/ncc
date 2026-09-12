import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2, XCircle, Award, BookOpen, Shield, Download } from 'lucide-react';
import { mockTwoDayProgram } from '../../data/trainingProgram';
import { useToast } from '../../context/ToastContext';

export const TwoDayTraining: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'day1' | 'day2'>('day1');
  const { showToast } = useToast();

  const [cadetsAttendance, setCadetsAttendance] = useState([
    { id: '1', name: 'Rahul Sharma', studentId: 'UG-2023-CS-042', wing: 'Army Unit', day1: 'Present', day2: 'Present' },
    { id: '2', name: 'Ananya Sen', studentId: 'UG-2023-PH-018', wing: 'Army Unit', day1: 'Present', day2: 'Present' },
    { id: '3', name: 'Vikram Singh', studentId: 'UG-2022-ME-009', wing: 'Army Unit', day1: 'Present', day2: 'Present' },
    { id: '4', name: 'Priya Verma', studentId: 'UG-2023-EC-014', wing: 'Naval Unit', day1: 'Present', day2: 'Late' },
    { id: '5', name: 'Arjun Patel', studentId: 'UG-2024-ME-088', wing: 'Naval Unit', day1: 'Absent', day2: 'Present' },
    { id: '6', name: 'Meera Joshi', studentId: 'UG-2023-CS-105', wing: 'Army Unit', day1: 'Present', day2: 'Present' },
  ]);

  const toggleAttendance = (id: string, day: 'day1' | 'day2', newStatus: string) => {
    setCadetsAttendance(prev =>
      prev.map(c => (c.id === id ? { ...c, [day]: newStatus } : c))
    );
    showToast(`Attendance updated for Cadet`, 'info');
  };

  const program = mockTwoDayProgram;
  const currentDay = activeTab === 'day1' ? program.day1 : program.day2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F2942] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl space-y-4">
        <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
          <Award className="w-4 h-4" /> DEMONSTRATION MODULE • CADRE TRAINING
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{program.title}</h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Comprehensive 2-day mandatory cadre program evaluating theoretical military leadership and practical ground parade drill performance for ITM NCC Cadets.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('day1')}
            className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'day1'
                ? 'bg-[#1677FF] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> DAY 1 — THEORY LECTURES
          </button>

          <button
            onClick={() => setActiveTab('day2')}
            className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'day2'
                ? 'bg-[#0EA5E9] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" /> DAY 2 — PRACTICAL DRILL
          </button>
        </div>

        <button
          onClick={() => showToast('Exporting Cadre Attendance Sheet PDF...', 'success')}
          className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-300 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Attendance PDF
        </button>
      </div>

      {/* Day Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-extrabold text-[#0F2942] flex items-center gap-2">
            {currentDay.title}
          </h2>
          <span className="bg-blue-50 text-[#1677FF] text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
            Attendance Rate: {currentDay.attendancePct}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Topic / Subject</span>
            <span className="font-bold text-slate-900">{currentDay.topic}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Instructor</span>
            <span className="font-bold text-slate-900 flex items-center gap-1"><User className="w-3.5 h-3.5 text-brand" /> {currentDay.instructor}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Schedule & Time</span>
            <span className="font-bold text-slate-900 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {currentDay.time}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Venue</span>
            <span className="font-bold text-slate-900 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-500" /> {currentDay.venue}</span>
          </div>
        </div>
      </div>

      {/* Cadets Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#0F2942]">Cadet Roll Call & Attendance Log</h3>
          <span className="text-xs text-slate-500 font-medium">Click status buttons to mark live</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3">Student ID</th>
                <th className="px-6 py-3">Cadet Name</th>
                <th className="px-6 py-3">Wing</th>
                <th className="px-6 py-3">Day 1 Theory</th>
                <th className="px-6 py-3">Day 2 Practical</th>
                <th className="px-6 py-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {cadetsAttendance.map((cadet) => (
                <tr key={cadet.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-3.5 font-mono text-slate-500">{cadet.studentId}</td>
                  <td className="px-6 py-3.5 font-bold text-slate-900">{cadet.name}</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1677FF] border border-blue-200">
                      {cadet.wing}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      cadet.day1 === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {cadet.day1}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      cadet.day2 === 'Present' ? 'bg-emerald-100 text-emerald-800' : cadet.day2 === 'Late' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {cadet.day2}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right space-x-1">
                    <button
                      onClick={() => toggleAttendance(cadet.id, activeTab, 'Present')}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200 cursor-pointer"
                    >
                      Present
                    </button>
                    <button
                      onClick={() => toggleAttendance(cadet.id, activeTab, 'Absent')}
                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-bold border border-rose-200 cursor-pointer"
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Summary Bar */}
      <div className="bg-[#0F2942] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h4 className="font-extrabold text-base text-amber-400">Cadre Attendance Summary</h4>
          <p className="text-xs text-slate-300">Verified attendance metrics across 2-day theory & practical sessions.</p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-bold">
          <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/10">
            <span className="text-slate-400 block text-[10px]">Theory Attendance</span>
            <span className="text-lg text-blue-300 font-extrabold">92.5%</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/10">
            <span className="text-slate-400 block text-[10px]">Practical Attendance</span>
            <span className="text-lg text-sky-300 font-extrabold">88.0%</span>
          </div>
          <div className="bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-center font-extrabold shadow-md">
            <span className="text-slate-900 block text-[10px] uppercase">Overall Attendance</span>
            <span className="text-xl font-black">90.25%</span>
          </div>
        </div>
      </div>

    </div>
  );
};
