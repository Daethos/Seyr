const express = require('express');
const router = express.Router();
const communityCtrl = require('../../controllers/community');

// /*---------- Public Routes ----------*/

router.get('/', communityCtrl.index);

/*---------- Protected Routes ----------*/




module.exports = router;