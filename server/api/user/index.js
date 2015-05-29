'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
router.put('/', controller.change);

module.exports = router;
