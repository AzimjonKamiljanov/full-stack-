const db = require('../config/db');
const { sanitizeSearchQuery } = require('../utils/search');

const listDiagnoses = async ({ q }) => {
  const searchQuery = sanitizeSearchQuery(q);
  if (searchQuery) {
    const { rows } = await db.query(
      `SELECT d.*, p.name AS patient_name
       FROM diagnoses d
       LEFT JOIN patients p ON p.id = d.patient_id
       WHERE COALESCE(d.icd_code, '') ILIKE $1 OR COALESCE(d.description, '') ILIKE $1 OR COALESCE(p.name, '') ILIKE $1
       ORDER BY d.id DESC`,
      [`%${searchQuery}%`]
    );
    return rows;
  }

  const { rows } = await db.query(
    `SELECT d.*, p.name AS patient_name
     FROM diagnoses d
     LEFT JOIN patients p ON p.id = d.patient_id
     ORDER BY d.id DESC`
  );
  return rows;
};

const getDiagnosis = async (id) => {
  const { rows } = await db.query('SELECT * FROM diagnoses WHERE id = $1', [id]);
  return rows[0] || null;
};

const createDiagnosis = async (payload) => {
  const { icd_code, description, severity, patient_id } = payload;
  const { rows } = await db.query(
    `INSERT INTO diagnoses (icd_code, description, severity, patient_id)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [icd_code, description, severity, patient_id]
  );
  return rows[0];
};

const updateDiagnosis = async (id, payload) => {
  const { icd_code, description, severity, patient_id } = payload;
  const { rows } = await db.query(
    `UPDATE diagnoses
     SET icd_code = $1, description = $2, severity = $3, patient_id = $4
     WHERE id = $5 RETURNING *`,
    [icd_code, description, severity, patient_id, id]
  );
  return rows[0] || null;
};

const deleteDiagnosis = async (id) => {
  const { rowCount } = await db.query('DELETE FROM diagnoses WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = {
  listDiagnoses,
  getDiagnosis,
  createDiagnosis,
  updateDiagnosis,
  deleteDiagnosis
};
