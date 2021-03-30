var employee= require('../model/employee_model');
var multer = require('multer');


exports.findAll = function(req, res) {
  console.warn('controller findAll')
  employee.findAll(function(err, employee) {
    if (err)
    res.send(err);
   
    //res.send(employee);
    res.render('employee', { title: 'employee List', session_role: req.session.role});
  });
  };

    exports.create = function(req, res) {
      console.warn('controller create')
      console.log(req.file);  
      const new_employee = new employee(req.body);
      new_employee.profile_picture = req.file.filename;
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
          res.render('update_employee', { title: 'employee List by id', userData: employee, session_role:req.session.role});
        });
        };
      exports.update = function(req, res) {
        const new_employee = new employee(req.body);
        new_employee.profile_picture = req.file.filename;
        console.warn('controller update')
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
          res.status(400).send({ error:true, message: 'Please provide all required field' });
        }else{
          employee.update(req.params.id, new_employee, function(err, employee) {
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
              employee.changestatus(req.body.id,req.body.status, function(err, employee) {
             if (err)
             res.send(err);
            console.log(req.body);
            //  res.json({ error:false, message: 'Category successfully updated' });
         
          });
          }
          };
          exports.employee_list = function (req, res)  {
            console.warn('controller ajax')
          
            
          
              employee.employee_list(req.query.length, function (err, employee) {
                if (err) {
                  res.send(err);
                } else {
          
          
          
          
                  var draw = req.query.draw;
                  var start = req.query.start;
                  var rowperpage = req.query.length; // Rows display per page
                  var columnIndex = req.query.order[0]['column']; // Column index
                  // var columnName = req.query.column[var columnIndex]['data']; // Column name
                  var columnSortid = req.query.order[0]['dir']; // asc or desc
                  var searchValue = req.query.search['value']; // Search value
                  var datalist = [];
                  var result = JSON.parse(JSON.stringify(employee))
          
                  if (result.length != 0) {
                    var i = 1;
                    result.forEach(res => {
                      var myData = res;
                      myData['id'] = res.id;
                      myData['profile_picture']='<img src="images/'+res.profile_picture+' ">';
                      myData['Username'] = res.Username;
                      myData['mobile_no'] = res.mobile_no;
                      myData['email'] = res.email;
                      myData['role']=res.name;
                      if (req.session.role==3){
                      }else{
                      if (res.status == 0) {
                        myData['status'] = '<a  id="btnStatus_'+res.id+'" class="btn btn-danger" onclick="return changeStatus('+res.id+')">InActive</a>';
                      } else {
                        myData['status'] = '<a  id="btnStatus_'+res.id+'" class="btn btn-success" onclick="return changeStatus('+res.id+')">Active</a>';
                      }
                      myData['update']='<a href="/employee/'+res.id+'" class="btn btn-primary">Update</a>'
                      myData['delete']='<a href="/employee/del/'+res.id+'" class="btn btn-primary">Delete</a>'
                    }
                      datalist.push(myData);
                      i++;
                    });
                  }
          
          
                  $response = {
                    data: datalist,
                    'draw': draw,
                    'totalRecords': 100,
                    'totalDisplayRecords': 100
                  };
          
                  // $totalrecords = employee.count();
                  res.send($response);
          
                }
              });
            };