var config = require('./config');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var BSON = require('mongodb').BSONPure;

//secret key
var secretKey = 'secretKeySurvivor';

//database settings 
var mongoose = require('mongoose');
mongoose.connect(config.db.mongodb, function (err) {
    if (err) { console.error("error! " + err) }
});

//setting bodyparser to read json post data
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//load model schemas 
var Survivor = require('./model/survivor');

//setting a REST ROUTER
var router = express.Router();
//middleware
router.use(function (req, res, next) {
    console.warn(req.method + " " + req.url +
        "with" + JSON.stringify(req.body));
    next();
})

// GET
router.get('/', function (req, res) {
    res.json({ message: 'hello world!' });
});

router.route('/survivors/:survivor_id?')
    .get(function (req, res) {
        var id = req.params.survivor_id;
        if (id) {
            Survivor.findOne({ '_id': id })
                .exec(function (err, survivors) {
                    if (err)
                        res.send(err);
                    res.json(survivors)
                })
        } else {
            Survivor.find()
                .exec(function (err, survivors) {
                    if (err)
                        res.send(err);
                    res.json(survivors)
                })
        }
    })

    .post(function (req, res) {
        var survivor = new Survivor();
        survivor.name = req.body.name;
        survivor.gender = req.body.gender;
        survivor.age = req.body.age;
        survivor.location = req.body.location;
        survivor.inventory = req.body.inventory;
        survivor.infected = req.body.infected;
        survivor.reports = req.body.reports;

        survivor.save(function (err) {
            if (err)
                res.send(err);
            res.json(survivor);
        })
    })

    .put(function (req, res) {
        var id = req.params.survivor_id;
        Survivor.findOne({ '_id': id }).exec(function (err, survivor) {
            if (err)
                res.send(err);

            survivor.location = req.body.location;

            survivor.save(function (err) {
                if (err)
                    res.send(err);

                res.json(survivor);
            });
        });
    });


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


//register router
app.use('/api', router);

//start server
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listen: ' + port);