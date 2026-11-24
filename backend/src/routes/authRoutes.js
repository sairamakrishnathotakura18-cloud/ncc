import express from 'express';
import authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);
router.post('/logout', verifyToken, authController.logout);
router.post('/change-password', verifyToken, authController.changePassword);

export default router;
