const Router = require('express');
const ProjectController = require('../controllers/project.controller');

const router = new Router();

router.route('/add').post(ProjectController.addProject);

module.exports = router;