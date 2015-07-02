'use strict';

/**
 * Create image
 */
exports.create = function(req, res, next) {
    console.log(1,req.file);
    console.log(2,req.params.file);
    console.log(3,req.body.file);
};