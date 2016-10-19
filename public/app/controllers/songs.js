angular.module('myApp')

    .controller('SongsCtrl', function ($scope, $http, $rootScope, dataService) {

        // TODO collect & show a list of selections somewhere

        $scope.albumSongHash = {};
        $scope.all_songs = [];
        $scope.searchText = '';
        $scope.selections = [];
        $scope.selection = '';
        $rootScope.votes = [];

        $scope.processSelection = function (song) {
            // checkboxes between song and album ctrl need to be synchronized
            // so notify albumCtrl of a selection

            $rootScope.$broadcast('songCtrl-vote-processed');

            var selectedSongs = [];

            $scope.all_songs.forEach(function (s) {
                if (s.selected === true) {
                    selectedSongs.push(s);
                }
            });

            $rootScope.votes = selectedSongs;
            $rootScope.$broadcast('song-vote', selectedSongs);

            if(song.selected) {
                // track google analytics event
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Checkbox',
                    eventAction: 'Song Select (Song View)',
                    eventLabel: song.label
                });
            }

        };

        $scope.$watch('searchText', function() {
            console.log('Search key was entered');
            // track google analytics event
            ga('send', {
                hitType:'event',
                eventCategory: 'Search',
                eventAction: 'Input Search',
                eventLabel: $scope.searchText
            });
        });

        $scope.logSearchEvent = function (){
            // track google analytics event
            ga('send', {
                hitType:'event',
                eventCategory: 'Search',
                eventAction: 'Input Select',
                eventLabel: 'Search'
            });
        };

        $scope.$on('clear-all-selections', function () {
            $scope.all_songs.forEach(function (s) {
                s.selected = false
            });

            $scope.processSelection();
        });

        $scope.removeSong = function (song) {
            // loop through all song, set
            $scope.all_songs.forEach(function (v) {
                if (v.title == song) {
                    v.selected = false;
                }
            });
        };

        var promise = dataService.albumsGet();

        promise.then(function (response) {
            $scope.albumSongHash = response;

            return dataService.songsGet();
        }).then(function (response) {
            $scope.all_songs = response;
        });
    });