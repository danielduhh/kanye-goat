'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial', 'LocalForageModule']).
    config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/songs', {
                templateUrl: 'app/templates/songs.html',
                controller: 'SongsCtrl'
            })
            .when('/albums', {
                templateUrl: 'app/templates/albums.html',
                controller: 'AlbumsCtrl'
            })
            .otherwise({
                redirectTo: '/albums'
            });

        // use the HTML5 History API to remove the #hash in the URL
        $locationProvider.html5Mode(true);

    }).run(function($rootScope, $location, $window){
        // init google analytics
        $window.ga('create', 'UA-85990014-1', 'auto');

        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.path());
        });
    });