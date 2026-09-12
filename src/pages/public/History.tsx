import React from 'react';
import { Award, Shield, BookOpen, Clock } from 'lucide-react';

export const History: React.FC = () => {
  const milestones = [
    { year: '1917', title: 'University Corps Origin', desc: 'Origins trace back to the University Corps created under the Indian Defence Act 1917 with the object to make up for shortage of officers in the army.' },
    { year: '1920', title: 'University Training Corps (UTC)', desc: 'Replaced by UTC with enhanced military instruction standards across premier Indian universities.' },
    { year: '1948', title: 'National Cadet Corps Act XXXI', desc: 'Formal establishment of NCC in independent India under the National Cadet Corps Act passed by Parliament in July 1948.' },
    { year: '1950', title: 'Naval & Specialized Units', desc: 'Naval Unit and specialized divisions added to NCC for comprehensive tri-service youth training.' },
    { year: '1952', title: 'Girls Division Created', desc: 'Girls Division raised to offer equal military training and national service opportunities to female students.' },
    { year: '1963', title: 'Compulsory NCC Training', desc: 'Following the 1962 Sino-Indian War, NCC training was made compulsory for all able-bodied male university students until 1968.' },
    { year: '2026', title: 'Digital NCC Portal Launch', desc: 'Implementation of NCC Connect unified university portal for transparent cadet tracking, camps, and digital certificate verification.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Heritage & Evolution</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">History of NCC</h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Over a century of dedicated youth leadership, national defense contribution, and civic service.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-card max-w-4xl mx-auto">
        <div className="relative border-l-2 border-brand/30 ml-4 pl-6 space-y-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-navy text-amber-400 border-2 border-white flex items-center justify-center shadow-md">
                <Clock className="w-3 h-3" />
              </div>
              <div className="bg-page p-5 rounded-2xl border border-gray-100 space-y-1.5 hover:border-brand/50 transition-colors">
                <span className="text-xs font-extrabold text-brand tracking-wider uppercase block">{m.year}</span>
                <h3 className="text-base font-bold text-navy">{m.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
