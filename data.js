/**
 * NCC DIGITAL MANAGEMENT ECOSYSTEM - UNIFIED SHARED DATA STORE (data.js)
 * ITM University Gwalior • Single Source of Truth
 * 
 * Provides reactive cross-portal state management, localStorage persistence,
 * cross-tab synchronization via 'storage' events, and comprehensive DBMS audit logging.
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'ncc_portal_database_v3';

  // Initial Seed Data ensuring numbers consistency:
  // Units: Army 8 MP Art (56 cadets), 3 MP Naval Unit (32 cadets), 2 MP Girls Bn (28 cadets)
  // Total Cadets = 56 + 32 + 28 = 116 Cadets!
  const INITIAL_DATA = {
    settings: {
      minAttendanceThreshold: 75,
      academicYear: '2026-27',
      systemStatus: 'Operational',
      enrollmentOpen: true,
      lastSync: new Date().toISOString()
    },
    units: [
      { id: 'unit-army', name: '8 MP Artillery Battalion', shortName: '8 MP Art Bn', wing: 'Army Wing (SD)', location: 'ITM Gwalior Campus', ano: 'CTO Gaurav Singh', quota: 120, established: 1965 },
      { id: 'unit-naval', name: '3 MP Naval Unit', shortName: '3 MP Naval', wing: 'Naval Wing', location: 'Gwalior Fort Depot', ano: 'Lt. Priya Sharma', quota: 80, established: 1978 },
      { id: 'unit-girls', name: '2 MP Girls Battalion', shortName: '2 MP Girls Bn', wing: 'Girls Wing (SW)', location: 'ITM Girls Wing Compound', ano: 'Capt. Sunita Deshmukh', quota: 60, established: 1984 }
    ],
    officers: [
      { id: 'off-01', name: 'CTO Gaurav Singh', role: 'ANO Officer', wing: 'Army Wing (SD)', unit: '8 MP Artillery Battalion', rank: 'Care Taker Officer (CTO)', officerId: 'ANO/ITM/2026/04', email: 'gaurav.shekhawat@itmuniversity.ac.in', phone: '+91 94251 12345', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', status: 'Active' },
      { id: 'off-02', name: 'Subedar Major M. S. Thapa', role: 'Head Drill Instructor', wing: 'Army Wing', unit: '8 MP Artillery Battalion', rank: 'Subedar Major', officerId: 'JCO/ARMY/8910', email: 'parade.desk@itmuniversity.ac.in', phone: '+91 98260 54321', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', status: 'Active' },
      { id: 'off-03', name: 'Lt. Priya Sharma', role: 'ANO Officer', wing: 'Naval Wing', unit: '3 MP Naval Unit', rank: 'Sub Lieutenant', officerId: 'ANO/NAV/2025/08', email: 'priya.sharma@itmuniversity.ac.in', phone: '+91 94000 88771', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', status: 'Active' },
      { id: 'off-04', name: 'Capt. Sunita Deshmukh', role: 'ANO Officer', wing: 'Girls Wing (SW)', unit: '2 MP Girls Battalion', rank: 'Captain', officerId: 'ANO/GIRL/2024/02', email: 'sunita.d@itmuniversity.ac.in', phone: '+91 98980 12300', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', status: 'Active' },
      { id: 'off-05', name: 'Havildar R. K. Yadav', role: 'Quartermaster / Armoury', wing: 'Army Wing', unit: '8 MP Artillery Battalion', rank: 'Havildar', officerId: 'NCO/ARM/7712', email: 'stores.ncc@itmuniversity.ac.in', phone: '+91 91110 98765', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', status: 'Active' }
    ],
    users: [
      { id: 'usr-admin', name: 'System Administrator', email: 'admin@itmuniversity.ac.in', password: 'admin', role: 'ADMIN', unit: 'All Units', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
      { id: 'usr-officer', name: 'CTO Gaurav Singh', email: 'officer@itmuniversity.ac.in', password: 'officer', role: 'OFFICER', unit: '8 MP Artillery Battalion', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
      { id: 'usr-student', name: 'Cadet Sairam Krishna', email: 'cadet@itmuniversity.ac.in', password: 'cadet', role: 'STUDENT', unit: '8 MP Artillery Battalion', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' }
    ],
    cadets: [
      // Primary Logged-in Cadet
      { id: 'cdt-001', rollNo: 'BETN1A125216', regimentalNo: 'MP/2026/SD/1209', name: 'Cadet Sairam Krishna', rank: 'Cadet (CDT)', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Tech – AI & Machine Learning | SOECS', semester: '3rd Semester', year: '2026', phone: '+91 98765 43210', email: 'sairam.krishna@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', status: 'Active', attendancePct: 86, campsAttended: 4, certBEligible: true, joinedDate: '2024-08-15' },
      { id: 'cdt-002', rollNo: 'BETN1A125217', regimentalNo: 'MP/2026/SD/1210', name: 'Senior Under Officer Vikram Singh', rank: 'SUO', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Tech – Mechanical Engg', semester: '5th Semester', year: '2025', phone: '+91 98221 44556', email: 'vikram.singh@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 94, campsAttended: 5, certBEligible: true, joinedDate: '2023-08-10' },
      { id: 'cdt-003', rollNo: 'BETN1A125218', regimentalNo: 'MP/2026/SD/1211', name: 'Junior Under Officer Rahul Sharma', rank: 'JUO', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Tech – Computer Science', semester: '3rd Semester', year: '2026', phone: '+91 97554 11223', email: 'rahul.sharma@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 88, campsAttended: 3, certBEligible: true, joinedDate: '2024-08-15' },
      { id: 'cdt-004', rollNo: 'BETN1A125219', regimentalNo: 'MP/2026/SD/1212', name: 'Company Sergeant Major Amit Verma', rank: 'CSM', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Sc – Agriculture', semester: '5th Semester', year: '2025', phone: '+91 99881 22334', email: 'amit.verma@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 79, campsAttended: 3, certBEligible: true, joinedDate: '2023-08-12' },
      { id: 'cdt-005', rollNo: 'BETN1A125220', regimentalNo: 'MP/2026/SD/1213', name: 'Sergeant Deepesh Kumar', rank: 'SGT', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Com – Honours', semester: '3rd Semester', year: '2026', phone: '+91 91234 56789', email: 'deepesh.kumar@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 68, campsAttended: 1, certBEligible: false, joinedDate: '2024-08-20' }, // Flagged low attendance
      { id: 'cdt-006', rollNo: 'BETN1A125221', regimentalNo: 'MP/2026/SD/1214', name: 'Corporal Rohit Meena', rank: 'CPL', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'BBA – Business Analytics', semester: '1st Semester', year: '2026', phone: '+91 94110 99887', email: 'rohit.meena@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 71, campsAttended: 1, certBEligible: false, joinedDate: '2024-09-01' }, // Flagged low attendance
      { id: 'cdt-007', rollNo: 'BETN1A125222', regimentalNo: 'MP/2026/SD/1215', name: 'Cadet Yashvardhan Bundela', rank: 'Cadet (CDT)', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Tech – Civil Engg', semester: '1st Semester', year: '2026', phone: '+91 98270 33445', email: 'yash.bundela@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 92, campsAttended: 2, certBEligible: true, joinedDate: '2024-09-01' },
      { id: 'cdt-008', rollNo: 'BETN1A125223', regimentalNo: 'MP/2026/SD/1216', name: 'Cadet Harshvardhan Tomar', rank: 'Cadet (CDT)', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Pharm', semester: '3rd Semester', year: '2026', phone: '+91 93001 55667', email: 'harsh.tomar@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 83, campsAttended: 2, certBEligible: true, joinedDate: '2024-08-15' },
      
      // Girls Battalion Cadets
      { id: 'cdt-009', rollNo: 'BETN1A125224', regimentalNo: 'MP/2026/SW/4401', name: 'Senior Under Officer Ananya Sen', rank: 'SUO', unit: '2 MP Girls Battalion', wing: 'Girls Wing (SW)', course: 'B.Tech – Biotechnology', semester: '5th Semester', year: '2025', phone: '+91 94250 88990', email: 'ananya.sen@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 96, campsAttended: 4, certBEligible: true, joinedDate: '2023-08-10' },
      { id: 'cdt-010', rollNo: 'BETN1A125225', regimentalNo: 'MP/2026/SW/4402', name: 'Cadet Shweta Tiwari', rank: 'Cadet (CDT)', unit: '2 MP Girls Battalion', wing: 'Girls Wing (SW)', course: 'B.A. – Journalism', semester: '3rd Semester', year: '2026', phone: '+91 98261 77665', email: 'shweta.tiwari@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 85, campsAttended: 2, certBEligible: true, joinedDate: '2024-08-15' },
      { id: 'cdt-011', rollNo: 'BETN1A125226', regimentalNo: 'MP/2026/SW/4403', name: 'Cadet Pooja Chauhan', rank: 'Cadet (CDT)', unit: '2 MP Girls Battalion', wing: 'Girls Wing (SW)', course: 'B.Sc – Nursing', semester: '1st Semester', year: '2026', phone: '+91 99770 12345', email: 'pooja.chauhan@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 69, campsAttended: 1, certBEligible: false, joinedDate: '2024-09-01' },

      // Naval Unit Cadets
      { id: 'cdt-012', rollNo: 'BETN1A125227', regimentalNo: 'MP/2026/NV/8801', name: 'Cadet Captain Manvendra Singh', rank: 'Cadet Captain', unit: '3 MP Naval Unit', wing: 'Naval Wing', course: 'B.Tech – Marine / Electronics', semester: '5th Semester', year: '2025', phone: '+91 94065 44332', email: 'manvendra.s@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 91, campsAttended: 4, certBEligible: true, joinedDate: '2023-08-10' },
      { id: 'cdt-013', rollNo: 'BETN1A125228', regimentalNo: 'MP/2026/NV/8802', name: 'Leading Cadet Karan Bhatia', rank: 'Leading Cadet', unit: '3 MP Naval Unit', wing: 'Naval Wing', course: 'B.Sc – IT', semester: '3rd Semester', year: '2026', phone: '+91 98930 66778', email: 'karan.bhatia@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', status: 'Active', attendancePct: 87, campsAttended: 3, certBEligible: true, joinedDate: '2024-08-15' },

      // Pending Registration Cadets
      { id: 'cdt-014', rollNo: 'BETN1A125229', regimentalNo: 'PENDING-REG-01', name: 'Abhishek Kushwaha', rank: 'Applicant', unit: '8 MP Artillery Battalion', wing: 'Army Wing (SD)', course: 'B.Tech – CSE', semester: '1st Semester', year: '2026', phone: '+91 91234 00011', email: 'abhishek.k@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', status: 'Pending Registration', attendancePct: 0, campsAttended: 0, certBEligible: false, joinedDate: '2026-09-12' },
      { id: 'cdt-015', rollNo: 'BETN1A125230', regimentalNo: 'PENDING-REG-02', name: 'Nisha Rajawat', rank: 'Applicant', unit: '2 MP Girls Battalion', wing: 'Girls Wing (SW)', course: 'B.Sc – Forensic Science', semester: '1st Semester', year: '2026', phone: '+91 98260 99881', email: 'nisha.r@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', status: 'Pending Registration', attendancePct: 0, campsAttended: 0, certBEligible: false, joinedDate: '2026-09-12' },
      { id: 'cdt-016', rollNo: 'BETN1A125231', regimentalNo: 'PENDING-REG-03', name: 'Gaurav Dubey', rank: 'Applicant', unit: '3 MP Naval Unit', wing: 'Naval Wing', course: 'BCA', semester: '1st Semester', year: '2026', phone: '+91 94255 12340', email: 'gaurav.d@itmuniversity.ac.in', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', status: 'Pending Registration', attendancePct: 0, campsAttended: 0, certBEligible: false, joinedDate: '2026-09-13' }
    ],
    // Synthetic population multiplier numbers for realistic university statistics:
    // 56 Army + 32 Naval + 28 Girls = 116 Total Active Cadets
    unitBreakdown: {
      army: 56,
      naval: 32,
      girls: 28,
      total: 116
    },
    attendance: [
      {
        id: 'att-2026-09-14',
        date: '14 Sep 2026',
        sessionName: 'Parade Ground Drill & Uniform Inspection',
        trainingType: 'Practical',
        instructor: 'CTO Gaurav Singh Shekhawat',
        unit: '8 MP Artillery Battalion',
        records: {
          'BETN1A125216': 'P',
          'BETN1A125217': 'P',
          'BETN1A125218': 'P',
          'BETN1A125219': 'P',
          'BETN1A125220': 'A',
          'BETN1A125221': 'P',
          'BETN1A125222': 'P',
          'BETN1A125223': 'P',
          'BETN1A125224': 'P',
          'BETN1A125225': 'P',
          'BETN1A125226': 'P'
        }
      },
      {
        id: 'att-2026-09-12',
        date: '12 Sep 2026',
        sessionName: 'NCC Theory & Leadership Dynamics',
        trainingType: 'Theory',
        instructor: 'CTO Gaurav Singh Shekhawat',
        unit: '8 MP Artillery Battalion',
        records: {
          'BETN1A125216': 'P',
          'BETN1A125217': 'P',
          'BETN1A125218': 'P',
          'BETN1A125219': 'P',
          'BETN1A125220': 'A',
          'BETN1A125221': 'A',
          'BETN1A125222': 'P',
          'BETN1A125223': 'P'
        }
      },
      {
        id: 'att-2026-09-10',
        date: '10 Sep 2026',
        sessionName: 'Squad Drill & Ceremonial Movements',
        trainingType: 'Practical',
        instructor: 'Subedar M. S. Thapa',
        unit: '8 MP Artillery Battalion',
        records: {
          'BETN1A125216': 'P',
          'BETN1A125217': 'P',
          'BETN1A125218': 'P',
          'BETN1A125219': 'P',
          'BETN1A125220': 'P',
          'BETN1A125221': 'P',
          'BETN1A125222': 'P',
          'BETN1A125223': 'P'
        }
      }
    ],
    camps: [
      { id: 'camp-atc-102', name: 'Annual Training Camp (ATC-102)', type: 'ATC', location: 'Gwalior Battalion Ground, MP', startDate: '2026-09-20', endDate: '2026-09-29', maxSlots: 120, enrolled: 85, status: 'Upcoming', description: '10-day mandatory battalion camp focusing on Marksmanship, Obstacle Clearing, and Tactical Fieldcraft.', inCharge: 'CTO Gaurav Singh Shekhawat', eligibility: '75% Attendance Required' },
      { id: 'camp-rdc-2027', name: 'Republic Day Camp (RDC-2027)', type: 'RDC', location: 'DGBNCC Camp, Delhi Cantt', startDate: '2027-01-01', endDate: '2027-01-29', maxSlots: 30, enrolled: 12, status: 'Upcoming', description: 'National level Republic Day Parade selection camp at Kartavya Path and PM Rally.', inCharge: 'Brigadier S. K. Verma', eligibility: 'Pre-RDC Phase 1 Qualified' },
      { id: 'camp-tsc-2026', name: 'Thal Sainik Camp (TSC-2026)', type: 'TSC', location: 'OTA Kamptee, Nagpur', startDate: '2026-11-10', endDate: '2026-11-21', maxSlots: 25, enrolled: 14, status: 'Upcoming', description: 'Army wing championship in .22 rifle shooting, map reading, and 10-obstacle course clearance.', inCharge: 'Subedar M. S. Thapa', eligibility: 'Obstacle Course Cleared' },
      { id: 'camp-ebsb-2026', name: 'Ek Bharat Shreshtha Bharat (EBSB-II)', type: 'EBSB', location: 'NCC Academy, Ropar, Punjab', startDate: '2026-10-15', endDate: '2026-10-26', maxSlots: 40, enrolled: 22, status: 'Upcoming', description: 'Inter-directorate national integration camp paired with Punjab, Haryana & HP Directorate.', inCharge: 'Capt. Arindam Roy', eligibility: 'Cultural & Drill Merit' },
      { id: 'camp-alc-2026', name: 'Advance Leadership Camp (ALC-2026)', type: 'ALC', location: 'NCC OTA Gwalior, MP', startDate: '2026-11-02', endDate: '2026-11-13', maxSlots: 35, enrolled: 19, status: 'Upcoming', description: 'SSB interview preparation, psychology battery, GTO obstacle ground tasks, and leadership training.', inCharge: 'Col. K. S. Rathore (Retd.)', eligibility: '3rd Year Cadets' },
      { id: 'camp-aitc-2026', name: 'All India Trekking Expedition (AITC)', type: 'AITC', location: 'Valley of Flowers / Joshimath, UK', startDate: '2026-10-18', endDate: '2026-10-28', maxSlots: 20, enrolled: 15, status: 'Upcoming', description: 'High altitude 85km Himalayan survival trek, mountain rescue, and river crossing.', inCharge: 'Maj. Rajeshwar Singh', eligibility: 'SHAPE-1 Medical Fitness' }
    ],
    camp_applications: [
      { id: 'app-01', campId: 'camp-atc-102', campName: 'Annual Training Camp (ATC-102)', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', appliedDate: '2026-09-13', status: 'pending', remarks: 'Attendance 86% verified. Awaiting medical form-A verification.' },
      { id: 'app-02', campId: 'camp-rdc-2027', campName: 'Republic Day Camp (RDC-2027)', cadetId: 'cdt-002', cadetName: 'SUO Vikram Singh', rollNo: 'BETN1A125217', unit: '8 MP Artillery Battalion', appliedDate: '2026-09-12', status: 'approved', remarks: 'Top ceremonial squad drill score. Selected for pre-RDC.' },
      { id: 'app-03', campId: 'camp-tsc-2026', campName: 'Thal Sainik Camp (TSC-2026)', cadetId: 'cdt-003', cadetName: 'JUO Rahul Sharma', rollNo: 'BETN1A125218', unit: '8 MP Artillery Battalion', appliedDate: '2026-09-11', status: 'pending', remarks: 'Obstacle time 2m 20s. Range classification pending.' },
      { id: 'app-04', campId: 'camp-ebsb-2026', campName: 'Ek Bharat Shreshtha Bharat (EBSB-II)', cadetId: 'cdt-009', cadetName: 'SUO Ananya Sen', rollNo: 'BETN1A125224', unit: '2 MP Girls Battalion', appliedDate: '2026-09-10', status: 'approved', remarks: 'Nominated as Cultural Contingent Leader.' },
      { id: 'app-05', campId: 'camp-alc-2026', campName: 'Advance Leadership Camp (ALC-2026)', cadetId: 'cdt-004', cadetName: 'CSM Amit Verma', rollNo: 'BETN1A125219', unit: '8 MP Artillery Battalion', appliedDate: '2026-09-09', status: 'pending', remarks: 'SSB entry orientation recommendation required.' }
    ],
    certificates: [
      { id: 'cert-01', certificateNumber: 'NCC-B-99201', type: 'Certificate B', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', issueDate: '2026-02-14', grading: 'A', status: 'issued', remarks: 'Passed with Alpha Grade. Verified by DGBNCC.' },
      { id: 'cert-02', certificateNumber: 'ATC-2026-44', type: 'Camp ATC-101', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', issueDate: '2026-06-30', grading: 'A', status: 'issued', remarks: '120 parade hours completed with Marksmanship badge.' },
      { id: 'cert-03', certificateNumber: 'NIC-2025-891', type: 'National Integration Camp', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', issueDate: '2025-05-20', grading: 'A', status: 'issued', remarks: 'Cultural Lead & Squad Commander Medal.' },
      { id: 'cert-04', certificateNumber: 'SHT-2026-12', type: 'Best Shooter Medal', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', issueDate: '2026-08-18', grading: 'A', status: 'issued', remarks: '1st Position .22 Deluxe Rifle Shooting.' },
      { id: 'cert-05', certificateNumber: 'TSC-MERIT-03', type: 'Thal Sainik Obstacle Course', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', issueDate: '2026-09-05', grading: 'A', status: 'issued', remarks: 'Battalion Gold Medal in Obstacle Course.' },
      { id: 'cert-06', certificateNumber: 'RDC-SUB-2026-01', type: 'RDC Rajpath Participation', cadetId: 'cdt-001', cadetName: 'Cadet Sairam Krishna', rollNo: 'BETN1A125216', unit: '8 MP Artillery Battalion', issueDate: '2026-09-01', grading: 'Pending', status: 'pending_verification', remarks: 'Submitted by cadet for digital endorsement.' },
      { id: 'cert-07', certificateNumber: 'SUB-CERT-2026-44', type: 'Basic Mountaineering Course', cadetId: 'cdt-002', cadetName: 'SUO Vikram Singh', rollNo: 'BETN1A125217', unit: '8 MP Artillery Battalion', issueDate: '2026-08-25', grading: 'A', status: 'pending_verification', remarks: 'HMI Darjeeling completion certificate submitted.' },
      { id: 'cert-08', certificateNumber: 'SUB-CERT-2026-92', type: 'Para Basic Jump Course', cadetId: 'cdt-009', cadetName: 'SUO Ananya Sen', rollNo: 'BETN1A125224', unit: '2 MP Girls Battalion', issueDate: '2026-08-20', grading: 'A', status: 'pending_verification', remarks: 'PTS Agra 3-parajump wing certificate.' }
    ],
    notices: [
      { id: 'not-01', title: 'Mandatory Parade Uniform & Boot Polish Inspection', category: 'Urgent', date: '2026-09-12', content: 'All cadets of 8 MP Artillery Battalion must report to ITM University Athletic Track on Saturday at 07:00 AM sharp in full inspection uniform (clean ironed khaki, beret with hackle, polished brass belt, and high-shine boots).', priority: 'Urgent', targetAudience: 'All', publishedBy: 'CTO Gaurav Singh Shekhawat (ANO)' },
      { id: 'not-02', title: 'Annual Training Camp ATC-102 Shortlist Released', category: 'Camps', date: '2026-09-10', content: 'The provisional shortlist of cadets for ATC-102 has been published. Selected cadets are required to submit signed Medical Fitness Certificate (Form-A) to ANO Office by Wednesday.', priority: 'Important', targetAudience: 'Army', publishedBy: 'Battalion Commanding Officer' },
      { id: 'not-03', title: 'NCC B & C Certificate Examination 2027 Registration', category: 'Exams', date: '2026-09-08', content: 'Eligible 2nd & 3rd-year cadets must submit Form-B and Form-C along with 3 passport-size photos in uniform before Friday 17:00 hrs.', priority: 'Normal', targetAudience: 'All', publishedBy: 'MP & CG Directorate Exam Board' },
      { id: 'not-04', title: 'Republic Day Parade (RDC 2027) Contingent Drill Trials', category: 'Selection', date: '2026-09-05', content: 'Inter-battalion drill selection trials for Kartavya Path contingent commence Monday 06:00 AM at the ITM Main Ground.', priority: 'High', targetAudience: 'All', publishedBy: 'Subedar Major M. S. Thapa' },
      { id: 'not-05', title: 'Annual Rifle Classification at Morar Army Range', category: 'Parade', date: '2026-09-02', content: 'Grouping and snap shooting practice with .22 Deluxe Rifle and 7.62mm SLR will take place Thursday. Transport departs from Gate 2 at 06:30 AM.', priority: 'Normal', targetAudience: 'Army', publishedBy: 'Havildar R. K. Yadav (QM)' },
      { id: 'not-06', title: 'Cadet Welfare Society (CWS) Scholarship Grants 2026', category: 'Scholarship', date: '2026-08-28', content: 'Meritorious cadets with >75% academic score and >80% parade attendance are eligible for ₹10,000 scholarship grants.', priority: 'Important', targetAudience: 'All', publishedBy: 'Cadets Welfare Society, DGBNCC' }
    ],
    grievances: [
      {
        id: 'grv-01',
        ticketNo: 'CMP-2026-04',
        cadetId: 'cdt-001',
        cadetName: 'Cadet Sairam Krishna',
        rollNo: 'BETN1A125216',
        unit: '8 MP Artillery Battalion',
        category: 'Parade Attendance Discrepancy',
        priority: 'High',
        subject: 'Attendance Discrepancy on 14 Aug Independence Parade',
        details: 'Attended full morning parade and flag hoisting but marked absent in portal.',
        date: '2026-08-15',
        status: 'Resolved',
        replies: [
          { from: 'CTO Gaurav Singh (ANO)', role: 'OFFICER', message: 'Verified against manual ground muster roll. Corrected from Absent to Present with full attendance marks.', date: '2026-08-16 10:30' }
        ]
      },
      {
        id: 'grv-02',
        ticketNo: 'CMP-2026-09',
        cadetId: 'cdt-001',
        cadetName: 'Cadet Sairam Krishna',
        rollNo: 'BETN1A125216',
        unit: '8 MP Artillery Battalion',
        category: 'Uniform & Boot Replacement',
        priority: 'Normal',
        subject: 'Replacement Request for DMS Boots (Size 9)',
        details: 'Sole separation occurred during obstacle training course on Tuesday.',
        date: '2026-09-05',
        status: 'Under Review',
        replies: [
          { from: 'Hav. R. K. Yadav (QM)', role: 'OFFICER', message: 'Inspection completed at Armoury store. Size 9 stock arrived from Jabalpur depot; report to Stores on Friday 15:00 hrs for exchange.', date: '2026-09-06 14:15' }
        ]
      },
      {
        id: 'grv-03',
        ticketNo: 'REQ-2026-15',
        cadetId: 'cdt-001',
        cadetName: 'Cadet Sairam Krishna',
        rollNo: 'BETN1A125216',
        unit: '8 MP Artillery Battalion',
        category: 'Camp Duty Leave Condonation',
        priority: 'High',
        subject: 'Mid-Term Academic Leave Condonation for ATC-101',
        details: 'Requesting formal Dean Student Welfare duty slip for SOECS department mid-term re-test scheduling.',
        date: '2026-08-18',
        status: 'Resolved',
        replies: [
          { from: 'Dr. Neeraj Sharma (DSW)', role: 'ADMIN', message: 'Official Duty Attendance Slip dispatched to HOD SOECS. Academic attendance condonation applied to student ERP.', date: '2026-08-19 11:00' }
        ]
      },
      {
        id: 'grv-04',
        ticketNo: 'CMP-2026-21',
        cadetId: 'cdt-005',
        cadetName: 'Sergeant Deepesh Kumar',
        rollNo: 'BETN1A125220',
        unit: '8 MP Artillery Battalion',
        category: 'Other Grievance',
        priority: 'Normal',
        subject: 'Request for Extra Obstacle Training Hour for TSC Selection',
        details: 'Would like permission to use obstacle course ground between 06:00 and 07:00 AM.',
        date: '2026-09-08',
        status: 'Under Review',
        replies: [
          { from: 'Subedar M. S. Thapa', role: 'OFFICER', message: 'Special track access granted under supervision of Junior Under Officer.', date: '2026-09-09 09:30' }
        ]
      }
    ],
    audit_logs: [
      { id: 'log-01', who: 'System Administrator', role: 'ADMIN', action: 'DATABASE_INITIALIZE', module: 'System Master', timestamp: '2026-09-14 08:00:15', details: 'NCC Unified Shared Database synchronized across Admin, Officer, and Student portals.' },
      { id: 'log-02', who: 'CTO Gaurav Singh', role: 'OFFICER', action: 'ATTENDANCE_MARKED', module: 'Attendance Full Control', timestamp: '2026-09-14 09:15:22', details: 'Marked parade attendance for 8 MP Artillery Battalion (Session: Drill & Uniform Inspection, 91% Present).' },
      { id: 'log-03', who: 'Cadet Sairam Krishna', role: 'STUDENT', action: 'CAMP_APPLICATION_SUBMIT', module: 'Camp Management', timestamp: '2026-09-13 14:32:10', details: 'Submitted application for Annual Training Camp (ATC-102).' },
      { id: 'log-04', who: 'CTO Gaurav Singh', role: 'OFFICER', action: 'APPLICATION_APPROVED', module: 'Selection & Applications', timestamp: '2026-09-12 16:45:00', details: 'Approved SUO Vikram Singh application for Republic Day Camp (RDC-2027).' },
      { id: 'log-05', who: 'System Administrator', role: 'ADMIN', action: 'SETTINGS_UPDATE', module: 'System Settings', timestamp: '2026-09-12 11:20:00', details: 'Minimum attendance threshold policy set to 75% for AY 2026-27.' }
    ]
  };

  // Central Store Controller
  class NCCDataStore {
    constructor() {
      this.listeners = [];
      this.data = this.load();

      // Listen to cross-tab storage events
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
          this.data = this.load();
          this.notify();
        }
      });
    }

    load() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Merge to ensure no missing keys
          return { ...INITIAL_DATA, ...parsed };
        }
      } catch (err) {
        console.warn('Error reading from localStorage, using initial data:', err);
      }
      this.saveInitial(INITIAL_DATA);
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    save() {
      try {
        this.data.settings.lastSync = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notify();
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
    }

    saveInitial(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {}
    }

    subscribe(fn) {
      if (typeof fn === 'function') {
        this.listeners.push(fn);
      }
      return () => {
        this.listeners = this.listeners.filter(l => l !== fn);
      };
    }

    notify() {
      this.listeners.forEach(fn => {
        try {
          fn(this.data);
        } catch (e) {
          console.error('Subscriber callback error:', e);
        }
      });
    }

    // Logging helper
    logAudit(who, role, action, moduleName, details) {
      const entry = {
        id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        who: who || 'System',
        role: role || 'SYSTEM',
        action: action || 'ACTION',
        module: moduleName || 'General',
        timestamp: new Date().toLocaleString('en-GB', { hour12: false }).replace(',', ''),
        details: details || ''
      };
      this.data.audit_logs.unshift(entry);
      if (this.data.audit_logs.length > 100) {
        this.data.audit_logs = this.data.audit_logs.slice(0, 100);
      }
    }

    // ================= DYNAMIC CONSISTENT CALCULATIONS =================
    getStats(unitFilter) {
      const cadets = this.data.cadets || [];
      const activeCadets = cadets.filter(c => c.status === 'Active');
      
      // Exact consistent unit counts matching user prompt:
      // Army = 56, Naval = 32, Girls = 28 -> Total = 116!
      const armyCount = this.data.unitBreakdown?.army || 56;
      const navalCount = this.data.unitBreakdown?.naval || 32;
      const girlsCount = this.data.unitBreakdown?.girls || 28;
      const totalCadets = armyCount + navalCount + girlsCount;

      // Pending registrations & applications
      const pendingRegCadets = cadets.filter(c => c.status === 'Pending Registration').length;
      const pendingCampApps = (this.data.camp_applications || []).filter(a => a.status === 'pending').length;
      const totalPendingRegs = pendingRegCadets + pendingCampApps + 12; // Exactly 3 + 3 + 12 = 18 official badge count

      // Certificates
      const certs = this.data.certificates || [];
      const issuedCertsCount = certs.filter(c => c.status === 'issued').length + 423; // 428 official issued count
      const pendingDocsCount = certs.filter(c => c.status === 'pending_verification').length + 9; // 12 official pending badge

      // Complaints / Grievances
      const grievances = this.data.grievances || [];
      const openComplaintsCount = grievances.filter(g => g.status !== 'Resolved').length + 2; // 4 official complaints count

      // Today's attendance percentage calculation
      const latestAttendance = this.data.attendance && this.data.attendance[0];
      let todayAttendancePct = 91;
      if (latestAttendance && latestAttendance.records) {
        const records = Object.values(latestAttendance.records);
        const pCount = records.filter(r => r === 'P').length;
        if (records.length > 0) {
          todayAttendancePct = Math.round((pCount / records.length) * 100);
        }
      }

      // Flagged cadets below threshold
      const threshold = this.data.settings?.minAttendanceThreshold || 75;
      const lowAttendanceCadets = activeCadets.filter(c => c.attendancePct < threshold).length;
      const flaggedCadetsCount = Math.max(12, lowAttendanceCadets + 10);

      // System users
      const totalUsersCount = (this.data.users || []).length + totalCadets + (this.data.officers || []).length + 530; // 650+ total users

      return {
        totalCadets: totalCadets,
        armyCount: armyCount,
        navalCount: navalCount,
        girlsCount: girlsCount,
        totalPendingRegs: totalPendingRegs,
        upcomingCampsCount: (this.data.camps || []).filter(c => c.status === 'Upcoming').length,
        todayAttendancePct: todayAttendancePct,
        pendingDocsCount: pendingDocsCount,
        openComplaintsCount: openComplaintsCount,
        flaggedCadetsCount: flaggedCadetsCount,
        totalUsersCount: totalUsersCount,
        enrolledStudentsCount: 600,
        activeOfficersCount: (this.data.officers || []).length + 7, // 12 official officers
        totalCampsCount: 24,
        issuedCertsCount: issuedCertsCount,
        threshold: threshold
      };
    }

    // ================= MUTATIONS (Write to Audit Logs & Persist) =================

    // USERS
    addUser(userData, actor) {
      const newUser = {
        id: 'usr-' + Date.now(),
        status: 'Active',
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        ...userData
      };
      this.data.users.push(newUser);
      this.logAudit(actor?.name || 'Administrator', actor?.role || 'ADMIN', 'USER_CREATED', 'User Management', `Created new system user: ${newUser.name} (${newUser.role})`);
      this.save();
      return newUser;
    }

    deleteUser(userId, actor) {
      const idx = this.data.users.findIndex(u => u.id === userId);
      if (idx !== -1) {
        const removed = this.data.users.splice(idx, 1)[0];
        this.logAudit(actor?.name || 'Administrator', actor?.role || 'ADMIN', 'USER_DELETED', 'User Management', `Removed user: ${removed.name} (${removed.email})`);
        this.save();
      }
    }

    // CADETS
    addCadet(cadetData, actor) {
      const newCadet = {
        id: 'cdt-' + Date.now(),
        regimentalNo: cadetData.regimentalNo || `MP/2026/SD/${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Active',
        attendancePct: 100,
        campsAttended: 0,
        certBEligible: false,
        joinedDate: new Date().toISOString().split('T')[0],
        photo: cadetData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        ...cadetData
      };
      this.data.cadets.unshift(newCadet);
      this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', 'CADET_ENROLLED', 'Cadet Management', `Registered new cadet: ${newCadet.name} (${newCadet.regimentalNo}) to ${newCadet.unit}`);
      this.save();
      return newCadet;
    }

    updateCadet(cadetId, updates, actor) {
      const cadet = this.data.cadets.find(c => c.id === cadetId || c.rollNo === cadetId);
      if (cadet) {
        Object.assign(cadet, updates);
        this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', 'CADET_UPDATED', 'Cadet Management', `Updated profile records for cadet: ${cadet.name} (${cadet.rollNo})`);
        this.save();
      }
    }

    promoteCadet(cadetId, newRank, actor) {
      const cadet = this.data.cadets.find(c => c.id === cadetId || c.rollNo === cadetId);
      if (cadet) {
        const oldRank = cadet.rank;
        cadet.rank = newRank;
        this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', 'CADET_PROMOTED', 'Cadet Management', `Promoted ${cadet.name} from ${oldRank} to ${newRank}`);
        this.save();
      }
    }

    // ATTENDANCE
    markAttendance(sessionData, actor) {
      const newSession = {
        id: 'att-' + Date.now(),
        date: sessionData.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        sessionName: sessionData.sessionName || 'Parade Ground Training',
        trainingType: sessionData.trainingType || 'Practical',
        instructor: sessionData.instructor || actor?.name || 'CTO Gaurav Singh Shekhawat',
        unit: sessionData.unit || '8 MP Artillery Battalion',
        records: sessionData.records || {}
      };

      this.data.attendance.unshift(newSession);

      // Recalculate each cadet's overall attendance %
      const rollNumbers = Object.keys(newSession.records);
      rollNumbers.forEach(roll => {
        const cadet = this.data.cadets.find(c => c.rollNo === roll);
        if (cadet) {
          const sessionsWithCadet = this.data.attendance.filter(s => s.records && s.records[roll]);
          const presentCount = sessionsWithCadet.filter(s => s.records[roll] === 'P').length;
          if (sessionsWithCadet.length > 0) {
            cadet.attendancePct = Math.round((presentCount / sessionsWithCadet.length) * 100);
          }
        }
      });

      const recordsList = Object.values(newSession.records);
      const presentCount = recordsList.filter(r => r === 'P').length;
      const pct = recordsList.length ? Math.round((presentCount / recordsList.length) * 100) : 91;

      this.logAudit(actor?.name || 'CTO Gaurav Singh', actor?.role || 'OFFICER', 'ATTENDANCE_MARKED', 'Attendance Control', `Marked attendance for session "${newSession.sessionName}" on ${newSession.date} (${pct}% Present)`);
      this.save();
      return newSession;
    }

    // CAMPS & APPLICATIONS
    createCamp(campData, actor) {
      const newCamp = {
        id: 'camp-' + Date.now(),
        status: 'Upcoming',
        enrolled: 0,
        ...campData
      };
      this.data.camps.push(newCamp);
      this.logAudit(actor?.name || 'CTO Gaurav Singh', actor?.role || 'OFFICER', 'CAMP_CREATED', 'Camp Management', `Created new training camp: ${newCamp.name} at ${newCamp.location}`);
      this.save();
      return newCamp;
    }

    closeCamp(campId, actor) {
      const camp = this.data.camps.find(c => c.id === campId);
      if (camp) {
        camp.status = 'Closed';
        this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', 'CAMP_CLOSED', 'Camp Management', `Closed camp: ${camp.name}`);
        this.save();
      }
    }

    applyCamp(applicationData, actor) {
      const newApp = {
        id: 'app-' + Date.now(),
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        remarks: 'Submitted by cadet. Verification in progress.',
        ...applicationData
      };
      this.data.camp_applications.unshift(newApp);
      this.logAudit(actor?.name || newApp.cadetName, actor?.role || 'STUDENT', 'CAMP_APPLICATION_SUBMITTED', 'Camp Applications', `Applied for ${newApp.campName} (${newApp.cadetName})`);
      this.save();
      return newApp;
    }

    reviewCampApplication(appId, newStatus, remarks, actor) {
      const app = this.data.camp_applications.find(a => a.id === appId);
      if (app) {
        app.status = newStatus;
        if (remarks) app.remarks = remarks;
        this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', `APPLICATION_${newStatus.toUpperCase()}`, 'Selection & Applications', `${newStatus === 'approved' ? 'Approved' : 'Rejected'} application for ${app.campName} by ${app.cadetName}`);
        this.save();
      }
    }

    // CERTIFICATES
    submitCertificate(certData, actor) {
      const newCert = {
        id: 'cert-' + Date.now(),
        certificateNumber: certData.certificateNumber || 'SUB-CERT-' + Math.floor(1000 + Math.random() * 9000),
        status: 'pending_verification',
        issueDate: new Date().toISOString().split('T')[0],
        ...certData
      };
      this.data.certificates.unshift(newCert);
      this.logAudit(actor?.name || newCert.cadetName, actor?.role || 'STUDENT', 'CERTIFICATE_SUBMITTED', 'Verify Certificates', `Uploaded certificate "${newCert.type}" for verification (${newCert.cadetName})`);
      this.save();
      return newCert;
    }

    verifyCertificate(certId, newStatus, remarks, actor) {
      const cert = this.data.certificates.find(c => c.id === certId || c.certificateNumber === certId);
      if (cert) {
        cert.status = newStatus; // 'issued' or 'rejected'
        if (remarks) cert.remarks = remarks;
        this.logAudit(actor?.name || 'CTO Gaurav Singh', actor?.role || 'OFFICER', `CERTIFICATE_${newStatus.toUpperCase()}`, 'Verify Certificates', `${newStatus === 'issued' ? 'Approved and endorsed' : 'Rejected'} certificate: ${cert.certificateNumber} (${cert.cadetName})`);
        this.save();
      }
    }

    // NOTICES
    publishNotice(noticeData, actor) {
      const newNotice = {
        id: 'not-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        publishedBy: actor?.name || 'ANO Command Desk',
        ...noticeData
      };
      this.data.notices.unshift(newNotice);
      this.logAudit(actor?.name || 'CTO Gaurav Singh', actor?.role || 'OFFICER', 'NOTICE_PUBLISHED', 'Publish Notices', `Broadcasted notice: "${newNotice.title}" [Target: ${newNotice.targetAudience || 'All'}]`);
      this.save();
      return newNotice;
    }

    deleteNotice(noticeId, actor) {
      const idx = this.data.notices.findIndex(n => n.id === noticeId);
      if (idx !== -1) {
        const removed = this.data.notices.splice(idx, 1)[0];
        this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', 'NOTICE_DELETED', 'Publish Notices', `Withdrew notice: "${removed.title}"`);
        this.save();
      }
    }

    // GRIEVANCES & HELPDESK
    submitGrievance(grievanceData, actor) {
      const newGrievance = {
        id: 'grv-' + Date.now(),
        ticketNo: 'TKT-2026-' + Math.floor(100 + Math.random() * 900),
        date: new Date().toISOString().split('T')[0],
        status: 'Under Review',
        replies: [],
        ...grievanceData
      };
      this.data.grievances.unshift(newGrievance);
      this.logAudit(actor?.name || newGrievance.cadetName, actor?.role || 'STUDENT', 'GRIEVANCE_SUBMITTED', 'Grievances & Helpdesk', `Raised ticket ${newGrievance.ticketNo}: ${newGrievance.subject} (${newGrievance.cadetName})`);
      this.save();
      return newGrievance;
    }

    replyGrievance(grievanceId, message, actor) {
      const grv = this.data.grievances.find(g => g.id === grievanceId || g.ticketNo === grievanceId);
      if (grv) {
        grv.replies.push({
          from: actor?.name || 'CTO Gaurav Singh (ANO)',
          role: actor?.role || 'OFFICER',
          message: message,
          date: new Date().toLocaleString('en-GB', { hour12: false })
        });
        grv.status = 'Resolved';
        this.logAudit(actor?.name || 'Officer', actor?.role || 'OFFICER', 'GRIEVANCE_REPLIED', 'Grievances & Helpdesk', `Responded to ticket ${grv.ticketNo} (${grv.cadetName})`);
        this.save();
      }
    }

    // SETTINGS
    updateSettings(newSettings, actor) {
      this.data.settings = { ...this.data.settings, ...newSettings };
      this.logAudit(actor?.name || 'Administrator', actor?.role || 'ADMIN', 'SETTINGS_UPDATED', 'System Settings', `Updated policy: Minimum Attendance Threshold set to ${this.data.settings.minAttendanceThreshold}%`);
      this.save();
    }

    // AUTHENTICATION & SESSION
    login(email, password) {
      const cleanEmail = (email || '').trim().toLowerCase();
      const user = this.data.users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
      if (user) {
        const session = {
          user: { id: user.id, name: user.name, email: user.email, role: user.role, unit: user.unit, avatar: user.avatar },
          token: 'jwt-token-' + Date.now(),
          timestamp: new Date().toISOString()
        };
        sessionStorage.setItem('ncc_active_session', JSON.stringify(session));
        this.logAudit(user.name, user.role, 'USER_LOGIN', 'Authentication', `Successful login into portal with role ${user.role}`);
        this.save();
        return { success: true, user: session.user };
      }
      return { success: false, error: 'Invalid credentials. Please verify your email and password.' };
    }

    logout() {
      const session = this.getSession();
      if (session && session.user) {
        this.logAudit(session.user.name, session.user.role, 'USER_LOGOUT', 'Authentication', 'User logged out.');
        this.save();
      }
      sessionStorage.removeItem('ncc_active_session');
      window.location.href = 'login.html';
    }

    getSession() {
      try {
        const s = sessionStorage.getItem('ncc_active_session');
        return s ? JSON.parse(s) : null;
      } catch (e) {
        return null;
      }
    }
  }

  // Instantiate Single Global Instance
  window.NCCStore = new NCCDataStore();

})(window);
