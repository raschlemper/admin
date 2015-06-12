'use strict';

var System = require('./system.model');

/**
 * Get list of systems
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    System.find({}, function(err, systems) {
        if (err) return res.send(500, err);
        res.json(200, systems);
    });
};

/**
 * Get system
 */
exports.show = function(req, res, next) {
    var systemId = req.params.id;
    System.findById(systemId, function(err, system) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(200, system);
    });
};

/**
 * Create system
 */
exports.create = function(req, res, next) {
    var newSystem = new System(req.body);
    newSystem.save(function(err, system) {
        if (err) return res.send(500, err);
        res.json(200);
    });
};

/**
 * Remove system
 */
exports.destroy = function(req, res) {
    System.findByIdAndRemove(req.params.id, function(err, system) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a system
 */
exports.change = function(req, res, next) {
    System.findByIdAndUpdate(req.body._id, req.body, function(err, system) {
      if(err) return res.send(500, err);
      res.json(200);
    });
};