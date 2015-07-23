'use strict';

app.factory('UserBuilder', function(User, LISTS) {

	var _createUserDefault = function() {
		return User.create(
			null,
			"image/users/user.png",
			LISTS.providers[0].code,
			null,
			null,
			null
		);
	}

	var _createUser = function(user) {
		var user = User.create(
			null,
			"user.png",
			user.provider,
			user.name,
			user.email,
			user.password
		);
		_.map(user.systems, function(system) {
			user.addSystems(
				system.id, 
				system.role, 
				system.dateInitial, 
				system.dateFinal
			);
		})
		return user;
	}

	return {
		createUserDefault: _createUserDefault,
		createUser: _createUser
	}
});