const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app } = require('../backend/server');

test('health endpoint responds with ok', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('search endpoint requires auth token', async () => {
  const res = await request(app).get('/api/search?q=john');
  assert.equal(res.status, 401);
});
