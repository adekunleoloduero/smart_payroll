const router = require('express').Router();
const { authController } = require('../controllers/index');
const { signup, signin, logout, requestPasswordResetLink, changePassword} = authController;


router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);

router.post('/reset-password', requestPasswordResetLink);

router.patch('/change-password/:userId/:resetToken', changePassword);



module.exports = router;


