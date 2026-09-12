import React from 'react';
import { MasterCrudPage } from './MasterCrudPage';
import { mockCadets } from '../../data/students';
import { mockOfficers } from '../../data/officers';
import { mockDepartments } from '../../data/departments';
import { mockUnits } from '../../data/units';
import { mockRanks } from '../../data/ranks';
import { mockCamps } from '../../data/camps';
import { mockCertificates } from '../../data/certificates';
import { mockAchievements } from '../../data/achievements';
import { mockActivities } from '../../data/activities';
import { mockTrainingSessions } from '../../data/training';
import { mockNotices } from '../../data/notices';

export const AdminUsers: React.FC = () => (
  <MasterCrudPage
    title="User Directory"
    subtitle="Manage accounts, roles, and permissions across students, officers, and admins."
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'rank', label: 'Role / Rank' },
      { key: 'unit', label: 'Unit' },
    ]}
    initialData={mockCadets}
  />
);

export const AdminStudents: React.FC = () => (
  <MasterCrudPage
    title="Student Cadets Master"
    subtitle="Master list of all registered student cadets in the university."
    columns={[
      { key: 'studentId', label: 'Roll ID' },
      { key: 'name', label: 'Cadet Name' },
      { key: 'department', label: 'Department' },
      { key: 'rank', label: 'Rank' },
      { key: 'attendancePercentage', label: 'Attendance %' },
    ]}
    initialData={mockCadets}
  />
);

export const AdminOfficers: React.FC = () => (
  <MasterCrudPage
    title="NCC Officers Master"
    subtitle="Manage Associate NCC Officers (ANOs) and Caretaker Officers."
    columns={[
      { key: 'officerId', label: 'Officer ID' },
      { key: 'name', label: 'Officer Name' },
      { key: 'rank', label: 'Rank' },
      { key: 'unit', label: 'Unit' },
      { key: 'department', label: 'Academic Department' },
    ]}
    initialData={mockOfficers}
  />
);

export const AdminDepartments: React.FC = () => (
  <MasterCrudPage
    title="Academic Departments"
    subtitle="University departments participating in NCC programs."
    columns={[
      { key: 'code', label: 'Dept Code' },
      { key: 'name', label: 'Department Name' },
      { key: 'cadetCount', label: 'Active Cadets' },
      { key: 'headName', label: 'Department Head' },
    ]}
    initialData={mockDepartments}
  />
);

export const AdminUnits: React.FC = () => (
  <MasterCrudPage
    title="Units & Battalions"
    subtitle="Registered NCC Battalions attached to the university campus."
    columns={[
      { key: 'code', label: 'Unit Code' },
      { key: 'name', label: 'Battalion Name' },
      { key: 'totalCadets', label: 'Cadet Capacity' },
      { key: 'commandingOfficer', label: 'Commanding Officer' },
    ]}
    initialData={mockUnits}
  />
);

export const AdminRanks: React.FC = () => (
  <MasterCrudPage
    title="Rank Hierarchy Master"
    subtitle="Senior Division & Wing cadet promotion structure."
    columns={[
      { key: 'code', label: 'Rank Code' },
      { key: 'name', label: 'Rank Title' },
      { key: 'category', label: 'Category Division' },
    ]}
    initialData={mockRanks}
  />
);

export const AdminCamps: React.FC = () => (
  <MasterCrudPage
    title="Camp Master Configuration"
    subtitle="Master catalog of Annual Training Camps and Leadership Expeditions."
    columns={[
      { key: 'name', label: 'Camp Name' },
      { key: 'type', label: 'Type' },
      { key: 'location', label: 'Location' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'status', label: 'Status' },
    ]}
    initialData={mockCamps}
  />
);

export const AdminCertificates: React.FC = () => (
  <MasterCrudPage
    title="Certificate Records Master"
    subtitle="Verified digital certificate repository."
    columns={[
      { key: 'certificateNumber', label: 'Serial Number' },
      { key: 'cadetName', label: 'Cadet Name' },
      { key: 'type', label: 'Certificate Type' },
      { key: 'issueDate', label: 'Issue Date' },
      { key: 'status', label: 'Verification Status' },
    ]}
    initialData={mockCertificates}
  />
);

