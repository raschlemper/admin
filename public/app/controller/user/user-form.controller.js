'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter, $q,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {

    var initDefault = function() {    
    }

    var init = function() {    
        $scope.genders = LISTS.gender;
        $scope.files = []; 
        $scope.msg = { success: null, error: null };
        $scope.getUser();
        if (!$stateParams.id) { $scope.titlePage = 'TITLE.USER.CREATE'; }
        else { $scope.titlePage = 'TITLE.USER.UPDATE'; }
    }
    
    var resetForm = function(form, data) {
        form.$setPristine();
        $scope.submitted = false;
        init(); 
    } 

    $scope.getUser = function() {        
        $scope.user = UserBuilder.createUserDefault();
        if (!$stateParams.id) return;
        UserService.getUser($stateParams.id)
            .then(function(data) {
                $scope.user = UserBuilder.createUser(data, null);
                $scope.files[0] = null;
            })
            .catch(function() {
                $scope.user = {};
            });
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
        var user = UserBuilder.createUser($scope.user, $scope.files[0]);
        if(user.image && user.image.file) { createUserWithImage(form, user); }
        else { createUserWithoutImage(form, user) }
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
        UserService.createUser(user)
            .then(function(data) {
                user.image.name = data._id;
                ImageService.uploadFileUser(user)
                    .then(function(data) {
                        resetForm(form, null);
                        $scope.msg.success = 'MSG.USER.CREATE.SUCCESS';  
                    })       
                    .catch(function() {
                        $scope.msg.error = 'MSG.USER.CREATE.ERROR';
                    });   
            })
            .catch(function() {
                $scope.msg.error = 'MSG.USER.CREATE.ERROR';
            });            
    }

    var updateUser = function(form) {
        var user = UserBuilder.createUser($scope.user, $scope.files[0]);
        if(user.image && user.image.file) { updateUserWithImage(form, user); }
        else { updateUserWithoutImage(form, user); }
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
        UserService.updateUser(user)
            .then(function(data) {
                ImageService.uploadFileUser(user)
                    .then(function(data) {
                        resetForm(form, data);
                        $scope.msg.success = 'MSG.USER.UPDATE.SUCCESS';  
                    })       
                    .catch(function() {
                        $scope.msg.error = 'MSG.USER.UPDATE.ERROR';
                    });   
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
                init(); 
                $scope.msg.success = 'MSG.IMAGE.REMOVE.SUCCESS';                
            })
            .catch(function() {
                $scope.msg.error = 'MSG.IMAGE.REMOVE.ERROR';
            });
    }

    init();

});
