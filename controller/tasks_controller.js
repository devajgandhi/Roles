var tasks= require('../model/tasks_model');


exports.findAll = function(req, res) {
  console.warn('controller findAll')
  tasks.findAll(function(err, tasks) {
    if (err)
    res.send(err);
   
    //res.send(tasks);
    res.render('dashboard', { title: 'tasks List', userData: tasks});
  });
  };

    exports.create = function(req, res) {
      console.warn('controller create')  
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