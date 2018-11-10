// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Configuration
var app = express();

app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Routing
var userRoutes = require('./routes/user.routes');

app.use('/api/user', userRoutes);

app.listen(8081, function(){
  console.log('App listening on port 8081!');
});

module.exports = app;




