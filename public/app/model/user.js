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

	var addSystem = function(id, role, dateInitial, dateFinal, system) {
		var result = {};
		if(system) {			
			_.extend(result, {
				name: system.name,
				description: system.description,
				icon: system.icon,
				image: system.image
			})
		}
		_.extend(result, {
			id: id,
			role: role,
			dateInitial: dateInitial,
			dateFinal: dateFinal
		})
		return result;
	}

	user.addImage = function(image) {
		user.image = image;
	}

	user.addSystems = function(id, role, dateInitial, dateFinal, system) {
		user.systems.push(
			addSystem(id, role, dateInitial, dateFinal, system)
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
			return new Object(user);
		}
	}

});