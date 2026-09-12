import React from 'react';
import { X, Printer, ShieldCheck, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const cadetDisplayName = certificate.studentName || certificate.cadetName || 'Cadet';
  const regNumber = certificate.regimentalNumber || 'WB/23/SD/A/104089';
  const issuingUnitName = certificate.unit || certificate.issuingUnit || '1st Bengal Battalion NCC';
  const certificateGrade = certificate.grading || certificate.grade || 'A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-navy" />
            <h3 className="font-bold text-slate-800 text-lg">Official NCC Digital Certificate</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3.5 py-1.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="p-8 sm:p-12 print:p-0">
          <div className="border-8 border-double border-navy p-8 sm:p-12 relative bg-gradient-to-b from-amber-50/20 via-white to-sky-50/20 rounded-sm shadow-inner">
            {/* Corner Decorative Insignias */}
            <div className="absolute top-4 left-4 border-t-2 border-l-2 border-navy w-8 h-8"></div>
            <div className="absolute top-4 right-4 border-t-2 border-r-2 border-navy w-8 h-8"></div>
            <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-navy w-8 h-8"></div>
            <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-navy w-8 h-8"></div>

            {/* Emblem and Title Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy text-amber-400 shadow-md">
                <Award className="w-10 h-10" />
              </div>
              <h2 className="text-sm font-bold tracking-widest text-navy uppercase">
                National Cadet Corps • India
              </h2>
              <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
                {certificate.type}
              </h1>
              <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-xs font-semibold tracking-wider">
                SERIAL NO: {certificate.certificateNumber}
              </div>
            </div>

            {/* Certificate Citation Text */}
            <div className="mt-8 text-center space-y-4 max-w-2xl mx-auto">
              <p className="text-slate-600 italic text-sm">
                This is to certify that Cadet
              </p>
              <h2 className="text-2xl font-bold text-navy border-b-2 border-dashed border-slate-300 pb-1 inline-block px-4">
                {cadetDisplayName}
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                Regimental No. <span className="font-semibold text-slate-900">{regNumber}</span> of unit{' '}
                <span className="font-semibold text-slate-900">{issuingUnitName}</span> has successfully passed the official{' '}
                <span className="font-bold text-navy">{certificate.type}</span> examination conducted under the authority of Directorate General NCC.
              </p>
              <div className="pt-2 flex justify-center items-center space-x-6 text-xs text-slate-600">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" /> Grading: <strong className="ml-1 text-slate-900 font-bold">Grade '{certificateGrade}'</strong></span>
                <span className="flex items-center"><Calendar className="w-4 h-4 text-sky-600 mr-1" /> Issue Date: <strong className="ml-1 text-slate-900">{certificate.issueDate}</strong></span>
              </div>
            </div>

            {/* Signatures & Seal Section */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex items-end justify-between px-4">
              <div className="text-center">
                <div className="h-10 font-serif italic text-slate-500 text-xs flex items-end justify-center">
                  [ Signed Digitally ]
                </div>
                <div className="border-t border-slate-400 w-40 pt-1 text-xs font-semibold text-slate-800">
                  Commanding Officer / ANO
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 border-2 border-navy rounded-full flex items-center justify-center mx-auto text-[10px] font-extrabold text-navy uppercase p-1 text-center leading-tight">
                  OFFICIAL SEAL
                </div>
              </div>

              <div className="text-center">
                <div className="h-10 font-serif italic text-slate-500 text-xs flex items-end justify-center">
                  [ Directorate Seal ]
                </div>
                <div className="border-t border-slate-400 w-40 pt-1 text-xs font-semibold text-slate-800">
                  Issuing Authority
                </div>
              </div>
            </div>

            {/* Verification Footer Disclaimer */}
            <div className="mt-8 text-center text-[10px] text-slate-400 tracking-wide border-t border-slate-100 pt-3">
              Verified by NCC Academic & Management Portal • Authentic Digital Record
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
