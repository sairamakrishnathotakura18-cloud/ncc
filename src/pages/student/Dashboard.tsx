import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProgressCircle } from '../../components/dashboard/ProgressCircle';
import { StatCard } from '../../components/cards/StatCard';
import { CheckSquare, Calendar, Award, FileCheck, Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockTrainingSessions } from '../../data/training';
import { mockCamps } from '../../data/camps';
import { mockCertificates } from '../../data/certificates';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-navy-light">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ACTIVE CADET
            </span>
            <span className="text-xs text-amber-300 font-semibold">{user?.rank}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good Morning, {user?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Here's your NCC parade attendance, camp applications, and certificate status overview.
          </p>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 space-y-1 text-xs shrink-0 z-10">
          <span className="text-gray-300 block text-[10px] uppercase font-bold">Cadet Roll ID</span>
          <span className="font-mono font-extrabold text-amber-300 text-sm">{user?.cadetId || '2024-CSE-042'}</span>
          <span className="text-gray-300 block text-[11px] pt-1">{user?.unit}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Parade Attendance" value="82%" subtitle="41 Present / 9 Absent" icon={CheckSquare} color="green" trend="Target 75% Met" />
        <StatCard title="Enrolled Camps" value="2" subtitle="1 Attended / 1 Upcoming" icon={Layers} color="blue" />
        <StatCard title="Certificates Earned" value="1" subtitle="B-Certificate (Grade A)" icon={FileCheck} color="gold" />
        <StatCard title="Campus Honors" value="1" subtitle="Best Cadet State Award" icon={Award} color="amber" />
      </div>

      {/* Main Grid: Attendance Circle + NCC Journey */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Attendance circular progress card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card flex flex-col justify-between items-center text-center space-y-6">
          <div className="w-full text-left border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-navy">Parade Attendance Ratio</h3>
            <p className="text-xs text-text-secondary">Mandatory minimum 75% required for B & C exams.</p>
          </div>

          <ProgressCircle percentage={82} required={75} size={160} strokeWidth={14} />

          <div className="grid grid-cols-3 gap-3 w-full text-xs pt-2">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-text-muted block text-[10px]">Present</span>
              <span className="font-extrabold text-emerald-700 text-base">41</span>
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
              <span className="text-text-muted block text-[10px]">Absent</span>
              <span className="font-extrabold text-red-700 text-base">9</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-text-muted block text-[10px]">Required</span>
              <span className="font-extrabold text-blue-700 text-base">75%</span>
            </div>
          </div>
        </div>

        {/* NCC Journey Timeline Component */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-navy">Cadet Journey Progression</h3>
            <p className="text-xs text-text-secondary">Track your progression from Enrollment to C-Certificate.</p>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { title: '1st Year Enrollment', desc: 'Enrolled in 1st Bengal BN Army Wing', status: 'Completed', date: 'Aug 2023' },
              { title: 'Annual Training Camp (ATC)', desc: 'Attended 10-day ATC Kalyani Cantonment', status: 'Completed', date: 'Oct 2024' },
              { title: 'B-Certificate Examination', desc: 'Passed B-Cert Exam with Grade A', status: 'Completed', date: 'May 2025' },
              { title: 'Senior Rank Promotion', desc: 'Promoted to Senior Under Officer (SUO)', status: 'Completed', date: 'Jan 2026' },
              { title: 'C-Certificate Examination', desc: 'Directorate Exam Scheduled for May 2026', status: 'In Progress', date: 'Pending' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                }`}>
                  {step.status === 'Completed' ? '✓' : idx + 1}
                </div>
                <div className="flex-1 bg-page p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-navy">{step.title}</h4>
                    <p className="text-text-secondary text-[11px]">{step.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-text-muted">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Upcoming Training & Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-navy">Upcoming Training Session</h3>
            <Link to="/student/training" className="text-xs text-brand font-semibold hover:underline">View All</Link>
          </div>
          <div className="p-4 bg-brand-light rounded-2xl border border-brand-border space-y-2 text-xs">
            <span className="bg-brand text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Next Drill Parade</span>
            <h4 className="font-bold text-navy text-sm">{mockTrainingSessions[0].topic}</h4>
            <p className="text-text-secondary">{mockTrainingSessions[0].date} • {mockTrainingSessions[0].time}</p>
            <p className="text-text-secondary font-medium">📍 {mockTrainingSessions[0].location}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-navy">My Certificate Summary</h3>
            <Link to="/student/certificates" className="text-xs text-brand font-semibold hover:underline">Download</Link>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-xs">
            <span className="gold-gradient-badge text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block">B Certificate</span>
            <h4 className="font-bold text-navy text-sm">{mockCertificates[0].certificateNumber}</h4>
            <p className="text-text-secondary">Issued by: {mockCertificates[0].issuingUnit}</p>
            <p className="text-emerald-700 font-bold">✓ Grade A Verified</p>
          </div>
        </div>

      </div>
    </div>
  );
};
