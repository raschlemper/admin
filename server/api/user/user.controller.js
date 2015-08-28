'use strict';

var compose = require('composable-middleware');
var _ = require('underscore');
var Image = require('../image/image.controller');
var User = require('./user.model');
var UserSystem = require('./system/user-system.model');

/**
 * Get list of users
 */
exports.index = function(req, res, next) {
    User.find({})    
    .deepPopulate('systems.system')
    .exec(function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Get user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;
    User.findById(userId)
    .deepPopulate('systems.system')
    .exec(function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(200, user);
    });
};

/**
 * Remove user
 */
exports.destroy = function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    return compose() 
        .use(function(req, res, next) {
            var user = new User(req.body);
            next(user);
        })
        .use(function(user, req, res, next) {
            populateUser(user, req, res, next);
        })
        .use(function(user, req, res, next) {
            user.save(function(err, user) {
                if (err) return res.send(500, err);
                res.json(200, user);
            }); 
        });      
};

/**
 * Change a users
 */
//TODO: Colocar o compose para salvar a imagem cas ela seja mudada
exports.change = function(req, res, next) {
    return compose() 
        .use(function(req, res, next) {
            User.findById({ _id: req.body.id }, function (err, user){
                if (err) return res.send(500, err);
                next(user);
            });
        })
        .use(function(user, req, res, next) {
            populateUser(user, req, res, next);
        })
        .use(function(user, req, res, next) {
            user.save(function(err, user) {
                if (err) return res.send(500, err);
                res.json(200, user);
            }); 
        });            
};

var populateUser = function(user, req, res, next) {
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.provider = req.body.provider;
    user.image = populateUserImage(req);
    user.systems = populateUserSystems(req);
    next(user);
}

var populateUserSystems = function(req) {
    var systems = [];
    _.map(req.body.systems, function(system) {
        systems.push({
            system: system._id,
            role: system.role,
            dateInitial: system.dateInitial,
            dateFinal: system.dateFinal
        })
    });
    return systems;
}

var populateUserImage = function(req) {
    if(!req.body.image) { return null; }
    // var file = req.body.image.file;
    // if(!file.name || !req.body.id) { return req.body.image.name; }
    return Image.fileName(file.type, req.body.id);
}

var getNameImage = function(image) {
    var parts = image.split('/');
    return parts[parts.length - 1];
}

// var saveImage = function(user, req, res, next) {
//     if(!req.files) { return; }
//     if(!req.files.file) { return; }
//     var file = req.files.file;
//     var name = Image.fileName(file.type, req.body.name);
//     Image.removeImageUser(file, name); 
//     Image.createImageUser(file, name); 
// }

// var saveImage = function(req, res, next) {
//     if(!req.files.file) { next(); }
//     var file = req.files.file;
//     var name = Image.fileName(file.type, req.body.name);
//     User.update( 
//         { 'name': req.body.name, 'email': req.body.email }, 
//         { 'image': name },
//         function(err, numberAffected, user) {
//             if (err) return res.send(500, err);
//             res.json(200, user);
//         });
// }

// exports.createWithImage = function() {
//     return compose() 
//         .use(function(req, res, next) {
//         })
//         .use(function(req, res, next) {
//         });
// };
