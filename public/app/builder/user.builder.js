'use strict';

app.factory('UserBuilder', function(User, LISTS) {

	var createUserDefault = function() {
		var obj = User.create (
			null,
			"image/users/user.png",
			LISTS.providers[0].code,
			null,
			null,
			null
		);
		return angular.copy(obj);
	}

	var addSystems = function(systems) {
		_.map(systems, function(system) {
			obj.addSystems(
				system.id, 
				system.role, 
				system.dateInitial, 
				system.dateFinal
			);
		})
	}

	var createUserWidthoutImage = function(user) {
		var obj = User.create(
			null,
			"user.png",
			user.provider,
			user.name,
			user.email,
			user.password
		);
		addSystems(user.systems);
		return angular.copy(obj);
	}

	var createUserWidthImage = function(user, image) {
		var obj = User.create(
			null,
			"user.png",
			user.provider,
			user.name,
			user.email,
			user.password
		);
		addImage(image);
		addSystems(user.systems);
		return angular.copy(obj);
	}

	return {
		createUserDefault: createUserDefault,
		createUserWidthoutImage: createUserWidthoutImage,
		createUserWidthImage: createUserWidthImage
	}
});