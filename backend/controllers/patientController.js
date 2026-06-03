const patientModel = require('../models/patientModel');

const list = async (req, res) => {
  const patients = await patientModel.listPatients({ q: req.query.q });
  res.json(patients);
};

const get = async (req, res) => {
  const patient = await patientModel.getPatient(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  return res.json(patient);
};

const profile = async (req, res) => {
  const profileData = await patientModel.patientProfile(req.params.id);
  if (!profileData) return res.status(404).json({ message: 'Patient not found' });
  return res.json(profileData);
};

const create = async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Patient name is required' });
  const created = await patientModel.createPatient(req.body);
  return res.status(201).json(created);
};

const update = async (req, res) => {
  const updated = await patientModel.updatePatient(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Patient not found' });
  return res.json(updated);
};

const remove = async (req, res) => {
  const ok = await patientModel.deletePatient(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Patient not found' });
  return res.status(204).send();
};

module.exports = { list, get, profile, create, update, remove };