export const AdminAchievements: React.FC = () => (
  <MasterCrudPage
    title="Achievements & Honors Master"
    subtitle="University honors roll and national medals."
    columns={[
      { key: 'cadetName', label: 'Cadet Name' },
      { key: 'achievementTitle', label: 'Achievement Title' },
      { key: 'level', label: 'Level' },
      { key: 'year', label: 'Year' },
    ]}
    initialData={mockAchievements}
  />
);

export const AdminActivities: React.FC = () => (
  <MasterCrudPage
    title="Activities & Social Service Master"
    subtitle="Community service drives and tree plantation events."
    columns={[
      { key: 'title', label: 'Activity Title' },
      { key: 'category', label: 'Category' },
      { key: 'date', label: 'Event Date' },
      { key: 'participantsCount', label: 'Enrolled Cadets' },
    ]}
    initialData={mockActivities}
  />
);

export const AdminTraining: React.FC = () => (
  <MasterCrudPage
    title="Training Schedule Master"
    subtitle="Parade drill sessions and lecture schedules."
    columns={[
      { key: 'topic', label: 'Training Topic' },
      { key: 'type', label: 'Class Type' },
      { key: 'date', label: 'Date' },
      { key: 'instructor', label: 'Instructor' },
    ]}
    initialData={mockTrainingSessions}
  />
);

export const AdminNotices: React.FC = () => (
  <MasterCrudPage
    title="Notice Board Manager"
    subtitle="System circulars and university announcements."
    columns={[
      { key: 'title', label: 'Notice Title' },
      { key: 'category', label: 'Category' },
      { key: 'date', label: 'Published Date' },
    ]}
    initialData={mockNotices}
  />
);

export const AdminGallery: React.FC = () => (
  <MasterCrudPage
    title="Photo Gallery Manager"
    subtitle="Institutional parade photography repository."
    columns={[
      { key: 'id', label: 'Media ID' },
      { key: 'title', label: 'Photo Caption' },
      { key: 'category', label: 'Album' },
    ]}
    initialData={[
      { id: 'img-1', title: 'Republic Day Parade 2026', category: 'Parades' },
      { id: 'img-2', title: 'ATC Obstacle Course', category: 'Camps' },
    ]}
  />
);

export const AdminPayments: React.FC = () => (
  <MasterCrudPage
    title="Cadet Refreshment & Camp Washing Allowances"
    subtitle="Government refreshment allowance disbursements and camp washing allowances."
    columns={[
      { key: 'cadetName', label: 'Cadet Name' },
      { key: 'rank', label: 'Rank' },
      { key: 'allowanceType', label: 'Allowance Type' },
      { key: 'amount', label: 'Amount (₹)' },
      { key: 'status', label: 'Disbursement Status' },
    ]}
    initialData={[
      { id: 'pay-1', cadetName: 'Rahul Sharma', rank: 'SUO', allowanceType: 'Refreshment Allowance', amount: '₹1,200', status: 'DISBURSED' },
      { id: 'pay-2', cadetName: 'Ananya Verma', rank: 'JUO', allowanceType: 'Camp Washing Allowance', amount: '₹800', status: 'DISBURSED' },
    ]}
  />
);

export const AdminReports: React.FC = () => (
  <MasterCrudPage
    title="System Audit & Analytical Reports"
    subtitle="Comprehensive annual reports for Directorate submission."
    columns={[
      { key: 'reportName', label: 'Report Title' },
      { key: 'period', label: 'Period' },
      { key: 'generatedBy', label: 'Generated By' },
    ]}
    initialData={[
      { id: 'rep-1', reportName: 'Annual Cadet Parade Audit 2026', period: '2025-26', generatedBy: 'System Administrator' },
    ]}
  />
);

export const AdminSettings: React.FC = () => (
  <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-card space-y-6">
    <div>
      <h1 className="text-2xl font-extrabold text-navy">System Settings & Portal Configuration</h1>
      <p className="text-xs text-text-secondary">General portal branding, session academic year, and security settings.</p>
    </div>
    <div className="space-y-4 text-xs">
      <div>
        <label className="font-bold text-navy block mb-1">Active Academic Session</label>
        <input type="text" defaultValue="2026–2027" className="w-full max-w-md p-3 bg-gray-50 border border-gray-200 rounded-xl" />
      </div>
      <div>
        <label className="font-bold text-navy block mb-1">University Name Title</label>
        <input type="text" defaultValue="State Central University" className="w-full max-w-md p-3 bg-gray-50 border border-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
);
