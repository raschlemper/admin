'use strict';

app.factory('Image', function(Upload) {

    var uploadFile = function(file, name) {
        if (file) {
            Upload.upload({
                url: '/image/',
                fields: {'name': name},
                file: file
            })
            .progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            });
        }
    }

    return {
        uploadFile: uploadFile
    }

});
