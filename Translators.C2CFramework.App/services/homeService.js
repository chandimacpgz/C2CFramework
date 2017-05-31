(function () {
    'use strict';
    app.factory('HomeService', HomeService);
    HomeService.$inject = ['$http', 'endPoints'];

    function HomeService($http, endPoints) {
        var service = {};

        service.getImageName = getImageName;
        service.getChequeDetection = getChequeDetection;
        service.getBankName = getBankName;
        service.cropCheque = cropCheque;
        service.deleteFailCheque = deleteFailCheque;
        return service;

        function getImageName() {
            return $http.get(endPoints.webApi + 'liveChequeImageName').then(handleSuccess, handleError('Error getting image'));
        }

        function deleteFailCheque(chequeName) {
            return $http.get(endPoints.webApi + 'deleteLiveChequeImage?chequeName=' + chequeName).then(handleSuccess, handleError('Error deleting cheque'));
        }

        function getChequeDetection(liveChequePath) {
            return $http.get(endPoints.webApi + 'chequeDetection?livechequepath1=' + liveChequePath).then(handleSuccess, handleError('Error detecting cheque'));
        }

        function getBankName(bankId) {
            return $http.get(endPoints.webApi + 'banks/'+ bankId).then(handleSuccess, handleError('Error getting bank details'));
        }

        function cropCheque(chequeData) {
            return $http({
                url: endPoints.webApi + 'liveChequePaths',
                method: "POST",
                data: chequeData,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error cropping cheque'));

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