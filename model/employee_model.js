var dbconn = require('../routes/database');

var employee = function (employee) {


  this.Username = employee.Username;
  this.password = employee.password;
  this.status = employee.status;
  Date = employee.updated_at;
  this.email = employee.email;
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
  dbconn.query("UPDATE employee SET Username=?,status=?,password=?,email=?,role_id=?,mobile_no=?,updated_at=? WHERE id = ?", [employee.Username,employee.email,employee.password,employee.role_id,employee.mobile_no,employee.updated_at, employee.status, id], function (err, res) {
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
      console.log(res.insertId);
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
module.exports = employee;