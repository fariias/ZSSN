var config = require('./config');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var BSON = require('mongodb').BSONPure;

//database settings 
var mongoose = require('mongoose');
mongoose.connect(config.db.mongodb, function (err) {
    if (err) { console.error("error! " + err) }
});

//setting bodyparser to read json post data
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(require('./controllers/survivorController'));
app.use(require('./controllers/reportsController'));

//Setting Static Files Local
app.use('/', express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/libs', express.static(__dirname + '/node_modules/es6-shim/'));
app.use('/libs', express.static(__dirname + '/node_modules/zone.js/dist/'));
app.use('/libs', express.static(__dirname + '/node_modules/reflect-metadata/'));
app.use('/libs', express.static(__dirname + '/node_modules/systemjs/dist/'));
app.use('/libs', express.static(__dirname + '/node_modules/rxjs/'));
app.use('/libs', express.static(__dirname + '/node_modules/angular2-in-memory-web-api/'));
app.use('/libs', express.static(__dirname + '/node_modules/@angular/'));

//start server
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listen: ' + port);