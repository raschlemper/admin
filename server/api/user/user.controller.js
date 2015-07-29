'use strict';

var compose = require('composable-middleware');
var Image = require('../image/image.controller');
var System = require('../system/system.controller');
var User = require('./user.model');

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
exports.change = function(req, res, next) {
    User.findByIdAndUpdate(req.body._id, req.body, function(err, user) {
      if(err) return res.send(500, err);
      res.json(200);
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
