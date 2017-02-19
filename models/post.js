var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title:String,
	description:String,
	photo:String,
	link:String,
	user:String,
    avg_rating:String,
    number_of_ratings:Number

});



mongoose.model('post', PostSchema);
