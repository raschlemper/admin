'use strict';

app.controller('UserCtrl', function($scope, $http, $stateParams, User, Pagination) {

    $scope.providers = [{
        code: 'local',
        descricao: 'Local'
    }, {
        code: 'producao',
        descricao: 'Produção'
    }];

    $scope.roles = [{
        code: 'user',
        descricao: 'Usuário'
    }, {
        code: 'admin',
        descricao: 'Administrador'
    }];

    $scope.users = {};
    $scope.users = [];

    $scope.getAllUsers = function() {
        User.allUsers()
            .then(function(data) {
                $scope.users = data;
            })
            .catch(function() {
                $scope.users = [];
            });
    }

    $scope.getUser = function() {
        if (!$stateParams.id) {
            return;
        }
        User.getUser($stateParams.id)
            .then(function(data) {
                $scope.user = data;
            })
            .catch(function() {
                $scope.user = {};
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

    $scope.updateUser = function(form) {
        $scope.submitted = true;
        if(form.$valid) {
            User.updateUser($scope.user)
                .then(function(data) {
                    $scope.user = data;
                })
                .catch(function() {
                    $scope.user = {};
                });
        }
    }

    $scope.removeUser = function(user) {
        if (!user) {
            return;
        }
        User.removeUser(user._id)
            .then(function(data) {
                removeUserFromList(user);
            })
            .catch(function() {
                $scope.user = {};
            });
    }

    var removeUserFromList = function(user) {
        $scope.users = _.without($scope.users, user);
    }

    var init = function() {
        $scope.pagination = Pagination.pagination;
        $scope.list = Pagination.list;
        $scope.getAllUsers();
        $scope.getUser();
    }();

});