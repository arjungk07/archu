// src/config/initDB.js
// Runs once on startup — creates the table if it doesn't exist yet.
// No manual SQL setup needed.

const { pool } = require('./db');

async function initDB() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS shared_locations (
      id          INT           NOT NULL AUTO_INCREMENT,
      url_link    TEXT          NOT NULL,
      sender_name VARCHAR(100)  NOT NULL DEFAULT 'Anonymous User',
      created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await pool.query(createTableSQL);
    console.log('✅  Table "shared_locations" is ready');
  } catch (err) {
    console.error('❌  Failed to initialize table:', err.message);
    process.exit(1);
  }
}

module.exports = initDB;