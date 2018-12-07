const Router = require('express');
const ArtefactController = require('../controllers/artefact.controller');

const router = new Router();

router.route('/add').post(ArtefactController.addArtefact);

module.exports = router;