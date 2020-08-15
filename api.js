'use stric'

var Link = require('./enlace');
var User = require('./usuario');
var Chatfuel = require('./chatfuel');



var controlbpr = {
    home: function(req, res) {
        return res.status(200).send({
            message: "Soy la Home"

        });

    },

    test: function(req, res) {
        return res.status(200).send({
            message: "Soy el Test"
        });

    },
    //para mandar un link
    saveLinkget: function(req, res) {
        var link = new Link();
        var query = req.query;
        link.user = query.user;
        link.active = true;
        link.enlace = query.link;
        link.po_st = 'node';
        link.date = 'node';
        if (query.user) {
            link.save(link, (err, projectStored) => {
                if (err) res.json({ status: 500, error: err });
                if (!projectStored) res.json({ status: 404, error: err });
                res.status(200).send({ link: 'Enlace guardado en ' + link.user });
            });
        } else {
            res.status(200).send('Error GET');
        }
    },




    //para mandar un link
    saveLink: function(req, res) {
        var link = new Link();
        var params = req.body;
        link.user = params.user;
        link.active = params.active;
        link.enlace = params.enlace;
        link.po_st = params.po_st;
        link.date = params.date;
        link.save(link, (err, projectStored) => {
            if (err) res.json({ status: 500, error: err });
            if (!projectStored) res.json({ status: 404, error: err });
            res.status(200).send({ link: projectStored });
        });
    },

    //para mandar un enlace chatfuel

    saveChatfuel: function(req, res) {
        var chatfuel = new Chatfuel();
        var params = req.body;
        chatfuel.user = params.user;
        chatfuel.title = params.title;
        chatfuel.url = params.url;
        chatfuel.img = params.img;
        // chatfuel.image_url = params.attachment.payload.elements.image_url;
        // chatfuel.url = params.attachment.payload.elements.default_action.url;
        chatfuel.save(chatfuel, (err, projectStored) => {
            if (err) res.json({ status: 500, error: err });
            if (!projectStored) res.json({ status: 404, error: err });
            res.status(200).send({ messages: [projectStored] });
        });
    },


    //para mandar un enlace chatfuel GET

    saveChatfuelget: function(req, res) {
        var chatfuel = new Chatfuel();
        var query = req.query;
        chatfuel.user = query.user;
        chatfuel.title = query.title;
        chatfuel.url = query.link;
        chatfuel.img = query.img;

        if (chatfuel.user) {
            if (!chatfuel.title) { chatfuel.title = "It's you?"; }
            if (!chatfuel.img) { chatfuel.img = 'https://a.mailmunch.co/attachments/assets/000/304/883/large/._.4_3._._._._._._._._._._._._._._._._._._._._._._._.twisfshowareyoufine.JPG'; }
            chatfuel.save(chatfuel, (err, projectStored) => {
                if (err) res.json({ status: 500, error: err });
                if (!projectStored) res.json({ status: 404, error: err });
                res.status(200).send({ link: 'enlace BOT guardado en ' + chatfuel.user });
            });
        } else {
            res.status(200).send('Error GET');
        }
    },


    //para mandar un usuario
    saveUser: function(req, res) {
        var user = new User();
        var params = req.body;
        user.user = params.user;
        user.email = params.email;
        user.revenue = params.revenue;
        user.token = params.token;
        user.contador = params.contador;
        user.redirect = params.redirect;
        user.save(user, (err, projectStored) => {
            if (err) res.json({ status: 500, error: err });
            if (!projectStored) res.json({ status: 404, error: err });
            res.status(200).send({ user: projectStored });
        });
    },

    getUserOne: function(req, res) {
        var userbp = req.params.user;

        User.find({ user: userbp }).sort('id')
            .then((result) => {
                if (result == null) {
                    res.status(200).send({ user: "No tiene nivel en este usuario" });
                } else {
                    res.status(200).send({ user: result[0].id });
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Conociste el Fin!',
                });
            })
    },

    //modificar un usuario tokens
    updateUser: function(req, res) {

        var id = req.params.id;
        var update = req.body;
        User.findByIdAndUpdate(id, update, { new: true }, (err, userUpdate) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar usuario' });
            if (!userUpdate) return res.status(404).json({ message: 'No existe este usuario' });
            return res.status(200).json({ message: 'Actualizado con Exito' });

        })


    },



    getLinks: function(req, res) {

        Link.find({ active: true }).sort('id')
            .then((result) => {
                if (result == null) {
                    res.status(200).send({ linkbpr: "No tiene enlaces" })
                } else {
                    res.status(200).send({ linkbpr: result })
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Conociste el Fin!',
                });
            })
    },


    getUsers: function(req, res) {

        User.find({}).sort('id')
            .then((result) => {
                if (result == null) {
                    res.status(200).send({ userbpr: "No tiene Usuarios" });
                } else {
                    res.status(200).send({ tokens: result });
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Conociste el Fin!',
                });
            })
    },

    // buscar limit por usuario los enlaces
    getlinkUser: function(req, res) {
        var userbp = req.params.user;
        var active = req.params.condition;
        var limit = parseInt(req.query.limit);

        if (limit == undefined) limit = 1
        if (limit == null) limit = 1


        Link.find({ user: userbp, active: true }).limit(limit).sort({ systemTime: 1 })
            .then((userbp) => {
                if (userbp == null) {
                    res.status(200).send({ linkbpr: "No tiene mas enlaces en este usuario" })
                } else {
                    res.status(200).send({ linkbpr: userbp })
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Contactame para verificar tu error!',
                });
            })
    },

    //halar chatfuels por usuario y limit
    getCFUser: function(req, res) {
        var userbp = req.params.user;
        var condicion = req.params.condition;


        Chatfuel.find({ user: userbp }).sort({ systemTime: 1 })
            .then((cf) => {
                if (cf == null) {
                    res.status(200).send({ cfpr: "No tiene mas chatfuels en este usuario" })
                } else {
                    res.status(200).send({ cfbpr: cf, cantidad: cf.length })
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Contactame para verificar tu error!',
                });
            })
    },

    // buscar un enlace para webhook y borrarlo
    WebHookOneUser: function(req, res) {
        var userbp = req.params.user;
        var active = req.params.condition;
        var limit = parseInt(req.query.limit);

        if (limit == undefined) limit = 1 //res.json({ status: 404, message: "lo siento este valor no esta definido " + limit });
        if (limit == null) limit = 1 //res.json({ status: 404, message: "lo siento este valor no existe" + limit });


        Link.findOneAndDelete({ user: userbp }).sort({ systemTime: 1 })
            .then((userbp) => {
                if (userbp == null) {
                    res.status(200).send({
                        messages: [{
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "image_aspect_ratio": "horizontal",
                                    "elements": [{
                                        "title": "NO TIENES ENLACES",
                                        "image_url": "https://cdn.memegenerator.es/imagenes/memes/full/31/27/31270522.jpg",
                                        "subtitle": "Panelfbs by; BraunnyPR",
                                        "default_action": {
                                            "type": "web_url",
                                            "url": "https://facebook.com/"
                                        }
                                    }]
                                }
                            }
                        }]
                    })
                } else {
                    res.status(200).send({
                        title: "OMG!",
                        subtitle: "HOT! Videos Youtube " + userbp.user,
                        item_url: userbp.enlace,
                        image_url: "https://cdn.memegenerator.es/imagenes/memes/full/31/27/31270522.jpg",
                    })
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Contactame para verificar tu error!',
                });
            })
    },

    // buscar un enlace para chatfuel y borrarlo
    ChatfuelOneUser: function(req, res) {
        var userbp = req.params.user;
        var active = req.params.condition;
        var limit = parseInt(req.query.limit);

        if (limit == undefined) limit = 1 //res.json({ status: 404, message: "lo siento este valor no esta definido " + limit });
        if (limit == null) limit = 1 //res.json({ status: 404, message: "lo siento este valor no existe" + limit });


        Chatfuel.findOneAndDelete({ user: userbp }).sort({ systemTime: 1 })
            .then((userbp) => {
                if (userbp == null) {
                    res.status(200).send({
                        "version": "v2",
                        "content": {
                            "messages": [{
                                "type": "cards",
                                "elements": [{
                                    "title": "NO TIENES ENLACES",
                                    "subtitle": "PRIVATE VIDEO",
                                    "og:description": "YouTube",
                                    "image_url": "https://cdn.memegenerator.es/imagenes/memes/full/31/27/31270522.jpg",
                                    "action_url": "https://facebook.com",
                                    "buttons": []
                                }],
                                "image_aspect_ratio": "horizontal"
                            }],
                            "actions": [],
                            "quick_replies": []
                        }
                    })
                } else {

                    res.status(200).send({
                        "version": "v2",
                        "content": {
                            "messages": [{
                                "type": "cards",
                                "elements": [{
                                    "title": "PRIVATE VIDEO",
                                    "subtitle": "PRIVATE VIDEO",
                                    "og:description": "YouTube",
                                    "image_url": "https://cdn.memegenerator.es/imagenes/memes/full/31/27/31270522.jpg",
                                    "action_url": userbp.enlace,
                                    "buttons": []
                                }],
                                "image_aspect_ratio": "horizontal"
                            }],
                            "actions": [],
                            "quick_replies": []
                        }
                    })
                }

            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                    BraunnyPR: 'Contactame para verificar tu error!',
                });
            })
    }

};


module.exports = controlbpr;
