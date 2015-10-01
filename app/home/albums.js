angular.module('myApp')
    .controller('AlbumsCtrl', function ($rootScope,$scope,$http,dataService,FileUploader) {

        $scope.albumSongHash = {};
        $scope.showSong = false;
        $scope.test = '';
        $scope.all_songs = [];
        $scope.searchText = '';

        $scope.uploader = new FileUploader({
            onBeforeUpload:function(){
                console.log('Before Upload');
            },
            alias:'xls_file',
            url:'http://54.245.82.92/api/v1/forms',
            headers:{
                'Authorization': 'Token 74756f0ab0da149f649e9074c529b633f3daaa02'
            }
        });

        $scope.uploader.onBeforeUploadItem = function(item) {
            console.log(item);
        }

        $scope.uploader.onProgressItem = function(item,progress){
            console.log(progress);
        }

        $scope.uploader.onSuccessItem =function(response,status,headers) {
            console.log(response);
        }

        $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };

        $rootScope.$broadcast('data-change', {data:true});

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