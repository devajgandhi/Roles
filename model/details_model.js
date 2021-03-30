var dbconn = require('../routes/database');

var work = function(work){
  
    this.project_id=work.id_project ;
        this.user_id = work.User_id;


    }


    work.addtoWork = function (project_id,user_id, result) {
      user_id.forEach(function(res) {
        ;  dbconn.query("INSERT INTO work (project_id,user_id) Values (?,?)",[project_id,res], function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(err, null);
            }
            else{
              console.log(res.insertId);
            }
            });
        })
        result(null, user_id.res);
            };
     
  module.exports= work;
