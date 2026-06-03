const express = require('express');
const controller = require('../controllers/patientController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize('admin', 'clinician', 'receptionist'), controller.list);
router.get('/:id', authorize('admin', 'clinician', 'receptionist'), controller.get);
router.get('/:id/profile', authorize('admin', 'clinician', 'receptionist'), controller.profile);
router.post('/', authorize('admin', 'receptionist'), controller.create);
router.put('/:id', authorize('admin', 'clinician'), controller.update);
router.delete('/:id', authorize('admin'), controller.remove);

module.exports = router;
