var app = angular.module("myApp")
    .service("dataService", ['$http', '$q', function ($http, $q, ENV) {

        var service = {};

        service.albumSongHash = {};
        service.all_songs = [];

        service.albumsGet = function () {
            var deferred = $q.defer();


            $http.get('api/albums', {cache: true}).
                then(function (response) {
                    response.data.features.forEach(function (v) {
                        v.properties.selected = false;
                        service.albumSongHash[v.properties.title] = {};
                        service.albumSongHash[v.properties.title].selected = false;
                        service.albumSongHash[v.properties.title].songs = [];
                    });

                    deferred.resolve(service.albumSongHash);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/albums Success',
                        eventLabel: response.status
                    });

                }, function (response) {
                    deferred.reject(response);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/albums Error',
                        eventLabel: response.status + ": " + response.data.message
                    });
                });

            return deferred.promise;

        };

        service.songsGet = function () {
            var deferred = $q.defer();
            service.all_songs = [];

            $http.get('api/songs', {cache: true}).
                then(function (response) {

                    response.data.features.forEach(function (s) {
                        var album = s.properties.album_title;
                        var song = s.properties.song_title;
                        service.all_songs.push({"title":song, "id": s.properties.id, "selected":false});
                        service.albumSongHash[album].songs.push({label:song, id: s.properties.id, selected:false});
                    });

                    deferred.resolve(service.all_songs);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/songs Success',
                        eventLabel: response.status
                    });

                }, function (response){
                    deferred.reject(response);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/songs Error',
                        eventLabel: response.status + ": " + response.data.message
                    });
                });

            return deferred.promise;

        };

        service.songVotesGet = function () {
            var deferred = $q.defer();

            $http.get('api/song-votes', {cache: false}).
                then(function (response) {
                    deferred.resolve(response.data);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/song-votes Success',
                        eventLabel: response.status
                    });

                }, function (response){
                    deferred.reject(response);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/song-votes Error',
                        eventLabel: response.status + ": " + response.data.message
                    });
                });

            return deferred.promise;

        };

        service.albumVotesGet = function () {
            var deferred = $q.defer();

            $http.get('api/album-votes', {cache: true}).
                then(function (response) {
                    deferred.resolve(response.data);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/album-votes Success',
                        eventLabel: response.status
                    });

                }, function (response){
                    deferred.reject(response);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/album-votes Error',
                        eventLabel: response.status + ": " + response.data.message
                    });
                });

            return deferred.promise;

        };

        service.vote = function (songsIds){
            var deferred = $q.defer();

            var data = JSON.stringify({song:songsIds});

            $http.post('api/songs',data, {headers: {'Content-type': 'application/json'}})
                .then(function (response) {
                    deferred.resolve(response);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'GET api/album-votes Success',
                        eventLabel: response.status
                    });

                }, function (response){
                    deferred.reject(response);

                    // track google analytics event
                    ga('send', {
                        hitType:'event',
                        eventCategory: 'API',
                        eventAction: 'POST api/songs Error',
                        eventLabel: response.status + ": " + response.data.message
                    });
                });

            return deferred.promise;
        };

        return service;
    }]);

