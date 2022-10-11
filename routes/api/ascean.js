const express = require('express');
const router = express.Router();
const asceanCtrl = require('../../controllers/ascean');


// /*---------- Public Routes ----------*/
router.get('/', asceanCtrl.index);
router.get('/:id', asceanCtrl.getOneAscean)
router.put('/:id', asceanCtrl.editAscean)
router.post('/', asceanCtrl.create);
/*---------- Protected Routes ----------*/


module.exports = router;