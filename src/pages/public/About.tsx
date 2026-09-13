import React from 'react';
import { Shield, Target, Compass, Award, Building, UserCheck, CheckCircle2, Calendar, FileText, Trophy } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#1677FF] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Official Information • ITM University Gwalior
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B57] tracking-tight">
          National Cadet Corps (NCC)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Grooming motivated, disciplined youth into good citizens and worthy leaders of the nation in every walk of life.
        </p>
      </div>

      {/* Motto Banner */}
      <div className="bg-[#082B57] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="bg-[#F5D061] text-[#082B57] text-xs font-extrabold px-3.5 py-1 rounded-full inline-block">
            MOTTO OF NCC
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            "Unity and Discipline" <br />
            <span className="text-[#F5D061] text-xl font-normal">(अनेकता में एकता - एकता और अनुशासन)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Developing character, comradeship, discipline, secular outlook, spirit of adventure, and ideals of selfless service amongst young citizens of India.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-32 h-32 rounded-3xl bg-white/10 border-2 border-[#F5D061] flex items-center justify-center shadow-2xl backdrop-blur-md">
            <Shield className="w-16 h-16 text-[#F5D061]" />
          </div>
        </div>
      </div>

      {/* Section 1: Overview & History */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#1677FF]" /> 1. National Cadet Corps (NCC) History & Legacy
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The National Cadet Corps came into existence on <strong>16 July 1948</strong>, under the 31st NCC Act of 1948, based on the recommendation of Pundit H Kunzru Committee. NCC was started with a strength of 38,500 Boys Cadets. Girls Cadets were added in the Army Wing in 1949, Air Wing in 1950 and Naval Wing in 1952. In the initial stages, NCC was confined mainly to the urban areas. Today NCC has spread to every corner of the country, having more than <strong>13 lakhs Cadets</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The National Cadet Corps, which has both Boys and Girls as cadets, has the basic aim of developing character qualities in the youth to make them good citizens of society and worthy leaders of the future in every walk of life.
        </p>
      </div>

      {/* Section 2: ITM University Gwalior NCC Units */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <Building className="w-5 h-5 text-[#1677FF]" /> 2. The NCC Units at ITM University Gwalior
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The National Cadet Corps (NCC) Units at ITM University Gwalior is a full-fledged community of motivated and trained youth that exhibits leadership qualities in the activities undertaken in the past.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ITM University Gwalior has <strong>03 established active NCC Units</strong> operating under Indian Defence formations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded">106 Seats (Girls & Boys)</span>
            <h4 className="font-extrabold text-[#082B57] text-sm">8 MP Artillery Battalion Gwalior</h4>
            <p className="text-xs text-slate-500">Ground tactics, squad parade drill & military cadre.</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded">53 Seats (Girls Only)</span>
            <h4 className="font-extrabold text-[#082B57] text-sm">3 MP Artillery Girls Battalion Gwalior</h4>
            <p className="text-xs text-slate-500">Specialized female cadet battalion leadership & marksmanship.</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded">80 Seats (Girls & Boys)</span>
            <h4 className="font-extrabold text-[#082B57] text-sm">3 MP Naval Unit Gwalior</h4>
            <p className="text-xs text-slate-500">Seamanship, boat pulling, sailing & naval expedition training.</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 pt-2 leading-relaxed">
          ITM University Gwalior offers NCC as a <strong>General Generic Elective subject at UG level</strong>. Cadets are offered a variety of courses including those for Indian Military Academy (IMA), Officers Training Academy (OTA), Basic Mountaineering course, Para Sailing, and Para slithering etc.
        </p>
      </div>

      {/* Section 3: Active Officers */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#1677FF]" /> 3. NCC Officers at ITM University Gwalior
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 space-y-1">
            <span className="text-[10px] font-extrabold text-blue-600 uppercase">Care Taker Officer</span>
            <h4 className="font-extrabold text-[#082B57] text-sm">CTO (Mr.) Gaurav Singh Shekhawat</h4>
            <p className="text-xs text-slate-500">8 MP Artillery Battalion Gwalior</p>
          </div>

          <div className="bg-red-50/50 p-5 rounded-xl border border-red-100 space-y-1">
            <span className="text-[10px] font-extrabold text-red-600 uppercase">Associate NCC Officer</span>
            <h4 className="font-extrabold text-[#082B57] text-sm">Lt. (Ar.) Amandeep Kaur</h4>
            <p className="text-xs text-slate-500">3 MP Artillery Girls Battalion Gwalior</p>
          </div>

          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 space-y-1">
            <span className="text-[10px] font-extrabold text-blue-600 uppercase">Care Taker Officer</span>
            <h4 className="font-extrabold text-[#082B57] text-sm">CTO (Mr.) Rohit Sharma</h4>
            <p className="text-xs text-slate-500">3 MP Naval Unit Gwalior</p>
          </div>
        </div>
      </div>

      {/* Section 4: Objectives & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1677FF] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#082B57]">Objectives of NCC</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Developing character, comradeship, discipline, a secular outlook, the spirit of adventure, and ideals of selfless service amongst young citizens. Creating a pool of organized, trained, and motivated youth with leadership qualities in all walks of life who will serve the Nation regardless of their career choice, while motivating young Indians to join the armed forces.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#082B57]">Core Values</h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>Patriotic commitment to national development</li>
            <li>Respect for diversities in religion, language, culture & lifestyle</li>
            <li>Abiding commitment to Indian Constitutional norms</li>
            <li>Active participation in community development & social service</li>
            <li>Healthy lifestyle free of substance abuse</li>
            <li>Sensitivity to the needs of poor & disadvantaged citizens</li>
            <li>Honesty, truthfulness, self-sacrifice, perseverance & hard work</li>
          </ul>
        </div>
      </div>

      {/* Section 5: Enrolment Procedure */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 4. Enrolment Procedure & Eligibility Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-[#082B57] block">Eligibility Conditions</strong>
            <p className="text-slate-600">Citizen of India or Nepal subject. Good moral character. Enrolled in ITM University. Prescribed medical standards.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-[#082B57] block">Age Limit</strong>
            <p className="text-slate-600">Senior Division / Wing (Boys & Girls) — Upto 26 years of age.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-[#082B57] block">Enrolment Period</strong>
            <p className="text-slate-600">Enrolled for a maximum of 3 years based on physical fitness, medical test & personal interview in July-August.</p>
          </div>
        </div>
      </div>

      {/* Section 6: Institutional Training */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#1677FF]" /> 5. Institutional Training Schedule
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Regular Parade is conducted every <strong>Saturday from 1300 to 1700 hrs</strong>. Institutional training conducted at ITM University is the mainstay of NCC training, delivered by Associate NCC Officers and Armed Forces personnel.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The syllabus comprises Common Subjects and Service Subjects in a <strong>70:30 ratio</strong>. Senior Wing/Division training spans 3 years and includes <strong>300 hours</strong> of planned practical military training, preparing cadets to join the Armed Forces.
        </p>
      </div>

      {/* Section 7: Certificate Exams */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#1677FF]" /> 6. Certificate Examination Eligibility Criteria
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certificate B */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm">
            <span className="bg-[#1677FF] text-white font-extrabold text-xs px-3 py-1 rounded uppercase">CERTIFICATE B EXAMINATION</span>
            <ul className="space-y-2 text-slate-600 list-disc list-inside">
              <li>Minimum 75% attendance of total training periods in 1st & 2nd year.</li>
              <li>Break in training prior to exam must not exceed 18 months.</li>
              <li>Must have attended 1 Annual Training Camp (ATC) / NIC / COC / RDC / Army Attachment.</li>
            </ul>
          </div>

          {/* Certificate C */}
          <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-3 text-xs sm:text-sm">
            <span className="bg-amber-500 text-slate-900 font-extrabold text-xs px-3 py-1 rounded uppercase">CERTIFICATE C EXAMINATION</span>
            <ul className="space-y-2 text-slate-700 list-disc list-inside font-medium">
              <li>Must possess Certificate B & be in 3rd year of SD/SW training.</li>
              <li>Minimum 75% attendance in 3rd year syllabus.</li>
              <li>Break in training prior to exam must not exceed 18 months.</li>
              <li>Must have attended 1 ATC + 1 additional camp (RDC, COC, PTC, NIC, Trekking, Mountaineering, Scuba Diving, or Youth Exchange).</li>
              <li>Eligible to appear 1 year after passing Certificate B.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 8: Awards & Scholarships by ITM University */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/40 p-8 rounded-2xl space-y-4">
        <h3 className="text-xl font-bold text-[#082B57] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> 7. Awards & Scholarships by ITM University Gwalior
        </h3>
        <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc list-inside font-medium leading-relaxed">
          <li><strong>Cash Prizes</strong> are awarded to cadets representing ITM University at national and international levels.</li>
          <li><strong>Motivational Awards</strong> in the form of Medals, Trophies, and Certificates for achievements in diverse fields.</li>
          <li><strong>Entry Level Tuition Fee Scholarships</strong> at the time of 1st year admission based on cadet performance at State, National, or International levels in their previous institute/school.</li>
        </ul>
      </div>

    </div>
  );
};
