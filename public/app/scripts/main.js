angular.module('myApp')
.controller('MainCtrl', function ($scope,$http,$timeout, $mdSidenav, $mdUtil, $mdBottomSheet, $log) {

    $scope.toggleLeft = buildToggler('left');

    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };

        $scope.openMenu = function($mdOpenMenu,event){
            console.log('openMenu');
            $mdOpenMenu(event);
        };

        $scope.items = [
            { name: 'Hangout', icon: 'hangout' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Copy', icon: 'copy2' },
            { name: 'Facebook', icon: 'facebook' },
            { name: 'Twitter', icon: 'twitter' }
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };

        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: '../bottom-sheet-list-template.html',
                controller: 'SubmissionCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem['name'] + ' clicked!';
            });
        };

    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        },200);
        return debounceFn;
    }
});

