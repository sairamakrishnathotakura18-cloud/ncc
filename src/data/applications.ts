import { Application } from '../types';

export const mockApplications: Application[] = [
  {
    id: 'app-001',
    applicationId: 'NCC-2026-00124',
    applicantName: 'Rohan Sharma',
    email: 'rohan.s@university.edu',
    phone: '+91 98765 12345',
    dob: '2005-04-12',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE',
    year: '1st Year',
    submittedDate: '2026-09-08',
    status: 'Pending',
    previousExperience: false
  },
  {
    id: 'app-002',
    applicationId: 'NCC-2026-00125',
    applicantName: 'Meera Roy',
    email: 'meera.r@university.edu',
    phone: '+91 98123 99887',
    dob: '2005-01-25',
    gender: 'Female',
    department: 'Electronics & Comm. Engg.',
    course: 'B.Tech ECE',
    year: '1st Year',
    submittedDate: '2026-09-07',
    status: 'Under Review',
    previousExperience: true
  },
  {
    id: 'app-003',
    applicationId: 'NCC-2026-00126',
    applicantName: 'Amitabh Sen',
    email: 'amitabh.s@university.edu',
    phone: '+91 97654 11223',
    dob: '2004-10-30',
    gender: 'Male',
    department: 'Mechanical Engineering',
    course: 'B.Tech Mechanical',
    year: '2nd Year',
    submittedDate: '2026-09-05',
    status: 'Selected',
    previousExperience: false
  },
  {
    id: 'app-004',
    applicationId: 'NCC-2026-00127',
    applicantName: 'Pooja Banerjee',
    email: 'pooja.b@university.edu',
    phone: '+91 99887 33445',
    dob: '2005-08-14',
    gender: 'Female',
    department: 'Management Studies',
    course: 'BBA',
    year: '1st Year',
    submittedDate: '2026-09-04',
    status: 'Waitlisted',
    previousExperience: false
  }
];
