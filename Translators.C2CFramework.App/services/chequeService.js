(function () {
    'use strict';
    app.factory('ChequeService', ChequeService);
    ChequeService.$inject = ['$http', 'endPoints'];

    function ChequeService($http, endPoints) {
        var service = {};

        service.addSignature = addSignature;
        return service;

        function addSignature(signature) {
            return $http({
                url: endPoints.webApi + 'cropPoints',
                method: "POST",
                data: signature,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in adding signature'));

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