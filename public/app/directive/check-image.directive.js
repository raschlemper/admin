app.directive('checkImage', function ($q, ImageBuilder) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            // Utilizado nos elementos de images default
            attrs.$observe('ngSrc', function (ngSrc) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    var imageUser = ImageBuilder.createImageUserDefault();
                    element.attr('src', imageUser.full);
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = ngSrc;
                return deferred.promise;
            });

            // Utilizado nos elementos para inserir imagem
            attrs.$observe('ngfDefaultSrc', function (ngSrc) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    var imageUser = ImageBuilder.createImageUserDefault();
                    element.attr('src', imageUser.full);
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = ngSrc;
                return deferred.promise;
            });
        }
    };

});