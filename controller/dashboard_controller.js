var work= require('../model/dashboard_model');

exports.findAll = function(req, res) {
    console.warn('controller findAll')
    work.findAll(function(err, Project_count) {
      if (err)
      res.send(err);
     
      //res.send(Project_count);
    //   res.render('dashboard', { title: 'Project_count', userData:Project_count});
    work.findtasks(function(err,tasks_count) {
        if (err)
        res.send(err);
       
        //res.send(Project_count);
        // res.render('dashboard', { title: 'Project_count', userData:tasks_count});
   
        res.render('dashboard', { title: 'Project_count', userData:Project_count, countData:tasks_count, session_role:req.session.role});
      });
     
    // return (Project_count);
    });
   
    };