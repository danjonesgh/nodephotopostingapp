
var person = require('./person');
var post = require('./schema').Post;

var getform = function(req, res, msg) {
		person.getPeople(function(people) {
		//console.log('msg ' + msg);
		if(!people)
			people = [];
		res.render('form', {'people': people, 'message': msg});
	});
}

var getPosts = function(req, res, callback) {
	post.find(function(err, result) {
		if(err) {
			console.log('error finding posts');
			console.log(err);
		} 
		else {
			if(result.length > 0) {
				console.log('result greater than zero');
				//console.log(result);
				callback(result);
			}
			else {
				console.log('posts empty');
				callback(null);
			}
		}
	});
};

module.exports.getPosts = getPosts;

module.exports.savepost = function(req, res) {

	var amazonstring = 'https://s3-us-west-2.amazonaws.com/groupmessagemoments/';//Screen_Shot_2014-09-15_at_9.44.26_PM.png;
	//https://s3-us-west-2.amazonaws.com/groupmessagemoments/Screen_Shot_2014-09-15_at_9.44.26_PM.pngconsole.log('savepost');
	//console.log(req.body);
	//console.log(req.files);
	var r = new RegExp(' ', 'g');
	var postTags = req.body.tags;

	var newPost = new post({
		title: req.body.title,
		picture: req.files.pic.originalFilename.replace(r, '_'),
		tags: postTags, 
		people: req.body.people

	});
	newPost.save(function(err, p) {
		if(err) {
			console.log('error saving post');
			console.log(err);
			var msg = false;
			getform(req, res, msg);
		} else {
			console.log('successfully saved post');
			var msg = true;
			getform(req, res, msg);
			//console.log(p);
		}
	});

	
}



module.exports.getform = getform;