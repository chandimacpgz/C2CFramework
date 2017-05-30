(function () {
    'use strict';
    app.factory('HomeService', HomeService);
    HomeService.$inject = ['$http', 'endPoints'];

    function HomeService($http, endPoints) {
        var service = {};

        service.getImageName = getImageName;
        service.getChequeDetection = getChequeDetection;
        return service;

        function getImageName() {
            return $http.get(endPoints.webApi + 'liveChequeImageName').then(handleSuccess, handleError('Error getting image'));
        }

        function getChequeDetection(liveChequePath) {
            return $http.get(endPoints.webApi + 'chequeDetection?=' + liveChequePath).then(handleSuccess, handleError('Error getting image'));
        }

        // custom functions
        function handleSuccess(res) {
            return res.data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();;