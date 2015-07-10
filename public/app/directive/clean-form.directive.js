app.directive('cleanForm', function($location) {

    return {

        restrict: 'A',
        link: function(scope, element, attrs) {

            scope.$watch('form.$pristine', function(newVal, oldVal) {
                scope.form.$pristine;
                if (newVal && !oldVal) {
                    cleanElement();
                }
            });

            var cleanElement = function() {
                _.map(element[0], function(field) {
                    clean(field);
                })
            }

            var clean = function(field) {
                switch (field.type) {
                    case "select-one":
                        field.value = '';
                        break;
                    case "text":
                        field.value = '';
                        break;
                    case "email":
                        field.value = '';
                        break;
                    default:
                        field.value = '';
                }
            }

        }
    };
});