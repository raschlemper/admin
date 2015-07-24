'use strict';

app.controller('UserFormUserCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {  

    var init = function() {

    }  

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
            var user = UserBuilder.createUser($scope.user)
            if($scope.files) { createUserWithImage(form, $scope.files[0], user); }
            else { createUserWithoutImage(form, user); }
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

    init();

});
