'use strict';

app.factory('SystemService', function($resource) {

    var System = $resource('/api/systems/:id', {
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

        allSystems: function(callback) {
            var cb = callback || angular.noop;
            return System.query({},
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        getSystem: function(id, callback) {
            var cb = callback || angular.noop;
            return System.get({
                    id: id
                },
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        createSystem: function(system, callback) {
            var cb = callback || angular.noop;
            return System.save(system,
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        updateSystem: function(system, callback) {
            var cb = callback || angular.noop;
            return System.update(system,
                function(data) {
                    return cb(data);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },
        removeSystem: function(id, callback) {
            var cb = callback || angular.noop;
            return System.delete({
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
