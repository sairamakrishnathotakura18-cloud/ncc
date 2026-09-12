import React, { useState } from 'react';
import { mockCertificates } from '../../data/certificates';
import { Certificate } from '../../types';
import { Search, ShieldCheck, CheckCircle2, XCircle, Award, QrCode, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Certificates: React.FC = () => {
  const { showToast } = useToast();
  const [certInput, setCertInput] = useState('NCC/WB/2026/B-10892');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Certificate | null>(mockCertificates[0]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = mockCertificates.find((c) => c.certificateNumber.toLowerCase() === certInput.trim().toLowerCase());
    setResult(found || null);
    if (found) {
      showToast('Certificate Verified Successfully!', 'success');
    } else {
      showToast('No record matching this certificate number.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Official Verification Portal</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Verify NCC Certificate
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Enter official A, B, or C Certificate serial number to validate authenticity against University and Directorate records.
        </p>
      </div>

      {/* Verification Card Form */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl p-8 space-y-6">
        <form onSubmit={handleVerify} className="space-y-4">
          <label className="text-xs font-bold text-navy uppercase tracking-wider block">Certificate Serial Number</label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. NCC/WB/2026/B-10892"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-brand focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand hover:bg-brand-hover text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all text-sm shrink-0 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> Verify Certificate
            </button>
          </div>
          <p className="text-[11px] text-text-muted">
            Try sample numbers: <span className="font-mono text-brand cursor-pointer hover:underline" onClick={() => setCertInput('NCC/WB/2026/B-10892')}>NCC/WB/2026/B-10892</span> or <span className="font-mono text-brand cursor-pointer hover:underline" onClick={() => setCertInput('NCC/WB/2024/C-00284')}>NCC/WB/2024/C-00284</span>
          </p>
        </form>

        {/* Verification Result Output */}
        {searched && (
          <div className="pt-6 border-t border-gray-100 animate-fadeIn">
            {result ? (
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Certificate Verified Authenticated
                  </div>
                  <span className="text-xs font-bold bg-emerald-600 text-white px-3 py-1 rounded-full">VALID</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-navy border-y border-emerald-200/60 py-4">
                  <div><span className="text-text-secondary block">Cadet Name:</span> <strong className="text-sm">{result.cadetName}</strong></div>
                  <div><span className="text-text-secondary block">Certificate Type:</span> <strong>{result.type}</strong></div>
                  <div><span className="text-text-secondary block">Serial Number:</span> <strong className="font-mono">{result.certificateNumber}</strong></div>
                  <div><span className="text-text-secondary block">Issue Date:</span> <strong>{result.issueDate}</strong></div>
                  <div><span className="text-text-secondary block">Issuing Authority:</span> <strong>{result.issuingUnit}</strong></div>
                  {result.grade && <div><span className="text-text-secondary block">Grade Obtained:</span> <strong className="text-amber-700">Grade {result.grade}</strong></div>}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-emerald-700 font-medium">Digital Seal Authenticated by HQ Kolkata</span>
                  <button
                    onClick={() => showToast('Downloading Verified Certificate Copy...', 'success')}
                    className="bg-navy text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-navy-light"
                  >
                    <Download className="w-4 h-4" /> Download Official Copy
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-2">
                <XCircle className="w-8 h-8 text-red-500 mx-auto" />
                <h4 className="text-base font-bold text-red-900">No Record Found</h4>
                <p className="text-xs text-red-700">The certificate number entered does not match any official university records.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Certificate Types Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-navy border-l-3 border-brand pl-2">NCC Certificate Framework</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card space-y-2">
            <span className="text-xs font-bold text-brand bg-brand-light px-2.5 py-0.5 rounded-full">A Certificate</span>
            <h4 className="font-bold text-navy">Junior Division / Wing</h4>
            <p className="text-text-secondary">Awarded to school cadets completing 2 years of JD training and 1 mandatory camp.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card space-y-2">
            <span className="text-xs font-bold text-brand bg-brand-light px-2.5 py-0.5 rounded-full">B Certificate</span>
            <h4 className="font-bold text-navy">Senior Division / Wing</h4>
            <p className="text-text-secondary">Awarded to 2nd year university cadets with 75% attendance and 1 Annual Training Camp (ATC).</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card space-y-2">
            <span className="gold-gradient-badge text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full inline-block">C Certificate</span>
            <h4 className="font-bold text-navy">Highest NCC Honor</h4>
            <p className="text-text-secondary">Awarded to 3rd year cadets holding B Certificate. Grants direct SSB Defence Interview entry.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
