const express = require('express');
const router = express.Router();
const gameCtrl = require('../../controllers/game');
const app = express();

/*---------- Public Routes ----------*/
router.put('/initiate', gameCtrl.initiate)
router.put('/instant', gameCtrl.instant)
router.put('/prayer', gameCtrl.prayer)
router.put('/pvp', gameCtrl.pvp)

/*---------- Protected Routes ----------*/

module.exports = router;