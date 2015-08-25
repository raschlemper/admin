'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter, $q,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var initDefault = function() {      
        $scope.providers = LISTS.providers;
        $scope.roles = LISTS.roles;
        $scope.periodos = LISTS.periodos;
        $scope.format = FORMAT.date;
        $scope.image = {};
        $scope.systems = [];
        $scope.files = [];    
    }

    var init = function() {  
        initDefault();
        $scope.user = UserBuilder.createUserDefault();
        $scope.msg = { success: null, error: null };
        $scope.systemSelection = null;
        $scope.getUser();
        $scope.getAllSystems();
        AppFunction.tabUserCreate();
        if (!$stateParams.id) { $scope.titlePage = 'TITLE.USER.CREATE'; }
        else { $scope.titlePage = 'TITLE.USER.UPDATE'; }
    }
    
    var resetForm = function(form, data) {
        form.$setPristine();
        $scope.submitted = false;
        if(!data) { 
            init(); 
        } else { 
            initDefault(); 
            $scope.user = UserBuilder.getUser(data);
        }
    } 

    // USER

    $scope.getUser = function() {
        if (!$stateParams.id) return;
        UserService.getUser($stateParams.id)
            .then(function(data) {
                $scope.user = UserBuilder.getUser(data);
                $scope.files[0] = $scope.user.image.full;
            })
            .catch(function() {
                $scope.user = {};
            });
    }

    $scope.getAllSystems = function() {
        SystemService.allSystems()
            .then(function(data) {
                $scope.systems = setUpSystems(data);
            })
            .catch(function() {
                $scope.systems = [];
            });
    };

    $scope.existSystem = function(system) {
        return _.contains($scope.user.systems, system);
    };

    var setUpSystems = function(systems) {
        return _.map(systems, function(system) {
            system.show = !$scope.existSystem(system);
            return SystemBuilder.createSystem(system);
        })
    };

    $scope.saveUser = function(form) {  
        $scope.submitted = true;
        if (form.$valid) {   
            if(!$scope.user.id) {
                createUser(form);
            } else {
                updateUser(form);
            }            
        } else {
            $scope.msg.error = 'MSG.EXISTS.INCORRET.DATA';
        }
    }

    var createUser = function(form) { 
        // var image = null;
        // if($scope.files[0]) { $scope.image = $scope.files[0]; }
        var user = UserBuilder.createUser($scope.user, $scope.files[0]);
        if(_.isEmpty(user.image) || !user.image.type) { createUserWithoutImage(form, user); }
        else { createUserWithImage(form, user) }
    }

    var createUserWithoutImage = function(form, user) {  
        UserService.createUser(user)
            .then(function(data) {
                resetForm(form, null);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
        
    }

    var createUserWithImage = function(form, user) {
        $q.all([
                UserService.createUserWithImage(user),
                ImageService.uploadFileUser(user)
            ])
            .then(function(data) {
                resetForm(form, null);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';           
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
    }

    var updateUser = function(form) {
        var user = UserBuilder.createUser($scope.user, $scope.files[0]);
        if(_.isEmpty(user.image) || !user.image.type) { updateUserWithoutImage(form, user); }
        else { updateUserWithImage(form, user); }
    }

    var updateUserWithoutImage = function(form, user) {  
        UserService.updateUser(user)
            .then(function(data) {
                resetForm(form, data);
                $scope.msg.success = 'MSG.USER.UPDATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.UPDATE.ERROR';
            });
        
    }

    var updateUserWithImage = function(form, user) {
        $q.all([
                UserService.updateUserWithImage(user),
                ImageService.uploadFileUser(user)
            ])
            .then(function(data) {
                resetForm(form, data[0]);
                $scope.msg.success = 'MSG.USER.UPDATE.SUCCESS';           
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.UPDATE.ERROR';
            });
    }

    $scope.removerImage = function(user) {
        var userImage = angular.copy(user);
        user.image = null;
        $q.all([
                UserService.updateUser(user),
                ImageService.removeFileUser(userImage)
            ])
            .then(function(data) {
                resetForm(form, data[0]);
                $scope.msg.success = 'MSG.IMAGE.REMOVE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.IMAGE.REMOVE.ERROR';
            });
    }

    // SYSTEM

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
