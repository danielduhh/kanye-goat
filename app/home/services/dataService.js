var app = angular.module("myApp")
    .service("dataService", ['$http', '$q', function ($http, $q, ENV) {

        var service = {};

        service.albumSongHash = {};
        service.all_songs = [];

        service.albumsGet = function () {
            var deferred = $q.defer();


            $http.get('api/all-albums', {cache: true}).
                then(function (response) {
                    response.data.features.forEach(function (v) {
                        v.properties.selected = false;
                        service.albumSongHash[v.properties.title] = {};
                        service.albumSongHash[v.properties.title].selected = false;
                        service.albumSongHash[v.properties.title].songs = [];
                    });

                    deferred.resolve(service);

                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;

        };

        service.songsGet = function () {
            var deferred = $q.defer();

            $http.get('api/all-songs', {cache: true}).
                then(function (response) {
                    response.data.features.forEach(function (s) {
                        var album = s.properties.album_title;
                        var song = s.properties.song_title;
                        service.all_songs.push(song);
                        service.albumSongHash[album].songs.push(song);

                    });

                    deferred.resolve(service);



                }, function (response){
                    deferred.reject(response);
                });

            return deferred.promise;

        };

        return service;
    }]);

