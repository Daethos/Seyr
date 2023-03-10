const express = require('express');
const router = express.Router();
const asceanCtrl = require('../../controllers/ascean');
const protect = require('../../config/auth')

// /*---------- Public Routes ----------*/
router.get('/', protect, asceanCtrl.index);
router.get('/lean', protect, asceanCtrl.quickIndex);
router.get('/search/', protect, asceanCtrl.searchAscean);
router.get('/:id', protect, asceanCtrl.getOneAscean);
router.get('/firewater/:id', protect, asceanCtrl.drinkFirewater);
router.get('/restoreFirewater/:id', protect, asceanCtrl.restoreFirewater);
router.get('/replenishFirewater/:id', protect, asceanCtrl.replenishFirewater);
router.get('/stats/:id', protect, asceanCtrl.getAsceanStats);
router.put('/coords', protect, asceanCtrl.saveCoordinates)
router.put('/highscore', protect, asceanCtrl.updateHighScore);
router.put('/exp', protect, asceanCtrl.saveExperience);
router.put('/purchase', protect, asceanCtrl.purchaseToInventory)
router.put('/levelup', protect, asceanCtrl.updateLevel);
router.put('/inventory', protect, asceanCtrl.saveToInventory);
router.put('/:id/swap', protect, asceanCtrl.swapItems);
router.put('/remove/:id', protect, asceanCtrl.removeItem);
router.put('/:id', protect, asceanCtrl.editAscean);
router.post('/', protect, asceanCtrl.create);
router.post('/animal', protect, asceanCtrl.animalStats)
router.delete('/:id', protect, asceanCtrl.delete);
/*---------- Protected Routes ----------*/

module.exports = router;