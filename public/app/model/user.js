'use strict';

app.factory('User', function() {

	var User = function() {

		this.id = null;
		this.image = { name: null, path: null, full: null };
		this.provider = null;
		this.name = null;
		this.email = null;
		this.password = null;
		this.systems = [];

		function User() {
			return this;
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

		this.addImage = function(path, name) {
			this.image = { name: name, path: path, full: path + name };
		}

		this.addSystems = function(id, role, dateInitial, dateFinal, system) {
			this.systems.push(
				addSystem(id, role, dateInitial, dateFinal, system)
			);
		}

	}

	return {	

		create: function(id, provider, name, email, password) {
			var user = new User();
			user.id = id;
			// user.image = image;
			user.provider = provider;
			user.name = name;
			user.email = email;
			user.password = password;
			user.systems = [];
			return new Object(user);
		}
	}

});