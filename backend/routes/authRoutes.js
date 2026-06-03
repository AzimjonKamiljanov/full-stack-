const express = require('express');
const controller = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', authenticate, authorize('admin'), controller.register);

module.exports = router;
