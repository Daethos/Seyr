const express = require('express');
const router = express.Router();
const gameCtrl = require('../../controllers/gamesettings');
const protect = require('../../config/auth');

// /*---------- Public Routes ----------*/

router.get('/', protect, gameCtrl.getSettings);
router.put('/', protect, gameCtrl.updateSettings);
router.delete('/', protect, gameCtrl.deleteSettings);
router.post('/', protect, gameCtrl.createSettings);

/*---------- Protected Routes ----------*/

module.exports = router;