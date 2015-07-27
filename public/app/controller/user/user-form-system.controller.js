'use strict';

app.controller('UserFormSystemCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var init = function() {
        $scope.roles = LISTS.roles;
        $scope.periodos = LISTS.periodos;
        $scope.format = FORMAT.date;
    };

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

    init();

});
