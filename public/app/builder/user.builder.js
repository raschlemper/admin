'use strict';

app.factory('UserBuilder', function(User, LISTS) {

	var pathImageDefault = "image/users/";
	var imageDefault = "user.png";

	var createUserDefault = function() {
		var obj = User.create (
			null,
			null,
			null,
			null,
			null,
			null,
			null
		);
		obj.addImage(pathImageDefault, imageDefault, null);	
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
		user.image = addImageDefault(user, image);
		obj.addImage(user.image.path, user.image.name, image);	
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

	var addImageDefault = function(user, image) {
		var name = imageDefault;
		if(!user.image.name) { name = user.image };
		if(user.image.name) { name = user.image.name; }
		return {
			path: pathImageDefault,
			name: name
		};
	}

	return {
		createUserDefault: createUserDefault,
		createUser: createUser
	}
});