const bcrypt = require('bcryptjs');
const db = require('../config/db');

const findByUsername = async (username) => {
  const { rows } = await db.query('SELECT id, username, password_hash, role FROM users WHERE username = $1', [username]);
  return rows[0] || null;
};

const createUser = async ({ username, password, role }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await db.query(
    'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role',
    [username, passwordHash, role]
  );
  return rows[0];
};

const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = { findByUsername, createUser, verifyPassword };
