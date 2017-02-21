var express = require('express'),
	app = express(),
	port = 8080,
	ejsLayouts = require("express-ejs-layouts"),
	fileUpload = require('express-fileupload'),
	mongoose = require('mongoose');

var	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	passport = require("passport"),
	session = require("express-session");


// Model we are using to communicate with the DB
require('./models/user')
require('./models/post')
require('./models/tag')


// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express Session
var session = require('express-session');
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());


//static file server directory
app.use(express.static(__dirname + '/public'));	


//set view engine (default is jade), this is used to parse data in the html files
app.set('view engine', 'ejs');
app.use(ejsLayouts);


// Connecting to the mongoDB with the DB 'example'
mongoose.connect('mongodb://localhost/guc')

var setUpPassport = require("./setuppassport");
setUpPassport();

// Global Variables
app.use(function (req, res, next) {
	res.locals.req = req;
	res.locals.res = res;
	res.locals.user = req.user || null;
	next();
});

// ROUTES
var routes = require('./routes/routes');
var user_routes = require('./routes/user');
var student_routes = require('./routes/student');

app.use('/', routes);
app.use('/user', user_routes);
app.use('/student', student_routes);

app.listen(port);
console.log('sever on port %s',port);