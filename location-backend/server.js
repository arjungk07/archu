// server.js — Entry point

require('dotenv').config();

const express        = require('express');
const cors           = require('cors');
const { connectDB }  = require('./src/config/db');
const initDB         = require('./src/config/initDB');
const locationRoutes = require('./src/routes/location.routes');
const errorHandler   = require('./src/middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin:         process.env.FRONTEND_URL || 'http://localhost:5173',
  methods:        ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/locations', locationRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Boot ──────────────────────────────────────────────────────────────────────
(async () => {
  await connectDB();   // verify MySQL is reachable
  await initDB();      // create table if it doesn't exist

  app.listen(PORT, () => {
    console.log(`\n🚀  Server  →  http://localhost:${PORT}`);
    console.log(`📍  API     →  http://localhost:${PORT}/api/locations`);
    console.log(`💊  Health  →  http://localhost:${PORT}/health\n`);
  });
})();