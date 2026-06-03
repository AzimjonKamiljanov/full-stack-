require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const { authenticate, authorize } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/diagnoses', diagnosisRoutes);

app.get('/api/search', authenticate, authorize('admin', 'clinician', 'receptionist'), async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) {
    return res.status(400).json({ message: 'q query parameter is required' });
  }

  const [doctors, patients, diagnoses] = await Promise.all([
    db.query('SELECT * FROM doctors WHERE name ILIKE $1 OR specialty ILIKE $1 OR department ILIKE $1 LIMIT 20', [`%${q}%`]),
    db.query('SELECT * FROM patients WHERE name ILIKE $1 OR COALESCE(personal_info, \'\') ILIKE $1 LIMIT 20', [`%${q}%`]),
    db.query('SELECT * FROM diagnoses WHERE COALESCE(icd_code, \'\') ILIKE $1 OR COALESCE(description, \'\') ILIKE $1 LIMIT 20', [`%${q}%`])
  ]);

  return res.json({
    doctors: doctors.rows,
    patients: patients.rows,
    diagnoses: diagnoses.rows
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = Number(process.env.PORT || 4000);
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CareTrack backend running on port ${PORT}`);
  });
}

module.exports = { app };
