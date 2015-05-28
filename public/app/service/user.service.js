'use strict';

app.factory('User', function($resource) {

    var User = $resource('/users/:id', {
        id: '@id'
    }, {
        getAll: {
            method: 'GET',
            isArray: true
        },
        get: {
            method: 'GET'
        }
    });

    return {

        allUsers: function(callback) {
            var cb = callback || angular.noop;
            return User.getAll({},
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        createUser: function(user, callback) {
            var cb = callback || angular.noop;
            return User.save(user,
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        getUser: function(user, callback) {
            var cb = callback || angular.noop;
            return User.get({
                    id: user._id
                },
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        }

    }

});
