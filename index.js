'use strict'
var mongoose = require('mongoose');
var appbpr = require('./app');
var port = process.env.PORT || 3700;
var database = 'cacarotobybpr';
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://braunnypr:Mayobanex1@ds137508.mlab.com:37508/heroku_pvlqdrzt', { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
        console.log("Conexion Existosa");
        appbpr.listen(port, () => {
            console.log("PUERTO : " + port);
        });
    })
    .catch(err => console.log(err));
