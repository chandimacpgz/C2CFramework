(function () {
    'use strict';
    app.factory('BankService', BankService);
    BankService.$inject = ['$http', 'endPoints'];

    function BankService($http, endPoints) {
        var service = {};

        service.addBank = addBank;
        service.getBanks = getBanks;
        return service;

        function addBank(bank) {
            return $http({
                method: 'POST',
                url: endPoints.webApi + 'banks',
                data: JSON.stringify(bank),
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in creating bank'));
        }

        function getBanks() {
            return $http.get(endPoints.webApi + 'banks').then(handleSuccess, handleError('Error getting banks'));
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