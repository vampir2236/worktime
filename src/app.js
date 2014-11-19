/*global angular*/
angular.module('workTime', ['ui.router', 'ui.bootstrap', 'ngCookies', 'angular-loading-bar', 'oitozero.ngSweetAlert']);

angular.module('workTime')
    .config(['$httpProvider', '$locationProvider',
        function ($httpProvider, $locationProvider) {

            $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
            $httpProvider.defaults.headers.common['Expires'] = '-1';

            $httpProvider.interceptors.push(['$q', '$location',
                function ($q, $location) {
                    return {
                        'responseError': function (rejection) {
                            if (rejection.status === 401) {
                                if ($location.path() !== '/login') {
                                    $location.path('/login');
                                }
                            }
                            return $q.reject(rejection);
                        }
                    };
            }]);

            $locationProvider.html5Mode(false).hashPrefix('!');
        }
    ]);