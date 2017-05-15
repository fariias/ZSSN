var express = require('express')
    , router = express.Router()
    , Survivor = require('../model/survivor');


router.use(function (req, res, next) {
    console.warn(req.method + " " + req.url +
        "with" + JSON.stringify(req.body));
    next();
})

// GET
router.route('/')
    .get(function (req, res) {
        res.json({ message: 'hello world!' });
    })
    
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

router.route('/survivors/:survivor_id/report')
    .put(function (req, res) {
        var id = req.params.survivor_id;
        Survivor.findOne({ '_id': id }).exec(function (err, survivor) {
            if (err)
                res.send(err);

            survivor.reports.push(req.body);
            if (survivor.reports.lenght >= 3) {
                survivor.infected = true;
            }

            survivor.save(function (err) {
                if (err)
                    res.send(err);

                res.json(survivor);
            });
        });
    });

module.exports = router