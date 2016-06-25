/** State service handles
 *  statefulness and redirects
 */

var app = angular.module("myApp")
    .service("stateService", function ($stateParams, $state, $http, $q, $rootScope) {

        var stateService = {};

        // validate param is in URL
        stateService.isParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (bool) {
                return true;
            }
            return false;
        };

        // check if a param is a particular value
        stateService.isParamVal = function (paramName, val) {
            return $stateParams[paramName] == val;
        };

        // validate param is NOT in URL
        stateService.isNotParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (bool) {
                return false;
            }
            return true;
        };

        // toggle a panel parameter (open/closed)
        stateService.toggleParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (!bool) {
                // mutex logic that makes only 1 panel open at a time
                for (var param in $stateParams) {
                    if ($stateParams[param] === 'open') {
                        $stateParams[param] = null;
                    }
                }
                $stateParams[paramName] = 'open';
            } else {
                delete $stateParams[paramName];
            }
            var state = $state.current.name || 'home';
            stateService.setState(state, $stateParams, false);
        };

        // open a panel parameter
        stateService.openParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (!bool) {
                // mutex logic that makes only 1 panel open at a time
                for (var param in $stateParams) {
                    if ($stateParams[param] === 'open') {
                        $stateParams[param] = null;
                    }
                }
                $stateParams[paramName] = 'open';
                var state = $state.current.name || 'home';
                stateService.setState(state, $stateParams, false);
            }
        };

        // close a panel parameter
        stateService.closeParam = function (paramName) {
            var bool = $stateParams[paramName];
            if (bool) {
                delete $stateParams[paramName];
                var state = $state.current.name || 'home';
                stateService.setState(state, $stateParams, false);
            }
        };

        // set a parameter with a passed value
        stateService.setParamWithVal = function (paramName, val) {
            $stateParams[paramName] = val;
            var state = $state.current.name || 'home';
            stateService.setState(state, $stateParams, false);
        };

        // set state
        stateService.setState = function (state, params, reload) {
            if (reload) {
                $state.go(state, params);
            }
            else {
                $state.go(state, params, {
                    // prevent the events onStart and onSuccess from firing
                    notify: false,
                    // prevent reload of the current state
                    reload: false,
                    // replace the last record when changing the params so you don't hit the back button and get old params
                    location: 'replace',
                    // inherit the current params on the url
                    inherit: true
                });
            }
            // broadcast the url has been updated
            $rootScope.$broadcast('route-update');
        }

        return stateService;
    });