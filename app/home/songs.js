angular.module('myApp')

    .controller('SongsCtrl', function ($scope,$http,$rootScope,dataService) {

        $scope.albumSongHash = {};
        $scope.showSong = false;
        $scope.test = '';
        $scope.all_songs = [];
        $scope.searchText = '';

        $scope.$on('data-change',function(evt,data){
            console.log(data);
        });

        $scope.toggleSong = function(album){
            $scope.albumSongHash[album].selected = !$scope.albumSongHash[album].selected;
        };

        //var promise = dataService.albumsGet();

        //promise.then(function(response){
        //    $scope.albumSongHash = response.albumSongHash;
        //
        //    return dataService.songsGet();
        //}).then(function(response){
        //    $scope.all_songs = response.all_songs;
        //});
    });