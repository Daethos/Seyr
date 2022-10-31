const express = require('express');
const router = express.Router();
const gameCtrl = require('../../controllers/game');

/*---------- Public Routes ----------*/
router.get('/:id', gameCtrl.init);
router.get('/render/:id', gameCtrl.render)
router.get('/initiate', gameCtrl.initiate)
router.get('/attack/:id', gameCtrl.attack)
router.get('/dodge/:id', gameCtrl.dodge)
router.get('/parry/:id', gameCtrl.parry)
router.get('/posture/:id', gameCtrl.posture)
router.get('/roll/:id', gameCtrl.roll)
router.get('/win/:id', gameCtrl.playerWin);
router.get('/loss/:id', gameCtrl.playerLoss);


/*---------- Protected Routes ----------*/

module.exports = router;