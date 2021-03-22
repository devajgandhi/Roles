var dbconn = require('../routes/database');
var User = function (User) {

  this.Username = User.Username;
  this.password = User.password;
  this.mobile = User.mobile;
  this.email = User.email;

}
User.create = async (newUser) => {
  let insert = await dbconn.query("INSERT INTO employee SET ?", newUser);
  if (insert.insertId) {
    return insert.insertId;
  } else {
    return;
  }
};
User.login = function (Username, result) {

  var sun = dbconn.query("Select * from employee where Username LIKE  ? ", Username, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {

      result(null, res);


    }
  });
};
module.exports = User;