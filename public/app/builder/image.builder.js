'use strict';

app.factory('ImageBuilder', function(Image, VALUE) {

	var createImageUserDefault = function() {
		var obj = Image.create (
			VALUE.imageNameUser,
			VALUE.imageFormatUser,
			VALUE.imagePathUser,
			null
		);
		return obj;
	}

	var createImageUser = function(user, image) {
		var obj = Image.create (
			getImageName(user, image),
			VALUE.imageFormatUser,
			VALUE.imagePathUser,
			image,
			getImageStatus(user)
		);
		return obj;
	}

	var getImageName = function(user, image) {				
		if(image && image.name) return user._id || user.id;
		if(user.image && user.image.name) return user.image.name;
		return VALUE.imageNameUser;
	}

	var getImageFormat = function(user, image) {		
		if(image && image.type) return image.type;
		if(user.image && user.image.type) return user.image.type;
		return VALUE.imageFormatUser;
	}

	var getImageStatus = function(user) {		
		if(user && (user._id || user.id)) return false;
		if(user.image && user.image.name) return false;
		return true;
	}

	return {
		createImageUserDefault: createImageUserDefault,
		createImageUser: createImageUser
	}
});