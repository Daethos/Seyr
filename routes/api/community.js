const express = require('express');
const router = express.Router();
const communityCtrl = require('../../controllers/community.js');

// /*---------- Public Routes ----------*/

router.get('/', communityCtrl.indexCommunity);
router.get('/:id', communityCtrl.focus)

/*---------- Protected Routes ----------*/




module.exports = router;