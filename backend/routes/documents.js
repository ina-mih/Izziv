const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentsController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createDocument);
router.post('/:id/confirm', auth, controller.confirmDocument);
router.get('/', auth, controller.getDocuments);

module.exports = router;