'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChartSchema = Schema({


    user: String,
    title: String,
    url: String,
    img: String


});


module.exports = mongoose.model('chatfuel', ChartSchema)
