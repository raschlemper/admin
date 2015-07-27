'use strict';

app.controller('UserFormUserCtrl', function($scope, $location, $stateParams, $filter,
    UserBuilder, SystemBuilder, UserService, SystemService, ImageService, DateService, FORMAT, LISTS) {  

    var init = function() {
        $scope.image = {};
        $scope.providers = LISTS.providers;
        $scope.getUser();
    }  

    $scope.getUser = function() {
        if (!$stateParams.id) return;
        UserService.getUser($stateParams.id)
            .then(function(data) {
                $scope.user = data;
            })
            .catch(function() {
                $scope.user = {};
            });
    }

    // var setSystemsUser = function() {
    //     var systems = angular.copy($scope.user.systems);
    //     $scope.user.systems = _.map(systems, function(system) {
    //         return {
    //             _id: system._id,
    //             role: system.role,
    //             dateInitial: getDateFromStr.getDate(system.dateInitial),
    //             dateFinal: getDateFromStr.getDate(system.dateFinal)
    //         };
    //     })
    // }

    init();

});
