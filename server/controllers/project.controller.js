const Project = require('../models/Project');
const User = require('../models/User');

exports.addProject = function(req, res){
  console.log(req.body.name);

  var newProject = new Project();
  newProject.name = req.body.name;
  newProject.description = req.body.description;
  newProject.dateCreated = new Date();
  newProject.lastUpdated = new Date();

  newProject.save((err, result) => {
    if(err){
      return res.status(500).send();
    } else {
      req.user.projects.push(result._id);
      
      req.user.save((err, user) => {
        Project.find({'_id': {$in: req.user.projects}}, function(err, projects){
          console.log(projects);
          return res.status(200).send({projects: projects});
        })
      });
    }
  });
}

exports.getProjects = function(req, res){
  Project.find({'_id': {$in: req.user.projects}}, function(err, projects){
    console.log(projects);
    return res.status(200).send({projects: projects});
  })
}