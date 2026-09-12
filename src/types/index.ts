export type UserRole = 'student' | 'officer' | 'admin' | 'guest';

export type NccUnit = 'Army Unit' | 'Naval Unit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  cadetId?: string;
  rank?: string;
  unit?: string;
  department?: string;
  nccUnit?: NccUnit;
}

export interface Cadet {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: string;
  course: string;
  year: string;
  unit: string;
  rank: string;
  nccUnit?: NccUnit;
  enrollmentDate: string;
  attendancePercentage: number;
  presentCount: number;
  absentCount: number;
  status: 'ACTIVE' | 'GRADUATED' | 'INACTIVE' | 'SUSPENDED' | 'SELECTED' | 'SHORTLISTED' | 'WAITLISTED';
  photo: string;
  emergencyContact: string;
  address: string;
  regimentalNumber?: string;
  bloodGroup?: string;
  campsAttended?: string[];
}

export interface Officer {
  id: string;
  officerId: string;
  name: string;
  rank: string;
  designation: string;
  unit: string;
  wing?: string;
  department: string;
  nccUnit: NccUnit;
  email: string;
  phone: string;
  photo: string;
  experienceYears: number;
  bio?: string;
  role?: string;
  roleDescription?: string;
}

export interface Trainer {
  id: string;
  name: string;
  designation: string;
  nccUnit: NccUnit;
  unit: string;
  photo: string;
  specialization: string;
}

export interface UnitInfo {
  id: NccUnit;
  name: NccUnit;
  code: string;
  motto: string;
  icon: string;
  description: string;
  totalCadets: number;
  activeUnits: number;
  commandingOfficer: string;
  upcomingCampsCount: number;
  color: string;
  badgeBg: string;
  borderColor: string;
}

export interface Camp {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  type: 'Annual Training Camp' | 'Combined Annual Training Camp' | 'Leadership Camp' | 'Adventure Training Camp' | 'Republic Day Camp' | 'Thal Sainik Camp' | 'Nau Sainik Camp' | 'Vayu Sainik Camp' | 'National Integration Camp';
  category?: 'General' | 'National-Level';
  nccUnit?: NccUnit | 'All Units';
  wing?: string;
  unit: string;
  eligibility: string;
  status: 'OPEN' | 'UPCOMING' | 'CLOSED' | 'COMPLETED';
  registrationDeadline: string;
  organizer: string;
  maxParticipants: number;
  appliedCount: number;
  image: string;
  description: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  cadetId: string;
  cadetName: string;
  type: string;
  issueDate: string;
  issuingUnit: string;
  status: 'VERIFIED' | 'REVOKED' | 'EXPIRED' | 'UNDER_REVIEW';
  grade?: 'A' | 'B' | 'C' | 'DISTINCTION';
  qrCodeUrl?: string;
  studentName?: string;
  regimentalNumber?: string;
  unit?: string;
  grading?: string;
}

export interface Achievement {
  id: string;
  cadetName: string;
  cadetId: string;
  photo: string;
  achievementTitle: string;
  level: string; // e.g. 'National', 'State', 'University', 'Camps', 'Sports', 'Leadership', 'Social Service'
  category: string;
  year: number | string;
  nccUnit?: NccUnit;
  unit?: string;
  wing?: string;
  description: string;
  eventCamp?: string;
  isLatest?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  participantsCount: number;
  description: string;
  category: string;
  image: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Enrollment' | 'Camp' | 'Training' | 'Certificate' | 'General';
  shortDesc: string;
  content: string;
  isImportant: boolean;
  hasAttachment: boolean;
}

export interface TrainingSession {
  id: string;
  date: string;
  time: string;
  topic: string;
  instructor: string;
  location: string;
  unit: string;
  type: string;
}

export interface AttendanceRecord {
  id: string;
  cadetId: string;
  cadetName: string;
  studentId: string;
  unit: string;
  date: string;
  trainingTopic: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
}

export interface EligibilityRule {
  id: string;
  ruleName: string;
  ruleType: string;
  value: string;
  description: string;
  isActive: boolean;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  cadetCount: number;
  headName: string;
}

export interface Unit {
  id: string;
  code: string;
  name: string;
  location: string;
  commandingOfficer: string;
  totalCadets: number;
}

export interface Rank {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  responsibilities: string[];
  insigniaIcon: string;
}

export interface Application {
  id: string;
  applicationId: string;
  applicantName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: string;
  course: string;
  year: string;
  submittedDate: string;
  status: 'Pending' | 'Under Review' | 'Selected' | 'Waitlisted' | 'Rejected';
  previousExperience: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  role: UserRole;
}

export interface TwoDayProgram {
  id: string;
  title: string;
  nccUnit: NccUnit | 'All Units';
  day1: {
    title: string;
    topic: string;
    instructor: string;
    date: string;
    time: string;
    venue: string;
    attendancePct: number;
  };
  day2: {
    title: string;
    topic: string;
    instructor: string;
    date: string;
    time: string;
    venue: string;
    attendancePct: number;
  };
  overallAttendancePct: number;
}

export interface ComplaintTicket {
  id: string;
  ticketId: string;
  subject: string;
  category: 'Training' | 'Camp' | 'Facilities' | 'Registration' | 'Documents' | 'Other';
  description: string;
  submittedBy: string;
  submittedDate: string;
  status: 'Submitted' | 'Under Review' | 'Resolved' | 'Closed';
}

export interface UserManualGuide {
  id: number;
  title: string;
  category: string;
  iconName: string;
  summary: string;
}
