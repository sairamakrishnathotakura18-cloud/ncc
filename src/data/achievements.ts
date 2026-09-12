import { Achievement } from '../types';

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    cadetName: 'SUO Vikram Singh',
    cadetId: 'cadet-003',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    achievementTitle: 'Governor Gold Medalist — Best SD Cadet 2026',
    level: 'State',
    category: 'Leadership',
    year: '2026',
    nccUnit: 'Army Unit',
    eventCamp: 'Republic Day Camp (RDC)',
    description: 'Awarded Governor Gold Medal for outstanding parade leadership, command precision, and top score in rifle marksmanship.',
    isLatest: true
  },
  {
    id: 'ach-2',
    cadetName: 'Cadet Rahul Sharma',
    cadetId: 'cadet-001',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    achievementTitle: '1st Position in .22 Rifle Marksmanship',
    level: 'National',
    category: 'Camps',
    year: '2026',
    nccUnit: 'Army Unit',
    eventCamp: 'Combined Annual Training Camp (CATC)',
    description: 'Achieved 48/50 score in annual inter-unit firing competition, winning Gold Medal & Commendation Baton.',
    isLatest: true
  },
  {
    id: 'ach-3',
    cadetName: 'JUO Ananya Sen',
    cadetId: 'cadet-002',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    achievementTitle: 'Prime Minister Rally Contingent Leader — RDC 2026',
    level: 'National',
    category: 'Leadership',
    year: '2026',
    nccUnit: 'Naval Unit',
    eventCamp: 'Republic Day Parade Rajpath',
    description: 'Represented MP & CG Directorate at Rajpath ceremonial parade, receiving PM Baton of Honor.',
    isLatest: true
  },
  {
    id: 'ach-4',
    cadetName: 'Cadet Arjun Patel',
    cadetId: 'cadet-004',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    achievementTitle: 'Best Whaler Boat Puller — Nau Sainik Camp 2025',
    level: 'National',
    category: 'Camps',
    year: '2025',
    nccUnit: 'Naval Unit',
    eventCamp: 'Nau Sainik Camp (NSC)',
    description: 'Led the ITM Naval Unit boat pulling team to 1st place overall trophy at INS Shivaji, Lonavala.',
    isLatest: false
  },
  {
    id: 'ach-5',
    cadetName: 'Cadet Meera Joshi',
    cadetId: 'cadet-005',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    achievementTitle: 'University Best Social Service Cadet Award 2025',
    level: 'University',
    category: 'Social Service',
    year: '2025',
    nccUnit: 'Army Unit',
    eventCamp: 'Mega Blood Donation Drive',
    description: 'Logged 85+ hours of community service and blood donation mobilization across ITM campus.',
    isLatest: false
  },
  {
    id: 'ach-6',
    cadetName: 'Cadet Priya Verma',
    cadetId: 'cadet-006',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    achievementTitle: 'Gold Medalist — Inter-University Sports Meet 2024',
    level: 'State',
    category: 'Sports',
    year: '2024',
    nccUnit: 'Naval Unit',
    eventCamp: 'State Athletic Championship',
    description: 'Secured Gold in 800m track race representing ITM University NCC Sports Delegation.',
    isLatest: false
  }
];
