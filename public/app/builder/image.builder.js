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
			image
		);
		return obj;
	}

	var getImageName = function(user, image) {				
		if(image && image.name) return user._id || user.id;
		if(user.image && user.image.name) return user.image.name;
		return VALUE.imageNameUser;
	}

	return {
		createImageUserDefault: createImageUserDefault,
		createImageUser: createImageUser
	}
});