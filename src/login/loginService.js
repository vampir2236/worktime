/*global angular*/
angular.module('workTime')
    .constant('userToken', 'token')
    .service('loginService', ['$q', '$http', '$location', '$cookieStore', 'userToken',
        function ($q, $http, $location, $cookieStore, userToken) {
            var baseUrl = 'api/v1',
                user = {};

            this.getUser = function () {
                return user;
            };


            this.login = function () {
                var deffered = $q.defer();

                if (user.code !== 2236) {
                    deffered.reject({
                        code: 401,
                        message: 'Неверно введен код!'
                    });
                } else {
                    user.id = 1;
                    user.code = 2236;
                    user.fio = 'Малафеев Александр Владимирович';
                    user.job = 'программист';
                    user.token = 2236;
                    user.roles = ['admin'];

                    $http.defaults.headers.common[userToken] = user.token;
                    $cookieStore.put('fio', user.fio);
                    $cookieStore.put('job', user.job);
                    $cookieStore.put(userToken, user.token);

                    deffered.resolve();
                }

                return deffered.promise;
            };


            this.logout = function () {
                var deffered = $q.defer();

                user.id = null;
                user.code = null;
                user.fio = null;
                user.job = null;
                user.token = null;

                delete $http.defaults.headers.common[userToken];
                $cookieStore.remove('fio');
                $cookieStore.remove('job');
                $cookieStore.remove(userToken);

                deffered.resolve();
                return deffered.promise;
            };


            this.restoreUser = function (token) {
                var deffered = $q.defer();

                user.fio = $cookieStore.get('fio');
                user.job = $cookieStore.get('job');
                user.token = $cookieStore.get(userToken);

                deffered.resolve();
                return deffered.promise;
            };


            this.checkAuth = function () {
                var token = $http.defaults.headers.common[userToken];

                function redirect(path) {
                    if ($location.path() !== path)
                        $location.path(path);
                }

                if (token) return;

                if (this.user && this.user.token) {
                    $http.defaults.headers.common[userToken] = this.user.token;
                    return;
                }

                token = $cookieStore.get(userToken);
                if (token) {
                    $http.defaults.headers.common[userToken] = token;

                    return this.restoreUser(token)
                        .catch(function () {
                            redirect('/login');
                        });
                } else {
                    redirect('/login');
                }
            };
        }
    ]);