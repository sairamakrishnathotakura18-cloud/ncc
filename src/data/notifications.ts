import { AppNotification } from '../types';

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'ATC Camp Selection Approved',
    message: 'Your application for Annual Training Camp (ATC-2026) has been approved by Capt. Rajesh Mukherjee.',
    timestamp: '10 mins ago',
    type: 'success',
    isRead: false,
    role: 'student'
  },
  {
    id: 'notif-2',
    title: 'Parade Attendance Alert',
    message: 'Your overall parade attendance is currently 82%. Keep it above 75% for B-Cert exam eligibility.',
    timestamp: '2 hours ago',
    type: 'info',
    isRead: false,
    role: 'student'
  },
  {
    id: 'notif-3',
    title: 'New Cadet Application Submitted',
    message: 'Student ID 2026-CSE-099 has submitted a new application for NCC Enrollment 2026–27.',
    timestamp: '1 hour ago',
    type: 'warning',
    isRead: false,
    role: 'officer'
  },
  {
    id: 'notif-4',
    title: 'Certificate Verification Audit',
    message: '14 B-Certificates were generated and issued today.',
    timestamp: '1 day ago',
    type: 'info',
    isRead: true,
    role: 'admin'
  }
];
