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
        setLineHeightMainContainer();
    }

    var setLineHeightMainContainer = function() {
        var main = angular.element(window).height();
        var menu = angular.element("#menu").height();
        var footer = angular.element("#footer").height();
        var size = main - (menu + footer);
        var mainContent = angular.element('#mainContent');
        mainContent.css('minHeight', size);
    }

    window.addEventListener('resize', function(event) {
        setLineHeightMainContainer();
    });

    init();

});
