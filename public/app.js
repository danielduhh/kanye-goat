'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/songs', {
                templateUrl: 'app/songs.html',
                controller: 'SongsCtrl'
            })
            .when('/albums', {
                templateUrl: 'app/albums.html',
                controller: 'AlbumsCtrl'
            })
            .when('/results', {
                templateUrl: 'app/results.html',
                controller: 'ResultsCtrl'
            })
            .otherwise({
                redirectTo: '/albums'
            });

    }]);