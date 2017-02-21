var mongoose = require('mongoose'),
	Post = mongoose.model('post'),
	Tag = mongoose.model('tag');


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
		if(req.file){
			req.body.photo = '/uploads/' + req.file.filename;
		}

		Post.create(req.body, function(err, post) {
					if(err) return next(err);
					console.log(post);
					if(req.body.tag1){
						Tag.create({
							tag:req.body.tag1,
							post_id:post.id
						}, function(err, tag){
							if(err) return next(err);
							next();
						})

					}
					if(req.body.tag2){
						Tag.create({
							tag:req.body.tag2,
							post_id:post.id
						}, function(err, tag){
							if(err) return next(err);
							next();
						})

					}
					req.flash('success_msg', 'Work added successfully');
					res.redirect('/student/addwork');
				});	
	}

];


// View a certain user with a unique id
module.exports.view_user = function(req, res){
	username = req.params.username;
	Post.find({user:username}, function(err, posts){
		res.render('student/profile', {posts:posts});
	});
}