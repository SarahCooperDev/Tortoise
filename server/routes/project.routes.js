const Router = require('express');
const ProjectController = require('../controllers/project.controller');

const router = new Router();

router.route('/add').post(ProjectController.addProject);
router.route('/getall').get(ProjectController.getProjects);
router.route('/getproject').post(ProjectController.getProject);

module.exports = router;