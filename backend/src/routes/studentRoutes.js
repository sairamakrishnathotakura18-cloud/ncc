import express from 'express';
import studentController from '../controllers/studentController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Protected for Cadets
router.use(verifyToken);
router.use(requireRole('CADET', 'STUDENT'));

router.get('/dashboard', studentController.getDashboard);
router.put('/profile', studentController.updateProfile);

router.get('/camps', studentController.getCamps);
router.post('/camps/apply', studentController.applyCamp);

router.get('/certificates', studentController.getCertificates);
router.post('/certificates/upload', studentController.uploadCertificate);

router.get('/grievances', studentController.getGrievances);
router.post('/grievances', studentController.submitGrievance);

export default router;
