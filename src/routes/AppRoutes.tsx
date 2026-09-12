import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { History } from '../pages/public/History';
import { UniversityNCC } from '../pages/public/UniversityNCC';
import { Ranks } from '../pages/public/Ranks';
import { Eligibility } from '../pages/public/Eligibility';
import { Join } from '../pages/public/Join';
import { Training } from '../pages/public/Training';
import { TwoDayTraining } from '../pages/public/TwoDayTraining';
import { Camps } from '../pages/public/Camps';
import { Certificates } from '../pages/public/Certificates';
import { Achievements } from '../pages/public/Achievements';
import { Activities } from '../pages/public/Activities';
import { Gallery } from '../pages/public/Gallery';
import { Notices } from '../pages/public/Notices';
import { FAQ } from '../pages/public/FAQ';
import { Contact } from '../pages/public/Contact';
import { Login } from '../pages/auth/Login';
import { WingDetail } from '../pages/public/WingDetail';

// Student Pages
import { StudentDashboard } from '../pages/student/Dashboard';
import { StudentProfile } from '../pages/student/Profile';
import { StudentAttendance } from '../pages/student/Attendance';
import { StudentTraining } from '../pages/student/Training';
import { StudentCamps } from '../pages/student/Camps';
import { StudentCertificates } from '../pages/student/Certificates';
import { StudentAchievements } from '../pages/student/Achievements';
import { StudentActivities } from '../pages/student/Activities';
import { StudentDocuments } from '../pages/student/Documents';
import { StudentNotifications } from '../pages/student/Notifications';

// Officer Pages
import { OfficerDashboard } from '../pages/officer/Dashboard';
import { OfficerCadets } from '../pages/officer/Cadets';
import { OfficerApplications } from '../pages/officer/Applications';
import { OfficerAttendance } from '../pages/officer/Attendance';
import { OfficerTraining } from '../pages/officer/Training';
import { OfficerCamps } from '../pages/officer/Camps';
import { OfficerCertificates } from '../pages/officer/Certificates';
import { OfficerAchievements } from '../pages/officer/Achievements';
import { OfficerActivities } from '../pages/officer/Activities';
import { OfficerNotices } from '../pages/officer/Notices';
import { OfficerReports } from '../pages/officer/Reports';
import { SelectedCadetManager } from '../pages/officer/SelectedCadetManager';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminEligibilityRules } from '../pages/admin/EligibilityRules';
import {
  AdminUsers, AdminStudents, AdminOfficers, AdminDepartments,
  AdminUnits, AdminRanks, AdminCamps, AdminCertificates,
  AdminAchievements, AdminActivities, AdminTraining, AdminNotices,
  AdminGallery, AdminPayments, AdminReports, AdminSettings
} from '../pages/admin/AdminPages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wings" element={<WingDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/university-ncc" element={<UniversityNCC />} />
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/eligibility" element={<Eligibility />} />
        <Route path="/rules" element={<Eligibility />} />
        <Route path="/join" element={<Join />} />
        <Route path="/training" element={<TwoDayTraining />} />
        <Route path="/camps" element={<Camps />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Student Portal */}
      <Route path="/student" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="training" element={<StudentTraining />} />
        <Route path="camps" element={<StudentCamps />} />
        <Route path="certificates" element={<StudentCertificates />} />
        <Route path="achievements" element={<StudentAchievements />} />
        <Route path="activities" element={<StudentActivities />} />
        <Route path="documents" element={<StudentDocuments />} />
        <Route path="notifications" element={<StudentNotifications />} />
      </Route>

      {/* Officer Portal */}
      <Route path="/officer" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/officer/dashboard" replace />} />
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="cadets" element={<OfficerCadets />} />
        <Route path="selected-cadets" element={<SelectedCadetManager />} />
        <Route path="applications" element={<OfficerApplications />} />
        <Route path="attendance" element={<OfficerAttendance />} />
        <Route path="training" element={<OfficerTraining />} />
        <Route path="camps" element={<OfficerCamps />} />
        <Route path="certificates" element={<OfficerCertificates />} />
        <Route path="achievements" element={<OfficerAchievements />} />
        <Route path="activities" element={<OfficerActivities />} />
        <Route path="notices" element={<OfficerNotices />} />
        <Route path="reports" element={<OfficerReports />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="officers" element={<AdminOfficers />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="units" element={<AdminUnits />} />
        <Route path="ranks" element={<AdminRanks />} />
        <Route path="eligibility" element={<AdminEligibilityRules />} />
        <Route path="camps" element={<AdminCamps />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="activities" element={<AdminActivities />} />
        <Route path="training" element={<AdminTraining />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
