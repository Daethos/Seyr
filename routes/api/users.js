const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const multer = require('multer');
const upload = multer();
const protect = require('../../config/auth')

/*---------- Public Routes ----------*/
router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/', protect, usersCtrl.allUsers);
router.get('/:username', usersCtrl.profile);
router.put('/update', protect, usersCtrl.updateUser)

/*---------- Protected Routes ----------*/

module.exports = router;