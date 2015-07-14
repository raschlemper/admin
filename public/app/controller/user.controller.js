'use strict';

app.controller('UserCtrl', function($scope, User, Pagination) {

    var init = function() {
        $scope.users = [];
        $scope.pagination = Pagination.pagination;
        $scope.list = Pagination.list;
        $scope.getAllUsers();
    }

    $scope.getAllUsers = function() {
        User.allUsers()
            .then(function(data) {
                $scope.users = data;
            })
            .catch(function() {
                $scope.users = [];
            });
    }

    init();

});