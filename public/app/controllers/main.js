angular.module('myApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, $timeout, $mdSidenav, $mdToast, $mdUtil, $mdBottomSheet, $log, dataService) {

        $rootScope.buildToggler = function (navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID)
                    .toggle()
            }, 200);
            return debounceFn;
        };

        $rootScope.showSimpleToast = function(position, text) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position(position)
                    .hideDelay(3000)
            );
        };

        $scope.toggleLeft = $rootScope.buildToggler('left');
        $scope.toggleRight = $rootScope.buildToggler('right');

        $scope.votes = [];
        $scope.voteLength = 0;

        $scope.closeNav = function (navId) {
            $mdSidenav(navId).close()
        };

        $scope.$on('song-vote', function (evt, song) {
            $scope.votes = song;
            $scope.voteLength = $scope.votes.length;
        });

        $scope.removeSong = function (song) {
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
         * Submit user votes
         */
        $scope.sendVotes = function () {

            var voteIds = [];

            $rootScope.votes.forEach(function (v, i) {
                voteIds.push(v.id)
            });

            var promise = dataService.vote(voteIds);
            promise
                .then(function (res) {
                    // close nav bar and give success message
                    $scope.closeNav('right');
                    $rootScope.showSimpleToast('bottom', 'Thanks for your vote!');
                    $scope.clearAllSongs();

                })
                .catch(function (err) {
                    // show error
                    $rootScope.showSimpleToast('bottom', err.data.message);
                    $scope.clearAllSongs();
                })
        };

        /**
         * clear all song selections
         */
        $scope.clearAllSongs = function () {
            $rootScope.$broadcast('clear-all-selections');
            // close right navigation
            $mdSidenav('right').close();
        };
    });

