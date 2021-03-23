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
      console.log(req.query);
      //  res.json({ error:false, message: 'Category successfully updated' });

    });
  }
};
exports.project_list = async (req, res) => {
  console.warn('controller ajax')

  var allCount = await project.count();

  console.log("allCount", allCount);

project.count(function (err, count) {
  if (err) {
    res.send(err);
  } else {
    console.log(count);

    project.project_list(req.query.length, function (err, project) {
      if (err) {
        res.send(err);
      } else {

        console.log(req.query);



        var draw = req.query.draw;
        var start = req.query.start;
        var rowperpage = req.query.length; // Rows display per page
        var columnIndex = req.query.order[0]['column']; // Column index
        // var columnName = req.query.column[var columnIndex]['data']; // Column name
        var columnSortid = req.query.order[0]['dir']; // asc or desc
        var searchValue = req.query.search['value']; // Search value
        var datalist = [];
        var result = JSON.parse(JSON.stringify(project))

        if (result.length != 0) {
          var i = 1;
          result.forEach(res => {
            var myData = res;
            myData['id'] = res.id;
            myData['name'] = res.name;
            if (res.status == 0) {
              myData['status'] = '<button class="btn btn-sm btn-danger mb-0" type="button" onClick="changeStatus(res.id)"> InActive </button>';
            } else {
              myData['status'] = '<button class="btn btn-sm btn-success mb-0" type="button" onClick="changeStatus(res.id)"> Active </button>';
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

        // $totalrecords = project.count();
        res.send($response);

      }
    });
  }
});

}