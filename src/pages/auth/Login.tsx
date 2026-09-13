import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, Lock, Mail, Eye, EyeOff, ArrowLeft, ArrowRight, CheckCircle2,
  AlertCircle, QrCode, Award, Users, Anchor, FileText, Check, Sparkles, Building
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs } = useAuth();

  // Active View Tab: 'login' | 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Selected Role State
  type LoginRole = 'student' | 'officer' | 'admin';
  const [selectedRole, setSelectedRole] = useState<LoginRole>('student');
  const [identifier, setIdentifier] = useState('betn1ai25216');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration Form State
  const [regFullName, setRegFullName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regCollege, setRegCollege] = useState('ITM University Gwalior');
  const [regUnit, setRegUnit] = useState('8 MP Artillery Battalion');
  const [regRank, setRegRank] = useState('Cadet (CDT)');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Dynamic Form Field Labels per Role
  const roleConfig: Record<LoginRole, { title: string; label: string; placeholder: string; defaultId: string; badge: string }> = {
    student: {
      title: 'Cadet Access',
      label: 'Student ID / Registered Email',
      placeholder: 'e.g. betn1ai25216 or cadet@itm.edu.in',
      defaultId: 'betn1ai25216',
      badge: 'Army Unit & Naval Unit Cadets',
    },
    officer: {
      title: 'NCC Officer / ANO Access',
      label: 'Officer ID / Official Email',
      placeholder: 'e.g. ANO/ITM/2026/04 or officer@itm.edu.in',
      defaultId: 'ANO/ITM/2026/04',
      badge: 'ANO Officers & Unit Instructors',
    },
    admin: {
      title: 'NCC Administration Access',
      label: 'Admin ID / Management Email',
      placeholder: 'e.g. ADM/ITM/NCC/01 or admin@itm.edu.in',
      defaultId: 'ADM/ITM/NCC/01',
      badge: 'University Battalion Command',
    },
  };

  const handleRoleChange = (role: LoginRole) => {
    setSelectedRole(role);
    setIdentifier(roleConfig[role].defaultId);
    setToastMessage(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToastMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      loginAs(selectedRole);
      setToastMessage({ type: 'success', text: `Login Successful! Entering ${selectedRole.toUpperCase()} Portal...` });

      setTimeout(() => {
        navigate(`/${selectedRole}/dashboard`);
      }, 1000);
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setToastMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setToastMessage({ type: 'success', text: 'Registration Submitted Successfully! Returning to Login...' });
      
      setTimeout(() => {
        setIdentifier(regStudentId || 'betn1ai25216');
        setActiveTab('login');
      }, 1500);
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-200 text-slate-800 flex flex-col justify-between relative selection:bg-[#1677FF] selection:text-white">
      
      {/* 1. TOP BLUE CONTACT BAR */}
      <div className="bg-[#082B57] text-white py-2.5 sm:py-3 px-3 sm:px-6 md:px-8 border-b border-slate-700 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs md:text-sm">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-medium">
            <a href="tel:18002700031" className="flex items-center gap-1.5 hover:underline shrink-0">
              <span className="text-slate-300">📞</span>
              <span>Call us : <strong className="text-white font-bold">18002700031</strong></span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a href="mailto:erp@itmuniversity.ac.in" className="flex items-center gap-1.5 hover:underline shrink-0">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
              <span>E-mail : <strong className="text-white font-bold">erp@itmuniversity.ac.in</strong></span>
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('login')}
              className={`font-bold hover:underline flex items-center gap-1 cursor-pointer ${activeTab === 'login' ? 'text-white' : 'text-slate-300'}`}
            >
              <span>Log in</span>
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setActiveTab('register')}
              className={`font-bold hover:underline flex items-center gap-1 cursor-pointer ${activeTab === 'register' ? 'text-amber-300' : 'text-slate-300'}`}
            >
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRANDING HEADER BAR (RESPONSIVE) */}
      <header className="bg-white border-b border-slate-200 px-3 sm:px-6 md:px-8 py-3 sm:py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* ITM Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <img
              src="/itm-logo.png"
              onError={(e) => { (e.target as HTMLImageElement).src = './public/itm-logo.png'; }}
              alt="ITM University Logo"
              className="h-9 sm:h-12 md:h-14 object-contain"
            />
            <div className="h-7 sm:h-8 w-px bg-slate-300 hidden sm:block"></div>
            <div className="hidden sm:block">
              <span className="text-xs sm:text-sm font-black text-[#082B57] uppercase tracking-wide block">
                ITM UNIVERSITY GWALIOR
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 block">
                NCC Digital Management Portal
              </span>
            </div>
          </Link>

          {/* Home Link */}
          <Link
            to="/"
            className="text-xs sm:text-sm md:text-base font-bold text-slate-700 hover:text-[#082B57] transition-colors flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* TOAST NOTIFICATION FLOATER */}
      {toastMessage && (
        <div className="fixed top-20 right-3 sm:right-8 z-50 animate-fadeIn">
          <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border text-xs font-bold ${
            toastMessage.type === 'success' ? 'bg-emerald-950 text-emerald-200 border-emerald-500/50' : 'bg-red-950 text-red-200 border-red-500/50'
          }`}>
            {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 3. CENTERED LOGIN & REGISTRATION BOX CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-12 md:py-16 flex-1 flex items-center justify-center">
        
        {activeTab === 'login' ? (
          /* LOGIN BOX VIEW */
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 p-5 sm:p-8 md:p-10 w-full max-w-[350px] sm:max-w-md md:max-w-lg mx-auto space-y-5 sm:space-y-6 animate-fadeIn">
            
            {/* ITM University Logo & Titles */}
            <div className="text-center">
              <img
                src="/itm-logo.png"
                onError={(e) => { (e.target as HTMLImageElement).src = './public/itm-logo.png'; }}
                alt="ITM University Logo"
                className="h-12 sm:h-16 md:h-18 object-contain mx-auto mb-2 sm:mb-3"
              />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">NCC Portal Login</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-bold pt-0.5 sm:pt-1">National Cadet Corps • ITM University Gwalior</p>
            </div>

            {/* Role Selector Tabs */}
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-center">
                {(['student', 'officer', 'admin'] as LoginRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-all cursor-pointer text-center ${
                      selectedRole === role
                        ? 'bg-[#1677FF] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#1677FF] font-semibold block text-center pt-0.5 sm:pt-1">
                {roleConfig[selectedRole].badge}
              </span>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleLogin} className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
              
              {/* Email / Username Field */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 sm:mb-1.5 text-xs">
                  Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={roleConfig[selectedRole].placeholder}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] transition-all text-xs sm:text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 sm:mb-1.5 text-xs">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-3.5 sm:pl-4 pr-10 py-2.5 sm:py-3 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] transition-all text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[#1677FF] hover:underline text-xs font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1677FF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* REGISTER OPTION INSIDE LOGIN BOX */}
            <div className="pt-2 border-t border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-600 font-medium">Need an account to manage your NCC profile?</p>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#082B57] font-bold py-2.5 rounded-xl border border-slate-300 transition-colors text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#1677FF]" />
                <span>Register for NCC</span>
              </button>
            </div>

            {/* Bottom Info Box */}
            <div className="bg-slate-100/80 border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center text-[11px] sm:text-xs text-slate-500 font-medium">
              Enter your registered email and password to login
            </div>

          </div>
        ) : (
          /* REGISTRATION BOX VIEW (NCC DETAILS) */
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 p-5 sm:p-8 md:p-10 w-full max-w-[360px] sm:max-w-lg md:max-w-xl mx-auto space-y-5 sm:space-y-6 animate-fadeIn">
            
            {/* ITM Logo & Header */}
            <div className="text-center">
              <img
                src="/itm-logo.png"
                onError={(e) => { (e.target as HTMLImageElement).src = './public/itm-logo.png'; }}
                alt="ITM University Logo"
                className="h-12 sm:h-16 object-contain mx-auto mb-2"
              />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">NCC Cadet Registration</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-bold pt-0.5">ITM University Gwalior • Army & Naval Units</p>
            </div>

            {/* Back to Login Navigation Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
              <span className="font-bold text-slate-700">New Cadet Enrollment Form</span>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-[#1677FF] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </button>
            </div>

            {/* REGISTRATION FORM */}
            <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                {/* 1. Full Name */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

                {/* 2. Cadet / Student ID */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Cadet / Student ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regStudentId}
                    onChange={(e) => setRegStudentId(e.target.value)}
                    placeholder="e.g. MP/2026/SD/10045"
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

                {/* 3. Email */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. cadet@itm.edu.in"
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

                {/* 4. Mobile Number */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

                {/* 5. Date of Birth */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

                {/* 6. College / Institution */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    College / Institution <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={regCollege}
                    onChange={(e) => setRegCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  >
                    <option value="ITM University Gwalior">ITM University Gwalior</option>
                    <option value="School of Engineering & Tech (SET)">School of Engineering & Tech (SET)</option>
                    <option value="School of Management (SOM)">School of Management (SOM)</option>
                    <option value="School of Science (SOS)">School of Science (SOS)</option>
                  </select>
                </div>

                {/* 7. NCC Unit */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    NCC Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={regUnit}
                    onChange={(e) => setRegUnit(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  >
                    <option value="8 MP Artillery Battalion">8 MP Artillery Battalion (Boys)</option>
                    <option value="3 MP Artillery Girls Battalion">3 MP Artillery Girls Battalion (SW)</option>
                    <option value="3 MP Naval Unit">3 MP Naval Unit (Army/Navy)</option>
                  </select>
                </div>

                {/* 8. Rank */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Rank <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={regRank}
                    onChange={(e) => setRegRank(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  >
                    <option value="Cadet (CDT)">Cadet (CDT)</option>
                    <option value="Lance Corporal (L/CPL)">Lance Corporal (L/CPL)</option>
                    <option value="Corporal (CPL)">Corporal (CPL)</option>
                    <option value="Sergeant (SGT)">Sergeant (SGT)</option>
                    <option value="Under Officer (UO)">Under Officer (UO)</option>
                    <option value="Senior Under Officer (SUO)">Senior Under Officer (SUO)</option>
                  </select>
                </div>

                {/* 9. Password */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

                {/* 10. Confirm Password */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1677FF] text-xs sm:text-sm"
                  />
                </div>

              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1677FF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md mt-2 disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Submit Registration'}
              </button>

              {/* Back to Login Switch */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-600">Already registered? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-[#1677FF] hover:underline font-bold text-xs cursor-pointer"
                >
                  Sign In here →
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-3.5 sm:py-4 px-3 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/itm-logo.png"
              onError={(e) => { (e.target as HTMLImageElement).src = './public/itm-logo.png'; }}
              alt="ITM Logo"
              className="h-6 sm:h-7 object-contain"
            />
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#082B57] block">ITM UNIVERSITY NCC DIGITAL MANAGEMENT</span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 block">Unity and Discipline • Army & Naval Units</span>
            </div>
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500">
            © 2026 ITM University Gwalior. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white">Reset Your Access</h3>
              <button onClick={() => { setShowForgotModal(false); setForgotSent(false); }} className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>

            {!forgotSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  Enter your registered email or student ID and we'll help you restore access to the NCC portal.
                </p>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Registered Email / Student ID</label>
                  <input
                    type="text"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="e.g. cadet@itm.edu.in or MP/2026/SD/10045"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#1677FF]"
                  />
                </div>
                <button type="submit" className="w-full bg-[#1677FF] hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md transition-colors">
                  Send Verification
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-xs text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-white text-base">Verification Link Sent</h4>
                <p className="text-slate-300">
                  Please check your registered email inbox for password recovery instructions.
                </p>
                <button
                  type="button"
                  onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ABOUT NCC MODAL */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-auto max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <img src="/itm-logo.png" alt="ITM Seal" className="w-8 h-8 rounded-full border border-amber-400" />
                <h3 className="text-lg font-extrabold text-[#082B57]">About National Cadet Corps (NCC)</h3>
              </div>
              <button onClick={() => setShowAboutModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer">✕</button>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                The National Cadet Corps came into existence on <strong>16 July 1948</strong>, under the 31st NCC Act of 1948, based on the recommendation of Pundit H Kunzru Committee.
              </p>
              <p>
                ITM University Gwalior operates 3 established active NCC Units: 8 MP Artillery Battalion, 3 MP Artillery Girls Battalion, and 3 MP Naval Unit.
              </p>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 font-bold text-xs">
                Motto: "Unity and Discipline"
              </div>
            </div>
            <button onClick={() => setShowAboutModal(false)} className="w-full bg-[#082B57] text-white font-bold py-3 rounded-xl">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
