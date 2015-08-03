'use strict';

var compose = require('composable-middleware');
var _ = require('underscore');
var Image = require('../image/image.controller');
var User = require('./user.model');
var UserSystem = require('./system/user-system.model');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res, next) {
    User.find({}, function(err, users) {
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
 * Create user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err) return res.send(500, err);
        res.json(200);
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
 * Change a users
 */
//TODO: Colocar o compose para salvar a imagem cas ela seja mudada
exports.change = function(req, res, next) {
    return compose() 
        .use(function(req, res, next) {
            // var newUser = new User(req.body);
            User.findOne({ _id: req.body.id }, function (err, user){
                if (err) return res.send(500, err);
                next(user);
            });
        })
        .use(function(user, req, res, next) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.provider = req.body.provider;
            user.save(function(err, user) {
                if (err) return res.send(500, err);
                next();
            });
        })
        .use(function(req, res, next) {
            _.map(req.body.systems, function(system) {
                UserSystem.findOne({ _id: system.id }, function (err, userSystem){
                    if (err) return res.send(500, err);
                    if(!userSystem) { userSystem = new UserSystem(system); }
                    userSystem.user = system.user;
                    userSystem.system = system.system;
                    userSystem.role = system.role;
                    userSystem.dateInitial = system.dateInitial;
                    userSystem.dateFinal = system.dateFinal;
                    next(userSystem);
                });
            })                
        })
        .use(function(userSystem, req, res, next) {
            userSystem.save(function(err, system) {
                if (err) return res.send(500, err);
                res.json(200);
            });            
        });            
};

/**
 * Create user
 */
exports.createWithImage = function() {
    return compose() 
        .use(function(req, res, next) {
            var file = req.files.file;
            var name = Image.fileName(file.type, req.body.name);
            if(req.files.file) { 
                Image.createImageUser(file, name); 
                next();
            }
        })
        .use(function(req, res, next) {
            var file = req.files.file;
            var name = Image.fileName(file.type, req.body.name);
            User.update( { 'name': req.body.name, 'email': req.body.email }, 
                { 'image': name },
                function(err, numberAffected, user) {
                    if (err) return res.send(500, err);
                    res.json(200, user);
                });

        });
};
