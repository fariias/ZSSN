var express = require('express')
    , router = express.Router()
    , Survivor = require('../model/survivor');


router.use(function (req, res, next) {
    console.warn(req.method + " " + req.url +
        "with" + JSON.stringify(req.body));
    next();
})

// GET
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


module.exports = router