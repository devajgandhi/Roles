var express = require('express');
var router = express.Router();
var dbconn=require('./database');

/* GET home page. */
const login_controller = require('../controller/login_controller');

var sessionChecker = (req, res, next) => {
    if (req.session.Username) {
      res.redirect("/tasks");
    } else {
      next();
    }
}
router.get('/', function(req, res, next) {
  
});
router.post('/register', login_controller.register);

// Login
router.post('/login', login_controller.login);

router.get('/log',sessionChecker,function(req,res){
    res.render('login');
});
router.get('/reg',function(req,res){
    res.render('register');
});
router.get('/logout' ,function(req,res){
    req.session.destroy();
    res.render('login');
});
module.exports = router;