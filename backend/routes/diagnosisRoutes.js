const express = require('express');
const controller = require('../controllers/diagnosisController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize('admin', 'clinician'), controller.list);
router.get('/:id', authorize('admin', 'clinician'), controller.get);
router.post('/', authorize('admin'), controller.create);
router.put('/:id', authorize('admin', 'clinician'), controller.update);
router.delete('/:id', authorize('admin'), controller.remove);

module.exports = router;
