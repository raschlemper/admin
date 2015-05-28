app.directive('listPagination', function() {

  var html = '<div class="list-group">' +
    '<span href="" class="list-group-item" ng-repeat="item in getData() | limitTo : list.begin(pagination.currentPage) | limitTo: list.size(pagination.currentPage)">'+
        '<ng-transclude/>'+
    '</span>'+
'</div>'+
'<div class="text-center">'+
    '<pagination total-items="data.length" ng-model="pagination.currentPage" class="pagination-md" items-per-page="pagination.maxPerPage" boundary-links="true" rotate="true" num-pages="pagination.numPages">'+
    '</pagination>'+
'</div>';

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/list-pagination.html',
        // template: '<div ng-transclude></div>',
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
