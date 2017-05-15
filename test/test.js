var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config');


describe('Routing', function () {
    var url = '127.0.0.1:8080';
    var id1 = ''; // for first user test
    var id2 = '';// for second user test

    before(function (done) {
        mongoose.connect(config.db.mongodb);
        done();
    });

    describe('API', function () {
        it('checking if the api is avaiable', function (done) {
            request(url)
                .get('/api')
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
                .post('/api/survivors')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('_id');
                    res.body.name.should.equal('Junior');
                    id = res.body._id;
                    done();
                });
        });

        it('checking the create an second survivor', function (done) {
            request(url)
                .post('/api/survivors')
                .send(body2)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('_id');
                    res.body.name.should.equal('Peterson');
                    id = res.body._id;
                    done();
                });
        });

        it('checking update surviver location', function (done) {

            var body = {
                "location": { "latitude": "-3.9999", "longitude": "-5.3333" }
            }

            request(url)
                .put('/api/survivors/' + id)
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

        it('checking the report infected survival', function (done) {
            var body = {
                "report_id": id2,
                "survivor_id": id1
            }

            request(url)
                .put('/api/survivors/' + id +'/report')
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

    });

});