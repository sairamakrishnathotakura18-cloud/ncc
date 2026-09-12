import { UnitInfo } from '../types';

export const mockUnits: UnitInfo[] = [
  {
    id: 'Army Unit',
    name: 'Army Unit',
    code: '1-BN-ITM-ARMY',
    motto: 'Service Before Self',
    icon: 'Shield',
    description: 'Specialized ground tactics, squad drill precision, obstacle clearance, .22 rifle marksmanship, and camp leadership training.',
    totalCadets: 420,
    activeUnits: 2,
    commandingOfficer: 'Col. Sanjeev Sharma (Retd.)',
    upcomingCampsCount: 7,
    color: '#D92D20',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    borderColor: 'border-red-200 hover:border-red-400',
  },
  {
    id: 'Naval Unit',
    name: 'Naval Unit',
    code: '4-NAV-ITM-NAVY',
    motto: 'May the Lord of Waters Be Auspicious Unto Us',
    icon: 'Anchor',
    description: 'Seamanship, boat pulling, sailing expeditions, ship modeling, naval signals, and maritime disaster management.',
    totalCadets: 230,
    activeUnits: 1,
    commandingOfficer: 'Cdr. R. K. Varma',
    upcomingCampsCount: 5,
    color: '#1677FF',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    borderColor: 'border-blue-200 hover:border-blue-400',
  },
];
