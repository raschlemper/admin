app.directive('message', function() {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/alert.html',
        scope: {
            success: '=',
            error: '=',
            dismiss: '='
        },

        link: function(scope, element, attrs, ctrl) {

            if(scope.dismiss) {
              scope.dismissible = 'alert-dismissible';
            }

            scope.msg = function(type) {
                switch (type) {
                    case 'success':
                        return scope.success;
                        break;
                    case 'error':
                        return scope.error;
                        break;
                    default:
                    return '';
                }
                
            }
        }

    };

});