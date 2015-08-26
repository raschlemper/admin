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
		obj.addImage(pathImageDefault, imageDefault);
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
		if(image) { obj.addImage(getImagePath(), getImageName(image)); }
		else { obj.addImage(pathImageDefault, imageDefault); }
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
		if(!user.image) { user.image = imageDefault }
		obj.addImage(pathImageDefault, user.image);
		addSystems(obj, user.systems);
		return obj;
	}

	var getImagePath = function(image) {
		if(!image) return pathImageDefault;
		var img = image.split("/");
		return image.replace(img[img.length - 1], "");
	}

	var getImageName = function(image) {
		if(!image) return imageDefault;
		var img = image.split("/");
		return img[img.length - 1]
	}

	return {
		createUserDefault: createUserDefault,
		createUser: createUser,
		getUser: getUser
	}
});