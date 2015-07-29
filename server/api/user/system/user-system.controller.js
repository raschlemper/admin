'use strict';

var UserSystem = require('./user-system.model');

exports.show = function(req, res, next) {
    var userId = req.params.id;
    UserSystem.find({'user': userId})
    .populate('user')
    .populate('system')
    .exec(function(err, systems) {
        if (err) return next(err);
        if (!systems) return res.send(401);
        res.json(200, systems);
    });
};