var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var TagSchema = new Schema({
	tag:String,
	post_id:String

});



mongoose.model('tag', TagSchema);
