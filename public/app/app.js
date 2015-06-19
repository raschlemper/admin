'use strict';

var app = angular.module('teratecAdminApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngDropzone',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'view/main.html',
                controller: 'MainCtrl'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'view/user.html',
                controller: 'UserCtrl'
            })
            .state('userCreate', {
                url: '/user/create',
                templateUrl: 'view/user-create.html',
                controller: 'UserCtrl'
            })
            .state('userEdit', {
                url: '/user/:id',
                templateUrl: 'view/user-edit.html',
                controller: 'UserCtrl'
            });

    })
