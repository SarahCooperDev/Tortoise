const Router = require('express');
const UserController = require('../controllers/user.controller');

const router = new Router();

router.route('/signup').post(UserController.signUp);

module.exports = router;