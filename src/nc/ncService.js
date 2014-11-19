/*global angular*/
angular.module('workTime')
    .service('ncService', ['$q', '$http',

        function ($q, $http) {
            var baseUrl = 'api/v1/nc',
                stateList = [
                    {
                        id: 1,
                        name: 'Работа',
                        type: 'success',
                        img: 'thumbs-up'
                    },
                    {
                        id: 2,
                        name: 'Ожидание',
                        type: null,
                        img: 'time'
                    },
                    {
                        id: 3,
                        name: 'Наладка',
                        type: 'info',
                        img: 'random'
                    },
                    {
                        id: 4,
                        name: 'Ремонт',
                        type: 'primary',
                        img: 'wrench'
                    },
                    {
                        id: 5,
                        name: 'Простой',
                        type: 'danger',
                        img: 'warning-sign'
                    }
                ],
                reasonList = [
                    {
                        id: 1,
                        name: 'Причина 1'
                    },
                    {
                        id: 2,
                        name: 'Причина 2'
                    },
                    {
                        id: 3,
                        name: 'Причина 3'
                    },
                    {
                        id: 4,
                        name: 'Причина 4'
                    },
                    {
                        id: 5,
                        name: 'Причина 5'
                    }
                ],
                ncList = [
                    {
                        id: 1,
                        name: 'Станок №1',
                        img: null,
                        dateState: new Date(),
                        state: {
                            id: 1,
                            name: 'Работа'
                        }
                    },
                    {
                        id: 2,
                        name: 'Станок №2',
                        img: null,
                        dateState: new Date(),
                        state: {
                            id: 1,
                            name: 'Работа'
                        }
                    },
                    {
                        id: 3,
                        name: 'Станок №3',
                        img: null,
                        dateState: new Date(),
                        state: {
                            id: 3,
                            name: 'Наладка'
                        }
                    },
                    {
                        id: 4,
                        name: 'Станок №2',
                        img: null,
                        dateState: new Date(),
                        state: {
                            id: 5,
                            name: 'Простой'
                        }
                    },
                    {
                        id: 5,
                        name: 'Станок №5',
                        img: null,
                        dateState: new Date(),
                        state: {
                            id: 4,
                            name: 'Ремонт'
                        }
                    },
                    {
                        id: 6,
                        name: 'Станок №6',
                        img: null,
                        dateState: new Date(),
                        state: {
                            id: 2,
                            name: 'Ожидание'
                        }
                    }];


            this.query = function () {
                var deffered = $q.defer();

                deffered.resolve(ncList);
                return deffered.promise;
            };

            this.get = function (id, params) {
                var deffered = $q.defer();

                deffered.resolve(ncList[id-1]);
                return deffered.promise;
            };

            this.getStates = function () {
                var deffered = $q.defer();

                deffered.resolve(stateList);
                return deffered.promise;
            };

            this.getReasons = function () {
                var deffered = $q.defer();
                
                deffered.resolve(reasonList);
                return deffered.promise;
            };
        }
    ]);