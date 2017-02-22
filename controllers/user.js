var mongoose = require('mongoose'),
	User = mongoose.model('user'),
	Tag = mongoose.model('tag'),
	Post = mongoose.model('post'),
	bcrypt = require('bcrypt');


///////////////////////////
// START OF CONTROLLER/////
///////////////////////////

// Returns all users to the home page
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
		var name = req.body.name;
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;

		// Validation
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

		var errors = req.validationErrors();

		if(errors){
			console.log(errors);
			res.render('register',{
				errors:errors
			});
		} else {
			next();
		}
	},
	function(req,res,next) {
		User.create(req.body, function(err, user) {
					if(err){
					 if(err.name === 'MongoError') {
					 	console.log('duplicate username');
					 	req.flash('error_msg', 'Duplicate username');
					 	return res.render('register');
					 }
					}
					console.log(user);
					req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/user/login');
				});	
	}

];


// NOT USED
module.exports.search = [
	function(req, res, next){
		if(req.body.search){
			var output = [];
			console.log(req.body.search);
			Tag.find({tag:req.body.search}, function(err,tags){
				if(err) return next(err);
				tags.forEach(function(tag){
					Post.findById(tag.post_id, function(err, posts){
						output.push(posts);
						//console.log(output);
					});

				}, function(){
					console.log(output);
				});
					
			});
		}
	}
];


// NOT USED
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