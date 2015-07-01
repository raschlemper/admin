app.directive('listPagination', function() {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/list-pagination.html',
        scope: {
            data: '=',
            item: '='
        },

        link: function(scope, element, attrs, ctrl, transclude) {

            transclude(scope.$parent, function(clone, scope) {
                var c = angular.element(clone);
                console.log(clone, scope.item);
                element.append(clone);
            });

            scope.getData = function() {
                return scope.data;
            }

            scope.pagination = {
                currentPage: 1,
                maxPerPage: 6
            };

            scope.list = {
                begin: function(currentPage) {
                    return scope.pagination.maxPerPage * currentPage;
                },
                size: function(currentPage) {
                    var last = scope.list.begin(currentPage) - scope.data.length;
                    return -1 * (scope.pagination.maxPerPage - last);
                }
            };

        }

    };
});
