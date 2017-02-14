(function () {
    'use strict';
    app.factory('BankService', BankService);
    BankService.$inject = ['$http', 'endPoints'];

    function BankService($http, endPoints) {
        var service = {};

        service.addBank = addBank;
        return service;

        function addBank(bank) {
            return $http({
                method: 'POST',
                url: endPoints.webApi + 'banks',
                data: bank,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in creating bank'));
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