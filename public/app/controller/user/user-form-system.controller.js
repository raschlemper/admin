'use strict';

app.controller('UserFormSystemCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var init = function() {
        // $scope.systems = [];
        // $scope.getAllSystems();
    };

    // var setUpSystems = function(systems) {
    //     return _.map(systems, function(system) {
    //         return SystemBuilder.createSystem(system);
    //     })
    // }

    // $scope.$watch('systems', function(newVal, oldVal) {
    //     if(!$scope.systems) return;
    //     if(!_.isEqual(oldVal, newVal)) {
    //         $scope.systems = setUpSystems($scope.systems);
    //     }
    // });

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

    // $scope.getAllSystems = function() {
    //     SystemService.allSystems()
    //         .then(function(data) {
    //             //addItensParaTeste(data);
    //             // var systems = setUpSystems(data);
    //             $scope.systems = data;
    //             $scope.systems = $scope.hideSystemBySelection($scope.systems);
    //         })
    //         .catch(function() {
    //             $scope.systems = [];
    //         });
    // }

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
        $scope.user.systems.push(system);
        system.show = !$scope.existSystem(system);
    }

    $scope.delSystem = function(system) {  
        $scope.user.systems.splice(system);
        system.show = !$scope.existSystem(system);
    }

    // TODO: Verificar se tem necessidade de ser no $scope, colocar dentro do setup do sistema
    // $scope.hideSystemBySelection = function(systems) {
    //     return _.map(systems, function(system) {
    //         system.show = !$scope.existSystem(system);
    //         return system;
    //     })
    // }

    // $scope.existSystem = function(system) {
    //     return _.contains($scope.user.systems, system);
    // }

    init();

});
