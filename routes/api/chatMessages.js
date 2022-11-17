const express = require('express');
const router = express.Router();
const protect = require('../../config/auth')
const msgCtrl = require('../../controllers/chatMessages')

router.post('/', protect, msgCtrl.sendMessage)
router.get('/:chatId', protect, msgCtrl.allMessages)

module.exports = router;