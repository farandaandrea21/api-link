var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var appbpr = express();

//cargar archivos de rutas

var links_routes = require('./routebpr');



//middlewares
appbpr.set('trust proxy', true);
appbpr.use(cors());
appbpr.use(bodyParser.urlencoded({ extended: false }));
appbpr.use(bodyParser.json());


//CORS

appbpr.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS
appbpr.use('/api', links_routes);


/*
appbpr.get('/api/braunnypr', (req, res) => {
    res.status(200).send({
        message: "BraunnyPR API"
    });

});
*/







appbpr.get('/', (req, res) => {
    res.status(200).send({ "BraunnyPR": "API CACAROTO by; BraunnyPR" });

});




//exportar
module.exports = appbpr;
