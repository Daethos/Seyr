const express = require('express');
const router = express.Router();
const feelingsCtrl = require('../../controllers/feelings')

router.post('/ascean/:id/feelings/:feeling', feelingsCtrl.create)
router.put('/ascean/:id/feelings', feelingsCtrl.updateFeeling)
router.delete('/feelings/:id', feelingsCtrl.deleteFeeling)

module.exports = router;