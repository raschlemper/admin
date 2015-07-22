'use strict';

app.factory('UserBuilder', function(User, LISTS) {

	var _createUserDefault = function() {
		return User.create(
			"image/users/user.png",
			LISTS.providers[0].code,
			null,
			null,
			null
		);
	}

	return {
		createUserDefault: _createUserDefault
	}
});