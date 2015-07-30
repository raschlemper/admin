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

    $scope.createUser = function(form) {  
        $scope.submitted = true;
        if (form.$valid) {             
            if($scope.files) { createUserWithImage(form, $scope.files[0]); }
            else { createUserWithoutImage(form); }
        } else {
            $scope.msg.error = 'MSG.EXISTS.INCORRET.DATA';
        }
    }

    var createUserWithoutImage = function(form) {  
        var user = UserBuilder.createUserWidthoutImage($scope.user);
        UserService.createUser(user)
            .then(function(data) {
                resetForm(form);
                $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });
        
    }

    var createUserWithImage = function(form, file) {
        var user = UserBuilder.createUserWidthImage($scope.user, file);  
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
                    $scope.msg.success = "MSG.USER.UPDATE.SUCCESS";
                    // $location.url("/user");
                })
                .catch(function(e) {
                    $scope.msg.error = "MSG.USER.UPDATE.ERROR";

                });
        }
    }

    init();

});
