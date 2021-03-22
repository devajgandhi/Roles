var express = require('express');
var router = express.Router();
const projectController =   require('../controller/project_controller');
/* GET users listing. */
router.get('', projectController.findAll);
router.post('', projectController.create);
router.post('/changestatus', projectController.changestatus);
router.post('/:id', projectController.update);
router.get('/:id', projectController.findById);
router.post('/del/:id', projectController.delete);

module.exports = router;
