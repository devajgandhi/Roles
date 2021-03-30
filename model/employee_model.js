var dbconn = require('../routes/database');

var employee = function (employee) {
var date =new Date();
  
  this.Username = employee.Username;
  this.password = employee.password;
  this.profile_picture=employee.profile_picture;
  date = employee.updated_at;
  date =employee.created_at;
  this.email = employee.email;
  this.role_id=employee.role_id;
  this.mobile_no = employee.mobile_no;

}


employee.findAll = function (result) {
  dbconn.query("Select * from employee", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {

      result(null, res);

    }
  });
};
employee.findById = function (id, result) {
  dbconn.query("Select * from employee where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);

    }
  });
};
employee.update = function (id, employee, result) {
  dbconn.query("UPDATE employee SET Username=?,email=?,password=?, profile_picture=?,role_id=?, mobile_no=?,updated_at=?, status=? WHERE id = ?", [employee.Username,employee.email,employee.password,employee.profile_picture,employee.role_id,employee.mobile_no,employee.updated_at, employee.status, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
employee.create = function (newEmployee, result) {
  dbconn.query("INSERT INTO employee set ?", newEmployee, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
    
      result(null, res.insertId);
    }
  });
};
employee.delete = function (id, result) {
  dbconn.query("DELETE FROM employee WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
employee.changestatus = function (id, status, result) {

  dbconn.query("UPDATE employee SET status=? WHERE id = ?", [status, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
employee.employee_list = function (length,result) {
  dbconn.query("Select employee.id, employee.Username, employee.profile_picture, employee.password, employee.mobile_no, employee.email, employee.status, employee.role_id, employee.created_at, role.name as name from employee JOIN role on employee.role_id=role.id where employee.role_id='3' limit ?  ",[parseInt(length)], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
   
  result(null, res);

  }
  });
  }; 
module.exports = employee;