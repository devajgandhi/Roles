
var express = require('express');
var path = require('path');
var session = require('express-session');
var app = express();
var multer = require('multer');
let ejs = require('ejs');
const date = require('date-and-time');
var loginRouter = require('./routes/login');
var employeesRouter = require('./routes/employees');
var projectRouter = require('./routes/projects');
var tasksRouter = require('./routes/tasks');
var dashRouter = require('./routes/dashboard');
app.set('view engine','ejs');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  
  secret: "random",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  },
})
);

app.use('/',loginRouter);
app.use('/dashboard',dashRouter);
app.use('/project',projectRouter);
app.use('/employee',employeesRouter);
app.use('/tasks',tasksRouter);



if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
  }