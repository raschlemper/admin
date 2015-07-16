'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter,
    User, System, Image, Pagination, FORMAT, LISTS) {

    var init = function() {
        $scope.user = {};
        $scope.systems = [];
        $scope.msg = {};
        $scope.image = {};
        $scope.providers = LISTS.providers;
        $scope.roles = LISTS.roles;
        $scope.periodos = LISTS.periodos;
        $scope.format = FORMAT.date;
        $scope.getUser();
        $scope.getAllSystems();
        setUp();
    }

    var setUp = function() {
        $scope.image = "image/users/user.png";
        $scope.user = {
            'provider': LISTS.providers[0].code,
            'systems': []
        };
        $scope.periodos[3].checked = true;
        $scope.msg = { success: null, error: null };
    }
    
    var resetForm = function(form) {
        form.$setPristine();
        $scope.submitted = false;
        init();
    }

    $scope.getDate = function(periodo) {
        var dateInitial = new Date();
        var dateFinal = new Date(); 
        dateFinal.setDate(dateInitial.getDate() + periodo.days);
        $scope.systemSelection.dateInitial = $filter('date')(dateInitial, FORMAT.date);
        $scope.systemSelection.dateFinal = $filter('date')(dateFinal, FORMAT.date);
        $scope.systemSelection.periodo = angular.copy(periodo);
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
            var dateIntial = getDate($scope.systemSelection.dateInitial);
            var dateFinal = getDate($scope.systemSelection.dateFinal);
            var dateIntialVerify = addDaysToDate(dateIntial, periodo.days);
            if(dateIntialVerify.getTime() === dateFinal.getTime()) {
                periodo.checked = true;
            } else {
                periodo.checked = false;
            }
        });
    };

    var addDaysToDate = function(date, days) {
        var dateVerify = date;
        dateVerify.setDate(date.getDate() + days);
        return dateVerify;
    }

    var getDate = function(date) {
        if(_.isDate(date)) return date;
        var dates = angular.copy(date).split("/");;
        return new Date(dates[2], dates[1] - 1, dates[0]);
    };

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
            setSystemsUser();
            if($scope.files) { createUserWithImage(form, $scope.files[0], $scope.user); }
            else { createUserWithoutImage(form, $scope.user); }
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
                dateInitial: getDate(system.dateInitial),
                dateFinal: getDate(system.dateFinal)
            };
        })
    }

    var createUserWithoutImage = function(form, user) {  
        User.createUser(user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
    }

    var createUserWithImage = function(form, file, user) {  
        User.createUserWithImage(file, user)
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
                //addItensParaTeste(data);
                var systems = setUpSystems(data);
                $scope.systems = $scope.hideSystemBySelection(systems);
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

    var setUpSystems = function(systems) {
        return _.map(systems, function(system) {
            system.role = 'user';
            system.periodos = angular.copy($scope.periodos);
            system.periodo = system.periodos[3];
            system.dateInitial = new Date();
            system.dateFinal = addDaysToDate(new Date(), system.periodo.days);
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