const User = require('../models/User');
const passport = require('passport');

exports.verify = function(req, res){
  if(req.user){
    return res.status(200).json({username: req.user.username});
  } else {
    return res.status(401).send();
  }
}

exports.signIn = function(req, res){
  passport.authenticate('local', (status, user) => {
    console.log(status);
    if(status === 500){
      return res.status(500).send();
    } else if(status === 401){
      return res.status(401).send({errorMsg: "User not registered"});
    } else if(status === 403){
      return res.status(403).send({errorMsg: "Password incorrect"});
    } else if(!user){
      return res.status(500);
    } else {
      req.login(user, (err => {
        if(err){
          return res.status(502).send({errorMsg: "Error creating session"});
        } else {
          req.session.save(function(){
            return res.status(200).send();
          });
        }
      }))
    }
  })(req, res);
}

exports.signUp = function(req, res){
  /*User.findOne({email: req.body.email}).exec((err, user) => {
    if(user){
      return res.status(403).send();
  } else {
      */
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.username = req.body.username;

      newUser.save((err, result) => {
        if(err){
          return res.status(500).send();
        } else {
          passport.authenticate('local', (status, user) => {
            if(status === 500){
              return res.status(500).send();
            } else if(status === 401){
              return res.status(401).send({errorMsg: "User not registered"});
            } else if(status === 403){
              return res.status(403).send({errorMsg: "Password incorrect"});
            } else if(!user){
              return res.status(500).send();
            } else {
              req.login(result, (err => {
                if(err){
                  return res.status(502).send({errorMsg: "Error creating session"});
                } else {
                  req.session.save(function(){
                    return res.status(200).send();
                  });
                }
              }))
            }
          })(req, res);
        }
      })
    /*}
  })*/
}

exports.signOut = function(req, res){
  req.logOut();
  req.session.destroy();
  return res.status(200).send();
}