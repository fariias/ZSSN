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
        var survivorProposal = req.body.survivorProposal;
        var traderProposal = req.body.traderProposal;
        var survivorPoints = 0;
        var traderPoints = 0;

        var values = {
            inventoryValues: {
                water: 4,
                food: 3,
                medication: 2,
                ammunation: 1
            }
        }

        for (let name in values.inventoryValues) {
            if (survivorProposal[name] != null) {
                survivorPoints += (survivorProposal[name] * values.inventoryValues[name]);
            }

            if (traderProposal[name]) {
                traderPoints += (traderProposal[name] * values.inventoryValues[name]);
            }
        }


        if (survivorPoints != traderPoints) {
            res.status(404);
            return res.json({ message: "number of points not compatible" });
        }

        Survivor.findOne({ _id: survivor_id }).exec((err, survivor) => {

            if (!survivor) {
                res.status(404);
                return res.json({ message: "Survivor not found" });
            }


            if (survivor.infected === true) {
                res.status(404);
                return res.json({ message: "survivor infected" });
            }




            Survivor.findOne({ _id: trader_id }).exec((err, trader) => {

                if (!trader) {
                    res.status(404);
                    return res.json({ message: "user trade not found" });
                }

                if (trader.infected === true) {
                    res.status(404);
                    return res.json({ message: "User trade infected" });
                }

                for (let name in values.inventoryValues) {
                    if (survivorProposal[name] != null) {
                        if (survivorProposal[name] > survivor.inventory[name]) {
                            res.status(404);
                            return res.json({ message: "insuficient resource" });
                        } else {
                            survivor.inventory[name] -= survivorProposal[name];
                            trader.inventory[name] += survivorProposal[name];
                        }
                    }
                }

                for (let name in values.inventoryValues) {
                    if (traderProposal[name] != null) {

                        if (traderProposal[name] > trader.inventory[name]) {
                            res.status(404);
                            return res.json({ message: "insuficient resource" });
                        } else {
                            trader.inventory[name] = trader.inventory[name] - traderProposal[name];
                            survivor.inventory[name] += traderProposal[name];
                        }
                    }
                }

                survivor.save();
                trader.save();
                res.json(survivor);

            });

        });


    });




module.exports = router