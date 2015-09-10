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
            next(user);
        })
        .use(function(user, req, res, next) {
            user.save(function(err, data) {
                if (err) return res.send(500, err);
                if(req.body.image) next(user);
                res.json(200, data);
            }); 
        })
        .use(function(user, req, res, next) {
            populateUserImageCreate(req, user);
            user.save(function(err, data) {
                if (err) return res.send(500, err);
                res.json(200, data);
            }); 
        });      
};

/**
 * Change a users
 */
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
            next(user);
        })
        .use(function(user, req, res, next) {
            user.save(function(err, data) {
                if (err) return res.send(500, err);
                res.json(200, data);
            }); 
        });            
};

var populateUser = function(user, req, res, next) {
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.image = populateUserImage(req);
    user.systems = populateUserSystems(req);
}

var populateUserSystems = function(req) {
    var systems = [];
    _.map(req.body.systems, function(system) {
        systems.push({
            system: system.idSystem,
            role: system.role,
            dateInitial: system.dateInitial,
            dateFinal: system.dateFinal
        })
    });
    return systems;
}

var populateUserImage = function(req) {
    var image = { name: null, format: null };
    if(!req.body.image) return image;
    image.name = req.body.image.name;
    image.format = req.body.image.format;
    return image;
}

var populateUserImageCreate = function(req, user) {
    var image = { name: null, format: null };
    if(!req.body.image) return image;
    image.name = user._id.toJSON();
    image.format = user.image.format;
    user.image = image;
}
