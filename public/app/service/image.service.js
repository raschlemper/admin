'use strict';

app.factory('ImageService', function($q, $http, Upload) {

    var progress = function(deferred, cb, evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);        
    }

    var success = function (deferred, cb, data, config) {
        // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        deferred.resolve(data);
        return cb();
    }

    var error = function (deferred, cb, err) {
        deferred.reject(err);
        return cb(err);
    }

    var uploadFileUser = function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        Upload.upload({
            url: '/image/user/',
            fields: { 'name': user.name },
            file: user.image
        })
        .progress(function(evt) {
            progress(deferred, cb, evt);        
        })
        .success(function (data, status, headers, config) {
            success(deferred, cb, data, config);
        })
        .error(function (err, status, headers, config) {
            error(deferred, cb, err);
        }.bind(this));
        return deferred.promise;
    }

    var uploadFile = function(file, name, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        if (file) {
            Upload.upload({
                url: '/image/',
                fields: {'name': name},
                file: file
            })
            .progress(function(evt) {
                progress(deferred, cb, evt);        
            })
            .success(function (data, status, headers, config) {
                success(deferred, cb, data, config);
            })
            .error(function (err, status, headers, config) {
                error(deferred, cb, err);
            }.bind(this));
        }
        return deferred.promise;
    }

    var removeFileUser = function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/image/user/remove/', {
               'name': user.image.name 
            },
            function(data) {
                return cb(data);
            },
            function(err) {
                return cb(err);
            }.bind(this));
        return deferred.promise;
    }

    return {
        uploadFileUser: uploadFileUser,
        uploadFile: uploadFile,
        removeFileUser: removeFileUser
    }

});
