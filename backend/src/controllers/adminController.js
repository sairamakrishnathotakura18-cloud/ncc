import bcrypt from 'bcryptjs';
import { executeQuery, memoryDB } from '../config/db.js';
import { logAuditTrail } from '../middleware/audit.js';

// 1. System Dashboard Stats
export const getDashboard = async (req, res) => {
  try {
    const totalUsers = memoryDB.users.length;
    const totalCadets = memoryDB.cadets.length;
    const activeOfficers = memoryDB.officers.length;
    const totalUnits = memoryDB.units.length;
    const totalCamps = memoryDB.events.length;
    const certificatesIssued = memoryDB.certificates.filter(c => c.status === 'ISSUED').length;

    // Unit cadet breakdown
    const unit1Count = memoryDB.cadets.filter(c => c.unit_id === 1).length; // 3 MP Girls
    const unit2Count = memoryDB.cadets.filter(c => c.unit_id === 2).length; // 8 MP Girls and Boys
    const unit3Count = memoryDB.cadets.filter(c => c.unit_id === 3).length; // 3 MP Naval

    const cadetDistribution = [
      { unit_id: 2, name: 'Army Unit (8 MP Art Bn)', count: unit2Count, color: '#071D3A' },
      { unit_id: 1, name: 'Girls Battalion (3 MP Girls Bn)', count: unit1Count, color: '#7B1FA2' },
      { unit_id: 3, name: 'Naval Unit (3 MP Naval)', count: unit3Count, color: '#1677FF' }
    ];

    const recentAuditLogs = memoryDB.audit_logs.slice(0, 10);
    const settings = memoryDB.settings;

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalCadets,
        activeOfficers,
        totalUnits,
        totalCamps,
        certificatesIssued
      },
      cadetDistribution,
      recentAuditLogs,
      settings
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 2. User Management (CRUD)
export const getUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    let list = memoryDB.users.map(u => {
      const { password_hash, ...rest } = u;
      return rest;
    });

    if (role && role !== 'ALL') {
      list = list.filter(u => u.role.toUpperCase() === role.toUpperCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u =>
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.mobile && u.mobile.includes(q))
      );
    }

    return res.json({ success: true, users: list, total: list.length });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { full_name, email, mobile, role, password, unit_id, rank_name } = req.body;

    if (!full_name || !email || !role) {
      return res.status(400).json({ success: false, error: 'Full name, email, and role are required.' });
    }

    const exists = memoryDB.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ success: false, error: 'A user with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password || 'Password@123', salt);

    const newUser = {
      user_id: memoryDB.users.length + 1,
      full_name,
      email: email.toLowerCase(),
      mobile: mobile || '+91 94250 00000',
      password_hash,
      role: role.toUpperCase(),
      profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      is_active: 1,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    memoryDB.users.push(newUser);

    // If cadet or officer, also create related entity
    if (newUser.role === 'CADET') {
      const newCadet = {
        cadet_id: memoryDB.cadets.length + 1,
        user_id: newUser.user_id,
        unit_id: parseInt(unit_id || 2, 10),
        regimental_no: `MP/2026/SD/${1200 + memoryDB.cadets.length + 1}`,
        roll_number: `BETN1A125${220 + memoryDB.cadets.length}`,
        rank_name: rank_name || 'Cadet',
        course: 'B.Tech CSE',
        semester: '1st Semester',
        enlisted_at: new Date().toISOString().slice(0, 10)
      };
      memoryDB.cadets.push(newCadet);
    } else if (newUser.role === 'OFFICER') {
      const newOfficer = {
        officer_id: memoryDB.officers.length + 1,
        user_id: newUser.user_id,
        unit_id: parseInt(unit_id || 2, 10),
        rank_name: rank_name || 'CTO',
        officer_code: `ANO/ITM/2026/0${memoryDB.officers.length + 1}`,
        commissioned_at: new Date().toISOString().slice(0, 10)
      };
      memoryDB.officers.push(newOfficer);
    }

    await logAuditTrail(req, 'USER_CREATE', 'User Management', `Admin created user ${newUser.email} with role ${newUser.role}`);

    const { password_hash: _, ...safeUser } = newUser;
    return res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const user = memoryDB.users.find(u => u.user_id === userId);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const { full_name, mobile, is_active, role } = req.body;
    if (full_name !== undefined) user.full_name = full_name;
    if (mobile !== undefined) user.mobile = mobile;
    if (is_active !== undefined) user.is_active = is_active ? 1 : 0;
    if (role !== undefined) user.role = role.toUpperCase();

    await logAuditTrail(req, 'USER_UPDATE', 'User Management', `Admin updated user #${userId} (${user.email})`);

    const { password_hash, ...safeUser } = user;
    return res.json({ success: true, user: safeUser });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const index = memoryDB.users.findIndex(u => u.user_id === userId);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const [deleted] = memoryDB.users.splice(index, 1);
    await logAuditTrail(req, 'USER_DELETE', 'User Management', `Admin deleted user #${userId} (${deleted.email})`);

    return res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Officers Management
export const getOfficers = async (req, res) => {
  try {
    const list = memoryDB.officers.map(o => {
      const user = memoryDB.users.find(u => u.user_id === o.user_id);
      const unit = memoryDB.units.find(u => u.unit_id === o.unit_id);
      return {
        officer_id: o.officer_id,
        user_id: o.user_id,
        name: user?.full_name || 'Officer',
        email: user?.email || '',
        mobile: user?.mobile || '',
        profile_photo: user?.profile_photo || '',
        rank_name: o.rank_name,
        officer_code: o.officer_code,
        commissioned_at: o.commissioned_at,
        unit_id: o.unit_id,
        unit_name: unit?.name || 'NCC Unit',
        is_active: user?.is_active ?? 1
      };
    });
    return res.json({ success: true, officers: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Unit Configuration
export const getUnits = async (req, res) => {
  try {
    const list = memoryDB.units.map(u => {
      const co = memoryDB.officers.find(o => o.officer_id === u.commanding_officer_id);
      const coUser = co ? memoryDB.users.find(usr => usr.user_id === co.user_id) : null;
      const cadetCount = memoryDB.cadets.filter(c => c.unit_id === u.unit_id).length;

      return {
        unit_id: u.unit_id,
        name: u.name,
        location: u.location,
        established_year: u.established_year,
        quota: u.quota,
        cadet_count: cadetCount,
        commanding_officer_id: u.commanding_officer_id,
        commanding_officer_name: coUser ? `${co.rank_name} ${coUser.full_name}` : 'Not Assigned'
      };
    });

    return res.json({ success: true, units: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unitId = parseInt(id, 10);
    const unit = memoryDB.units.find(u => u.unit_id === unitId);

    if (!unit) {
      return res.status(404).json({ success: false, error: 'Unit not found.' });
    }

    const { name, location, quota, commanding_officer_id } = req.body;
    if (name) unit.name = name;
    if (location) unit.location = location;
    if (quota) unit.quota = parseInt(quota, 10);
    if (commanding_officer_id) unit.commanding_officer_id = parseInt(commanding_officer_id, 10);

    await logAuditTrail(req, 'UNIT_UPDATE', 'Unit Configuration', `Updated unit #${unitId} (${unit.name})`);
    return res.json({ success: true, unit });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Attendance Full Control & Override
export const getAttendance = async (req, res) => {
  try {
    const { date, unit_id, event_id } = req.query;
    let list = memoryDB.attendances.map(a => {
      const cadet = memoryDB.cadets.find(c => c.cadet_id === a.cadet_id);
      const user = cadet ? memoryDB.users.find(u => u.user_id === cadet.user_id) : null;
      const event = memoryDB.events.find(e => e.event_id === a.event_id);
      const unit = cadet ? memoryDB.units.find(u => u.unit_id === cadet.unit_id) : null;

      return {
        attendance_id: a.attendance_id,
        event_id: a.event_id,
        event_title: event?.title || 'NCC Session',
        cadet_id: a.cadet_id,
        cadet_name: user?.full_name || 'Cadet',
        regimental_no: cadet?.regimental_no || '',
        roll_number: cadet?.roll_number || '',
        unit_id: cadet?.unit_id || null,
        unit_name: unit?.name || '',
        attendance_date: a.attendance_date,
        status: a.status,
        remarks: a.remarks,
        marked_by: a.marked_by
      };
    });

    if (unit_id && unit_id !== 'ALL') {
      list = list.filter(a => a.unit_id === parseInt(unit_id, 10));
    }
    if (date) {
      list = list.filter(a => a.attendance_date === date);
    }
    if (event_id) {
      list = list.filter(a => a.event_id === parseInt(event_id, 10));
    }

    const presentCount = list.filter(a => a.status === 'PRESENT').length;
    const totalCount = list.length || 1;
    const percentage = Math.round((presentCount / totalCount) * 100);

    return res.json({ success: true, attendance: list, stats: { total: list.length, present: presentCount, percentage } });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const overrideAttendance = async (req, res) => {
  try {
    const { attendance_id, new_status, reason } = req.body;

    if (!attendance_id || !new_status || !reason) {
      return res.status(400).json({ success: false, error: 'attendance_id, new_status, and mandatory reason are required.' });
    }

    const record = memoryDB.attendances.find(a => a.attendance_id === parseInt(attendance_id, 10));
    if (!record) {
      return res.status(404).json({ success: false, error: 'Attendance record not found.' });
    }

    const oldStatus = record.status;
    record.status = new_status.toUpperCase();
    record.remarks = `[Admin Override: ${reason}] ${record.remarks || ''}`;

    await logAuditTrail(
      req,
      'ATTENDANCE_OVERRIDE',
      'Attendance Full Control',
      `Admin changed Cadet #${record.cadet_id} attendance from ${oldStatus} -> ${record.status}. Reason: ${reason}`
    );

    return res.json({ success: true, record });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 6. Role & Permissions Matrix
export const getRolePermissions = async (req, res) => {
  try {
    return res.json({ success: true, permissions: memoryDB.role_permissions });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateRolePermissions = async (req, res) => {
  try {
    const { role, permission, allowed } = req.body;
    const target = memoryDB.role_permissions.find(p => p.role === role && p.permission === permission);

    if (target) {
      target.allowed = Boolean(allowed);
    } else {
      memoryDB.role_permissions.push({ role, permission, allowed: Boolean(allowed) });
    }

    await logAuditTrail(req, 'PERMISSIONS_UPDATE', 'Role & Permissions Matrix', `Updated permission ${permission} for ${role} to ${allowed}`);
    return res.json({ success: true, message: 'Permission updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 7. Website Content CMS (Announcements)
export const getCMS = async (req, res) => {
  try {
    return res.json({ success: true, announcements: memoryDB.announcements });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const createCMS = async (req, res) => {
  try {
    const { title, body, category, priority, target_audience, unit_id } = req.body;
    if (!title || !body) {
      return res.status(400).json({ success: false, error: 'Title and body are required.' });
    }

    const newAnnouncement = {
      announcement_id: memoryDB.announcements.length + 1,
      title,
      body,
      category: category || 'General',
      priority: (priority || 'NORMAL').toUpperCase(),
      target_audience: target_audience || 'ALL',
      unit_id: unit_id ? parseInt(unit_id, 10) : null,
      posted_by: req.user.user_id || 1,
      posted_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    memoryDB.announcements.unshift(newAnnouncement);
    await logAuditTrail(req, 'CMS_NOTICE_PUBLISH', 'Website Content CMS', `Published announcement: "${title}"`);

    return res.status(201).json({ success: true, announcement: newAnnouncement });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteCMS = async (req, res) => {
  try {
    const { id } = req.params;
    const annId = parseInt(id, 10);
    const index = memoryDB.announcements.findIndex(a => a.announcement_id === annId);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Announcement not found.' });
    }

    const [deleted] = memoryDB.announcements.splice(index, 1);
    await logAuditTrail(req, 'CMS_NOTICE_DELETE', 'Website Content CMS', `Deleted announcement: "${deleted.title}"`);

    return res.json({ success: true, message: 'Announcement deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 8. System Analytics
export const getAnalytics = async (req, res) => {
  try {
    const attendances = memoryDB.attendances;
    const presentCount = attendances.filter(a => a.status === 'PRESENT').length;
    const totalAttendanceRecords = attendances.length || 1;
    const overallAttendanceRate = Math.round((presentCount / totalAttendanceRecords) * 100);

    const unitCounts = {
      army: memoryDB.cadets.filter(c => c.unit_id === 2).length,
      girls: memoryDB.cadets.filter(c => c.unit_id === 1).length,
      naval: memoryDB.cadets.filter(c => c.unit_id === 3).length
    };

    const campStats = {
      totalEvents: memoryDB.events.length,
      totalApplications: memoryDB.camp_applications.length,
      approvedApplications: memoryDB.camp_applications.filter(a => a.status === 'APPROVED').length,
      pendingApplications: memoryDB.camp_applications.filter(a => a.status === 'PENDING').length
    };

    const monthlyTrends = [
      { month: 'Jul', attendance: 88, enrollments: 6 },
      { month: 'Aug', attendance: 92, enrollments: 12 },
      { month: 'Sep', attendance: 90, enrollments: 4 },
      { month: 'Oct', attendance: 94, enrollments: 2 },
      { month: 'Nov', attendance: overallAttendanceRate, enrollments: 0 }
    ];

    return res.json({
      success: true,
      analytics: {
        overallAttendanceRate,
        unitCounts,
        campStats,
        monthlyTrends
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 9. System Audit Logs (+ CSV export)
export const getAuditLogs = async (req, res) => {
  try {
    const { module: mod, search, limit = 50 } = req.query;
    let logs = [...memoryDB.audit_logs];

    if (mod && mod !== 'ALL') {
      logs = logs.filter(l => l.module.toLowerCase() === mod.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      logs = logs.filter(l =>
        l.details.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, logs: logs.slice(0, parseInt(limit, 10)), total: logs.length });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const exportAuditLogsCSV = async (req, res) => {
  try {
    const logs = memoryDB.audit_logs;
    const header = 'Log ID,Timestamp,Role,Action,Module,Details,IP Address\n';
    const rows = logs.map(l =>
      `"${l.log_id}","${l.created_at}","${l.role}","${l.action}","${l.module}","${(l.details || '').replace(/"/g, '""')}","${l.ip_address}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="ncc_audit_logs.csv"');
    return res.send(header + rows);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 10. System Settings
export const getSettings = async (req, res) => {
  try {
    return res.json({ success: true, settings: memoryDB.settings });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, val] of Object.entries(updates)) {
      memoryDB.settings[key] = String(val);
    }

    await logAuditTrail(
      req,
      'SETTINGS_UPDATE',
      'System Settings',
      `Updated settings: ${JSON.stringify(updates)}`
    );

    return res.json({ success: true, settings: memoryDB.settings });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  getDashboard,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getOfficers,
  getUnits,
  updateUnit,
  getAttendance,
  overrideAttendance,
  getRolePermissions,
  updateRolePermissions,
  getCMS,
  createCMS,
  deleteCMS,
  getAnalytics,
  getAuditLogs,
  exportAuditLogsCSV,
  getSettings,
  updateSettings
};
