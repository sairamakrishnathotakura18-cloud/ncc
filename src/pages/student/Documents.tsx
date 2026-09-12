import React from 'react';
import { Upload, FileText, CheckCircle2, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const StudentDocuments: React.FC = () => {
  const { showToast } = useToast();

  const docs = [
    { title: 'Student Identity Card', status: 'VERIFIED', date: '01 Aug 2023' },
    { title: 'Medical Fitness Certificate (ATC 2026)', status: 'VERIFIED', date: '15 Aug 2026' },
    { title: 'Parent / Guardian Consent Form', status: 'VERIFIED', date: '01 Aug 2023' },
    { title: 'Aadhaar Identity Proof', status: 'VERIFIED', date: '01 Aug 2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">My Regiment Documents</h1>
        <p className="text-xs text-text-secondary">Uploaded identity proofs, medical certificates, and camp consent forms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((d, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-card flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-navy text-sm block">{d.title}</span>
              <span className="text-[11px] text-text-muted">Uploaded: {d.date}</span>
            </div>
            <button onClick={() => showToast(`Downloading ${d.title}...`, 'info')} className="p-2 bg-gray-100 hover:bg-gray-200 text-navy rounded-xl">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
