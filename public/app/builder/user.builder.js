'use strict';

app.factory('UserBuilder', function(User, LISTS) {

	var pathImageDefault = "image/users/";
	var imageDefault = "user.png";

	var createUserDefault = function() {
		var obj = User.create (
			null,
			// pathImageDefault + imageDefault,
			LISTS.providers[0].code,
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
			// userImage,
			user.provider,
			user.name,
			user.email,
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
			// image,
			user.provider,
			user.name,
			user.email,
			user.password
		);
		if(!user.image) { user.image = imageDefault }
		obj.addImage(pathImageDefault, user.image);
		addSystems(obj, user.systems);
		return obj;
	}

	var getImagePath = function(image) {
		var img = image.split("/");
		return image.replace(img[img.length - 1], "");
	}

	var getImageName = function(image) {
		var img = image.split("/");
		return img[img.length - 1]
	}

	return {
		createUserDefault: createUserDefault,
		createUser: createUser,
		getUser: getUser
	}
});