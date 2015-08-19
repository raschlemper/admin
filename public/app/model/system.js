'use strict';

app.factory('System', function() {

	var System = function() {

		this.id = null;
		this.name = null;
		this.description = null;
		this.image = null;
		this.icon = null;
		this.role = null;
		this.periodos = [];
		this.periodo = null;
		this.dateInitial = null;
		this.dateFinal = null;
		this.show = false;

		function System() {
			return this;
		}

		this.showSystem = function(show) {
			this.show = show;
		};

		this.addPermission = function(role) {
			this.role = role;
		};	

		this.addPeriod = function(periodos, periodo, dateInitial, dateFinal) {
			this.periodos = periodos;
	        this.periodo = periodo;
			this.dateInitial = dateInitial;
			this.dateFinal = dateFinal;			
		};

	}

	return {

		create: function(id, name, description, image, icon) {
			var system = new System();
			system.id = id;
			system.name = name;
			system.description = description;
			system.image = image;
			system.icon = icon;	
			return system;	
		}

	}

});