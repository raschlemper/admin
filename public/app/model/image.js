'use strict';

app.factory('Image', function() {

	var Image = function() {

		this.name = null;
		this.path = null;
		this.format = null;
		this.full = null;
		this.file = null;

		function Image() {
			return this;
		}

	}

	return {	

		create: function(name, format, path, file) {
			var image = new Image();
			image.name = name;
			image.format = format;
			image.path = path;
			image.full = path + name + '.' + format;
			image.file = file;
			return image;
		}
	}

});