var dbconn = require('../routes/database');

var dash = function(dash){
   
      }


      dash.findAll = function (result) {
        dbconn.query("Select (Select COUNT(name) from project) as pcount,(Select COUNT(Username) from employee) as ucount from project,employee", function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(null, err);
          } else {
      
            result(null, res);
      
          }
        });
      };
      dash.findtasks = function (result) {
        dbconn.query("Select COUNT(name) as tcount from tasks ", function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(null, err);
          } else {
      
            result(null, res);
      
          }
        });
      };

      module.exports = dash;    