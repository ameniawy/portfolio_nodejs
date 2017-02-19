var fs = require('fs'),
	path = require("path"),
	MongoClient = require('mongodb').MongoClient;




module.exports.create = function(request, response){
	response.json(request.body);
};

// rendering the html form for the user to create a new post
module.exports.new = function(request, response){
	var name = 'meniawyy'
	var players = ['lampard', 'drogba', 'terry']
	var collection = db.collection('users');
	collection.find().toArray(function(err, users){
		if(err)
			return console.log(err);
		console.log(users);
		

	});

	response.render('template', {players:players, name:name});
};

