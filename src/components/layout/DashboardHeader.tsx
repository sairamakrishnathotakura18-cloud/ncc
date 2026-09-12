import React, { useState } from 'react';
import { Bell, Menu, Search, Check, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/notifications';

interface DashboardHeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setMobileOpen }) => {
  const { user, role, loginAs } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const userNotifs = mockNotifications.filter(n => n.role === role || n.role === 'student');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cadets, camps, certs..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">

        {/* Quick Role Switcher for Demo testing */}
        <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => loginAs('student')}
            className={`px-2.5 py-1 rounded-lg transition-all ${role === 'student' ? 'bg-brand text-white font-bold shadow-xs' : 'text-gray-600 hover:text-navy'}`}
          >
            Student
          </button>
          <button
            onClick={() => loginAs('officer')}
            className={`px-2.5 py-1 rounded-lg transition-all ${role === 'officer' ? 'bg-brand text-white font-bold shadow-xs' : 'text-gray-600 hover:text-navy'}`}
          >
            Officer
          </button>
          <button
            onClick={() => loginAs('admin')}
            className={`px-2.5 py-1 rounded-lg transition-all ${role === 'admin' ? 'bg-brand text-white font-bold shadow-xs' : 'text-gray-600 hover:text-navy'}`}
          >
            Admin
          </button>
        </div>

        {/* Notification Bell Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Notifications</h4>
                <span className="text-[10px] bg-brand-light text-brand font-bold px-2 py-0.5 rounded-full">
                  {userNotifs.length} New
                </span>
              </div>
              <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto my-2">
                {userNotifs.map((n) => (
                  <div key={n.id} className="py-3 space-y-1 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <p className="text-xs font-bold text-navy">{n.title}</p>
                    <p className="text-xs text-text-secondary">{n.message}</p>
                    <span className="text-[10px] text-gray-400 block">{n.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Summary Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover border border-brand"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-navy leading-tight">{user?.name}</p>
            <p className="text-[10px] font-semibold text-brand uppercase">{role}</p>
          </div>
        </div>

      </div>
    </header>
  );
};
