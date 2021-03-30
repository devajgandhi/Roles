var express = require('express');
const session = require('express-session');
var router = express.Router();
const dashController =   require('../controller/dashboard_controller');
/* GET users listing. */
router.get('', dashController.findAll);

module.exports = router;