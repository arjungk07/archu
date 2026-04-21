// src/models/location.model.js

const { pool } = require('../config/db');

// INSERT a new location
async function create({ url_link, sender_name }) {
  const sql = `INSERT INTO shared_locations (url_link, sender_name) VALUES (?, ?)`;

  console.log('[Model] Running INSERT with:', { url_link, sender_name });
  const [result] = await pool.execute(sql, [url_link, sender_name]);
  console.log('[Model] INSERT result — insertId:', result.insertId, '| affectedRows:', result.affectedRows);

  const [rows] = await pool.execute(
    'SELECT * FROM shared_locations WHERE id = ?',
    [result.insertId]
  );

  console.log('[Model] Row fetched after insert:', rows[0]);
  return rows[0];
}

// GET all locations newest first
async function findAll() {
  const [rows] = await pool.execute(
    'SELECT * FROM shared_locations ORDER BY created_at DESC'
  );
  return rows;
}

// GET single location by ID
async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM shared_locations WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

// DELETE location by ID
async function deleteById(id) {
  const [result] = await pool.execute(
    'DELETE FROM shared_locations WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { create, findAll, findById, deleteById };