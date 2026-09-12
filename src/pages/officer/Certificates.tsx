import React from 'react';
import { mockCertificates } from '../../data/certificates';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerCertificates: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Certificate Issuance & Verification</h1>
          <p className="text-xs text-text-secondary">Issue and verify cadet A, B, C certificates.</p>
        </div>
        <button onClick={() => showToast('Issue Certificate Dialog opened', 'info')} className="bg-brand hover:bg-brand-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Issue Certificate
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
            <tr>
              <th className="p-4">Serial Number</th>
              <th className="p-4">Cadet Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Grade</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-navy font-medium">
            {mockCertificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50/80">
                <td className="p-4 font-mono font-bold">{cert.certificateNumber}</td>
                <td className="p-4 font-bold">{cert.cadetName}</td>
                <td className="p-4">{cert.type}</td>
                <td className="p-4">{cert.issueDate}</td>
                <td className="p-4 font-bold text-amber-700">{cert.grade || 'PASS'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => showToast(`Verifying cert ${cert.certificateNumber}`, 'success')} className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-xl">
                    Verify Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
