app.directive('loading', function(PromiseTracker) {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/alert.html',

        link: function(scope, element, attrs, ctrl) {

            scope.progress = PromiseTracker;
            
        }

    };

});