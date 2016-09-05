/**
 * Created by DBaah on 8/13/15.
 */
// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var firebase = require("firebase");
var settings = require("./settings.js");

var api = require('./routes/api');

firebase.initializeApp({
    serviceAccount: settings.firebase,
    databaseURL: "https://databaseName.firebaseio.com"
});

// configuration =================

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/api', api);

// listen (start app with node server.js) ======================================
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});console.log("App listening on port " +  app.get('port'));

// application -------------------------------------------------------------
//app.get('*',function(req,res){
//    res.sendfile('./public/index.html');     // load angular index file
//});
app.use(function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

// app = module.exports;
module.exports = app;
