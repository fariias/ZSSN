var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config');


describe('Routing', function () {
    var url = '127.0.0.1:8080';

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
            "location": { "latitude": "-5.999", "longitude": "-9.87584" },
            "inventory": { "water": 3, "ammunation": 10, "food": 5, "medication": 3 },
            "infected": false,
            "reports": 0
        }

        it('checking the create an survivor', function (done) {
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
                    done();
                });
        });
    });

});