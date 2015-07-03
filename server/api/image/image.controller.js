'use strict';

var _ = require("underscore");
var fs = require('fs');
var Hashids = require('hashids');

var hashids = new Hashids("teratec", 8, 
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
var imagePath = 'public/image/users/';

/**
 * Create image
 */
exports.create = function(req, res, next) {
	var file = req.files.file;
	var name = fileName(file, req.body.name);
	fs.readFile(file.path, function (err, data) {
		var path = 'public/image/users/' + name;
		fs.writeFile(path, data, function(err) {
			if (err) return console.log(err);
        	res.json(200, name);
		});
	});
};

var fileName = function(file, name) {
	var nameEncode = encode(name);
	switch(file.type) {
    case "image/jpeg":
        return nameEncode + '.jpg';
        break;
    case "image/png":
        return nameEncode + '.png';
        break;
    default:
        return nameEncode + '.png';
    }
}

var encode = function(value) {
    var valueHex = Buffer(value).toString('hex');
    return hashids.encodeHex(valueHex);
}

var dencode = function(value) {
	var valueHex = hashids.decodeHex(value);
    return Buffer(valueHex, 'hex').toString('utf8');
}