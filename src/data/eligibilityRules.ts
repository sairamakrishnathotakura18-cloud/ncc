import { EligibilityRule } from '../types';

export const mockEligibilityRules: EligibilityRule[] = [
  {
    id: 'rule-01',
    ruleName: 'Minimum Parade Attendance',
    ruleType: 'Attendance',
    value: '75%',
    description: 'Cadets must maintain a minimum of 75% attendance in weekly parade drills to be eligible for camp selection and certificate exams.',
    isActive: true
  },
  {
    id: 'rule-02',
    ruleName: 'Age Limit Criteria',
    ruleType: 'Age',
    value: '17.5 – 26 Years',
    description: 'Senior Division / Wing applicants must be aged between 17.5 and 26 years at the time of enrollment.',
    isActive: true
  },
  {
    id: 'rule-03',
    ruleName: 'Academic Standing Requirement',
    ruleType: 'Academic',
    value: 'Min 6.0 CGPA / No Active Backlogs',
    description: 'Cadets must maintain good academic standing with no disciplinary probations in their academic department.',
    isActive: true
  },
  {
    id: 'rule-04',
    ruleName: 'Physical Medical Fitness',
    ruleType: 'Physical',
    value: 'Certified by Medical Officer',
    description: 'Mandatory physical fitness test completion (Run 1.6 km under 7 mins for males, 8 mins for females).',
    isActive: true
  }
];
