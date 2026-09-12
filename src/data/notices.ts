import { Notice } from '../types';

export const mockNotices: Notice[] = [
  {
    id: 'not-001',
    title: 'NCC Enrollment Drive 2026–27 Official Notification',
    date: '2026-09-01',
    category: 'Enrollment',
    shortDesc: 'Applications are invited from 1st and 2nd-year undergraduate students for Senior Division (SD) and Senior Wing (SW) NCC units.',
    content: 'All interested students of B.Tech, B.Sc, B.Com, and BBA courses are hereby informed that the physical fitness selection and interview process for NCC Cadet Enrollment (Session 2026-27) will be held at the University Ground on 25th September 2026 starting at 07:00 AM.',
    isImportant: true,
    hasAttachment: true
  },
  {
    id: 'not-002',
    title: 'Schedule for Annual Training Camp (ATC-2026) Registration',
    date: '2026-08-28',
    category: 'Camp',
    shortDesc: 'Eligible cadets must submit medical fitness certificates and parent consent forms by 30th September.',
    content: 'Cadets short-listed for ATC-2026 must upload their signed Medical Fitness Certificate issued by a Registered Medical Practitioner on the NCC Connect Portal on or before 30th September 2026.',
    isImportant: true,
    hasAttachment: true
  },
  {
    id: 'not-003',
    title: 'B & C Certificate Examination Hall Ticket Verification',
    date: '2026-08-15',
    category: 'Certificate',
    shortDesc: 'Cadets appearing for upcoming Directorate Practical Exams must verify their attendance quota.',
    content: 'Cadets having less than 75% attendance in parade drills will not be granted Hall Tickets for the upcoming B & C Certificate Examinations as per HQ instructions.',
    isImportant: false,
    hasAttachment: false
  },
  {
    id: 'not-004',
    title: 'Combined Drill Practice & Weapon Training Schedule for October',
    date: '2026-08-10',
    category: 'Training',
    shortDesc: 'Every Saturday drill parade timing shifted to 06:30 AM at Main Parade Arena.',
    content: 'Due to morning weather shifts, all Senior Division and Senior Wing drill practices will commence at 06:30 AM prompt. Full ceremonial uniform (OG / Khaki) is compulsory.',
    isImportant: false,
    hasAttachment: true
  }
];
