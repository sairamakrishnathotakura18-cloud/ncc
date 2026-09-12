import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/cards/StatCard';
import { Users, FileText, CheckSquare, Layers, Award, Shield, ArrowRight } from 'lucide-react';
import { mockCadets } from '../../data/students';
import { mockApplications } from '../../data/applications';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';

export const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Officer Welcome Header */}
      <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-navy-light">
        <div className="space-y-2 z-10">
          <span className="bg-amber-400 text-navy text-[11px] font-extrabold px-3 py-0.5 rounded-full inline-block">
            OFFICER COMMAND PORTAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Company Commander • {user?.unit} • {user?.department}
          </p>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 space-y-1 text-xs shrink-0 z-10">
          <span className="text-gray-300 block text-[10px] uppercase font-bold">Officer ID</span>
          <span className="font-mono font-extrabold text-amber-300 text-sm">ANO-2018-09</span>
          <span className="text-emerald-300 block text-[11px]">Commanding Company A</span>
        </div>
      </div>

      {/* Officer Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Enrolled Cadets" value={180} subtitle="110 SD / 70 SW" icon={Users} color="blue" />
        <StatCard title="Pending Applications" value={4} subtitle="Requires Review" icon={FileText} color="amber" trend="4 New Today" />
        <StatCard title="Parade Attendance" value="84%" subtitle="Last Session Target 75%" icon={CheckSquare} color="green" />
        <StatCard title="Active Training Camps" value={2} subtitle="ATC & Trekking" icon={Layers} color="navy" />
      </div>

      {/* Cadets & Applications Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pending Applications Review Widget */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-navy">Pending Cadet Applications</h3>
            <Link to="/officer/applications" className="text-xs text-brand font-semibold hover:underline">Manage All</Link>
          </div>

          <div className="space-y-3 text-xs">
            {mockApplications.map((app) => (
              <div key={app.id} className="p-3.5 bg-page rounded-2xl border border-gray-100 flex items-center justify-between gap-3 hover:border-brand/40 transition-colors">
                <div>
                  <h4 className="font-bold text-navy text-sm">{app.applicantName}</h4>
                  <p className="text-text-secondary">{app.department} • {app.submittedDate}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Cadet Directory Snapshot */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-navy">Senior Cadet Appointments</h3>
            <Link to="/officer/cadets" className="text-xs text-brand font-semibold hover:underline">Cadet Roster</Link>
          </div>

          <div className="space-y-3 text-xs">
            {mockCadets.slice(0, 4).map((cadet) => (
              <div key={cadet.id} className="p-3.5 bg-page rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={cadet.photo} alt={cadet.name} className="w-10 h-10 rounded-full object-cover border border-brand" />
                  <div>
                    <h4 className="font-bold text-navy">{cadet.name}</h4>
                    <p className="text-brand font-semibold text-[11px]">{cadet.rank}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {cadet.attendancePercentage}% Att.
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
