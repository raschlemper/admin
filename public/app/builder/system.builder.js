'use strict';

app.factory('SystemBuilder', function(System, DateService, LISTS) {

	var _createSystem = function(system) {
		var periodo = LISTS.periodos[3];
		System.create (
			system._id,
			system.name,
			system.description,
			system.image,
			system.icon
		);
		System.addPermission (
			'user',
			LISTS.periodos,
			periodo,
			new Date(),
			DateService.addDaysToDate(new Date(), periodo.days)
		);
		return System;
	}

	return {
		createSystem: _createSystem
	}
});