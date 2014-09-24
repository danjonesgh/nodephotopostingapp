var prop = require('./schema.js').Property;

var getform = function(req, res) {
	getPeople(function(people) {
		console.log('people');
		console.log(people);
		if(!people)
			people = [];
			//people = ['one', 'two'];
		res.render('personform', {'people': people});
	});
};

module.exports.getform = getform;

var getPeople = function(callback) {
	prop.find({'type': 'people'}, function(err, p) {
		//console.log(p.data);
		if(p) {
			if(p.length > 0)
				callback(p[0].data);
			else 
				callback(null);
		}
		else 
			callback(null);
	});
};

module.exports.getPeople = getPeople;


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
		

				console.log('found property');
				console.log(p);
				if(p.length > 0) {
					peopleArray = p[0].data;
					peopleArray.push(personToAdd);
					prop.update({
						type: 'people',
						data: peopleArray
					},
					function(err, result) {
						if(err) {
							console.log('error upserting doc');
							console.log(err);
						} else {
							console.log('successfully upserted document?');
							console.log(result);
							getform(req, res);
						}
					});
				}
				else {
					//peopleArray = p[0].data;
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
							getform(req, res);
						}
					});
				}


			
		}
	});

}