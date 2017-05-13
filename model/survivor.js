var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var survivorSchema = new Schema({
    name: String,
    age: Number,
    gender:String,
    location:String,
    inventory:String
});

module.exports = mongoose.model('Survivor', survivorSchema);