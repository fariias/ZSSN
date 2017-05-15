var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var survivorSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    inventory: {
        water: Number,
        food: Number,
        medication: Number,
        ammunation: Number
    },
    location: {
        latitude: String,
        longitude: String
    },
    infected: Boolean,
    reports: [{ report_id: String }]
});

module.exports = mongoose.model('Survivor', survivorSchema);