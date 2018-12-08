const Project = require('../models/Project');
const User = require('../models/User');

exports.addArtefact = function(req, res){
  console.log("In add artefact");
  console.log(req.body.artType);
  console.log(req.user);

  Project.findOne({'_id': req.body.projectId}, (err, project) => {
    if(err){
      return res.status(500).send();
    }

    console.log(project);

    var artefact = {artType: req.body.artType, artAddComment: req.body.artAddComment, dateCreated: Date.now(), lastModified: Date.now()};

    project.artefacts.push(artefact);

    project.save((err, project) => {
      console.log(project);
      return res.status(200).json({project: project});
    })
  })
}

exports.getArtefact = function(req, res){
  console.log("In get artefact");

  Project.findOne({'_id': req.body.projectId}, (err, project) => {
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    console.log(project);

    var artefact = null;

    for(var i = 0; i < project.artefacts.length; i++){
      if(project.artefacts[i].artType === req.body.artId){
        console.log(project.artefacts[i]);
        artefact = project.artefacts[i];
      }
    }
    return res.status(200).json({artefact: artefact});
  })

}