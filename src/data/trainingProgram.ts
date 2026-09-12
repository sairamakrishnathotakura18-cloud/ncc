import { TwoDayProgram } from '../types';

export const mockTwoDayProgram: TwoDayProgram = {
  id: 'prog-2day-001',
  title: 'ITM NCC 2-Day Cadre Training Program 2026',
  nccUnit: 'All Units',
  day1: {
    title: 'DAY 1 — THEORY LECTURES',
    topic: 'NCC Organization, Military History & Leadership Qualities',
    instructor: 'Capt. Arindam Roy (ANO)',
    date: 'Saturday, 18th April 2026',
    time: '09:00 AM – 01:00 PM',
    venue: 'ITM Academic Block B - Auditorium Hall 101',
    attendancePct: 92.5
  },
  day2: {
    title: 'DAY 2 — PRACTICAL DRILL & FIELD EXERCISES',
    topic: 'Squad Drill, Command Words & Obstacle Clearance Course',
    instructor: 'Subedar M. S. Thapa (Drill Instructor)',
    date: 'Sunday, 19th April 2026',
    time: '06:30 AM – 11:30 AM',
    venue: 'ITM University Main Parade Arena & Firing Range',
    attendancePct: 88.0
  },
  overallAttendancePct: 90.25
};
