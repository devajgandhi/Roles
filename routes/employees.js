var express = require('express');
var router = express.Router();
var multer=require('multer');
const session = require('express-session');
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./public/images/")     // './public/images/' directory name where save the file
    },
    /*filename: function (req, file, cb) {
      cb(null, file.originalname+'-'+file.filename)
    }*/
  })
  var upload = multer({
    storage: storage
  });
const EmployeeController =   require('../controller/employee_controller');

/* GET users listing. */
router.get('', EmployeeController.findAll);
router.post('',upload.single('profile_picture'), EmployeeController.create);
router.post('/changestatus', EmployeeController.changestatus);
router.post('/:id',upload.single('profile_picture'), EmployeeController.update);
router.get('/:id', EmployeeController.findById);
router.get('/ajax/employee-list',EmployeeController.employee_list);
router.get('/del/:id', EmployeeController.delete);
router.get('/addemp/add', function(req,res){
    res.render('add_employee',{userData:req.session.role});
})

module.exports = router;
