'use strict';

app.controller('UserCtrl', function($scope, $q, $stateParams, UserService, ImageService, PaginationService, UserBuilder) {

    var init = function() {
        $scope.users = [];
        $scope.pagination = PaginationService.pagination;
        $scope.list = PaginationService.list;
        $scope.getAllUsers(); 
        $scope.getUser();
        $scope.msg = { success: null, error: null };
    }

    $scope.getAllUsers = function() {
        UserService.allUsers()
            .then(function(data) {
                builderUser(data);
            })
            .catch(function() {
                $scope.users = [];
                $scope.msg.error = 'MSG.USER.SEARCH.ERROR';                
            });
    }

    $scope.getUser = function() {        
        $scope.user = UserBuilder.createUserDefault();
        if (!$stateParams.id) return;
        UserService.getUser($stateParams.id)
            .then(function(data) {
                $scope.user = UserBuilder.createUser(data, null);
            })
            .catch(function() {
                $scope.user = {};
            });
    };

    $scope.removeUser = function(user) {
        var userImage = angular.copy(user);
        user.image = null;
        $q.all([
                UserService.removeUser(user),
                ImageService.removeFileUser(userImage)
            ])
            .then(function(data) {
                init(); 
                $scope.msg.success = 'MSG.USER.REMOVE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.SEARCH.ERROR';
            });
    }

    var builderUser = function(users) {
        $scope.users = _.map(users, function(user) {
            return UserBuilder.createUser(user, null);
        })
    }

    init();

});