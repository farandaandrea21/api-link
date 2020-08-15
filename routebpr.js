var express = require('express');
var Panelfbs = require('./api');

var router = express.Router();

//ENLACES
router.post('/link', Panelfbs.saveLink);
router.get('/link', Panelfbs.saveLinkget);
router.get('/links', Panelfbs.getLinks); // JALAR TODOS Y NO BORRAR
router.get('/links/:user', Panelfbs.getlinkUser); //JALAR CON CANTIDAD Y NO BORRAR

//CHATFUEL
router.post('/chatfuel', Panelfbs.saveChatfuel);
router.get('/chatfuel', Panelfbs.saveChatfuelget);
router.get('/chatfuels/:user', Panelfbs.getCFUser); //JALAR CON CANTIDAD Y NO BORRAR
router.get('/chatfuel/:user', Panelfbs.ChatfuelOneUser); // JALAR CHATFUEL Y BORRAR
router.get('/webhook/:user', Panelfbs.WebHookOneUser); // JALAR CHATFUEL Y BORRAR

module.exports = router;
