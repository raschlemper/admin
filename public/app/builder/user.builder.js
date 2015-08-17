'use strict';

app.factory('UserBuilder', function(User, LISTS) {

	var pathImageDefault = "image/users/";
	var imageDefault = "user.png";

	var createUserDefault = function() {
		var obj = User.create (
			null,
			pathImageDefault + imageDefault,
			LISTS.providers[0].code,
			null,
			null,
			null
		);
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

	var createUser = function(user, image) {
		var obj = User.create(
			user.id,
			imageDefault,
			user.provider,
			user.name,
			user.email,
			user.password
		);
		if(image) { obj.addImage(image); }
		addSystems(obj, user.systems);
		return obj;
	}

	var getUser = function(user) {
		if(!user.image) { user.image = imageDefault}
		var image = pathImageDefault + user.image;
		var obj = User.create(
			user._id,
			image,
			user.provider,
			user.name,
			user.email,
			user.password
		);
		addSystems(obj, user.systems);
		return obj;
	}

	return {
		createUserDefault: createUserDefault,
		createUser: createUser,
		getUser: getUser
	}
});