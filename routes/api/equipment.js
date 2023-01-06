const express = require('express');
const router = express.Router();
const eqpCtrl = require('../../controllers/equipment.js');

/*---------- Public Routes ----------*/
router.get('/', eqpCtrl.indexEquipment);
router.get('/lootdrop/:level', eqpCtrl.getOneEquipment);

/*---------- Protected Routes ----------*/

module.exports = router;