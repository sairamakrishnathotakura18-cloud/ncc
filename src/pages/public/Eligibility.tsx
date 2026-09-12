import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockEligibilityRules } from '../../data/eligibilityRules';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const Eligibility: React.FC = () => {
  const [age, setAge] = useState<number>(19);
  const [attendance, setAttendance] = useState<number>(80);
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [checked, setChecked] = useState(false);

  const isEligible = age >= 17.5 && age <= 26 && attendance >= 75 && isStudent;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Enrollment Guidelines</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          NCC Cadet Eligibility Checklist
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Verify whether you meet the statutory requirements specified by the Director General NCC for Senior Division & Wing enrollment.
        </p>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card p-6 space-y-4">
        <h2 className="text-lg font-bold text-navy">Statutory University Eligibility Rules</h2>
        <div className="space-y-3 text-xs">
          {mockEligibilityRules.map((rule) => (
            <div key={rule.id} className="p-4 bg-page rounded-xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-bold text-navy text-sm">{rule.ruleName}</span>
                <p className="text-text-secondary">{rule.description}</p>
              </div>
              <span className="bg-brand-light text-brand font-bold px-3 py-1 rounded-full shrink-0 text-center">
                {rule.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Eligibility Simulator */}
      <div className="bg-navy text-white rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
          <div>
            <h3 className="text-xl font-bold">Interactive Eligibility Evaluator</h3>
            <p className="text-xs text-gray-300">Test your details before applying online.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <label className="font-semibold text-gray-200">Your Age (Years): {age}</label>
            <input
              type="range"
              min="15"
              max="30"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-brand"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-gray-200">Target Attendance (%): {attendance}%</label>
            <input
              type="range"
              min="50"
              max="100"
              value={attendance}
              onChange={(e) => setAttendance(Number(e.target.value))}
              className="w-full accent-brand"
            />
          </div>

          <div className="space-y-2 flex flex-col justify-center">
            <label className="font-semibold text-gray-200 mb-1">Regular Enrolled Student?</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={isStudent} onChange={() => setIsStudent(true)} className="accent-brand" /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!isStudent} onChange={() => setIsStudent(false)} className="accent-brand" /> No
              </label>
            </div>
          </div>
        </div>

        {/* Evaluation Output */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold ${
          isEligible ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-red-500/20 text-red-300 border-red-500/40'
        }`}>
          <div className="flex items-center gap-2">
            {isEligible ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{isEligible ? 'Congratulations! You meet all criteria for NCC Enrollment 2026–27.' : 'Criteria Not Met. Please review requirements.'}</span>
          </div>
          {isEligible && (
            <Link
              to="/join"
              className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-xl transition-all flex items-center gap-1 shrink-0"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
