var mongoose = require('mongoose'),
	Post = mongoose.model('post');


// Returns all submissions from users
module.exports.index = [
	function(req,res,next) {
		Post.find({}, function(err,posts){
			if(err) return next(err);
			res.render('student/index',{posts:posts});	
		});
		
	}
];


// Register new user
module.exports.add_work = [
	function(req,res,next) {
		if("title" in req.body && req.body !== ' ') {
			next();
		} else {
			res.sendStatus(400);
		}
	},
	function(req,res,next) {
		req.body.number_of_ratings = 0;
		req.body.avg_rating = 0;
		console.log(req.file.path);
		req.body.photo = '/uploads/' + req.file.filename;
		Post.create(req.body, function(err, post) {
					if(err) return next(err);
					console.log(post);
					res.redirect('/student/addwork');
				});	
	}

];


// View a certain user with a unique id
module.exports.view_user = function(req, res){
	user_id = req.params.id;
	Post.find({user:user_id}, function(err, posts){
		res.render('student/profile', {posts:posts});
	});
}