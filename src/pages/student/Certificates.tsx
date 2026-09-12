import React from 'react';
import { mockCertificates } from '../../data/certificates';
import { CertificateCard } from '../../components/cards/CertificateCard';

export const StudentCertificates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">My Digital Certificates</h1>
        <p className="text-xs text-text-secondary">Official A, B & C Certificates issued by NCC Directorate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.slice(0, 2).map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>
    </div>
  );
};
