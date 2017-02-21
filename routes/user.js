// user routes file
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var passport = require("passport");

router.get('/login', function(req, res){
	res.render('login');
});

//router.post('/login', userController.login);

router.post("/login", passport.authenticate("login", {successRedirect: "/", failureRedirect: "/user/login"}));

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

router.get('/register', function(req, res){
	res.render('register');
});

router.post('/register', userController.register);
//router.post('/search', userController.search);


router.get('/secret', userController.secret);




module.exports = router;