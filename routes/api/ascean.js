const express = require('express');
const router = express.Router();
const asceanCtrl = require('../../controllers/ascean');


// /*---------- Public Routes ----------*/
router.get('/', asceanCtrl.index)
router.post('/', asceanCtrl.create);
/*---------- Protected Routes ----------*/


module.exports = router;