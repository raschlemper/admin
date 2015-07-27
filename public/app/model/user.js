'use strict';

app.factory('User', function() {

	var user = {
		id: null,
		image: null,
		provider: null,
		name: null,
		email: null,
		password: null,
		systems: []
	}

	var createSystem = function(id, role, dateInitial, dateFinal) {
		return {
			id: id,
			role: role,
			dateInitial: dateInitial,
			dateFinal: dateFinal
		}
	}

	user.addImage = function(image) {
		user.image = image;
	}

	user.addSystems = function(id, role, dateInitial, dateFinal) {
		user.systems.push(
			createSystem(id, role, dateInitial, dateFinal)
		);
	}

	return {	

		create: function(id, image, provider, name, email, password) {
			user.id = id;
			user.image = image;
			user.provider = provider;
			user.name = name;
			user.email = email;
			user.password = password;
			user.systems = [];
			return user;
		}
	}

});