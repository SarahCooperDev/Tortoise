// Imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

// Express Configuration
var app = express();

app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Database Configuration
const dbConfig = require('./db.config');

var db = mongo.connect(dbConfig.atlasURL, {useNewUrlParser: true}, function(err, res){
  if(err){
    console.log(err);
  } else {
    console.log("Connected to " + dbConfig.atlasURL);
  }
});

// Passport Configuration

app.use(session({
  secret: 'blackquartz',
  saveUninitialized: true,
  resave: false,
  cookie : {secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: false },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({_id: userId}).exec((err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({_id: userId}).exec((err, user) => {
    if(err){
      return done(500);
    } else if(!user){
      return done(401);
    } else {
      if(user.password !== password){
        return done(403);
      } else {
        return done(null, user);
      }
    }
  });
}));

// Routing Imports
var userRoutes = require('./routes/user.routes');

app.use('/api/user', userRoutes);

app.listen(8081, function(){
  console.log('App listening on port 8081!');
});

module.exports = app;




