CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255),
  department VARCHAR(255),
  contact_info VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  personal_info TEXT,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS diagnoses (
  id SERIAL PRIMARY KEY,
  icd_code VARCHAR(50),
  description TEXT,
  severity VARCHAR(50),
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'clinician', 'receptionist')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_diagnoses_patient_id ON diagnoses(patient_id);

-- Demo users (password: password123)
INSERT INTO users (username, password_hash, role)
VALUES
  ('admin1', '$2a$10$gOzzjPrxk1OHRSpkunOQBeSIlcv7iuuI/zdLuP/.iNClQhLQXP7VS', 'admin'),
  ('clinician1', '$2a$10$gOzzjPrxk1OHRSpkunOQBeSIlcv7iuuI/zdLuP/.iNClQhLQXP7VS', 'clinician'),
  ('reception1', '$2a$10$gOzzjPrxk1OHRSpkunOQBeSIlcv7iuuI/zdLuP/.iNClQhLQXP7VS', 'receptionist')
ON CONFLICT (username) DO NOTHING;
