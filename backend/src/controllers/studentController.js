import { executeQuery, memoryDB } from '../config/db.js';
import { logAuditTrail } from '../middleware/audit.js';

// 1. Student Dashboard Overview
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;
    const user = memoryDB.users.find(u => u.user_id === userId) || memoryDB.users[4]; // Cadet Sairam Krishna default
    const cadet = memoryDB.cadets.find(c => c.user_id === user.user_id) || memoryDB.cadets[0];
    const unit = memoryDB.units.find(u => u.unit_id === cadet.unit_id);

    // Calculate attendance %
    const records = memoryDB.attendances.filter(a => a.cadet_id === cadet.cadet_id);
    const presentCount = records.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
    const totalParades = records.length > 0 ? records.length : 12;
    const actualPresents = records.length > 0 ? presentCount : 11;
    const attendancePercentage = Math.round((actualPresents / totalParades) * 100);

    const minThreshold = parseFloat(memoryDB.settings.min_attendance_percent || '75');
    const isEligibleForExam = attendancePercentage >= minThreshold;

    // Profile strength calculation
    let filledFields = 0;
    const totalFields = 7;
    if (user.full_name) filledFields++;
    if (cadet.course) filledFields++;
    if (cadet.semester) filledFields++;
    if (cadet.roll_number) filledFields++;
    if (user.mobile) filledFields++;
    if (user.email) filledFields++;
    if (user.profile_photo) filledFields++;
    const profileStrength = Math.round((filledFields / totalFields) * 100);

    // Cadet's camps & applications
    const studentApplications = memoryDB.camp_applications.filter(a => a.cadet_id === cadet.cadet_id);
    const studentCamps = memoryDB.events.map(ev => {
      const app = studentApplications.find(a => a.event_id === ev.event_id);
      return {
        ...ev,
        applied: Boolean(app),
        application_status: app?.status || 'NOT_APPLIED',
        application_id: app?.application_id || null
      };
    });

    // Certificates
    const certs = memoryDB.certificates.filter(c => c.cadet_id === cadet.cadet_id);

    // Recent announcements
    const notices = memoryDB.announcements.slice(0, 5);

    // Grievances
    const grievances = memoryDB.grievances.filter(g => g.cadet_id === cadet.cadet_id);

    return res.json({
      success: true,
      profile: {
        cadet_id: cadet.cadet_id,
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        mobile: user.mobile,
        profile_photo: user.profile_photo,
        regimental_no: cadet.regimental_no,
        roll_number: cadet.roll_number,
        rank_name: cadet.rank_name,
        course: cadet.course,
        semester: cadet.semester,
        unit_name: unit?.name || '8 MP Girls and Boys',
        wing_type: unit?.name.includes('Naval') ? 'Naval Wing' : 'Army Wing (SD)',
        enrollment_year: '2026',
        profile_strength: profileStrength
      },
      attendance: {
        percentage: attendancePercentage,
        totalParades,
        attendedParades: actualPresents,
        minThreshold,
        isEligibleForExam,
        warning: isEligibleForExam ? null : `Attendance is below the mandatory ${minThreshold}% threshold.`
      },
      camps: studentCamps,
      certificates: certs,
      notices,
      grievances
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Edit Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;
    const user = memoryDB.users.find(u => u.user_id === userId) || memoryDB.users[4];
    const cadet = memoryDB.cadets.find(c => c.user_id === user.user_id) || memoryDB.cadets[0];

    const { full_name, course, semester, roll_number, mobile, email, profile_photo } = req.body;

    if (full_name) user.full_name = full_name;
    if (mobile) user.mobile = mobile;
    if (email) user.email = email;
    if (profile_photo) user.profile_photo = profile_photo;

    if (course) cadet.course = course;
    if (semester) cadet.semester = semester;
    if (roll_number) cadet.roll_number = roll_number;

    await logAuditTrail(
      req,
      'PROFILE_UPDATE',
      'Student Profile',
      `Cadet ${user.full_name} updated their profile information.`
    );

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        full_name: user.full_name,
        email: user.email,
        mobile: user.mobile,
        profile_photo: user.profile_photo,
        course: cadet.course,
        semester: cadet.semester,
        roll_number: cadet.roll_number
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Camps & Apply
export const getCamps = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;
    const cadet = memoryDB.cadets.find(c => c.user_id === userId) || memoryDB.cadets[0];
    const apps = memoryDB.camp_applications.filter(a => a.cadet_id === cadet.cadet_id);

    const list = memoryDB.events.map(ev => {
      const app = apps.find(a => a.event_id === ev.event_id);
      return {
        ...ev,
        applied: Boolean(app),
        application_status: app?.status || 'NOT_APPLIED',
        application_id: app?.application_id || null
      };
    });

    return res.json({ success: true, camps: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const applyCamp = async (req, res) => {
  try {
    const { event_id, remarks } = req.body;
    const userId = req.user.user_id || req.user.id;
    const cadet = memoryDB.cadets.find(c => c.user_id === userId) || memoryDB.cadets[0];

    const eventId = parseInt(event_id, 10);
    const existing = memoryDB.camp_applications.find(a => a.event_id === eventId && a.cadet_id === cadet.cadet_id);

    if (existing) {
      return res.status(409).json({ success: false, error: 'You have already applied for this camp.', application: existing });
    }

    const event = memoryDB.events.find(e => e.event_id === eventId);

    const newApp = {
      application_id: memoryDB.camp_applications.length + 1,
      event_id: eventId,
      cadet_id: cadet.cadet_id,
      applied_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: 'PENDING',
      reviewed_by: null,
      remarks: remarks || `Cadet application for ${event?.title || 'Camp'}`
    };

    memoryDB.camp_applications.push(newApp);

    await logAuditTrail(
      req,
      'CAMP_APPLY',
      'Camp Management',
      `Cadet #${cadet.cadet_id} submitted application for Camp #${eventId} (${event?.title})`
    );

    return res.status(201).json({ success: true, message: 'Application submitted successfully', application: newApp });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Certificates & Upload
export const getCertificates = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;
    const cadet = memoryDB.cadets.find(c => c.user_id === userId) || memoryDB.cadets[0];
    const certs = memoryDB.certificates.filter(c => c.cadet_id === cadet.cadet_id);

    return res.json({ success: true, certificates: certs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const uploadCertificate = async (req, res) => {
  try {
    const { title, cert_type, certificate_number, file_path } = req.body;
    const userId = req.user.user_id || req.user.id;
    const cadet = memoryDB.cadets.find(c => c.user_id === userId) || memoryDB.cadets[0];

    if (!title || !cert_type) {
      return res.status(400).json({ success: false, error: 'Title and certificate type are required.' });
    }

    const newCert = {
      certificate_id: memoryDB.certificates.length + 1,
      cadet_id: cadet.cadet_id,
      title,
      certificate_number: certificate_number || `SUB-${Date.now().toString().slice(-6)}`,
      cert_type: cert_type.toUpperCase(),
      file_path: file_path || '/uploads/certs/submitted_cert.pdf',
      issued_at: null,
      status: 'PENDING',
      verified_by: null,
      remarks: 'Submitted by cadet for ANO verification.'
    };

    memoryDB.certificates.push(newCert);

    await logAuditTrail(
      req,
      'CERTIFICATE_UPLOAD',
      'Certificates',
      `Cadet #${cadet.cadet_id} uploaded certificate "${title}" (${newCert.certificate_number})`
    );

    return res.status(201).json({ success: true, message: 'Certificate uploaded for verification', certificate: newCert });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Helpdesk / Grievances
export const getGrievances = async (req, res) => {
  try {
    const userId = req.user.user_id || req.user.id;
    const cadet = memoryDB.cadets.find(c => c.user_id === userId) || memoryDB.cadets[0];
    const list = memoryDB.grievances.filter(g => g.cadet_id === cadet.cadet_id);

    return res.json({ success: true, grievances: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const submitGrievance = async (req, res) => {
  try {
    const { subject, category, description } = req.body;
    const userId = req.user.user_id || req.user.id;
    const cadet = memoryDB.cadets.find(c => c.user_id === userId) || memoryDB.cadets[0];

    if (!subject || !description) {
      return res.status(400).json({ success: false, error: 'Subject and description are required.' });
    }

    const ticketNo = `CMP-2026-${String(memoryDB.grievances.length + 1).padStart(2, '0')}`;

    const newGrievance = {
      grievance_id: memoryDB.grievances.length + 1,
      cadet_id: cadet.cadet_id,
      ticket_no: ticketNo,
      subject,
      category: category || 'General Helpdesk',
      description,
      status: 'OPEN',
      reply: null,
      replied_by: null,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    memoryDB.grievances.unshift(newGrievance);

    await logAuditTrail(
      req,
      'GRIEVANCE_SUBMIT',
      'Helpdesk & Grievances',
      `Cadet #${cadet.cadet_id} filed ticket #${ticketNo}: "${subject}"`
    );

    return res.status(201).json({ success: true, message: 'Grievance submitted successfully', grievance: newGrievance });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  getDashboard,
  updateProfile,
  getCamps,
  applyCamp,
  getCertificates,
  uploadCertificate,
  getGrievances,
  submitGrievance
};
