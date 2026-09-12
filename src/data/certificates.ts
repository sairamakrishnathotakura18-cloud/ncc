import { Certificate } from '../types';

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-001',
    certificateNumber: 'NCC/WB/2026/B-10892',
    cadetId: 'cadet-001',
    cadetName: 'Rahul Sharma',
    type: 'B Certificate',
    issueDate: '2025-05-18',
    issuingUnit: '1st Bengal Battalion NCC, Kolkata HQ',
    status: 'VERIFIED',
    grade: 'A',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NCC/WB/2026/B-10892'
  },
  {
    id: 'cert-002',
    certificateNumber: 'NCC/WB/2025/A-04912',
    cadetId: 'cadet-002',
    cadetName: 'Ananya Verma',
    type: 'A Certificate',
    issueDate: '2024-04-12',
    issuingUnit: '1st Bengal Girls Battalion',
    status: 'VERIFIED',
    grade: 'A',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NCC/WB/2025/A-04912'
  },
  {
    id: 'cert-003',
    certificateNumber: 'NCC/WB/2024/C-00284',
    cadetId: 'cadet-003',
    cadetName: 'Vikram Singh',
    type: 'C Certificate',
    issueDate: '2025-06-01',
    issuingUnit: 'West Bengal & Sikkim NCC Directorate',
    status: 'VERIFIED',
    grade: 'DISTINCTION',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NCC/WB/2024/C-00284'
  },
  {
    id: 'cert-004',
    certificateNumber: 'NCC/WB/2026/PAR-9921',
    cadetId: 'cadet-004',
    cadetName: 'Priya Patel',
    type: 'Participation Certificate',
    issueDate: '2026-01-26',
    issuingUnit: 'Republic Day Contingent HQ Kolkata',
    status: 'VERIFIED',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NCC/WB/2026/PAR-9921'
  }
];
