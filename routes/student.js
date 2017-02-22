// student routes file
var express = require('express');
var router = express.Router();
var studentController = require('../controllers/student');
var passport = require("passport");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/', rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  } });


//router.get('/', studentController.index);

/*router.get('/addwork', ensureAuthenticated, function(req, res){
	res.render('student/add');
});*/


//router.post('/addwork', upload.single('photo'), studentController.add_work);

router.get('/portfolio', ensureAuthenticated, function(req, res){
	res.render('student/create_portfolio');
});
router.post('/portfolio', upload.any(), studentController.create_portfolio);


router.post('/add_link', studentController.add_link);
router.post('/add_screenshot', upload.single('photo'), studentController.add_screenshot);


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