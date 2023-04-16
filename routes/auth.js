const router = require('express').Router();
const { authController } = require('../controllers/index');
const { signup, signin, logout } = authController;


router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);


module.exports = router;


