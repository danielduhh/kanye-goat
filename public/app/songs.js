angular.module('myApp')

    .controller('SongsCtrl', function ($scope,$http,$rootScope,dataService) {

        // TODO collect & show a list of selections somewhere

        $scope.albumSongHash = {};
        $scope.all_songs = [];
        $scope.searchText = '';
        $scope.selections =[];
        $scope.selection = '';

        $scope.selectSong = function(song){
            $scope.selection = song.title;

            if($scope.selections.indexOf(song.title) == -1){
                $scope.selections.push(song.title);
            } else {
                $scope.selections.splice($scope.selections.indexOf(song.title), 1);
                $scope.selection = '';
                // loop through all song, set
                $scope.removeSong(song.title);
            }
        };

        $scope.removeSong = function(song){
            // loop through all song, set
            $scope.all_songs.forEach(function(v){
                if (v.title == song){
                    v.selected = false;
                }
            });
        };

        var promise = dataService.albumsGet();

        promise.then(function(response){
            $scope.albumSongHash = response;

            return dataService.songsGet();
        }).then(function(response){
            $scope.all_songs = response;
        });
    });