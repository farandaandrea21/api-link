'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnlaceSchema = Schema({
    user: String,
    active: Boolean,
    enlace: String,
    po_st: String,
    date: String


});


module.exports = mongoose.model('links', EnlaceSchema)
