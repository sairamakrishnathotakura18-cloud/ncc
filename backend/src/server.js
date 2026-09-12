import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database Store / Fallback
const db = {
  stats: {
    totalCadets: 342,
    activeCadets: 280,
    passedOutCadets: 62,
    totalCamps: 24,
    totalCertificates: 198,
    totalAchievements: 45,
    communityServiceHours: 1250,
    establishedYear: 1965
  },
  notices: [
    { id: 1, title: 'NCC Enrolment Drive 2025-26 Selection Trials', category: 'Enrolment', date: '2025-02-20', content: 'Selection trials for 1st Bengal Battalion and 1st Girls Battalion will be conducted at the University Ground from March 10th to March 12th.', priority: 'Urgent' },
    { id: 2, title: 'Annual Training Camp (CATC-104) Announcement', category: 'Camp Notice', date: '2025-02-18', content: 'CATC-104 will take place from April 10 to April 20 at Fort William Grounds. Eligible cadets must submit application before March 25.', priority: 'Normal' },
    { id: 3, title: 'Certificate B & C Digital Verification Portal Active', category: 'Exam/Certificate', date: '2025-02-10', content: 'Cadets can now verify and download digital A, B, and C certificates online using their unique serial numbers.', priority: 'General' }
  ],
  camps: [
    { id: 1, name: 'Combined Annual Training Camp 2025 (CATC-104)', type: 'CATC', location: 'Fort William Garrison, Kolkata', startDate: '2025-04-10', endDate: '2025-04-20', maxSlots: 60, status: 'Upcoming', description: 'Comprehensive 10-day parade, obstacle clearance, rifle firing, and drill competition camp.' },
    { id: 2, name: 'National Integration Camp (NIC-Varanasi)', type: 'NIC', location: 'BHU Campus, Varanasi', startDate: '2025-05-15', endDate: '2025-05-25', maxSlots: 25, status: 'Upcoming', description: 'Cultural exchange and national integration lectures with cadets across 17 directorates.' },
    { id: 3, name: 'Thal Sainik Camp (TSC-2025)', type: 'TSC', location: 'DG NCC Camp Grounds, New Delhi', startDate: '2025-09-01', endDate: '2025-09-12', maxSlots: 15, status: 'Upcoming', description: 'Army wing competition camp covering obstacle course, shooting, and map reading.' }
  ],
  certificates: [
    { id: 1, certificateNumber: 'NCC-CERT-2024-B-8902', type: 'Certificate B', cadetName: 'SUO Vikram Singh', regimentalNumber: 'WB/22/SD/A/103012', issueDate: '2024-06-30', grading: 'A', authority: 'Directorate General NCC - WB & Sikkim', isValid: true },
    { id: 2, certificateNumber: 'NCC-CERT-2025-A-4102', type: 'Certificate A', cadetName: 'Cadet Rahul Sharma', regimentalNumber: 'WB/23/SD/A/104089', issueDate: '2024-12-15', grading: 'A', authority: '1st Bengal Battalion NCC', isValid: true },
    { id: 3, certificateNumber: 'NCC-CERT-2024-C-9914', type: 'Certificate C', cadetName: 'JUO Ananya Sen', regimentalNumber: 'WB/23/SW/A/104090', issueDate: '2024-07-20', grading: 'A', authority: 'Directorate General NCC - New Delhi', isValid: true }
  ],
  achievements: [
    { id: 1, title: 'Governor Gold Medalist - Best SD Cadet 2024', cadetName: 'SUO Vikram Singh', level: 'State', award: 'Governor Gold Medal', date: '2024-11-14', description: 'Awarded Governor Gold Medal for outstanding parade leadership and top score in rifle marksmanship.' },
    { id: 2, title: '1st Position in 0.22 Rifle Marksmanship', cadetName: 'Cadet Rahul Sharma', level: 'Battalion', award: 'Gold Trophy & Commendation', date: '2025-01-26', description: 'Achieved 48/50 score in annual inter-college firing competition.' },
    { id: 3, title: 'Prime Minister Rally Participant - RDC 2024', cadetName: 'JUO Ananya Sen', level: 'National', award: 'PM Baton & Medal', date: '2024-01-28', description: 'Represented West Bengal & Sikkim Directorate at Rajpath, New Delhi.' }
  ],
  eligibilityRules: {
    minAttendancePercentage: 75.0,
    minHeightMaleCm: 157.0,
    minHeightFemaleCm: 152.0,
    maxAgeYears: 26,
    minGpa: 5.0,
    medicalFitnessRequired: true
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NCC Academic & Management Portal REST API', timestamp: new Date() });
});

// 1. Statistics API
app.get('/api/stats', (req, res) => {
  res.json(db.stats);
});

// 2. Authentication API
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email.includes('admin')) {
    return res.json({
      token: 'jwt-demo-token-admin',
      user: { id: 1, name: 'System Administrator', email, role: 'ADMIN', unit: 'HQ Unit' }
    });
  } else if (email.includes('officer')) {
    return res.json({
      token: 'jwt-demo-token-officer',
      user: { id: 2, name: 'Capt. Arindam Roy', email, role: 'OFFICER', unit: '1st Bengal Battalion NCC' }
    });
  } else {
    return res.json({
      token: 'jwt-demo-token-student',
      user: { id: 4, name: 'Cadet Rahul Sharma', email, role: 'STUDENT', unit: '1st Bengal Battalion NCC', regimentalNumber: 'WB/23/SD/A/104089' }
    });
  }
});

// 3. Notices API
app.get('/api/notices', (req, res) => {
  res.json(db.notices);
});

app.post('/api/notices', (req, res) => {
  const newNotice = { id: db.notices.length + 1, ...req.body, date: new Date().toISOString().split('T')[0] };
  db.notices.unshift(newNotice);
  res.status(201).json(newNotice);
});

// 4. Camps API
app.get('/api/camps', (req, res) => {
  res.json(db.camps);
});

app.post('/api/camps', (req, res) => {
  const newCamp = { id: db.camps.length + 1, status: 'Upcoming', ...req.body };
  db.camps.push(newCamp);
  res.status(201).json(newCamp);
});

// 5. Certificates & Public Verification API
app.get('/api/certificates', (req, res) => {
  res.json(db.certificates);
});

app.get('/api/certificates/verify/:certNum', (req, res) => {
  const certNum = req.params.certNum.trim().toUpperCase();
  const cert = db.certificates.find(c => c.certificateNumber.toUpperCase() === certNum);
  if (cert) {
    res.json({ found: true, valid: cert.isValid, certificate: cert });
  } else {
    res.json({ found: false, valid: false, message: 'Certificate number not found in university NCC records.' });
  }
});

// 6. Achievements API
app.get('/api/achievements', (req, res) => {
  res.json(db.achievements);
});

// 7. Eligibility Criteria Rules API
app.get('/api/eligibility-rules', (req, res) => {
  res.json(db.eligibilityRules);
});

app.put('/api/eligibility-rules', (req, res) => {
  db.eligibilityRules = { ...db.eligibilityRules, ...req.body };
  res.json({ message: 'Eligibility rules updated successfully', rules: db.eligibilityRules });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[NCC Express REST Server] Running on http://localhost:${PORT}`);
});
