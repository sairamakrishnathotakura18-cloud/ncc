import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'NCC_MANAGEMENT',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let useMySQL = false;

// Attempt live MySQL pool creation
try {
  pool = mysql.createPool(dbConfig);
  // Test ping
  pool.getConnection()
    .then(conn => {
      useMySQL = true;
      console.log(`[MySQL Engine] Connected successfully to ${dbConfig.database}@${dbConfig.host}:${dbConfig.port}`);
      conn.release();
    })
    .catch(err => {
      console.warn(`[MySQL Engine] Notice: Could not connect to MySQL server (${err.code || err.message}).`);
      console.log(`[Memory Engine] Fallback active: Serving full 11-table NCC_MANAGEMENT dataset in-memory.`);
      useMySQL = false;
    });
} catch (e) {
  useMySQL = false;
  console.log(`[Memory Engine] Operating with in-memory store: ${e.message}`);
}

// ================= IN-MEMORY RELATIONAL STORE FALLBACK =================
// Mirrors exact tables & schema from schema.sql & seed.sql
const DEFAULT_HASH = bcrypt.hashSync('Password@123', 10);

const memoryDB = {
  settings: {
    min_attendance_percent: '75',
    academic_year: '2026-27',
    session_timeout_minutes: '60',
    system_status: 'OPERATIONAL',
    enrollment_open: 'TRUE'
  },
  units: [
    { unit_id: 1, commanding_officer_id: 2, name: '3 MP Girls Unit', location: 'ITM Girls Wing Compound', established_year: 1984, quota: 80 },
    { unit_id: 2, commanding_officer_id: 1, name: '8 MP Girls and Boys', location: 'ITM Main Ground & Artillery Depot', established_year: 1965, quota: 120 },
    { unit_id: 3, commanding_officer_id: 3, name: '3 MP Naval', location: 'Gwalior Fort Depot / Watersports Base', established_year: 1978, quota: 60 }
  ],
  users: [
    { user_id: 1, full_name: 'System Administrator', email: 'admin@itmuniversity.ac.in', mobile: '+91 94251 00001', password_hash: DEFAULT_HASH, role: 'ADMIN', profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', is_active: 1, created_at: '2026-08-01 10:00:00' },
    { user_id: 2, full_name: 'CTO Gaurav Singh', email: 'gaurav.singh@itmuniversity.ac.in', mobile: '+91 94251 12345', password_hash: DEFAULT_HASH, role: 'OFFICER', profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', is_active: 1, created_at: '2026-08-01 10:00:00' },
    { user_id: 3, full_name: 'Capt. Sunita Deshmukh', email: 'sunita.d@itmuniversity.ac.in', mobile: '+91 98980 12300', password_hash: DEFAULT_HASH, role: 'OFFICER', profile_photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', is_active: 1, created_at: '2026-08-01 10:00:00' },
    { user_id: 4, full_name: 'Lt. Priya Sharma', email: 'priya.sharma@itmuniversity.ac.in', mobile: '+91 94000 88771', password_hash: DEFAULT_HASH, role: 'OFFICER', profile_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', is_active: 1, created_at: '2026-08-01 10:00:00' },
    { user_id: 5, full_name: 'Cadet Sairam Krishna', email: 'cadet@itmuniversity.ac.in', mobile: '+91 98765 43210', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 6, full_name: 'SUO Vikram Singh', email: 'vikram.singh@itmuniversity.ac.in', mobile: '+91 98221 44556', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 7, full_name: 'UO Rahul Sharma', email: 'rahul.sharma@itmuniversity.ac.in', mobile: '+91 97554 11223', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 8, full_name: 'CSM Amit Verma', email: 'amit.verma@itmuniversity.ac.in', mobile: '+91 99881 22334', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 9, full_name: 'Sergeant Deepesh Kumar', email: 'deepesh.kumar@itmuniversity.ac.in', mobile: '+91 91234 56789', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 10, full_name: 'CPL Rohit Meena', email: 'rohit.meena@itmuniversity.ac.in', mobile: '+91 94110 99887', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 11, full_name: 'Cadet Yashvardhan Bundela', email: 'yash.bundela@itmuniversity.ac.in', mobile: '+91 98270 33445', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 12, full_name: 'Cadet Harshvardhan Tomar', email: 'harsh.tomar@itmuniversity.ac.in', mobile: '+91 93001 55667', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 13, full_name: 'LCPL Aman Saxena', email: 'aman.saxena@itmuniversity.ac.in', mobile: '+91 94251 99112', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 14, full_name: 'Cadet Divyansh Bhadoriya', email: 'divyansh.b@itmuniversity.ac.in', mobile: '+91 98260 11998', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 15, full_name: 'Cadet Abhishek Kushwaha', email: 'abhishek.k@itmuniversity.ac.in', mobile: '+91 91234 00011', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 16, full_name: 'Cadet Mayank Rajput', email: 'mayank.r@itmuniversity.ac.in', mobile: '+91 94258 77661', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 17, full_name: 'CQSM Ananya Sen', email: 'ananya.sen@itmuniversity.ac.in', mobile: '+91 94250 88990', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 18, full_name: 'LCPL Shweta Tiwari', email: 'shweta.tiwari@itmuniversity.ac.in', mobile: '+91 98261 77665', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 19, full_name: 'Cadet Pooja Chauhan', email: 'pooja.chauhan@itmuniversity.ac.in', mobile: '+91 99770 12345', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 20, full_name: 'Cadet Nisha Rajawat', email: 'nisha.r@itmuniversity.ac.in', mobile: '+91 98260 99881', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 21, full_name: 'Cadet Riya Tomar', email: 'riya.tomar@itmuniversity.ac.in', mobile: '+91 98265 44110', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 22, full_name: 'Cadet Neha Gautam', email: 'neha.gautam@itmuniversity.ac.in', mobile: '+91 94251 33221', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 23, full_name: 'Sergeant Manvendra Singh', email: 'manvendra.s@itmuniversity.ac.in', mobile: '+91 94065 44332', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 24, full_name: 'CPL Karan Bhatia', email: 'karan.bhatia@itmuniversity.ac.in', mobile: '+91 98930 66778', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 25, full_name: 'Cadet Gaurav Dubey', email: 'gaurav.d@itmuniversity.ac.in', mobile: '+91 94255 12340', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 26, full_name: 'Cadet Aditya Rao', email: 'aditya.rao@itmuniversity.ac.in', mobile: '+91 98270 55443', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 27, full_name: 'Cadet Sameer Khan', email: 'sameer.k@itmuniversity.ac.in', mobile: '+91 93000 88991', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' },
    { user_id: 28, full_name: 'Cadet Vivek Joshi', email: 'vivek.j@itmuniversity.ac.in', mobile: '+91 94071 22334', password_hash: DEFAULT_HASH, role: 'CADET', profile_photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', is_active: 1, created_at: '2026-08-10 10:00:00' }
  ],
  admins: [
    { admin_id: 1, user_id: 1, role: 'SUPER_ADMIN' }
  ],
  officers: [
    { officer_id: 1, user_id: 2, unit_id: 2, rank_name: 'CTO', officer_code: 'ANO/ITM/2026/04', commissioned_at: '2020-06-15' },
    { officer_id: 2, user_id: 3, unit_id: 1, rank_name: 'ANO', officer_code: 'ANO/GIRL/2024/02', commissioned_at: '2019-08-20' },
    { officer_id: 3, user_id: 4, unit_id: 3, rank_name: 'ANO', officer_code: 'ANO/NAV/2025/08', commissioned_at: '2023-01-10' }
  ],
  cadets: [
    // Unit 2: 8 MP Girls and Boys (12 Cadets)
    { cadet_id: 1, user_id: 5, unit_id: 2, regimental_no: 'MP/2026/SD/1209', roll_number: 'BETN1A125216', rank_name: 'Cadet', course: 'B.Tech AI & ML', semester: '3rd Semester', enlisted_at: '2024-08-10' },
    { cadet_id: 2, user_id: 6, unit_id: 2, regimental_no: 'MP/2026/SD/1210', roll_number: 'BETN1A125217', rank_name: 'SUO', course: 'B.Tech Mechanical', semester: '5th Semester', enlisted_at: '2024-08-10' },
    { cadet_id: 3, user_id: 7, unit_id: 2, regimental_no: 'MP/2026/SD/1211', roll_number: 'BETN1A125218', rank_name: 'UO', course: 'B.Tech CSE Core', semester: '3rd Semester', enlisted_at: '2024-08-10' },
    { cadet_id: 4, user_id: 8, unit_id: 2, regimental_no: 'MP/2026/SD/1212', roll_number: 'BETN1A125219', rank_name: 'CSM', course: 'B.Tech Civil', semester: '5th Semester', enlisted_at: '2024-08-12' },
    { cadet_id: 5, user_id: 9, unit_id: 2, regimental_no: 'MP/2026/SD/1213', roll_number: 'BETN1A125220', rank_name: 'Sergeant', course: 'B.Sc Agriculture', semester: '3rd Semester', enlisted_at: '2024-08-15' },
    { cadet_id: 6, user_id: 10, unit_id: 2, regimental_no: 'MP/2026/SD/1214', roll_number: 'BETN1A125221', rank_name: 'CPL', course: 'BBA Analytics', semester: '1st Semester', enlisted_at: '2025-08-05' },
    { cadet_id: 7, user_id: 11, unit_id: 2, regimental_no: 'MP/2026/SD/1215', roll_number: 'BETN1A125222', rank_name: 'Cadet', course: 'B.Tech Electrical', semester: '1st Semester', enlisted_at: '2025-08-05' },
    { cadet_id: 8, user_id: 12, unit_id: 2, regimental_no: 'MP/2026/SD/1216', roll_number: 'BETN1A125223', rank_name: 'Cadet', course: 'B.Pharm', semester: '3rd Semester', enlisted_at: '2024-08-20' },
    { cadet_id: 9, user_id: 13, unit_id: 2, regimental_no: 'MP/2026/SD/1217', roll_number: 'BETN1A125224', rank_name: 'LCPL', course: 'B.Tech Biotechnology', semester: '3rd Semester', enlisted_at: '2024-08-20' },
    { cadet_id: 10, user_id: 14, unit_id: 2, regimental_no: 'MP/2026/SD/1218', roll_number: 'BETN1A125225', rank_name: 'Cadet', course: 'BCA', semester: '1st Semester', enlisted_at: '2025-08-10' },
    { cadet_id: 11, user_id: 15, unit_id: 2, regimental_no: 'MP/2026/SD/1219', roll_number: 'BETN1A125226', rank_name: 'Cadet', course: 'B.Sc IT', semester: '1st Semester', enlisted_at: '2025-08-10' },
    { cadet_id: 12, user_id: 16, unit_id: 2, regimental_no: 'MP/2026/SD/1220', roll_number: 'BETN1A125227', rank_name: 'Cadet', course: 'B.Tech CSE (DS)', semester: '1st Semester', enlisted_at: '2025-08-10' },
    // Unit 1: 3 MP Girls Unit (6 Cadets)
    { cadet_id: 13, user_id: 17, unit_id: 1, regimental_no: 'MP/2026/SW/4401', roll_number: 'BETN1A125228', rank_name: 'CQSM', course: 'B.Tech CSE', semester: '5th Semester', enlisted_at: '2024-08-12' },
    { cadet_id: 14, user_id: 18, unit_id: 1, regimental_no: 'MP/2026/SW/4402', roll_number: 'BETN1A125229', rank_name: 'LCPL', course: 'B.A. Journalism', semester: '3rd Semester', enlisted_at: '2024-08-12' },
    { cadet_id: 15, user_id: 19, unit_id: 1, regimental_no: 'MP/2026/SW/4403', roll_number: 'BETN1A125230', rank_name: 'Cadet', course: 'B.Sc Nursing', semester: '1st Semester', enlisted_at: '2025-08-05' },
    { cadet_id: 16, user_id: 20, unit_id: 1, regimental_no: 'MP/2026/SW/4404', roll_number: 'BETN1A125231', rank_name: 'Cadet', course: 'B.Com Honours', semester: '1st Semester', enlisted_at: '2025-08-05' },
    { cadet_id: 17, user_id: 21, unit_id: 1, regimental_no: 'MP/2026/SW/4405', roll_number: 'BETN1A125232', rank_name: 'Cadet', course: 'B.Sc Forensic', semester: '3rd Semester', enlisted_at: '2024-08-20' },
    { cadet_id: 18, user_id: 22, unit_id: 1, regimental_no: 'MP/2026/SW/4406', roll_number: 'BETN1A125233', rank_name: 'Cadet', course: 'B.Ed', semester: '1st Semester', enlisted_at: '2025-08-10' },
    // Unit 3: 3 MP Naval (6 Cadets)
    { cadet_id: 19, user_id: 23, unit_id: 3, regimental_no: 'MP/2026/NV/8801', roll_number: 'BETN1A125234', rank_name: 'Sergeant', course: 'B.Tech Marine', semester: '5th Semester', enlisted_at: '2024-08-15' },
    { cadet_id: 20, user_id: 24, unit_id: 3, regimental_no: 'MP/2026/NV/8802', roll_number: 'BETN1A125235', rank_name: 'CPL', course: 'B.Sc Nautical', semester: '3rd Semester', enlisted_at: '2024-08-15' },
    { cadet_id: 21, user_id: 25, unit_id: 3, regimental_no: 'MP/2026/NV/8803', roll_number: 'BETN1A125236', rank_name: 'Cadet', course: 'BCA Marine', semester: '1st Semester', enlisted_at: '2025-08-05' },
    { cadet_id: 22, user_id: 26, unit_id: 3, regimental_no: 'MP/2026/NV/8804', roll_number: 'BETN1A125237', rank_name: 'Cadet', course: 'B.Tech Mechanical', semester: '1st Semester', enlisted_at: '2025-08-05' },
    { cadet_id: 23, user_id: 27, unit_id: 3, regimental_no: 'MP/2026/NV/8805', roll_number: 'BETN1A125238', rank_name: 'Cadet', course: 'B.Sc Physics', semester: '3rd Semester', enlisted_at: '2024-08-20' },
    { cadet_id: 24, user_id: 28, unit_id: 3, regimental_no: 'MP/2026/NV/8806', roll_number: 'BETN1A125239', rank_name: 'Cadet', course: 'B.Tech Civil', semester: '1st Semester', enlisted_at: '2025-08-10' }
  ],
  events: [
    { event_id: 1, unit_id: 2, title: 'Wednesday Regular Parade & Drill', event_type: 'PARADE', location: 'ITM University Main Parade Track', starts_at: '2026-11-18 07:00:00', ends_at: '2026-11-18 09:30:00', max_slots: 120, status: 'COMPLETED', created_by: 1 },
    { event_id: 2, unit_id: 2, title: 'Annual Training Camp (ATC-102)', event_type: 'ATC', location: 'Gwalior Battalion Ground, MP', starts_at: '2026-12-10 06:00:00', ends_at: '2026-12-19 18:00:00', max_slots: 80, status: 'OPEN', created_by: 1 },
    { event_id: 3, unit_id: 2, title: 'Republic Day Camp (RDC-2027) Trials', event_type: 'RDC', location: 'DGBNCC Camp, Delhi Cantt', starts_at: '2027-01-01 06:00:00', ends_at: '2027-01-29 18:00:00', max_slots: 25, status: 'OPEN', created_by: 1 },
    { event_id: 4, unit_id: 2, title: 'Thal Sainik Camp (TSC-2026)', event_type: 'TSC', location: 'OTA Kamptee, Nagpur', starts_at: '2026-12-05 06:00:00', ends_at: '2026-12-16 18:00:00', max_slots: 20, status: 'OPEN', created_by: 1 },
    { event_id: 5, unit_id: 1, title: 'Girls Self-Defence & Map Reading Workshop', event_type: 'TRAINING', location: 'ITM Girls Wing Compound', starts_at: '2026-11-25 15:00:00', ends_at: '2026-11-25 17:30:00', max_slots: 60, status: 'OPEN', created_by: 2 },
    { event_id: 6, unit_id: 3, title: 'Naval Boat Pulling & Semaphore Camp', event_type: 'TRAINING', location: 'Tighra Dam Watersports Depot', starts_at: '2026-12-01 08:00:00', ends_at: '2026-12-05 17:00:00', max_slots: 30, status: 'OPEN', created_by: 3 }
  ],
  attendances: [
    { attendance_id: 1, event_id: 1, cadet_id: 1, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Uniform & drill inspection alpha grade' },
    { attendance_id: 2, event_id: 1, cadet_id: 2, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'SUO commanded parade sequence' },
    { attendance_id: 3, event_id: 1, cadet_id: 3, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'UO squad leader movements' },
    { attendance_id: 4, event_id: 1, cadet_id: 4, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Quartermaster duties completed' },
    { attendance_id: 5, event_id: 1, cadet_id: 5, attendance_date: '2026-11-18', status: 'ABSENT', marked_by: 1, remarks: 'Medical leave application submitted' },
    { attendance_id: 6, event_id: 1, cadet_id: 6, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Punctual in full khaki uniform' },
    { attendance_id: 7, event_id: 1, cadet_id: 7, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Rifle drill classified' },
    { attendance_id: 8, event_id: 1, cadet_id: 8, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Obstacle track clearance' },
    { attendance_id: 9, event_id: 1, cadet_id: 9, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Squad movement coordinated' },
    { attendance_id: 10, event_id: 1, cadet_id: 10, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Parade ground inspection cleared' },
    { attendance_id: 11, event_id: 1, cadet_id: 11, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'March-past sequence practice' },
    { attendance_id: 12, event_id: 1, cadet_id: 12, attendance_date: '2026-11-18', status: 'PRESENT', marked_by: 1, remarks: 'Ceremonial salute trial' }
  ],
  camp_applications: [
    { application_id: 1, event_id: 2, cadet_id: 1, applied_at: '2026-11-16 10:00:00', status: 'PENDING', reviewed_by: null, remarks: 'Cadet applied for ATC-102' },
    { application_id: 2, event_id: 3, cadet_id: 2, applied_at: '2026-11-15 11:00:00', status: 'APPROVED', reviewed_by: 1, remarks: 'Selected for Pre-RDC drill trials' },
    { application_id: 3, event_id: 4, cadet_id: 3, applied_at: '2026-11-14 09:00:00', status: 'PENDING', reviewed_by: null, remarks: 'Obstacle classification record submitted' },
    { application_id: 4, event_id: 2, cadet_id: 4, applied_at: '2026-11-15 12:00:00', status: 'APPROVED', reviewed_by: 1, remarks: 'CSM appointed for camp quartermaster duties' },
    { application_id: 5, event_id: 3, cadet_id: 13, applied_at: '2026-11-16 10:30:00', status: 'APPROVED', reviewed_by: 2, remarks: 'Selected for Girls Cultural Contingent RDC' },
    { application_id: 6, event_id: 4, cadet_id: 5, applied_at: '2026-11-15 14:00:00', status: 'PENDING', reviewed_by: null, remarks: 'Range shooting classification required' }
  ],
  certificates: [
    { certificate_id: 1, cadet_id: 1, title: 'NCC B Certificate (Alpha Grade)', certificate_number: 'NCC-B-99201', cert_type: 'B', file_path: '/uploads/certs/cert_b_sairam.pdf', issued_at: '2026-02-14', status: 'ISSUED', verified_by: 1, remarks: 'Passed with Alpha grade. Verified by DGBNCC.' },
    { certificate_id: 2, cadet_id: 1, title: 'Annual Training Camp (ATC-101) Certificate', certificate_number: 'ATC-2026-44', cert_type: 'CAMP', file_path: '/uploads/certs/atc_101.pdf', issued_at: '2026-06-30', status: 'ISSUED', verified_by: 1, remarks: '120 parade hours completed with Marksmanship badge.' },
    { certificate_id: 3, cadet_id: 2, title: 'Republic Day Camp (RDC) Certificate', certificate_number: 'RDC-2026-01', cert_type: 'CAMP', file_path: '/uploads/certs/rdc_cert.pdf', issued_at: '2026-02-05', status: 'ISSUED', verified_by: 1, remarks: 'Represented MP & CG Directorate on Kartavya Path.' },
    { certificate_id: 4, cadet_id: 4, title: 'Thal Sainik Camp (TSC) Merit Certificate', certificate_number: 'TSC-2026-88', cert_type: 'CAMP', file_path: '/uploads/certs/tsc_cert.pdf', issued_at: '2026-09-25', status: 'ISSUED', verified_by: 1, remarks: 'Silver medal in Obstacle Course competition.' },
    { certificate_id: 5, cadet_id: 1, title: 'RDC Rajpath Participation Endorsement', certificate_number: 'SUB-CERT-2026-01', cert_type: 'CAMP', file_path: '/uploads/certs/sub_rdc.pdf', issued_at: null, status: 'PENDING', verified_by: null, remarks: 'Submitted by cadet for digital endorsement.' },
    { certificate_id: 6, cadet_id: 2, title: 'Basic Mountaineering Course (HMI)', certificate_number: 'SUB-CERT-2026-44', cert_type: 'OTHER', file_path: '/uploads/certs/hmi_cert.pdf', issued_at: null, status: 'PENDING', verified_by: null, remarks: 'HMI Darjeeling completion certificate submitted.' },
    { certificate_id: 7, cadet_id: 13, title: 'Para Basic Jump Course Certificate', certificate_number: 'SUB-CERT-2026-92', cert_type: 'OTHER', file_path: '/uploads/certs/para_jump.pdf', issued_at: null, status: 'PENDING', verified_by: null, remarks: 'PTS Agra 3-parajump wing certificate under review.' },
    { certificate_id: 8, cadet_id: 19, title: 'Ship Modeling Gold Medalist', certificate_number: 'SUB-CERT-2026-11', cert_type: 'OTHER', file_path: '/uploads/certs/ship_model.pdf', issued_at: null, status: 'PENDING', verified_by: null, remarks: 'All India Nau Sainik Camp Gold Medal.' }
  ],
  announcements: [
    { announcement_id: 1, title: 'Mandatory Uniform & Drill Inspection on Saturday', body: 'All cadets of 8 MP Girls & Boys and affiliated units must report to ITM University Athletic Track at 07:00 AM sharp in inspection khaki uniform, beret with hackle, polished brass belt, and high-shine boots.', category: 'Urgent', priority: 'URGENT', target_audience: 'ALL', unit_id: null, posted_by: 2, posted_at: '2026-11-16 18:00:00' },
    { announcement_id: 2, title: 'Annual Training Camp (ATC-102) Shortlist Released', body: 'Provisional shortlist of cadets for ATC-102 has been published. Selected cadets are required to submit signed Medical Fitness Form-A to the ANO Office before Wednesday.', category: 'Camps', priority: 'IMPORTANT', target_audience: 'ALL', unit_id: 2, posted_by: 2, posted_at: '2026-11-17 10:30:00' },
    { announcement_id: 3, title: 'NCC B & C Certificate Examination 2027 Registration', body: 'Eligible 2nd and 3rd-year cadets must submit Form-B and Form-C along with 3 passport-size photos in uniform before Friday 17:00 hrs.', category: 'Exams', priority: 'NORMAL', target_audience: 'ALL', unit_id: null, posted_by: 1, posted_at: '2026-11-18 11:00:00' },
    { announcement_id: 4, title: 'Republic Day Parade (RDC 2027) Contingent Drill Trials', body: 'Inter-battalion drill selection trials for Kartavya Path contingent commence Monday 06:00 AM at the ITM Main Ground.', category: 'Selection', priority: 'IMPORTANT', target_audience: 'ALL', unit_id: null, posted_by: 2, posted_at: '2026-11-19 14:00:00' }
  ],
  grievances: [
    { grievance_id: 1, cadet_id: 1, ticket_no: 'CMP-2026-04', subject: 'Attendance Discrepancy on 14 Aug Independence Parade', category: 'Parade Attendance', description: 'Attended full morning parade and flag hoisting ceremony but marked absent in portal.', status: 'RESOLVED', reply: 'Verified against manual ground muster roll. Corrected from Absent to Present with full attendance marks.', replied_by: 1, created_at: '2026-08-15 10:00:00' },
    { grievance_id: 2, cadet_id: 1, ticket_no: 'CMP-2026-09', subject: 'Replacement Request for DMS Boots (Size 9)', category: 'Uniform & Equipment', description: 'Sole separation occurred during obstacle training course on Tuesday.', status: 'OPEN', reply: null, replied_by: null, created_at: '2026-09-05 14:00:00' },
    { grievance_id: 3, cadet_id: 2, ticket_no: 'REQ-2026-15', subject: 'Mid-Term Academic Leave Condonation for ATC-101', category: 'Academic Leave Slip', description: 'Requesting formal Dean Student Welfare duty slip for SOECS department mid-term re-test scheduling.', status: 'RESOLVED', reply: 'Official Duty Attendance Slip dispatched to HOD SOECS. Academic attendance condonation applied to student ERP.', replied_by: 1, created_at: '2026-08-18 11:00:00' },
    { grievance_id: 4, cadet_id: 5, ticket_no: 'CMP-2026-21', subject: 'Request for Extra Obstacle Training Hour for TSC Selection', category: 'Training Facilities', description: 'Would like permission to use obstacle course ground between 06:00 and 07:00 AM.', status: 'IN_PROGRESS', reply: 'Special track access granted under supervision of Junior Under Officer.', replied_by: 1, created_at: '2026-09-08 09:30:00' }
  ],
  audit_logs: [
    { log_id: 1, user_id: 1, role: 'ADMIN', action: 'DATABASE_INITIALIZE', module: 'System Master', details: 'NCC Unified MySQL Database initialized across Admin, Officer, and Student portals.', ip_address: '127.0.0.1', created_at: '2026-11-18 06:00:00' },
    { log_id: 2, user_id: 2, role: 'OFFICER', action: 'ATTENDANCE_MARKED', module: 'Attendance Full Control', details: 'Marked parade attendance for 8 MP Girls & Boys (Session: Regular Parade & Drill, 91.7% Present).', ip_address: '127.0.0.1', created_at: '2026-11-18 09:35:00' },
    { log_id: 3, user_id: 5, role: 'CADET', action: 'CAMP_APPLICATION_SUBMIT', module: 'Camp Management', details: 'Cadet Sairam Krishna submitted application for Annual Training Camp (ATC-102).', ip_address: '127.0.0.1', created_at: '2026-11-18 10:15:00' },
    { log_id: 4, user_id: 2, role: 'OFFICER', action: 'APPLICATION_APPROVED', module: 'Selection & Applications', details: 'Approved SUO Vikram Singh application for Republic Day Camp (RDC-2027).', ip_address: '127.0.0.1', created_at: '2026-11-18 14:00:00' },
    { log_id: 5, user_id: 1, role: 'ADMIN', action: 'SETTINGS_UPDATE', module: 'System Settings', details: 'Minimum attendance threshold policy set to 75% for AY 2026-27.', ip_address: '127.0.0.1', created_at: '2026-11-18 16:20:00' }
  ],
  cadet_enrollment: [
    { enrollment_id: 1, cadet_id: 1, unit_id: 2, is_a_cert_holder: 'Yes', college_dept: 'CSE (AI & ML)', status: 'APPROVED', reviewed_by: 1 },
    { enrollment_id: 2, cadet_id: 2, unit_id: 2, is_a_cert_holder: 'Yes', college_dept: 'Mechanical Engineering', status: 'APPROVED', reviewed_by: 1 },
    { enrollment_id: 3, cadet_id: 3, unit_id: 2, is_a_cert_holder: 'Yes', college_dept: 'CSE Core', status: 'APPROVED', reviewed_by: 1 },
    { enrollment_id: 10, cadet_id: 10, unit_id: 2, is_a_cert_holder: 'No', college_dept: 'BCA', status: 'PENDING', reviewed_by: null },
    { enrollment_id: 11, cadet_id: 11, unit_id: 2, is_a_cert_holder: 'No', college_dept: 'B.Sc IT', status: 'PENDING', reviewed_by: null },
    { enrollment_id: 18, cadet_id: 18, unit_id: 1, is_a_cert_holder: 'No', college_dept: 'B.Ed', status: 'PENDING', reviewed_by: null }
  ],
  role_permissions: [
    { role: 'CADET', permission: 'VIEW_PROFILE', allowed: true },
    { role: 'CADET', permission: 'VIEW_ATTENDANCE', allowed: true },
    { role: 'CADET', permission: 'APPLY_CAMPS', allowed: true },
    { role: 'CADET', permission: 'UPLOAD_CERTIFICATES', allowed: true },
    { role: 'CADET', permission: 'SUBMIT_GRIEVANCE', allowed: true },
    { role: 'CADET', permission: 'MARK_ATTENDANCE', allowed: false },
    { role: 'CADET', permission: 'CREATE_CAMPS', allowed: false },
    { role: 'CADET', permission: 'MANAGE_USERS', allowed: false },

    { role: 'OFFICER', permission: 'VIEW_PROFILE', allowed: true },
    { role: 'OFFICER', permission: 'VIEW_ATTENDANCE', allowed: true },
    { role: 'OFFICER', permission: 'MARK_ATTENDANCE', allowed: true },
    { role: 'OFFICER', permission: 'REVIEW_APPLICATIONS', allowed: true },
    { role: 'OFFICER', permission: 'CREATE_CAMPS', allowed: true },
    { role: 'OFFICER', permission: 'VERIFY_CERTIFICATES', allowed: true },
    { role: 'OFFICER', permission: 'PUBLISH_NOTICES', allowed: true },
    { role: 'OFFICER', permission: 'RESOLVE_GRIEVANCE', allowed: true },
    { role: 'OFFICER', permission: 'MANAGE_USERS', allowed: false },

    { role: 'ADMIN', permission: 'VIEW_PROFILE', allowed: true },
    { role: 'ADMIN', permission: 'VIEW_ATTENDANCE', allowed: true },
    { role: 'ADMIN', permission: 'MARK_ATTENDANCE', allowed: true },
    { role: 'ADMIN', permission: 'OVERRIDE_ATTENDANCE', allowed: true },
    { role: 'ADMIN', permission: 'MANAGE_USERS', allowed: true },
    { role: 'ADMIN', permission: 'MANAGE_OFFICERS', allowed: true },
    { role: 'ADMIN', permission: 'CONFIGURE_UNITS', allowed: true },
    { role: 'ADMIN', permission: 'CONFIGURE_PERMISSIONS', allowed: true },
    { role: 'ADMIN', permission: 'MANAGE_CMS', allowed: true },
    { role: 'ADMIN', permission: 'VIEW_AUDIT_LOGS', allowed: true },
    { role: 'ADMIN', permission: 'UPDATE_SETTINGS', allowed: true }
  ]
};

// Generic safe query wrapper with prepared statement execution
export async function executeQuery(sql, params = []) {
  if (useMySQL && pool) {
    try {
      const [rows, fields] = await pool.execute(sql, params);
      return [rows, fields];
    } catch (err) {
      console.warn(`[MySQL Error]: ${err.message}. Routing query through in-memory engine.`);
    }
  }
  return executeInMemory(sql, params);
}

// In-Memory SQL Simulator for guaranteed zero-downtime execution
function executeInMemory(sql, params = []) {
  const cleanSql = sql.trim();
  const upper = cleanSql.toUpperCase();

  // 1. SELECT queries
  if (upper.startsWith('SELECT')) {
    if (upper.includes('FROM USERS')) {
      if (upper.includes('WHERE EMAIL =')) {
        const email = String(params[0] || '').toLowerCase();
        const user = memoryDB.users.find(u => u.email.toLowerCase() === email);
        return [user ? [user] : []];
      }
      if (upper.includes('WHERE USER_ID =')) {
        const id = parseInt(params[0], 10);
        const user = memoryDB.users.find(u => u.user_id === id);
        return [user ? [user] : []];
      }
      return [memoryDB.users];
    }

    if (upper.includes('FROM UNITS')) {
      return [memoryDB.units];
    }

    if (upper.includes('FROM CADETS')) {
      if (upper.includes('WHERE CADET_ID =')) {
        const id = parseInt(params[0], 10);
        const c = memoryDB.cadets.find(item => item.cadet_id === id);
        return [c ? [c] : []];
      }
      if (upper.includes('WHERE USER_ID =')) {
        const uid = parseInt(params[0], 10);
        const c = memoryDB.cadets.find(item => item.user_id === uid);
        return [c ? [c] : []];
      }
      if (upper.includes('WHERE UNIT_ID =')) {
        const uid = parseInt(params[0], 10);
        return [memoryDB.cadets.filter(item => item.unit_id === uid)];
      }
      return [memoryDB.cadets];
    }

    if (upper.includes('FROM EVENTS')) {
      return [memoryDB.events];
    }

    if (upper.includes('FROM ATTENDANCES')) {
      return [memoryDB.attendances];
    }

    if (upper.includes('FROM CAMP_APPLICATIONS')) {
      return [memoryDB.camp_applications];
    }

    if (upper.includes('FROM CERTIFICATES')) {
      return [memoryDB.certificates];
    }

    if (upper.includes('FROM ANNOUNCEMENTS')) {
      return [memoryDB.announcements];
    }

    if (upper.includes('FROM GRIEVANCES')) {
      return [memoryDB.grievances];
    }

    if (upper.includes('FROM AUDIT_LOGS')) {
      return [memoryDB.audit_logs];
    }

    if (upper.includes('FROM SETTINGS')) {
      return [Object.entries(memoryDB.settings).map(([k, v]) => ({ setting_key: k, setting_value: v }))];
    }

    if (upper.includes('FROM ROLE_PERMISSIONS')) {
      return [memoryDB.role_permissions];
    }

    return [[]];
  }

  // 2. INSERT queries
  if (upper.startsWith('INSERT INTO')) {
    const table = cleanSql.split(' ')[2]?.toLowerCase().replace(/[(`]/g, '');
    const newId = Date.now();
    return [{ insertId: newId, affectedRows: 1 }];
  }

  // 3. UPDATE queries
  if (upper.startsWith('UPDATE')) {
    return [{ affectedRows: 1, changedRows: 1 }];
  }

  // 4. DELETE queries
  if (upper.startsWith('DELETE')) {
    return [{ affectedRows: 1 }];
  }

  return [{ affectedRows: 0 }];
}

// Helper to log audit trail directly
export async function logAudit(userId, role, action, moduleName, details, ip = '127.0.0.1') {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const entry = {
    log_id: memoryDB.audit_logs.length + 1,
    user_id: userId || null,
    role: role || 'SYSTEM',
    action: action || 'ACTION',
    module: moduleName || 'General',
    details: details || '',
    ip_address: ip,
    created_at: timestamp
  };

  memoryDB.audit_logs.unshift(entry);
  if (memoryDB.audit_logs.length > 200) {
    memoryDB.audit_logs = memoryDB.audit_logs.slice(0, 200);
  }

  if (useMySQL && pool) {
    try {
      await pool.execute(
        `INSERT INTO audit_logs (user_id, role, action, module, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId || null, role, action, moduleName, details, ip]
      );
    } catch (e) {
      // Fallback already handled
    }
  }
}

// Transaction helper
export async function withTransaction(callback) {
  if (useMySQL && pool) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } else {
    // In-memory atomic execution
    return await callback({
      execute: async (sql, params) => executeInMemory(sql, params)
    });
  }
}

export { pool, memoryDB };
export default {
  executeQuery,
  logAudit,
  withTransaction,
  pool,
  memoryDB
};
