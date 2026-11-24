import express from 'express';
import adminController from '../controllers/adminController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Admin-only protection
router.use(verifyToken);
router.use(requireRole('ADMIN'));

router.get('/dashboard', adminController.getDashboard);

router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/officers', adminController.getOfficers);

router.get('/units', adminController.getUnits);
router.put('/units/:id', adminController.updateUnit);

router.get('/attendance', adminController.getAttendance);
router.post('/attendance/override', adminController.overrideAttendance);

router.get('/permissions', adminController.getRolePermissions);
router.post('/permissions', adminController.updateRolePermissions);

router.get('/cms', adminController.getCMS);
router.post('/cms', adminController.createCMS);
router.delete('/cms/:id', adminController.deleteCMS);

router.get('/analytics', adminController.getAnalytics);

router.get('/audit-logs', adminController.getAuditLogs);
router.get('/audit-logs/csv', adminController.exportAuditLogsCSV);

router.get('/settings', adminController.getSettings);
router.post('/settings', adminController.updateSettings);

export default router;
