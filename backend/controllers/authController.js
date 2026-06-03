const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required' });
    }

    const user = await userModel.findByUsername(username);
    if (!user || !(await userModel.verifyPassword(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '8h' }
    );

    return res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'username, password and role are required' });
    }

    const existing = await userModel.findByUsername(username);
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const user = await userModel.createUser({ username, password, role });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

module.exports = { login, register };
