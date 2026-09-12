import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Shield, UserPlus, FileText, Tent, CheckCircle, Calendar,
  Award, Upload, MessageSquare, UserCheck, GraduationCap, HelpCircle, ChevronDown, Search
} from 'lucide-react';
import { mockUserManualGuides } from '../../data/userManual';

interface UserManualDropdownProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-4 h-4 text-red-500 shrink-0" />,
  UserPlus: <UserPlus className="w-4 h-4 text-blue-500 shrink-0" />,
  FileText: <FileText className="w-4 h-4 text-sky-500 shrink-0" />,
  Tent: <Tent className="w-4 h-4 text-emerald-500 shrink-0" />,
  CheckCircle: <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />,
  Calendar: <Calendar className="w-4 h-4 text-amber-500 shrink-0" />,
  Award: <Award className="w-4 h-4 text-amber-600 shrink-0" />,
  Upload: <Upload className="w-4 h-4 text-[#1677FF] shrink-0" />,
  MessageSquare: <MessageSquare className="w-4 h-4 text-purple-500 shrink-0" />,
  UserCheck: <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-[#0F2942] shrink-0" />,
  HelpCircle: <HelpCircle className="w-4 h-4 text-teal-500 shrink-0" />
};

export const UserManualDropdown: React.FC<UserManualDropdownProps> = ({ isMobile, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = mockUserManualGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isMobile) {
    return (
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 bg-slate-50 rounded-xl"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand" /> User Manual Guides (12)
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="pl-2 space-y-1 text-xs">
            {mockUserManualGuides.map(item => (
              <Link
                key={item.id}
                to="/rules"
                onClick={onItemClick}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 text-slate-700"
              >
                {iconMap[item.iconName]}
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group px-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#1677FF] hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <span>User Manual</span>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand transition-transform group-hover:rotate-180" />
      </button>

      {/* Dropdown Container */}
      <div
        onMouseLeave={() => setIsOpen(false)}
        className={`absolute right-0 top-full pt-2 w-96 transition-all duration-200 z-50 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-3">
          {/* Header Search inside Manual */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search 12 user manuals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-1">
            {filteredGuides.map((guide) => (
              <Link
                key={guide.id}
                to="/rules"
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group/item"
              >
                <div className="mt-0.5">{iconMap[guide.iconName]}</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover/item:text-brand flex items-center justify-between">
                    {guide.title}
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-mono px-1.5 rounded">
                      {guide.category}
                    </span>
                  </h5>
                  <p className="text-[11px] text-slate-500 leading-tight line-clamp-1">{guide.summary}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Official ITM University Guide</span>
            <Link to="/rules" className="text-brand font-bold hover:underline">View All Rules</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
