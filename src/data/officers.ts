import { Officer, Trainer } from '../types';

export const mockOfficers: Officer[] = [
  {
    id: 'off-1',
    officerId: 'ANO-2018-042',
    name: 'Capt. Arindam Roy',
    rank: 'Captain',
    designation: 'Associate NCC Officer (ANO)',
    unit: '1st ITM Battalion NCC',
    department: 'Computer Science & Engg',
    nccUnit: 'Army Unit',
    email: 'arindam.roy@itm.edu.in',
    phone: '+91 98301 12345',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    experienceYears: 9,
    role: 'Leading cadet development, parade training, rifle marksmanship, and camp logistics.',
    bio: 'Commissioned Officer in Army Unit with distinction at OTA Kamptee. Directs drill precision, marksmanship, and camp logistics.'
  },
  {
    id: 'off-2',
    officerId: 'ANO-2020-089',
    name: 'Lt. Sunita Verma',
    rank: 'Lieutenant',
    designation: 'Associate NCC Officer (ANO)',
    unit: '1st ITM Girls Battalion NCC',
    department: 'Physics & Natural Sciences',
    nccUnit: 'Army Unit',
    email: 'sunita.verma@itm.edu.in',
    phone: '+91 98302 67890',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    experienceYears: 6,
    role: 'Commanding Senior Wing female cadet corps and national integration seminars.',
    bio: 'Leads Senior Wing female cadets with focus on national integration, leadership seminars, and Republic Day parade selections.'
  },
  {
    id: 'off-3',
    officerId: 'ANO-2021-104',
    name: 'Sub Lt. Ananya Rao',
    rank: 'Sub Lieutenant',
    designation: 'Associate NCC Officer (ANO)',
    unit: '4th ITM Naval Unit NCC',
    department: 'Electronics & Communication',
    nccUnit: 'Naval Unit',
    email: 'ananya.rao@itm.edu.in',
    phone: '+91 98303 11223',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    experienceYears: 5,
    role: 'Directing seamanship, whaler boat pulling, and naval signals training.',
    bio: 'Naval Unit specialist commanding seamanship, boat pulling expeditions, and maritime disaster management operations.'
  },
  {
    id: 'off-4',
    officerId: 'ANO-2019-077',
    name: 'Maj. Rajeshwar Singh',
    rank: 'Major',
    designation: 'Associate NCC Officer (ANO)',
    unit: '1st ITM Battalion NCC',
    department: 'Mechanical Engineering',
    nccUnit: 'Army Unit',
    email: 'rajeshwar.singh@itm.edu.in',
    phone: '+91 98304 99887',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    experienceYears: 12,
    role: 'Overseeing battalion tactical maneuvers, obstacle courses, and SSB coaching.',
    bio: 'Senior Army Unit Officer directing obstacle course clearing, map reading, and SSB interview guidance.'
  },
  {
    id: 'off-5',
    officerId: 'ANO-2022-112',
    name: 'Lt. Cdr. Priya Sharma',
    rank: 'Lieutenant Commander',
    designation: 'Associate NCC Officer (ANO)',
    unit: '4th ITM Naval Unit NCC',
    department: 'Civil Engineering',
    nccUnit: 'Naval Unit',
    email: 'priya.sharma@itm.edu.in',
    phone: '+91 98305 22334',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    experienceYears: 8,
    role: 'Managing naval sailing regattas, ship modeling, and coastal defense drills.',
    bio: 'Naval Unit ANO leading national sailing regattas, ship modeling workshops, and semaphore communication.'
  }
];

export const mockTrainers: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Subedar M. S. Thapa',
    designation: 'Senior Drill Instructor',
    nccUnit: 'Army Unit',
    unit: '1st ITM Battalion NCC',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    specialization: 'Ceremonial Drill, Guard of Honour & Command Words'
  },
  {
    id: 'tr-2',
    name: 'Havildar R. K. Yadav',
    designation: 'Weapon Training Instructor',
    nccUnit: 'Army Unit',
    unit: '1st ITM Battalion NCC',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    specialization: '.22 Deluxe Rifle & 7.62mm SLR Handling'
  },
  {
    id: 'tr-3',
    name: 'PO Seaman V. Nair',
    designation: 'Seamanship & Boat Pulling Coach',
    nccUnit: 'Naval Unit',
    unit: '4th ITM Naval Unit',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    specialization: 'Naval Signals, Whaler Boat Pulling & Semaphore'
  }
];
