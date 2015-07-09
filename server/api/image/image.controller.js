'use strict';

var _ = require("underscore");
var fs = require('fs');
var lwip = require('lwip');
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

// TODO: Fazer o resize conforme o h ou o w da image,
// considerar o maior pelo tamanho da image e calcular a outra medida
// http://thejackalofjavascript.com/image-manipulation-node-js/ 
var createImageUser = function(file, name) {
    var path = 'public/image/users/' + name;
    lwip.open(file.path, function(err, image) {
        if (err) throw err;
        image.resize(180, 250, function(err, rzdImg) {
            rzdImg.writeFile(path, function(err) {
                if (err) throw err;
            });
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
exports.createImageUser = createImageUser;
exports.fileName = fileName;
exports.encode = encode;
exports.decode = decode;
