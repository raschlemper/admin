'use strict';

app.controller('UserFormUserCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {    

    $scope.getUser = function() {
        if (!$stateParams.id) {
            return;
        }
        UserService.getUser($stateParams.id)
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
            var user = UserBuilder.createUser($scope.user)
            if($scope.files) { createUserWithImage(form, $scope.files[0], user); }
            else { createUserWithoutImage(form, user); }
        } else {
            $scope.msg.error = 'Msg de formulario invalido';
        }
    }

    var setSystemsUser = function() {
        var systems = angular.copy($scope.user.systems);
        $scope.user.systems = _.map(systems, function(system) {
            return {
                _id: system._id,
                role: system.role,
                dateInitial: getDateFromStr.getDate(system.dateInitial),
                dateFinal: getDateFromStr.getDate(system.dateFinal)
            };
        })
    }

    var createUserWithoutImage = function(form, user) {  
        UserService.createUser(user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
        
    }

    var createUserWithImage = function(form, file, user) {  
        UserService.createUserWithImage(file, user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';           
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
    }

    $scope.updateUser = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            UserService.updateUser($scope.user)
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
        SystemService.allSystems()
            .then(function(data) {
                //addItensParaTeste(data);
                // var systems = setUpSystems(data);
                $scope.systems = data;
                $scope.systems = $scope.hideSystemBySelection($scope.systems);
            })
            .catch(function() {
                $scope.systems = [];
            });
    }

    $scope.getSystem = function(system) {
        $scope.systemSelection = system;
    }

    $scope.showSystems = function() {
        $scope.systemSelection = null;
    }

    $scope.addSystem = function(system) {  
        $scope.user.systems.push(system);
        system.show = !$scope.existSystem(system);
    }

    $scope.delSystem = function(system) {  
        $scope.user.systems.splice(system);
        system.show = !$scope.existSystem(system);
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
    // var addItensParaTeste = function(systems) {
    //     if(!$scope.user.systems) { $scope.user.systems = []; }
    //     $scope.addSystem(systems[0]);
    // }

    // $scope.showTab = function($event) {
    //     $event.preventDefault();
    //     angular.element(this).tab('show');
    // };

    init();

});
