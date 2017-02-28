// student routes file
var express = require('express');
var router = express.Router();
var studentController = require('../controllers/student');

// File upload package
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/', rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  } });


//router.get('/', studentController.summary);


// GET, POST for creating a portfolio
router.get('/portfolio', ensureAuthenticated, function(req, res){
	res.render('student/create_portfolio');
});
router.post('/portfolio', upload.any(), studentController.create_portfolio);


// POST of adding a link or a screenshot to a certain portfolio
router.post('/add_link', studentController.add_link);
router.post('/add_screenshot', upload.single('photo'), studentController.add_screenshot);


// Get the profile of a certain user
router.get('/:username', studentController.profile);


// Function that checks if user is logged in
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/user/login");
	}
}

module.exports = router;