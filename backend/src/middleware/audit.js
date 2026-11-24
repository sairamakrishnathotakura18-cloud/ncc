import { logAudit } from '../config/db.js';

export const logAuditTrail = async (req, action, moduleName, details) => {
  try {
    const userId = req?.user?.user_id || req?.user?.id || null;
    const role = req?.user?.role || 'SYSTEM';
    const ip = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || '127.0.0.1';
    await logAudit(userId, role, action, moduleName, details, ip);
  } catch (err) {
    console.error('[Audit Middleware] Failed to record log:', err.message);
  }
};

export const auditMiddleware = (action, moduleName, detailsExtractor) => {
  return async (req, res, next) => {
    // Record original send to log after successful response
    const originalSend = res.send;
    res.send = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        let details = typeof detailsExtractor === 'function' ? detailsExtractor(req, res) : (detailsExtractor || '');
        logAuditTrail(req, action, moduleName, details).catch(() => {});
      }
      return originalSend.apply(res, arguments);
    };
    next();
  };
};

export default {
  logAuditTrail,
  auditMiddleware
};
