'use strict';

/**
 * @ngdoc function
 * @name exemplosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exemplosApp
 */
angular.module('teratecAdminApp').controller('MainCtrl', function($scope) {

    var init = function() {
        $scope.currentMenu = 'MENU.USERS'; 
        $scope.msg = { success: null, error: null };
    }

    var setLineHeightMainContainer = function() {
        var main = angular.element(window).height();
        var menu = angular.element("#menu").height();
        var footer = angular.element("#footer").height();
        var size = main - (menu + footer + 40);
        var mainContent = angular.element('#mainContent');
        mainContent.css('minHeight', size);
    }

    init();

});
