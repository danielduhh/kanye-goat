'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial', 'LocalForageModule']).
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
            .otherwise({
                redirectTo: '/albums'
            });


    }]);