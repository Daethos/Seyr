const express = require('express');
const router = express.Router();
const eqpCtrl = require('../../controllers/equipment.js');

/*---------- Public Routes ----------*/
router.get('/', eqpCtrl.indexEquipment);

/*---------- Protected Routes ----------*/

module.exports = router;