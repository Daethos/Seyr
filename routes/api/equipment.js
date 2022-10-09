const express = require('express');
const router = express.Router();
const eqpCtrl = require('../../controllers/equipment');

/*---------- Public Routes ----------*/
router.get('/', eqpCtrl.index);

/*---------- Protected Routes ----------*/

module.exports = router;