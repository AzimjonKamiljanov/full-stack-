const db = require('../config/db');
const { sanitizeSearchQuery } = require('../utils/search');

const listDoctors = async ({ q }) => {
  const searchQuery = sanitizeSearchQuery(q);
  if (searchQuery) {
    const { rows } = await db.query(
      `SELECT * FROM doctors
       WHERE name ILIKE $1 OR specialty ILIKE $1 OR department ILIKE $1
       ORDER BY id DESC`,
      [`%${searchQuery}%`]
    );
    return rows;
  }

  const { rows } = await db.query('SELECT * FROM doctors ORDER BY id DESC');
  return rows;
};

const getDoctor = async (id) => {
  const { rows } = await db.query('SELECT * FROM doctors WHERE id = $1', [id]);
  return rows[0] || null;
};

const createDoctor = async (payload) => {
  const { name, specialty, department, contact_info } = payload;
  const { rows } = await db.query(
    `INSERT INTO doctors (name, specialty, department, contact_info)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, specialty, department, contact_info]
  );
  return rows[0];
};

const updateDoctor = async (id, payload) => {
  const { name, specialty, department, contact_info } = payload;
  const { rows } = await db.query(
    `UPDATE doctors
     SET name = $1, specialty = $2, department = $3, contact_info = $4
     WHERE id = $5 RETURNING *`,
    [name, specialty, department, contact_info, id]
  );
  return rows[0] || null;
};

const deleteDoctor = async (id) => {
  const { rowCount } = await db.query('DELETE FROM doctors WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = { listDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor };
