angular.module('myApp')
    .controller('AlbumsCtrl', function ($rootScope,$scope,$http,dataService) {

        $scope.albumSongHash = {};
        $scope.showSong = false;
        $scope.test = '';
        $scope.all_songs = [];
        $scope.searchText = '';

        $rootScope.$broadcast('data-change', {data:true});

        $scope.toggleSong = function(album){
            $scope.albumSongHash[album].selected = !$scope.albumSongHash[album].selected;
        };

        var promise = dataService.albumsGet();

        promise.then(function(response){
            $scope.albumSongHash = response.albumSongHash;

            return dataService.songsGet();
        }).then(function(response){
            $scope.all_songs = response.all_songs;
        });
    });