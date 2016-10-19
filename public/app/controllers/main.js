angular.module('myApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, $timeout, $mdSidenav, $mdToast, $mdUtil,
                                      $mdBottomSheet, $log, $localForage, dataService, $mdMedia) {

        $localForage.getItem('visited').then(function (visited) {
            if (visited === null) {
                $localForage.setItem('visited', true);
            } else {
                console.log('user has visited this site before');
            }
            $scope.showSplash = (visited === null);
            $scope.showBody();

        });

        $scope.centerNavLogo = $mdMedia('gt-sm');

        $(window).resize(function(){
            $scope.centerNavLogo = $mdMedia('gt-sm');
        });


        $scope.readOnly = true;
        $scope.maxVotes = 5;

        $rootScope.buildToggler = function (navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID).toggle()
                // track google analytics event
                ga('send', {
                    hitType:'event',
                    eventCategory: ' Navbar',
                    eventAction: 'Menu Toggle',
                    eventLabel: navID
                });
            }, 200);
            return debounceFn;
        };

        $rootScope.showSimpleToast = function(position, text, delay) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(text)
                    .position(position)
                    .hideDelay(3000)
            );
        };

        $scope.showBody = function (){
            if(!$scope.showSplash) {
                $("#mainBody").addClass('on');
            }
        };

        $scope.toggleLeft = $rootScope.buildToggler('left');
        $scope.toggleRight = $rootScope.buildToggler('right');

        $scope.votes = [];
        $scope.voteLength = 0;

        $scope.closeNav = function (navId, view) {
            $mdSidenav(navId).close();
            ga('select', {
                hitType:'event',
                eventCategory: 'Navbar',
                eventAction: 'Change View',
                eventLabel: view
            });

        };

        $scope.$on('song-vote', function (evt, song) {
            $scope.votes = song;
            $scope.voteLength = $scope.votes.length;

            if($scope.voteLength > 5) $rootScope.showSimpleToast('bottom', "5 song vote limit per 24 hours!", 2500);

            if($scope.voteLength === 5) $scope.toggleRight();

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
                voteIds.push(v.id);
            });

            var promise = dataService.vote(voteIds);
            promise
                .then(function (res) {

                    $rootScope.votes.forEach(function (v, i) {
                        // track google analytics event
                        ga('send', {
                            hitType:'event',
                            eventCategory: 'Vote',
                            eventAction: 'Song Vote',
                            eventLabel: v.label
                        });
                    });
                    // close nav bar and give success message
                    $scope.closeNav('right');
                    $rootScope.showSimpleToast('bottom', 'Thanks for your vote!');
                    $scope.clearAllSongs();

                })
                .catch(function (err) {
                    // show error
                    $rootScope.showSimpleToast('bottom', err.data.message);
                    $scope.clearAllSongs();

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'Error',
                        eventAction: 'POST Vote Error',
                        eventLabel: err.data.message
                    });
                })
        };

        /**
         * clear all song selections
         */
        $scope.clearAllSongs = function () {
            $rootScope.$broadcast('clear-all-selections');
            // close right navigation
            $mdSidenav('right').close();
            // track google analytics event
            ga('send', {
                hitType:'event',
                eventCategory: 'Navbar',
                eventAction: 'Clear All Selections',
                eventLabel: 'Right Menu'
            });
        };
    });

