const express = require('express');
const router = express.Router();
const eqpCtrl = require('../../controllers/equipment.js');

/*---------- Public Routes ----------*/
router.get('/', eqpCtrl.indexEquipment);
router.get('/lootdrop/:level', eqpCtrl.getOneEquipment);
router.get('/merchant/:level', eqpCtrl.getMerchantEquipment)
router.put('/upgrade', eqpCtrl.upgradeEquipment);
router.delete('/delete', eqpCtrl.deleteEquipment);

/*---------- Protected Routes ----------*/

module.exports = router;