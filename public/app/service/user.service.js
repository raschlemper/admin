'use strict';

app.factory('User', function($resource) {

    var User = $resource('/users/:id', {
        id: '@id'
    }, {
        getAll: {
            method: 'GET',
            isArray: true
        },
        update: {
            method: 'PUT'
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
        getUser: function(id, callback) {
            var cb = callback || angular.noop;
            return User.get({
                    id: id
                },
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
        updateUser: function(user, callback) {
            var cb = callback || angular.noop;
            return User.update(user,
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        removeUser: function(id, callback) {
            var cb = callback || angular.noop;
            return User.delete({
                    id: id
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
