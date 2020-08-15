'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,
    email: String,
    revenue: String,
    contador: String,
    token: String,
    mac: String,
    redirect: String

});


module.exports = mongoose.model('users', UserSchema);
