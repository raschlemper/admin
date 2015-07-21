'use strict';

app.factory('ImageService', function($q, Upload) {

    var _progress = function(deferred, cb, evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);        
    }

    var _success = function (deferred, cb, data, config) {
        // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        deferred.resolve(data);
        return cb();
    }

    var _error = function (deferred, cb, err) {
        deferred.reject(err);
        return cb(err);
    }

    var _uploadFileUser = function(file, user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        Upload.upload({
            url: '/users/image/',
            fields: { 'name': user.name, 'email': user.email },
            file: file
        })
        ._progress(function(evt) {
            progress(deferred, cb, evt);        
        })
        ._success(function (data, status, headers, config) {
            success(deferred, cb, data, config);
        })
        ._error(function (err, status, headers, config) {
            error(deferred, cb, err);
        }.bind(this));
        return deferred.promise;
    }

    var _uploadFile = function(file, name, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        if (file) {
            Upload.upload({
                url: '/image/',
                fields: {'name': name},
                file: file
            })
            ._progress(function(evt) {
                progress(deferred, cb, evt);        
            })
            ._success(function (data, status, headers, config) {
                success(deferred, cb, data, config);
            })
            ._error(function (err, status, headers, config) {
                error(deferred, cb, err);
            }.bind(this));
        }
        return deferred.promise;
    }

    return {
        uploadFileUser: _uploadFileUser,
        uploadFile: _uploadFile
    }

});
