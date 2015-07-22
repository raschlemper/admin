'use strict';

app.factory('User', function() {
	
	var _image = null,
	    _provider = null,
	    _name = null,
	    _email = null,
	    _password = null,
	    _systems = [];

	var _create = function(image, provider, name, email, password) {
		return {
			image: image,
			provider: provider,
			name: name,
			email: email,
			password: password,
			systems: []
		}
	}

	var _setSystems = function(systems) {
		this._systems = systems;
	}

	return {
		create: _create,
		setSystems: _setSystems
	}

});