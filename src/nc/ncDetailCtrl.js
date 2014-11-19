/*global angular, $*/
angular.module('workTime')
    .controller('ncDetailCtrl', ['$scope', '$stateParams', '$location', 'SweetAlert', 'ncService',
        function ($scope, $stateParams, $location, SweetAlert, ncService) {

            $scope.nc = null;
            $scope.currState = null;
            $scope.states = null;
            $scope.currReason = null;
            $scope.reasons = null;

            $scope.goBack = function () {
                $location.path('/nc');
            };

            $scope.activateTab = function (id) {
                $(id).tab('show');
            };

            $scope.excludeCurrState = function (el) {
                return el.id != $scope.nc.state.id;
            };

            $scope.confirm = function () {
                SweetAlert.swal({
                        title: 'Подтверждение',
                        text: 'Сменить состояние оборудования?',
                        type: 'info',
                        showCancelButton: true,
                        cancelButtonText: 'Отмена',
                        confirmButtonText: 'Да'
                    },
                    function () {
                        $scope.nc.state = $scope.currState;
                        $scope.nc.dateState = new Date();
                        $scope.nc.state.reason = $scope.currReason;
                        $scope.currState = null;
                        $scope.currReason = null;
                        SweetAlert.swal({
                            title: 'Состояние оборудования обновлено!',
                            type: 'success'
                        });
                    });

            };

            ncService.get($stateParams.id)
                .then(function (result) {
                    $scope.nc = result;
                    ncService.getStates()
                        .then(function (result) {
                            $scope.states = result;
                            $scope.nc.state = $scope.states[$scope.nc.state.id - 1];

                            ncService.getReasons()
                                .then(function (result) {
                                    $scope.reasons = result;
                                }, function (error) {
                                    alert(error);
                                    $scope.goBack();
                                });
                        }, function (error) {
                            alert(error);
                            $scope.goBack();
                        });
                }, function (error) {
                    alert(error);
                    $scope.goBack();
                });

        }
    ]);