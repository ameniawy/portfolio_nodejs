// routes file
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var studentController = require('../controllers/student');

router.get('/', studentController.summary);

module.exports = router;