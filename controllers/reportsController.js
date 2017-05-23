var express = require('express')
    , router = express.Router()
    , Survivor = require('../model/survivor');


router.use(function (req, res, next) {
    console.warn(req.method + " " + req.url +
        "with" + JSON.stringify(req.body));
    next();
})


router.route('/reports/infected')
    .get(function (req, res) {
        Survivor.count({}, function (err, survivors) {
            Survivor.count({ infected: true }, function (err, infecteds) {
                if (err) {
                    res.send(err);
                }
                var survivorsPercentage = ((infecteds / survivors) * 100) || 0;
                res.json({ infected: survivorsPercentage });
            });
        });

    });


router.route('/reports/noinfected')
    .get(function (req, res) {
        Survivor.count({}, function (err, survivors) {
            Survivor.count({ infected: false }, function (err, noInfecteds) {
                if (err) {
                    res.send(err);
                }
                var survivorsPercentage = ((noInfecteds / survivors) * 100) || 0;
                res.json({ noInfected: survivorsPercentage });
            });
        });

    });

router.route('/reports/lostpoints')
    .get(function (req, res) {
        var values = {
            inventoryValues: {
                water: 4,
                food: 3,
                medication: 2,
                ammunation: 1
            }
        }

        Survivor.find({ infected: true }).lean().exec(function (err, survivors) {

            var points = 0;

            survivors.forEach(function (infected) {
                for (let name in values.inventoryValues) {
                    if (infected.inventory[name]) {
                        points += infected.inventory[name] *
                            values.inventoryValues[name];
                    }
                }
            });
            res.send({ points })
        });
    })

module.exports = router