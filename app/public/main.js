angular.module('myApp')
.controller('MainCtrl', function ($scope,$http,$timeout, $mdSidenav, $mdUtil, $log) {

    $scope.toggleLeft = buildToggler('left');

    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
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

