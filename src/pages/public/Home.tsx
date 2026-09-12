import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Anchor, Award, Users, Calendar, ArrowRight, ChevronRight,
  Sparkles, CheckCircle2, Trophy, MapPin, Building, Mail, Phone, ExternalLink
} from 'lucide-react';
import { mockCamps } from '../../data/camps';
import { mockNotices } from '../../data/notices';
import { mockAchievements } from '../../data/achievements';
import { mockUnits } from '../../data/wings';
import { mockOfficers } from '../../data/officers';
import { CampCard } from '../../components/cards/CampCard';
import { OfficerCarousel } from '../../components/common/OfficerCarousel';
import { AchieverSection } from '../../components/common/AchieverSection';
import { CampEligibilityModal } from '../../components/common/CampEligibilityModal';
import { Modal } from '../../components/common/Modal';
import { Camp, Achievement, Officer } from '../../types';

export const Home: React.FC = () => {
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [campCategoryTab, setCampCategoryTab] = useState<'All' | 'General' | 'National-Level'>('All');

  const filteredCamps = mockCamps.filter(c => campCategoryTab === 'All' || c.category === campCategoryTab);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 5. HERO SECTION */}
      <section className="relative overflow-hidden navy-gradient-bg text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" /> ITM NCC • NATIONAL CADET CORPS MANAGEMENT PORTAL
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              ITM NCC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-[#F5D061] to-white">
                Discipline • Leadership • Service • Nation Building
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Empowering Cadets. Connecting Units. Managing NCC Digitally. A unified digital management portal for ITM University's Army Unit and Naval Unit — managing camps, training, attendance, certificates, achievements and officer leadership.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/join"
                className="w-full sm:w-auto bg-[#1677FF] hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group text-sm"
              >
                <span>JOIN NCC</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/camps"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>EXPLORE CAMPS</span>
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-[#F5D061] hover:bg-amber-400 text-[#082B57] font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>LOGIN PORTAL</span>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white/10 border border-white/15 p-6 rounded-3xl backdrop-blur-md shadow-2xl space-y-5">
              
              {/* Crest & Unit Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-white rounded-xl p-1 border border-slate-300 shadow-md flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 120" className="w-full h-full">
                      <path d="M10 10 H90 V70 Q90 100 50 115 Q10 100 10 70 Z" fill="#D92D20" />
                      <path d="M35 10 H65 V107 Q50 115 35 107 Z" fill="#082B57" />
                      <path d="M65 10 H90 V70 Q90 100 50 115 V107 Q65 107 65 10 Z" fill="#0EA5E9" />
                      <circle cx="50" cy="55" r="28" fill="none" stroke="#F5D061" strokeWidth="4" strokeDasharray="4 2" />
                      <text x="50" y="60" textAnchor="middle" fill="#F5D061" fontSize="20" fontWeight="900" fontFamily="sans-serif">NCC</text>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">ITM University NCC Cell</h3>
                    <p className="text-xs text-amber-300 font-semibold">1st ITM Battalion (SD/SW)</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-400/30 shrink-0">
                  Active Units
                </span>
              </div>

              {/* Stats Summary */}
              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">Total Enrolled Cadets</span>
                  <span className="font-extrabold text-white text-sm">650 Cadets</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">Active Units</span>
                  <span className="font-extrabold text-[#F5D061]">Army Unit • Naval Unit</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5">
                  <span className="text-slate-300">Commanding Officer</span>
                  <span className="font-bold text-white">Capt. Arindam Roy (ANO)</span>
                </div>
              </div>

              {/* Governor Banner trophy highlight */}
              <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border border-amber-400/30 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-3">
                <Award className="w-6 h-6 text-[#F5D061] shrink-0" />
                <span className="text-amber-100 leading-snug">
                  🏆 Winner of Governor's Best University NCC Company Banner 2026
                </span>
              </div>

              {/* 14. LATEST ACHIEVEMENT HIGHLIGHT IN HERO CARD */}
              <div className="bg-white/10 border border-amber-400/40 p-3.5 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-extrabold text-amber-300">
                  <span>LATEST ACHIEVEMENT</span>
                  <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Cadet Rahul Sharma"
                    className="w-10 h-10 rounded-full object-cover border border-[#F5D061] shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-xs">Cadet Rahul Sharma</h4>
                    <p className="text-[11px] text-amber-200">Republic Day Camp (RDC) Rajpath Parade</p>
                  </div>
                </div>
                <a
                  href="#achievers-section"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F5D061] hover:underline pt-1"
                >
                  <span>View All Achievements</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. NCC STATISTICS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r last:border-0 border-slate-100">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#082B57] tracking-tight block">650</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled Cadets</span>
          </div>
          <div className="space-y-1 border-r last:border-0 border-slate-100">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#1677FF] tracking-tight block">2 Units</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Army Unit • Naval Unit</span>
          </div>
          <div className="space-y-1 border-r last:border-0 border-slate-100">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0EA5E9] tracking-tight block">12</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Camps</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight block">428</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Certificates</span>
          </div>
        </div>
      </section>

      {/* 7. ARMY + NAVAL UNITS */}
      <section id="units" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-[#1677FF] uppercase tracking-wider">One NCC. Two Units.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B57] tracking-tight">Active NCC Units</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            ITM University operates active specialized units across Army and Naval divisions of the National Cadet Corps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {mockUnits.map((unit) => (
            <div
              key={unit.id}
              className={`bg-white rounded-2xl border ${unit.borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${unit.badgeBg}`}>
                    {unit.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{unit.code}</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#082B57]">{unit.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{unit.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Cadet Strength:</span>
                  <strong className="text-slate-900 font-bold">{unit.totalCadets} Enrolled Cadets</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Commanding Officer:</span>
                  <strong className="text-slate-900 font-bold">{unit.commandingOfficer}</strong>
                </div>

                <Link
                  to="/wings"
                  className="w-full bg-slate-50 hover:bg-[#082B57] text-[#082B57] hover:text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs shadow-2xs group-hover:bg-[#082B57] group-hover:text-white"
                >
                  <span>Explore Unit Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CAMPS & TRAINING OPPORTUNITIES */}
      <section id="camps" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#1677FF] uppercase tracking-wider">Camps & Opportunities</span>
            <h2 className="text-2xl font-extrabold text-[#082B57] tracking-tight">Upcoming Camps Catalog</h2>
          </div>

          {/* Camp Category Tabs */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
            {['All', 'General', 'National-Level'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCampCategoryTab(tab as any)}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  campCategoryTab === tab
                    ? 'bg-white text-[#1677FF] shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab} Camps
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.slice(0, 3).map((camp) => (
            <CampCard
              key={camp.id}
              camp={camp}
              onView={(c) => setSelectedCamp(c)}
            />
          ))}
        </div>
      </section>

      {/* 9 & 10. LATEST & PAST ACHIEVEMENTS (ACHIEVER SECTION) */}
      <AchieverSection onViewDetails={(ach) => setSelectedAchievement(ach)} />

      {/* 11. NCC OFFICERS & LEADERSHIP CAROUSEL */}
      <OfficerCarousel onViewProfile={(off) => setSelectedOfficer(off)} />

      {/* 12. UPCOMING PROGRAMS (2-DAY TRAINING PROMOTIONAL BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082B57] text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-900">
          <div className="space-y-2">
            <span className="bg-[#F5D061] text-[#082B57] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              2-DAY SPECIAL CADRE PROGRAM
            </span>
            <h3 className="text-2xl font-extrabold text-white">ITM NCC 2-Day Cadre Training Program 2026</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Day 1 Theory (Military Leadership & Organization) + Day 2 Practical (Squad Drill & Obstacle Clearance Course).
            </p>
          </div>
          <Link
            to="/training"
            className="shrink-0 bg-[#1677FF] hover:bg-blue-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <span>View 2-Day Cadre Screen</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 13. HOW ITM NCC DIGITAL MANAGEMENT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-[#1677FF] uppercase tracking-wider">Digital Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B57]">How ITM NCC Digital Management Works</h2>
          <p className="text-xs sm:text-sm text-slate-600">Structured workflow for cadets, ANO officers, and university administration.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          {[
            { step: '01', title: 'Register Online', desc: 'Cadet Application Form' },
            { step: '02', title: 'Select Unit', desc: 'Army Unit / Naval Unit' },
            { step: '03', title: 'ANO Verification', desc: 'Document Check' },
            { step: '04', title: 'Selected List', desc: 'Published Enrolment' },
            { step: '05', title: 'Register Camp', desc: 'Check Criteria & Apply' },
            { step: '06', title: 'Attend Training', desc: 'Theory & Practical' },
            { step: '07', title: 'Upload Certificate', desc: 'A, B, C Submissions' },
            { step: '08', title: 'Get Verified', desc: 'Serial Number Verification' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-2xl font-black text-[#1677FF]/30 block">{item.step}</span>
              <h4 className="font-extrabold text-slate-900">{item.title}</h4>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAMP ELIGIBILITY MODAL */}
      {selectedCamp && (
        <CampEligibilityModal
          camp={selectedCamp}
          isOpen={!!selectedCamp}
          onClose={() => setSelectedCamp(null)}
        />
      )}

      {/* OFFICER DETAIL MODAL */}
      {selectedOfficer && (
        <Modal
          isOpen={!!selectedOfficer}
          onClose={() => setSelectedOfficer(null)}
          title={`Officer Profile — ${selectedOfficer.name}`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
              <img
                src={selectedOfficer.photo}
                alt={selectedOfficer.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#F5D061] shadow-xs"
              />
              <div>
                <span className="bg-[#082B57] text-[#F5D061] text-[10px] font-bold px-2 py-0.5 rounded">
                  {selectedOfficer.rank}
                </span>
                <h3 className="text-base font-bold text-[#082B57] mt-1">{selectedOfficer.name}</h3>
                <p className="text-xs text-slate-600">{selectedOfficer.designation}</p>
                <span className="text-[10px] bg-blue-100 text-[#1677FF] px-2 py-0.5 rounded font-bold inline-block mt-1">
                  {selectedOfficer.unit}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#082B57] text-xs">Role & Leadership</h4>
              <p className="text-slate-600 leading-relaxed font-serif italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                "{selectedOfficer.roleDescription || selectedOfficer.bio || 'Leading cadet development, training and discipline.'}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#1677FF]" />
                <span>Department: {selectedOfficer.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1677FF]" />
                <span>Email: {selectedOfficer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1677FF]" />
                <span>Phone: {selectedOfficer.phone}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ACHIEVEMENT DETAIL MODAL */}
      {selectedAchievement && (
        <Modal
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          title={`Achievement Record — ${selectedAchievement.cadetName}`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
              <img
                src={selectedAchievement.photo}
                alt={selectedAchievement.cadetName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#F5D061] shadow-xs"
              />
              <div>
                <span className="bg-[#F5D061] text-[#082B57] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {selectedAchievement.level} Level
                </span>
                <h3 className="text-base font-bold text-[#082B57] mt-1">{selectedAchievement.cadetName}</h3>
                <p className="text-xs font-semibold text-blue-600">{selectedAchievement.unit || 'Army Unit'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#082B57] text-sm flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" /> {selectedAchievement.achievementTitle}
              </h4>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                {selectedAchievement.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
              <div><strong>Category:</strong> {selectedAchievement.category}</div>
              <div><strong>Year:</strong> {selectedAchievement.year}</div>
              <div><strong>Event/Camp:</strong> {selectedAchievement.eventCamp || 'National Camp'}</div>
              <div><strong>Record Status:</strong> <span className="text-emerald-600 font-bold">Verified</span></div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
