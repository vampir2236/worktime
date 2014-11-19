/*global angular*/
angular.module('workTime')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/nc');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.tpl.html',
                    controller: 'loginCtrl'
                })
                .state('nc', {
                    url: '/nc',
                    templateUrl: 'templates/nc.tpl.html',
                    controller: 'ncCtrl',
                    resolve: {
                        'authorization': ['loginService',
                            function (loginService) {
                                return loginService.checkAuth();
                            }]
                    }
                })
                .state('nc-detail', {
                    url: '/nc/:id',
                    templateUrl: 'templates/nc.detail.tpl.html',
                    controller: 'ncDetailCtrl',
                    resolve: {
                        'authorization': ['loginService',
                            function (loginService) {
                                return loginService.checkAuth();
                            }]
                    }
                });
        }
    ]);