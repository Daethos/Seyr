const express = require('express');
const router = express.Router();
const messageCtrl = require('../../controllers/messages')

router.get('/:id', messageCtrl.getMessages)
router.get('/personal/:userID/:friendID', messageCtrl.getPersonal)
router.post('/:sendID/:recID', messageCtrl.create)
router.delete('/delete/:id', messageCtrl.deleteMessage)

module.exports = router;