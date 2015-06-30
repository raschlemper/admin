'use strict';

app.controller('UserCtrl', function($scope, $location, $stateParams, $filter, User, System, Pagination) {

    // Criar constantes tipo enum
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

    $scope.periodos = [{
        code: 'dia',
        descricao: '1 Dia',
        days: 1
    },{
        code: 'semana',
        descricao: '7 Dias',
        days: 7
    },{
        code: 'quinzena',
        descricao: '15 Dias',
        days: 15
    },{
        code: 'mes',
        descricao: '30 Dias',
        days: 30
    }];

    $scope.user = {};
    $scope.users = [];
    $scope.systems = [];
    $scope.msg = {
        success: null,
        error: null
    };
    $scope.image = "image/users/user.png"
    $scope.imageFileName = '';
    $scope.format = 'dd/MM/yyyy';
    $scope.periodoSelect = $scope.periodos[2].code;

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
            .then(function(data) {})
            .catch(function() {});
    }

    $scope.updateUser = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            User.updateUser($scope.user)
                .then(function(data) {
                    $scope.msg.success = "Usuário alterado com sucesso!";
                    // $location.url("/user");
                })
                .catch(function() {});
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
                $scope.systems = $scope.hideSystemBySelection(data);
            })
            .catch(function() {
                $scope.systems = [];
            });
    };

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

    $scope.openInitial = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedInitial) {
            $scope.openedInitial = false;  
        } else { 
            if($scope.openedFinal) { $scope.openedFinal = false; }
            $scope.openedInitial = true;
        }
    };

    $scope.openFinal = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedFinal) { 
            $scope.openedFinal = false; 
        } else {
            if($scope.openedInitial) $scope.openedInitial = false;
            $scope.openedFinal = true;
        }
    };

    $scope.getDate = function(periodo) {
        var dateInitial = new Date();
        var dateFinal = new Date(); 
        dateFinal.setDate(dateInitial.getDate() + periodo.days);
        $scope.dateInitial = $filter('date')(dateInitial, 'dd/MM/yyyy');
        $scope.dateFinal = $filter('date')(dateFinal, 'dd/MM/yyyy');
    }

    $scope.verifyDate = function() {
        _.map($scope.periodos, function(periodo) {
            var dates = angular.copy($scope.dateInitial).split("/");;
            var dateIntialVerify = new Date(dates[2], dates[1] - 1, dates[0]);
            dateIntialVerify.setDate(dateIntialVerify.getDate() + periodo.days);
            if(dateIntialVerify.getTime() === $scope.dateFinal.getTime()) {
                $scope.periodoSelect = periodo.code;
            }
        });
    }


    var init = function() {
        $scope.pagination = Pagination.pagination;
        $scope.list = Pagination.list;
        $scope.getAllUsers();
        $scope.getUser();
        $scope.getAllSystems();
        $scope.image = "image/users/user.png"
        $scope.imageFileName = '';
        $scope.format = 'dd/MM/yyyy';
    }();

});