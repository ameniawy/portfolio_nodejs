var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var PortoSchema = new Schema({
	name:String,
	photo:String,
	links:[String],
	screenshots:[String],
	user:String

});



mongoose.model('portfolio', PortoSchema);