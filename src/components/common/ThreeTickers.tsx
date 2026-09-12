import React from 'react';
import { Link } from 'react-router-dom';

const achieversList = [
  { name: 'Cadet Rahul Sharma', title: 'National Level Achievement', unit: 'Army Unit', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Cadet Ananya Singh', title: 'Vayu Sainik Camp Medal', unit: 'Naval Unit', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80' },
  { name: 'Cadet Arjun Patel', title: 'Republic Day Camp Rajpath', unit: 'Army Unit', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { name: 'Cadet Priya Sharma', title: 'Governor Gold Medalist', unit: 'Naval Unit', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
  { name: 'Cadet Meera Joshi', title: 'Best Cadet Award 2026', unit: 'Army Unit', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
];

const programList = [
  '📢 New Cadet Registration 2026–27 Open for Army & Naval Units',
  '📢 National Integration Camp Applications Open',
  '📢 2-Day Cadet Training Program Scheduled',
  '📢 Certificate Submission & Online Verification Active',
  '📢 Army Unit Selection Drive Commencing Soon',
  '📢 Naval Unit Boat Drill Training Session Scheduled',
];

const campList = [
  'National Integration Camp (NIC 2026)',
  'Annual Training Camp (ATC-104) Enrolment Active',
  'Leadership Training Cadre at ITM Campus',
  'Certificate A, B & C Verification Portal Open',
  'Selected Cadet List 2026–27 Published',
  'Upcoming Outdoor Rifle Firing & Obstacle Course Training',
];

export const ThreeTickers: React.FC = () => {
  // Triple concat to guarantee continuous coverage across large screens without empty space
  const tripledAchievers = [...achieversList, ...achieversList, ...achieversList];
  const tripledPrograms = [...programList, ...programList, ...programList];
  const tripledCamps = [...campList, ...campList, ...campList];

  return (
    <div className="w-full text-xs overflow-hidden shadow-xs select-none">
      
      {/* TICKER 1: LIGHT RED - LATEST ACHIEVEMENTS (RIGHT -> LEFT) */}
      <div className="bg-[#FFF5F4] text-[#D92D20] py-2 px-3 flex items-center border-b border-red-100">
        <div className="flex items-center shrink-0 pr-3 z-10 bg-[#FFF5F4] shadow-xs">
          <span className="bg-[#D92D20] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
            🏆 NCC ACHIEVERS
          </span>
        </div>
        <div className="relative overflow-hidden whitespace-nowrap w-full">
          <div className="animate-marquee-rtl space-x-8 items-center font-medium">
            {tripledAchievers.map((item, idx) => (
              <span key={idx} className="inline-flex items-center space-x-2 shrink-0">
                <img src={item.img} alt={item.name} className="w-4 h-4 rounded-full object-cover border border-[#D92D20]" />
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className="text-[#D92D20] font-semibold">— {item.title}</span>
                <span className="text-[10px] bg-red-100 text-[#D92D20] px-1.5 py-0.2 rounded-xs font-mono">({item.unit})</span>
                <span className="text-slate-300 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER 2: NAVY BACKGROUND - NCC PROGRAMS (LEFT -> RIGHT) */}
      <div className="bg-[#082B57] text-white py-2 px-3 flex items-center border-b border-navy-900">
        <div className="flex items-center shrink-0 pr-3 z-10 bg-[#082B57]">
          <span className="bg-[#F5D061] text-[#082B57] px-2.5 py-0.5 rounded-xs text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
            📢 NCC PROGRAMS
          </span>
        </div>
        <div className="relative overflow-hidden whitespace-nowrap w-full">
          <div className="animate-marquee-ltr space-x-8 items-center font-medium text-slate-100">
            {tripledPrograms.map((text, idx) => (
              <span key={idx} className="inline-flex items-center space-x-3 shrink-0">
                <span className="font-medium text-white">{text}</span>
                <Link to="/join" className="bg-[#1677FF] hover:bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs transition-colors shadow-2xs">
                  APPLY NOW
                </Link>
                <span className="text-slate-500 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER 3: LIGHT BLUE INSTITUTIONAL - CAMPS & NOTICES (RIGHT -> LEFT) */}
      <div className="bg-[#F0F9FF] text-[#0EA5E9] py-2 px-3 flex items-center border-b border-sky-100">
        <div className="flex items-center shrink-0 pr-3 z-10 bg-[#F0F9FF]">
          <span className="bg-[#0EA5E9] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
            📋 CAMPS & NOTICES
          </span>
        </div>
        <div className="relative overflow-hidden whitespace-nowrap w-full">
          <div className="animate-marquee-rtl space-x-8 items-center font-medium text-slate-800">
            {tripledCamps.map((text, idx) => (
              <span key={idx} className="inline-flex items-center space-x-3 shrink-0">
                <span className="font-semibold text-slate-800">{text}</span>
                <Link to="/camps" className="bg-[#0EA5E9] hover:bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs transition-colors shadow-2xs">
                  VIEW NOTICES
                </Link>
                <span className="text-slate-300 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

