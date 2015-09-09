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
            .state('users', {
                url: '/users',
                templateUrl: 'view/user/user-list.html',
                controller: 'UserCtrl'
            })
            .state('userView', {
                url: '/user/view/:idUser',
                templateUrl: 'view/user/user.html',
                controller: 'UserCtrl'
            })
            .state('userCreate', {
                url: '/user/create',
                templateUrl: 'view/user/user-form.html',
                controller: 'UserFormCtrl'
            })
            .state('userEdit', {
                url: '/user/update/:idUser',
                templateUrl: 'view/user/user-form.html',
                controller: 'UserFormCtrl'
            })
            .state('userSystem', {
                url: '/user/:idUser/system',
                templateUrl: 'view/user/user-system-form.html',
                controller: 'UserSystemFormCtrl'
            })
            .state('userSystemEdit', {
                url: '/user/:idUser/system/:idSystem',
                templateUrl: 'view/user/user-system-form.html',
                controller: 'UserSystemFormCtrl'
            });

    })
