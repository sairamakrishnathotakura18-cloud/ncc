import React from 'react';
import { Shield, Target, Compass, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">About National Cadet Corps</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Nurturing Youth, Building Nation
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          The National Cadet Corps (NCC) is the tri-services youth organization of India comprising the Army, Navy, and Air Force, engaged in grooming the youth into disciplined and patriotic citizens.
        </p>
      </div>

      {/* Motto & Core Values */}
      <div className="bg-navy text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-navy-light relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="gold-gradient-badge text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full inline-block">
            OFFICIAL MOTTO
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            "Unity and Discipline" <br />
            <span className="text-amber-400 font-hindi">(अनेकता में एकता - एकता और अनुशासन)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Formally adopted on 23rd December 1957, the motto encapsulates the essential mission of uniting young minds across diverse languages, religions, and regions under one proud Indian identity.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-32 h-32 rounded-3xl bg-brand/20 border-2 border-amber-400 flex items-center justify-center shadow-2xl">
            <Shield className="w-16 h-16 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Our Vision</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            To create a human resource of organized, trained, and motivated youth to provide leadership in all walks of life, including the Armed Forces, and be always available for the service of the nation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Our Mission</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            To develop character, comradeship, discipline, leadership, secular outlook, spirit of adventure, sportsmanship, and ideals of selfless service among the youth of the country.
          </p>
        </div>
      </div>

      {/* Key Objectives */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-card space-y-6">
        <h3 className="text-xl font-bold text-navy">Core Aims & Objectives</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-text-secondary">
          {[
            'Development of leadership & officer-like qualities',
            'Fostering secularism & national integration',
            'Conducting adventure & mountain expedition camps',
            'Providing direct SSB entry pathways to Defence Forces',
            'Organizing voluntary blood donation & social service',
            'Instilling disaster rescue readiness & first aid training'
          ].map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 bg-page rounded-xl border border-gray-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
