var mongoose = require('mongoose');
var User  = mongoose.model('user');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function() {
	passport.use("login", new LocalStrategy(
		function(username, password, done){
			User.findOne({ username: username}, function(err, user){
				if(err) return done(err);
				if(!user){
					return done(null, false, {message: "No user with that username!"});
				}
				user.checkPassword(password, function(err, isMatch){
					if(err) return done(err);
					if(isMatch){
						return done(null, user);
					} else{
						return done(null, false, {message:"Invalid Password"});
					}
				});
			});
		}));

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

};