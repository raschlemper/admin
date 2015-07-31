'use strict';

var express = require('express');
var multipart = require('connect-multiparty');
var controller = require('./user.controller');
var controllerSystem = require('./system/user-system.controller');

var router = express.Router();
var multipartMiddleware = multipart();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
router.put('/:id', controller.change);
router.post('/image/', multipartMiddleware, controller.createWithImage());

//router.get('/system/:id', controllerSystem.show);

module.exports = router;
