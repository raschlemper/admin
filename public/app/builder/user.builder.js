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
			user.name,
			user.lastname,
			user.username,
			user.email,
			user.gender,
			user.password
		);
		obj.addImage(user.image.path, user.image.name, image);	
		addSystems(obj, user.systems);
		return obj;
	}

	var getUser = function(user) {
		var obj = User.create(
			user._id,
			user.name,
			user.lastname,
			user.username,
			user.email,
			user.gender,
			user.password
		);
		if(!user.image) { user.image = addImageDefault(); }
		//if(user.image.path && user.image.name) { obj.addImage(user.image.path, user.image.name, null); }
		//else { obj.addImage(pathImageDefault, user.image, null); }
		obj.addImage(pathImageDefault, user.image, null);
		addSystems(obj, user.systems);
		return obj;
	}

	var addImageDefault = function() {
		return {
			path: pathImageDefault,
			name: imageDefault
		}
	}

	var getImageName = function(image) {
		if(!image) return imageDefault;
		return image.name;
	}

	var getImageFile = function(image) {
		if(!image) return null;
		if(!image.name || !image.size || !image.type) return null;
		return image;
	}

	return {
		createUserDefault: createUserDefault,
		createUser: createUser,
		getUser: getUser
	}
});