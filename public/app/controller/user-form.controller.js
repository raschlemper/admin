'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var element = {
        'tab': angular.element('#myTab')
    }

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
        // $scope.image = "image/users/user.png";
        // $scope.user = {
        //     'provider': LISTS.providers[0].code,
        //     'systems': []
        // };
        // $scope.periodos[3].checked = true;
        $scope.user = UserBuilder.createUserDefault();
        $scope.msg = { success: null, error: null };
        element.tab.find('a:first').tab('show');
    }

    var setUpSystems = function(systems) {
        return _.map(systems, function(system) {
            system.role = 'user';
            system.periodos = angular.copy($scope.periodos);
            system.periodo = system.periodos[3];
            system.dateInitial = new Date();
            system.dateFinal = DateService.addDaysToDate(new Date(), system.periodo.days);
            return system;
        })
    }
    
    var resetForm = function(form) {
        form.$setPristine();
        $scope.submitted = false;
        init();
    }

    $scope.$watch('systems', function(newVal, oldVal) {
        if(!$scope.systems) return;
        if(!_.isEqual(oldVal, newVal)) {
            $scope.systems = setUpSystems($scope.systems);
        }
    });

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

    $scope.showTab = function($event) {
        $event.preventDefault();
        angular.element(this).tab('show');
    };

    init();

});
