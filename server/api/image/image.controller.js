'use strict';

var _ = require("underscore");
var fs = require('fs');
var gm = require('gm');
var compose = require('composable-middleware');
var Hashids = require('hashids');

var hashids = new Hashids("teratec", 8, 
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
var imagePath = 'public/image/users/';

/**
 * Create image
 */
var create = function(req, res, next) {
	var file = req.files.file;
	var name = fileName(file.type, req.body.name);
	fs.readFile(file.path, function (err, data) {
		var path = 'public/image/users/' + name;
		fs.writeFile(path, data, function(err) {
			if (err) return err;
        	res.json(200, data);
		});
	});
};

var createSize = function(req, res, next) {
    var file = req.files.file;
    var name = fileName(file.type, req.body.name);
    fs.readFile(file.path, function (err, data) {
        var path = 'public/image/users/' + name;
        fs.writeFile(path, data, function(err) {
            if (err) throw err;
            var pathNew = 'public/image/users/new' + name;
            var teste = gm(path)
                .resize(30, 50)
                .autoOrient();
                // .write(path, function (err) {
                //   if (!err) console.log(' hooray! ');
                // });
            console.log(teste);
        });
    });
}

var fileName = function(type, name) {
	var nameEncode = encode(name);
	switch(type) {
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

var decode = function(value) {
	var valueHex = hashids.decodeHex(value);
    return Buffer(valueHex, 'hex').toString('utf8');
}

exports.create = create;
exports.createSize = createSize;
exports.fileName = fileName;
exports.encode = encode;
exports.decode = decode;
