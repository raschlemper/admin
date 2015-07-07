'use strict';

app.factory('Image', function($q, Upload) {

    var uploadFileUser = function(file, name, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        Upload.upload({
            url: '/users/image/',
            fields: { 'name': name },
            file: file
        })
        .progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        })
        .success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            deferred.resolve(data);
            return cb();
        })
        .error(function (err, status, headers, config) {
            deferred.reject(err);
            return cb(err);
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
            .progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            })
            .success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                deferred.resolve(data);
                return cb();
            })
            .error(function (err, status, headers, config) {
                deferred.reject(err);
                return cb(err);
            }.bind(this));
        }
        return deferred.promise;
    }

    return {
        uploadFileUser: uploadFileUser,
        uploadFile: uploadFile
    }

});
