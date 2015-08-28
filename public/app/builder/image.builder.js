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
			user.image.name || VALUE.imageNameUser,
			VALUE.imageFormatUser,
			VALUE.imagePathUser,
			image
		);
		return obj;
	}

	return {
		createImageUserDefault: createImageUserDefault,
		createImageUser: createImageUser
	}
});