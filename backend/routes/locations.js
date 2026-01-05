const express = require('express');
const router = express.Router();
const controller = require('../controllers/locationsController');

router.get('/', controller.getLocations);
router.get('/:id', controller.getLocationById);
router.post('/', controller.createLocation);
router.put('/:id', controller.updateLocation);
router.delete('/:id', controller.deleteLocation);

module.exports = router;