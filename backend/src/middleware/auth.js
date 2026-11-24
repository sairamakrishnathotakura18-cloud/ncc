import jwt from 'jsonwebtoken';
import { memoryDB } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ncc-jwt-secret-key-itm-2026';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Access denied. No authorization header provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, error: 'Invalid authorization format. Format is: Bearer <token>' });
  }

  const token = parts[1];

  // Support demo / development token formats
  if (token === 'jwt-demo-token-admin') {
    req.user = { id: 1, user_id: 1, role: 'ADMIN', email: 'admin@itmuniversity.ac.in', full_name: 'System Administrator' };
    return next();
  } else if (token === 'jwt-demo-token-officer') {
    req.user = { id: 2, user_id: 2, officer_id: 1, unit_id: 2, role: 'OFFICER', email: 'gaurav.singh@itmuniversity.ac.in', full_name: 'CTO Gaurav Singh' };
    return next();
  } else if (token === 'jwt-demo-token-student') {
    req.user = { id: 5, user_id: 5, cadet_id: 1, unit_id: 2, role: 'CADET', email: 'cadet@itmuniversity.ac.in', full_name: 'Cadet Sairam Krishna' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token.' });
  }
};

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Authentication required.' });
    }

    const userRole = String(req.user.role || '').toUpperCase();
    const normalizedAllowed = allowedRoles.map(r => String(r).toUpperCase());

    // Normalize CADET and STUDENT interchangeably
    const isCadetMatch = (userRole === 'CADET' || userRole === 'STUDENT') &&
      (normalizedAllowed.includes('CADET') || normalizedAllowed.includes('STUDENT'));

    if (normalizedAllowed.includes(userRole) || isCadetMatch) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: `Forbidden: Access requires one of [${allowedRoles.join(', ')}]. Current role: ${userRole}`
    });
  };
};

export default {
  verifyToken,
  requireRole
};
