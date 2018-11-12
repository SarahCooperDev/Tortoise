const Router = require('express');
const UserController = require('../controllers/user.controller');

const router = new Router();

router.route('/signup').post(UserController.signUp);
router.route('/signin').post(UserController.signIn);

module.exports = router;