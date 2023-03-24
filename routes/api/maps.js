const express = require('express');
const router = express.Router();
const mapsCtrl = require('../../controllers/maps');
const protect = require('../../config/auth');

router.get('/fetch/:asceanID', protect, mapsCtrl.fetchMap);
router.post('/create', protect, mapsCtrl.createMap);
router.post('/arena', protect, mapsCtrl.arenaMap);
router.put('/:asceanID', protect, mapsCtrl.saveMap);

module.exports = router;