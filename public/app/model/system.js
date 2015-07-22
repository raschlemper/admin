'use strict';

app.factory('System', function() {

	var _id = null,
	    _name = null, 
	    _description = null,
		_image = null,
		_icon = null,
		_role = null,
		_periodos = [],
		_periodo = null,
		_dateInitial = null,
		_dateFinal = null;

	var _create = function(id, name, description, image, icon) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._image = image;
		this._icon = icon;
	}

	var _addPermission = function(role, periodos, periodo, dateInitial, dateFinal) {
		this._role = role;
		this._periodos = periodos;
        this._periodo = periodo;
		this._dateInitial = dateInitial;
		this._dateFinal = dateFinal;	
	}

	return {
		create: _create,
		addPermission: _addPermission
	}

});