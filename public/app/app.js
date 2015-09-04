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
                url: '/users',
                templateUrl: 'view/user/user-list.html',
                controller: 'UserCtrl'
            })
            .state('userView', {
                url: '/user/:id',
                templateUrl: 'view/user/user.html',
                controller: 'UserCtrl'
            })
            .state('userCreate', {
                url: '/user/create',
                templateUrl: 'view/user/user-form.html',
                controller: 'UserFormCtrl'
            })
            .state('userEdit', {
                url: '/user/update/:id',
                templateUrl: 'view/user/user-form.html',
                controller: 'UserFormCtrl'
            })
            .state('userSystem', {
                url: '/user/:id/system',
                templateUrl: 'view/user/user-system-form.html',
                controller: 'UserSystemFormCtrl'
            });

    })
