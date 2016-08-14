angular.module('myApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, $timeout, $mdSidenav, $mdUtil, $mdBottomSheet, $log, dataService) {

        $rootScope.buildToggler = function (navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
            return debounceFn;
        };

        $scope.toggleLeft = $rootScope.buildToggler('left');
        $scope.toggleRight = $rootScope.buildToggler('right');
        $scope.votes = [];
        $scope.voteLength = 0;

        $scope.closeNav = function (navId) {
            $mdSidenav(navId).close()
        };

        $scope.$on('song-vote', function(evt, song){
            $scope.votes = song;
            $scope.voteLength = $scope.votes.length;
        });

        $scope.removeSong = function(song){
            $rootScope.$broadcast('song-remove', song);
        };

        $scope.openMenu = function ($mdOpenMenu, event) {
            console.log('openMenu');
            $mdOpenMenu(event);
        };

        $scope.listItemClick = function ($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };

        /**
         * clear all song selections
         */
        $scope.clearAllSongs = function (){
            $rootScope.$broadcast('clear-all-selections');
        };

        $rootScope.showListBottomSheet = function ($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: '../templates/bottom-sheet-list-template.html',
                controller: 'SubmissionCtrl',
                targetEvent: $event
            }).then(function (clickedItem) {
                $scope.alert = clickedItem['name'] + ' clicked!';
            });
        };
    });

