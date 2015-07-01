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

            scope.$watch('dateInitial', function(oldVal, newVal) {
                if(!_.isEqual(oldVal, newVal)) {
                    verifyDate();
                }
            })

            scope.$watch('dateFinal', function(oldVal, newVal) {
                if(!_.isEqual(oldVal, newVal)) {
                    verifyDate();
                }
            })

            var verifyDate = function() {
                _.map(scope.periodos, function(periodo) {
                    var dateIntial = getDate(scope.dateInitial);
                    var dateFinal = getDate(scope.dateFinal);
                    var dateIntialVerify = dateIntial;
                    dateIntialVerify.setDate(dateIntial.getDate() + periodo.days);
                    if(dateIntialVerify.getTime() === dateFinal.getTime()) {
                        periodo.checked = true;
                    } else {
                        periodo.checked = false;
                    }
                });
            }

            var getDate = function(date) {
                if(_.isDate(date)) return date;
                var dates = angular.copy(date).split("/");;
                return new Date(dates[2], dates[1] - 1, dates[0]);
            }

        }  
    }

});