var User= require('../model/login_model');

exports.register = async (req, res) => {
    
    // //Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    const user = new User({
        mobile_no: req.body.mobile_no,
        email: req.body.email,
        Username: req.body.Username,
        password: req.body.password,

       
    });
    // Save User in the database
    try {
        const id = await User.create(user);
        user.id = id;
        delete user.password;
        res.send(user);
    }
    catch (err){
        res.status(500).send(err);
    }    
};
exports.login = function(req, res) {
   
    User.login(req.body.Username, function(err, User) {
       
      if (err){
      res.send(err);}
      else{
       var result=JSON.parse(JSON.stringify(User))
       console.log(result); 
        if(result.length>0){
      if (result[0].password==req.body.password) {
         
        res.redirect('/tasks');
       }

       else {
        res.render('login',{
            msg: "Invalid Username or Password"
        });
       }
    }else{
        res.render('login',{
            msg: "Invalid Username or Password"
        });
    }
    }
    });
    };

      