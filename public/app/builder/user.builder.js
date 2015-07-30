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

	var addSystems = function(obj, systems) {
		_.map(systems, function(system) {
			obj.addSystems(
				system.id, 
				system.role, 
				system.dateInitial, 
				system.dateFinal, 
				null
			);
		})
	}

	var createSystems = function(obj, systems) {
		_.map(systems, function(system) {
			obj.addSystems(
				system.id, 
				system.role, 
				system.dateInitial, 
				system.dateFinal,
				system.system
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
		addSystems(obj, user.systems);
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
		obj.addImage(image);
		addSystems(obj, user.systems);
		return angular.copy(obj);
	}

	var getUser = function(user) {
		var image = "image/users/" + user.image;
		var obj = User.create(
			user._id,
			image,
			user.provider,
			user.name,
			user.email,
			user.password
		);
		createSystems(obj, user.systems);
		return angular.copy(obj);
	}

	return {
		createUserDefault: createUserDefault,
		createUserWidthoutImage: createUserWidthoutImage,
		createUserWidthImage: createUserWidthImage,
		getUser: getUser
	}
});