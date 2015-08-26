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
exports.create = function(req, res, next) {
	var file = req.files.file;
	var name = fileName(file.type, req.body.username);
	fs.readFile(file.path, function (err, data) {
		var path = imagePath + name;
		fs.writeFile(path, data, function(err) {
			if (err) return err;
        	res.json(200, data);
		});
	});
};

/**
 * Create image user
 */
exports.createImageUser = function(req, res, next) {
    var file = req.files.file;
    var name = fileName(file.type, req.body.username);
    var path = imagePath + name;    
    fs.exists(path, function (exists) {
        if (exists) { changeImage(req, res, next); }
        createImage(req, res, next);
    });
};

/**
 * Create image user
 */
exports.removeImageUser = function(req, res, next) {
    var path = imagePath + req.body.name;    
    fs.exists(path, function (exists) {
        if (!exists) return res.json(200);            
        fs.unlink(path, function (err) {
            if (err) throw err;
            res.send(200);
        });
    });
};

/**
 * Name to image
 */
exports.fileName = function(type, name) {
    return fileName(type, name);
}

/**
 * Create image to user
 */
var createImage = function(req, res, next) {
    var file = req.files.file;
    var name = fileName(file.type, req.body.username);
    var path = imagePath + name;
    lwip.open(file.path, function(err, image) {
        if (err) throw err;
        var size = calculateImageSize(image);
        image.resize(size.width, size.height, function(err, rzdImg) {
            rzdImg.writeFile(path, function(err, image) {
                if (err) throw err;
                res.json(200, image);
            });
        });
    });
}

/**
 * Change image to user
 */
var changeImage = function(req, res, next) {
    var file = req.files.file;
    var name = fileName(file.type, req.body.username);
    var path = imagePath + name;    
    fs.unlink(path, function (err) {
        if (err) throw err;
        createImage(req, res, next);
    });
}

/**
 * Remove image to user
 */
var removeImage = function(req, res, next) {
    var path = imagePath + req.body.imageName;    
    fs.unlink(path, function (err) {
        if (err) throw err;
        res.json(200);
    });
}

/**
 * Create name to image
 */
var fileName = function(type, name) {
    //var nameEncode = encode(name);
    var nameEncode = name;
    switch(type) {
    case "image/jpeg":
        return nameEncode + '.png';
    case "image/png":
        return nameEncode + '.png';
    default:
        return nameEncode + '.png';
    }
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
    size = verifyHeightSize(size, heightMax, newWidth, newHeight);
    size = verifyWidthSize(size, widthMax, newWidth, newHeight);
    return size;
}

var verifyWidthSize = function(size, widthMax, newWidth, newHeight) {
    if(widthMax > newWidth) return size;
    return {
        'width': widthMax,
        'height': newHeight      
    }
}

var verifyHeightSize = function(size, heightMax, newWidth, newHeight) {
    if(heightMax > newHeight) return size;
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

var encode = function(value) {
    var valueHex = Buffer(value).toString('hex');
    return hashids.encodeHex(valueHex);
}

var decode = function(value) {
	var valueHex = hashids.decodeHex(value);
    return Buffer(valueHex, 'hex').toString('utf8');
}
