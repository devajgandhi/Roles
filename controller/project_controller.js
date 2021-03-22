var project = require('../model/project_model');


exports.findAll = function (req, res) {
  console.warn('controller findAll')
  project.findAll(function (err, project) {
    if (err)
      res.send(err);

    //res.send(project);
    res.render('project', {
      title: 'project List',
      userData: project
    });
  });
};

exports.create = function (req, res) {
  console.warn('controller create')
  const new_project = new project(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: 'Please provide all required field'
    });
  } else {
    project.create(new_project, function (err, project) {
      if (err)
        res.send(err);
      // res.json({error:false,message:"project added successfully!",data:project});
      res.redirect('/project');
    });
  }
};
exports.findById = function (req, res) {
  console.warn('controller findbyid')
  project.findById(req.params.id, function (err, project) {
    if (err)
      res.send(err);
    res.render('update_project', {
      title: 'project List by id',
      userData: project
    });
  });
};
exports.update = function (req, res) {
  console.warn('controller update')
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: 'Please provide all required field'
    });
  } else {
    project.update(req.params.id, new project(req.body), function (err, project) {
      if (err)
        res.send(err);
      //  res.json({ error:false, message: 'project successfully updated' });
      res.redirect('/project');
    });
  }
};
exports.delete = function (req, res) {
  console.warn('controller delete')
  project.delete(req.params.id, function (err, project) {
    if (err)
      res.send(err);
    // res.json({ error:false, message: 'project successfully deleted' });
    res.redirect('/project');
  });
};
exports.changestatus = function (req, res) {
  console.warn('controller changestatus')

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: 'Please provide all required field'
    });
  } else {
    project.changestatus(req.body.id, req.body.status, function (err, project) {
      if (err)
        res.send(err);
      console.log(req.body);
      //  res.json({ error:false, message: 'Category successfully updated' });

    });
  }
};