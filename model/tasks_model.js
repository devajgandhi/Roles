
var dbconn = require('../routes/database');

var tasks = function(tasks){
  var date =new Date();
    
  this.name   = tasks.name ;
  this.project_id= tasks.project_id ;
  date = tasks.updated_at;
  date =tasks.created_at;
  this.description=tasks.description;
  this.user_id = tasks.user_id
  
 
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
      dbconn.query("UPDATE tasks SET name=?, description=? , project_id=?, user_id=?, status=? , updated_at=? WHERE id = ?", [tasks.name,tasks.description,tasks.project_id,tasks.user_id,tasks.status,tasks.update_at , id], function (err, res) {
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
            tasks.tasks_list = function (id,length,result) {
              dbconn.query("Select tasks.id,tasks.name,tasks.status,tasks.created_at,tasks.updated_at, tasks.description,project.status as pstatus,project.name as pname,employee.Username as uname from tasks , project, employee where project.id=tasks.project_id && tasks.user_id=employee.id && tasks.user_id=? limit ?",[id,parseInt(length)], function (err, res) {
              if(err) {
                console.log("error: ", err);
                result(null, err);
              }
              else{
               
              result(null, res);
            
              }
              });
              }; 
    module.exports= tasks;

 