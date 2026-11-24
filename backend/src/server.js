import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import officerRoutes from './routes/officerRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import { memoryDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all local development origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[REST API] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ITM University NCC Digital Management Ecosystem REST API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Public Stats for landing / previews
app.get('/api/stats', (req, res) => {
  const totalCadets = memoryDB.cadets.length;
  const totalUnits = memoryDB.units.length;
  const totalCamps = memoryDB.events.length;
  const totalCertificates = memoryDB.certificates.length;

  res.json({
    totalCadets,
    activeCadets: totalCadets,
    totalUnits,
    totalCamps,
    totalCertificates,
    establishedYear: 1965
  });
});

// Public notices
app.get('/api/notices', (req, res) => {
  res.json(memoryDB.announcements);
});

// Public camps
app.get('/api/camps', (req, res) => {
  res.json(memoryDB.events);
});

// Mount Centralized Domain Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/officer', officerRoutes);
app.use('/api/student', studentRoutes);

// 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: `Endpoint ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🚀 NCC Management REST API is running at http://localhost:${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`================================================================`);
});

export default app;
