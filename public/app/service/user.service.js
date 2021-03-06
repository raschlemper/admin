'use strict';

app.factory('UserService', function($http, $q, $resource, PromiseTrackerService, ImageService) {

    var UserResource = $resource('/api/users/:id', {
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
            return UserResource.query({},
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        getUser: function(id, callback) {
            var cb = callback || angular.noop;
            return UserResource.get({
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
            var promise = UserResource.save(user,
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
            PromiseTrackerService.addPromise(promise);
            return promise;
        },
        updateUser: function(user, callback) {
            var cb = callback || angular.noop;
            return UserResource.update({ 
                    id: user.id 
                }, user,
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        removeUser: function(user, callback) {
            var cb = callback || angular.noop;
            return UserResource.delete({
                    id: user.id
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
