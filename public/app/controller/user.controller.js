'use strict';

app.controller('UserCtrl', function($scope, $location, $stateParams, User, System, Pagination) {

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

    $scope.user = {};
    $scope.users = [];
    $scope.systems = [];
    $scope.msg = { success: null , error: null };

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
            .then(function(data) { })
            .catch(function() { });
    }

    $scope.updateUser = function(form) {
        $scope.submitted = true;
        if(form.$valid) {
            User.updateUser($scope.user)
                .then(function(data) { 
                    $scope.msg.success = "Usuário alterado com sucesso!";
                    // $location.url("/user");
                })
                .catch(function() { });
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


    $scope.getAllSystems = function() {
        System.allSystems()
            .then(function(data) {
                $scope.systems = data;
            })
            .catch(function() {
                $scope.systems = [];
            });
    };

    $scope.image = "image/users/user.png"
    $scope.imageFileName = '';

    $scope.$watch('image', function(oldVal, newVal) {
        console.log($scope.image);
    })

    $scope.selectionImage = function(value) {
        angular.element('#user').click();
        angular.element('#user').change(function(event) {    
            readerFile(event);
        });
    }

    var readerFile = function(event) {
        var file, name, reader, size, type;
        if (event != null) {
            event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function(evt) {
            //if (checkSize(size) && isTypeValid(type)) {
                return $scope.$apply(function() {
                    $scope.image = evt.target.result;
                    if (angular.isString($scope.imageFileName)) {
                        return $scope.imageFileName = name;
                    }
                });
            //}
        };
        file = event.target.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        return false;
    };

    var init = function() {
        $scope.pagination = Pagination.pagination;
        $scope.list = Pagination.list;
        $scope.getAllUsers();
        $scope.getUser();
        $scope.getAllSystems();
    }();

});