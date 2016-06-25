'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/songs', {
                templateUrl: 'app/templates/songs.html',
                controller: 'SongsCtrl'
            })
            .when('/albums', {
                templateUrl: 'app/templates/albums.html',
                controller: 'AlbumsCtrl'
            })
            .when('/results', {
                templateUrl: 'app/templates/results.html',
                controller: 'ResultsCtrl'
            })
            .otherwise({
                redirectTo: '/albums'
            });
    }]);