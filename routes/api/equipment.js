const express = require('express');
const router = express.Router();
const eqpCtrl = require('../../controllers/equipment.js');

/*---------- Public Routes ----------*/
router.get('/', eqpCtrl.indexEquipment);
router.get('/lootdrop/:level', eqpCtrl.getOneEquipment);
router.get('/merchant/:level', eqpCtrl.getMerchantEquipment);
router.get('/weapons/:level', eqpCtrl.getWeaponEquipment);
router.get('/armor/:level', eqpCtrl.getArmorEquipment);
router.get('/cloth/:level', eqpCtrl.getClothEquipment);
router.get('/jewelry/:level', eqpCtrl.getJewelryEquipment);
router.get('/write', eqpCtrl.getAndWriteEquipmentIds);
router.put('/upgrade', eqpCtrl.upgradeEquipment);
router.delete('/delete', eqpCtrl.deleteEquipment);

/*---------- Protected Routes ----------*/

module.exports = router;