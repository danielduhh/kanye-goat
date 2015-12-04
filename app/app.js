'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute','ngMaterial', 'angularFileUpload'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/songs', {
                templateUrl: 'public/songs.html',
                controller: 'AlbumsCtrl'
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
    .controller('Index', function ($scope,$http,$timeout, $mdSidenav, $mdUtil, $log, dataService) {

        $scope.toggleLeft = buildToggler('left');

        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $scope.vote = function () {

        }

        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },200);
            return debounceFn;
        }
    });
