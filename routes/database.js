var mysql=require('mysql');
var dbconn=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'roles'
});

dbconn.connect(function(err){
    if(err ) throw err;
    console.log("database connected");
});
module.exports= dbconn;