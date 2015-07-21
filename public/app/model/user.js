'use strict';

app.factory('User', function() {
	
	var _image = null,
	    _provider = null,
	    _name = null,
	    _email = null,
	    _password = null,
	    _systems = [];

	var _cerate = function(image, provider, name, email, password) {
		this.image = image;
		this._provider = privider;
		this._name = name;
		this.email = email;
		this._password = password;
	}

	var _setSystems = function(systems) {
		this._systems = systems;
	}

	return {
		create: _create,
		setSystems: _setSystems
	}

});