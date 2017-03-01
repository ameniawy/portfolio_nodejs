// user routes file
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var passport = require("passport");

// Login GET and Post
router.get('/login', function(req, res){
	res.render('login');
});

router.post("/login", passport.authenticate("login", {failureRedirect: "/user/login", failureFlash: true}), 
	function(req, res) {
    	res.redirect('/student/' + req.user.username);
});


// Logout
router.get("/logout", function(req, res) {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect("/page/0");
});


// Register GET and Post
router.get('/register', function(req, res){
	res.render('register', {errors:[]});
});

router.post('/register', userController.register);


module.exports = router;