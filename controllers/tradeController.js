var express = require('express')
    , router = express.Router()
    , Survivor = require('../model/survivor');


router.use(function (req, res, next) {
    console.warn(req.method + " " + req.url +
        "with" + JSON.stringify(req.body));
    next();
})


router.route('/survivors/:survivor_id/trade')
    .post(function (req, res) {
        var survivor_id = req.params.survivor_id;
        var trader_id = req.body.trader_id;
       
        res.json({ message: 'trade' });
    });




module.exports = router