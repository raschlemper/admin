'use strict';

var express = require('express');
var multipart = require('connect-multiparty');
var controller = require('./image.controller');

var router = express.Router();
var multipartMiddleware = multipart();

router.post('/', multipartMiddleware, controller.create);
router.post('/user/', multipartMiddleware, controller.createImageUser);

module.exports = router;
