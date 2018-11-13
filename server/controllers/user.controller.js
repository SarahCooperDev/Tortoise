const User = require('../models/User');
const passport = require('passport');

exports.verify = function(req, res){
  console.log("In verify");

  if(req.user){
    return res.status(200).json({username: req.user.username});
  } else {
    return res.send(401);
  }
}

exports.signIn = function(req, res){
  console.log("In sign in");

  passport.authenticate('local', (status, user) => {
    console.log("User is " + user);

    if(status === 500){
      return res.status(500);
    } else if(status === 401){
      return res.status(401).send({errorMsg: "User not registered"});
    } else if(status === 403){
      return res.status(403).send({errorMsg: "Password incorrect"});
    } else if(!user){
      return res.status(500);
    } else {
      req.login(user, (err => {
        console.log("error is " + err);
        if(err){
          return res.status(502).send({errorMsg: "Error creating session"});
        } else {
          req.session.save(function(){
            return res.send(200);
          });
        }
      }))
    }
  })(req, res);
}

exports.signUp = function(req, res){
  console.log("In sign up");
  console.log("Email is " + req.body.email);
  console.log("Password is " + req.body.password);
  console.log(req.user);
  console.log(req.session);

  /*User.findOne({email: req.body.email}).exec((err, user) => {
    if(user){
      return res.send(403);
  } else {
      */
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.username = req.body.username;

      newUser.save((err, result) => {
        if(err){
          return res.send(500);
        } else {
          passport.authenticate('local', (status, user) => {
            if(status === 500){
              return res.status(500);
            } else if(status === 401){
              return res.status(401).send({errorMsg: "User not registered"});
            } else if(status === 403){
              return res.status(403).send({errorMsg: "Password incorrect"});
            } else if(!user){
              return res.status(500);
            } else {
              req.login(result, (err => {
                if(err){
                  return res.status(502).send({errorMsg: "Error creating session"});
                } else {
                  req.session.save(function(){
                    return res.send(200);
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