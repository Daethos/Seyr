const express = require('express');
const router = express.Router();
const questCtrl = require('../../controllers/quest');
const protect = require('../../config/auth');

router.post('/create/:id', protect, questCtrl.createQuest);

module.exports = router;