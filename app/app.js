'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/songs', {
                templateUrl: 'public/songs.html',
                controller: 'SongsCtrl'
            })
            .when('/albums', {
                templateUrl: 'public/albums.html',
                controller: 'AlbumsCtrl'
            })
            .when('/results', {
                templateUrl: 'public/results.html',
                controller: 'ResultsCtrl'
            })
            .otherwise({
                redirectTo: '/albums'
            });

    }])