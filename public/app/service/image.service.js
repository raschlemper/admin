'use strict';

app.factory('Image', function($http) {

    var uploadFile = function(file) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/image/', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function() {})
            .error(function() {});
    }

    return {
        uploadFile: uploadFile
    }

});
