// routes file
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var studentController = require('../controllers/student');

router.get('/', function(req, res, next){
	res.redirect("/page/0");
});


router.get('/page/:page', studentController.summary_page);

module.exports = router;