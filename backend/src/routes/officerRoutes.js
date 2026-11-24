import express from 'express';
import officerController from '../controllers/officerController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Protected for Officers & Admins
router.use(verifyToken);
router.use(requireRole('OFFICER', 'ADMIN'));

router.get('/dashboard', officerController.getDashboard);

router.get('/cadets', officerController.getCadets);
router.post('/cadets/:id/promote', officerController.promoteCadet);

router.get('/applications', officerController.getApplications);
router.post('/applications/:id/review', officerController.reviewApplication);

router.get('/attendance', officerController.getAttendance);
router.post('/attendance/mark', officerController.markAttendance);

router.get('/events', officerController.getEvents);
router.post('/events', officerController.createEvent);

router.get('/certificates', officerController.getCertificates);
router.post('/certificates/:id/verify', officerController.verifyCertificate);

router.get('/grievances', officerController.getGrievances);
router.post('/grievances/:id/reply', officerController.replyGrievance);

export default router;
