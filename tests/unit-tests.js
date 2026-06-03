const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../backend/middleware/auth');

process.env.JWT_SECRET = 'test-secret';

function createRes() {
  return {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(obj) {
      this.payload = obj;
      return this;
    }
  };
}

test('authenticate returns 401 when token is missing', async () => {
  const req = { headers: {} };
  const res = createRes();
  let nextCalled = false;

  authenticate(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.payload.message, 'Authorization token required');
});

test('authenticate allows valid token', async () => {
  const token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET);
  const req = { headers: { authorization: 'Bearer ' + token } };
  const res = createRes();
  let nextCalled = false;

  authenticate(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.role, 'admin');
});

test('authorize blocks invalid role', async () => {
  const req = { user: { role: 'receptionist' } };
  const res = createRes();
  let nextCalled = false;

  authorize('admin', 'clinician')(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 403);
});
