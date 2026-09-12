import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, LogIn, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs } = useAuth();
  const [email, setEmail] = useState('student@ncc.demo');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('officer')) {
      loginAs('officer');
      navigate('/officer/dashboard');
    } else if (email.includes('admin')) {
      loginAs('admin');
      navigate('/admin/dashboard');
    } else {
      loginAs('student');
      navigate('/student/dashboard');
    }
  };

  const fillDemo = (role: UserRole) => {
    loginAs(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Branding Side */}
        <div className="md:col-span-5 bg-navy text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-amber-400 shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold text-brand-light uppercase tracking-wider block">State Central University</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">NCC Connect Portal</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Unified Cadet Academic & Management System. Access parade attendance, camp applications, and certificate verification.
            </p>
          </div>

          <div className="gold-gradient-badge text-amber-900 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 z-10 my-6">
            <Award className="w-6 h-6 text-amber-700 shrink-0" />
            <span>"Unity and Discipline" • University Cadet Cell</span>
          </div>

          <div className="text-[11px] text-gray-400 z-10">
            © 2026 University NCC Connect Board
          </div>
        </div>

        {/* Right Form Side */}
        <div className="md:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-navy">Portal Sign In</h3>
            <p className="text-xs text-text-secondary">Enter your email or student ID to access your dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-navy block mb-1">Email / Student ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
            >
              <LogIn className="w-4 h-4" /> Sign In to Portal
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block text-center">
              Instant Demo One-Click Login
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => fillDemo('student')}
                className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-bold hover:bg-blue-100 transition-colors text-center"
              >
                Student
              </button>
              <button
                onClick={() => fillDemo('officer')}
                className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-bold hover:bg-amber-100 transition-colors text-center"
              >
                Officer
              </button>
              <button
                onClick={() => fillDemo('admin')}
                className="p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-navy font-bold hover:bg-slate-200 transition-colors text-center"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
