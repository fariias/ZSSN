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

});