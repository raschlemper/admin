'use strict';

app.controller('UserSystemFormCtrl', function($scope, $location, $stateParams, $filter, $q,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var init = function() {    
        $scope.roles = LISTS.roles;
        $scope.periodos = LISTS.periodos;
        $scope.format = FORMAT.date;
        $scope.user = {};
        $scope.systems = [];
        $scope.msg = { success: null, error: null };
        $scope.systemSelection = null;
        $scope.getSystems();
        // $scope.getAllSystems();
    };
    
    var resetForm = function(form, data) {
        form.$setPristine();
        $scope.submitted = false;
        init(); 
    } 

    $scope.$watch('systemSelection.periodo', function(newVal, oldVal) {
        if(!$scope.systemSelection) return;
        if(!_.isEqual(oldVal, newVal) && $scope.systemSelection.periodo) {
            $scope.getDate($scope.systemSelection.periodo);
        }
    });

    $scope.$watch('systemSelection.dateInitial', function(newVal, oldVal) {
        if(!$scope.systemSelection) return;
        if(!_.isEqual(oldVal, newVal)) {
            verifyDate();
        }
    });

    $scope.$watch('systemSelection.dateFinal', function(newVal, oldVal) {
        if(!$scope.systemSelection) return;
        if(!_.isEqual(oldVal, newVal)) {
            verifyDate();
        }
    });

    $scope.saveUser = function(form) {  
        UserService.updateUser($scope.user)
            .then(function(data) {
                resetForm(form, data);
                $scope.msg.success = 'MSG.SYSTEM.UPDATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.SYSTEM.UPDATE.ERROR';
            });
        
    }

    $scope.getSystems = function() {        
        $q.all([
                UserService.getUser($stateParams.idUser),
                SystemService.allSystems()
            ])
            .then(function(data) {
                if(data[0]) { $scope.user = UserBuilder.createUser(data[0], null); }
                if(data[1]) {
                    $scope.systems = setUpSystems(data[1]);
                    getSystemSelection($scope.systems);
                }
            })
            .catch(function() {
                $scope.user = {};
                $scope.systems = [];
            });
    }

    // $scope.getUser = function() {        
    //     $scope.user = UserBuilder.createUserDefault();
    //     if (!$stateParams.idUser) return;
    //     return UserService.getUser($stateParams.idUser)
    //         .then(function(data) {
    //             $scope.user = UserBuilder.createUser(data, null);
    //         })
    //         .catch(function() {
    //             $scope.user = {};
    //         });
    // };

    // $scope.getAllSystems = function() {
    //     SystemService.allSystems()
    //         .then(function(data) {
    //             $scope.systems = setUpSystems(data);
    //             getSystemSelection($scope.systems);
    //         })
    //         .catch(function() {
    //             $scope.systems = [];
    //         });
    // };

    $scope.existSystem = function(system) {
        return _.contains($scope.systems, system);
    };

    var getSystemSelection = function(systems) {
        if (!$stateParams.idSystem) return;
        _.map(systems, function(system) {
            if(system.id === $stateParams.idSystem) {
                $scope.systemSelection = system;
            }
        })
    }

    var setUpSystems = function(systems) {
        return _.map(systems, function(system) {
            system.show = !$scope.existSystem(system);
            return SystemBuilder.createSystem(system);
        })
    };

    $scope.getDate = function(periodo) {
        var dateInitial = new Date();
        var dateFinal = new Date(); 
        dateFinal.setDate(dateInitial.getDate() + periodo.days);
        $scope.systemSelection.dateInitial = $filter('date')(dateInitial, FORMAT.date);
        $scope.systemSelection.dateFinal = $filter('date')(dateFinal, FORMAT.date);
        $scope.systemSelection.periodo = angular.copy(periodo);
    };  

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

    var verifyDate = function() {
        _.map($scope.systemSelection.periodos, function(periodo) {
            var dateIntial = DateService.getDateFromStr($scope.systemSelection.dateInitial);
            var dateFinal = DateService.getDateFromStr($scope.systemSelection.dateFinal);
            var dateIntialVerify = DateService.addDaysToDate(dateIntial, periodo.days);
            if(dateIntialVerify.getTime() === dateFinal.getTime()) {
                periodo.checked = true;
            } else {
                periodo.checked = false;
            }
        });
    };

    $scope.getSystem = function(system) {
        $scope.systemSelection = system;
    }

    $scope.showSystems = function() {
        $scope.systemSelection = null;
    }

    $scope.addSystem = function(system) {  
        var userSystem = SystemBuilder.createSystem(system);
        $scope.user.systems.push(userSystem);
        system.show = !$scope.existSystem(system);
    }

    $scope.delSystem = function(system) {  
        $scope.user.systems.splice(system);
        system.show = !$scope.existSystem(system);
    }

    init();

});
