
var dbconn = require('../routes/database');

var tasks = function(tasks){

    
  this.name   = tasks.name ;
  this.project_id= tasks.project_id ;
  Date=tasks.update_at ;
  
 
}


    tasks.findAll = function (result) {
    dbconn.query("Select * from tasks", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{

      result(null, res);
 
    }
    });
    }; 
    tasks.findById = function (id, result) {
      dbconn.query("Select * from tasks where id = ? ", id, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        result(null, res);
        
      }
      });
      };
    tasks.update = function(id, tasks, result){
      dbconn.query("UPDATE tasks SET name=?,status=? ,project_id=?, update_at=? WHERE id = ?", [tasks.name,tasks.status,tasks.update_at ,tasks.project_id, id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null, res);
      }
      });
      };
    tasks.create = function (newtasks, result) {
      dbconn.query("INSERT INTO tasks set ?", newtasks, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        console.log(res.insertId);
        result(null, res.insertId);
      }
      });
      };
      tasks.delete = function(id, result){
        dbconn.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          result(null, res);
        }
        });
        };
        tasks.changestatus = function(id, status, result){
          
            dbconn.query("UPDATE tasks SET status=? WHERE id = ?", [status, id], function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }else{
              result(null, res);
            }
            });
            };
    module.exports= tasks;

 