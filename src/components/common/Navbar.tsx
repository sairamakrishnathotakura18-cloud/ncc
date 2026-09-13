import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, LogIn, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserManualDropdown } from './UserManualDropdown';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'NCC Units', path: '/wings' },
    { label: 'Camps', path: '/camps' },
    { label: 'Programs', path: '/training' },
    { label: 'Achievements', path: '/achievements' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & ITM University Header */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Dual Emblem Badge: ITM Logo Box + Official NCC Crest Shield */}
            <div className="flex items-center space-x-2">
              <img src="/itm-logo.png" alt="ITM University Logo" className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
              <div className="w-10 h-12 flex items-center justify-center bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
                {/* Official NCC Crest Shield Tri-Band SVG */}
                <svg viewBox="0 0 100 120" className="w-full h-full">
                  <path d="M10 10 H90 V70 Q90 100 50 115 Q10 100 10 70 Z" fill="#D92D20" />
                  <path d="M35 10 H65 V107 Q50 115 35 107 Z" fill="#0F2942" />
                  <path d="M65 10 H90 V70 Q90 100 50 115 V107 Q65 107 65 10 Z" fill="#0EA5E9" />
                  <circle cx="50" cy="55" r="28" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="4 2" />
                  <text x="50" y="60" textAnchor="middle" fill="#F59E0B" fontSize="20" fontWeight="900" fontFamily="sans-serif">NCC</text>
                </svg>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0F2942] block leading-tight">
                ITM UNIVERSITY
              </span>
              <span className="text-base font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                NCC Digital Management Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive('/') ? 'bg-blue-50 text-[#1677FF]' : 'text-slate-700 hover:text-[#1677FF] hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive('/about') ? 'bg-blue-50 text-[#1677FF]' : 'text-slate-700 hover:text-[#1677FF] hover:bg-slate-50'
              }`}
            >
              About
            </Link>

            {/* User Manual Dropdown Menu */}
            <UserManualDropdown />

            <Link
              to="/wings"
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive('/wings') ? 'bg-blue-50 text-[#1677FF]' : 'text-slate-700 hover:text-[#1677FF] hover:bg-slate-50'
              }`}
            >
              NCC Units
            </Link>

            <Link
              to="/camps"
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive('/camps') ? 'bg-blue-50 text-[#1677FF]' : 'text-slate-700 hover:text-[#1677FF] hover:bg-slate-50'
              }`}
            >
              Camps
            </Link>

            <Link
              to="/training"
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive('/training') ? 'bg-blue-50 text-[#1677FF]' : 'text-slate-700 hover:text-[#1677FF] hover:bg-slate-50'
              }`}
            >
              Programs
            </Link>

            <Link
              to="/achievements"
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive('/achievements') ? 'bg-blue-50 text-[#1677FF]' : 'text-slate-700 hover:text-[#1677FF] hover:bg-slate-50'
              }`}
            >
              Achievements
            </Link>
          </nav>

          {/* Right Action Container: Login Button & Mobile 3-Lines Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Link
                to={`/${user?.role}/dashboard`}
                className="bg-[#0F2942] hover:bg-[#1B3E60] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-[#1677FF] hover:bg-blue-700 text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger 3-Lines Button (Only for mobile view, hidden on desktop) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-[#1677FF]'
                    : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Manual Mobile Accordion */}
          <UserManualDropdown isMobile onItemClick={() => setMobileOpen(false)} />

          <div className="border-t border-slate-100 pt-3">
            {isAuthenticated ? (
              <Link
                to={`/${user?.role}/dashboard`}
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#0F2942] text-white text-center py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-amber-400" /> Go to {user?.role.toUpperCase()} Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#1677FF] text-white text-center py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
