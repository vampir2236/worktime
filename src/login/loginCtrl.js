/*global angular*/
angular.module('workTime')
    .controller('loginCtrl', ['$scope', 'loginService', '$location', 'SweetAlert',

        function ($scope, loginService, $location, SweetAlert) {
            $scope.user = loginService.getUser();

            $scope.login = function () {
                loginService.login()
                    .then(function (result) {
                        $location.path('/nc');
                    }, function (result) {
                        SweetAlert.swal({
                            title: result.message,
                            type: 'error'
                        });
                    });
            };

            $scope.logout = function () {
                SweetAlert.swal({
                        title: 'Подтверждение',
                        text: 'Выйти из системы?',
                        type: 'info',
                        showCancelButton: true,
                        cancelButtonText: 'Отмена',
                        confirmButtonText: 'Да'
                    },
                    function () {
                        loginService.logout()
                            .finally(function () {
                                $location.path('/login');
                            });
                    });
            };

        }
    ]);