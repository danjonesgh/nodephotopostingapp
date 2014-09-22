var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title: String,
	picture: String,
	tags: [String], 
	people: [String]
});
var Post = mongoose.model('posts', postSchema);


var propSchema = new mongoose.Schema({
	type: String,
	data: [String]
});
var Property = mongoose.model('property', propSchema);


module.exports.Post = Post;
module.exports.Property = Property;