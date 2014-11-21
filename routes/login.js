var bcrypt = require('bcrypt');
var multiparty = require('multiparty');
var user = require('./schema.js').User;


module.exports.getForm = function(req, res) {


}

module.exports.login = function(req, res) {

var form = new multiparty.Form();
form.parse(req, function(err, fields, files) {
	user.find(function(err, item) {
		if(err)
			console.log('error finding user: ' + err);

		if(item) {
			console.log('found user: ' + item);
			bcrypt.compare("B4c0/\/", hash, function(err, res) {
				if(res)
	    // res == true
			});
		}
	});
});





}