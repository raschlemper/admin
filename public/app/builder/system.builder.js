'use strict';

app.factory('SystemBuilder', function(System, DateService, LISTS) {

	var createSystem = function(system) {
		var periodo = LISTS.periodos[3];
		var obj = System.create (
			system._id,
			system.name,
			system.description,
			system.image,
			system.icon
		);
		obj.showSystem(system.show);
		obj.addPermission('user');
		obj.addPeriod (
			LISTS.periodos,
			periodo,
			new Date(),
			DateService.addDaysToDate(new Date(), periodo.days)
		);
		return angular.copy(obj);
	}

	return {
		createSystem: createSystem
	}
});