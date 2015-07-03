'use strict';

app.factory('Image', function(Upload) {

    var uploadFile = function(files, name) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/image/',
                    fields: {'username': hashCode()},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    }

    var hashCode = function() {
        return Math.floor(10000000000 + Math.random() * 90000000000);
    }

    return {
        uploadFile: uploadFile
    }

});
