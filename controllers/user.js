var mongoose = require('mongoose'),
	User = mongoose.model('user'),
	bcrypt = require('bcrypt');
	passport = require('passport');




///////////////////////////
// START OF CONTROLLER/////
///////////////////////////


module.exports.index = [
	function(req,res,next) {
		User.find({}, function(err,users){
			if(err) return next(err);
			res.render('index',{users:users});	
		});
		
	}
];


// Register new user
module.exports.register = [
	function(req,res,next) {
		if("name" in req.body && req.body !== ' ') {
			next();
		} else {
			res.sendStatus(400);
		}
	},
	function(req,res,next) {
		User.create(req.body, function(err, user) {
					if(err) return next(err);
					console.log(user);
					res.redirect('/user/login');
				});
		
	}

];


// Page that requires auth
module.exports.secret = function(req, res, next){
	if(req.isAuthenticated()){
		res.json({message: "AIWAAAA", user: req.user});
	} else{
		if(req.user){
			console.log(user);
		} else{
			console.log("hmm");
		}
		console.log("emshi men hena");
		res.sendStatus(400);
	}
}