'use strict';

app.factory('System', function() {

	var id = null,
	    name = null, 
	    description = null,
		image = null,
		icon = null,
		role = null,
		periodos = [],
		periodo = null,
		dateInitial = null,
		dateFinal = null,
		show = false;

	var create = function(id, name, description, image, icon) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.image = image;
		this.icon = icon;
		return this;
	}

	var showSystem = function(show) {
		this.show = show;
		return this;
	}

	var addPermission = function(role) {
		this.role = role;
		return this;
	}

	var addPeriod = function(periodos, periodo, dateInitial, dateFinal) {
		this.periodos = periodos;
        this.periodo = periodo;
		this.dateInitial = dateInitial;
		this.dateFinal = dateFinal;	
		return this;		
	}

	return {
		create: create,
		showSystem: showSystem,
		addPermission: addPermission,
		addPeriod: addPeriod
	}

});