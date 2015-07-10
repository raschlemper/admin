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
        var size = calculateImageSize(image);
        image.resize(size.width, size.height, function(err, rzdImg) {
            rzdImg.writeFile(path, function(err, image) {
                if (err) throw err;
                return image;
            });
        });
    });
}

var calculateImageSize = function(image) {
    var widthMax = 200;
    var heightMax = 240;
    var width = image.width();
    var height = image.height();
    return getSize(widthMax, heightMax, width, height);
}

var getSize = function(widthMax, heightMax, width, height) {
    var newWidth = getNewSize(heightMax, height, width);
    var newHeight = getNewSize(widthMax, width, height);
    var size = {
        'width': widthMax,
        'height': heightMax
    }
    size = verifyHeightSize(heightMax, newWidth, newHeight);
    size = verifyWidthSize(widthMax, newWidth, newHeight);
    return size;
}

var verifyWidthSize = function(widthMax, newWidth, newHeight) {
    if(widthMax > newWidth) return;
    return {
        'width': widthMax,
        'height': newHeight      
    }
}

var verifyHeightSize = function(heightMax, newWidth, newHeight) {
    if(heightMax > newHeight) return;
    return {
        'width': newWidth,
        'height': heightMax
    }   
}

var getNewSize = function(sizeMax, size, comparate) {
    var perc = percentual(sizeMax, size);
    return calculateSize(comparate, perc);    
}

var percentual = function(sizeMax, size) {
    return (sizeMax * 100) / size;
}

var calculateSize = function(size, percentual) {
    return (size * percentual) / 100;
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
