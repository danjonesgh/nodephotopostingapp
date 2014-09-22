var prop = require('./schema.js').Property;

module.exports.getform = function(req, res) {
	res.render('personform');
}


module.exports.getPeople = function(req, res, callback) {
	prop.find({'type': 'people'}, function(err, p) {
		//console.log(p.data);
		callback(p.data);
	});
}


module.exports.saveperson = function(req, res) {
	var personToAdd = req.body.person;
	var peopleArray = [];


	//console.log(req);



	//prop.findOneAndUpdate({'type': 'people'}, )



	prop.find({'type': 'people'}, function(err, p) {


		if(err) {
			console.log('error finding property');
			peopleArray.push(personToAdd);
			var newProperty = new prop({
				'type': 'people',
				'data': peopleArray
			});
			newProperty.save(function(err, property) {
				if(err) {
					console.log('error saving new/first property');
					console.log(err);
				} else {
					console.log('successfully saved new/first property?');
					console.log(property);
				}
			});
		} else {
			if(p) {

				console.log('found property');
				console.log(p);
				peopleArray = p.data;
				peopleArray.push(personToAdd);
				prop.update(
					{type: 'people'},
					{data: peopleArray},
					{upsert: true},
					function(err, result, a) {
						if(err) {
							console.log('error upserting doc');
							console.log(err);
						} else {
							console.log('successfully upserted document?');
							console.log(result);
							res.render('personform');
						}
					});
			} else {
				peopleArray.push(personToAdd);
				var newProperty = new prop({
					'type': 'people',
					'data': peopleArray
				});
				newProperty.save(function(err, property) {
					if(err) {
						console.log('error saving new/first property');
						console.log(err);
					} else {
						console.log('successfully saved new/first property?');
						console.log(property);
						res.render('personform');
					}
				});
			}
		}
	});

}