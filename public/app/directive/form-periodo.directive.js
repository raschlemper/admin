app.directive( 'periodo', function ($filter, FORMAT) {    

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/form-periodo.html',
        scope: {
            periodos: '=',
            dateInitial: '=',
            dateFinal: '=',
            selection: '='
        },
        link: function(scope, element, attrs) {

            scope.$watch('selection', function(oldVal, newVal) {
                if(!_.isEqual(oldVal, newVal)) {
                    scope.getDate(scope.selection);
                }
            })

            scope.getDate = function(periodo) {
                var dateInitial = new Date();
                var dateFinal = new Date(); 
                dateFinal.setDate(dateInitial.getDate() + periodo.days);
                scope.dateInitial = $filter('date')(dateInitial, FORMAT.date);
                scope.dateFinal = $filter('date')(dateFinal, FORMAT.date);
                scope.selection = angular.copy(periodo);
            }

        }  
    }

});