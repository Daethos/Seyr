const express = require('express');
const router = express.Router();
const communityCtrl = require('../../controllers/community');

// /*---------- Public Routes ----------*/

router.get('/', communityCtrl.index);
router.get('/:id', communityCtrl.focus)

/*---------- Protected Routes ----------*/




module.exports = router;