'use strict';

app.factory('UserBuilder', function(User, ImageBuilder, LISTS) {

	var createUserDefault = function() {
		var obj = User.create (
			null,
			null,
			null,
			null,
			null,
			LISTS.gender[0].code,
			null
		);
		obj.addImage(ImageBuilder.createImageUserDefault());	
		return obj;
	}

	var createUser = function(user, image) {
		var obj = User.create(
			user.id || user._id,
			user.name,
			user.lastname,
			user.username,
			user.email,
			user.gender,
			user.password
		);
		obj.addImage(ImageBuilder.createImageUser(user, image));
		addSystems(obj, user.systems);
		return obj;
	}

	var addSystems = function(obj, systems) {
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

	return {
		createUserDefault: createUserDefault,
		createUser: createUser
	}
});