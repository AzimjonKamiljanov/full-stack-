const diagnosisModel = require('../models/diagnosisModel');

const list = async (req, res) => {
  const diagnoses = await diagnosisModel.listDiagnoses({ q: req.query.q });
  res.json(diagnoses);
};

const get = async (req, res) => {
  const diagnosis = await diagnosisModel.getDiagnosis(req.params.id);
  if (!diagnosis) return res.status(404).json({ message: 'Diagnosis not found' });
  return res.json(diagnosis);
};

const create = async (req, res) => {
  const created = await diagnosisModel.createDiagnosis(req.body);
  return res.status(201).json(created);
};

const update = async (req, res) => {
  const updated = await diagnosisModel.updateDiagnosis(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Diagnosis not found' });
  return res.json(updated);
};

const remove = async (req, res) => {
  const ok = await diagnosisModel.deleteDiagnosis(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Diagnosis not found' });
  return res.status(204).send();
};

module.exports = { list, get, create, update, remove };
