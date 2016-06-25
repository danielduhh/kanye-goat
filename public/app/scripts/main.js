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

        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $scope.$on('song-vote', function(evt, song){
            $scope.votes = song;
        });

        $scope.removeSong = function(song){
            $rootScope.$broadcast('song-remove', song);
        };

        $scope.openMenu = function ($mdOpenMenu, event) {
            console.log('openMenu');
            $mdOpenMenu(event);
        };

        $scope.items = [
            {name: 'Hangout', icon: 'hangout'},
            {name: 'Mail', icon: 'mail'},
            {name: 'Message', icon: 'message'},
            {name: 'Copy', icon: 'copy2'},
            {name: 'Facebook', icon: 'facebook'},
            {name: 'Twitter', icon: 'twitter'}
        ];

        $scope.listItemClick = function ($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
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

