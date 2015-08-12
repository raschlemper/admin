'use strict';

var express = require('express');
var multipart = require('connect-multiparty');
var controller = require('./user.controller');
var controllerSystem = require('./system/user-system.controller');

var router = express.Router();
var multipartMiddleware = multipart();

router.get('/', controller.index);
// router.post('/', multipartMiddleware, controller.create());
router.post('/', controller.create());
router.put('/:id', controller.change());
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);

//router.get('/system/:id', controllerSystem.show);

module.exports = router;
