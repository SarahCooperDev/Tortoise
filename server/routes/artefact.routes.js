const Router = require('express');
const ArtefactController = require('../controllers/artefact.controller');

const router = new Router();

router.route('/add').post(ArtefactController.addArtefact);
router.route('/get').post(ArtefactController.getArtefact);

module.exports = router;