var mongoose = require('mongoose'),
	User = mongoose.model('user'),
	Tag = mongoose.model('tag'),
	Post = mongoose.model('post'),
	bcrypt = require('bcrypt');


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
					if(err){
					 if(err.name === 'MongoError') {
					 	console.log('duplicate username');
					 	return res.render('register', {message:'Duplicate username'});
					 }
					}
					console.log(user);
					res.redirect('/user/login');
				});	
	}

];


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