import { NccUnit } from '../types';

export interface NccLeader {
  id: string;
  name: string;
  rank: string;
  designation: string;
  unit: NccUnit | string;
  category: 'Senior Officer' | 'ANO Officer' | 'Senior Cadet' | 'Best Cadet';
  badgeText: string;
  badgeBg: string;
  photo: string;
  achievement: string;
  roleDescription: string;
}

export const mockNccLeaders: NccLeader[] = [
  {
    id: 'lead-1',
    name: 'Col. Sanjeev Sharma (Retd.)',
    rank: 'Colonel',
    designation: 'Senior Commanding Officer',
    unit: 'Army Unit',
    category: 'Senior Officer',
    badgeText: 'ARMY UNIT • SENIOR CO',
    badgeBg: 'bg-red-600 text-white',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    achievement: 'Commanded 1st Battalion with OTA Kamptee Honor',
    roleDescription: 'Strategic leadership, parade drill standards, and university cadet battalion administration.'
  },
  {
    id: 'lead-2',
    name: 'Capt. Arindam Roy',
    rank: 'Captain',
    designation: 'Associate NCC Officer (ANO)',
    unit: 'Army Unit',
    category: 'ANO Officer',
    badgeText: 'ARMY UNIT • ANO OFFICER',
    badgeBg: 'bg-[#082B57] text-[#F5D061]',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    achievement: 'Governor Best Company Banner Winner 2026',
    roleDescription: 'Leading cadet development, squad drill precision, rifle marksmanship, and camp logistics.'
  },
  {
    id: 'lead-3',
    name: 'Cdr. R. K. Varma',
    rank: 'Commander',
    designation: 'Commanding Officer (Naval Unit)',
    unit: 'Naval Unit',
    category: 'Senior Officer',
    badgeText: 'NAVAL UNIT • CO',
    badgeBg: 'bg-[#1677FF] text-white',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    achievement: 'National Sailing Regatta Gold Medal Contingent',
    roleDescription: 'Naval seamanship, whaler boat pulling expeditions, and maritime defense drills.'
  },
  {
    id: 'lead-4',
    name: 'Lt. Sunita Verma',
    rank: 'Lieutenant',
    designation: 'Associate NCC Officer (ANO - SW)',
    unit: 'Army Unit',
    category: 'ANO Officer',
    badgeText: 'SENIOR WING • ANO OFFICER',
    badgeBg: 'bg-amber-500 text-slate-950 font-bold',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    achievement: 'RDC Girls Parade Contingent Commander',
    roleDescription: 'Directing female cadet corps, national integration seminars, and officer selection guidance.'
  },
  {
    id: 'lead-5',
    name: 'Sub Lt. Ananya Rao',
    rank: 'Sub Lieutenant',
    designation: 'Naval Wing Officer (ANO)',
    unit: 'Naval Unit',
    category: 'ANO Officer',
    badgeText: 'NAVAL UNIT • ANO OFFICER',
    badgeBg: 'bg-sky-600 text-white',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    achievement: 'Nau Sainik Camp Overall Championship Trainer',
    roleDescription: 'Specialist in ship modeling, semaphore signals, and coastal disaster relief management.'
  },
  {
    id: 'lead-6',
    name: 'SUO Rohan Sharma',
    rank: 'Senior Under Officer',
    designation: 'Cadet Battalion Senior Leader',
    unit: 'Army Unit',
    category: 'Senior Cadet',
    badgeText: 'SENIOR UNDER OFFICER',
    badgeBg: 'bg-slate-900 text-[#F5D061]',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    achievement: 'Republic Day Parade Rajpath Contingent Leader',
    roleDescription: 'Head Cadet commanding battalion parades, squad drill rehearsals, and obstacle courses.'
  },
  {
    id: 'lead-7',
    name: 'CUO Ananya Singh',
    rank: 'Cadet Under Officer',
    designation: 'Naval Cadet Senior Leader',
    unit: 'Naval Unit',
    category: 'Senior Cadet',
    badgeText: 'CADET UNDER OFFICER',
    badgeBg: 'bg-[#1677FF] text-white',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    achievement: 'All-India Nau Sainik Boat Pulling Gold Medalist',
    roleDescription: 'Commanding naval cadet contingents, whaler rowing, and annual training camps.'
  },
  {
    id: 'lead-8',
    name: 'Cadet Vikram Patel',
    rank: 'Cadet',
    designation: 'Best Cadet Awardee 2026',
    unit: 'Army Unit',
    category: 'Best Cadet',
    badgeText: 'BEST CADET AWARD 2026',
    badgeBg: 'bg-emerald-600 text-white',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    achievement: '1st Position in National .22 Rifle Shooting',
    roleDescription: 'Outstanding achievement in marksmanship, discipline, and community service.'
  }
];
