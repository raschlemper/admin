'use strict';

app.controller('UserCtrl', function($scope, UserService, PaginationService, UserBuilder) {

    var init = function() {
        $scope.users = [];
        $scope.pagination = PaginationService.pagination;
        $scope.list = PaginationService.list;
        $scope.getAllUsers(); 
        $scope.msg = { success: null, error: null };
    }

    $scope.getAllUsers = function() {
        UserService.allUsers()
            .then(function(data) {
                getUser(data);
            })
            .catch(function() {
                $scope.users = [];
                $scope.msg.error = 'MSG.USER.SEARCH.ERROR';                
            });
    }

    var getUser = function(users) {
        $scope.users = _.map(users, function(user) {
            return UserBuilder.createUser(user, null);
        })
    }

    init();

});