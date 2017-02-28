var mongoose = require('mongoose'),
	Portfolio = mongoose.model('portfolio');


module.exports.summary = [
	function(req, res, next){
		Portfolio.find({}, function(err, data){
			if(err) return next(err);
			res.render('summary', {data:data});
		});
	}
];


module.exports.summary_page = [
	function(req, res, next){
	    var page = req.params.page;
	    Portfolio.find({}).populate({ path: 'portfolios' })
	        .limit(10)
	        .skip(10 * page)
	        .exec(function(err, portfolios) {
	            Portfolio.count().exec(function(err, count) {
	                if (err) { return next(err); }
	                res.render('summary', {
	                    data: portfolios,
	                    current: page,
	                    count: Math.ceil(count / 10)
	                });

	            });
	        });
		}
];


// Create Portfolio
module.exports.create_portfolio = [
		function(req,res,next){
			if(!req.body.links && (!req.files || req.files.length === 0)){
				req.flash('error_msg', 'Must add one link or image to create Portfolio');
				res.redirect('/student/portfolio');
			} else if(!req.body.name){
				req.flash('error_msg', 'Must add full name');
				res.redirect('/student/portfolio');
			} else{
				if(req.files){
					console.log(req.files);
					req.files.forEach(function(file){
						if(file.fieldname === 'photo'){
							req.body.photo = '/uploads/' + file.filename;
						} else {
							req.body.screenshots = '/uploads/' + file.filename;
						}
					});
				}
				if(req.body.link){
					var link = req.body.link;
					if(!link.startsWith('http://') && !link.startsWith('https://')){
						req.body.link = 'http://' + link;
					}					
				}
				next();
			}
		},
		function(req,res,next) {
			Portfolio.create(req.body, function(err, Portfolio) {
						if(err){
							console.log(err);
						}
						console.log(Portfolio);
						req.flash('success_msg', 'Portfolio created successfully');
						res.redirect('/student/' + req.user.username);
					});	
	}
]


// This function adds a new link to the portfolio
module.exports.add_link = function(req, res){
	var portfolio_id = req.body.portfolio_id;
	var link = req.body.link;
	if(!link.startsWith('http://') && !link.startsWith('https://')){
		link = 'http://' + link;
	}
	
	Portfolio.findByIdAndUpdate(portfolio_id,{
		$push: {"links": link}
	}, {safe: true, upsert: true, new : true}, function(err, portfolio){
		console.log(portfolio);
		res.redirect('/student/' + req.user.username);
	});
}


// This function adds a new image to the portfolio
module.exports.add_screenshot = function(req, res){
	var path_to_image = '/uploads/' + req.file.filename;
	var portfolio_id = req.body.portfolio_id;
	Portfolio.findByIdAndUpdate(portfolio_id,{
		$push: {"screenshots": path_to_image}
	}, {safe: true, upsert: true, new : true}, function(err, portfolio){
		console.log(portfolio);
		res.redirect('/student/' + req.user.username);
	});

}
	

// View a certain user with a unique id
module.exports.profile = function(req, res){
	username = req.params.username;
	Portfolio.findOne({user:username}, function(err, portfolio){
		res.render('student/profile', {portfolio:portfolio});
	});
}



// NOT USED
// Returns all submissions from users
/*module.exports.index = [
	function(req,res,next) {
		Post.find({}, function(err,posts){
			if(err) return next(err);
			res.render('student/index',{posts:posts});	
		});
		
	}
];*/
// Register new user
/*module.exports.add_work = [
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

];*/


// NOT USED
// View a certain user with a unique id
/*module.exports.view_user = function(req, res){
	username = req.params.username;
	Post.find({user:username}, function(err, posts){
		res.render('student/profile', {posts:posts});
	});
}*/