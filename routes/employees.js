var express = require('express');
var router = express.Router();
const EmployeeController =   require('../controller/employee_controller');
/* GET users listing. */
router.get('', EmployeeController.findAll);
router.post('', EmployeeController.create);
router.post('/changestatus', EmployeeController.changestatus);
router.post('/:id', EmployeeController.update);
router.get('/:id', EmployeeController.findById);
router.post('/del/:id', EmployeeController.delete);

module.exports = router;
