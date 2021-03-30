var express = require('express');
var router = express.Router();
const projectController =   require('../controller/project_controller');
const detailController =   require('../controller/details_controller');


/* GET users listing. */
router.get('', projectController.findAll);
router.post('', projectController.create);
router.get('/ajax/project-list',projectController.project_list);
router.post('/changestatus', projectController.changestatus);
router.post('/:id', projectController.update);
router.get('/:id', projectController.findById);
router.post('/del/:id', projectController.delete);
router.get('/addproject/add', function(req,res){
    res.render('add_project');
});
router.get('/details/add/:id',projectController.details);
router.post('/work/addemployee',detailController.addtoWork);

module.exports = router;
