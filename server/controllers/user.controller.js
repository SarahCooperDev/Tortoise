const User = require('../models/User');
const passport = require('passport');

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