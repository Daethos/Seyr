const express = require('express');
const router = express.Router();
const gameCtrl = require('../../controllers/game');

/*---------- Public Routes ----------*/
router.get('/:id', gameCtrl.init);
router.get('/render/:id', gameCtrl.render)
router.put('/attack/:id', gameCtrl.attack)
router.put('/dodge/:id', gameCtrl.dodge)
router.put('/parry/:id', gameCtrl.parry)
router.put('/posture/:id', gameCtrl.posture)
router.put('/roll/:id', gameCtrl.roll)
router.get('/win/:id', gameCtrl.playerWin);
router.get('/loss/:id', gameCtrl.playerLoss);


/*---------- Protected Routes ----------*/

module.exports = router;