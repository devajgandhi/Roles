var express = require('express');
var router = express.Router();
const taskController =   require('../controller/tasks_controller');
/* GET users listing. */
router.get('', taskController.findAll);
router.post('', taskController.create);
router.post('/changestatus', taskController.changestatus);
router.post('/:id', taskController.update);
router.get('/:id', taskController.findById);
router.post('/del/:id', taskController.delete);

module.exports = router;
