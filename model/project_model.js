
var dbconn = require('../routes/database');

var project = function(project){

    
  this.name   = project.name ;
  this.status=project.status ;
  Date = project.updated_at;
  
 
}


    project.findAll = function (result) {
    dbconn.query("Select * from project", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{

      result(null, res);
 
    }
    });
    }; 
    project.findById = function (id, result) {
      dbconn.query("Select * from project where id = ? ", id, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        result(null, res);
        
      }
      });
      };
    project.update = function(id, project, result){
      dbconn.query("UPDATE project SET name=?,status=?, updated_at WHERE id = ?", [project.name,project.status,,project.updated_at, id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null, res);
      }
      });
      };
    project.create = function (newproject, result) {
      dbconn.query("INSERT INTO project set ?", newproject, function (err, res) {
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
      project.delete = function(id, result){
        dbconn.query("DELETE FROM project WHERE id = ?", [id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          result(null, res);
        }
        });
        };
        project.changestatus = function(id, status, result){
          
            dbconn.query("UPDATE project SET status=? WHERE id = ?", [status, id], function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }else{
              result(null, res);
            }
            });
            };
    module.exports= project;

 