//'use strict';

var app = angular.module('teratecAdminApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.bootstrap',
        'ngFileUpload',
        'pascalprecht.translate',
        'ajoslin.promise-tracker'
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
                templateUrl: 'view/user/user.html',
                controller: 'UserCtrl'
            })
            .state('userCreate', {
                url: '/user/create',
                templateUrl: 'view/user/user-form.html',
                controller: 'UserFormCtrl'
            })
            .state('userEdit', {
                url: '/user/:id',
                templateUrl: 'view/user/user-edit.html',
                controller: 'UserCtrl'
            });

    })
