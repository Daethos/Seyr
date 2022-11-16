const express = require('express');
const protect = require('../../config/auth');
const router = express.Router()
const chatCtrl = require('../../controllers/chat');

router.get('/', protect, chatCtrl.fetchChat);
router.post('/:id', protect, chatCtrl.accessChat);
router.post('/group', protect, chatCtrl.createGroupChat);
router.put('/rename', protect, chatCtrl.renameGroup);
router.put('/groupadd', protect, chatCtrl.addToGroup);
router.put('/groupremove', protect, chatCtrl.removeFromGroup);

module.exports = router;