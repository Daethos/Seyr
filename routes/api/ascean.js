const express = require('express');
const router = express.Router();
const asceanCtrl = require('../../controllers/ascean');
const protect = require('../../config/auth')

// /*---------- Public Routes ----------*/
router.get('/', protect, asceanCtrl.index);
router.get('/:id', protect, asceanCtrl.getOneAscean);
router.get('/stats/:id', protect, asceanCtrl.getAsceanStats);
router.put('/highscore', protect, asceanCtrl.updateHighScore);
router.put('/levelup', protect, asceanCtrl.updateLevel);
router.put('/:id', protect, asceanCtrl.editAscean);
router.put('/item/:id', protect, asceanCtrl.saveItemToAscean);
router.post('/', protect, asceanCtrl.create);
router.delete('/:id', protect, asceanCtrl.delete);
/*---------- Protected Routes ----------*/


module.exports = router;