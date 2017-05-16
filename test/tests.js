var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config');
var databaseTest = require('./database-test.js');
var Survivors = require('../model/survivor');

describe('Routing', function () {
    var url = '127.0.0.1:8080';
    var id1 = ''; // for first user test


    before(function (done) {
        mongoose.connect(config.db.mongodb);
        Survivors.remove({}, function () {
            Survivors.create(databaseTest.survivor1, databaseTest.survivor2, databaseTest.survivor3, function () {
                done();
            });
        });

    });




    describe('SURVIVOR', function () {

        it('checking all survivors get', function (done) {
            request(url)
                .get('/survivors')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err
                    }
                    res.body.length.should.equal(3);
                    done();
                });
        });

        it('checking the create an first survivor', function (done) {
            request(url)
                .post('/survivors')
                .send(databaseTest.survivor4)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    id1 = res.body._id;
                    res.body.should.have.property('_id');
                    res.body.name.should.equal(databaseTest.survivor4.name);
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
                "report_id": 'report3'
            }

            request(url)
                .put('/survivors/' + databaseTest.survivor3._id + '/report')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.infected.should.equal(true);
                    done();
                });
        });
    });

    describe('REPORTS', function () {

        it('Testing the percentage of infected survivors.', function (done) {
            request(url)
                .get('/reports/infected')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err
                    }
                    res.body.infected.should.equal(25);
                    done();
                });
        });

        it('Testing the percentage of infected survivors.', function (done) {
            request(url)
                .get('/reports/noinfected')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err
                    }
                    res.body.infected.should.equal(75);
                    done();
                });
        });

    });
});