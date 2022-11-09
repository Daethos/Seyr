const express = require('express');
const router = express.Router();
const pvpCtrl = require('../../controllers/pvp');

/*---------- Public Routes ----------*/
router.get('/:id', pvpCtrl.init);
router.get('/render/:id', pvpCtrl.render)
router.put('/initiate', pvpCtrl.initiate)
router.get('/win/:id', pvpCtrl.playerWin);
router.get('/loss/:id', pvpCtrl.playerLoss);


/*---------- Protected Routes ----------*/

module.exports = router;