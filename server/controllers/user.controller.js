const User = require('../models/User');

exports.signUp = function(req, res){
    console.log("In sign up");
    console.log("Email is " + req.body.email);
    console.log("Password is " + req.body.password);

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
                    return res.send(200);
                }
            })
        /*}
    })*/
}