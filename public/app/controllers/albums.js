angular.module('myApp')
    .controller('AlbumsCtrl', function ($rootScope,$scope,$http,$mdSidenav,dataService) {

        $scope.albumSongHash = {};
        $scope.showSong = false;
        $scope.test = '';
        $scope.all_songs = [];
        $scope.searchText = '';
        $rootScope.votes = [];

        $scope.toggleRight = $rootScope.buildToggler('right');

        $scope.addSongToPanel = function(song){

            if(song.selected){
                //$scope.toggleRight();
            }

            console.log($rootScope.votes);
        };

        $scope.processSelection = function() {
            var selectedSongs = [];

            Object.keys($scope.albumSongHash).forEach(function(key){
                $scope.albumSongHash[key].songs.forEach(function(s){
                    if(s.selected === true){
                        selectedSongs.push(s);
                    }
                })
            });

            $rootScope.songs = selectedSongs;
            $rootScope.$broadcast('song-vote', selectedSongs);

            console.log(selectedSongs);
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

            // close right navigation
            $mdSidenav('right').close();
        });

        $scope.toggleSong = function(album){
            $scope.albumSongHash[album].selected = !$scope.albumSongHash[album].selected;
        };

        $scope.vote = function (song) {
            var promise = dataService.vote(song.id);

            promise
                .then(function(res){
                console.log(res)
                })
                .catch(function(err){
                    console.log(err);
                })
        };

        var promise = dataService.albumsGet();

        promise.then(function(response){
            $scope.albumSongHash = response;

            return dataService.songsGet();
        }).then(function(response){

            $scope.all_songs = response;
        });
    });