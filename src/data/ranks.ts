import { Rank } from '../types';

export const mockRanks: Rank[] = [
  {
    id: 'rnk-01',
    code: 'SUO',
    name: 'Senior Under Officer (SUO)',
    category: 'Senior Division / Wing',
    description: 'Highest cadet rank in Senior Division/Wing. Commands the company and assists Battalion Staff.',
    responsibilities: [
      'Command overall Senior Division company parades',
      'Liaison officer between ANOs, PI Staff, and cadets',
      'Organize camp preparation and logistics',
      'Mentor JUOs, CQMS, and Sergeants'
    ],
    insigniaIcon: 'ShieldAlert'
  },
  {
    id: 'rnk-02',
    code: 'JUO',
    name: 'Junior Under Officer (JUO)',
    category: 'Senior Division / Wing',
    description: 'Second senior cadet rank. Commands platoons and oversees platoon discipline.',
    responsibilities: [
      'Lead individual platoon formations',
      'Supervise squad drill rehearsals',
      'Inspect uniform cleanliness and turnout',
      'Manage cadet attendance logs'
    ],
    insigniaIcon: 'ShieldCheck'
  },
  {
    id: 'rnk-03',
    code: 'CQMS',
    name: 'Company Quarter Master Sergeant (CQMS)',
    category: 'Senior Division / Wing',
    description: 'In charge of stores, equipment, uniforms, and company logistics.',
    responsibilities: [
      'Maintain inventory of boots, belts, badges, and uniforms',
      'Manage drill equipment distribution',
      'Oversee quarter-guard duties',
      'Coordinate camp ration and store dispatch'
    ],
    insigniaIcon: 'Boxes'
  },
  {
    id: 'rnk-04',
    code: 'SGT',
    name: 'Sergeant (SGT)',
    category: 'Senior Division / Wing',
    description: 'Section commander responsible for direct drill instruction and cadet welfare.',
    responsibilities: [
      'Direct 10-cadet section training',
      'Conduct daily physical training sessions',
      'Enforce weapon handling safety rules',
      'Assist CQMS in store management'
    ],
    insigniaIcon: 'Award'
  },
  {
    id: 'rnk-05',
    code: 'CPL',
    name: 'Corporal (CPL)',
    category: 'Senior Division / Wing',
    description: 'Junior NCO assisting Sergeants in drill execution and squad maneuvers.',
    responsibilities: [
      'Assist in squad drill instructions',
      'Conduct morning roll calls',
      'Guide new 1st year cadets'
    ],
    insigniaIcon: 'Medal'
  },
  {
    id: 'rnk-06',
    code: 'L/CPL',
    name: 'Lance Corporal (L/CPL)',
    category: 'Senior Division / Wing',
    description: 'First promotional appointment given to promising cadets after basic camp.',
    responsibilities: [
      'Lead front file drill squad',
      'Assist in parade ground maintenance'
    ],
    insigniaIcon: 'ChevronUp'
  },
  {
    id: 'rnk-07',
    code: 'CDT',
    name: 'Cadet (CDT)',
    category: 'Senior Division / Wing',
    description: 'Entry-level enrolled cadet undergoing basic NCC institutional training.',
    responsibilities: [
      'Attend mandatory weekly drill parades',
      'Participate in social service drives',
      'Prepare for B Certificate Examination'
    ],
    insigniaIcon: 'User'
  }
];
