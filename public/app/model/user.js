'use strict';

app.factory('User', function() {

	var id,
		image = image,
		provider = provider,
		name = name,
		email = email,
		password = password,
		systems = [];

	var create = function(id, image, provider, name, email, password) {
		this.id = id;
		this.image = image;
		this.provider = provider;
		this.name = name;
		this.email = email;
		this.password = password;
		this.systems = [];
		return this;
	}

	var createSystem = function(id, role, dateInitial, dateFinal) {
		return {
			id: id,
			role: role,
			dateInitial: dateInitial,
			dateFinal: dateFinal
		}
	}

	var addSystems = function(id, role, dateInitial, dateFinal) {
		this._systems.push(
			createSystem(id, role, dateInitial, dateFinal)
		);
		return this;
	}

	return {
		create: create,
		addSystems: addSystems
	}

});