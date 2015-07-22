'use strict';

app.factory('User', function() {

	var _create = function(id, image, provider, name, email, password) {
		return {
			id: id,
			image: image,
			provider: provider,
			name: name,
			email: email,
			password: password,
			systems: []
		}
	}

	var _createSystem = function(id, role, dateInitial, dateFinal) {
		return {
			id: id,
			role: role,
			dateInitial: dateInitial,
			dateFinal: dateFinal
		}
	}

	var _addSystems = function(id, role, dateInitial, dateFinal) {
		this._systems.push(_createSystem(
			id, role, dateInitial, dateFinal
		));
	}

	return {
		create: _create,
		addSystems: _addSystems
	}

});