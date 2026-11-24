-- ============================================================================
-- ITM UNIVERSITY GWALIOR - NCC MANAGEMENT SYSTEM
-- REALISTIC & CONSISTENT SEED DATASET (seed.sql)
-- Default Demo Password for all accounts: Password@123
-- Bcrypt Hash: $2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy
-- ============================================================================

USE NCC_MANAGEMENT;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE role_permissions;
TRUNCATE TABLE settings;
TRUNCATE TABLE audit_logs;
TRUNCATE TABLE grievances;
TRUNCATE TABLE announcements;
TRUNCATE TABLE fee_payments;
TRUNCATE TABLE certificates;
TRUNCATE TABLE cadet_attendance;
TRUNCATE TABLE cadet_enrollment;
TRUNCATE TABLE camp_applications;
TRUNCATE TABLE attendances;
TRUNCATE TABLE events;
TRUNCATE TABLE cadets;
TRUNCATE TABLE officers;
TRUNCATE TABLE units;
TRUNCATE TABLE admins;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. USERS (Admin, 3 Officers, 24 Cadets = 28 Total Users)
-- ----------------------------------------------------------------------------
INSERT INTO users (user_id, full_name, email, mobile, password_hash, role, profile_photo) VALUES
-- 1. System Admin
(1, 'System Administrator', 'admin@itmuniversity.ac.in', '+91 94251 00001', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'),

-- 2. Officers
(2, 'CTO Gaurav Singh', 'gaurav.singh@itmuniversity.ac.in', '+91 94251 12345', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'OFFICER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'),
(3, 'Capt. Sunita Deshmukh', 'sunita.d@itmuniversity.ac.in', '+91 98980 12300', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'OFFICER', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'),
(4, 'Lt. Priya Sharma', 'priya.sharma@itmuniversity.ac.in', '+91 94000 88771', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'OFFICER', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'),

-- 3. Cadets for Unit 2: 8 MP Girls and Boys (12 Cadets)
(5, 'Cadet Sairam Krishna', 'cadet@itmuniversity.ac.in', '+91 98765 43210', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
(6, 'SUO Vikram Singh', 'vikram.singh@itmuniversity.ac.in', '+91 98221 44556', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'),
(7, 'UO Rahul Sharma', 'rahul.sharma@itmuniversity.ac.in', '+91 97554 11223', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'),
(8, 'CSM Amit Verma', 'amit.verma@itmuniversity.ac.in', '+91 99881 22334', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'),
(9, 'Sergeant Deepesh Kumar', 'deepesh.kumar@itmuniversity.ac.in', '+91 91234 56789', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'),
(10, 'CPL Rohit Meena', 'rohit.meena@itmuniversity.ac.in', '+91 94110 99887', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'),
(11, 'Cadet Yashvardhan Bundela', 'yash.bundela@itmuniversity.ac.in', '+91 98270 33445', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'),
(12, 'Cadet Harshvardhan Tomar', 'harsh.tomar@itmuniversity.ac.in', '+91 93001 55667', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'),
(13, 'LCPL Aman Saxena', 'aman.saxena@itmuniversity.ac.in', '+91 94251 99112', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'),
(14, 'Cadet Divyansh Bhadoriya', 'divyansh.b@itmuniversity.ac.in', '+91 98260 11998', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'),
(15, 'Cadet Abhishek Kushwaha', 'abhishek.k@itmuniversity.ac.in', '+91 91234 00011', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'),
(16, 'Cadet Mayank Rajput', 'mayank.r@itmuniversity.ac.in', '+91 94258 77661', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'),

-- 4. Cadets for Unit 1: 3 MP Girls Unit (6 Cadets)
(17, 'CQSM Ananya Sen', 'ananya.sen@itmuniversity.ac.in', '+91 94250 88990', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'),
(18, 'LCPL Shweta Tiwari', 'shweta.tiwari@itmuniversity.ac.in', '+91 98261 77665', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
(19, 'Cadet Pooja Chauhan', 'pooja.chauhan@itmuniversity.ac.in', '+91 99770 12345', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'),
(20, 'Cadet Nisha Rajawat', 'nisha.r@itmuniversity.ac.in', '+91 98260 99881', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
(21, 'Cadet Riya Tomar', 'riya.tomar@itmuniversity.ac.in', '+91 98265 44110', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'),
(22, 'Cadet Neha Gautam', 'neha.gautam@itmuniversity.ac.in', '+91 94251 33221', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'),

-- 5. Cadets for Unit 3: 3 MP Naval (6 Cadets)
(23, 'Sergeant Manvendra Singh', 'manvendra.s@itmuniversity.ac.in', '+91 94065 44332', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'),
(24, 'CPL Karan Bhatia', 'karan.bhatia@itmuniversity.ac.in', '+91 98930 66778', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'),
(25, 'Cadet Gaurav Dubey', 'gaurav.d@itmuniversity.ac.in', '+91 94255 12340', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'),
(26, 'Cadet Aditya Rao', 'aditya.rao@itmuniversity.ac.in', '+91 98270 55443', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'),
(27, 'Cadet Sameer Khan', 'sameer.k@itmuniversity.ac.in', '+91 93000 88991', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'),
(28, 'Cadet Vivek Joshi', 'vivek.j@itmuniversity.ac.in', '+91 94071 22334', '$2b$10$fgMKLB8jhBggZqr/TyrLk.DUyxIvQmDRkyJ4rfWi/xBeLZnNL9tfy', 'CADET', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80');

-- ----------------------------------------------------------------------------
-- 2. ADMINS
-- ----------------------------------------------------------------------------
INSERT INTO admins (admin_id, user_id, role) VALUES
(1, 1, 'SUPER_ADMIN');

-- ----------------------------------------------------------------------------
-- 3. UNITS (Consistent 3 NCC Battalions)
-- ----------------------------------------------------------------------------
INSERT INTO units (unit_id, commanding_officer_id, name, location, established_year, quota) VALUES
(1, NULL, '3 MP Girls Unit', 'ITM Girls Wing Compound', 1984, 80),
(2, NULL, '8 MP Girls and Boys', 'ITM Main Ground & Artillery Depot', 1965, 120),
(3, NULL, '3 MP Naval', 'Gwalior Fort Depot / Watersports Base', 1978, 60);

-- ----------------------------------------------------------------------------
-- 4. OFFICERS
-- ----------------------------------------------------------------------------
INSERT INTO officers (officer_id, user_id, unit_id, rank_name, officer_code, commissioned_at) VALUES
(1, 2, 2, 'CTO', 'ANO/ITM/2026/04', '2020-06-15'),
(2, 3, 1, 'ANO', 'ANO/GIRL/2024/02', '2019-08-20'),
(3, 4, 3, 'ANO', 'ANO/NAV/2025/08', '2023-01-10');

-- Assign Commanding Officers to Units
UPDATE units SET commanding_officer_id = 2 WHERE unit_id = 1;
UPDATE units SET commanding_officer_id = 1 WHERE unit_id = 2;
UPDATE units SET commanding_officer_id = 3 WHERE unit_id = 3;

-- ----------------------------------------------------------------------------
-- 5. CADETS (Exact 24 Cadets: 12 in Unit 2, 6 in Unit 1, 6 in Unit 3)
-- ----------------------------------------------------------------------------
INSERT INTO cadets (cadet_id, user_id, unit_id, regimental_no, roll_number, rank_name, course, semester, enlisted_at) VALUES
-- Unit 2: 8 MP Girls and Boys (12 Cadets)
(1, 5, 2, 'MP/2026/SD/1209', 'BETN1A125216', 'Cadet', 'B.Tech AI & ML', '3rd Semester', '2024-08-10'),
(2, 6, 2, 'MP/2026/SD/1210', 'BETN1A125217', 'SUO', 'B.Tech Mechanical', '5th Semester', '2024-08-10'),
(3, 7, 2, 'MP/2026/SD/1211', 'BETN1A125218', 'UO', 'B.Tech CSE Core', '3rd Semester', '2024-08-10'),
(4, 8, 2, 'MP/2026/SD/1212', 'BETN1A125219', 'CSM', 'B.Tech Civil', '5th Semester', '2024-08-12'),
(5, 9, 2, 'MP/2026/SD/1213', 'BETN1A125220', 'Sergeant', 'B.Sc Agriculture', '3rd Semester', '2024-08-15'),
(6, 10, 2, 'MP/2026/SD/1214', 'BETN1A125221', 'CPL', 'BBA Analytics', '1st Semester', '2025-08-05'),
(7, 11, 2, 'MP/2026/SD/1215', 'BETN1A125222', 'Cadet', 'B.Tech Electrical', '1st Semester', '2025-08-05'),
(8, 12, 2, 'MP/2026/SD/1216', 'BETN1A125223', 'Cadet', 'B.Pharm', '3rd Semester', '2024-08-20'),
(9, 13, 2, 'MP/2026/SD/1217', 'BETN1A125224', 'LCPL', 'B.Tech Biotechnology', '3rd Semester', '2024-08-20'),
(10, 14, 2, 'MP/2026/SD/1218', 'BETN1A125225', 'Cadet', 'BCA', '1st Semester', '2025-08-10'),
(11, 15, 2, 'MP/2026/SD/1219', 'BETN1A125226', 'Cadet', 'B.Sc IT', '1st Semester', '2025-08-10'),
(12, 16, 2, 'MP/2026/SD/1220', 'BETN1A125227', 'Cadet', 'B.Tech CSE (DS)', '1st Semester', '2025-08-10'),

-- Unit 1: 3 MP Girls Unit (6 Cadets)
(13, 17, 1, 'MP/2026/SW/4401', 'BETN1A125228', 'CQSM', 'B.Tech CSE', '5th Semester', '2024-08-12'),
(14, 18, 1, 'MP/2026/SW/4402', 'BETN1A125229', 'LCPL', 'B.A. Journalism', '3rd Semester', '2024-08-12'),
(15, 19, 1, 'MP/2026/SW/4403', 'BETN1A125230', 'Cadet', 'B.Sc Nursing', '1st Semester', '2025-08-05'),
(16, 20, 1, 'MP/2026/SW/4404', 'BETN1A125231', 'Cadet', 'B.Com Honours', '1st Semester', '2025-08-05'),
(17, 21, 1, 'MP/2026/SW/4405', 'BETN1A125232', 'Cadet', 'B.Sc Forensic', '3rd Semester', '2024-08-20'),
(18, 22, 1, 'MP/2026/SW/4406', 'BETN1A125233', 'Cadet', 'B.Ed', '1st Semester', '2025-08-10'),

-- Unit 3: 3 MP Naval (6 Cadets)
(19, 23, 3, 'MP/2026/NV/8801', 'BETN1A125234', 'Sergeant', 'B.Tech Marine', '5th Semester', '2024-08-15'),
(20, 24, 3, 'MP/2026/NV/8802', 'BETN1A125235', 'CPL', 'B.Sc Nautical', '3rd Semester', '2024-08-15'),
(21, 25, 3, 'MP/2026/NV/8803', 'BETN1A125236', 'Cadet', 'BCA Marine', '1st Semester', '2025-08-05'),
(22, 26, 3, 'MP/2026/NV/8804', 'BETN1A125237', 'Cadet', 'B.Tech Mechanical', '1st Semester', '2025-08-05'),
(23, 27, 3, 'MP/2026/NV/8805', 'BETN1A125238', 'Cadet', 'B.Sc Physics', '3rd Semester', '2024-08-20'),
(24, 28, 3, 'MP/2026/NV/8806', 'BETN1A125239', 'Cadet', 'B.Tech Civil', '1st Semester', '2025-08-10');

-- ----------------------------------------------------------------------------
-- 6. CADET_ENROLLMENT
-- ----------------------------------------------------------------------------
INSERT INTO cadet_enrollment (enrollment_id, cadet_id, unit_id, is_a_cert_holder, college_dept, status, reviewed_by, reviewed_at, remarks) VALUES
(1, 1, 2, 'Yes', 'CSE (AI & ML)', 'APPROVED', 1, '2024-08-10 10:30:00', 'Enrolled in 8 MP Girls & Boys Artillery Unit'),
(2, 2, 2, 'Yes', 'Mechanical Engineering', 'APPROVED', 1, '2024-08-10 10:45:00', 'Drill and marksmanship approved'),
(3, 3, 2, 'Yes', 'CSE Core', 'APPROVED', 1, '2024-08-10 11:00:00', 'Approved for junior cadet rank'),
(4, 4, 2, 'Yes', 'Civil Engineering', 'APPROVED', 1, '2024-08-12 11:30:00', 'Physical stamina test cleared'),
(5, 5, 2, 'No', 'B.Sc Agriculture', 'APPROVED', 1, '2024-08-15 10:00:00', 'Regular cadet batch'),
(6, 6, 2, 'No', 'BBA Analytics', 'APPROVED', 1, '2025-08-05 11:00:00', 'First year enrollment complete'),
(7, 7, 2, 'No', 'Electrical Engineering', 'APPROVED', 1, '2025-08-05 11:30:00', 'Medical fitness form-A verified'),
(8, 8, 2, 'No', 'B.Pharm', 'APPROVED', 1, '2024-08-20 12:00:00', 'Approved on university merit'),
(9, 9, 2, 'Yes', 'Biotechnology', 'APPROVED', 1, '2024-08-20 12:30:00', 'Cultural contingent lead'),
(10, 10, 2, 'No', 'BCA', 'PENDING', NULL, NULL, 'Awaiting physical measurement verification'),
(11, 11, 2, 'No', 'B.Sc IT', 'PENDING', NULL, NULL, 'Pending photo verification'),
(12, 12, 2, 'No', 'CSE (Data Science)', 'PENDING', NULL, NULL, 'Awaiting final approval'),

(13, 13, 1, 'Yes', 'CSE', 'APPROVED', 2, '2024-08-12 11:15:00', 'Girls battalion senior appointment'),
(14, 14, 1, 'No', 'Journalism', 'APPROVED', 2, '2024-08-12 11:45:00', 'Approved for SW division'),
(15, 15, 1, 'No', 'Nursing', 'APPROVED', 2, '2025-08-05 10:45:00', 'First aid contingent assigned'),
(16, 16, 1, 'No', 'B.Com Honours', 'APPROVED', 2, '2025-08-05 11:15:00', 'Quartermaster register cleared'),
(17, 17, 1, 'No', 'Forensic Science', 'APPROVED', 2, '2024-08-20 12:15:00', 'Map reading merit selection'),
(18, 18, 1, 'No', 'B.Ed', 'PENDING', NULL, NULL, 'Documents verification in progress'),

(19, 19, 3, 'No', 'Marine Engg', 'APPROVED', 3, '2024-08-15 09:55:00', 'Swimming category A cleared'),
(20, 20, 3, 'No', 'Nautical Science', 'APPROVED', 3, '2024-08-15 10:15:00', 'Semaphore and boat pulling qualified'),
(21, 21, 3, 'No', 'BCA Marine', 'APPROVED', 3, '2025-08-05 11:20:00', 'Naval wing junior enrolled'),
(22, 22, 3, 'No', 'Mechanical Engg', 'APPROVED', 3, '2025-08-05 11:40:00', 'Ship modeling selection trial passed'),
(23, 23, 3, 'No', 'Physics', 'APPROVED', 3, '2024-08-20 12:45:00', 'Naval signalling specialist'),
(24, 24, 3, 'No', 'Civil Engg', 'PENDING', NULL, NULL, 'Swimming trial certificate pending');

-- ----------------------------------------------------------------------------
-- 7. EVENTS (Parades, Camps, Competitions)
-- ----------------------------------------------------------------------------
INSERT INTO events (event_id, unit_id, title, event_type, location, starts_at, ends_at, max_slots, status, created_by) VALUES
(1, 2, 'Wednesday Regular Parade & Drill', 'PARADE', 'ITM University Main Parade Track', '2026-11-18 07:00:00', '2026-11-18 09:30:00', 120, 'COMPLETED', 1),
(2, 2, 'Annual Training Camp (ATC-102)', 'ATC', 'Gwalior Battalion Ground, MP', '2026-12-10 06:00:00', '2026-12-19 18:00:00', 80, 'OPEN', 1),
(3, 2, 'Republic Day Camp (RDC-2027) Trials', 'RDC', 'DGBNCC Camp, Delhi Cantt', '2027-01-01 06:00:00', '2027-01-29 18:00:00', 25, 'OPEN', 1),
(4, 2, 'Thal Sainik Camp (TSC-2026)', 'TSC', 'OTA Kamptee, Nagpur', '2026-12-05 06:00:00', '2026-12-16 18:00:00', 20, 'OPEN', 1),
(5, 1, 'Girls Self-Defence & Map Reading Workshop', 'TRAINING', 'ITM Girls Wing Compound', '2026-11-25 15:00:00', '2026-11-25 17:30:00', 60, 'OPEN', 2),
(6, 3, 'Naval Boat Pulling & Semaphore Camp', 'TRAINING', 'Tighra Dam Watersports Depot', '2026-12-01 08:00:00', '2026-12-05 17:00:00', 30, 'OPEN', 3);

-- ----------------------------------------------------------------------------
-- 8. ATTENDANCES (91% Participation for Regular Parade Event #1)
-- ----------------------------------------------------------------------------
INSERT INTO attendances (event_id, cadet_id, attendance_date, status, marked_by, remarks) VALUES
-- Unit 2 Cadets (11 Present, 1 Absent = 91.7% today's attendance!)
(1, 1, '2026-11-18', 'PRESENT', 1, 'Uniform & drill inspection alpha grade'),
(1, 2, '2026-11-18', 'PRESENT', 1, 'SUO commanded parade sequence'),
(1, 3, '2026-11-18', 'PRESENT', 1, 'UO squad leader movements'),
(1, 4, '2026-11-18', 'PRESENT', 1, 'Quartermaster duties completed'),
(1, 5, '2026-11-18', 'ABSENT', 1, 'Medical leave application submitted'),
(1, 6, '2026-11-18', 'PRESENT', 1, 'Punctual in full khaki uniform'),
(1, 7, '2026-11-18', 'PRESENT', 1, 'Rifle drill classified'),
(1, 8, '2026-11-18', 'PRESENT', 1, 'Obstacle track clearance'),
(1, 9, '2026-11-18', 'PRESENT', 1, 'Squad movement coordinated'),
(1, 10, '2026-11-18', 'PRESENT', 1, 'Parade ground inspection cleared'),
(1, 11, '2026-11-18', 'PRESENT', 1, 'March-past sequence practice'),
(1, 12, '2026-11-18', 'PRESENT', 1, 'Ceremonial salute trial'),

-- Unit 1 Cadets
(5, 13, '2026-11-25', 'PRESENT', 2, 'CQSM coordinated squad'),
(5, 14, '2026-11-25', 'LATE', 2, 'Reported 10 mins late with notice'),
(5, 15, '2026-11-25', 'PRESENT', 2, 'Active participation'),

-- Unit 3 Cadets
(6, 19, '2026-12-01', 'PRESENT', 3, 'Semaphore signalling lead'),
(6, 20, '2026-12-01', 'PRESENT', 3, 'Whaler boat puller');

-- ----------------------------------------------------------------------------
-- 9. CADET_ATTENDANCE (Session Logs Synchronized)
-- ----------------------------------------------------------------------------
INSERT INTO cadet_attendance (training_enrollment_id, session_date, present) VALUES
(1, '2026-11-04', TRUE),
(1, '2026-11-11', TRUE),
(1, '2026-11-18', TRUE),
(2, '2026-11-04', TRUE),
(2, '2026-11-11', TRUE),
(2, '2026-11-18', TRUE),
(3, '2026-11-04', TRUE),
(3, '2026-11-11', TRUE),
(3, '2026-11-18', TRUE),
(5, '2026-11-04', TRUE),
(5, '2026-11-11', FALSE),
(5, '2026-11-18', FALSE),
(13, '2026-11-18', TRUE),
(19, '2026-11-18', TRUE);

-- ----------------------------------------------------------------------------
-- 10. CAMP_APPLICATIONS (Powers Selection & Applications Queue)
-- ----------------------------------------------------------------------------
INSERT INTO camp_applications (application_id, event_id, cadet_id, status, reviewed_by, reviewed_at, remarks) VALUES
(1, 2, 1, 'PENDING', NULL, NULL, 'Cadet Sairam Krishna applied for Annual Training Camp (ATC-102)'),
(2, 3, 2, 'APPROVED', 1, '2026-11-15 14:00:00', 'Selected for Pre-RDC Phase-1 drill trials'),
(3, 4, 3, 'PENDING', NULL, NULL, 'Obstacle course clearance record submitted'),
(4, 2, 4, 'APPROVED', 1, '2026-11-15 14:15:00', 'CSM appointed for camp quartermaster duties'),
(5, 3, 13, 'APPROVED', 2, '2026-11-16 10:00:00', 'Selected for Girls Cultural Contingent RDC'),
(6, 4, 5, 'PENDING', NULL, NULL, 'Range shooting classification required'),
(7, 2, 6, 'PENDING', NULL, NULL, 'Medical Form-A under review'),
(8, 2, 7, 'PENDING', NULL, NULL, 'Parental consent slip verification pending');

-- ----------------------------------------------------------------------------
-- 11. CERTIFICATES (Powers Verify Certificates Desk & Admin Count)
-- ----------------------------------------------------------------------------
INSERT INTO certificates (certificate_id, cadet_id, title, certificate_number, cert_type, issued_at, status, verified_by, verified_at, remarks) VALUES
(1, 1, 'NCC B Certificate (Alpha Grade)', 'NCC-B-99201', 'B', '2026-02-14', 'ISSUED', 1, '2026-02-14 11:00:00', 'Passed with Alpha grade. Verified by DGBNCC.'),
(2, 1, 'Annual Training Camp (ATC-101) Certificate', 'ATC-2026-44', 'CAMP', '2026-06-30', 'ISSUED', 1, '2026-06-30 15:00:00', '120 parade hours completed with Marksmanship badge.'),
(3, 2, 'Republic Day Camp (RDC) Certificate', 'RDC-2026-01', 'CAMP', '2026-02-05', 'ISSUED', 1, '2026-02-05 16:30:00', 'Represented MP & CG Directorate on Kartavya Path.'),
(4, 4, 'Thal Sainik Camp (TSC) Merit Certificate', 'TSC-2026-88', 'CAMP', '2026-09-25', 'ISSUED', 1, '2026-09-25 10:00:00', 'Silver medal in Obstacle Course competition.'),
(5, 1, 'RDC Rajpath Participation Endorsement', 'SUB-CERT-2026-01', 'CAMP', NULL, 'PENDING', NULL, NULL, 'Submitted by cadet for digital endorsement.'),
(6, 2, 'Basic Mountaineering Course (HMI)', 'SUB-CERT-2026-44', 'OTHER', NULL, 'PENDING', NULL, NULL, 'HMI Darjeeling completion certificate submitted.'),
(7, 13, 'Para Basic Jump Course Certificate', 'SUB-CERT-2026-92', 'OTHER', NULL, 'PENDING', NULL, NULL, 'PTS Agra 3-parajump wing certificate under review.'),
(8, 19, 'Ship Modeling Gold Medalist', 'SUB-CERT-2026-11', 'OTHER', NULL, 'PENDING', NULL, NULL, 'All India Nau Sainik Camp Gold Medal.');

-- ----------------------------------------------------------------------------
-- 12. FEE_PAYMENTS
-- ----------------------------------------------------------------------------
INSERT INTO fee_payments (payment_id, cadet_id, unit_id, college_dept, enrollment_fee, paid_at, status) VALUES
(1, 1, 2, 'CSE (AI & ML)', 250.00, '2024-08-10 10:05:00', 'PAID'),
(2, 2, 2, 'Mechanical Engineering', 250.00, '2024-08-10 10:20:00', 'PAID'),
(3, 13, 1, 'CSE', 250.00, '2024-08-12 11:05:00', 'PAID'),
(4, 4, 2, 'Civil Engineering', 250.00, '2024-08-12 11:25:00', 'PAID'),
(5, 19, 3, 'Marine Engg', 300.00, '2024-08-15 09:50:00', 'PAID'),
(6, 6, 2, 'BBA Analytics', 250.00, '2025-08-05 10:35:00', 'PAID'),
(7, 20, 3, 'Nautical Science', 300.00, '2025-08-05 11:15:00', 'PENDING'),
(8, 10, 2, 'BCA', 250.00, '2025-08-10 12:05:00', 'PAID');

-- ----------------------------------------------------------------------------
-- 13. ANNOUNCEMENTS (Official Notice Broadcasts)
-- ----------------------------------------------------------------------------
INSERT INTO announcements (announcement_id, title, body, category, priority, target_audience, unit_id, posted_by, posted_at) VALUES
(1, 'Mandatory Uniform & Drill Inspection on Saturday', 'All cadets of 8 MP Girls & Boys and affiliated units must report to ITM University Athletic Track at 07:00 AM sharp in inspection khaki uniform, beret with hackle, polished brass belt, and high-shine boots.', 'Urgent', 'URGENT', 'ALL', NULL, 2, '2026-11-16 18:00:00'),
(2, 'Annual Training Camp (ATC-102) Shortlist Released', 'Provisional shortlist of cadets for ATC-102 has been published. Selected cadets are required to submit signed Medical Fitness Form-A to the ANO Office before Wednesday.', 'Camps', 'IMPORTANT', 'ALL', 2, 2, '2026-11-17 10:30:00'),
(3, 'NCC B & C Certificate Examination 2027 Registration', 'Eligible 2nd and 3rd-year cadets must submit Form-B and Form-C along with 3 passport-size photos in uniform before Friday 17:00 hrs.', 'Exams', 'NORMAL', 'ALL', NULL, 1, '2026-11-18 11:00:00'),
(4, 'Republic Day Parade (RDC 2027) Contingent Drill Trials', 'Inter-battalion drill selection trials for Kartavya Path contingent commence Monday 06:00 AM at the ITM Main Ground.', 'Selection', 'IMPORTANT', 'ALL', NULL, 2, '2026-11-19 14:00:00');

-- ----------------------------------------------------------------------------
-- 14. GRIEVANCES (Cadet Helpdesk Tickets & Officer Replies)
-- ----------------------------------------------------------------------------
INSERT INTO grievances (grievance_id, cadet_id, ticket_no, subject, category, description, status, reply, replied_by) VALUES
(1, 1, 'CMP-2026-04', 'Attendance Discrepancy on 14 Aug Independence Parade', 'Parade Attendance', 'Attended full morning parade and flag hoisting ceremony but marked absent in portal.', 'RESOLVED', 'Verified against manual ground muster roll. Corrected from Absent to Present with full attendance marks.', 1),
(2, 1, 'CMP-2026-09', 'Replacement Request for DMS Boots (Size 9)', 'Uniform & Equipment', 'Sole separation occurred during obstacle training course on Tuesday.', 'OPEN', NULL, NULL),
(3, 2, 'REQ-2026-15', 'Mid-Term Academic Leave Condonation for ATC-101', 'Academic Leave Slip', 'Requesting formal Dean Student Welfare duty slip for SOECS department mid-term re-test scheduling.', 'RESOLVED', 'Official Duty Attendance Slip dispatched to HOD SOECS. Academic attendance condonation applied to student ERP.', 1),
(4, 5, 'CMP-2026-21', 'Request for Extra Obstacle Training Hour for TSC Selection', 'Training Facilities', 'Would like permission to use obstacle course ground between 06:00 and 07:00 AM.', 'IN_PROGRESS', 'Special track access granted under supervision of Junior Under Officer.', 1);

-- ----------------------------------------------------------------------------
-- 15. AUDIT_LOGS
-- ----------------------------------------------------------------------------
INSERT INTO audit_logs (log_id, user_id, role, action, module, details, ip_address, created_at) VALUES
(1, 1, 'ADMIN', 'DATABASE_INITIALIZE', 'System Master', 'NCC Unified MySQL Database initialized across Admin, Officer, and Student portals.', '127.0.0.1', '2026-11-18 06:00:00'),
(2, 2, 'OFFICER', 'ATTENDANCE_MARKED', 'Attendance Full Control', 'Marked parade attendance for 8 MP Girls & Boys (Session: Regular Parade & Drill, 91.7% Present).', '127.0.0.1', '2026-11-18 09:35:00'),
(3, 5, 'CADET', 'CAMP_APPLICATION_SUBMIT', 'Camp Management', 'Cadet Sairam Krishna submitted application for Annual Training Camp (ATC-102).', '127.0.0.1', '2026-11-18 10:15:00'),
(4, 2, 'OFFICER', 'APPLICATION_APPROVED', 'Selection & Applications', 'Approved SUO Vikram Singh application for Republic Day Camp (RDC-2027).', '127.0.0.1', '2026-11-18 14:00:00'),
(5, 1, 'ADMIN', 'SETTINGS_UPDATE', 'System Settings', 'Minimum attendance threshold policy set to 75% for AY 2026-27.', '127.0.0.1', '2026-11-18 16:20:00');

-- ----------------------------------------------------------------------------
-- 16. SETTINGS
-- ----------------------------------------------------------------------------
INSERT INTO settings (setting_key, setting_value, updated_by) VALUES
('min_attendance_percent', '75', 1),
('academic_year', '2026-27', 1),
('session_timeout_minutes', '60', 1),
('system_status', 'OPERATIONAL', 1),
('enrollment_open', 'TRUE', 1);

-- ----------------------------------------------------------------------------
-- 17. ROLE_PERMISSIONS (Role & Permissions Matrix UI)
-- ----------------------------------------------------------------------------
INSERT INTO role_permissions (role, permission, allowed) VALUES
('CADET', 'VIEW_PROFILE', TRUE),
('CADET', 'VIEW_ATTENDANCE', TRUE),
('CADET', 'APPLY_CAMPS', TRUE),
('CADET', 'UPLOAD_CERTIFICATES', TRUE),
('CADET', 'SUBMIT_GRIEVANCE', TRUE),
('CADET', 'MARK_ATTENDANCE', FALSE),
('CADET', 'CREATE_CAMPS', FALSE),
('CADET', 'MANAGE_USERS', FALSE),

('OFFICER', 'VIEW_PROFILE', TRUE),
('OFFICER', 'VIEW_ATTENDANCE', TRUE),
('OFFICER', 'MARK_ATTENDANCE', TRUE),
('OFFICER', 'REVIEW_APPLICATIONS', TRUE),
('OFFICER', 'CREATE_CAMPS', TRUE),
('OFFICER', 'VERIFY_CERTIFICATES', TRUE),
('OFFICER', 'PUBLISH_NOTICES', TRUE),
('OFFICER', 'RESOLVE_GRIEVANCE', TRUE),
('OFFICER', 'MANAGE_USERS', FALSE),

('ADMIN', 'VIEW_PROFILE', TRUE),
('ADMIN', 'VIEW_ATTENDANCE', TRUE),
('ADMIN', 'MARK_ATTENDANCE', TRUE),
('ADMIN', 'OVERRIDE_ATTENDANCE', TRUE),
('ADMIN', 'MANAGE_USERS', TRUE),
('ADMIN', 'MANAGE_OFFICERS', TRUE),
('ADMIN', 'CONFIGURE_UNITS', TRUE),
('ADMIN', 'CONFIGURE_PERMISSIONS', TRUE),
('ADMIN', 'MANAGE_CMS', TRUE),
('ADMIN', 'VIEW_AUDIT_LOGS', TRUE),
('ADMIN', 'UPDATE_SETTINGS', TRUE);
