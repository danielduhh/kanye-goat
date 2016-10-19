angular.module('myApp')
    .controller('AlbumsCtrl', function ($rootScope,$scope,$http,$mdSidenav,dataService) {

        $scope.albumSongHash = {};
        $scope.showSong = false;
        $scope.test = '';
        $scope.all_songs = [];
        $scope.searchText = '';
        $rootScope.votes = [];

        $scope.toggleRight = $rootScope.buildToggler('right');

        $scope.processSelection = function(song) {

            // checkboxes between song and album ctrl need to be synchronized
            // so notify songctrl of a selection

            $rootScope.$broadcast('albumCtrl-vote-processed');

            var selectedSongs = [];

            Object.keys($scope.albumSongHash).forEach(function(key){
                $scope.albumSongHash[key].songs.forEach(function(s){
                    if(s.selected === true){
                        selectedSongs.push(s);
                    }
                })
            });

            $rootScope.votes = selectedSongs;
            $rootScope.$broadcast('song-vote', selectedSongs);

            // track google analytics event
            ga('select', {
                hitType:'event',
                eventCategory: 'Select',
                eventAction: 'Song Checkbox Select (Album View)',
                eventLabel: song.label
            });
        };

        $scope.$on('song-remove', function(evt, song){

            Object.keys($scope.albumSongHash).forEach(function(key){
                $scope.albumSongHash[key].songs.forEach(function(s){
                    if(song.id === s.id){
                        s.selected = false
                    }
                })
            });
            
            $scope.processSelection();
        });

        $scope.$on('clear-all-selections', function () {
            Object.keys($scope.albumSongHash).forEach(function(key){
                $scope.albumSongHash[key].songs.forEach(function(s){
                    s.selected = false
                })
            });

            $scope.processSelection();
        });

        $scope.toggleSong = function(album){
            $scope.albumSongHash[album].selected = !$scope.albumSongHash[album].selected;
        };

        var promise = dataService.albumsGet();

        promise.then(function(response){
            $scope.albumSongHash = response;

            return dataService.songsGet();
        }).then(function(response){

            $scope.all_songs = response;
        });
    });