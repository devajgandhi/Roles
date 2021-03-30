
var work= require('../model/details_model');


exports.addtoWork = function (req, res) {
    console.warn('controller addtoWork')
 
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({
        error: true,
        message: 'Please provide all required field'
      });
    } else {
      work.addtoWork(req.body.id_project,req.body.User_id, function (err, work) {
        if (err)
          res.send(err);
        // res.json({error:false,message:"project added successfully!",data:project});
        res.redirect('/project');
      });
    }
  };