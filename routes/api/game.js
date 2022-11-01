const express = require('express');
const router = express.Router();
const gameCtrl = require('../../controllers/game');

/*---------- Public Routes ----------*/
router.get('/:id', gameCtrl.init);
router.get('/render/:id', gameCtrl.render)
router.put('/initiate', gameCtrl.initiate)
router.get('/win/:id', gameCtrl.playerWin);
router.get('/loss/:id', gameCtrl.playerLoss);


/*---------- Protected Routes ----------*/

module.exports = router;