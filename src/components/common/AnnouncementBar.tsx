import React, { useState, useEffect } from 'react';
import { Megaphone, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const announcements = [
  "📢 NCC Enrollment 2026–27 is now open! Submit applications online.",
  "🏅 Annual Training Camp (ATC-2026) registrations close on 30th September.",
  "📜 Instant Certificate Verification portal is now active for A, B & C certificates.",
  "🚩 Republic Day Camp (RDC) selection trials scheduled for next week."
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy text-white text-xs md:text-sm py-2 px-4 border-b border-navy-light/40 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-brand px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase shrink-0 text-white shadow-sm">
            <Megaphone className="w-3 h-3 animate-pulse" /> Latest News
          </span>
          <p className="truncate font-medium transition-all duration-300">
            {announcements[index]}
          </p>
        </div>
        <Link
          to="/notices"
          className="shrink-0 text-xs text-brand-light hover:text-white font-medium flex items-center gap-1 hover:underline"
        >
          View Notices <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
