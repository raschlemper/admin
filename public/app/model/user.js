'use strict';

app.factory('User', function() {

	var User = function() {

		this.id = null;
		this.image = null;
		this.name = null;
		this.lastname = null;
		this.username = null;
		this.fullname = null;
		this.email = null;
		this.gender = null;
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

		this.addImage = function(image) {
			this.image = image;
		}

		this.addSystems = function(id, role, dateInitial, dateFinal, system) {
			this.systems.push(
				addSystem(id, role, dateInitial, dateFinal, system)
			);
		}

	}

	return {	

		create: function(id, name, lastname, username, email, gender, password) {
			var user = new User();
			user.id = id;
			user.name = name;
			user.lastname = lastname;
			user.fullname = name + ' ' + lastname;
			user.username = username;
			user.email = email;
			user.gender = gender;
			user.password = password;
			user.systems = [];
			return user;
		}
	}

});