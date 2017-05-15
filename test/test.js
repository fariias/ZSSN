var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config');


describe('Routing', function () {
    var url = '127.0.0.1:8080';
    var id1 = ''; // for first user test
    var id2 = '';// for second user test
    var deleteAfter = false; //clear db after tests
    before(function (done) {
        mongoose.connect(config.db.mongodb);
        var Survivors = require('../model/survivor');
        Survivors.count({})
            .then(function (count) {
                if (count === 0) {
                    deleteAfter = true;
                } else {
                    console.log('Database already exists');
                }
            })
            .then(function () {
                done();
            })
    });

    after(function (done) {
        if (deleteAfter) {
            console.log('Deleting database...');
            mongoose.connection.db.dropDatabase(done);
        } else {
            done();
        }
    });

    describe('API', function () {
        it('checking if the api is avaiable', function (done) {
            request(url)
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err
                    }
                    res.body.message.should.equal('hello world!');
                    done();
                });
        });
    });


    describe('SURVIVOR', function () {
        var body = {
            "name": "Junior",
            "gender": "M",
            "age": 20,
            "location": { "latitude": "-5.9999", "longitude": "-9.87584" },
            "inventory": { "water": 3, "ammunation": 10, "food": 5, "medication": 3 },
            "infected": false,
            "reports": 0
        }

        var body2 = {
            "name": "Peterson",
            "gender": "M",
            "age": 37,
            "location": { "latitude": "-8.9999", "longitude": "-10.87584" },
            "inventory": { "water": 5, "ammunation": 4, "food": 0, "medication": 5 },
            "infected": false,
            "reports": 0
        }


        it('checking the create an first survivor', function (done) {
            request(url)
                .post('/survivors')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('_id');
                    res.body.name.should.equal('Junior');
                    id1 = res.body._id;
                    done();
                });
        });

        it('checking the create an second survivor', function (done) {
            request(url)
                .post('/survivors')
                .send(body2)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('_id');
                    res.body.name.should.equal('Peterson');
                    id2 = res.body._id;
                    done();
                });
        });

        it('checking update surviver location', function (done) {

            var body = {
                "location": { "latitude": "-3.9999", "longitude": "-5.3333" }
            }

            request(url)
                .put('/survivors/' + id1)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.location.latitude.should.equal(body.location.latitude);
                    res.body.location.longitude.should.equal(body.location.longitude);
                    done();
                });
        });

        it('checking the report infected survivers', function (done) {
            var body = {
                "report_id": id2
            }

            request(url)
                .put('/survivors/' + id1 + '/report')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('checking an trade beetwen survivers', function (done) {
            var body = {
                "trader_id": id2,
                "survivor_id": id1
            }

            request(url)
                .post('/survivors/trade')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) // status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                })

        });

    });
});