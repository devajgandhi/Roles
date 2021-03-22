
var express = require('express');
var path = require('path');

var app = express();
let ejs = require('ejs');
var loginRouter = require('./routes/login');
var employeesRouter = require('./routes/employees');
var projectRouter = require('./routes/projects');
var tasksRouter = require('./routes/tasks');
app.set('view engine','ejs');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/dash',function(req,res){
       res.render('dashboard');     
});

app.use('/',loginRouter);
app.use('/project',projectRouter);
app.use('/employee',employeesRouter);
app.use('/tasks',tasksRouter);


if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
  }