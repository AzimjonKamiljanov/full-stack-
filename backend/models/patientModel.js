const db = require('../config/db');

const listPatients = async ({ q }) => {
  if (q) {
    const { rows } = await db.query(
      `SELECT p.*, d.name AS doctor_name
       FROM patients p
       LEFT JOIN doctors d ON d.id = p.doctor_id
       WHERE p.name ILIKE $1 OR COALESCE(p.personal_info, '') ILIKE $1 OR COALESCE(d.name, '') ILIKE $1
       ORDER BY p.id DESC`,
      [`%${q}%`]
    );
    return rows;
  }

  const { rows } = await db.query(
    `SELECT p.*, d.name AS doctor_name
     FROM patients p
     LEFT JOIN doctors d ON d.id = p.doctor_id
     ORDER BY p.id DESC`
  );
  return rows;
};

const getPatient = async (id) => {
  const { rows } = await db.query('SELECT * FROM patients WHERE id = $1', [id]);
  return rows[0] || null;
};

const createPatient = async (payload) => {
  const { name, personal_info, doctor_id } = payload;
  const { rows } = await db.query(
    `INSERT INTO patients (name, personal_info, doctor_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, personal_info, doctor_id]
  );
  return rows[0];
};

const updatePatient = async (id, payload) => {
  const { name, personal_info, doctor_id } = payload;
  const { rows } = await db.query(
    `UPDATE patients
     SET name = $1, personal_info = $2, doctor_id = $3
     WHERE id = $4 RETURNING *`,
    [name, personal_info, doctor_id, id]
  );
  return rows[0] || null;
};

const deletePatient = async (id) => {
  const { rowCount } = await db.query('DELETE FROM patients WHERE id = $1', [id]);
  return rowCount > 0;
};

const patientProfile = async (id) => {
  const patientRes = await db.query(
    `SELECT p.id, p.name, p.personal_info, p.doctor_id,
            d.name AS doctor_name, d.specialty, d.department, d.contact_info
     FROM patients p
     LEFT JOIN doctors d ON d.id = p.doctor_id
     WHERE p.id = $1`,
    [id]
  );

  const patient = patientRes.rows[0];
  if (!patient) return null;

  const diagRes = await db.query(
    `SELECT id, icd_code, description, severity, patient_id
     FROM diagnoses
     WHERE patient_id = $1
     ORDER BY id DESC`,
    [id]
  );

  return { ...patient, diagnoses: diagRes.rows };
};

module.exports = {
  listPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  patientProfile
};
