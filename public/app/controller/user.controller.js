'use strict';

app.controller('UserCtrl', function($scope, $http, User, Pagination) {

    $scope.users = {};
    $scope.users = [];

    var getAllUsers = function() {
        User.allUsers()
            .then(function(data) {
                $scope.users = data;
            })
            .catch(function() {
                $scope.users = [];
            });
    }

    $scope.createUser = function() {
        User.createUser($scope.user)
            .then(function(data) {
                $scope.user = data;
            })
            .catch(function() {
                $scope.user = {};                
            });
    }

    $scope.getUser = function(user) {
        User.getUser(user)
            .then(function(data) {
                $scope.user = data;
                console.log($scope.user);
            })
            .catch(function() {
                $scope.user = {};                
            });
    }

    var init = function() {
        $scope.pagination = Pagination.pagination;
        $scope.list = Pagination.list;
        getAllUsers();
    }();

});
