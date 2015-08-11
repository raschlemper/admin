'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var init = function() {
        $scope.user = {};
        $scope.systems = [];
        $scope.files = [];
        $scope.msg = {};
        $scope.getUser();
        $scope.getAllSystems();
        setUp();
    }

    var setUp = function() {
        $scope.user = UserBuilder.createUserDefault();
        $scope.msg = { success: null, error: null };
        AppFunction.tabUserCreate();
    }
    
    var resetForm = function(form) {
        form.$setPristine();
        $scope.submitted = false;
        init();
    } 

    $scope.getUser = function() {
        if (!$stateParams.id) return;
        UserService.getUser($stateParams.id)
            .then(function(data) {
                $scope.user = UserBuilder.getUser(data);
                $scope.files[0] = $scope.user.image;
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
        var image = null;
        if($scope.files[0]) { image = $scope.files[0]; }
        var user = UserBuilder.createUser($scope.user, image);
        if(image) { createUserWithImage(form, user); }
        else { createUserWithoutImage(form, user); }
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

    var createUserWithImage = function(form, user) {
        UserService.createUserWithImage(user.file, user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';           
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
    }

    var updateUser = function(form) {
        var image = null;
        if($scope.files[0]) { image = $scope.files[0]; }
        var user = UserBuilder.createUser($scope.user, image);
        if(image) { updateUserWithoutImage(form, user); }
        else { updateUserWithImage(form, user); }
    }

    var updateUserWithoutImage = function(form, user) {  
        UserService.updateUser(user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
        
    }

    var updateUserWithImage = function(form, user) {
        UserService.updateUserWithImage(user.file, user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';           
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
    }


    init();

});
