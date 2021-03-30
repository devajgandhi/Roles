
var dbconn = require('../routes/database');

    
    var project = function(project){

   console.log("pro");
  this.name   = project.name ;
   Date() = project.updated_at;
   Date() = project.created_at;
  this.description=project.description;
  this.company_name= project.company_name;
  this.start_Date= project.start_Date;
  this.Deadline=project.Deadline;
 
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
      dbconn.query("UPDATE project SET name=?,status=?,description=?,company=?,start_Date=?,Deadline=? updated_at WHERE id = ?", [project.name,project.status,project.description,project.company_name,project.start_Date,project.Deadline,project.updated_at, id], function (err, res) {
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
           
    project.project_list = function (length,result) {
      dbconn.query("Select * from project limit ?",[parseInt(length)], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
       
      result(null, res);
    
      }
      });
      }; 
      project.count= function(count) {
        dbconn.query("Select count(*) AS countAll from project", function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
          console.log("res", res);
          result(null, res);
        
          }
        });

      }; 
      project.details = function (id, result) {
        dbconn.query("Select project.id,project.name,employee.Username,employee.id as User_id from project ,employee where project.id = ? ", id, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
          result(null, res);
          
        }
        });
        };
    
    module.exports= project;

 