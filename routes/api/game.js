const express = require('express');
const router = express.Router();
const gameCtrl = require('../../controllers/game');

/*---------- Public Routes ----------*/
router.put('/initiate', gameCtrl.initiate);
router.put('/instant', gameCtrl.instant);
router.put('/prayer', gameCtrl.prayer);
router.put('/phaser', gameCtrl.phaser);
router.put('/effect-tick', gameCtrl.phaserEffect);

/*---------- Protected Routes ----------*/

module.exports = router;