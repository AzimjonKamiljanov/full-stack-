const doctorModel = require('../models/doctorModel');

const list = async (req, res) => {
  const doctors = await doctorModel.listDoctors({ q: req.query.q });
  res.json(doctors);
};

const get = async (req, res) => {
  const doctor = await doctorModel.getDoctor(req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  return res.json(doctor);
};

const create = async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Doctor name is required' });
  const created = await doctorModel.createDoctor(req.body);
  return res.status(201).json(created);
};

const update = async (req, res) => {
  const updated = await doctorModel.updateDoctor(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Doctor not found' });
  return res.json(updated);
};

const remove = async (req, res) => {
  const ok = await doctorModel.deleteDoctor(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Doctor not found' });
  return res.status(204).send();
};

module.exports = { list, get, create, update, remove };
