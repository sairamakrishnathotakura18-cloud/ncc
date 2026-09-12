import React from 'react';
import { Award, CheckCircle2, Download, Eye, QrCode } from 'lucide-react';
import { Certificate } from '../../types';
import { useToast } from '../../context/ToastContext';

interface CertificateCardProps {
  certificate: Certificate;
  onView?: (cert: Certificate) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onView }) => {
  const { showToast } = useToast();

  const handleDownload = () => {
    showToast(`Downloading Certificate ${certificate.certificateNumber}...`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-light to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 bg-brand-light text-brand text-[11px] font-bold px-3 py-1 rounded-full border border-brand-border">
            <Award className="w-3.5 h-3.5" /> {certificate.type}
          </span>
          <h3 className="text-lg font-extrabold text-navy tracking-tight pt-1">{certificate.cadetName}</h3>
          <p className="text-xs text-text-secondary font-mono">{certificate.certificateNumber}</p>
        </div>

        {certificate.grade && (
          <div className="text-center bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Grade</span>
            <span className="text-base font-extrabold text-amber-800">{certificate.grade}</span>
          </div>
        )}
      </div>

      <div className="my-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-text-muted block text-[11px]">Issue Date</span>
          <span className="font-semibold text-navy">{certificate.issueDate}</span>
        </div>
        <div>
          <span className="text-text-muted block text-[11px]">Issuing Authority</span>
          <span className="font-semibold text-navy truncate block">{certificate.issuingUnit}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
          <CheckCircle2 className="w-3.5 h-3.5" /> Verified Valid
        </div>

        <div className="flex items-center gap-2">
          {onView && (
            <button
              onClick={() => onView(certificate)}
              className="p-2 rounded-xl text-navy hover:bg-gray-100 transition-colors border border-gray-200"
              title="View Certificate Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="bg-navy hover:bg-navy-light text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
