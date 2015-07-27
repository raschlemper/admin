'use strict';

app.factory('System', function() {

	var system = {
		id: null,
	    name: null, 
	    description: null,
		image: null,
		icon: null,
		role: null,
		periodos: [],
		periodo: null,
		dateInitial: null,
		dateFinal: null,
		show: false
	}

	system.showSystem = function(show) {
		system.show = show;
	},

	system.addPermission = function(role) {
		system.role = role;
	},	

	system.addPeriod = function(periodos, periodo, dateInitial, dateFinal) {
		system.periodos = periodos;
        system.periodo = periodo;
		system.dateInitial = dateInitial;
		system.dateFinal = dateFinal;			
	}

	return {

		create: function(id, name, description, image, icon) {
			system.id = id;
			system.name = name;
			system.description = description;
			system.image = image;
			system.icon = icon;	
			return system;	
		}

	}

});