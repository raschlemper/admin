'use strict';

var _ = require("underscore")
var fs = require('fs');

/**
 * Create image
 */
exports.create = function(req, res, next) {
	var file = req.files.file;
	fs.readFile(file.path, function (err, data) {
		fs.writeFile(file.name, data, function(err) {
			if (err) return console.log(err);
	  		console.log('Hello World > helloworld.txt');
		});
	});
};