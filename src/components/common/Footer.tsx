import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200 pt-16 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
        
        {/* Column 1: ITM University & NCC Emblem */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src="/itm-logo.png" alt="ITM University Seal" className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md" />
            <div className="w-9 h-11 flex items-center justify-center bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path d="M10 10 H90 V70 Q90 100 50 115 Q10 100 10 70 Z" fill="#D92D20" />
                <path d="M35 10 H65 V107 Q50 115 35 107 Z" fill="#0F2942" />
                <path d="M65 10 H90 V70 Q90 100 50 115 V107 Q65 107 65 10 Z" fill="#0EA5E9" />
                <circle cx="50" cy="55" r="28" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="4 2" />
                <text x="50" y="60" textAnchor="middle" fill="#F59E0B" fontSize="20" fontWeight="900" fontFamily="sans-serif">NCC</text>
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-[#0F2942] block uppercase tracking-wider text-[10px]">ITM UNIVERSITY</span>
              <span className="font-bold text-slate-800 text-xs">NCC Digital Management</span>
            </div>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Official National Cadet Corps (NCC) digital portal for ITM University Army, Naval, and Air wings under Ministry of Defence guidelines.
          </p>
        </div>

        {/* Column 2: ITM University NCC Links */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-[#0F2942] uppercase text-xs tracking-wider">ITM UNIVERSITY NCC</h4>
          <ul className="space-y-2 text-slate-600 font-medium">
            <li><Link to="/about" className="hover:text-[#1677FF] transition-colors">About ITM NCC</Link></li>
            <li><Link to="/wings" className="hover:text-[#1677FF] transition-colors">Three NCC Wings (Army, Naval, Air)</Link></li>
            <li><Link to="/camps" className="hover:text-[#1677FF] transition-colors">Camps & Expeditions</Link></li>
            <li><Link to="/training" className="hover:text-[#1677FF] transition-colors">2-Day Training Programs</Link></li>
            <li><Link to="/achievements" className="hover:text-[#1677FF] transition-colors">Campus Achievers Showcase</Link></li>
          </ul>
        </div>

        {/* Column 3: User Support & Manual */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-[#0F2942] uppercase text-xs tracking-wider">USER SUPPORT</h4>
          <ul className="space-y-2 text-slate-600 font-medium">
            <li><Link to="/rules" className="hover:text-[#1677FF] transition-colors">User Manual (12 Guides)</Link></li>
            <li><Link to="/rules" className="hover:text-[#1677FF] transition-colors">NCC Rules & Regulations</Link></li>
            <li><Link to="/faq" className="hover:text-[#1677FF] transition-colors">Frequently Asked Questions</Link></li>
            <li><Link to="/contact" className="hover:text-[#1677FF] transition-colors">Feedback & Complaints Ticket</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-[#0F2942] uppercase text-xs tracking-wider">NCC CONTACT</h4>
          <div className="space-y-2 text-slate-600 font-medium">
            <p className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#1677FF] shrink-0 mt-0.5" /> NCC Office, Student Activity Center, ITM University Campus</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#1677FF] shrink-0" /> ncc@itm.edu.in</p>
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#1677FF] shrink-0" /> +91 98301 12345 (ANO HQ)</p>
          </div>
        </div>

      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
        <div>
          © 2026 <strong>ITM University</strong>. All rights reserved.
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-[#1677FF]">Home</Link>
          <Link to="/rules" className="hover:text-[#1677FF]">User Manual</Link>
          <Link to="/login" className="hover:text-[#1677FF]">Login</Link>
          <Link to="/contact" className="hover:text-[#1677FF]">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
