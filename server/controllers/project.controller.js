const Project = require('../models/Project');
const User = require('../models/User');

exports.addProject = function(req, res){
  console.log("In add project");
  console.log(req.body.name);

  var newProject = new Project();
  newProject.name = req.body.name;
  newProject.dateCreated = new Date();

  newProject.save((err, result) => {
    if(err){
      return res.status(500).send();
    } else {
      req.user.projects.push(result._id);
      
      req.user.save((err, user) => {
        return res.status(200).send({projects: user.projects});
      });
    }
  });
}