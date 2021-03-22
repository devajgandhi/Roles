var employee= require('../model/employee_model');


exports.findAll = function(req, res) {
  console.warn('controller findAll')
  employee.findAll(function(err, employee) {
    if (err)
    res.send(err);
   
    //res.send(employee);
    res.render('employee', { title: 'employee List', userData: employee});
  });
  };

    exports.create = function(req, res) {
      console.warn('controller create')  
      const new_employee = new employee(req.body);
      //handles null error
      if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
      employee.create(new_employee, function(err, employee) {
        if (err)
        res.send(err);
        // res.json({error:false,message:"employee added successfully!",data:employee});
        res.redirect('/employee');
      });
      }
      };
      exports.findById = function(req, res) {
        console.warn('controller findbyid')
        employee.findById(req.params.id, function(err, employee) {
          if (err)
          res.send(err);
          res.render('update_employee', { title: 'employee List by id', userData: employee});
        });
        };
      exports.update = function(req, res) {
        console.warn('controller update')
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
          res.status(400).send({ error:true, message: 'Please provide all required field' });
        }else{
          employee.update(req.params.id, new employee(req.body), function(err, employee) {
         if (err)
         res.send(err);
        //  res.json({ error:false, message: 'employee successfully updated' });
         res.redirect('/employee');
      });
      }
      };
      exports.delete = function(req, res) {
        console.warn('controller delete')
        employee.delete( req.params.id, function(err, employee) {
          if (err)
          res.send(err);
          // res.json({ error:false, message: 'employee successfully deleted' });
          res.redirect('/employee');
        });
        };
        exports.changestatus =function(req, res) {
          console.warn('controller changestatus')
         
            if(req.body.constructor === Object && Object.keys(req.body).length === 0){
              res.status(400).send({ error:true, message: 'Please provide all required field' });
            }else{
              project.changestatus(req.body.id,req.body.status, function(err, project) {
             if (err)
             res.send(err);
            console.log(req.body);
            //  res.json({ error:false, message: 'Category successfully updated' });
         
          });
          }
          };