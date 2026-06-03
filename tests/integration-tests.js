const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app } = require('../backend/server');

process.env.JWT_SECRET = 'test-secret';
const adminToken = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET);

test('health endpoint responds with ok', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('search endpoint requires auth token', async () => {
  const res = await request(app).get('/api/search?q=john');
  assert.equal(res.status, 401);
});

test('login validation returns 400 when username or password is missing', async () => {
  const missingUsername = await request(app).post('/api/auth/login').send({ password: 'x' });
  const missingPassword = await request(app).post('/api/auth/login').send({ username: 'x' });
  assert.equal(missingUsername.status, 400);
  assert.equal(missingPassword.status, 400);
});

test('doctor validation returns 400 when name is missing', async () => {
  const res = await request(app)
    .post('/api/doctors')
    .set('Authorization', 'Bearer ' + adminToken)
    .send({ specialty: 'Cardiology' });
  assert.equal(res.status, 400);
});

test('patient validation returns 400 when name is missing', async () => {
  const res = await request(app)
    .post('/api/patients')
    .set('Authorization', 'Bearer ' + adminToken)
    .send({ personal_info: 'info' });
  assert.equal(res.status, 400);
});
