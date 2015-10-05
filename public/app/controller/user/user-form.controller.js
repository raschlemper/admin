'use strict';

app.controller('UserFormCtrl', function($scope, $location, $stateParams, $filter, $q,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, VALUE, LISTS) {


    var init = function() {    
        $scope.genders = LISTS.gender;
        $scope.idUser = $stateParams.idUser;
        $scope.user = {};
        $scope.files = []; 
        $scope.getUser();
        statusImageButton();
        if (!$scope.idUser) { 
            $scope.titlePage = 'TITLE.USER.CREATE'; 
            $scope.$parent.currentMenu = 'MENU.USER.CREATE'; 
        } else { 
            $scope.titlePage = 'TITLE.USER.UPDATE'; 
            $scope.$parent.currentMenu = 'MENU.USER.UPDATE'; 
        }
    };
    
    var resetForm = function(form, data) {
        form.$setPristine();
        $scope.submitted = false;
        init(); 
    } 

    $scope.$watch('files', function(newValue, oldValue) {
        if(newValue !== null) {
            $scope.user = UserBuilder.createUser($scope.user, newValue[0]);
        }
    });

    $scope.$watch('user.image.name', function(newValue, oldValue) {
        statusImageButton();
    });

    $scope.getUser = function() {        
        $scope.user = UserBuilder.createUserDefault();
        if (!$scope.idUser) return;
        UserService.getUser($scope.idUser)
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
            $scope.$parent.msg.error = 'MSG.EXISTS.INCORRET.DATA';
        }
    }

    var createUser = function(form) { 
        if($scope.user.image.file) { 
            createUserWithImage(form, $scope.user); 
        } else { 
            createUserWithoutImage(form, $scope.user);
        }
    }

    var createUserWithoutImage = function(form, user) {  
        $scope.user.image = null;
        UserService.createUser(user)
            .then(function(data) {
                resetForm(form, null);
                $scope.$parent.msg.success = 'MSG.USER.CREATE.SUCCESS';                
            })
            .catch(function() {
                $scope.$parent.msg.error = 'MSG.USER.CREATE.ERROR';
            });        
    }

    var createUserWithImage = function(form, user) {
        UserService.createUser(user)
            .then(function(data) {
                ImageService.uploadFileUser(user)
                    .then(function(data) {
                        resetForm(form, null);
                        $scope.$parent.msg.success = 'MSG.USER.CREATE.SUCCESS';  
                    })       
                    .catch(function() {
                        $scope.$parent.msg.error = 'MSG.USER.CREATE.ERROR';
                    });   
            })
            .catch(function() {
                $scope.$parent.msg.error = 'MSG.USER.CREATE.ERROR';
            });            
    }

    var updateUser = function(form) {
        // var user = UserBuilder.createUser($scope.user, $scope.files[0]);
        if($scope.user.image.file) { 
            updateUserWithImage(form, $scope.user); 
        } else { 
            updateUserWithoutImage(form, $scope.user); 
        }
    }

    var updateUserWithoutImage = function(form, user) {  
        UserService.updateUser(user)
            .then(function(data) {
                resetForm(form, data);
                $scope.$parent.msg.success = 'MSG.USER.UPDATE.SUCCESS';                
            })
            .catch(function() {
                $scope.$parent.msg.error = 'MSG.USER.UPDATE.ERROR';
            });
        
    }

    var updateUserWithImage = function(form, user) {
        UserService.updateUser(user)
            .then(function(data) {
                ImageService.uploadFileUser(user)
                    .then(function(data) {
                        resetForm(form, data);
                        $scope.$parent.msg.success = 'MSG.USER.UPDATE.SUCCESS';  
                    })       
                    .catch(function() {
                        $scope.$parent.msg.error = 'MSG.USER.UPDATE.ERROR';
                    });   
            })
            .catch(function() {
                $scope.$parent.msg.error = 'MSG.USER.UPDATE.ERROR';
            });    
    }

    $scope.removeImage = function() {
        if(!_.isEqual($scope.user.image.name, VALUE.imageNameUser)) { 
            removeWithImage($scope.user); 
        }
        $scope.files = [];
    }

    var removeWithImage = function(user) {
        var userImage = angular.copy(user);
        user.image = null;
        $q.all([
                UserService.updateUser(user),
                ImageService.removeFileUser(userImage)
            ])
            .then(function(data) {
                init(); 
                $scope.$parent.msg.success = 'MSG.IMAGE.REMOVE.SUCCESS';                
            })
            .catch(function() {
                $scope.$parent.msg.error = 'MSG.IMAGE.REMOVE.ERROR';
            });
    }

    var statusImageButton = function() {
        $scope.statusImageButton = _.isEqual($scope.user.image.name, VALUE.imageNameUser);
    }

    init();

});
