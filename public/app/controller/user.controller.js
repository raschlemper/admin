'use strict';

app.controller('UserCtrl', function($scope, UserService, PaginationService) {

    var init = function() {
        $scope.users = [];
        $scope.pagination = PaginationService.pagination;
        $scope.list = PaginationService.list;
        $scope.getAllUsers();
    }

    $scope.getAllUsers = function() {
        UserService.allUsers()
            .then(function(data) {
                $scope.users = data;
            })
            .catch(function() {
                $scope.users = [];
            });
    }

    init();

});