/*global angular*/
angular.module('workTime')
    .controller('ncCtrl', ['$scope', '$location', 'ncService',
        function ($scope, $location, ncService) {

            $scope.setActiveState = function (state) {
                var i, l;

                for (i = 0, l = $scope.states.length; i < l; i++) {
                    $scope.states[i].active = i === state;
                }
            };

            $scope.getActiveState = function () {
                var i, l;

                for (i = 0, l = $scope.states.length; i < l; i++) {
                    if ($scope.states[i].active) {
                        return i;
                    }
                }

                return -1;
            };

            $scope.filterState = function (value) {
                var activeState = $scope.getActiveState();

                return activeState === 0 || value.state.id === activeState;
            };

            function fillStates() {
                var i, l;

                for (i = 1, l = $scope.states.length; i < l; i++) {
                    $scope.states[i].count = 0;
                    $scope.states[i].active = false;
                }

                for (i = 0, l = $scope.ncList.length; i < l; i++) {

                    $scope.ncList[i].labelClass = '';
                    if ($scope.states[$scope.ncList[i].state.id].type) {
                        $scope.ncList[i].labelClass = 'label label-' +
                            $scope.states[$scope.ncList[i].state.id].type;
                    }

                    $scope.ncList[i].img = '';
                    if ($scope.states[$scope.ncList[i].state.id].img) {
                        $scope.ncList[i].glyphClass = 'glyphicon glyphicon-' +
                            $scope.states[$scope.ncList[i].state.id].img;
                    }

                    if (!$scope.states[$scope.ncList[i].state.id].count) {
                        $scope.states[$scope.ncList[i].state.id].count = 1;
                    } else {
                        $scope.states[$scope.ncList[i].state.id].count += 1;
                    }
                }
            }

            $scope.query = function () {
                ncService.query()
                    .then(function (result) {
                        $scope.ncList = result;
                        ncService.getStates()
                            .then(function (result) {
                                $scope.states = [{
                                    id: 0,
                                    name: 'Все',
                                    count: $scope.ncList.length,
                                    active: true
                                }].concat(result);

                                fillStates();
                            }, function (error) {
                                alert(error);
                            });
                    }, function (error) {
                        alert(error);
                    });
            };

            $scope.query();

            $scope.get = function (id) {
                $location.path('/nc/' + id);
            };

            $scope.insert = function () {

            };
        }
    ]);