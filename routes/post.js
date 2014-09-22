
var person = require('./person');
var post = require('./schema').Post;

var getform = function(req, res) {
		person.getPeople(req, res, function(people) {
		console.log('post get people');
		console.log(people);
		console.log('above post get people');
		res.render('form', {'people': people});
	});
}

module.exports.savepost = function(req, res) {


console.log('savepost');
/*
var postTags = req.body.tags;

	var newPost = new post({
		title: req.body.title,
		picture: a,
		tags: postTags, 
		people: req.body.people

	});
	newPost.save(function(err, p) {
		if(err) {
			console.log('error saving post');
			console.log(err);
		} else {
			console.log('successfully saved post');
			console.log(p);
		}
	});

	console.log('get IN SAVE POST');
	console.log(req);
	*/
	getform(req, res);
}



module.exports.getform = getform;