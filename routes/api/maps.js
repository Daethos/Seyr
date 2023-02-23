const express = require('express');
const router = express.Router();
const mapsCtrl = require('../../controllers/maps');
const protect = require('../../config/auth');

router.post('/create', protect, mapsCtrl.createMap);
router.put('/:asceanID', protect, mapsCtrl.saveMap);

module.exports = router;