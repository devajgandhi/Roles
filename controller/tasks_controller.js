var tasks= require('../model/tasks_model');


exports.findAll = function(req, res) {
  console.warn('controller findAll')
  tasks.findAll(function(err, tasks) {
    if (err)
    res.send(err);
   
    //res.send(tasks);
    res.render('tasks', { title: 'tasks List', session_role: req.session.role});
  });
  };

    exports.create = function(req, res) {
      console.warn('controller create')  
      console.log(req.body);
      const new_tasks = new tasks(req.body);
      //handles null error
      if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
      tasks.create(new_tasks, function(err, tasks) {
        if (err)
        res.send(err);
        res.redirect('/tasks');
      });
      }
      };
      exports.findById = function(req, res) {
        console.warn('controller findbyid')
        tasks.findById(req.params.id, function(err, tasks) {
          if (err)
          res.send(err);
          res.render('update_task', { title: 'tasks List by id', userData: tasks});
        });
        };
      exports.update = function(req, res) {
        console.warn('controller update')
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
          res.status(400).send({ error:true, message: 'Please provide all required field' });
        }else{
          tasks.update(req.params.id, new tasks(req.body), function(err, tasks) {
         if (err)
         res.send(err);
        //  res.json({ error:false, message: 'tasks successfully updated' });
         res.redirect('/tasks');
      });
      }
      };
      exports.delete = function(req, res) {
        console.warn('controller delete')
        tasks.delete( req.params.id, function(err, tasks) {
          if (err)
          res.send(err);
          // res.json({ error:false, message: 'tasks successfully deleted' });
          res.redirect('/tasks');
        });
        };
        exports.changestatus =function(req, res) {
          console.warn('controller changestatus')
         
            if(req.body.constructor === Object && Object.keys(req.body).length === 0){
              res.status(400).send({ error:true, message: 'Please provide all required field' });
            }else{
              tasks.changestatus(req.body.id,req.body.status, function(err, tasks) {
             if (err)
             res.send(err);
            console.log(req.body);
            //  res.json({ error:false, message: 'tasks successfully updated' });
         
          });
          }
          };

          exports.tasks_list = function (req, res)  {
            console.warn('controller ajax')
            
          
            
          
              tasks.tasks_list(req.session.Userid,req.query.length, function (err, tasks) {
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
                  var result = JSON.parse(JSON.stringify(tasks))
          
                  if (result.length != 0) {
                    var i = 1;
                    result.forEach(res => {

                      if(res.pstatus==1){
                      var myData = res;
                      myData['id'] = res.id;
                      myData['name'] = res.name;
                      myData['description'] = res.description;
                      myData['uname'] = res.uname;
                      myData['pname'] = res.pname;
                      if (req.session.role==3){
                       
                          
                      }else{
                        if (res.status == 0) {
                          myData['status'] = '<a  id="btnStatus_'+res.id+'" class="btn btn-danger" onclick="return changeStatus('+res.id+')">InActive</a>';
                        } else {
                          myData['status'] = '<a  id="btnStatus_'+res.id+'" class="btn btn-success" onclick="return changeStatus('+res.id+')">Active</a>';
                        }
                        myData['update']='<a href="/tasks/'+res.id+'" class="btn btn-primary">Update</a>'
                        myData['delete']='<a href="/tasks/del/'+res.id+'" class="btn btn-primary">Delete</a>'
                      }
                      datalist.push(myData);
                      i++;
                    }
                      else{
                    
                      }
                    });
                  }
              
                  
                

                  $response = {
                    data: datalist,
                    'draw': draw,
                    'totalRecords': 100,
                    'totalDisplayRecords': 100
                  };
          
                  // $totalrecords = tasks.count();
                  res.send($response);
          
                }
              });
            };
          