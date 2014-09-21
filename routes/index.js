var express = require('express');
var router = express.Router();
var post = require('./post');

/* GET home page. */
router.get('/', function(req, res) {
	res.send('test');
  //res.render('index');
});

router.get('/addpost', function(req, res) {
	post.addpost(req, res);
});

module.exports = router;
