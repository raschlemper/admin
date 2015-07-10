'use strict';

app.controller('UserCtrl', function($scope, $location, $stateParams, $filter,
    User, System, Image, Pagination, FORMAT, LISTS) {

    var init = function() {
        $scope.user = {};
        $scope.users = [];
        $scope.systems = [];
        $scope.msg = { success: null, error: null };
        $scope.image = "image/users/user.png"
        $scope.imageFileName = '';
        $scope.format = 'dd/MM/yyyy';
        $scope.providers = LISTS.providers;
        $scope.roles = LISTS.roles;
        $scope.periodos = LISTS.periodos;
        $scope.pagination = Pagination.pagination;
        $scope.list = Pagination.list;
        $scope.getAllUsers();
        $scope.getUser();
        $scope.getAllSystems();
        $scope.pattern = '[a-zA-Z]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}';
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

    $scope.createUser = function(form) {  
        $scope.submitted = true;
        if (form.$valid) { 
            User.createUserWithImage($scope.files[0], $scope.user)
                .then(function(data) {
                    $scope.msg.success = "Usuário cadastrado com sucesso!";                
                })
                .catch(function() {
                    $scope.msg.error = "Problemas ao cadastrar o usuário!";
                });
        } else {
            $scope.msg.error = form.$error;
        }
    }

    $scope.updateUser = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            User.updateUser($scope.user)
                .then(function(data) {
                    $scope.msg.success = "Usuário alterado com sucesso!";
                    // $location.url("/user");
                })
                .catch(function(e) {
                    $scope.msg.error = "Problemas ao alteradar o usuário!";

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

    $scope.getAllSystems = function() {
        System.allSystems()
            .then(function(data) {
                addItensParaTeste(data);
                var systems = addFieldsToSystems(data);
                $scope.systems = $scope.hideSystemBySelection(systems);
            })
            .catch(function() {
                $scope.systems = [];
            });
    }

    $scope.getSystem = function(system) {
        $scope.systemSelection = system;
    }

    $scope.addSystem = function(system) {  
        $scope.user.systems.push(system);
        system.show = !$scope.existSystem(system);
    }

    $scope.delSystem = function(system) {  
        $scope.user.systems.splice(system);
        system.show = !$scope.existSystem(system);
    }

    var addFieldsToSystems = function(systems) {
        return _.map(systems, function(system) {
            system.role = 'user';
            system.dateInitial = new Date();
            system.dateFinal = new Date(); 
            system.periodos = angular.copy($scope.periodos);
            system.periodo = system.periodos[3];
            return system;
        })
    }

    $scope.hideSystemBySelection = function(systems) {
        return _.map(systems, function(system) {
            system.show = !$scope.existSystem(system);
            return system;
        })
    }

    $scope.existSystem = function(system) {
        return _.contains($scope.user.systems, system);
    }

    // Apenas para teste
    var addItensParaTeste = function(systems) {
        if(!$scope.user.systems) { $scope.user.systems = []; }
        $scope.addSystem(systems[0]);
    }

    init();

});