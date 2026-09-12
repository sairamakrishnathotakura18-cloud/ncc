import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: 'What is National Cadet Corps (NCC)?', a: 'The NCC is the youth wing of the Indian Armed Forces providing tri-services military training to high school and college students across India.' },
    { q: 'Who is eligible to join University NCC?', a: 'Any regular undergraduate student of 1st or 2nd year aged between 17.5 and 26 years with minimum 75% academic attendance is eligible.' },
    { q: 'How do I apply for enrollment?', a: 'Fill out the online application form on our Join NCC page. Shortlisted candidates will be invited for physical trials (1.6 km run).' },
    { q: 'What certificates are awarded in NCC?', a: 'Junior Division awards A Certificate. Senior Division awards B Certificate after 2 years and C Certificate after 3 years.' },
    { q: 'What are the benefits of holding a C Certificate?', a: 'C Certificate holders with Grade A or B get direct SSB interview entries for IMA, OTA, Naval Academy, and Air Force without CDS written exam.' },
    { q: 'How is parade attendance calculated?', a: 'Attendance is recorded digitally at every Saturday morning drill session. A minimum 75% parade attendance is strictly enforced.' },
    { q: 'How can I verify a certificate online?', a: 'Navigate to our Certificates page and type the serial number printed on the certificate for instant validation.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Help & Answers</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-text-secondary">Find clear answers regarding enrollment, camps, certificates, and attendance.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200/80 shadow-card overflow-hidden transition-all">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-navy text-sm hover:text-brand"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-brand shrink-0" />
                {faq.q}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openIdx === idx ? 'rotate-180 text-brand' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-text-secondary leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
