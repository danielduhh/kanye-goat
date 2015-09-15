'use strict';

angular.module('myApp.albums', ['ngRoute', 'ngMaterial'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/albums', {
            templateUrl: 'home/albums.html',
            controller: 'AlbumsCtrl'
        });
    }])

    .controller('AlbumsCtrl', function ($scope,$http) {

        $scope.albumSongHash = {};
        $scope.showSong = false;
        $scope.test = '';
        $scope.all_songs = [];
        $scope.searchText = '';

        $scope.toggleSong = function(album){
            $scope.albumSongHash[album].selected = !$scope.albumSongHash[album].selected;
        };

        $scope.getAllSongs = function(){
            $http.get('api/all-albums').
                success(function (data) {
                    console.log(data);
                    data.features.forEach(function(v){
                        v.properties.selected = false;
                        $scope.albumSongHash[v.properties.title] = {};
                        $scope.albumSongHash[v.properties.title].selected = false;
                        $scope.albumSongHash[v.properties.title].songs = [];
                    });

                    $http.get('api/all-songs').success(function(songs){
                        console.log(songs);
                        songs.features.forEach(function(s){
                            var album = s.properties.album_title;
                            var song = s.properties.song_title;
                            $scope.all_songs.push(song);

                            $scope.albumSongHash[album].songs.push(song);
                        });
                        console.log($scope.albumSongHash);
                    })

                }).
                error(function (error) {
                    console.log(error);
                });
        };

        $scope.getAllSongs();
    });