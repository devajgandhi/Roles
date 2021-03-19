
var express = require('express');
var path = require('path');

var app = express();
let ejs = require('ejs');
app.set('view engine','ejs');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',function(req,res){
       res.render('dashboard');     
});


if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
  }