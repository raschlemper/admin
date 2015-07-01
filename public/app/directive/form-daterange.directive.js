app.directive( 'dateRange', function (FORMAT) {

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/form-daterange.html',
        scope: {
            periodos: '=',
            dateInitial: '=',
            dateFinal: '=',
            divisor: '@'
        },
        link: function(scope, element, attrs) {
            
            scope.format = FORMAT.date;           

            scope.openInitial = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                if(scope.openedInitial) {
                    scope.openedInitial = false;  
                } else { 
                    if(scope.openedFinal) { $scope.openedFinal = false; }
                    scope.openedInitial = true;
                }
            };

            scope.openFinal = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                if(scope.openedFinal) { 
                    scope.openedFinal = false; 
                } else {
                    if(scope.openedInitial) scope.openedInitial = false;
                    scope.openedFinal = true;
                }
            };

            scope.verifyDate = function() {
                _.map(scope.periodos, function(periodo) {
                    var dates = angular.copy(scope.dateInitial).split("/");;
                    var dateIntialVerify = new Date(dates[2], dates[1] - 1, dates[0]);
                    dateIntialVerify.setDate(dateIntialVerify.getDate() + periodo.days);
                    if(dateIntialVerify.getTime() === scope.dateFinal.getTime()) {
                        periodo.checked = true;
                    } else {
                        periodo.checked = false;
                    }
                });
            }

        }  
    }

});