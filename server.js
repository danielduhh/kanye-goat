/**
 * Created by DBaah on 8/13/15.
 */
// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
//var settings = require("./settings.js");

var api = require('./routes/api');

// configuration =================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/api', api);

// listen (start app with node server.js) ======================================
app.listen((process.env.PORT || 5000), function() {
    console.log('Node app is running on port', (process.env.PORT || 5000));
});

// application -------------------------------------------------------------
app.use(function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

// app = module.exports;
module.exports = app;
