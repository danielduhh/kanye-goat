'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.albums',
  'myApp.view2',
  'myApp.version',
    'myApp.songs'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/albums'});
}]).controller('Index', function ($scope,$http,$timeout, $mdSidenav, $mdUtil, $log) {

        $scope.toggleLeft = buildToggler('left');

        $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });
      };


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

