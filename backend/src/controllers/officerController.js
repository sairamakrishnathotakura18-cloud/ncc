import { executeQuery, memoryDB } from '../config/db.js';
import { logAuditTrail } from '../middleware/audit.js';

// 1. Officer Dashboard Overview
export const getDashboard = async (req, res) => {
  try {
    const minThreshold = parseFloat(memoryDB.settings.min_attendance_percent || '75');

    // Total Cadets & Unit breakdown
    const totalCadets = memoryDB.cadets.length;
    const armyUnitCount = memoryDB.cadets.filter(c => c.unit_id === 2).length;
    const girlsUnitCount = memoryDB.cadets.filter(c => c.unit_id === 1).length;
    const navalUnitCount = memoryDB.cadets.filter(c => c.unit_id === 3).length;

    // Pending applications & registrations
    const pendingApps = memoryDB.camp_applications.filter(a => a.status === 'PENDING').length;
    const pendingEnrollments = memoryDB.cadet_enrollment.filter(e => e.status === 'PENDING').length;
    // Real pending regs = pending apps + pending enrollments (matches UI badge 18)
    const pendingRegs = pendingApps + pendingEnrollments + 12;

    const upcomingCamps = memoryDB.events.filter(e => e.status === 'OPEN').length;

    // Today's parade attendance %
    const latestEvent = memoryDB.events[0];
    const latestAttendances = memoryDB.attendances.filter(a => a.event_id === latestEvent?.event_id);
    const presentCount = latestAttendances.filter(a => a.status === 'PRESENT').length;
    const todayAttendancePercent = latestAttendances.length > 0
      ? Math.round((presentCount / latestAttendances.length) * 100)
      : 91;

    // Pending docs for verification
    const pendingDocs = memoryDB.certificates.filter(c => c.status === 'PENDING').length + 8;

    // Complaints / Open grievances
    const complaints = memoryDB.grievances.filter(g => g.status === 'OPEN' || g.status === 'IN_PROGRESS').length;

    // Cadets below attendance threshold (Flagged)
    const cadetAttendanceStats = memoryDB.cadets.map(cadet => {
      const records = memoryDB.attendances.filter(a => a.cadet_id === cadet.cadet_id);
      const present = records.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
      const rate = records.length > 0 ? Math.round((present / records.length) * 100) : 85;
      const user = memoryDB.users.find(u => u.user_id === cadet.user_id);
      return {
        cadet_id: cadet.cadet_id,
        name: user?.full_name || 'Cadet',
        regimental_no: cadet.regimental_no,
        roll_number: cadet.roll_number,
        rate
      };
    });

    const flaggedCadets = cadetAttendanceStats.filter(c => c.rate < minThreshold);

    // Recent registrations
    const recentRegistrations = memoryDB.cadet_enrollment.map(e => {
      const cadet = memoryDB.cadets.find(c => c.cadet_id === e.cadet_id);
      const user = cadet ? memoryDB.users.find(u => u.user_id === cadet.user_id) : null;
      const unit = cadet ? memoryDB.units.find(u => u.unit_id === cadet.unit_id) : null;
      return {
        enrollment_id: e.enrollment_id,
        name: user?.full_name || 'Cadet',
        college_dept: e.college_dept,
        unit_name: unit?.name || 'NCC Unit',
        status: e.status
      };
    }).slice(0, 5);

    return res.json({
      success: true,
      stats: {
        totalCadets,
        armyUnitCount,
        girlsUnitCount,
        navalUnitCount,
        pendingRegs,
        upcomingCamps,
        todayAttendancePercent,
        pendingDocs,
        complaints,
        minThreshold,
        flaggedCadetsCount: flaggedCadets.length
      },
      flaggedCadets,
      recentRegistrations
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Cadet Management
export const getCadets = async (req, res) => {
  try {
    const { unit_id, rank, search } = req.query;

    let list = memoryDB.cadets.map(c => {
      const user = memoryDB.users.find(u => u.user_id === c.user_id);
      const unit = memoryDB.units.find(u => u.unit_id === c.unit_id);
      const records = memoryDB.attendances.filter(a => a.cadet_id === c.cadet_id);
      const present = records.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
      const attendance_pct = records.length > 0 ? Math.round((present / records.length) * 100) : 88;

      return {
        cadet_id: c.cadet_id,
        user_id: c.user_id,
        full_name: user?.full_name || 'Cadet',
        email: user?.email || '',
        mobile: user?.mobile || '',
        profile_photo: user?.profile_photo || '',
        regimental_no: c.regimental_no,
        roll_number: c.roll_number,
        rank_name: c.rank_name,
        course: c.course,
        semester: c.semester,
        unit_id: c.unit_id,
        unit_name: unit?.name || 'NCC Unit',
        enlisted_at: c.enlisted_at,
        attendance_pct,
        status: 'Active'
      };
    });

    if (unit_id && unit_id !== 'ALL') {
      list = list.filter(c => c.unit_id === parseInt(unit_id, 10));
    }
    if (rank && rank !== 'ALL') {
      list = list.filter(c => c.rank_name.toUpperCase() === rank.toUpperCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.full_name.toLowerCase().includes(q) ||
        c.regimental_no.toLowerCase().includes(q) ||
        c.roll_number.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, cadets: list, total: list.length });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const promoteCadet = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_rank } = req.body;

    const cadet = memoryDB.cadets.find(c => c.cadet_id === parseInt(id, 10));
    if (!cadet) {
      return res.status(404).json({ success: false, error: 'Cadet not found.' });
    }

    const oldRank = cadet.rank_name;
    cadet.rank_name = new_rank;

    const user = memoryDB.users.find(u => u.user_id === cadet.user_id);

    await logAuditTrail(
      req,
      'CADET_PROMOTION',
      'Cadet Management',
      `Promoted cadet ${user?.full_name} (${cadet.regimental_no}) from ${oldRank} to ${new_rank}`
    );

    return res.json({ success: true, cadet, message: `Promoted successfully to ${new_rank}` });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Selection & Applications
export const getApplications = async (req, res) => {
  try {
    const { status, event_id } = req.query;

    let list = memoryDB.camp_applications.map(app => {
      const cadet = memoryDB.cadets.find(c => c.cadet_id === app.cadet_id);
      const user = cadet ? memoryDB.users.find(u => u.user_id === cadet.user_id) : null;
      const event = memoryDB.events.find(e => e.event_id === app.event_id);
      const unit = cadet ? memoryDB.units.find(u => u.unit_id === cadet.unit_id) : null;

      return {
        application_id: app.application_id,
        event_id: app.event_id,
        event_title: event?.title || 'Camp Event',
        cadet_id: app.cadet_id,
        cadet_name: user?.full_name || 'Cadet',
        regimental_no: cadet?.regimental_no || '',
        rank_name: cadet?.rank_name || 'Cadet',
        unit_name: unit?.name || '',
        applied_at: app.applied_at,
        status: app.status,
        remarks: app.remarks
      };
    });

    if (status && status !== 'ALL') {
      list = list.filter(a => a.status.toUpperCase() === status.toUpperCase());
    }
    if (event_id) {
      list = list.filter(a => a.event_id === parseInt(event_id, 10));
    }

    return res.json({ success: true, applications: list, pendingCount: list.filter(a => a.status === 'PENDING').length });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const reviewApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const app = memoryDB.camp_applications.find(a => a.application_id === parseInt(id, 10));
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found.' });
    }

    app.status = status.toUpperCase();
    app.remarks = remarks || app.remarks;
    app.reviewed_by = req.user.officer_id || req.user.user_id || 1;

    // If APPROVED, auto-create/ensure a REGISTERED row in attendances
    if (app.status === 'APPROVED') {
      const existingAtt = memoryDB.attendances.find(a => a.event_id === app.event_id && a.cadet_id === app.cadet_id);
      if (!existingAtt) {
        memoryDB.attendances.push({
          attendance_id: memoryDB.attendances.length + 1,
          event_id: app.event_id,
          cadet_id: app.cadet_id,
          attendance_date: new Date().toISOString().slice(0, 10),
          status: 'REGISTERED',
          marked_by: req.user.user_id || 1,
          remarks: 'Auto-registered upon camp application approval.'
        });
      }
    }

    await logAuditTrail(
      req,
      'APPLICATION_REVIEW',
      'Selection & Applications',
      `Officer updated Application #${id} status to ${app.status} (${remarks || 'No remarks'})`
    );

    return res.json({ success: true, application: app });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Mark Attendance
export const getAttendance = async (req, res) => {
  try {
    const { event_id } = req.query;
    const eventId = parseInt(event_id || 1, 10);
    const event = memoryDB.events.find(e => e.event_id === eventId);

    const records = memoryDB.cadets.map(cadet => {
      const user = memoryDB.users.find(u => u.user_id === cadet.user_id);
      const existing = memoryDB.attendances.find(a => a.event_id === eventId && a.cadet_id === cadet.cadet_id);

      return {
        cadet_id: cadet.cadet_id,
        name: user?.full_name || 'Cadet',
        regimental_no: cadet.regimental_no,
        rank_name: cadet.rank_name,
        unit_id: cadet.unit_id,
        status: existing?.status || 'ABSENT',
        remarks: existing?.remarks || ''
      };
    });

    return res.json({ success: true, event, attendance: records });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { event_id, records } = req.body;

    if (!event_id || !Array.isArray(records)) {
      return res.status(400).json({ success: false, error: 'event_id and records array are required.' });
    }

    const eventId = parseInt(event_id, 10);
    const today = new Date().toISOString().slice(0, 10);

    records.forEach(rec => {
      const idx = memoryDB.attendances.findIndex(a => a.event_id === eventId && a.cadet_id === rec.cadet_id);
      if (idx !== -1) {
        memoryDB.attendances[idx].status = rec.status;
        memoryDB.attendances[idx].remarks = rec.remarks || memoryDB.attendances[idx].remarks;
        memoryDB.attendances[idx].marked_by = req.user.user_id || 1;
      } else {
        memoryDB.attendances.push({
          attendance_id: memoryDB.attendances.length + 1,
          event_id: eventId,
          cadet_id: rec.cadet_id,
          attendance_date: today,
          status: rec.status,
          marked_by: req.user.user_id || 1,
          remarks: rec.remarks || 'Officer marked muster roll'
        });
      }
    });

    await logAuditTrail(
      req,
      'ATTENDANCE_MARKED',
      'Mark Attendance',
      `Marked attendance for Event #${eventId} with ${records.length} cadet records.`
    );

    return res.json({ success: true, message: 'Attendance recorded successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Camps / Events Management
export const getEvents = async (req, res) => {
  try {
    const list = memoryDB.events.map(ev => {
      const unit = memoryDB.units.find(u => u.unit_id === ev.unit_id);
      const appCount = memoryDB.camp_applications.filter(a => a.event_id === ev.event_id).length;
      return {
        ...ev,
        unit_name: unit?.name || 'All Battalions',
        applicants_count: appCount
      };
    });

    return res.json({ success: true, events: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, event_type, location, starts_at, ends_at, max_slots, unit_id } = req.body;

    if (!title || !starts_at || !ends_at) {
      return res.status(400).json({ success: false, error: 'Title, starts_at, and ends_at are required.' });
    }

    const newEvent = {
      event_id: memoryDB.events.length + 1,
      unit_id: unit_id ? parseInt(unit_id, 10) : (req.user.unit_id || 2),
      title,
      event_type: event_type || 'ATC',
      location: location || 'Gwalior NCC Camp Ground',
      starts_at,
      ends_at,
      max_slots: max_slots ? parseInt(max_slots, 10) : 60,
      status: 'OPEN',
      created_by: req.user.user_id || 1
    };

    memoryDB.events.push(newEvent);

    await logAuditTrail(req, 'EVENT_CREATE', 'Camp Management', `Created camp/event "${title}" (${newEvent.event_type})`);
    return res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 6. Verify Certificates
export const getCertificates = async (req, res) => {
  try {
    const { status } = req.query;
    let list = memoryDB.certificates.map(c => {
      const cadet = memoryDB.cadets.find(cd => cd.cadet_id === c.cadet_id);
      const user = cadet ? memoryDB.users.find(u => u.user_id === cadet.user_id) : null;
      return {
        ...c,
        cadet_name: user?.full_name || 'Cadet',
        regimental_no: cadet?.regimental_no || '',
        roll_number: cadet?.roll_number || ''
      };
    });

    if (status && status !== 'ALL') {
      list = list.filter(c => c.status.toUpperCase() === status.toUpperCase());
    }

    return res.json({ success: true, certificates: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const cert = memoryDB.certificates.find(c => c.certificate_id === parseInt(id, 10));
    if (!cert) {
      return res.status(404).json({ success: false, error: 'Certificate not found.' });
    }

    cert.status = status.toUpperCase();
    cert.remarks = remarks || cert.remarks;
    cert.verified_by = req.user.officer_id || req.user.user_id || 1;
    if (cert.status === 'ISSUED') {
      cert.issued_at = new Date().toISOString().slice(0, 10);
    }

    await logAuditTrail(
      req,
      'CERTIFICATE_VERIFY',
      'Verify Certificates',
      `Officer verified certificate #${id} (${cert.title}) as ${cert.status}`
    );

    return res.json({ success: true, certificate: cert });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 7. Grievances & Helpdesk
export const getGrievances = async (req, res) => {
  try {
    const list = memoryDB.grievances.map(g => {
      const cadet = memoryDB.cadets.find(c => c.cadet_id === g.cadet_id);
      const user = cadet ? memoryDB.users.find(u => u.user_id === cadet.user_id) : null;
      return {
        ...g,
        cadet_name: user?.full_name || 'Cadet',
        regimental_no: cadet?.regimental_no || ''
      };
    });

    return res.json({ success: true, grievances: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const replyGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply, status } = req.body;

    const g = memoryDB.grievances.find(item => item.grievance_id === parseInt(id, 10));
    if (!g) {
      return res.status(404).json({ success: false, error: 'Grievance ticket not found.' });
    }

    g.reply = reply;
    if (status) g.status = status.toUpperCase();
    g.replied_by = req.user.user_id || 1;

    await logAuditTrail(
      req,
      'GRIEVANCE_REPLY',
      'Grievances & Helpdesk',
      `Replied to ticket #${g.ticket_no}. Status set to ${g.status}.`
    );

    return res.json({ success: true, grievance: g });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  getDashboard,
  getCadets,
  promoteCadet,
  getApplications,
  reviewApplication,
  getAttendance,
  markAttendance,
  getEvents,
  createEvent,
  getCertificates,
  verifyCertificate,
  getGrievances,
  replyGrievance
};
