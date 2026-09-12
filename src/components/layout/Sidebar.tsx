import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, CheckSquare, Calendar, Award, Shield, FileText,
  Bell, Settings, LogOut, Users, FileCheck, Layers, PieChart, Building,
  DollarSign, Activity, Image, HelpCircle, ArrowLeft, Sliders
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Student Links
  const studentLinks = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Attendance', path: '/student/attendance', icon: CheckSquare },
    { label: 'Training Schedule', path: '/student/training', icon: Calendar },
    { label: 'My Camps', path: '/student/camps', icon: Layers },
    { label: 'Certificates', path: '/student/certificates', icon: FileCheck },
    { label: 'Achievements', path: '/student/achievements', icon: Award },
    { label: 'Social Activities', path: '/student/activities', icon: Activity },
    { label: 'My Documents', path: '/student/documents', icon: FileText },
    { label: 'Notifications', path: '/student/notifications', icon: Bell },
  ];

  // Officer Links
  const officerLinks = [
    { label: 'Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
    { label: 'Cadet Directory', path: '/officer/cadets', icon: Users },
    { label: 'Applications', path: '/officer/applications', icon: FileText },
    { label: 'Mark Attendance', path: '/officer/attendance', icon: CheckSquare },
    { label: 'Training Management', path: '/officer/training', icon: Calendar },
    { label: 'Camp Management', path: '/officer/camps', icon: Layers },
    { label: 'Certificates', path: '/officer/certificates', icon: FileCheck },
    { label: 'Achievers', path: '/officer/achievements', icon: Award },
    { label: 'Activities', path: '/officer/activities', icon: Activity },
    { label: 'Notices', path: '/officer/notices', icon: Bell },
    { label: 'Reports & Analytics', path: '/officer/reports', icon: PieChart },
  ];

  // Admin Links
  const adminLinks = [
    { label: 'System Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Student Cadets', path: '/admin/students', icon: User },
    { label: 'NCC Officers', path: '/admin/officers', icon: Shield },
    { label: 'Departments', path: '/admin/departments', icon: Building },
    { label: 'Units & Battalions', path: '/admin/units', icon: Layers },
    { label: 'Ranks & Badges', path: '/admin/ranks', icon: Award },
    { label: 'Eligibility Rules', path: '/admin/eligibility', icon: Sliders },
    { label: 'Camp Master', path: '/admin/camps', icon: Calendar },
    { label: 'Certificate Master', path: '/admin/certificates', icon: FileCheck },
    { label: 'Achievements Master', path: '/admin/achievements', icon: Award },
    { label: 'Activities Master', path: '/admin/activities', icon: Activity },
    { label: 'Training Schedule', path: '/admin/training', icon: Calendar },
    { label: 'Notice Board', path: '/admin/notices', icon: Bell },
    { label: 'Gallery Manager', path: '/admin/gallery', icon: Image },
    { label: 'Payments & Allowances', path: '/admin/payments', icon: DollarSign },
    { label: 'System Reports', path: '/admin/reports', icon: PieChart },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const currentLinks = role === 'student' ? studentLinks : role === 'officer' ? officerLinks : adminLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-navy/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-navy text-white flex flex-col border-r border-navy-light/30 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Logo branding */}
        <div className="p-5 border-b border-navy-light/30 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block">NCC Connect</span>
              <span className="text-[10px] font-semibold text-brand-light uppercase tracking-wider block">
                {role.toUpperCase()} PORTAL
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-navy-light/40 border border-navy-light/40 flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-brand"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <p className="text-[11px] text-gray-300 truncate">{user?.rank || user?.email}</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {currentLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-brand text-white shadow-md'
                    : 'text-gray-300 hover:bg-navy-light/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-gray-400'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-navy-light/30 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-navy-light/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" /> Public Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-red-400" /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
};
