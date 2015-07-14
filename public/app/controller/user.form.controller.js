'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter,
    User, System, Image, Pagination, FORMAT, LISTS) {

    var init = function() {
        $scope.user = {};
        $scope.systems = [];
        $scope.image = "image/users/user.png"
        $scope.imageFileName = '';
        $scope.providers = LISTS.providers;
        $scope.roles = LISTS.roles;
        $scope.periodos = LISTS.periodos;
        $scope.getUser();
        $scope.getAllSystems();
    }

    var formDefault = function() {

    }

    var resetForm = function(form) {

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
            if($scope.files) { createUserWithImage($scope.files[0], $scope.user); }
            else { createUserWithoutImage($scope.user); }
            $scope.submitted = false;
            form.$setPristine();
        } else {
            $scope.msg.error = form.$error;
        }
    }

    var createUserWithoutImage = function(user) {  
        User.createUser(user)
            .then(function(data) {
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
    }

    var createUserWithImage = function(files, user) {  
        User.createUserWithImage(files[0], user)
            .then(function(data) {
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';           
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
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