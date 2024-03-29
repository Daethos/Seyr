const express = require('express');
const router = express.Router();
const asceanCtrl = require('../../controllers/ascean');
const protect = require('../../config/auth')

// /*---------- Public Routes ----------*/

router.get('/', protect, asceanCtrl.index);
router.get('/lean', protect, asceanCtrl.quickIndex);
router.get('/search/', protect, asceanCtrl.searchAscean);
router.get('/:id', protect, asceanCtrl.getOneAscean);
router.get('/clean/:id', protect, asceanCtrl.getOneAsceanClean);
router.get('/light/:id', protect, asceanCtrl.getOneAsceanLight);
router.get('/inventory/:id', protect, asceanCtrl.getAsceanInventory);
router.get('/ascean-inventory/:id', protect, asceanCtrl.getAsceanAndInventory);
router.get('/stats/:id', protect, asceanCtrl.getAsceanStats);
router.get('/bless/:id', protect, asceanCtrl.blessAscean);
router.get('/curse/:id', protect, asceanCtrl.curseAscean);
router.get('/firewater/:id', protect, asceanCtrl.drinkFirewater);
router.get('/health/:health/:id', protect, asceanCtrl.updateHealth);
router.get('/kill/:id', protect, asceanCtrl.killAscean);
router.get('/replenishFirewater/:id', protect, asceanCtrl.replenishFirewater);
router.get('/restoreFirewater/:id', protect, asceanCtrl.restoreFirewater);
router.get('/sacrificeExp/:id', protect, asceanCtrl.sacrificeExp);
router.get('/tutorial/:id/:tutorial', protect, asceanCtrl.firstTutorial);
router.get('/:tax/:id', protect, asceanCtrl.asceanTax);

router.put('/coords', protect, asceanCtrl.saveCoordinates);
router.put('/evaluateDeity', protect, asceanCtrl.evaluateDeity);
router.put('/highscore', protect, asceanCtrl.updateHighScore);
router.put('/journal', protect, asceanCtrl.addJournalEntry)
router.put('/exp', protect, asceanCtrl.saveExperience);
router.put('/setCurrency', protect, asceanCtrl.setCurrency);
router.put('/setExp', protect, asceanCtrl.setExperience);
router.put('/purchase', protect, asceanCtrl.purchaseToInventory)
router.put('/levelup', protect, asceanCtrl.updateLevel);
router.put('/inventory', protect, asceanCtrl.saveToInventory);
router.put('/save-inventory', protect, asceanCtrl.saveInventory);
router.put('/nonCombatStatistic', protect, asceanCtrl.recordNonCombatStatistic);
router.put('/combatStatistic', protect, asceanCtrl.recordCombatStatistic);
router.put('/sedyrist', protect, asceanCtrl.recordSedyrist);
router.put('/thievery', protect, asceanCtrl.recordThievery);
router.put('/:id/swap', protect, asceanCtrl.swapItems);
router.put('/remove/:id', protect, asceanCtrl.removeItem);
router.put('/:id', protect, asceanCtrl.editAscean);

router.post('/', protect, asceanCtrl.create);
router.post('/animal', protect, asceanCtrl.animalStats)
router.post('/persist/:id', protect, asceanCtrl.persistAscean);

router.delete('/:id', protect, asceanCtrl.delete);

/*---------- Protected Routes ----------*/

module.exports = router;