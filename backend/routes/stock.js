const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockController');

router.get('/', controller.getAllStock);
router.patch('/update', controller.updateStock);

module.exports = router;