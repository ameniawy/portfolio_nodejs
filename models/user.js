var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name:String,
	email:String,
	birthdate:Date,
	type:String,
	degree:String,
	username:{ type:String, unique:true, index:true, required:true, dropDups: true},
	password:String
});

UserSchema.pre('save', function (done) {
    var user = this;

    if (!user.isModified('password')) {
        return done();
    }

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return done(err);
        }
        user.password = hash;
        return done();
    });
});

UserSchema.methods.checkPassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        return done(err, isMatch);
    });
};

mongoose.model('user', UserSchema);
