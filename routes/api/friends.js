const express = require('express');
const router = express.Router();
const friendsCtrl = require('../../controllers/friends');

/*---------- Public Routes ----------*/
router.get('/:id', friendsCtrl.index);
router.post('/:userId/:friendId', friendsCtrl.send);
router.put('/:userId/:friendId', friendsCtrl.accept);
router.delete('/:userId/:friendId', friendsCtrl.delete);

/*---------- Protected Routes ----------*/

module.exports = router;