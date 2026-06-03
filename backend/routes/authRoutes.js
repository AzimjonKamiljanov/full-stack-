const express = require('express');
const rateLimit = require('express-rate-limit');
const controller = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

router.post('/login', authLimiter, controller.login);
router.post('/register', authLimiter, authenticate, authorize('admin'), controller.register);

module.exports = router;
