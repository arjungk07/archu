// src/config/db.js
// MySQL connection pool using mysql2/promise
// Uses a pool (not a single connection) for better performance under load

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               process.env.DB_PORT     || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'locationdb',
  waitForConnections: true,   // queue queries when all connections are busy
  connectionLimit:    10,     // max simultaneous connections
  queueLimit:         0,      // unlimited queued requests
  charset:            'utf8mb4',
});

// Test the connection on startup
async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✅  MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('❌  MySQL connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = { pool, connectDB };